/* eslint-disable no-undef */
const p = require('path');
const fs = require('fs');
const base = p.join(process.cwd(), 'public');
const files = ['manifest.json', 'favicon.ico', 'sitemap.xml'];
files.forEach(f => {
  const fp = p.join(base, f);
  console.log('Target (Vite Public):', fp, fs.existsSync(fp) ? '[YOK DEGIL]' : '[VAR]');
});