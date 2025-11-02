#!/bin/bash
#
# Test Script for SEO Fix
# Creates a test environment and runs the SEO fix script
#

echo "========================================"
echo "SEO Fix Script - Test Environment Setup"
echo "========================================"
echo ""

# Create test directory
echo "1. Creating test directory..."
mkdir -p test_seo_fix
cd test_seo_fix

# Create dummy file structure
echo "2. Creating test file structure..."
mkdir -p public_html/cities/austin
mkdir -p public_html/cities/houston
mkdir -p public_html/installers/austin/green-star-solar
mkdir -p public_html/installers/houston/texas-solar-pros

# Create test HTML files
echo "3. Creating test HTML files..."

# Test city page (Austin)
cat > public_html/cities/austin/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Austin Solar Installers - Find NABCEP Certified Solar Companies Texas - Best Solar Panel Installation Austin TX - Compare Quotes SolarInstallersTX</title>
    <meta name="description" content="SolarInstallersTX - Find solar installers">
    <meta name="description" content="Austin solar installers - compare quotes from certified pros">
</head>
<body>
    <main>
        <h1>Solar Installers in Austin, Texas</h1>
        <p>Find certified solar installers in Austin.</p>
    </main>
</body>
</html>
EOF

# Test installer page (Green Star Solar)
cat > public_html/installers/austin/green-star-solar/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Green Star Solar Austin Texas - NABCEP Certified Solar Installer - Best Solar Panel Installation Austin TX - Compare Quotes - SolarInstallersTX</title>
    <meta name="description" content="Green Star Solar offers premium solar installation in Austin">
</head>
<body>
    <h1>Green Star Solar | Austin Solar Installer</h1>
    <p>Certified solar installation services.</p>
</body>
</html>
EOF

# Create test sitemap
echo "4. Creating test sitemap..."
cat > sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://solarinstallerstx.com/</loc>
    <lastmod>2025-01-01</lastmod>
  </url>
  <url>
    <loc>https://solarinstallerstx.com/tesla-2</loc>
    <lastmod>2025-01-01</lastmod>
  </url>
  <url>
    <loc>https://solarinstallerstx.com/cities/austin</loc>
    <lastmod>2025-01-01</lastmod>
  </url>
</urlset>
EOF

# Create test CSV files
echo "5. Creating test CSV files..."

# Non-canonical URLs to remove
cat > Error-Non-canonical_page_in_sitemap.csv << 'EOF'
URL	Title
https://solarinstallerstx.com/tesla-2	Junk Page
EOF

# Missing URLs to add
cat > Notice-Indexable_page_not_in_sitemap.csv << 'EOF'
URL	Title
https://solarinstallerstx.com/blog	Blog
https://solarinstallerstx.com/installers	Installers Directory
EOF

# Pages with duplicate meta descriptions
cat > Error-indexable-Multiple_meta_description_tags.csv << 'EOF'
URL	Title
https://solarinstallerstx.com/cities/austin	Austin Solar Installers
EOF

# Pages with bad titles
cat > Notice-indexable-Page_and_SERP_titles_do_not_match.csv << 'EOF'
URL	Title	H1
https://solarinstallerstx.com/cities/austin	Austin Solar Installers - Find NABCEP Certified Solar Companies Texas	Solar Installers in Austin, Texas
https://solarinstallerstx.com/installers/austin/green-star-solar	Green Star Solar Austin Texas	Green Star Solar
EOF

# Orphan pages
cat > Error-indexable-Orphan_page_\(has_no_incoming_internal_links\).csv << 'EOF'
URL	Title
https://solarinstallerstx.com/installers/austin/green-star-solar	Green Star Solar | Austin Solar Installer
https://solarinstallerstx.com/installers/austin/freedom-solar	Freedom Solar Power | Austin Solar Installer
https://solarinstallerstx.com/installers/houston/texas-solar-pros	Texas Solar Pros | Houston Solar Installer
EOF

# Copy script to test directory
echo "6. Copying SEO fix script..."
cp ../fix_seo_errors.py .

echo ""
echo "========================================"
echo "Test environment created successfully!"
echo "========================================"
echo ""
echo "Directory: $(pwd)"
echo ""
echo "To run the test:"
echo "  cd test_seo_fix"
echo "  python3 fix_seo_errors.py"
echo ""
echo "To inspect results:"
echo "  cat sitemap.xml"
echo "  cat public_html/cities/austin/index.html"
echo ""
echo "To clean up:"
echo "  cd .. && rm -rf test_seo_fix"
echo ""
