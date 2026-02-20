const fs = require('fs');

const colors = ["#0B3B5C", "#1A4B7A", "#2A5F8A", "#3A74A0"];

function scale(cx, cy, w, h, color) {
  const pts = [
    `${cx},${cy - h/2}`,
    `${cx + w/2},${cy}`,
    `${cx},${cy + h/2}`,
    `${cx - w/2},${cy}`
  ].join(' ');
  return `  <polygon points="${pts}" fill="${color}" />`;
}

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160" width="100%" height="100%">\n`;

const counts = [2, 3, 4, 3, 4, 3, 4, 3, 2, 1];
const dx = 10;
const dy = 14;
const w = 18;
const h = 26;

counts.forEach((count, rowIdx) => {
  const y = 14 + rowIdx * dy;
  const startX = 50 - ((count - 1) * dx);
  for (let i = 0; i < count; i++) {
    const cx = startX + i * 2 * dx;
    const color = colors[(rowIdx * 2 + i * 3) % colors.length];
    svg += scale(cx, y, w, h, color) + '\n';
  }
});

svg += `</svg>`;

fs.mkdirSync('client/public', { recursive: true });
fs.writeFileSync('client/public/logo.svg', svg);
fs.writeFileSync('client/public/favicon.svg', svg);
console.log('SVG generated successfully.');
