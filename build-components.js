#!/usr/bin/env node
/**
 * Simple build script: copies required static files into `public/`.
 * Usage:
 *   node build-components.js        -> build into public/
 *   node build-components.js --clean -> remove public/
 */

const fs = require('fs').promises;
const path = require('path');

const root = path.resolve(__dirname);
const outDir = path.join(root, 'public');

const itemsToCopy = [
  'index.html',
  'styles.css',
  'script.js',
  'site.webmanifest',
  'assets',
  'components',
  'data',
  'robots.txt',
  'sitemap.xml'
];

async function rm(dir) {
  try {
    await fs.rm(dir, { recursive: true, force: true });
  } catch (e) {
    // fallback for older node versions
    try {
      await fs.rmdir(dir, { recursive: true });
    } catch (err) {}
  }
}

async function copyRecursive(src, dest) {
  const stats = await fs.stat(src);
  if (stats.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src);
    await Promise.all(entries.map(e => copyRecursive(path.join(src, e), path.join(dest, e))));
  } else {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  }
}

async function build() {
  console.log('Building into', outDir);
  await rm(outDir);
  await fs.mkdir(outDir, { recursive: true });

  for (const item of itemsToCopy) {
    const src = path.join(root, item);
    try {
      const stat = await fs.stat(src);
      const dest = path.join(outDir, item);
      await copyRecursive(src, dest);
      console.log('Copied', item);
    } catch (err) {
      // file/folder doesn't exist — skip
      // console.warn('Missing (skipped):', item);
    }
  }

  // If components are loaded dynamically (index.html does this), ensure components/ kept
  console.log('Build complete. Output directory:', outDir);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--clean') || args.includes('clean')) {
    console.log('Removing', outDir);
    await rm(outDir);
    console.log('Clean complete');
    return;
  }

  await build();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
