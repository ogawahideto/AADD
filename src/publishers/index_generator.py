"""Index page generator for AADD."""

import logging
from pathlib import Path
from datetime import datetime
from collections import defaultdict
from config import Language

logger = logging.getLogger("AADD")


class IndexGenerator:
    """Generates and updates index pages for browsing apps."""

    def __init__(self, docs_root: Path, template_dir: Path):
        """Initialize index generator.

        Args:
            docs_root: Root directory for docs
            template_dir: Directory containing HTML templates
        """
        self.docs_root = Path(docs_root)
        self.template_dir = Path(template_dir)

    def update_all_indexes(self, apps_ja: list, apps_en: list):
        """Update all index pages for both languages.

        Args:
            apps_ja: List of Japanese app dictionaries
            apps_en: List of English app dictionaries
        """
        logger.info("Updating index pages...")

        # Generate language-specific indexes
        if apps_ja:
            self._generate_language_index(apps_ja, Language.JAPANESE)
        if apps_en:
            self._generate_language_index(apps_en, Language.ENGLISH)

        # Generate root index (language selector)
        self._generate_root_index(len(apps_ja), len(apps_en))

        logger.info("Index pages updated successfully")

    def _generate_language_index(self, apps: list, language: Language):
        """Generate language-specific index.html page.

        Args:
            apps: List of apps for this language
            language: Language code
        """
        # Load template
        template_file = self.template_dir / "index_template.html"
        if not template_file.exists():
            logger.error(f"Template not found: {template_file}")
            return

        template = template_file.read_text(encoding="utf-8")

        # Sort apps by date (most recent first)
        sorted_apps = sorted(
            apps,
            key=lambda a: a["metadata"]["date"],
            reverse=True
        )

        # Take most recent 20 for homepage
        recent_apps = sorted_apps[:20] if len(sorted_apps) > 20 else sorted_apps

        # Generate app cards HTML
        cards_html = ""
        for app in recent_apps:
            cards_html += self._generate_app_card(app, language) + "\n"

        # Generate year links
        years = sorted(set(app["year"] for app in apps), reverse=True)
        year_links_html = ""
        for year in years:
            year_count = sum(1 for app in apps if app["year"] == year)
            year_links_html += f'<a href="{year}/index.html" class="year-link">{year} ({year_count})</a>\n'

        # Calculate stats
        total_apps = len(apps)
        years_covered = len(years)
        last_updated = datetime.now().strftime("%Y-%m-%d")

        # Add language switcher link
        if language == Language.JAPANESE:
            lang_switcher = '<a href="../en/index.html" class="lang-switcher">English</a>'
        else:
            lang_switcher = '<a href="../ja/index.html" class="lang-switcher">日本語</a>'

        # Replace placeholders
        html = template.replace("{{APP_CARDS}}", cards_html)
        html = html.replace("{{YEAR_LINKS}}", year_links_html)
        html = html.replace("{{TOTAL_APPS}}", str(total_apps))
        html = html.replace("{{YEARS_COVERED}}", str(years_covered))
        html = html.replace("{{LAST_UPDATED}}", last_updated)
        html = html.replace("{{LANG_SWITCHER}}", lang_switcher)

        # Translate UI text if Japanese
        if language == Language.JAPANESE:
            html = self._translate_to_japanese(html)

        # Write language-specific index
        lang_dir = self.docs_root / language.value
        lang_dir.mkdir(exist_ok=True)
        index_path = lang_dir / "index.html"
        index_path.write_text(html, encoding="utf-8")
        logger.info(f"Generated {language.value} index: {index_path}")

    def _generate_root_index(self, ja_count: int, en_count: int):
        """Generate root index.html with language selector.

        Args:
            ja_count: Number of Japanese apps
            en_count: Number of English apps
        """
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AADD - Automated Anniversary-Driven Development</title>
    <meta name="description" content="Daily web apps celebrating historical anniversaries in Japanese and English">
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }}
        .container {{
            text-align: center;
            padding: 2rem;
            max-width: 800px;
        }}
        h1 {{
            font-size: 3rem;
            margin-bottom: 1rem;
        }}
        .subtitle {{
            font-size: 1.25rem;
            opacity: 0.9;
            margin-bottom: 3rem;
        }}
        .language-selector {{
            display: flex;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
        }}
        .language-card {{
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 1rem;
            padding: 2rem;
            min-width: 250px;
            transition: all 0.3s;
            cursor: pointer;
            text-decoration: none;
            color: white;
            display: block;
        }}
        .language-card:hover {{
            transform: translateY(-8px);
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }}
        .language-flag {{
            font-size: 4rem;
            margin-bottom: 1rem;
        }}
        .language-name {{
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }}
        .language-count {{
            font-size: 1rem;
            opacity: 0.8;
        }}
        .footer {{
            margin-top: 4rem;
            opacity: 0.8;
            font-size: 0.9rem;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 AADD</h1>
        <p class="subtitle">Automated Anniversary-Driven Development</p>
        <p class="subtitle">毎日、歴史的記念日を祝う自動生成Webアプリ</p>

        <div class="language-selector">
            <a href="ja/index.html" class="language-card">
                <div class="language-flag">🇯🇵</div>
                <div class="language-name">日本語</div>
                <div class="language-count">{ja_count} アプリ</div>
            </a>

            <a href="en/index.html" class="language-card">
                <div class="language-flag">🇬🇧</div>
                <div class="language-name">English</div>
                <div class="language-count">{en_count} apps</div>
            </a>
        </div>

        <div class="footer">
            <p>AI-powered daily web apps celebrating historical anniversaries</p>
            <p>Built with Claude API | <a href="https://github.com/ogawahideto/AADD" style="color: white;">GitHub</a></p>
        </div>
    </div>
</body>
</html>
"""
        index_path = self.docs_root / "index.html"
        index_path.write_text(html, encoding="utf-8")
        logger.info(f"Generated root index: {index_path}")

    def _translate_to_japanese(self, html: str) -> str:
        """Translate UI text to Japanese.

        Args:
            html: HTML content with English UI text

        Returns:
            HTML with Japanese UI text
        """
        translations = {
            "AADD - Automated Anniversary-Driven Development": "AADD - 自動記念日駆動開発",
            "Automated Anniversary-Driven Development": "自動記念日駆動開発",
            "Daily web apps celebrating historical anniversaries": "毎日、歴史的記念日を祝うWebアプリ",
            "Every day at 9:00 AM, AADD automatically:": "毎日午前9時、AADDは自動的に：",
            "Fetches historical anniversaries from Wikipedia": "Wikipediaから歴史的記念日を取得",
            "Selects the most interesting one using intelligent scoring": "インテリジェントスコアリングで最も興味深いものを選択",
            "Generates a creative, interactive web app using Claude AI": "Claude AIを使用して創造的でインタラクティブなWebアプリを生成",
            "Publishes it to GitHub Pages": "GitHub Pagesに公開",
            "Apps Created": "作成アプリ数",
            "Years Covered": "対象年数",
            "Last Updated": "最終更新",
            "Recent Apps": "最近のアプリ",
            "Browse All Apps": "すべてのアプリを閲覧",
            "View App →": "アプリを見る →",
            "Generated daily at 9:00 AM JST using": "毎日午前9時（JST）に自動生成",
            "Claude AI": "Claude AI",
            "View source on": "ソースコードは",
            "GitHub": "GitHub"
        }

        for en, ja in translations.items():
            html = html.replace(en, ja)

        return html

    def _generate_app_card(self, app: dict, language: Language = Language.ENGLISH) -> str:
        """Generate HTML for an app card.

        Args:
            app: App dictionary with path and metadata

        Returns:
            HTML string for the card
        """
        metadata = app["metadata"]
        anniversary = metadata.get("anniversary", {})
        app_meta = metadata.get("app", {})

        # Format date
        try:
            date_obj = datetime.fromisoformat(metadata["date"])
            date_formatted = date_obj.strftime("%B %d, %Y")
        except:
            date_formatted = metadata.get("date", "Unknown")

        # Truncate description
        description = anniversary.get("description", "")
        if len(description) > 150:
            description = description[:150] + "..."

        # Get category
        category = anniversary.get("category", "historical")

        # Get year
        year = anniversary.get("year", "")

        # Get app title
        app_title = app_meta.get("app_title", anniversary.get("title", "Untitled"))

        # Fix path: convert to web format and remove language prefix
        path_str = str(app['path']).replace('\\', '/')  # Windows to web path
        # Remove language prefix (ja/ or en/) for language-specific indexes
        if '/' in path_str:
            parts = path_str.split('/', 1)
            if parts[0] in ['ja', 'en'] and len(parts) > 1:
                path_str = parts[1]  # Remove language prefix

        # Generate card HTML
        return f"""
        <div class="app-card" data-date="{metadata['date']}">
            <div class="app-card-header">
                <span class="app-date">{date_formatted}</span>
                <span class="app-category">{category}</span>
            </div>
            <h3 class="app-title">{app_title}</h3>
            <p class="app-description">{description}</p>
            <div class="app-card-footer">
                <span class="app-year">{year}</span>
                <a href="{path_str}/index.html" class="app-link">View App →</a>
            </div>
        </div>
        """
