"""
Email Outreach Generator for Solar Installers
==============================================
Generates personalized email outreach campaigns for installers in the database.

Features:
- Loads installer data from public/installers.json
- Creates personalized emails with city-specific messaging
- Exports to CSV for email marketing tools (Mailchimp, SendGrid, etc.)
- Groups installers by city for targeted campaigns
- Tracks email status and follow-ups

Usage:
    python scripts/email_outreach_generator.py
    python scripts/email_outreach_generator.py --city "Austin" --tier "premium"
"""

import json
import csv
import os
import argparse
from datetime import datetime
from typing import List, Dict, Optional
from collections import defaultdict
from pathlib import Path


class EmailOutreachGenerator:
    def __init__(self, installers_path: str = None):
        # Default to public/installers.json relative to script location
        if installers_path is None:
            script_dir = Path(__file__).parent.parent
            installers_path = script_dir / "public" / "installers.json"
        self.installers_path = str(installers_path)
        self.installers = []
        self.email_template = self._get_email_template()
        
    def load_installers(self) -> List[Dict]:
        """Load installer data from JSON file."""
        with open(self.installers_path, 'r', encoding='utf-8') as f:
            self.installers = json.load(f)
        print(f"✅ Loaded {len(self.installers)} installers from database")
        return self.installers
    
    def filter_installers(
        self, 
        city: Optional[str] = None,
        has_company: bool = True,
        has_website: bool = False,
        min_certification_years: int = 0
    ) -> List[Dict]:
        """Filter installers based on criteria."""
        filtered = self.installers
        
        if city:
            filtered = [i for i in filtered if i.get('location_city', '').lower() == city.lower()]
            
        if has_company:
            filtered = [i for i in filtered if i.get('company_name')]
            
        if has_website:
            filtered = [i for i in filtered if i.get('company_website')]
            
        print(f"✅ Filtered to {len(filtered)} installers matching criteria")
        return filtered
    
    def _get_email_template(self) -> Dict[str, str]:
        """Returns the email template with placeholders."""
        return {
            "subject": "Featured listing spot open for {city} solar installers (Texas-first directory)",
            "body": """Hi {name},

I'm reaching out from **SolarInstallersTX.com** – a new Texas-based directory built specifically for local solar installers like you.

**Why we started this:**
When we looked at the solar installer landscape in Texas, we saw something that didn't sit right: Texan companies were buried in national directories dominated by out-of-state franchises. For the largest solar market in the country, that just didn't work.

So we built something different – a **Texas-only directory** where homeowners search for local installers first, not national chains.

**The SolarInstallersTX.com difference:**
- We're owned by Widescope Industries LLC, a Texas-based, veteran-owned company (SDVOSB certified)
- We operate with the same values that defined our military service: **integrity, transparency, discipline**
- We're not a faceless national outfit – we're your neighbors, committed to strengthening local Texas businesses

**What we're offering {city} installers right now:**

We have **5 Featured Installer spots available in {city}**, and I wanted to reach out to you first because {reason}.

**Two tiers to choose from:**

✅ **Verified Installer - $29.99/month**
- ✓ Verified badge on your profile
- ✓ Priority placement in search results
- ✓ Enhanced listing with photos, service areas, and certifications
- ✓ Direct phone number display (no lead routing – customers call YOU)
- ✓ Monthly performance analytics

⭐ **Premium Featured Installer - $99.99/month**
- ✓ Everything in Verified, PLUS:
- ✓ Featured placement on city pages (top carousel)
- ✓ Homepage featured rotation
- ✓ "Featured" badge throughout the site
- ✓ Priority listing on state-wide searches
- ✓ Social media promotion (10K+ impressions/month)

**Founding Installer Bonus (Next 7 Days Only):**
→ Lock in your current rate for **12 months** (even if we raise prices)
→ Free profile setup & optimization (normally $150 value)
→ First 50 installers get a "Founding Partner" badge on their profile

**Why this matters for your business:**

Texas homeowners are actively searching for **local, trusted installers**. Right now, when they search "{city} solar installers," they're seeing:
- National lead-gen sites that charge you $50+ per lead
- Out-of-state companies with generic landing pages
- Directories that bury Texas installers at the bottom

With SolarInstallersTX.com, you're competing on **your home turf** – not against massive ad budgets from California or Arizona.

**Next steps:**

If you'd like to claim one of the 5 Featured spots in {city}, just reply to this email and let me know which tier you're interested in. I can set you up within 24 hours.

Or, if you have questions, I'm happy to jump on a quick call this week – just let me know what works for you.

Thanks for considering this, and thanks for serving Texas homeowners with clean energy.

Best regards,  
{sender_name}  
SolarInstallersTX.com  
A Widescope Industries LLC Company  
{sender_phone}  
{sender_email}

P.S. – We're a veteran-owned Texas business (SDVOSB certified). You can verify our SBA certification here: https://veterans.certify.sba.gov/#search. We built this platform with the same integrity that defined our military service – transparent, honest, and committed to our community."""
        }
    
    def _generate_reason(self, installer: Dict) -> str:
        """Generate personalized reason for outreach."""
        reasons = []
        
        if "NABCEP" in installer.get('certification_type', ''):
            reasons.append("your NABCEP certification")
        
        if installer.get('company_name'):
            reasons.append(f"your company {installer['company_name']} has a strong local presence")
        
        if installer.get('certification_expires'):
            try:
                exp_date = datetime.strptime(installer['certification_expires'], '%Y-%m-%d')
                if exp_date.year >= 2026:
                    reasons.append("your up-to-date certifications")
            except:
                pass
        
        if not reasons:
            reasons.append("you're an established installer in the Texas market")
        
        return reasons[0]
    
    def generate_email(
        self, 
        installer: Dict,
        sender_name: str = "Michael Lyndon",
        sender_email: str = "michael@solarinstallerstx.com",
        sender_phone: str = "(555) 123-4567"
    ) -> Dict[str, str]:
        """Generate personalized email for an installer."""
        city = installer.get('location_city', 'your area')
        name = installer.get('name', 'there')
        
        # Try to extract first name
        if ' ' in name:
            first_name = name.split()[0]
        else:
            first_name = name
        
        reason = self._generate_reason(installer)
        
        subject = self.email_template['subject'].format(city=city)
        body = self.email_template['body'].format(
            name=first_name,
            city=city,
            reason=reason,
            sender_name=sender_name,
            sender_email=sender_email,
            sender_phone=sender_phone
        )
        
        return {
            "installer_id": installer.get('id', ''),
            "installer_name": name,
            "company_name": installer.get('company_name', 'N/A'),
            "city": city,
            "zip": installer.get('location_zip', ''),
            "website": installer.get('company_website', ''),
            "certification": installer.get('certification_type', ''),
            "email_to": "",  # To be filled in manually or by email finder
            "subject": subject,
            "body": body,
            "status": "ready",
            "sent_date": "",
            "follow_up_date": ""
        }
    
    def export_to_csv(
        self,
        emails: List[Dict],
        output_path: str = "scripts/outreach_campaign.csv"
    ):
        """Export generated emails to CSV for email marketing tools."""
        if not emails:
            print("❌ No emails to export")
            return
        
        fieldnames = [
            "installer_id", "installer_name", "company_name", "city", "zip",
            "website", "certification", "email_to", "subject", "body",
            "status", "sent_date", "follow_up_date"
        ]
        
        with open(output_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(emails)
        
        print(f"✅ Exported {len(emails)} emails to {output_path}")
    
    def generate_city_summary(self, installers: List[Dict]) -> Dict[str, int]:
        """Generate summary of installers by city."""
        city_counts = defaultdict(int)
        for installer in installers:
            city = installer.get('location_city', 'Unknown')
            city_counts[city] += 1
        
        return dict(sorted(city_counts.items(), key=lambda x: x[1], reverse=True))
    
    def run(
        self,
        city: Optional[str] = None,
        max_installers: Optional[int] = None,
        output_path: str = "scripts/outreach_campaign.csv"
    ):
        """Run the email generation process."""
        print("\n" + "="*60)
        print("🚀 SolarInstallersTX Email Outreach Generator")
        print("="*60 + "\n")
        
        # Load installers
        self.load_installers()
        
        # Filter installers
        filtered = self.filter_installers(
            city=city,
            has_company=True,  # Only installers with company names
            has_website=False  # Set to True if you only want those with websites
        )
        
        if max_installers:
            filtered = filtered[:max_installers]
            print(f"📊 Limited to first {max_installers} installers")
        
        # Generate city summary
        city_summary = self.generate_city_summary(filtered)
        print("\n📍 Installers by city:")
        for city_name, count in list(city_summary.items())[:10]:
            print(f"   {city_name}: {count}")
        if len(city_summary) > 10:
            print(f"   ... and {len(city_summary) - 10} more cities")
        
        # Generate emails
        print(f"\n✉️  Generating {len(filtered)} personalized emails...")
        emails = []
        for installer in filtered:
            email_data = self.generate_email(installer)
            emails.append(email_data)
        
        # Export to CSV
        self.export_to_csv(emails, output_path)
        
        print("\n" + "="*60)
        print("✅ Campaign generation complete!")
        print("="*60)
        print(f"\n📁 Output file: {output_path}")
        print(f"📊 Total emails generated: {len(emails)}")
        print("\n💡 Next steps:")
        print("   1. Open the CSV and add email addresses to the 'email_to' column")
        print("   2. Import to your email marketing tool (Mailchimp, SendGrid, etc.)")
        print("   3. Or use the email_sender.py script to send via SMTP")
        print("   4. Track responses in the 'status' and 'sent_date' columns")
        print("\n")


def main():
    parser = argparse.ArgumentParser(
        description="Generate personalized email outreach for solar installers"
    )
    parser.add_argument(
        "--city",
        type=str,
        help="Filter by specific city (e.g., 'Austin', 'Houston')"
    )
    parser.add_argument(
        "--max",
        type=int,
        help="Maximum number of emails to generate"
    )
    parser.add_argument(
        "--output",
        type=str,
        default="scripts/outreach_campaign.csv",
        help="Output CSV file path"
    )
    
    args = parser.parse_args()
    
    generator = EmailOutreachGenerator()
    generator.run(
        city=args.city,
        max_installers=args.max,
        output_path=args.output
    )


if __name__ == "__main__":
    main()
