/**
 * Converts all PNG images in public/images/ to WebP format.
 * Run: npm run optimize-images
 *
 * - Skips the OG image (must stay PNG for social sharing compatibility)
 * - Idempotent: skips files where a .webp already exists and is newer than the source .png
 * - Max width: 1920px (maintains aspect ratio, never upscales)
 * - Quality: 85%
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images");
const OG_IMAGE_NAME = "happyland-gardens-og-image.png";

function findFiles(dir, ext) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, ext));
    } else if (entry.name.toLowerCase().endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeImages() {
  console.log("🖼  Optimizing images...\n");

  const pngFiles = findFiles(PUBLIC_IMAGES_DIR, ".png");
  let converted = 0;
  let skipped = 0;

  for (const pngPath of pngFiles) {
    const filename = path.basename(pngPath);

    // Skip OG image — must stay PNG for social sharing
    if (filename === OG_IMAGE_NAME) {
      console.log(`⏭  Skipping OG image: ${filename}`);
      skipped++;
      continue;
    }

    const webpPath = pngPath.replace(/\.png$/i, ".webp");

    // Skip if WebP already exists and is newer than the PNG
    if (fs.existsSync(webpPath)) {
      const pngMtime = fs.statSync(pngPath).mtimeMs;
      const webpMtime = fs.statSync(webpPath).mtimeMs;
      if (webpMtime >= pngMtime) {
        skipped++;
        continue;
      }
    }

    await sharp(pngPath)
      .resize({ width: 1920, withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 85 })
      .toFile(webpPath);

    const pngSize = (fs.statSync(pngPath).size / 1024).toFixed(0);
    const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(0);
    console.log(
      `✓  ${path.relative(process.cwd(), pngPath).replace(/\\/g, "/")}` +
        ` → ${path.basename(webpPath)} (${pngSize}KB → ${webpSize}KB)`
    );
    converted++;
  }

  console.log(`\n✅ Done: ${converted} converted, ${skipped} skipped.`);
}

optimizeImages().catch((err) => {
  console.error("❌ Image optimization failed:", err);
  process.exit(1);
});
