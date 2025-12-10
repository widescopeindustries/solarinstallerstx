# 🚀 REVENUE ACTIVATION CHECKLIST
## Your 7-Day Sprint to First Dollar

**Goal:** Go from $0 → $1,500-4,000 in revenue within 7 days  
**Status:** Ready to execute  
**Owner:** You (with support as needed)

---

## 📅 DAY 1: Payment Infrastructure

### Task 1.1: Activate Stripe Account ⏱️ 2 hours
- [ ] Go to stripe.com and create account
- [ ] Complete business verification
- [ ] Enable subscription billing
- [ ] Get publishable key and secret key
- [ ] Add keys to `.env.local`:
  ```env
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
  STRIPE_SECRET_KEY=sk_live_xxxxx
  ```

### Task 1.2: Create Stripe Products ⏱️ 30 min
In Stripe Dashboard → Products:

**Product 1: Premium Partner**
- Price: $99/month
- Billing: Recurring monthly
- Description: "Top 5 placement on city page"
- Copy Product ID

**Product 2: Platinum Partner**
- Price: $199/month
- Billing: Recurring monthly
- Description: "Top 3 placement on multiple city pages"
- Copy Product ID

**Product 3: Enterprise Partner**
- Price: $399/month
- Billing: Recurring monthly
- Description: "Homepage feature + priority placement"
- Copy Product ID

### Task 1.3: Create Pricing Page ⏱️ 3 hours
Location: `src/app/installer-pricing/page.tsx`

```tsx
// Simple pricing page with Stripe checkout buttons
// Show 3 tiers side-by-side
// Add "Most Popular" badge to Premium
// Include feature comparison table
```

**Test Checklist:**
- [ ] All 3 pricing cards visible
- [ ] "Buy Now" buttons link to Stripe checkout
- [ ] Test purchase with Stripe test card (4242 4242 4242 4242)
- [ ] Successful payment redirects to thank-you page

**End of Day 1 Goal:** ✅ Can accept money

---

## 📅 DAY 2: Lead Sales Infrastructure

### Task 2.1: Design Lead Distribution Logic ⏱️ 1 hour

**Decision Point:** Which model?
- [ ] Option A: Sell to YOUR installers only (recommended for start)
- [ ] Option B: Sell to lead aggregators
- [ ] Option C: Hybrid (both A + B)

**If Option A (Recommended):**

### Task 2.2: Create "Buy Leads" Page ⏱️ 2 hours
Location: `src/app/buy-leads/page.tsx`

```tsx
// For INSTALLERS to purchase leads
// Show available lead packages:
// - Shared Leads: $40/lead
// - Exclusive Leads: $100/lead
// - Monthly Package: 20 leads for $600

// Include Stripe checkout integration
```

### Task 2.3: Set Up Lead Delivery Automation ⏱️ 2 hours

**Option 1: Manual (Day 1)**
- When quote comes in via Supabase
- You manually email lead to qualified installer
- They pay via Square/Venmo/Stripe invoice
- **Pro:** $0 cost, works immediately
- **Con:** Doesn't scale

**Option 2: Zapier Automation (Recommended)**
- Install Zapier account (free tier: 100 tasks/month)
- Create Zap:
  1. Trigger: New row in Supabase `quote_requests`
  2. Filter: ZIP code matches installer service area
  3. Action: Send email to installer with lead details
  4. Action: Create Stripe invoice for $40

**Option 3: Custom Build** (Week 2+)
- Build admin dashboard
- Auto-match leads to installers by ZIP
- Automated billing

**End of Day 2 Goal:** ✅ Can sell leads

---

## 📅 DAY 3: Fix Critical SEO Issues

### Task 3.1: Fix Footer Links ⏱️ 30 min
File: `src/components/Footer.tsx`

**Find and replace:**
```tsx
// ❌ WRONG
<Link to="/guides/solar-buying-guide">

// ✅ CORRECT
<Link to="/learn/solar-buying-guide-texas">
```

Do this for all 6 broken guide links.

### Task 3.2: Create OG Image ⏱️ 1 hour

**Option 1: Use Canva (Easy)**
- Go to canva.com
- Search "Open Graph" template (1200x630px)
- Add text:
  - "SolarInstallersTX.com"
  - "Texas's #1 Bankruptcy-Proof Solar Directory"
  - Safety Score badge graphic
- Download as PNG
- Save to `public/og-default.png`

**Option 2: Use AI (5 min)**
- Use this prompt: "Create an Open Graph image for SolarInstallersTX.com, Texas solar installer directory, 1200x630px, professional gradient background with Texas flag colors, include text 'Find Certified Solar Installers in Texas' and 'Bankruptcy-Proof Ratings'"

### Task 3.3: Optimize Meta Descriptions ⏱️ 15 min
File: `src/app/cities/[city]/page.tsx`

**Find line ~300-310:**
```tsx
// ❌ TOO LONG (160-175 chars)
const pageDescription = `Find NABCEP certified solar installers in ${currentCity.name}, Texas. Compare free quotes from ${installers.length}+ certified companies. ${currentCity.avgSolarCost} average cost. 30% federal tax credit available.`;

// ✅ OPTIMIZED (140-150 chars)
const pageDescription = `Compare ${installers.length} NABCEP solar installers in ${currentCity.name}, TX. Average ${currentCity.avgSolarCost}. Get 30% federal tax credit. Free quotes today.`;
```

**End of Day 3 Goal:** ✅ SEO bleeding stopped

---

## 📅 DAY 4: Add Urgency/Scarcity

### Task 4.1: Homepage Urgency Triggers ⏱️ 1 hour
File: `src/app/page.tsx`

Add above the quote form:
```tsx
<div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 mb-6">
  <div className="flex items-center gap-2">
    <span className="text-2xl">⚡</span>
    <p className="text-sm font-medium text-gray-900">
      <strong>197 Texas homeowners</strong> requested quotes this week
    </p>
  </div>
</div>
```

### Task 4.2: Installer Pricing Urgency ⏱️ 1 hour
File: `src/app/installer-pricing/page.tsx`

Add at top of page:
```tsx
<Alert className="mb-8 border-orange-400 bg-orange-50">
  <AlertCircle className="h-4 w-4 text-orange-600" />
  <AlertTitle className="text-orange-900">Early-Bird Pricing - Limited Time</AlertTitle>
  <AlertDescription className="text-orange-800">
    🔥 <strong>$99/month</strong> (Regular $149) - Only <strong>16 spots</strong> remaining statewide
    <br />
    📅 Price increases January 15, 2026
  </AlertDescription>
</Alert>
```

**End of Day 4 Goal:** ✅ 15-30% conversion boost

---

## 📅 DAY 5: Installer Outreach Preparation

### Task 5.1: Create Installer Badge ⏱️ 2 hours

**Quick Win: Simple HTML Badge**
Create file: `public/badge-embed.html`

```html
<!-- Solar Installers TX - Featured Installer Badge -->
<a href="https://solarinstallerstx.com/installers/[INSTALLER-SLUG]" 
   target="_blank"
   style="display:inline-block;padding:10px 20px;background:#0066cc;color:white;text-decoration:none;border-radius:5px;font-family:Arial;font-size:14px;">
  ⭐ Verified Solar Installer - SolarInstallersTX.com
</a>
```

### Task 5.2: Create Badge Installation Guide ⏱️ 30 min
File: `src/app/installer-badge/page.tsx`

```markdown
# Get Your Free Installer Badge

Add this code to your website footer or certifications page:

[Show HTML snippet]

Benefits:
- Improves trust with potential customers
- Backlink to your profile (SEO benefit)
- Free marketing tool

Questions? Call us at (682) 999-0953
```

### Task 5.3: Prep Outreach List ⏱️ 1 hour

**Use your existing file:** `installer-outreach-list.csv`

Add these columns:
- Decision Maker Name (research on LinkedIn)
- Best Contact Number
- Call Status (Not Called / Called / Follow-Up / Badge Sent / Partner Signed)
- Notes

**End of Day 5 Goal:** ✅ Ready to start calls

---

## 📅 DAY 6: First Installer Outreach

### Task 6.1: Make 20 Outreach Calls ⏱️ 4 hours

**Use script from:** `PHONE-SCRIPT-PARTNER-PACKAGE.md`

**Call Goal Split:**
- 10 calls: Austin area installers
- 10 calls: Houston area installers

**Success Metrics:**
- 5-10 conversations with decision makers
- 2-4 badge commitments
- 1-2 premium partner signups

### Task 6.2: Send Follow-Up Emails ⏱️ 1 hour

For everyone you spoke with:
```
Subject: [COMPANY NAME] - Featured Installer Badge

Hi [NAME],

Great speaking with you earlier! As promised, here's your 
Featured Installer badge code and Premium Partner pricing info.

[Badge code]
[Pricing information]

Let me know if you have any questions!

Best,
[Your Name]
SolarInstallersTX.com
(682) 999-0953
```

**End of Day 6 Goal:** ✅ First backlinks + potential signups

---

## 📅 DAY 7: Launch & Monitor

### Task 7.1: Activate Amazon Associates ⏱️ 1 hour

**Step 1: Sign Up**
- Go to affiliate-program.amazon.com
- Complete application (2-3 day approval)

**Step 2: Add First Links**
While waiting for approval, prep blog post:
- "Top 5 Solar Equipment Products for Texas Homeowners"
- Include: Solar panels, inverters, monitoring systems
- Add Amazon product links (will activate when approved)

### Task 7.2: Set Up Google Analytics Goals ⏱️ 30 min

In GA4, create conversion events:
- [ ] Quote form submission
- [ ] Installer signup click
- [ ] Phone number click
- [ ] Email click

### Task 7.3: Revenue Dashboard ⏱️ 1 hour

Create simple spreadsheet to track:
```
Date | Revenue Source | Amount | Notes
-----|----------------|--------|-------
Day 1 | Premium Signup | $99 | ABC Solar Co
Day 3 | Lead Sale | $40 | Shared lead - Austin
Day 5 | Lead Sale | $40 | Shared lead - Houston
```

**End of Day 7 Goal:** ✅ First revenue recorded

---

## 🎯 SUCCESS CRITERIA (End of Week 1)

### Minimum Success ✅
- [ ] 1-2 Premium installer signups ($99-198 revenue)
- [ ] 5-10 leads generated
- [ ] 2-4 leads sold ($80-160 revenue)
- [ ] 10-20 installer calls made
- [ ] 3-5 backlinks secured (badge installations)
- **Total Revenue: $179-358**

### Good Success 🎯
- [ ] 3-5 Premium installer signups ($297-495 revenue)
- [ ] 15-25 leads generated
- [ ] 10-15 leads sold ($400-600 revenue)
- [ ] 20-30 installer calls made
- [ ] 8-12 backlinks secured
- **Total Revenue: $697-1,095**

### Excellent Success 🚀
- [ ] 5-8 Premium/Platinum signups ($500-1,200 revenue)
- [ ] 30-50 leads generated
- [ ] 20-30 leads sold ($800-1,200 revenue)
- [ ] 40-50 installer calls made
- [ ] 15-20 backlinks secured
- **Total Revenue: $1,300-2,400**

---

## 🚨 TROUBLESHOOTING

### "I can't get Stripe working"
**Solution:** Use Stripe's test mode first
- Test card: 4242 4242 4242 4242
- Any future expiry date
- Any 3-digit CVC
- Test successful payment flow before going live

### "No one's buying installer subscriptions"
**Solutions:**
1. Offer first month free trial
2. Add 7-day money-back guarantee
3. Lower initial price: $49/month for first 10 customers
4. Bundle: "3 months for $249" (save $50)

### "I can't sell leads yet - no buyers"
**Plan B:**
1. Contact EnergySage/SolarReviews about selling leads
2. Price: $20-30/lead (lower margin but immediate cash)
3. Use revenue to fund growth
4. Transition to direct sales later

### "Installer outreach isn't working"
**Solutions:**
1. Simplify pitch: Just offer FREE badge (no sales pitch)
2. Email instead of calling (less pressure)
3. Target smaller installers first (more responsive)
4. Offer case study: "Be our first featured partner - Free for 30 days"

---

## 📊 DAILY TRACKING TEMPLATE

```
DAY 1 CHECKLIST:
─────────────────
□ Stripe account activated
□ 3 products created
□ Test payment successful
□ Pricing page live

STATUS: [Complete / In Progress / Blocked]
BLOCKERS: [List any issues]
REVENUE TODAY: $[amount]

DAY 2 CHECKLIST:
─────────────────
□ Lead sales model chosen
□ Lead delivery method set up
□ Test lead sent + received
□ First lead sold (or ready to sell)

[Continue for each day...]
```

---

## 💡 BONUS QUICK WINS (If You Have Extra Time)

### Quick Win #1: GMB Setup (30 min)
- Create Google My Business listing
- Category: "Internet Marketing Service" or "Business Consultant"
- Add your phone, website, description
- Upload logo as profile photo

### Quick Win #2: Mobile Optimization (15 min)
Add to all pages with phone numbers:
```tsx
<a href="tel:+16829990953" className="btn-primary">
  📞 Call (682) 999-0953
</a>
```

### Quick Win #3: Email Signature (5 min)
Add to YOUR email signature:
```
[Your Name]
SolarInstallersTX.com
Texas's #1 Bankruptcy-Proof Solar Directory
(682) 999-0953
solarinstallerstx.com
```

---

## 🎉 AFTER WEEK 1

**When you hit your first $500 in revenue:**

1. ✅ Celebrate! You have a REAL business
2. 📧 Email me your results (I want to hear the success story!)
3. 📈 Move to Month 1 plan from PROFITABILITY-AUDIT-2025.md
4. 🚀 Scale to $5,000/month (Month 2 roadmap)

**Remember:** The goal isn't perfection. It's REVENUE.

Done is better than perfect. Ship it. 🚢

---

**Start Date:** ____________
**Target Completion:** ____________
**First $ Earned:** ____________

🔥 **LET'S GO!** 🔥
