"""Wikipedia anniversary fetcher."""

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


class WikipediaFetcher(BaseFetcher):
    """Fetches anniversaries from Wikipedia 'On This Day' pages."""

    BASE_URL = "https://en.wikipedia.org/wiki"
    TIMEOUT = 10  # seconds

    def __init__(self):
        """Initialize Wikipedia fetcher."""
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "AADD Bot/1.0 (Anniversary App Generator)"
        })

    @retry(max_attempts=3, delay=2, backoff=2, exceptions=(requests.RequestException,))
    def fetch(self, target_date: date) -> List[Anniversary]:
        """Fetch anniversaries from Wikipedia.

        Args:
            target_date: The date to fetch anniversaries for

        Returns:
            List of Anniversary objects

        Raises:
            requests.RequestException: If request fails
        """
        # Format URL: https://en.wikipedia.org/wiki/January_1
        month_name = target_date.strftime("%B")
        day = target_date.day
        url = f"{self.BASE_URL}/{month_name}_{day}"

        logger.debug(f"Fetching from: {url}")

        # Fetch page
        response = self.session.get(url, timeout=self.TIMEOUT)
        response.raise_for_status()

        # Parse HTML
        soup = BeautifulSoup(response.content, "lxml")

        # Find "Events" section - try both old and new HTML structures
        events_section = soup.find("span", id="Events")
        if events_section:
            # Old structure: <h2><span id="Events">Events</span></h2>
            events_heading = events_section.find_parent(["h2", "h3"])
        else:
            # New structure: <h2 id="Events">Events</h2>
            events_heading = soup.find(["h2", "h3"], id="Events")

        if not events_heading:
            logger.warning("No 'Events' section found on Wikipedia page")
            return []

        # Find the next <ul> after the heading
        # Note: Wikipedia's HTML structure changed - <ul> may not be a direct sibling
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

        logger.info(f"Parsed {len(anniversaries)} events from Wikipedia")

        # Filter out negative topics (war, violence, tragedy)
        positive_events = filter_positive_anniversaries(anniversaries)
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

        # Wikipedia format: "YEAR – Event description"
        # Sometimes: "YEAR BCE – Event description"
        # Sometimes: "c. YEAR – Event description"
        match = re.match(r"^(c\.\s*)?(\d+)\s*(?:BCE|CE|BC|AD)?\s*[–-]\s*(.+)", text)
        if not match:
            return None

        year_str = match.group(2)
        description = match.group(3).strip()

        try:
            year = int(year_str)
        except ValueError:
            return None

        # Handle BCE/BC years (negative)
        if "BCE" in text or "BC" in text:
            year = -year

        # Create title (first 100 characters of description)
        title = description[:100]
        if len(description) > 100:
            title += "..."

        # Categorize based on keywords
        category = self._categorize_event(description)

        return Anniversary(
            date=target_date,
            title=title,
            description=description,
            category=category,
            year=year,
            source="Wikipedia"
        )

    def _categorize_event(self, description: str) -> str:
        """Categorize an event based on description keywords.

        Args:
            description: Event description

        Returns:
            Category string
        """
        desc_lower = description.lower()

        # Define category keywords
        categories = {
            "scientific": ["discover", "invent", "patent", "experiment", "theory", "scientist"],
            "political": ["war", "treaty", "president", "king", "queen", "empire", "revolution"],
            "cultural": ["paint", "publish", "compose", "artist", "writer", "museum", "film"],
            "historical": ["found", "establish", "birth", "death", "assassin"],
        }

        # Check for category keywords
        for category, keywords in categories.items():
            if any(keyword in desc_lower for keyword in keywords):
                return category

        return "historical"  # Default category
