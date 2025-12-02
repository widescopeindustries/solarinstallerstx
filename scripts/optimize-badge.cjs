const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeBadge() {
  const inputPath = path.join(__dirname, '../public/solar-safety-scored-badge.png');
  const outputPathWebP = path.join(__dirname, '../public/solar-safety-scored-badge.webp');
  const outputPathPNG = path.join(__dirname, '../public/solar-safety-scored-badge-optimized.png');

  console.log('Optimizing solar-safety-scored-badge.png...');

  // Create WebP version (much smaller)
  await sharp(inputPath)
    .webp({ quality: 85 })
    .toFile(outputPathWebP);

  // Create optimized PNG version as fallback
  await sharp(inputPath)
    .png({ quality: 85, compressionLevel: 9 })
    .toFile(outputPathPNG);

  // Get file sizes
  const originalSize = fs.statSync(inputPath).size;
  const webpSize = fs.statSync(outputPathWebP).size;
  const pngSize = fs.statSync(outputPathPNG).size;

  console.log(`Original PNG: ${(originalSize / 1024).toFixed(2)} KB`);
  console.log(`WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize/originalSize) * 100).toFixed(1)}% smaller)`);
  console.log(`Optimized PNG: ${(pngSize / 1024).toFixed(2)} KB (${((1 - pngSize/originalSize) * 100).toFixed(1)}% smaller)`);

  // Replace original with optimized PNG
  fs.unlinkSync(inputPath);
  fs.renameSync(outputPathPNG, inputPath);

  console.log('\n✅ Badge optimized successfully!');
  console.log('Created: solar-safety-scored-badge.webp');
  console.log('Replaced: solar-safety-scored-badge.png with optimized version');
}

optimizeBadge().catch(console.error);
