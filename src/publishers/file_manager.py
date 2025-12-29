"""File manager for saving generated apps."""

import json
import logging
from pathlib import Path
from datetime import date

from generators.claude_generator import GeneratedApp
from config import Language

logger = logging.getLogger("AADD")


class FileManager:
    """Manages file system operations for generated apps."""

    def __init__(self, docs_root: Path):
        """Initialize file manager.

        Args:
            docs_root: Root directory for published docs (GitHub Pages root)
        """
        self.docs_root = Path(docs_root)

    def save_app(self, app: GeneratedApp, target_date: date = None) -> Path:
        """Save generated app to appropriate directory.

        Args:
            app: The generated app to save
            target_date: Date for directory structure (defaults to app's anniversary date)

        Returns:
            Path to the saved app directory

        Raises:
            IOError: If file operations fail
        """
        if target_date is None:
            target_date = app.anniversary.date

        # Create directory structure: docs/LANG/YYYY/MM-DD/
        lang_dir = self.docs_root / app.language.value
        year_dir = lang_dir / str(target_date.year)
        app_dir = year_dir / target_date.strftime("%m-%d")

        # Create directories
        app_dir.mkdir(parents=True, exist_ok=True)
        logger.info(f"Created app directory: {app_dir}")

        # Write HTML file
        html_path = app_dir / "index.html"
        html_path.write_text(app.html, encoding="utf-8")
        logger.debug(f"Wrote {html_path} ({len(app.html)} bytes)")

        # Write CSS file
        css_path = app_dir / "style.css"
        css_path.write_text(app.css, encoding="utf-8")
        logger.debug(f"Wrote {css_path} ({len(app.css)} bytes)")

        # Write JS file
        js_path = app_dir / "app.js"
        js_path.write_text(app.js, encoding="utf-8")
        logger.debug(f"Wrote {js_path} ({len(app.js)} bytes)")

        # Write metadata JSON
        metadata = self._create_metadata(app, target_date)
        metadata_path = app_dir / "metadata.json"
        metadata_path.write_text(
            json.dumps(metadata, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )
        logger.debug(f"Wrote {metadata_path}")

        logger.info(f"Successfully saved app to {app_dir}")
        return app_dir

    def _create_metadata(self, app: GeneratedApp, target_date: date) -> dict:
        """Create metadata JSON for the app.

        Args:
            app: The generated app
            target_date: Target date

        Returns:
            Metadata dictionary
        """
        return {
            "date": target_date.isoformat(),
            "anniversary": {
                "title": app.anniversary.title,
                "description": app.anniversary.description,
                "year": app.anniversary.year,
                "category": app.anniversary.category,
                "source": app.anniversary.source
            },
            "app": app.metadata,
            "generated_at": app.generated_at.isoformat(),
            "generator_version": "1.0.0"
        }

    def get_all_apps(self, language: Language = None) -> list:
        """Scan docs directory and return list of all apps.

        Args:
            language: Filter by language (None for all languages)

        Returns:
            List of dictionaries with app information

        Each dictionary contains:
            - path: relative path from docs root
            - metadata: parsed metadata.json content
            - year: year of the app
            - date: date string (MM-DD)
            - language: language code (ja/en)
        """
        apps = []

        # Determine which language directories to scan
        if language:
            lang_dirs = [self.docs_root / language.value]
        else:
            lang_dirs = [self.docs_root / "ja", self.docs_root / "en"]

        for lang_dir in lang_dirs:
            if not lang_dir.exists():
                continue

            lang_code = lang_dir.name

            # Scan for year directories (2000-2099)
            for year_dir in sorted(lang_dir.glob("2*")):
                if not year_dir.is_dir():
                    continue

                year = year_dir.name

                # Scan for app directories (MM-DD format)
                for app_dir in sorted(year_dir.glob("*-*")):
                    if not app_dir.is_dir():
                        continue

                    metadata_file = app_dir / "metadata.json"
                    if not metadata_file.exists():
                        logger.warning(f"No metadata.json in {app_dir}, skipping")
                        continue

                    try:
                        metadata = json.loads(metadata_file.read_text(encoding="utf-8"))
                        apps.append({
                            "path": app_dir.relative_to(self.docs_root),
                            "metadata": metadata,
                            "year": year,
                            "date": app_dir.name,
                            "language": lang_code
                        })
                    except Exception as e:
                        logger.warning(f"Failed to read metadata from {metadata_file}: {e}")
                        continue

        logger.info(f"Found {len(apps)} apps in {self.docs_root}")
        return apps
