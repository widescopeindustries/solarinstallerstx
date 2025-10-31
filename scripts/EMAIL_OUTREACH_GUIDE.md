# Email Outreach Campaign Guide

## Overview
These scripts help you generate and send personalized email outreach to solar installers in your database.

## Files Created
- `email_outreach_generator.py` - Generates personalized emails from installer data
- `email_sender.py` - Sends emails via SMTP
- `requirements-email.txt` - Python dependencies
- `.env.example` - Template for SMTP credentials

---

## Quick Start

### Step 1: Install Dependencies
```powershell
# Create virtual environment (optional but recommended)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install requirements
pip install -r scripts\requirements-email.txt
```

### Step 2: Generate Email Campaign
```powershell
# Generate ALL emails (538 installers)
python scripts\email_outreach_generator.py

# Generate for specific city
python scripts\email_outreach_generator.py --city "Austin"

# Limit to first 50 installers
python scripts\email_outreach_generator.py --max 50

# Output to custom file
python scripts\email_outreach_generator.py --output my_campaign.csv
```

**Output:** Creates `scripts/outreach_campaign.csv` with:
- Installer details
- Personalized email subject & body
- Empty `email_to` column (to be filled)

### Step 3: Add Email Addresses

The installer database **doesn't have email addresses yet**. You have 3 options:

#### Option A: Manual Research (Most Accurate)
1. Open `outreach_campaign.csv` in Excel
2. Look up each company website in the `website` column
3. Find their contact email (usually on Contact page)
4. Fill in the `email_to` column
5. Save the CSV

#### Option B: Use Email Finding Tools
- [Hunter.io](https://hunter.io) - Find emails by company domain
- [RocketReach](https://rocketreach.co) - Professional contact finder
- [Apollo.io](https://apollo.io) - B2B contact database

Upload your CSV to these tools to bulk-find emails.

#### Option C: Start with Companies That Have Websites
```powershell
# Create a simple email finder script (basic version)
python scripts\email_outreach_generator.py --city "Austin" --max 10
```
Then manually research just those 10 installers to test your campaign.

### Step 4: Set Up SMTP (For Sending)

**⚠️ IMPORTANT:** Use a dedicated email-sending service, NOT your personal Gmail.

#### Recommended Services:
1. **SendGrid** (Free: 100 emails/day) - Best for cold outreach
2. **Mailgun** (Free: 5,000 emails/month)
3. **Amazon SES** (Very cheap, requires setup)
4. **Gmail** (Max 500/day, risk of account issues)

#### Setup SendGrid (Recommended):
```powershell
# 1. Sign up at sendgrid.com (free tier)
# 2. Create API key with "Mail Send" permissions
# 3. Copy .env.example to .env
cp scripts\.env.example scripts\.env

# 4. Edit .env with your SendGrid credentials:
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_USERNAME=apikey
# SMTP_PASSWORD=your-sendgrid-api-key-here
# FROM_EMAIL=outreach@solarinstallerstx.com
# FROM_NAME=Michael Lyndon
```

### Step 5: Test Your Campaign
```powershell
# Test mode (doesn't actually send)
python scripts\email_sender.py --test --csv scripts\outreach_campaign.csv --max 5

# Send to yourself first
# (Edit CSV, put your email in first row's email_to column)
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --max 1
```

### Step 6: Send Campaign
```powershell
# Send to first 10 installers
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --max 10

# Send to specific city
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --city "Austin"

# Send all remaining (skips already-sent)
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --resume

# Slow down sending (3 seconds between emails)
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --delay 3
```

---

## Best Practices

### Email Sending Limits
- **Gmail:** 500/day max (not recommended for cold outreach)
- **SendGrid Free:** 100/day
- **Mailgun Free:** 166/day (5,000/month)

**Tip:** Send 20-50/day to avoid spam filters.

### Warm Up Your Domain
If using a new email address:
1. **Day 1:** Send 10 emails
2. **Day 2:** Send 20 emails
3. **Day 3:** Send 30 emails
4. **Week 2:** Ramp up to 50-100/day

### Avoid Spam Filters
✅ **DO:**
- Use a real person's name (Michael Lyndon)
- Include physical address in footer
- Add unsubscribe link (add to email template)
- Personalize each email (already done!)
- Use professional email domain (@solarinstallerstx.com)

❌ **DON'T:**
- Send 500 emails in 1 hour
- Use ALL CAPS or lots of exclamation marks!!!
- Include only images (need text)
- Use link shorteners (bit.ly)

### Track Your Results
The CSV tracks status automatically:
- `status` column: `ready` → `sent` → (you add: `opened`, `replied`, etc.)
- `sent_date` column: Auto-filled when sent
- `follow_up_date` column: Set reminder for follow-up (7 days later)

---

## Alternative: Use Email Marketing Platform

Instead of SMTP scripts, you can import your CSV to:

### Mailchimp
1. Upload `outreach_campaign.csv`
2. Map columns: `email_to` → Email, `subject` → Subject, `body` → Content
3. Use their templates and tracking

### SendGrid Marketing Campaigns
1. Create contact list from CSV
2. Use dynamic templates with {{subject}}, {{body}} merge tags
3. Built-in analytics

### Benefits
- Better deliverability
- Click tracking
- Unsubscribe handling
- A/B testing
- Compliance tools (CAN-SPAM)

---

## Troubleshooting

### "SMTP Configuration Missing"
→ Create `.env` file in `scripts/` directory (copy from `.env.example`)

### "No emails to send"
→ Check that `email_to` column in CSV has email addresses

### "Failed to send: Authentication failed"
→ For Gmail, use App Password not regular password: https://myaccount.google.com/apppasswords

### "Sent but no responses"
→ Check spam folder, improve subject line, follow up after 5-7 days

### "Account suspended"
→ You sent too many emails too fast. Use SendGrid or warm up slowly.

---

## Campaign Strategy

### Phase 1: Test (Week 1)
- Send to 10 installers manually researched
- Track open/reply rates
- Refine email copy if needed

### Phase 2: Major Cities (Week 2-3)
- Houston: ~100 installers
- Austin: ~80 installers
- Dallas: ~75 installers
- San Antonio: ~50 installers

### Phase 3: Statewide (Month 2)
- All remaining cities
- 50 emails/day pace
- Follow up with non-responders after 7 days

### Expected Results (Industry Average)
- **Open Rate:** 20-30%
- **Reply Rate:** 5-10%
- **Conversion to Paid:** 2-5%

**If you send to 500 installers:**
- ~100-150 will open
- ~25-50 will reply
- ~10-25 will become paying customers

---

## Legal Compliance (CAN-SPAM Act)

✅ **Required in every email:**
1. Your physical address (add to email template footer)
2. Clear subject line (no deceptive "Re:" or "Fwd:")
3. Unsubscribe option
4. Honor unsubscribes within 10 days

**Add to email footer:**
```
---
SolarInstallersTX.com
A Widescope Industries LLC Company
[Your Address]
[City, State ZIP]

To unsubscribe, reply with "UNSUBSCRIBE" in subject line.
```

---

## Support

Questions? Issues? Email: michael@solarinstallerstx.com

**Next Steps:**
1. ✅ Generate your first campaign CSV
2. ⏳ Research email addresses for 10 test installers
3. ⏳ Set up SendGrid account
4. ⏳ Send test emails to yourself
5. ⏳ Launch campaign!
