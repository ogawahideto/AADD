"""AI-powered anniversary selection for AADD."""

import json
import logging
from typing import List
from anthropic import Anthropic

from fetchers.base_fetcher import Anniversary
from config import Config, Language

logger = logging.getLogger("AADD")


class AnniversarySelector:
    """Uses AI to intelligently select the best anniversary."""

    def __init__(self, config: Config):
        """Initialize selector with Claude API.

        Args:
            config: Application configuration
        """
        self.client = Anthropic(api_key=config.CLAUDE_API_KEY)
        self.model = "claude-3-7-sonnet-20250219"

    def select_best_anniversary(
        self,
        anniversaries: List[Anniversary],
        language: Language
    ) -> Anniversary:
        """Use AI to select the most interesting anniversary.

        Args:
            anniversaries: List of candidate anniversaries
            language: Target language for selection criteria

        Returns:
            Selected anniversary
        """
        if not anniversaries:
            raise ValueError("Cannot select from empty list")

        if len(anniversaries) == 1:
            return anniversaries[0]

        logger.info(f"Using AI to select from {len(anniversaries)} anniversaries for {language.value}")

        # Build prompt based on language
        if language == Language.JAPANESE:
            prompt = self._build_japanese_selection_prompt(anniversaries)
        else:
            prompt = self._build_english_selection_prompt(anniversaries)

        # Call Claude API
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[{
                    "role": "user",
                    "content": prompt
                }]
            )

            result_text = response.content[0].text
            logger.debug(f"AI selection response: {result_text}")

            # Parse the response
            selected_index = self._parse_selection_response(result_text, len(anniversaries))
            selected = anniversaries[selected_index]

            logger.info(f"AI selected: {selected.title} (index: {selected_index})")
            return selected

        except Exception as e:
            logger.error(f"AI selection failed: {e}, falling back to first anniversary")
            return anniversaries[0]

    def _build_japanese_selection_prompt(self, anniversaries: List[Anniversary]) -> str:
        """Build selection prompt for Japanese version (Japan-focused).

        Args:
            anniversaries: List of candidate anniversaries

        Returns:
            Prompt string
        """
        candidates = []
        for i, ann in enumerate(anniversaries):
            candidates.append(
                f"{i}. {ann.title} ({ann.year})\n"
                f"   説明: {ann.description[:200]}..."
            )

        candidates_text = "\n\n".join(candidates)

        return f"""あなたは日本の読者向けにWebアプリを作成するキュレーターです。
以下の歴史的記念日の中から、日本の読者が最も興味を持ちそうなものを1つ選んでください。

選択基準（優先度順）：
1. **ポジティブな話題** - 明るく前向きな出来事（発明、発見、文化的達成、平和的な前進など）を優先
2. **日本との関連性** - 日本の歴史、文化、人物、場所に直接関係するもの
3. **日本への影響** - 日本に大きな影響を与えた出来事
4. **興味深さ** - 日本の読者が面白いと感じる独自性や意外性
5. **教育的価値** - 日本の読者が学べる重要な歴史的意義

**重要**: 戦争、暴力、悲劇的な出来事は避けてください

候補：
{candidates_text}

最も適切な候補の番号（0から{len(anniversaries)-1}）を選び、以下の形式で回答してください：

SELECTED: [番号]
REASON: [選択理由を1-2文で簡潔に]

例：
SELECTED: 2
REASON: この出来事は日本の近代化に直接影響を与え、現代の日本社会の基礎となった重要な転換点だからです。
"""

    def _build_english_selection_prompt(self, anniversaries: List[Anniversary]) -> str:
        """Build selection prompt for English version (global interest).

        Args:
            anniversaries: List of candidate anniversaries

        Returns:
            Prompt string
        """
        candidates = []
        for i, ann in enumerate(anniversaries):
            candidates.append(
                f"{i}. {ann.title} ({ann.year})\n"
                f"   Description: {ann.description[:200]}..."
            )

        candidates_text = "\n\n".join(candidates)

        return f"""You are a curator creating engaging web apps for a global English-speaking audience.
Select ONE anniversary from the following list that would make the most compelling and interesting web application.

Selection criteria (in priority order):
1. **Positive topics** - Prioritize uplifting, constructive events (inventions, discoveries, cultural achievements, peaceful progress)
2. **Global significance** - Events that shaped world history or culture positively
3. **Storytelling potential** - Rich narratives with inspiration, human triumph, or transformation
4. **Uniqueness** - Surprising, unusual, or lesser-known positive stories that deserve attention
5. **Visual appeal** - Events that can be presented with engaging interactive elements
6. **Contemporary relevance** - Connection to modern issues or ongoing positive influence

**IMPORTANT**: Avoid war, violence, tragedies, and negative events. Focus on celebration, achievement, and hope

Candidates:
{candidates_text}

Select the most appropriate candidate by its index number (0 to {len(anniversaries)-1}) and respond in this format:

SELECTED: [number]
REASON: [Brief 1-2 sentence explanation of why this is the most compelling choice]

Example:
SELECTED: 2
REASON: This event fundamentally transformed global communication and has direct relevance to today's digital age, offering rich storytelling opportunities.
"""

    def _parse_selection_response(self, response: str, max_index: int) -> int:
        """Parse AI's selection response.

        Args:
            response: AI response text
            max_index: Maximum valid index

        Returns:
            Selected index (0-based)
        """
        # Look for "SELECTED: N" pattern
        import re
        match = re.search(r'SELECTED:\s*(\d+)', response, re.IGNORECASE)

        if match:
            index = int(match.group(1))
            if 0 <= index < max_index:
                return index

        # Fallback: look for any number in the response
        numbers = re.findall(r'\b(\d+)\b', response)
        if numbers:
            index = int(numbers[0])
            if 0 <= index < max_index:
                return index

        logger.warning(f"Could not parse selection from response: {response}, using index 0")
        return 0
