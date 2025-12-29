"""Main orchestrator for AADD (Automated Anniversary-Driven Development)."""

import sys
import logging
from datetime import date
from pathlib import Path

from config import Config, Language
from utils.logger import setup_logger
from fetchers.base_fetcher import FetcherManager
from fetchers.wikipedia_fetcher import WikipediaFetcher
from fetchers.wikipedia_ja_fetcher import WikipediaJaFetcher
from fetchers.fallback_fetcher import FallbackFetcher
from generators.claude_generator import ClaudeWebAppGenerator
from generators.anniversary_selector import AnniversarySelector
from publishers.file_manager import FileManager
from publishers.index_generator import IndexGenerator
from publishers.git_manager import GitManager

# Exit codes
EXIT_SUCCESS = 0
EXIT_ANNIVERSARY_FETCH_FAILED = 1
EXIT_APP_GENERATION_FAILED = 2
EXIT_FILE_OPERATIONS_FAILED = 3
EXIT_GIT_OPERATIONS_FAILED = 4

# Logger will be initialized in main()
logger = None


def main() -> int:
    """Main entry point for AADD.

    Returns:
        Exit code (0 for success, non-zero for failure)
    """
    global logger

    # Load configuration
    try:
        config = Config.load()
        config.ensure_directories()
    except Exception as e:
        print(f"ERROR: Failed to load configuration: {e}")
        print("Please ensure .env file exists and contains required settings.")
        return EXIT_ANNIVERSARY_FETCH_FAILED

    # Set up logging
    logger = setup_logger(config.LOGS_DIR)

    logger.info("=" * 60)
    logger.info("AADD Daily Run Starting")
    logger.info("=" * 60)

    try:
        target_date = date.today()
        file_manager = FileManager(config.DOCS_DIR)
        generator = ClaudeWebAppGenerator(config)
        selector = AnniversarySelector(config)

        # Generate Japanese app
        logger.info("=" * 60)
        logger.info("Generating Japanese App")
        logger.info("=" * 60)
        ja_anniversary = generate_language_app(
            config, generator, selector, file_manager, target_date, Language.JAPANESE
        )

        # Generate English app
        logger.info("=" * 60)
        logger.info("Generating English App")
        logger.info("=" * 60)
        en_anniversary = generate_language_app(
            config, generator, selector, file_manager, target_date, Language.ENGLISH
        )

        # Step 5: Update index pages
        logger.info("=" * 60)
        logger.info("Updating index pages...")
        logger.info("=" * 60)
        try:
            apps_ja = file_manager.get_all_apps(Language.JAPANESE)
            apps_en = file_manager.get_all_apps(Language.ENGLISH)
            index_generator = IndexGenerator(
                config.DOCS_DIR,
                config.DATA_DIR / "templates"
            )
            index_generator.update_all_indexes(apps_ja, apps_en)
            logger.info(f"Updated indexes (ja: {len(apps_ja)}, en: {len(apps_en)})")
        except Exception as e:
            logger.error(f"Failed to update indexes: {e}", exc_info=True)
            return EXIT_FILE_OPERATIONS_FAILED

        # Step 6: Git commit and push
        logger.info("=" * 60)
        logger.info("Committing and pushing to Git...")
        logger.info("=" * 60)

        # Check if we have any anniversary to use for commit message
        anniversary_for_commit = ja_anniversary if ja_anniversary else en_anniversary
        if not anniversary_for_commit:
            logger.warning("No anniversary generated, skipping git operations")
        else:
            try:
                git_manager = GitManager(config.PROJECT_ROOT, config)
                success = git_manager.commit_and_push(anniversary_for_commit)
                if not success:
                    logger.error("Git operations failed")
                    return EXIT_GIT_OPERATIONS_FAILED
                logger.info("Git operations completed successfully")
            except Exception as e:
                logger.error(f"Git operations failed: {e}", exc_info=True)
                return EXIT_GIT_OPERATIONS_FAILED

        # Success!
        logger.info("=" * 60)
        logger.info("AADD Daily Run Completed Successfully!")
        logger.info("=" * 60)
        return EXIT_SUCCESS

    except Exception as e:
        logger.critical(f"Unexpected error in main: {e}", exc_info=True)
        return EXIT_ANNIVERSARY_FETCH_FAILED


def generate_language_app(config: Config, generator: ClaudeWebAppGenerator,
                          selector: AnniversarySelector, file_manager: FileManager,
                          target_date: date, language: Language):
    """Generate app for a specific language.

    Args:
        config: Application configuration
        generator: Claude web app generator
        file_manager: File manager
        target_date: Target date
        language: Language to generate

    Returns:
        Selected anniversary (or None if failed)
    """
    logger.info(f"Step 1: Fetching {language.value} anniversaries...")
    logger.info(f"Target date: {target_date.strftime('%B %d, %Y')}")

    try:
        anniversaries = fetch_anniversaries(config, target_date, language)
        if not anniversaries:
            logger.error(f"No {language.value} anniversaries found")
            return None
    except Exception as e:
        logger.error(f"Failed to fetch {language.value} anniversaries: {e}", exc_info=True)
        return None

    logger.info(f"Step 2: Using AI to select best {language.value} anniversary...")
    try:
        selected = selector.select_best_anniversary(anniversaries, language)
        logger.info(f"AI selected: {selected}")
    except Exception as e:
        logger.error(f"Failed to select {language.value} anniversary: {e}", exc_info=True)
        return None

    logger.info(f"Step 3: Generating {language.value} web app...")
    try:
        app = generator.generate_app(selected, language)
        logger.info(f"Generated app: {app.metadata.get('app_title', 'Untitled')}")
    except Exception as e:
        logger.error(f"Failed to generate {language.value} app: {e}", exc_info=True)
        return None

    logger.info(f"Step 4: Saving {language.value} app files...")
    try:
        app_dir = file_manager.save_app(app, target_date)
        logger.info(f"Saved {language.value} app to: {app_dir}")
    except Exception as e:
        logger.error(f"Failed to save {language.value} app: {e}", exc_info=True)
        return None

    return selected


def fetch_anniversaries(config: Config, target_date: date, language: Language):
    """Fetch anniversaries with fallback strategy for a specific language.

    Args:
        config: Application configuration
        target_date: Date to fetch anniversaries for
        language: Language to fetch

    Returns:
        List of Anniversary objects

    Raises:
        Exception: If all fetchers fail
    """
    # Create fetchers based on language
    if language == Language.JAPANESE:
        fetchers = [
            WikipediaJaFetcher(),
            FallbackFetcher(config.DATA_DIR / "fallback_anniversaries_ja.json")
        ]
    else:
        fetchers = [
            WikipediaFetcher(),
            FallbackFetcher(config.DATA_DIR / "fallback_anniversaries_en.json")
        ]

    # Create fetcher manager
    manager = FetcherManager(fetchers)

    # Fetch anniversaries
    return manager.fetch_anniversaries(target_date)


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
