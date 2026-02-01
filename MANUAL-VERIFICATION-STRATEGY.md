# Manual Verification & Badge Outreach Strategy

## The Problem
We have ~500 solar installers listed, but many contact details (emails/phones) are missing or generic placeholders. Mass emailing is failing, and automated SMS is legally risky (TCPA).

## The Solution: "Claim & Verify" Campaign
Instead of trying to "sell" them immediately, we run a **Verification Campaign**. The goal is simply to get the *correct* contact info. The sale happens *after* they claim their profile.

---

## Step 1: The "Verification" Script (Phone/SMS)

**Legal Note:** Do NOT use automated SMS tools (Twilio, etc.) for cold outreach. Use a manual business phone (Google Voice, etc.) and type messages manually. This keeps it compliant as 1-to-1 business communication.

### The "script" (Voice or Text)
**Goal:** Get the direct email of the marketing manager or owner.

**SMS Template (Manual Send Only):**
> "Hi [Company Name], this is Lyndon from SolarInstallersTX. We have a verified listing for you on our Texas directory, but it's missing your logo and website link. Can I text/email you the claim link? It's free to update."

**Voice Script:**
> "Hi, I'm calling from SolarInstallersTX. We're updating our 2026 directory of certified installers. I see [Company Name] is listed, but your profile is marked 'Unverified' and is missing your logo. Who is the best person to email the claim link to so you don't miss out on leads?"

---

## Step 2: The "Badge" Incentive (The Carrot)

Once they say "Yes, send it to `name@company.com`", you send this email. This is where we plant the **Backlink** seed.

**Subject:** Action Required: Verify [Company Name] listing on SolarInstallersTX

**Body:**
> Hi [Name],
>
> Thanks for verifying. Here is the link to claim your profile:
> [Link to their Profile]
>
> **Bonus:** Since you are a NABCEP certified installer, we’ve generated a **"Top Rated 2026"** badge for your website.
>
> Adding this badge helps trust/SEO for both of us. You can see your badge here:
> https://solarinstallerstx.com/badges/badge-certified.png
>
> **Embed Code:**
> ```html
> <a href="https://solarinstallerstx.com/installers/[SLUG]">
>   <img src="https://solarinstallerstx.com/badges/badge-certified.png" alt="Certified Solar Installer Texas" width="150" />
> </a>
> ```
>
> Let me know once you've claimed your profile!
>
> Best,
> Lyndon

---

## Step 3: The "Badge Backlink" Hack

You mentioned using the badge as a "DR Hack". **This works.**
1.  **Host the badge on your domain** (we just created them in `/public/badges`).
2.  **Require the backlink:** The embed code *links back* to their specific profile on your site.
3.  **SEO Benefit:** If 50 installers put this on their homepage footer, you get 50 high-relevance, industry-specific backlinks. This will spike your DR (Domain Rating) significantly.

---

## Step 4: Execution Plan (The "Grind")

Since automation failed, we do this manually but efficiently.

1.  **Target:** Top 20 Installers in Austin/Dallas first.
2.  **Find:** Search Google Maps for their *real* mobile number or main office line.
3.  **Action:** Call/Text 5 per day.
4.  **Result:** In 1 week, you'll have ~20 *verified* emails.
5.  **Scale:** Once you have 20, you can see the results. If it works, hire a VA ($5/hr) to do the other 480.

## Tools to Help
*   **Apollo.io (Free Tier):** Great for finding "Owner" or "Marketing Director" emails for solar companies.
*   **Hunter.io:** Verifies if an email pattern (e.g., `firstname@company.com`) is valid.
