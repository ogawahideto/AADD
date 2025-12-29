"""Git manager for AADD."""

import logging
from pathlib import Path
from git import Repo
from git.exc import GitCommandError

from config import Config
from fetchers.base_fetcher import Anniversary

logger = logging.getLogger("AADD")


class GitManager:
    """Manages Git operations for AADD."""

    def __init__(self, repo_path: Path, config: Config):
        """Initialize Git manager.

        Args:
            repo_path: Path to the Git repository
            config: Application configuration
        """
        self.repo_path = Path(repo_path)
        self.config = config
        self.repo = Repo(repo_path)

    def commit_and_push(self, anniversary: Anniversary) -> bool:
        """Commit new app and push to remote.

        Args:
            anniversary: The anniversary for the commit message

        Returns:
            True if successful, False otherwise
        """
        try:
            # Configure git user
            with self.repo.config_writer() as git_config:
                git_config.set_value("user", "name", self.config.GIT_USER_NAME)
                git_config.set_value("user", "email", self.config.GIT_USER_EMAIL)

            # Stage all files in docs/
            self.repo.index.add(["docs/"])
            logger.info("Staged changes in docs/")

            # Check if there are changes to commit
            if not self.repo.index.diff("HEAD"):
                logger.info("No changes to commit")
                return True

            # Create commit message
            date_str = anniversary.date.strftime("%B %d, %Y")
            commit_message = self._create_commit_message(anniversary, date_str)

            # Commit
            self.repo.index.commit(commit_message)
            logger.info("Created commit successfully")

            # Push to remote
            if self.config.ENABLE_GIT_PUSH:
                origin = self.repo.remote(self.config.GIT_REMOTE)
                push_info = origin.push(self.config.GIT_BRANCH)

                # Check push result
                if push_info and push_info[0].flags & push_info[0].ERROR:
                    logger.error(f"Push failed: {push_info[0].summary}")
                    return False

                logger.info(f"Pushed to {self.config.GIT_REMOTE}/{self.config.GIT_BRANCH}")
            else:
                logger.info("Git push disabled in configuration")

            return True

        except GitCommandError as e:
            logger.error(f"Git operation failed: {e}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error during git operations: {e}")
            return False

    def _create_commit_message(self, anniversary: Anniversary, date_str: str) -> str:
        """Create a formatted commit message.

        Args:
            anniversary: The anniversary
            date_str: Formatted date string

        Returns:
            Commit message string
        """
        message = f"""Add web app for {date_str}

Anniversary: {anniversary.title}
Year: {anniversary.year}
Category: {anniversary.category}

Generated automatically by AADD system.
"""
        return message

    def get_status(self) -> str:
        """Get git status.

        Returns:
            Git status as string
        """
        try:
            # Check for uncommitted changes
            if self.repo.is_dirty(untracked_files=True):
                return "Repository has uncommitted changes"

            # Check for unpushed commits
            try:
                origin = self.repo.remote(self.config.GIT_REMOTE)
                origin.fetch()

                local_commit = self.repo.head.commit
                remote_commit = self.repo.commit(f"{self.config.GIT_REMOTE}/{self.config.GIT_BRANCH}")

                if local_commit != remote_commit:
                    return "Local branch is ahead or behind remote"

            except Exception as e:
                logger.warning(f"Could not check remote status: {e}")

            return "Repository is clean and up to date"

        except Exception as e:
            logger.error(f"Failed to get git status: {e}")
            return f"Error: {e}"
