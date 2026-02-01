
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const BADGE_DIR = path.join(process.cwd(), 'public', 'badges');

if (!fs.existsSync(BADGE_DIR)) {
  fs.mkdirSync(BADGE_DIR, { recursive: true });
}

async function createBadge(text: string, subtext: string, filename: string, color: string) {
  const width = 300;
  const height = 300;
  
  // Create SVG string
  const svgImage = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.3"/>
        </filter>
      </defs>
      
      <!-- Badge Shape (Shield) -->
      <path d="M150 20 L270 70 V160 C270 230 150 280 150 280 C150 280 30 230 30 160 V70 L150 20 Z" 
            fill="url(#grad)" filter="url(#shadow)" stroke="white" stroke-width="4"/>
            
      <!-- Inner Ring -->
      <circle cx="150" cy="120" r="60" fill="none" stroke="white" stroke-width="2" opacity="0.5"/>
      
      <!-- Checkmark -->
      <path d="M120 120 L140 140 L180 100" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- Text -->
      <text x="150" y="210" font-family="Arial, sans-serif" font-weight="bold" font-size="24" text-anchor="middle" fill="white">${text}</text>
      <text x="150" y="240" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#e2e8f0">${subtext}</text>
      
      <!-- Domain -->
      <text x="150" y="260" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#cbd5e1" opacity="0.8">SolarInstallersTX.com</text>
    </svg>
  `;

  const outputPath = path.join(BADGE_DIR, filename);
  
  await sharp(Buffer.from(svgImage))
    .png()
    .toFile(outputPath);
    
  console.log(`Generated badge: ${outputPath}`);
}

async function main() {
  console.log('Generating badges...');
  
  // 1. Certified Partner (Green)
  await createBadge('CERTIFIED', 'INSTALLER', 'badge-certified.png', '#16a34a');
  
  // 2. Top Rated (Gold)
  await createBadge('TOP RATED', 'SOLAR PRO', 'badge-top-rated.png', '#eab308');
  
  // 3. Verified Listing (Blue)
  await createBadge('VERIFIED', 'LISTING', 'badge-verified.png', '#2563eb');
  
  console.log('Done! Badges saved to public/badges/');
}

main().catch(console.error);
