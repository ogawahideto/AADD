"""Claude API web app generator."""

import re
import json
import logging
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from anthropic import Anthropic
import anthropic

from config import Config, Language
from fetchers.base_fetcher import Anniversary
from utils.validators import (
    validate_html,
    validate_css,
    validate_js,
    has_external_dependencies,
    validate_file_size
)
from generators.prompt_templates import build_prompt

logger = logging.getLogger("AADD")


@dataclass
class GeneratedApp:
    """Represents a generated web application."""

    html: str
    css: str
    js: str
    metadata: dict
    anniversary: Anniversary
    language: Language
    generated_at: datetime
    thinking: str = ""  # Claude's extended thinking (if enabled)


class ClaudeWebAppGenerator:
    """Generates web applications using Claude API."""

    def __init__(self, config: Config):
        """Initialize generator.

        Args:
            config: Application configuration
        """
        self.config = config
        self.client = Anthropic(api_key=config.CLAUDE_API_KEY)

    def generate_app(self, anniversary: Anniversary, language: Language = Language.ENGLISH) -> GeneratedApp:
        """Generate a complete web application for an anniversary.

        Args:
            anniversary: The anniversary to generate an app for

        Returns:
            GeneratedApp object with HTML, CSS, JS, and metadata

        Raises:
            ValueError: If generation fails or output is invalid
            anthropic.APIError: If API call fails
        """
        logger.info(f"Generating app for: {anniversary.title} (language: {language.value})")

        # Build prompt
        prompt = build_prompt(anniversary, language)
        logger.debug(f"Prompt length: {len(prompt)} characters")

        # Call Claude API
        try:
            response = self._call_claude_api(prompt)
        except anthropic.RateLimitError as e:
            logger.error(f"Claude API rate limit exceeded: {e}")
            raise
        except anthropic.APIError as e:
            logger.error(f"Claude API error: {e}")
            raise

        # Parse response
        try:
            app = self._parse_response(response, anniversary, language)
        except Exception as e:
            logger.error(f"Failed to parse Claude response: {e}")
            raise ValueError(f"Failed to parse response: {e}")

        # Validate generated app
        self._validate_app(app)

        logger.info(
            f"Successfully generated app: {app.metadata.get('app_title', 'Untitled')}"
        )
        return app

    def _call_claude_api(self, prompt: str):
        """Call Claude API with extended thinking if enabled.

        Args:
            prompt: The prompt to send

        Returns:
            API response object
        """
        # Prepare messages
        messages = [
            {
                "role": "user",
                "content": prompt
            }
        ]

        # Prepare request parameters
        request_params = {
            "model": self.config.CLAUDE_MODEL,
            "max_tokens": self.config.CLAUDE_MAX_TOKENS,
            "messages": messages
        }

        # Add extended thinking if enabled
        if self.config.ENABLE_EXTENDED_THINKING:
            request_params["thinking"] = {
                "type": "enabled",
                "budget_tokens": self.config.CLAUDE_THINKING_BUDGET
            }
            logger.info("Extended thinking enabled")

        # Make API call
        logger.info(f"Calling Claude API (model: {self.config.CLAUDE_MODEL})...")
        response = self.client.messages.create(**request_params)

        # Log token usage
        usage = response.usage
        logger.info(
            f"API call completed. Tokens - Input: {usage.input_tokens}, "
            f"Output: {usage.output_tokens}"
        )

        return response

    def _parse_response(self, response, anniversary: Anniversary, language: Language) -> GeneratedApp:
        """Parse Claude's response to extract files and metadata.

        Args:
            response: Claude API response
            anniversary: The anniversary this app is for

        Returns:
            GeneratedApp object

        Raises:
            ValueError: If response format is invalid
        """
        # Extract thinking (if present)
        thinking = ""
        text_content = ""

        for block in response.content:
            if block.type == "thinking":
                thinking = block.thinking
                logger.debug(f"Thinking length: {len(thinking)} characters")
            elif block.type == "text":
                text_content += block.text

        if not text_content:
            raise ValueError("No text content in response")

        # Parse using regex
        html_match = re.search(
            r'<html_file>(.*?)</html_file>',
            text_content,
            re.DOTALL
        )
        css_match = re.search(
            r'<css_file>(.*?)</css_file>',
            text_content,
            re.DOTALL
        )
        js_match = re.search(
            r'<js_file>(.*?)</js_file>',
            text_content,
            re.DOTALL
        )
        metadata_match = re.search(
            r'<metadata>(.*?)</metadata>',
            text_content,
            re.DOTALL
        )

        # Check all required files are present
        if not all([html_match, css_match, js_match]):
            missing = []
            if not html_match:
                missing.append("HTML")
            if not css_match:
                missing.append("CSS")
            if not js_match:
                missing.append("JS")
            raise ValueError(f"Missing required files: {', '.join(missing)}")

        # Extract file contents
        html = html_match.group(1).strip()
        css = css_match.group(1).strip()
        js = js_match.group(1).strip()

        # Parse metadata (optional)
        metadata = {}
        if metadata_match:
            try:
                metadata_str = metadata_match.group(1).strip()
                metadata = json.loads(metadata_str)
            except json.JSONDecodeError as e:
                logger.warning(f"Failed to parse metadata JSON: {e}")
                metadata = {}

        return GeneratedApp(
            html=html,
            css=css,
            js=js,
            metadata=metadata,
            anniversary=anniversary,
            language=language,
            generated_at=datetime.now(),
            thinking=thinking
        )

    def _validate_app(self, app: GeneratedApp):
        """Validate generated app meets quality standards.

        Args:
            app: The generated app to validate

        Raises:
            ValueError: If validation fails
        """
        logger.debug("Validating generated app...")

        # Validate HTML
        if not validate_html(app.html):
            raise ValueError("Generated HTML is invalid or empty")

        # Validate CSS (basic check)
        if not validate_css(app.css):
            logger.warning("Generated CSS may be invalid")

        # Validate JS (basic check)
        if not validate_js(app.js):
            logger.warning("Generated JS may be invalid")

        # Check for external dependencies
        if has_external_dependencies(app.html):
            logger.warning(
                "Generated HTML contains external dependencies (CDN links). "
                "This may not work offline."
            )

        # Validate file sizes
        if not validate_file_size(app.html, max_size_kb=100):
            logger.warning("HTML file size exceeds 100KB")

        if not validate_file_size(app.css, max_size_kb=50):
            logger.warning("CSS file size exceeds 50KB")

        if not validate_file_size(app.js, max_size_kb=100):
            logger.warning("JS file size exceeds 100KB")

        logger.debug("Validation completed")
