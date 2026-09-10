import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('site/.vite/manifest.json'));
const entry=manifest['src/main.js'];
for(const file of fs.readdirSync('site').filter(f=>f.endsWith('.html'))){
 let html=fs.readFileSync(`site/${file}`,'utf8');
 // Updating only the app must replace the old bundle, not attach a second app.
 html=html.replace(/<!-- reader:start -->[\s\S]*?<!-- reader:end -->/g,'')
  .replace(/<link rel="stylesheet" href="reader\/[^"<>]+">/g,'')
  .replace(/<script type="module" src="reader\/[^"<>]+"><\/script>/g,'');
 html=html.replace('</head>',`<!-- reader:start -->${(entry.css||[]).map(f=>`<link rel="stylesheet" href="${f}">`).join('')}<script type="module" src="${entry.file}"></script><!-- reader:end --></head>`);
 fs.writeFileSync(`site/${file}`,html);
}
