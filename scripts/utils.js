/**
 * Shared utilities for scripts/optimize-images.js and scripts/generate-placeholders.js
 */

const fs = require("fs");
const path = require("path");

/**
 * Recursively finds all files in a directory matching a given extension.
 * @param {string} dir - Root directory to search
 * @param {string} ext - File extension to match (e.g. ".png", ".webp")
 * @returns {string[]} Absolute paths of matching files
 */
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

module.exports = { findFiles };
