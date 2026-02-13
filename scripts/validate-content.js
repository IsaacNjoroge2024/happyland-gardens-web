/**
 * Content Validation Script
 * Validates that all image paths referenced in data files exist in the public
 * directory, checks phone number formatting, and verifies required fields.
 *
 * Usage:
 *   node scripts/validate-content.js
 *   npm run validate-content
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const PUBLIC_DIR = path.join(ROOT, "public");

let warnings = 0;
let errors = 0;
let passed = 0;

function warn(msg) {
  warnings++;
  console.warn("  [WARN] " + msg);
}

function fail(msg) {
  errors++;
  console.error("  [ERROR] " + msg);
}

function pass(msg) {
  passed++;
  console.log("  [PASS] " + msg);
}

/**
 * Extract image paths (e.g. "/images/...") from all .ts files in the data directory.
 * Note: Only matches single/double-quoted strings, not template literals.
 * This is sufficient for static data files but won't catch backtick paths like `/images/...`
 */
function extractImagePaths() {
  const results = [];
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".ts"));

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
    const matches = content.match(/["']\/images\/[^"']+["']/g) || [];
    matches.forEach((m) => {
      results.push({ file, imagePath: m.replace(/['"]/g, "") });
    });
  });

  return results;
}

/**
 * Check if a file exists in the public directory.
 */
function imageExists(imagePath) {
  return fs.existsSync(path.join(PUBLIC_DIR, imagePath));
}

/**
 * Validate that a phone string matches Kenya format: +254 followed by 9 digits.
 */
function isValidKenyaPhone(phone) {
  return /^\+254\d{9}$/.test(phone);
}

/**
 * Extract phone/whatsapp values from contact.ts.
 */
function extractPhones() {
  const content = fs.readFileSync(path.join(DATA_DIR, "contact.ts"), "utf-8");
  const phones = [];

  const phoneMatch = content.match(/phone:\s*["']([^"']+)["']/);
  if (phoneMatch) phones.push({ field: "phone", value: phoneMatch[1] });

  const whatsappMatch = content.match(/whatsapp:\s*["']([^"']+)["']/);
  if (whatsappMatch) phones.push({ field: "whatsapp", value: whatsappMatch[1] });

  return phones;
}

/**
 * Check that required fields are present in the relevant data files.
 * Note: Uses substring matching (includes), not structural parsing.
 * This works for current field names which are distinct, but could match
 * field names in comments or similar strings.
 */
function checkRequiredFields() {
  const checks = [
    { file: "contact.ts", fields: ["businessName", "phone", "email", "address"] },
    { file: "about.ts", fields: ["mission", "story", "highlights"] },
    { file: "events.ts", fields: ["eventTypes"] },
    { file: "gallery.ts", fields: ["galleryImages"] },
    { file: "hero.ts", fields: ["heroData"] },
    { file: "metadata.ts", fields: ["siteMetadata"] },
  ];

  checks.forEach(({ file, fields }) => {
    const filePath = path.join(DATA_DIR, file);
    if (!fs.existsSync(filePath)) {
      fail(`${file} does not exist`);
      return;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    fields.forEach((field) => {
      if (content.includes(field)) {
        pass(`${file}: "${field}" is present`);
      } else {
        fail(`${file}: "${field}" is missing`);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log("Happyland Gardens - Content Validation");
console.log("----------------------------------------\n");

// 1. Image path validation
console.log("[1/3] Checking image paths...");
const imageRefs = extractImagePaths();
const uniquePaths = [...new Set(imageRefs.map((r) => r.imagePath))];

if (uniquePaths.length === 0) {
  warn("No image paths found in data files");
} else {
  uniquePaths.forEach((imgPath) => {
    if (imageExists(imgPath)) {
      pass(imgPath);
    } else {
      fail(imgPath + " does not exist in public/");
    }
  });
}

// 2. Phone number validation
console.log("\n[2/3] Validating phone numbers...");
const phones = extractPhones();

if (phones.length === 0) {
  warn("No phone numbers found in contact.ts");
} else {
  phones.forEach(({ field, value }) => {
    if (isValidKenyaPhone(value)) {
      pass(`${field}: ${value} is valid Kenya format`);
    } else {
      warn(`${field}: ${value} does not match expected format (+254XXXXXXXXX)`);
    }
  });
}

// 3. Required fields check
console.log("\n[3/3] Checking required fields...");
checkRequiredFields();

// Summary
console.log("\n----------------------------------------");
console.log(`Results: ${passed} passed, ${warnings} warnings, ${errors} errors`);

if (errors > 0) {
  console.error("\nValidation FAILED. Fix errors before deploying.");
  process.exit(1);
} else if (warnings > 0) {
  console.warn("\nValidation passed with warnings. Review before deploying.");
} else {
  console.log("\nAll content validation checks passed.");
}
