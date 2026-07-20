const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');

const map = {
  'text-[10px]': 'text-[12px]',
  'text-[11px]': 'text-sm',
  'text-[12px]': 'text-sm',
  'text-xs': 'text-sm',
  'text-sm': 'text-base',
  'text-base': 'text-lg',
  'text-lg': 'text-xl',
  'text-xl': 'text-2xl',
  'text-2xl': 'text-3xl',
  'text-3xl': 'text-4xl',
  'text-4xl': 'text-5xl',
  'text-5xl': 'text-6xl',
  'text-6xl': 'text-7xl'
};

let modified = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Match tailwind text class surrounded by space, quote, or backtick
  const regex = /(?<=[\s"'`])(text-\[10px\]|text-\[11px\]|text-\[12px\]|text-xs|text-sm|text-base|text-lg|text-xl|text-2xl|text-3xl|text-4xl|text-5xl|text-6xl)(?=[\s"'`])/g;
  
  const newContent = content.replace(regex, match => map[match]);
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    modified++;
  }
});
console.log('Modified ' + modified + ' files.');
