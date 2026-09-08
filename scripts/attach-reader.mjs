import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('site/.vite/manifest.json'));
const entry=manifest['src/main.js'];
for(const file of fs.readdirSync('site').filter(f=>f.endsWith('.html'))){
 let html=fs.readFileSync(`site/${file}`,'utf8');
 html=html.replace('</head>',`${(entry.css||[]).map(f=>`<link rel="stylesheet" href="${f}">`).join('')}<script type="module" src="${entry.file}"></script></head>`);
 fs.writeFileSync(`site/${file}`,html);
}
