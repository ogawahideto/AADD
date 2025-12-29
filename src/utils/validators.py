"""Validation utilities for AADD."""

import re
from pathlib import Path


def validate_html(html: str) -> bool:
    """Basic HTML validation.

    Args:
        html: HTML string to validate

    Returns:
        True if valid, False otherwise
    """
    if not html or not html.strip():
        return False

    # Check for basic HTML structure
    html_lower = html.lower()
    has_doctype_or_html = "<!doctype" in html_lower or "<html" in html_lower
    has_body = "<body" in html_lower

    return has_doctype_or_html and has_body


def validate_css(css: str) -> bool:
    """Basic CSS validation.

    Args:
        css: CSS string to validate

    Returns:
        True if valid, False otherwise
    """
    if not css:
        return True  # Empty CSS is valid

    # Check for at least one CSS rule (selector { properties })
    has_rule = re.search(r'[^{}]+\{[^{}]+\}', css)
    return bool(has_rule)


def validate_js(js: str) -> bool:
    """Basic JavaScript validation.

    Args:
        js: JavaScript string to validate

    Returns:
        True if valid, False otherwise
    """
    if not js:
        return True  # Empty JS is valid

    # Very basic check - just ensure it's not empty and has some code-like content
    # We don't do full syntax validation as that would require a JS parser
    js_stripped = js.strip()
    return len(js_stripped) > 0


def has_external_dependencies(html: str) -> bool:
    """Check if HTML has external dependencies (CDN links, external scripts, etc.).

    Args:
        html: HTML string to check

    Returns:
        True if external dependencies found, False otherwise
    """
    # Check for external scripts
    external_script = re.search(r'<script[^>]+src=["\']https?://', html, re.IGNORECASE)
    if external_script:
        return True

    # Check for external stylesheets
    external_css = re.search(r'<link[^>]+href=["\']https?://', html, re.IGNORECASE)
    if external_css:
        return True

    # Check for external images (except data URLs)
    external_img = re.search(r'<img[^>]+src=["\']https?://', html, re.IGNORECASE)
    if external_img:
        return True

    return False


def validate_file_size(content: str, max_size_kb: int = 100) -> bool:
    """Validate file size.

    Args:
        content: File content
        max_size_kb: Maximum size in kilobytes

    Returns:
        True if within size limit, False otherwise
    """
    size_bytes = len(content.encode('utf-8'))
    size_kb = size_bytes / 1024
    return size_kb <= max_size_kb
