"""
Email Address Helper - Assist with finding installer contact emails
====================================================================
This script helps you research and fill in email addresses for your outreach campaign.

Features:
- Validates email format
- Opens installer websites in browser for research
- Tracks progress (which emails you've found)
- Exports partial campaigns (found emails only)

Usage:
    # Open websites one by one for manual email research
    python scripts/email_helper.py --csv scripts/outreach_campaign.csv
    
    # Validate emails in CSV
    python scripts/email_helper.py --validate --csv scripts/outreach_campaign.csv
    
    # Export only rows with email addresses found
    python scripts/email_helper.py --export-ready --csv scripts/outreach_campaign.csv
"""

import csv
import re
import webbrowser
import time
from typing import List, Dict, Optional
import argparse


class EmailHelper:
    def __init__(self):
        self.email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    
    def load_campaign(self, csv_path: str) -> List[Dict]:
        """Load campaign CSV."""
        with open(csv_path, 'r', encoding='utf-8') as f:
            return list(csv.DictReader(f))
    
    def save_campaign(self, emails: List[Dict], csv_path: str):
        """Save updated campaign."""
        if not emails:
            return
        fieldnames = emails[0].keys()
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(emails)
    
    def validate_email(self, email: str) -> bool:
        """Check if email format is valid."""
        if not email or email.strip() == '':
            return False
        return bool(self.email_pattern.match(email.strip()))
    
    def validate_campaign(self, csv_path: str):
        """Validate all emails in campaign."""
        print("\n" + "="*60)
        print("📧 Email Validation")
        print("="*60 + "\n")
        
        emails = self.load_campaign(csv_path)
        
        valid_count = 0
        invalid_count = 0
        missing_count = 0
        
        print("Checking email addresses...\n")
        
        for i, row in enumerate(emails, 1):
            email = row.get('email_to', '').strip()
            name = row.get('installer_name', 'Unknown')
            company = row.get('company_name', 'N/A')
            
            if not email:
                missing_count += 1
                continue
            
            if self.validate_email(email):
                valid_count += 1
                print(f"✅ [{i}] {name} ({company}): {email}")
            else:
                invalid_count += 1
                print(f"❌ [{i}] {name} ({company}): INVALID - {email}")
        
        print("\n" + "="*60)
        print("📊 Validation Summary")
        print("="*60)
        print(f"✅ Valid emails: {valid_count}")
        print(f"❌ Invalid emails: {invalid_count}")
        print(f"⏳ Missing emails: {missing_count}")
        print(f"📈 Completion: {valid_count}/{len(emails)} ({valid_count*100//len(emails) if emails else 0}%)")
        print("="*60 + "\n")
    
    def interactive_research(self, csv_path: str, start_index: int = 0):
        """Open websites one by one for manual email research."""
        print("\n" + "="*60)
        print("🔍 Interactive Email Research Assistant")
        print("="*60 + "\n")
        print("I'll open each installer's website in your browser.")
        print("Find their contact email and paste it when prompted.")
        print("Press ENTER to skip if no website or email found.\n")
        
        emails = self.load_campaign(csv_path)
        
        # Filter to only those without emails
        to_research = [e for e in emails if not e.get('email_to', '').strip()]
        
        if not to_research:
            print("✅ All installers already have email addresses!")
            return
        
        print(f"📊 Found {len(to_research)} installers without emails\n")
        
        # Start from specific index if provided
        to_research = to_research[start_index:]
        
        for i, row in enumerate(to_research, start_index + 1):
            name = row.get('installer_name', 'Unknown')
            company = row.get('company_name', 'N/A')
            city = row.get('city', 'Unknown')
            website = row.get('website', '').strip()
            installer_id = row.get('installer_id')
            
            print(f"\n[{i}/{len(to_research) + start_index}] {name} - {company} ({city})")
            print("-" * 60)
            
            if website and website != 'N/A':
                # Clean up website URL
                if not website.startswith(('http://', 'https://')):
                    website = 'https://' + website
                
                print(f"🌐 Website: {website}")
                
                # Ask if user wants to open
                response = input("Open website? (y/n/q to quit): ").lower()
                
                if response == 'q':
                    print("\n💾 Saving progress...")
                    self.save_campaign(emails, csv_path)
                    print("✅ Progress saved!")
                    break
                
                if response == 'y':
                    try:
                        webbrowser.open(website)
                        print("🌐 Opening website in browser...")
                        time.sleep(1)
                    except:
                        print("❌ Could not open website")
                
                # Prompt for email
                email_input = input("Enter email address (or press ENTER to skip): ").strip()
                
                if email_input:
                    if self.validate_email(email_input):
                        # Update the original email list
                        for email_row in emails:
                            if email_row.get('installer_id') == installer_id:
                                email_row['email_to'] = email_input
                                break
                        print(f"✅ Saved: {email_input}")
                    else:
                        print("⚠️  Invalid email format, not saved")
            else:
                print("❌ No website available")
                input("Press ENTER to continue...")
        
        # Save all changes
        print("\n💾 Saving all changes...")
        self.save_campaign(emails, csv_path)
        print("✅ Campaign updated!")
    
    def export_ready(self, csv_path: str, output_path: Optional[str] = None):
        """Export only installers with valid email addresses."""
        if not output_path:
            output_path = csv_path.replace('.csv', '_ready.csv')
        
        emails = self.load_campaign(csv_path)
        
        # Filter to only valid emails
        ready = [
            e for e in emails 
            if e.get('email_to', '').strip() and self.validate_email(e['email_to'])
        ]
        
        if not ready:
            print("❌ No valid email addresses found in campaign")
            return
        
        self.save_campaign(ready, output_path)
        
        print(f"\n✅ Exported {len(ready)} installers ready to contact")
        print(f"📁 Output: {output_path}")
        print(f"📊 {len(ready)}/{len(emails)} installers have emails ({len(ready)*100//len(emails)}%)")
    
    def show_stats(self, csv_path: str):
        """Show campaign statistics."""
        emails = self.load_campaign(csv_path)
        
        with_email = [e for e in emails if e.get('email_to', '').strip()]
        with_website = [e for e in emails if e.get('website', '').strip()]
        sent = [e for e in emails if e.get('status') == 'sent']
        
        print("\n" + "="*60)
        print("📊 Campaign Statistics")
        print("="*60)
        print(f"Total installers: {len(emails)}")
        print(f"With email addresses: {len(with_email)} ({len(with_email)*100//len(emails) if emails else 0}%)")
        print(f"With websites: {len(with_website)} ({len(with_website)*100//len(emails) if emails else 0}%)")
        print(f"Already sent: {len(sent)}")
        print(f"Ready to send: {len(with_email) - len(sent)}")
        print("="*60 + "\n")


def main():
    parser = argparse.ArgumentParser(
        description="Helper tool for finding installer email addresses"
    )
    parser.add_argument(
        "--csv",
        type=str,
        required=True,
        help="Path to campaign CSV file"
    )
    parser.add_argument(
        "--validate",
        action="store_true",
        help="Validate email addresses in CSV"
    )
    parser.add_argument(
        "--research",
        action="store_true",
        help="Interactive mode - opens websites for manual research"
    )
    parser.add_argument(
        "--start",
        type=int,
        default=0,
        help="Start index for research mode (useful to resume)"
    )
    parser.add_argument(
        "--export-ready",
        action="store_true",
        help="Export only rows with valid email addresses"
    )
    parser.add_argument(
        "--stats",
        action="store_true",
        help="Show campaign statistics"
    )
    parser.add_argument(
        "--output",
        type=str,
        help="Output path for --export-ready"
    )
    
    args = parser.parse_args()
    
    helper = EmailHelper()
    
    if args.validate:
        helper.validate_campaign(args.csv)
    elif args.research:
        helper.interactive_research(args.csv, args.start)
    elif args.export_ready:
        helper.export_ready(args.csv, args.output)
    elif args.stats:
        helper.show_stats(args.csv)
    else:
        # Default: show stats
        helper.show_stats(args.csv)
        print("💡 Use --research to start finding emails")
        print("💡 Use --validate to check existing emails")
        print("💡 Use --export-ready to export emails ready to send")


if __name__ == "__main__":
    main()
