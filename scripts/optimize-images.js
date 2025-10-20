import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const QUALITY = 85;
const SIZES = [320, 640, 1024, 1280, 1920];
const INPUT_DIR = path.join(__dirname, '../src/assets');
const OUTPUT_DIR = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`Skipping ${inputPath} - not a supported image format`);
    return;
  }

  console.log(`Optimizing ${inputPath}...`);

  try {
    // Generate WebP versions
    for (const size of SIZES) {
      const webpPath = path.join(outputDir, `${filename}-${size}w.webp`);
      await sharp(inputPath)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(webpPath);
    }

    // Generate AVIF versions (best compression)
    for (const size of SIZES) {
      const avifPath = path.join(outputDir, `${filename}-${size}w.avif`);
      await sharp(inputPath)
        .resize(size, null, { withoutEnlargement: true })
        .avif({ quality: QUALITY })
        .toFile(avifPath);
    }

    // Generate optimized JPEG fallbacks
    for (const size of SIZES) {
      const jpegPath = path.join(outputDir, `${filename}-${size}w.jpg`);
      await sharp(inputPath)
        .resize(size, null, { withoutEnlargement: true })
        .jpeg({ quality: QUALITY, progressive: true })
        .toFile(jpegPath);
    }

    console.log(`✅ Optimized ${filename} - Generated ${SIZES.length * 3} variants`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...');
  
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('No images found to optimize');
    return;
  }

  console.log(`Found ${imageFiles.length} images to optimize`);

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    await optimizeImage(inputPath, OUTPUT_DIR);
  }

  console.log('🎉 Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
}

// Run optimization
optimizeAllImages().catch(console.error);
