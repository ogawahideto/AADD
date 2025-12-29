"""Base classes and data structures for anniversary fetchers."""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import date
from typing import List
import logging

logger = logging.getLogger("AADD")


@dataclass
class Anniversary:
    """Represents a historical anniversary or commemorative day."""

    date: date
    title: str
    description: str
    category: str  # "historical", "commemorative", "cultural", "scientific", etc.
    year: int  # Year of the original event
    source: str  # "Wikipedia", "API Ninjas", "Fallback", etc.
    interest_score: float = 0.0  # Calculated score for ranking (0-1)

    def __str__(self) -> str:
        """String representation."""
        years_ago = self.date.year - self.year
        return f"{self.title} ({self.year}, {years_ago} years ago)"


class BaseFetcher(ABC):
    """Abstract base class for anniversary fetchers."""

    @abstractmethod
    def fetch(self, target_date: date) -> List[Anniversary]:
        """Fetch anniversaries for a given date.

        Args:
            target_date: The date to fetch anniversaries for

        Returns:
            List of Anniversary objects

        Raises:
            Exception: If fetching fails
        """
        pass

    def is_available(self) -> bool:
        """Check if this fetcher can be used.

        Returns:
            True if available, False otherwise
        """
        return True


class FetcherManager:
    """Manages multiple fetchers with fallback strategy."""

    def __init__(self, fetchers: List[BaseFetcher]):
        """Initialize with list of fetchers.

        Args:
            fetchers: List of fetchers to try, in order
        """
        self.fetchers = fetchers

    def fetch_anniversaries(self, target_date: date) -> List[Anniversary]:
        """Fetch anniversaries using fallback strategy.

        Args:
            target_date: The date to fetch anniversaries for

        Returns:
            List of Anniversary objects

        Raises:
            Exception: If all fetchers fail
        """
        for fetcher in self.fetchers:
            fetcher_name = fetcher.__class__.__name__

            try:
                if not fetcher.is_available():
                    logger.debug(f"{fetcher_name} not available, skipping")
                    continue

                logger.info(f"Trying {fetcher_name}...")
                anniversaries = fetcher.fetch(target_date)

                if anniversaries:
                    logger.info(
                        f"Successfully fetched {len(anniversaries)} anniversaries "
                        f"from {fetcher_name}"
                    )
                    return anniversaries
                else:
                    logger.warning(f"{fetcher_name} returned no anniversaries")

            except Exception as e:
                logger.warning(f"{fetcher_name} failed: {e}")
                continue

        raise Exception("All anniversary fetchers failed")


def select_best_anniversary(anniversaries: List[Anniversary], language=None) -> Anniversary:
    """Select the most interesting anniversary using scoring criteria.

    Scoring criteria:
    - Significant anniversaries (50, 100, 150, 200 years) get bonus points
    - Category preference (historical > cultural > commemorative)
    - Description richness (longer descriptions indicate more content)
    - Language-specific relevance (Japan-related for Japanese)

    Args:
        anniversaries: List of anniversaries to choose from
        language: Language enum for language-specific scoring (optional)

    Returns:
        The highest-scoring anniversary
    """
    if not anniversaries:
        raise ValueError("Cannot select from empty list")

    current_year = date.today().year

    # Japan-related keywords for Japanese language preference
    japan_keywords = [
        '日本', 'Japan', 'Japanese',
        '東京', 'Tokyo',
        '江戸', 'Edo',
        '京都', 'Kyoto',
        '大阪', 'Osaka',
        '天皇', 'Emperor',
        '幕府', 'Shogunate',
        '明治', 'Meiji',
        '大正', 'Taisho',
        '昭和', 'Showa',
        '平成', 'Heisei',
        '令和', 'Reiwa',
        '将軍', 'Shogun',
        'サムライ', 'Samurai',
        '侍',
    ]

    for ann in anniversaries:
        score = 0.0

        # Calculate years ago
        years_ago = current_year - ann.year

        # Significant year bonus
        if years_ago % 100 == 0:
            score += 0.4
        elif years_ago % 50 == 0:
            score += 0.3
        elif years_ago % 25 == 0:
            score += 0.2
        elif years_ago % 10 == 0:
            score += 0.1

        # Category preference
        category_scores = {
            "historical": 0.3,
            "cultural": 0.25,
            "scientific": 0.25,
            "political": 0.2,
            "commemorative": 0.15,
        }
        score += category_scores.get(ann.category.lower(), 0.1)

        # Description richness (longer = more interesting content)
        desc_length = len(ann.description)
        if desc_length > 500:
            score += 0.2
        elif desc_length > 250:
            score += 0.15
        elif desc_length > 100:
            score += 0.1

        # Language-specific relevance bonus
        if language:
            from config import Language
            if language == Language.JAPANESE:
                # Check for Japan-related keywords
                text_to_check = f"{ann.title} {ann.description}".lower()
                for keyword in japan_keywords:
                    if keyword.lower() in text_to_check:
                        score += 0.5  # Major bonus for Japan-related content
                        logger.debug(f"Japan-related keyword '{keyword}' found in: {ann.title}")
                        break

        # Update score
        ann.interest_score = min(score, 1.0)  # Cap at 1.0

    # Return highest scoring
    best = max(anniversaries, key=lambda a: a.interest_score)
    logger.info(
        f"Selected: {best.title} (score: {best.interest_score:.2f}, "
        f"year: {best.year}, category: {best.category})"
    )
    return best
