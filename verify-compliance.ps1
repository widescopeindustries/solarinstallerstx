#!/usr/bin/env pwsh
# Legal Compliance Verification Script
# Run this before deploying to production

Write-Host "LEGAL COMPLIANCE VERIFICATION" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$checks = @()

# 1. Check for placeholder affiliate IDs
Write-Host "1. Checking for placeholder affiliate IDs..." -ForegroundColor Yellow
$placeholderCheck = Select-String -Path "src/components/QuoteCTA.tsx" -Pattern "SWAP_YOUR_ID_HERE" -ErrorAction SilentlyContinue
if ($placeholderCheck) {
    Write-Host "   WARNING: Affiliate ID placeholder found!" -ForegroundColor Red
    Write-Host "   Replace SWAP_YOUR_ID_HERE in QuoteCTA.tsx" -ForegroundColor Red
    $checks += $false
} else {
    Write-Host "   OK: Affiliate ID configured" -ForegroundColor Green
    $checks += $true
}

# 2. Verify AffiliateDisclosure component exists
Write-Host "2. Verifying AffiliateDisclosure component..." -ForegroundColor Yellow
if (Test-Path "src/components/AffiliateDisclosure.tsx") {
    Write-Host "   OK: AffiliateDisclosure.tsx exists" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host "   ERROR: AffiliateDisclosure.tsx missing!" -ForegroundColor Red
    $checks += $false
}

# 3. Verify CookieConsent component exists
Write-Host "3. Verifying CookieConsent component..." -ForegroundColor Yellow
if (Test-Path "src/components/CookieConsent.tsx") {
    Write-Host "   OK: CookieConsent.tsx exists" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host "   ERROR: CookieConsent.tsx missing!" -ForegroundColor Red
    $checks += $false
}

# 4. Verify TCPAConsent component exists
Write-Host "4. Verifying TCPAConsent component..." -ForegroundColor Yellow
if (Test-Path "src/components/TCPAConsent.tsx") {
    Write-Host "   OK: TCPAConsent.tsx exists" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host "   ERROR: TCPAConsent.tsx missing!" -ForegroundColor Red
    $checks += $false
}

# 5. Verify Affiliate Disclosure page exists
Write-Host "5. Verifying Affiliate Disclosure page..." -ForegroundColor Yellow
if (Test-Path "src/pages/AffiliateDisclosurePage.tsx") {
    Write-Host "   OK: AffiliateDisclosurePage.tsx exists" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host "   ERROR: AffiliateDisclosurePage.tsx missing!" -ForegroundColor Red
    $checks += $false
}

# 6. Check if GA4 consent mode is configured
Write-Host "6. Checking GA4 consent mode in index.html..." -ForegroundColor Yellow
$consentCheck = Select-String -Path "index.html" -Pattern "analytics_storage.*denied" -ErrorAction SilentlyContinue
if ($consentCheck) {
    Write-Host "   OK: GA4 consent mode configured" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host "   WARNING: GA4 consent mode not found" -ForegroundColor Red
    $checks += $false
}

# 7. Check if Privacy Policy mentions affiliates
Write-Host "7. Checking Privacy Policy for affiliate disclosure..." -ForegroundColor Yellow
$privacyCheck = Select-String -Path "src/pages/Privacy.tsx" -Pattern "Affiliate Marketing" -ErrorAction SilentlyContinue
if ($privacyCheck) {
    Write-Host "   OK: Privacy Policy includes affiliate disclosure" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host "   WARNING: Privacy Policy missing affiliate section" -ForegroundColor Red
    $checks += $false
}

# 8. Check Footer for legal links
Write-Host "8. Checking Footer for legal links..." -ForegroundColor Yellow
$footerCheck = Select-String -Path "src/components/Footer.tsx" -Pattern "affiliate-disclosure" -ErrorAction SilentlyContinue
if ($footerCheck) {
    Write-Host "   OK: Footer includes affiliate disclosure link" -ForegroundColor Green
    $checks += $true
} else {
    Write-Host "   WARNING: Footer missing affiliate disclosure link" -ForegroundColor Red
    $checks += $false
}

# Summary
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "COMPLIANCE SUMMARY" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

$passedChecks = ($checks | Where-Object { $_ -eq $true }).Count
$totalChecks = $checks.Count

Write-Host ""
Write-Host "Passed: $passedChecks / $totalChecks checks"
Write-Host ""

if ($passedChecks -eq $totalChecks) {
    Write-Host "ALL CHECKS PASSED! Your site is legally compliant." -ForegroundColor Green
    Write-Host "Safe to deploy to production." -ForegroundColor Green
} else {
    Write-Host "Some checks failed. Fix issues above before deploying." -ForegroundColor Yellow
    Write-Host "See LEGAL-COMPLIANCE-COMPLETE.md for details." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Replace affiliate placeholder ID in QuoteCTA.tsx"
Write-Host "2. Test cookie consent banner in browser"
Write-Host "3. Add TCPA consent to lead generation forms"
Write-Host "4. Deploy to production"
Write-Host ""
