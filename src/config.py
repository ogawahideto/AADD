"""Configuration management for AADD."""

import os
from dataclasses import dataclass
from pathlib import Path
from enum import Enum
from dotenv import load_dotenv


class Language(Enum):
    """Supported languages."""
    JAPANESE = "ja"
    ENGLISH = "en"


@dataclass
class Config:
    """Application configuration."""

    # API Keys
    CLAUDE_API_KEY: str
    API_NINJAS_KEY: str

    # Claude Settings
    CLAUDE_MODEL: str
    CLAUDE_MAX_TOKENS: int
    CLAUDE_THINKING_BUDGET: int

    # Paths
    PROJECT_ROOT: Path
    DOCS_DIR: Path
    LOGS_DIR: Path
    DATA_DIR: Path
    SRC_DIR: Path

    # Git Settings
    GIT_USER_NAME: str
    GIT_USER_EMAIL: str
    GIT_REMOTE: str
    GIT_BRANCH: str

    # Retry Settings
    MAX_RETRIES: int
    RETRY_DELAY: int

    # Feature Flags
    ENABLE_GIT_PUSH: bool
    ENABLE_EXTENDED_THINKING: bool
    ENABLE_ERROR_EMAILS: bool

    # Optional Email Settings
    ERROR_EMAIL_FROM: str
    ERROR_EMAIL_TO: str
    SMTP_SERVER: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str

    @classmethod
    def load(cls, env_file: Path = None) -> "Config":
        """Load configuration from .env file.

        Args:
            env_file: Path to .env file. If None, searches for .env in project root.

        Returns:
            Config instance with loaded settings.

        Raises:
            FileNotFoundError: If .env file not found.
            ValueError: If required configuration is missing.
        """
        # Find project root (parent of src directory)
        current_file = Path(__file__).resolve()
        project_root = current_file.parent.parent

        # Find .env file
        if env_file is None:
            env_file = project_root / ".env"

        if not env_file.exists():
            raise FileNotFoundError(
                f".env file not found at {env_file}. "
                f"Copy .env.example to .env and configure with your API keys."
            )

        # Load .env file
        load_dotenv(env_file)

        # Validate required fields
        claude_api_key = os.getenv("CLAUDE_API_KEY")
        if not claude_api_key:
            raise ValueError(
                "CLAUDE_API_KEY is required in .env file. "
                "Get your API key from https://console.anthropic.com/"
            )

        # Parse boolean helper
        def parse_bool(value: str, default: bool = False) -> bool:
            if not value:
                return default
            return value.lower() in ("true", "1", "yes", "on")

        # Parse integer helper
        def parse_int(value: str, default: int) -> int:
            if not value:
                return default
            try:
                return int(value)
            except ValueError:
                return default

        return cls(
            # API Keys
            CLAUDE_API_KEY=claude_api_key,
            API_NINJAS_KEY=os.getenv("API_NINJAS_KEY", ""),

            # Claude Settings
            CLAUDE_MODEL=os.getenv("CLAUDE_MODEL", "claude-sonnet-4-5-20251101"),
            CLAUDE_MAX_TOKENS=parse_int(os.getenv("CLAUDE_MAX_TOKENS"), 8000),
            CLAUDE_THINKING_BUDGET=parse_int(os.getenv("CLAUDE_THINKING_BUDGET"), 2000),

            # Paths
            PROJECT_ROOT=project_root,
            DOCS_DIR=project_root / "docs",
            LOGS_DIR=project_root / "logs",
            DATA_DIR=project_root / "data",
            SRC_DIR=project_root / "src",

            # Git Settings
            GIT_USER_NAME=os.getenv("GIT_USER_NAME", "AADD Bot"),
            GIT_USER_EMAIL=os.getenv("GIT_USER_EMAIL", "aadd@example.com"),
            GIT_REMOTE=os.getenv("GIT_REMOTE", "origin"),
            GIT_BRANCH=os.getenv("GIT_BRANCH", "main"),

            # Retry Settings
            MAX_RETRIES=parse_int(os.getenv("MAX_RETRIES"), 3),
            RETRY_DELAY=parse_int(os.getenv("RETRY_DELAY"), 5),

            # Feature Flags
            ENABLE_GIT_PUSH=parse_bool(os.getenv("ENABLE_GIT_PUSH"), True),
            ENABLE_EXTENDED_THINKING=parse_bool(os.getenv("ENABLE_EXTENDED_THINKING"), True),
            ENABLE_ERROR_EMAILS=parse_bool(os.getenv("ENABLE_ERROR_EMAILS"), False),

            # Optional Email Settings
            ERROR_EMAIL_FROM=os.getenv("ERROR_EMAIL_FROM", ""),
            ERROR_EMAIL_TO=os.getenv("ERROR_EMAIL_TO", ""),
            SMTP_SERVER=os.getenv("SMTP_SERVER", "smtp.gmail.com"),
            SMTP_PORT=parse_int(os.getenv("SMTP_PORT"), 587),
            SMTP_USER=os.getenv("SMTP_USER", ""),
            SMTP_PASSWORD=os.getenv("SMTP_PASSWORD", ""),
        )

    def ensure_directories(self):
        """Create required directories if they don't exist."""
        self.DOCS_DIR.mkdir(exist_ok=True)
        self.LOGS_DIR.mkdir(exist_ok=True)
        self.DATA_DIR.mkdir(exist_ok=True)
        (self.DATA_DIR / "templates").mkdir(exist_ok=True)
        (self.DOCS_DIR / "assets").mkdir(exist_ok=True)
        (self.DOCS_DIR / "assets" / "css").mkdir(exist_ok=True)
        (self.DOCS_DIR / "assets" / "js").mkdir(exist_ok=True)
