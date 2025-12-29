"""Content filter for AADD to avoid negative topics."""

import re
from typing import List
from fetchers.base_fetcher import Anniversary


# Keywords to avoid (war, violence, tragedy)
NEGATIVE_KEYWORDS_EN = [
    "war", "battle", "massacre", "bomb", "attack", "assassin", "kill", "death", "die",
    "murder", "terror", "blitz", "raid", "invasion", "occupation", "genocide", "slave",
    "weapon", "nuclear", "atomic", "disaster", "crash", "sink", "fire", "explosion",
    "conflict", "revolutionary", "revolt", "coup", "siege", "surrender", "treaty",
    "military", "naval", "army", "soldier", "wounded"
]

NEGATIVE_KEYWORDS_JA = [
    "戦争", "戦", "戦い", "合戦", "虐殺", "爆弾", "爆撃", "空襲", "攻撃", "暗殺", "殺", "死",
    "殺害", "テロ", "襲撃", "侵略", "占領", "奴隷", "兵器", "核", "原爆", "災害", "事故",
    "墜落", "沈没", "火災", "爆発", "紛争", "革命", "反乱", "クーデター", "包囲", "降伏",
    "条約", "軍", "海軍", "陸軍", "兵士", "軍縮", "破棄", "軍備"
]


def is_positive_topic(anniversary: Anniversary) -> bool:
    """Check if an anniversary is a positive topic.

    Args:
        anniversary: Anniversary to check

    Returns:
        True if positive, False if negative/violent
    """
    # Combine title and description for checking
    text = f"{anniversary.title} {anniversary.description}".lower()

    # Check English keywords
    for keyword in NEGATIVE_KEYWORDS_EN:
        if re.search(r'\b' + keyword + r'\b', text, re.IGNORECASE):
            return False

    # Check Japanese keywords
    for keyword in NEGATIVE_KEYWORDS_JA:
        if keyword in text:
            return False

    return True


def filter_positive_anniversaries(anniversaries: List[Anniversary]) -> List[Anniversary]:
    """Filter out negative/violent topics, keep only positive ones.

    Args:
        anniversaries: List of anniversaries to filter

    Returns:
        Filtered list with only positive topics
    """
    return [ann for ann in anniversaries if is_positive_topic(ann)]
