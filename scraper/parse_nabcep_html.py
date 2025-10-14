from bs4 import BeautifulSoup
import json

# Paste your HTML data here between the triple quotes
html_data = """
<!-- PASTE YOUR HTML HERE -->
"""

def parse_nabcep_html(html):
    soup = BeautifulSoup(html, 'html.parser')
    installers = []
    
    # Find all installer cards
    installer_cards = soup.find_all('div', class_='card directory-card')
    
    print(f"Found {len(installer_cards)} installers")
    
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
                installer['name'] = name_elem.get_text(strip=True)
            
            # Get certification info
            card_body = card.find('div', class_='card-body')
            if card_body:
                cert_headers = card_body.find_all('h5', class_='mb-0')
                cert_paragraphs = card_body.find_all('p', class_='mb-0')
                
                if cert_headers:
                    installer['certification_type'] = cert_headers[0].get_text(strip=True)
                
                for p in cert_paragraphs:
                    text = p.get_text(strip=True)
                    if text.startswith('Cert #:'):
                        installer['certification_number'] = text.replace('Cert #:', '').strip()
                    elif text.startswith('Expires:'):
                        installer['certification_expires'] = text.replace('Expires:', '').strip()
            
            # Get company info
            info_div = card.find('div', class_='directory-card__info')
            if info_div:
                info_paragraphs = info_div.find_all('p', class_='card-text')
                
                for p in info_paragraphs:
                    text = p.get_text(strip=True)
                    
                    if text.startswith('Country:'):
                        installer['country'] = text.replace('Country:', '').strip()
                    elif text.startswith('Location:'):
                        location = text.replace('Location:', '').strip()
                        location_parts = location.split(',')
                        
                        if len(location_parts) >= 2:
                            installer['location_city'] = location_parts[0].strip()
                            state_zip = location_parts[1].strip().split()
                            if len(state_zip) >= 1:
                                installer['location_state'] = state_zip[0]
                            if len(state_zip) >= 2:
                                installer['location_zip'] = state_zip[1]
                    elif text:
                        link = p.find('a')
                        if link and link.get('href'):
                            website = link.get('href')
                            if website.startswith('//'):
                                website = 'https:' + website
                            installer['company_website'] = website
                        elif not installer['company_name']:
                            installer['company_name'] = text
            
            installers.append(installer)
            
        except Exception as e:
            print(f"Error parsing card: {e}")
            continue
    
    return installers

if __name__ == "__main__":
    installers = parse_nabcep_html(html_data)
    
    # Save to JSON
    with open('nabcep_installers.json', 'w', encoding='utf-8') as f:
        json.dump(installers, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Parsed {len(installers)} installers")
    print(f"✓ Saved to nabcep_installers.json")
    
    # Print first installer as example
    if installers:
        print("\nExample (first installer):")
        print(json.dumps(installers[0], indent=2))
