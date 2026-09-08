from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
(root/'build').mkdir(exist_ok=True)
s=(root/'book.md').read_text()
# Keep every substantive paragraph and equation; use print-native navigation and cover.
s=re.sub(r'^# General Relativity, From the Inside Out\n\n### [^\n]+\n\n','',s,count=1)
s=re.sub(r'^## Contents\n.*?\n---\n','',s,count=1,flags=re.M|re.S)
s=re.sub(r'<a id="([^"]+)"></a>\n\n(## [^\n]+)',lambda m:m[2]+' {#'+m[1]+'}',s)
s=re.sub(r'^(#{2,4}) ',lambda m:m[1][1:]+' ',s,flags=re.M)
s=s.replace('—',' - ').replace('–','-')
# Prefatory explanations have their own start; main matter starts at Chapter 1.
s='# Before we begin\n\n'+s
(root/'build/book.md').write_text(s)
print('Source prepared:',len(s),'characters')
