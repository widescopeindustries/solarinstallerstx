"""
Email Sender - SMTP Email Delivery
===================================
Sends personalized emails to installers using SMTP.

⚠️ IMPORTANT SETUP REQUIRED:
1. Create a .env file in the scripts/ directory with:
   SMTP_HOST=smtp.gmail.com (or your email provider)
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   FROM_EMAIL=your-email@gmail.com
   FROM_NAME=Michael Lyndon

2. For Gmail, use an "App Password" not your regular password:
   https://support.google.com/accounts/answer/185833

3. Test with --test flag before sending to all installers

Usage:
    # Test mode (sends to yourself only)
    python scripts/email_sender.py --test --csv scripts/outreach_campaign.csv
    
    # Send to first 5 installers
    python scripts/email_sender.py --csv scripts/outreach_campaign.csv --max 5
    
    # Send to specific city
    python scripts/email_sender.py --csv scripts/outreach_campaign.csv --city "Austin"
    
    # Resume from last sent (skips already-sent emails)
    python scripts/email_sender.py --csv scripts/outreach_campaign.csv --resume
"""

import csv
import smtplib
import time
import os
import argparse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import List, Dict, Optional
from pathlib import Path

# Try to import dotenv for .env file support
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("⚠️  python-dotenv not installed. Using environment variables only.")
    print("   Install with: pip install python-dotenv")


class EmailSender:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_username = os.getenv('SMTP_USERNAME')
        self.smtp_password = os.getenv('SMTP_PASSWORD')
        self.from_email = os.getenv('FROM_EMAIL', self.smtp_username)
        self.from_name = os.getenv('FROM_NAME', 'SolarInstallersTX')
        
        self.validate_config()
    
    def validate_config(self):
        """Validate SMTP configuration."""
        if not self.smtp_username or not self.smtp_password:
            print("\n❌ SMTP Configuration Missing!")
            print("=" * 60)
            print("Please set up your SMTP credentials:")
            print("\n1. Create a .env file in the scripts/ directory")
            print("2. Add the following variables:")
            print("\n   SMTP_HOST=smtp.gmail.com")
            print("   SMTP_PORT=587")
            print("   SMTP_USERNAME=your-email@gmail.com")
            print("   SMTP_PASSWORD=your-app-password")
            print("   FROM_EMAIL=your-email@gmail.com")
            print("   FROM_NAME=Michael Lyndon")
            print("\n3. For Gmail, create an App Password:")
            print("   https://support.google.com/accounts/answer/185833")
            print("=" * 60 + "\n")
            exit(1)
    
    def load_campaign(self, csv_path: str) -> List[Dict]:
        """Load email campaign from CSV."""
        emails = []
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            emails = list(reader)
        return emails
    
    def save_campaign(self, emails: List[Dict], csv_path: str):
        """Save updated campaign with sent status."""
        if not emails:
            return
        
        fieldnames = emails[0].keys()
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(emails)
    
    def send_email(
        self,
        to_email: str,
        subject: str,
        body: str,
        test_mode: bool = False
    ) -> bool:
        """Send a single email via SMTP."""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['From'] = f"{self.from_name} <{self.from_email}>"
            msg['To'] = to_email
            msg['Subject'] = subject
            
            # Convert markdown-style formatting to plain text
            plain_body = body.replace('**', '').replace('✅', '✓').replace('⭐', '*')
            
            # Attach plain text version
            msg.attach(MIMEText(plain_body, 'plain'))
            
            if test_mode:
                print(f"📧 TEST MODE - Would send to: {to_email}")
                print(f"   Subject: {subject}")
                print(f"   Body preview: {body[:100]}...")
                return True
            
            # Connect to SMTP server
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)
            
            print(f"✅ Sent to: {to_email}")
            return True
            
        except Exception as e:
            print(f"❌ Failed to send to {to_email}: {str(e)}")
            return False
    
    def send_campaign(
        self,
        csv_path: str,
        city: Optional[str] = None,
        max_emails: Optional[int] = None,
        test_mode: bool = False,
        resume: bool = False,
        delay_seconds: int = 2
    ):
        """Send email campaign to installers."""
        print("\n" + "="*60)
        print("📧 SolarInstallersTX Email Sender")
        if test_mode:
            print("⚠️  TEST MODE - No emails will be sent")
        print("="*60 + "\n")
        
        # Load campaign
        emails = self.load_campaign(csv_path)
        print(f"📊 Loaded {len(emails)} emails from campaign")
        
        # Filter emails
        to_send = []
        for email in emails:
            # Skip if no email address
            if not email.get('email_to') or email['email_to'].strip() == '':
                continue
            
            # Skip if already sent (resume mode)
            if resume and email.get('status') == 'sent':
                continue
            
            # Filter by city
            if city and email.get('city', '').lower() != city.lower():
                continue
            
            to_send.append(email)
        
        if max_emails:
            to_send = to_send[:max_emails]
        
        print(f"✉️  Ready to send {len(to_send)} emails")
        
        if len(to_send) == 0:
            print("❌ No emails to send (check filters or add email addresses)")
            return
        
        # Confirmation prompt
        if not test_mode:
            response = input(f"\n⚠️  Send {len(to_send)} emails? (yes/no): ")
            if response.lower() != 'yes':
                print("❌ Cancelled")
                return
        
        # Send emails
        sent_count = 0
        failed_count = 0
        
        print("\n📤 Sending emails...\n")
        for i, email_data in enumerate(to_send, 1):
            to_email = email_data['email_to']
            subject = email_data['subject']
            body = email_data['body']
            
            print(f"[{i}/{len(to_send)}] ", end='')
            
            success = self.send_email(to_email, subject, body, test_mode)
            
            if success:
                sent_count += 1
                if not test_mode:
                    # Update status in original list
                    for e in emails:
                        if e['installer_id'] == email_data['installer_id']:
                            e['status'] = 'sent'
                            e['sent_date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                            break
            else:
                failed_count += 1
            
            # Delay between emails to avoid spam filters
            if not test_mode and i < len(to_send):
                time.sleep(delay_seconds)
        
        # Save updated campaign
        if not test_mode:
            self.save_campaign(emails, csv_path)
        
        # Summary
        print("\n" + "="*60)
        print("✅ Campaign Complete!")
        print("="*60)
        print(f"✅ Sent: {sent_count}")
        print(f"❌ Failed: {failed_count}")
        if not test_mode:
            print(f"📁 Updated status saved to: {csv_path}")
        print("\n")


def main():
    parser = argparse.ArgumentParser(
        description="Send email outreach campaign to solar installers"
    )
    parser.add_argument(
        "--csv",
        type=str,
        required=True,
        help="Path to campaign CSV file"
    )
    parser.add_argument(
        "--city",
        type=str,
        help="Send only to installers in specific city"
    )
    parser.add_argument(
        "--max",
        type=int,
        help="Maximum number of emails to send"
    )
    parser.add_argument(
        "--test",
        action="store_true",
        help="Test mode - preview emails without sending"
    )
    parser.add_argument(
        "--resume",
        action="store_true",
        help="Resume campaign - skip already-sent emails"
    )
    parser.add_argument(
        "--delay",
        type=int,
        default=2,
        help="Delay in seconds between emails (default: 2)"
    )
    
    args = parser.parse_args()
    
    sender = EmailSender()
    sender.send_campaign(
        csv_path=args.csv,
        city=args.city,
        max_emails=args.max,
        test_mode=args.test,
        resume=args.resume,
        delay_seconds=args.delay
    )


if __name__ == "__main__":
    main()
