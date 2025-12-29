"""Fallback anniversary fetcher using static JSON data."""

import json
import logging
from datetime import date
from pathlib import Path
from typing import List

from fetchers.base_fetcher import BaseFetcher, Anniversary
from utils.content_filter import filter_positive_anniversaries

logger = logging.getLogger("AADD")


class FallbackFetcher(BaseFetcher):
    """Fetches anniversaries from static JSON file.

    This fetcher serves as a last resort when all API/web fetchers fail.
    It uses a pre-populated JSON file with historical events.
    """

    def __init__(self, data_file: Path):
        """Initialize fallback fetcher.

        Args:
            data_file: Path to JSON file with fallback data
        """
        self.data_file = data_file
        self._data = None

    def _load_data(self):
        """Load data from JSON file."""
        if self._data is None:
            if not self.data_file.exists():
                logger.error(f"Fallback data file not found: {self.data_file}")
                self._data = {}
                return

            try:
                with open(self.data_file, "r", encoding="utf-8") as f:
                    self._data = json.load(f)
                logger.debug(f"Loaded fallback data from {self.data_file}")
            except Exception as e:
                logger.error(f"Failed to load fallback data: {e}")
                self._data = {}

    def fetch(self, target_date: date) -> List[Anniversary]:
        """Fetch anniversaries from static data.

        Args:
            target_date: The date to fetch anniversaries for

        Returns:
            List of Anniversary objects
        """
        self._load_data()

        # Format key as MM-DD
        key = target_date.strftime("%m-%d")

        events = self._data.get(key, [])
        if not events:
            logger.warning(f"No fallback data for {key}")
            return []

        anniversaries = []
        for event in events:
            try:
                anniversaries.append(Anniversary(
                    date=target_date,
                    title=event["title"],
                    description=event["description"],
                    category=event.get("category", "historical"),
                    year=event["year"],
                    source="Fallback"
                ))
            except KeyError as e:
                logger.warning(f"Malformed fallback event (missing {e}): {event}")
                continue

        logger.info(f"Loaded {len(anniversaries)} events from fallback data")

        # Filter out negative topics (war, violence, tragedy)
        positive_events = filter_positive_anniversaries(anniversaries)
        logger.info(f"After filtering negative topics: {len(positive_events)} positive events")

        return positive_events

    def is_available(self) -> bool:
        """Check if fallback data file exists.

        Returns:
            True if data file exists, False otherwise
        """
        return self.data_file.exists()
