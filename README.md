# AADD - Automated Anniversary-Driven Development

🎉 **Daily web apps celebrating historical anniversaries, automatically generated with AI**

Every day at 9:00 AM, AADD automatically:
1. Fetches historical anniversaries from Wikipedia
2. Selects the most interesting one using intelligent scoring
3. Generates a creative, interactive web app using Claude AI
4. Publishes it to GitHub Pages

[View Live Site](https://ogawahideto.github.io/AADD/) (after setup)

## Features

- **Fully Automated**: Runs daily on Windows Task Scheduler
- **AI-Powered**: Uses Claude Sonnet 4.5 with Extended Thinking for creative generation
- **Self-Contained Apps**: Each app is a standalone HTML/CSS/JS site (no build process)
- **Responsive Design**: Works perfectly on mobile and desktop
- **Interactive**: Each app includes 2-3 interactive features (timeline, quiz, carousel, etc.)
- **Reliable**: Multi-layer fallback system ensures 100% uptime

## Quick Start

### Prerequisites

- Windows 10/11
- Python 3.11 or higher
- Git
- Claude API key ([get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ogawahideto/AADD.git
   cd AADD
   ```

2. **Set up Python virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example file
   copy .env.example .env

   # Edit .env and add your Claude API key
   notepad .env
   ```

   Add your Claude API key to the `.env` file:
   ```env
   CLAUDE_API_KEY=sk-ant-api03-your-api-key-here
   ```

4. **Test the system**
   ```bash
   # Run a manual test
   scripts\test_run.bat
   ```

5. **Set up automatic daily execution**
   ```powershell
   # Run PowerShell as Administrator
   # Right-click PowerShell → "Run as Administrator"

   # Allow script execution
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

   # Run setup script
   .\scripts\setup_task_scheduler.ps1
   ```

6. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`, Folder: `/docs`
   - Click "Save"

   Your site will be live at: `https://ogawahideto.github.io/AADD/`

## How It Works

### System Architecture

```
┌─────────────────────┐
│ Windows Task        │
│ Scheduler (9:00 AM) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Python Script       │
│ (src/main.py)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Fetch Anniversaries │
│ (Wikipedia +        │
│  Fallback)          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Select Best Using   │
│ Intelligent Scoring │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Generate Web App    │
│ (Claude API)        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Save to             │
│ docs/YYYY/MM-DD/    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Update Index Pages  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Git Commit & Push   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ GitHub Pages        │
│ (Auto-publishes)    │
└─────────────────────┘
```

### Anniversary Selection

The system uses intelligent scoring to select the most interesting anniversary:
- **Significant years**: 100th, 50th, 25th anniversaries get bonus points
- **Category preference**: Historical > Scientific > Cultural > Political
- **Description richness**: Longer descriptions indicate more content

### Web App Generation

Each generated app includes:
- **Interactive features**: Timeline, quiz, facts carousel, comparisons, etc.
- **Responsive design**: Works on all screen sizes
- **Accessibility**: Keyboard navigation, ARIA labels, semantic HTML
- **No external dependencies**: Works offline, no CDN links
- **Modern styling**: Dark mode support, smooth animations

## Project Structure

```
AADD/
├── docs/                    # GitHub Pages root (published content)
│   ├── index.html           # Main landing page
│   ├── assets/              # Shared assets
│   │   ├── css/index-style.css
│   │   └── js/index-app.js
│   ├── 2025/                # Year directories
│   │   ├── 01-15/           # Individual apps (MM-DD format)
│   │   │   ├── index.html
│   │   │   ├── style.css
│   │   │   ├── app.js
│   │   │   └── metadata.json
│   │   └── ...
│   └── .nojekyll            # Bypass Jekyll processing
│
├── src/                     # Python source code
│   ├── main.py              # Main orchestrator
│   ├── config.py            # Configuration management
│   ├── fetchers/            # Anniversary fetching
│   ├── generators/          # Web app generation
│   ├── publishers/          # Publishing & Git
│   └── utils/               # Utilities
│
├── data/                    # Static data
│   ├── fallback_anniversaries.json
│   └── templates/           # HTML templates
│
├── scripts/                 # Automation scripts
│   ├── run_aadd.bat         # Task Scheduler runner
│   ├── test_run.bat         # Manual test
│   └── setup_task_scheduler.ps1
│
├── logs/                    # Log files (auto-created)
├── venv/                    # Python virtual environment
├── .env                     # Environment variables (gitignored)
├── .env.example             # Environment template
└── requirements.txt         # Python dependencies
```

## Configuration

All configuration is in the `.env` file:

```env
# Required: Claude API key
CLAUDE_API_KEY=sk-ant-api03-...

# Claude settings
CLAUDE_MODEL=claude-sonnet-4-5-20251101
CLAUDE_MAX_TOKENS=8000
CLAUDE_THINKING_BUDGET=2000

# Git settings
GIT_USER_NAME=your-name
GIT_USER_EMAIL=your-email@example.com

# Feature flags
ENABLE_GIT_PUSH=true
ENABLE_EXTENDED_THINKING=true
```

## Logs

All operations are logged to:
- `logs/aadd.log` - All logs (DEBUG and above)
- `logs/aadd_errors.log` - Errors only
- `logs/task_scheduler_YYYYMMDD_HHMMSS.log` - Per-run logs from Task Scheduler

Check these files if something goes wrong.

## Troubleshooting

### "CLAUDE_API_KEY is required" error
- Make sure `.env` file exists in project root
- Ensure `CLAUDE_API_KEY` is set in `.env`
- Get your API key from https://console.anthropic.com/

### App generation failed
- Check your API key is valid
- Ensure you have API credits available
- Check `logs/aadd_errors.log` for details

### Git push failed
- Ensure Git credentials are configured
- Check you have push access to the repository
- Verify `GIT_USER_NAME` and `GIT_USER_EMAIL` in `.env`

### Task Scheduler not running
- Open Task Scheduler (Win+R, type `taskschd.msc`)
- Find "AADD-DailyGeneration" task
- Check "Last Run Result" (should be 0x0 for success)
- Check task history for details

### GitHub Pages not updating
- Allow 2-5 minutes for GitHub to rebuild
- Check repository Settings → Pages
- Ensure `/docs` folder is selected as source
- Verify `.nojekyll` file exists in docs/

## Manual Testing

To test the system without waiting for the scheduled time:

```bash
# Option 1: Run test script
scripts\test_run.bat

# Option 2: Run directly
venv\Scripts\activate
python src\main.py
```

## Exit Codes

The system returns these exit codes:
- `0` - Success
- `1` - Anniversary fetch failed
- `2` - App generation failed
- `3` - File operations failed
- `4` - Git operations failed

## API Costs

Based on Claude Sonnet 4.5 pricing (as of Dec 2025):
- Input: $3 per million tokens
- Output: $15 per million tokens

Estimated cost per app generation:
- ~3,000 input tokens (~$0.01)
- ~7,000 output tokens (~$0.10)
- **Total: ~$0.11 per app**

Monthly cost (30 days): **~$3.30**

## Contributing

Contributions are welcome! Areas for improvement:
- Additional anniversary data sources
- More interactive app features
- Year/category index pages
- RSS feed of new apps
- Screenshot generation
- Email notifications

## License

MIT License - See LICENSE file for details

## Credits

- **AI**: Powered by [Claude](https://www.anthropic.com/claude) by Anthropic
- **Anniversaries**: Sourced from [Wikipedia](https://en.wikipedia.org/)
- **Hosting**: [GitHub Pages](https://pages.github.com/)

---

Built with ❤️ and AI automation
