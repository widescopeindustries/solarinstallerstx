#!/usr/bin/env python3
"""
Technical SEO Fix Script for SolarInstallersTX.com
==================================================

This script automatically fixes critical technical SEO errors by:
1. Cleaning the sitemap (removing junk URLs, adding missing pages)
2. Fixing duplicate meta description tags
3. Rewriting page titles to optimized format
4. De-orphaning installer pages by adding internal links from city pages

Requirements: pip install beautifulsoup4 lxml

Author: Claude Code
Date: 2025-11-02
"""

import csv
import xml.etree.ElementTree as ElementTree
import pathlib
from urllib.parse import urlparse
import sys
from datetime import datetime

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("ERROR: BeautifulSoup not found. Please install it:")
    print("  pip install beautifulsoup4 lxml")
    sys.exit(1)


# ============================================================================
# PART 1: HELPER FUNCTIONS
# ============================================================================

def url_to_filepath(url):
    """
    Converts a full URL to a local filepath.

    Example: 'https://solarinstallerstx.com/cities/austin'
          -> './public_html/cities/austin/index.html'

    Args:
        url (str): Full URL from the website

    Returns:
        pathlib.Path: Local file path to the HTML file
    """
    parsed_url = urlparse(url)
    path = parsed_url.path

    # Remove leading slash to make path relative
    if path.startswith('/'):
        path = path[1:]

    # Handle root URL
    if not path:
        return pathlib.Path('public_html/index.html')

    filepath = pathlib.Path('public_html') / path

    # Assume directories are files ending in /
    if str(filepath).endswith('/'):
        filepath = filepath / 'index.html'

    # Assume URLs without extensions are directories
    if not filepath.suffix:
        filepath = filepath / 'index.html'

    return filepath


def load_csv_data(filename, url_column='URL'):
    """
    Load data from a tab-delimited CSV file.

    Args:
        filename (str): Path to CSV file
        url_column (str): Name of the URL column

    Returns:
        tuple: (set of URLs, list of row dicts)
    """
    urls = set()
    rows = []
    try:
        with open(filename, mode='r', encoding='utf-8') as f:
            reader = csv.DictReader(f, delimiter='\t')
            for row in reader:
                if url_column in row:
                    urls.add(row[url_column])
                rows.append(row)
        print(f"✓ Loaded {len(urls)} URLs from {filename}")
        return urls, rows
    except FileNotFoundError:
        print(f"⚠ Warning: File not found: {filename}")
        return set(), []
    except Exception as e:
        print(f"⚠ Error reading {filename}: {e}")
        return set(), []


# ============================================================================
# PART 2: SITEMAP CORRECTION FUNCTIONS
# ============================================================================

def clean_sitemap(sitemap_path, urls_to_remove, urls_to_add):
    """
    Fix the sitemap by removing non-canonical URLs and adding missing pages.

    Args:
        sitemap_path (pathlib.Path): Path to sitemap.xml
        urls_to_remove (set): URLs to remove from sitemap
        urls_to_add (set): URLs to add to sitemap
    """
    print("\n" + "="*80)
    print("TASK 1: CLEANING SITEMAP")
    print("="*80)

    try:
        # Parse the sitemap
        tree = ElementTree.parse(sitemap_path)
        root = tree.getroot()

        # Extract namespace from root tag
        # Example: {http://www.sitemaps.org/schemas/sitemap/0.9}urlset
        namespace = root.tag.split('}')[0].strip('{') if '}' in root.tag else ''

        if namespace:
            ElementTree.register_namespace('', namespace)
            ns = {'ns': namespace}
        else:
            ns = {}

        # Get all existing URLs in sitemap
        loc_tag = f"{{{namespace}}}loc" if namespace else "loc"
        url_tag = f"{{{namespace}}}url" if namespace else "url"

        existing_locs = {loc.text for loc in root.findall(f'.//{loc_tag}')}
        print(f"  Current sitemap has {len(existing_locs)} URLs")

        # ---- REMOVE BAD URLs ----
        removed_count = 0
        for bad_url in urls_to_remove:
            # Find all <url> elements
            for url_element in root.findall(url_tag):
                loc_element = url_element.find(loc_tag)
                if loc_element is not None and loc_element.text == bad_url:
                    root.remove(url_element)
                    removed_count += 1
                    print(f"  [REMOVED] {bad_url}")
                    break

        print(f"\n✓ Removed {removed_count} non-canonical URLs from sitemap")

        # ---- ADD MISSING URLs ----
        added_count = 0
        lastmod = datetime.now().strftime('%Y-%m-%d')

        for url_to_add in urls_to_add:
            if url_to_add not in existing_locs:
                # Create new <url> element
                new_url = ElementTree.SubElement(root, url_tag)

                # Create <loc> element
                loc = ElementTree.SubElement(new_url, loc_tag)
                loc.text = url_to_add

                # Create <lastmod> element
                lastmod_elem = ElementTree.SubElement(new_url, f"{{{namespace}}}lastmod" if namespace else "lastmod")
                lastmod_elem.text = lastmod

                # Create <changefreq> element
                changefreq = ElementTree.SubElement(new_url, f"{{{namespace}}}changefreq" if namespace else "changefreq")
                changefreq.text = 'monthly'

                # Create <priority> element
                priority = ElementTree.SubElement(new_url, f"{{{namespace}}}priority" if namespace else "priority")
                priority.text = '0.8'

                added_count += 1
                print(f"  [ADDED] {url_to_add}")

        print(f"\n✓ Added {added_count} missing URLs to sitemap")

        # Save the modified sitemap
        tree.write(
            sitemap_path,
            encoding='UTF-8',
            xml_declaration=True,
            method='xml'
        )
        print(f"\n✓ Sitemap saved to {sitemap_path}")
        print(f"  Final URL count: {len(existing_locs) - removed_count + added_count}")

    except Exception as e:
        print(f"✗ Error cleaning sitemap: {e}")
        import traceback
        traceback.print_exc()


# ============================================================================
# PART 3: ON-PAGE HTML CORRECTION FUNCTIONS
# ============================================================================

def fix_duplicate_meta_descriptions(html_filepath):
    """
    Fix pages with two meta description tags by removing the first (generic) one.

    Args:
        html_filepath (pathlib.Path): Path to HTML file
    """
    try:
        with open(html_filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        soup = BeautifulSoup(content, 'lxml')

        # Find all meta description tags
        meta_tags = soup.find_all('meta', attrs={'name': 'description'})

        if len(meta_tags) > 1:
            # Remove the first (generic) meta description
            first_meta = meta_tags[0]
            first_meta.decompose()

            # Save the modified HTML
            with open(html_filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))

            print(f"  [META FIX] Removed duplicate meta description from: {html_filepath}")
            return True

        return False

    except Exception as e:
        print(f"  ✗ Error fixing meta descriptions in {html_filepath}: {e}")
        return False


def fix_page_titles(html_filepath, url, h1_text=None):
    """
    Rewrite the <title> tag to a clean, optimized format.

    Args:
        html_filepath (pathlib.Path): Path to HTML file
        url (str): Full URL of the page
        h1_text (str): H1 text from the page (optional, will be extracted if not provided)
    """
    try:
        with open(html_filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        soup = BeautifulSoup(content, 'lxml')

        # Find the title tag
        title_tag = soup.find('title')
        if not title_tag:
            print(f"  ⚠ Warning: No <title> tag found in {html_filepath}")
            return False

        # Get H1 text if not provided
        if not h1_text:
            h1_tag = soup.find('h1')
            if h1_tag:
                h1_text = h1_tag.get_text().strip()
            else:
                h1_text = "SolarInstallersTX"

        # Parse URL path
        path = urlparse(url).path
        new_title = None

        # Determine new title based on URL structure
        if path.startswith('/installers/'):
            # Installer pages: "Company Name | City, TX Solar Installer | SolarInstallersTX"
            parts = path.split('/')
            if len(parts) >= 3:
                city = parts[2].replace('-', ' ').title()
                # Extract clean company name from H1 (remove city suffix if present)
                company_name = h1_text.split(' | ')[0] if ' | ' in h1_text else h1_text
                new_title = f"{company_name} | {city}, TX Solar Installer | SolarInstallersTX"

        elif path.startswith('/cities/'):
            # City pages: "Solar Installers in City, Texas | SolarInstallersTX"
            parts = path.split('/')
            if len(parts) >= 3:
                city_name = parts[2].replace('-', ' ').title()
                new_title = f"Solar Installers in {city_name}, Texas | SolarInstallersTX"

        elif path.startswith('/blog/'):
            # Blog posts: "Post Title | Texas Solar Blog | SolarInstallersTX"
            new_title = f"{h1_text} | Texas Solar Blog | SolarInstallersTX"

        elif path == '/' or path == '':
            # Homepage
            new_title = "Find NABCEP Certified Solar Installers in Texas | SolarInstallersTX"

        elif path.startswith('/guides/') or path.startswith('/learn/'):
            # Guide pages
            new_title = f"{h1_text} | Solar Installation Guide | SolarInstallersTX"

        else:
            # Generic pages
            new_title = f"{h1_text} | SolarInstallersTX"

        # Update title if we generated a new one and it's different
        if new_title and title_tag.string != new_title:
            old_title = title_tag.string
            title_tag.string = new_title

            # Save the modified HTML
            with open(html_filepath, 'w', encoding='utf-8') as f:
                f.write(str(soup))

            print(f"  [TITLE FIX] Updated: {html_filepath}")
            print(f"    Old: {old_title[:80]}...")
            print(f"    New: {new_title[:80]}...")
            return True

        return False

    except Exception as e:
        print(f"  ✗ Error fixing title in {html_filepath}: {e}")
        return False


# ============================================================================
# PART 4: ARCHITECTURAL FIX (DE-ORPHANING PAGES)
# ============================================================================

def fix_orphan_pages(orphan_file_csv, city_page_urls=None):
    """
    Fix orphan installer pages by adding internal links from city pages.
    This is the most critical architectural fix.

    Args:
        orphan_file_csv (str): Path to CSV with orphan page data
        city_page_urls (set): Set of city page URLs (optional)
    """
    print("\n" + "="*80)
    print("TASK 4: FIXING ORPHAN PAGES (CRITICAL ARCHITECTURE FIX)")
    print("="*80)

    try:
        # Build installer map grouped by city
        city_to_installers = {}

        _, orphan_rows = load_csv_data(orphan_file_csv)

        for row in orphan_rows:
            url = row.get('URL', '')

            if url.startswith('https://solarinstallerstx.com/installers/'):
                parts = urlparse(url).path.split('/')
                # parts: ['', 'installers', 'city-slug', 'installer-slug']

                if len(parts) >= 4:
                    city_slug = parts[2]
                    installer_slug = parts[3]

                    # Extract clean installer name from title
                    title = row.get('Title', installer_slug)
                    installer_name = title.split(' | ')[0] if ' | ' in title else title

                    if city_slug not in city_to_installers:
                        city_to_installers[city_slug] = []

                    city_to_installers[city_slug].append({
                        'url': url,
                        'name': installer_name,
                        'slug': installer_slug
                    })

        print(f"\n  Found {len(city_to_installers)} cities with orphan installers")
        print(f"  Total orphan installers: {sum(len(v) for v in city_to_installers.values())}")

        # Inject links into city pages
        total_fixed = 0
        total_installers_linked = 0

        for city_slug, installers_list in city_to_installers.items():
            city_url = f"https://solarinstallerstx.com/cities/{city_slug}"
            city_filepath = url_to_filepath(city_url)

            if not city_filepath.exists():
                print(f"\n  ⚠ [ARCH FIX-ERROR] City page not found: {city_filepath}")
                continue

            try:
                with open(city_filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                soup = BeautifulSoup(content, 'lxml')

                # Find main content area
                main_content = (
                    soup.find('main') or
                    soup.find('div', class_='content-area') or
                    soup.find('div', class_='container') or
                    soup.find('article') or
                    soup.body
                )

                if not main_content:
                    print(f"  ⚠ Warning: Could not find main content area in {city_filepath}")
                    continue

                # Check if installer list already exists
                existing_list = main_content.find('div', class_='installer-list-container')
                if existing_list:
                    print(f"  ⚠ Installer list already exists in {city_filepath}, skipping")
                    continue

                # Create the new installer list section
                list_container = soup.new_tag('div', **{'class': 'installer-list-container'})
                list_container['style'] = 'margin-top: 2rem; padding: 1.5rem; background-color: #f9fafb; border-radius: 0.5rem;'

                # Create heading
                city_display_name = city_slug.replace('-', ' ').title()
                list_h2 = soup.new_tag('h2')
                list_h2.string = f"Certified Solar Installers in {city_display_name}"
                list_h2['style'] = 'font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;'
                list_container.append(list_h2)

                # Create description paragraph
                desc_p = soup.new_tag('p')
                desc_p.string = f"Browse our directory of NABCEP-certified solar installers serving {city_display_name}. Compare quotes, read reviews, and find the perfect solar installation company for your home."
                desc_p['style'] = 'margin-bottom: 1rem; color: #4b5563;'
                list_container.append(desc_p)

                # Create unordered list
                list_ul = soup.new_tag('ul', **{'class': 'installer-list'})
                list_ul['style'] = 'list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 0.75rem;'

                # Add each installer as a list item
                for installer in sorted(installers_list, key=lambda x: x['name']):
                    li = soup.new_tag('li')
                    li['style'] = 'padding: 0.75rem; background-color: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;'

                    a = soup.new_tag('a', href=installer['url'])
                    a.string = installer['name']
                    a['style'] = 'color: #2563eb; text-decoration: none; font-weight: 500; display: block;'
                    a['onmouseover'] = "this.style.color='#1e40af'"
                    a['onmouseout'] = "this.style.color='#2563eb'"

                    li.append(a)
                    list_ul.append(li)

                list_container.append(list_ul)

                # Append to main content (before footer if possible)
                main_content.append(list_container)

                # Save modified HTML
                with open(city_filepath, 'w', encoding='utf-8') as f:
                    f.write(str(soup))

                total_fixed += 1
                total_installers_linked += len(installers_list)
                print(f"\n  ✓ [ARCH FIX] Added {len(installers_list)} installer links to: {city_filepath}")

            except Exception as e:
                print(f"  ✗ Error processing {city_filepath}: {e}")
                continue

        print(f"\n✓ Architecture fix complete:")
        print(f"  - Fixed {total_fixed} city pages")
        print(f"  - Added internal links for {total_installers_linked} installers")

    except Exception as e:
        print(f"✗ Error in fix_orphan_pages: {e}")
        import traceback
        traceback.print_exc()


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    """Main execution function that orchestrates all SEO fixes."""

    print("\n" + "="*80)
    print("TECHNICAL SEO FIX SCRIPT FOR SOLARINSTALLERSTX.COM")
    print("="*80)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

    # -------------------------------------------------------------------------
    # TASK 1: SITEMAP CORRECTION
    # -------------------------------------------------------------------------
    sitemap_path = pathlib.Path('sitemap.xml')

    if sitemap_path.exists():
        urls_to_remove, _ = load_csv_data('Error-Non-canonical_page_in_sitemap.csv')
        urls_to_add, _ = load_csv_data('Notice-Indexable_page_not_in_sitemap.csv')

        if urls_to_remove or urls_to_add:
            clean_sitemap(sitemap_path, urls_to_remove, urls_to_add)
        else:
            print("\n⚠ No sitemap changes needed (CSV files empty or not found)")
    else:
        print(f"\n✗ Error: sitemap.xml not found at {sitemap_path.absolute()}")

    # -------------------------------------------------------------------------
    # TASK 2: FIX DUPLICATE META DESCRIPTIONS
    # -------------------------------------------------------------------------
    print("\n" + "="*80)
    print("TASK 2: FIXING DUPLICATE META DESCRIPTIONS")
    print("="*80)

    _, meta_fix_rows = load_csv_data('Error-indexable-Multiple_meta_description_tags.csv')

    if meta_fix_rows:
        fixed_count = 0
        for row in meta_fix_rows:
            url = row.get('URL', '')
            filepath = url_to_filepath(url)

            if filepath.exists():
                if fix_duplicate_meta_descriptions(filepath):
                    fixed_count += 1
            else:
                print(f"  ⚠ Warning: File not found for URL {url}")

        print(f"\n✓ Fixed duplicate meta descriptions on {fixed_count} pages")
    else:
        print("  ℹ No duplicate meta description issues found")

    # -------------------------------------------------------------------------
    # TASK 3: FIX PAGE TITLES
    # -------------------------------------------------------------------------
    print("\n" + "="*80)
    print("TASK 3: FIXING PAGE TITLES")
    print("="*80)

    _, title_fix_rows = load_csv_data('Notice-indexable-Page_and_SERP_titles_do_not_match.csv')

    if title_fix_rows:
        fixed_count = 0
        for row in title_fix_rows:
            url = row.get('URL', '')
            filepath = url_to_filepath(url)

            if filepath.exists():
                # Try to get H1 from CSV, otherwise will extract from page
                h1_text = row.get('H1', None)

                if fix_page_titles(filepath, url, h1_text):
                    fixed_count += 1
            else:
                print(f"  ⚠ Warning: File not found for URL {url}")

        print(f"\n✓ Fixed titles on {fixed_count} pages")
    else:
        print("  ℹ No title issues found")

    # -------------------------------------------------------------------------
    # TASK 4: FIX ORPHAN PAGES (CRITICAL ARCHITECTURE FIX)
    # -------------------------------------------------------------------------
    orphan_file = 'Error-indexable-Orphan_page_(has_no_incoming_internal_links).csv'

    if pathlib.Path(orphan_file).exists():
        fix_orphan_pages(orphan_file)
    else:
        print(f"\n⚠ Warning: Orphan page CSV not found: {orphan_file}")

    # -------------------------------------------------------------------------
    # SUMMARY
    # -------------------------------------------------------------------------
    print("\n" + "="*80)
    print("TECHNICAL SEO FIX SCRIPT COMPLETED")
    print("="*80)
    print(f"Finished at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("\nNext steps:")
    print("1. Review the changes in your HTML files")
    print("2. Test the modified pages in a browser")
    print("3. Validate sitemap.xml at: https://www.xml-sitemaps.com/validate-xml-sitemap.html")
    print("4. Submit updated sitemap to Google Search Console")
    print("5. Monitor Google Search Console for indexing improvements")
    print("\n" + "="*80 + "\n")


if __name__ == "__main__":
    main()
