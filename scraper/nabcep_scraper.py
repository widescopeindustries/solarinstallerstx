import requests
from bs4 import BeautifulSoup
import json
import time
import re

def scrape_nabcep():
    base_url = "https://www.nabcep.org/find-a-professional/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    installers = []
    
    # Start with page 1 and keep going until no more results
    page = 1
    while True:
        url = f"{base_url}?page={page}" if page > 1 else base_url
        print(f"Scraping page {page}...")
        
        try:
            response = requests.get(url, headers=headers)
            
            if response.status_code != 200:
                print(f"Failed to fetch page {page}, status code: {response.status_code}")
                break
                
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find all installer cards
            installer_cards = soup.find_all('div', class_='card directory-card')
            
            if not installer_cards:
                print(f"No more installers found on page {page}")
                break
            
            print(f"Found {len(installer_cards)} installers on page {page}")
            
            for card in installer_cards:
                try:
                    installer = {
                        'name': '',
                        'certification_type': '',
                        'certification_number': '',
                        'certification_expires': '',
                        'company_name': '',
                        'company_website': '',
                        'location_city': '',
                        'location_state': '',
                        'location_zip': '',
                        'country': 'USA'
                    }
                    
                    # Get name
                    name_elem = card.find('h5', class_='directory-card__name')
                    if name_elem:
                        # Remove flag image if present and clean text
                        installer['name'] = name_elem.get_text(strip=True)
                    
                    # Get certification info
                    card_body = card.find('div', class_='card-body')
                    if card_body:
                        cert_headers = card_body.find_all('h5', class_='mb-0')
                        cert_paragraphs = card_body.find_all('p', class_='mb-0')
                        
                        # First h5 with mb-0 is certification type
                        if cert_headers:
                            installer['certification_type'] = cert_headers[0].get_text(strip=True)
                        
                        # Parse cert number and expiration from paragraphs
                        for p in cert_paragraphs:
                            text = p.get_text(strip=True)
                            if text.startswith('Cert #:'):
                                installer['certification_number'] = text.replace('Cert #:', '').strip()
                            elif text.startswith('Expires:'):
                                installer['certification_expires'] = text.replace('Expires:', '').strip()
                    
                    # Get company info from directory-card__info div
                    info_div = card.find('div', class_='directory-card__info')
                    if info_div:
                        info_paragraphs = info_div.find_all('p', class_='card-text')
                        
                        for i, p in enumerate(info_paragraphs):
                            text = p.get_text(strip=True)
                            
                            if text.startswith('Country:'):
                                installer['country'] = text.replace('Country:', '').strip()
                            elif text.startswith('Location:'):
                                # Parse location like "Location: Austin, TX 78705"
                                location = text.replace('Location:', '').strip()
                                location_parts = location.split(',')
                                
                                if len(location_parts) >= 2:
                                    installer['location_city'] = location_parts[0].strip()
                                    
                                    # Parse state and zip from "TX 78705"
                                    state_zip = location_parts[1].strip().split()
                                    if len(state_zip) >= 1:
                                        installer['location_state'] = state_zip[0]
                                    if len(state_zip) >= 2:
                                        installer['location_zip'] = state_zip[1]
                            elif not text.startswith('Country:') and not text.startswith('Location:'):
                                # Check if it has a link (website)
                                link = p.find('a')
                                if link and link.get('href'):
                                    installer['company_website'] = link.get('href')
                                    # Clean up URLs that start with //
                                    if installer['company_website'].startswith('//'):
                                        installer['company_website'] = 'https:' + installer['company_website']
                                elif text and not installer['company_name']:
                                    # First non-empty text that's not country/location is company name
                                    installer['company_name'] = text
                    
                    installers.append(installer)
                    
                except Exception as e:
                    print(f"Error parsing installer card: {e}")
                    continue
            
            print(f"Total installers scraped so far: {len(installers)}")
            
            # Be respectful with rate limiting
            time.sleep(2)
            page += 1
            
            # Safety limit to prevent infinite loops
            if page > 500:
                print("Reached page limit")
                break
                
        except Exception as e:
            print(f"Error on page {page}: {e}")
            break
    
    # Save to JSON
    output_file = 'nabcep_installers.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(installers, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Successfully scraped {len(installers)} installers")
    print(f"✓ Data saved to {output_file}")
    return installers

if __name__ == "__main__":
    scrape_nabcep()
