# ✅ Email Outreach System - Setup Complete!

## What I've Built For You

I've created a complete email automation system with 4 key files:

### 1. **email_outreach_generator.py** ⭐
**What it does:** Generates personalized emails for all 538 installers in your database
- Pulls data from `public/installers.json`
- Creates custom email for each installer with their name, city, company
- Personalizes the "reason we're reaching out" based on certifications
- Outputs to CSV file

**How to use:**
```powershell
# Generate all emails
python scripts\email_outreach_generator.py

# Just Austin installers
python scripts\email_outreach_generator.py --city "Austin"

# First 50 installers only
python scripts\email_outreach_generator.py --max 50
```

### 2. **email_sender.py** 📧
**What it does:** Sends emails via SMTP (Gmail, SendGrid, etc.)
- Reads the CSV from step 1
- Sends personalized emails one by one
- Tracks which emails were sent (updates CSV)
- Includes rate limiting to avoid spam filters

**How to use:**
```powershell
# Test mode (doesn't actually send)
python scripts\email_sender.py --test --csv scripts\outreach_campaign.csv

# Send first 10 emails
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --max 10

# Send to Austin only
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --city "Austin"
```

### 3. **EMAIL_OUTREACH_GUIDE.md** 📚
**What it is:** Complete step-by-step guide covering:
- Installation instructions
- SMTP setup (Gmail, SendGrid, Mailgun)
- Best practices to avoid spam filters
- Legal compliance (CAN-SPAM Act)
- Campaign strategy (how many to send per day)
- Expected conversion rates
- Troubleshooting

### 4. **requirements-email.txt** & **.env.example**
Dependencies and SMTP configuration templates

---

## ⚠️ Important: Email Addresses Not Included

**The installer database doesn't have email addresses.** You'll need to:

### Option A: Manual Research (Most Accurate)
1. Run: `python scripts\email_outreach_generator.py --max 20`
2. Open `scripts\outreach_campaign.csv` in Excel
3. Look up each company website (in the CSV)
4. Find their contact email
5. Fill in the `email_to` column

### Option B: Use Email Finding Tools
- **Hunter.io** - Find emails by domain name
- **Apollo.io** - B2B contact database
- **RocketReach** - Professional email finder

Upload your CSV to these services to bulk-find emails.

### Option C: Start Small & Test
1. Generate 10 emails for Austin
2. Manually find 10 email addresses
3. Send test batch
4. Track response rate
5. If good (>5% reply rate), scale up

---

## Quick Start (Next 30 Minutes)

### Step 1: Install Dependencies (2 min)
```powershell
pip install -r scripts\requirements-email.txt
```

### Step 2: Generate Test Campaign (1 min)
```powershell
# Create campaign for first 10 installers
python scripts\email_outreach_generator.py --max 10
```
**Output:** `scripts/outreach_campaign.csv`

### Step 3: Add Email Addresses (15 min)
1. Open `scripts/outreach_campaign.csv` in Excel
2. Look up each company website (column F)
3. Find contact email (usually /contact page)
4. Paste into `email_to` column (column H)
5. Save

### Step 4: Set Up SMTP (5 min)

**Recommended: SendGrid (Free Tier)**
1. Sign up: https://sendgrid.com/free/
2. Create API key (Settings > API Keys)
3. Copy `scripts\.env.example` to `scripts\.env`
4. Edit `.env`:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USERNAME=apikey
   SMTP_PASSWORD=your-sendgrid-api-key-here
   FROM_EMAIL=michael@solarinstallerstx.com
   FROM_NAME=Michael Lyndon
   ```

### Step 5: Test Send (2 min)
```powershell
# Send to yourself first (put your email in first row of CSV)
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --max 1
```

### Step 6: Launch Campaign! 🚀
```powershell
# Send to all 10 test installers
python scripts\email_sender.py --csv scripts\outreach_campaign.csv --max 10
```

---

## Expected Results (Industry Benchmarks)

### If you email 500 installers:
- **Open Rate:** 20-30% → ~100-150 opens
- **Reply Rate:** 5-10% → ~25-50 replies
- **Conversion:** 2-5% → **10-25 paying customers**

### At $29.99 Verified tier:
- 15 customers × $29.99 = **$450/month recurring revenue**

### At $99.99 Premium tier:
- 5 customers × $99.99 = **$500/month recurring revenue**

### **Total potential: $950/month from first 500 emails!**

---

## Recommended Campaign Strategy

### Week 1: Test Phase
- **Target:** Austin (80 installers)
- **Goal:** 10 email addresses researched
- **Action:** Send test batch, track results
- **Success Metric:** 1-2 replies = proceed

### Week 2-3: Major Cities
- **Houston:** ~100 installers
- **Dallas:** ~75 installers
- **San Antonio:** ~50 installers
- **Rate:** 30-50 emails/day
- **Goal:** 10-15 conversions

### Month 2: Statewide
- **All remaining cities:** ~300 installers
- **Rate:** 50 emails/day
- **Follow-ups:** Re-contact non-responders after 7 days

---

## Safety Tips (Avoid Account Suspension)

✅ **DO:**
- Start slow (10-20 emails/day for first week)
- Use professional email service (SendGrid, not personal Gmail)
- Personalize every email (already done by script!)
- Include physical address in footer
- Add unsubscribe option

❌ **DON'T:**
- Send 500 emails in one day
- Use personal Gmail for mass sending
- Buy email lists (illegal)
- Send without testing first

---

## Alternative: Import to Email Marketing Platform

Instead of using the Python sender, you can import the CSV to:

### Mailchimp
- Upload CSV
- Map columns (email_to → Email, subject → Subject, body → Content)
- Use templates and tracking dashboard

### SendGrid Marketing Campaigns
- Import contacts
- Create dynamic template
- Built-in analytics

**Benefits:** Better deliverability, click tracking, unsubscribe handling

---

## Troubleshooting

### "No emails to send"
→ Make sure `email_to` column has email addresses

### "SMTP Authentication Failed"
→ Check your `.env` file credentials
→ For Gmail: Use App Password (not regular password)

### "How do I find email addresses?"
→ See Option A, B, C above
→ Start with 10 installers to test the system

### "Can I use my personal Gmail?"
→ Not recommended for 500+ emails
→ Gmail limit: 500/day, risk of account suspension
→ Use SendGrid (free 100/day) or Mailgun instead

---

## What's Next?

1. ✅ **Generate your first campaign:**
   ```
   python scripts\email_outreach_generator.py --city "Austin" --max 10
   ```

2. ⏳ **Research 10 email addresses**
   (Use company websites from CSV)

3. ⏳ **Set up SendGrid account**
   (Free tier: 100 emails/day)

4. ⏳ **Send test batch**
   (Your first 10 installers)

5. ⏳ **Track results & scale up!**

---

## Questions?

Read the full guide: `scripts/EMAIL_OUTREACH_GUIDE.md`

**You're ready to acquire your first customers! 🚀**
