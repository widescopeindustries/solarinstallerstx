This folder contains scrapers used to collect installer data from external sites.

Setup:
1. Create a Python virtual environment at the project root (recommended):
   python -m venv .venv
2. Activate it:
   .venv\Scripts\Activate.ps1
3. Install requirements:
   pip install -r requirements.txt

Files:
- nabcep_scraper.py - Scrapes the NABCEP professional directory
- parse_nabcep_html.py - Helper to parse saved HTML

Notes:
- Use rate limiting and respect robots.txt for any target site.
- Store results in `public/installers.json` or a separate output file.
