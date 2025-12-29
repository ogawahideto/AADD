"""Wikipedia Japanese anniversary fetcher."""

import re
import logging
from datetime import date
from typing import List

import requests
from bs4 import BeautifulSoup

from fetchers.base_fetcher import BaseFetcher, Anniversary
from utils.retry import retry
from utils.content_filter import filter_positive_anniversaries

logger = logging.getLogger("AADD")


class WikipediaJaFetcher(BaseFetcher):
    """Fetches Japanese anniversaries from Wikipedia Japanese edition."""

    BASE_URL = "https://ja.wikipedia.org/wiki"
    TIMEOUT = 10  # seconds

    def __init__(self):
        """Initialize Wikipedia Japanese fetcher."""
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "AADD Bot/1.0 (Anniversary App Generator)"
        })

    @retry(max_attempts=3, delay=2, backoff=2, exceptions=(requests.RequestException,))
    def fetch(self, target_date: date) -> List[Anniversary]:
        """Fetch Japanese anniversaries from Wikipedia.

        Args:
            target_date: The date to fetch anniversaries for

        Returns:
            List of Anniversary objects

        Raises:
            requests.RequestException: If request fails
        """
        # Format URL: https://ja.wikipedia.org/wiki/12月27日
        month = target_date.month
        day = target_date.day
        url = f"{self.BASE_URL}/{month}月{day}日"

        logger.debug(f"Fetching from: {url}")

        # Fetch page
        response = self.session.get(url, timeout=self.TIMEOUT)
        response.raise_for_status()

        # Parse HTML
        soup = BeautifulSoup(response.content, "lxml")

        # Find "できごと" (Events) section
        # Try finding h2 with id="できごと" first (current Wikipedia structure)
        events_heading = soup.find("h2", id="できごと")

        if not events_heading:
            # Fallback: Try finding h2 containing "できごと" text
            all_h2 = soup.find_all("h2")
            for h2 in all_h2:
                if "できごと" in h2.get_text():
                    events_heading = h2
                    break

        if not events_heading:
            logger.warning("No 'できごと' section found on Wikipedia Japanese page")
            return []

        # Find the next <ul> after the heading
        events_list = events_heading.find_next("ul")

        if not events_list:
            logger.warning("No events list found")
            return []

        # Parse events
        anniversaries = []
        for li in events_list.find_all("li", recursive=False):
            try:
                anniversary = self._parse_event_item(li, target_date)
                if anniversary:
                    anniversaries.append(anniversary)
            except Exception as e:
                logger.debug(f"Failed to parse event: {e}")
                continue

        logger.info(f"Parsed {len(anniversaries)} events from Wikipedia Japanese")

        # Prioritize Japan-related events
        japan_keywords = [
            '日本', 'Japan', '東京', 'Tokyo', '江戸', 'Edo',
            '京都', 'Kyoto', '大阪', 'Osaka',
            '幕府', 'Shogunate', '明治', 'Meiji', '大正', 'Taisho',
            '昭和', 'Showa', '平成', 'Heisei', '令和', 'Reiwa',
            '将軍', 'Shogun', 'サムライ', 'Samurai', '侍',
            '作動', 'sado', '和', '記念日','の日'
        ]

        # Separate Japan-related and other events
        japan_events = []
        other_events = []

        for ann in anniversaries:
            text_to_check = f"{ann.title} {ann.description}".lower()
            is_japan_related = any(keyword.lower() in text_to_check for keyword in japan_keywords)

            if is_japan_related:
                japan_events.append(ann)
                logger.debug(f"Japan-related event: {ann.title}")
            else:
                other_events.append(ann)

        # Return Japan-related events first, then others
        prioritized = japan_events + other_events
        logger.info(f"Japan-related events: {len(japan_events)}, Other events: {len(other_events)}")

        # Filter out negative topics (war, violence, tragedy)
        positive_events = filter_positive_anniversaries(prioritized)
        logger.info(f"After filtering negative topics: {len(positive_events)} positive events")

        return positive_events[:15]  # Limit to top 15

    def _parse_event_item(self, li, target_date: date) -> Anniversary | None:
        """Parse a single event list item.

        Args:
            li: BeautifulSoup list item element
            target_date: The date this event is for

        Returns:
            Anniversary object or None if parsing fails
        """
        # Get text content
        text = li.get_text()

        # Wikipedia Japanese format: "年 - できごと"
        # Examples: "1945年 - IMFと世界銀行が設立された"
        match = re.match(r"^(\d+)年\s*[-–]\s*(.+)", text)
        if not match:
            return None

        year_str = match.group(1)
        description = match.group(2).strip()

        try:
            year = int(year_str)
        except ValueError:
            return None

        # Create title (first 50 characters of description)
        title = description[:50]
        if len(description) > 50:
            title += "..."

        # Categorize based on keywords (Japanese)
        category = self._categorize_event(description)

        return Anniversary(
            date=target_date,
            title=title,
            description=description,
            category=category,
            year=year,
            source="Wikipedia (ja)"
        )

    def _categorize_event(self, description: str) -> str:
        """Categorize an event based on description keywords (Japanese).

        Args:
            description: Event description in Japanese

        Returns:
            Category string
        """
        # Japanese category keywords
        categories = {
            "scientific": ["発見", "発明", "特許", "実験", "理論", "科学者"],
            "political": ["戦争", "条約", "大統領", "天皇", "首相", "帝国", "革命", "政治"],
            "cultural": ["絵画", "出版", "作曲", "芸術家", "作家", "美術館", "映画"],
            "historical": ["設立", "創設", "誕生", "死去", "暗殺"],
        }

        # Check for category keywords
        for category, keywords in categories.items():
            if any(keyword in description for keyword in keywords):
                return category

        return "historical"  # Default category
