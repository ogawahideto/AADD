"""Regenerate index pages only."""
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from config import Config, Language
from publishers.file_manager import FileManager
from publishers.index_generator import IndexGenerator

if __name__ == "__main__":
    config = Config.load()
    file_manager = FileManager(config.DOCS_DIR)
    index_generator = IndexGenerator(config.DOCS_DIR, config.DATA_DIR / "templates")

    # Get apps
    apps_ja = file_manager.get_all_apps(Language.JAPANESE)
    apps_en = file_manager.get_all_apps(Language.ENGLISH)

    print(f"Found {len(apps_ja)} Japanese apps, {len(apps_en)} English apps")

    # Regenerate indexes
    index_generator.update_all_indexes(apps_ja, apps_en)

    print("Index pages regenerated successfully!")
