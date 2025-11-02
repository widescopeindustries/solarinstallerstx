# Quick Start Guide - SEO Fix Script

## 🚀 5-Minute Setup

### Prerequisites Check
```bash
# 1. Check Python version (need 3.6+)
python3 --version

# 2. Install required libraries
pip install beautifulsoup4 lxml
```

### Run the Script

#### Option 1: Test First (Recommended)
```bash
# Create test environment
bash test_seo_fix.sh

# Go into test directory
cd test_seo_fix

# Run the script
python3 fix_seo_errors.py

# Inspect results
cat sitemap.xml
cat public_html/cities/austin/index.html

# Clean up test
cd .. && rm -rf test_seo_fix
```

#### Option 2: Run on Real Site
```bash
# 1. BACKUP EVERYTHING
cp sitemap.xml sitemap.xml.backup
cp -r public_html public_html.backup

# 2. Verify CSV files are present
ls -lh *.csv

# 3. Run the script
python3 fix_seo_errors.py

# 4. Review the output log carefully
```

---

## 📋 Required CSV Files

Place these files in the same directory as `fix_seo_errors.py`:

| File | What It Does |
|------|--------------|
| `Error-Non-canonical_page_in_sitemap.csv` | URLs to **remove** from sitemap |
| `Notice-Indexable_page_not_in_sitemap.csv` | URLs to **add** to sitemap |
| `Error-indexable-Multiple_meta_description_tags.csv` | Pages to **fix** (remove duplicate meta) |
| `Notice-indexable-Page_and_SERP_titles_do_not_match.csv` | Titles to **optimize** |
| `Error-indexable-Orphan_page_(has_no_incoming_internal_links).csv` | Pages to **link** from city pages |

**IMPORTANT:** CSV files must be **tab-delimited** (not comma-separated).

---

## 🎯 What Gets Fixed

| Problem | Before | After |
|---------|--------|-------|
| **Sitemap Errors** | 312 URLs (includes junk) | 344 URLs (clean + complete) |
| **Duplicate Meta** | 2 meta descriptions | 1 optimized meta description |
| **Bad Titles** | 120-char keyword-stuffed | 60-char clean, optimized |
| **Orphan Pages** | 156 pages with no links | All linked from city pages |

---

## ✅ Expected Output

```
================================================================================
TECHNICAL SEO FIX SCRIPT FOR SOLARINSTALLERSTX.COM
================================================================================
Started at: 2025-11-02 14:30:00

✓ Loaded 15 URLs from Error-Non-canonical_page_in_sitemap.csv
✓ Loaded 47 URLs from Notice-Indexable_page_not_in_sitemap.csv

TASK 1: CLEANING SITEMAP
✓ Removed 15 non-canonical URLs from sitemap
✓ Added 47 missing URLs to sitemap
✓ Sitemap saved to sitemap.xml

TASK 2: FIXING DUPLICATE META DESCRIPTIONS
✓ Fixed duplicate meta descriptions on 23 pages

TASK 3: FIXING PAGE TITLES
✓ Fixed titles on 87 pages

TASK 4: FIXING ORPHAN PAGES (CRITICAL ARCHITECTURE FIX)
✓ Architecture fix complete:
  - Fixed 32 city pages
  - Added internal links for 156 installers

TECHNICAL SEO FIX SCRIPT COMPLETED
Finished at: 2025-11-02 14:31:15
```

---

## 🔍 Validation Steps

### 1. Check Sitemap
```bash
xmllint --noout sitemap.xml
# Or use: https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

### 2. Check HTML Files
```bash
# View a fixed city page
cat public_html/cities/austin/index.html | grep "installer-list"

# Check meta descriptions
grep -r 'meta name="description"' public_html/cities/austin/index.html | wc -l
# Should output: 1
```

### 3. Test in Browser
- Open `public_html/cities/austin/index.html` in browser
- Scroll to bottom
- Verify installer list appears with links

---

## 🚨 Troubleshooting

### "BeautifulSoup not found"
```bash
pip install beautifulsoup4 lxml
# or
pip3 install beautifulsoup4 lxml
```

### "File not found: Error-Non-canonical_page_in_sitemap.csv"
- Ensure CSV files are in same directory as script
- Check exact file names (including special characters)
- Verify CSV files are tab-delimited

### "Warning: File not found for URL"
- Check `public_html/` directory exists
- Verify URL-to-filepath mapping:
  - `/cities/austin` → `public_html/cities/austin/index.html`

### Script Runs But Nothing Changes
```bash
# Check CSV files have data
head -5 Error-Non-canonical_page_in_sitemap.csv

# Verify tab-delimited format
head -1 Error-Non-canonical_page_in_sitemap.csv | cat -A
# Should show ^I (tabs), not commas
```

---

## 📊 Expected SEO Impact

| Timeframe | Expected Results |
|-----------|------------------|
| **0-2 weeks** | ✅ Sitemap validated in GSC<br>✅ Missing pages crawled |
| **2-8 weeks** | 📈 20-30% more pages indexed<br>📈 Better CTR from clean titles |
| **2-6 months** | 📈 50-100% increase in organic traffic<br>📈 Higher rankings for city keywords |

---

## 🔄 Re-running the Script

Safe to run multiple times:
- ✅ Won't duplicate installer links
- ✅ Won't add duplicate sitemap URLs
- ✅ Won't break already-fixed pages

---

## 📤 Deploy Changes

After running the script locally:

```bash
# 1. Review changes
git diff sitemap.xml
git diff public_html/

# 2. Upload to server
# (Method depends on your hosting setup)
rsync -avz public_html/ user@server:/var/www/html/
rsync -avz sitemap.xml user@server:/var/www/html/

# 3. Submit to Google
# - Go to Google Search Console
# - Navigate to Sitemaps
# - Submit updated sitemap.xml
# - Request re-indexing for key pages
```

---

## 📞 Need Help?

1. **Read the full docs**: `SEO_FIX_README.md`
2. **Check the script comments**: Well-documented Python code
3. **Test first**: Always use `test_seo_fix.sh` before running on real site

---

## 📝 Quick Reference

### Export CSV from Screaming Frog
1. Click on issue type (e.g., "Orphan Pages")
2. Click "Export"
3. Choose **Tab Delimited**
4. Save with exact filename from list above

### Verify Tab-Delimited
```bash
# Should show ^I (tabs)
head -1 yourfile.csv | cat -A
```

### Convert Comma to Tab
```bash
# If you have comma-delimited CSV
sed 's/,/\t/g' input.csv > output.csv
```

---

**Last Updated:** 2025-11-02
**Script Version:** 1.0
