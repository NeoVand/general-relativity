local equation_count = 0
function Math(m)
  m.text = m.text:gsub("{([^{}]-)\\rm%s+([^{}]-)}", "{%1\\mathrm{%2}}")
  m.text = m.text:gsub("\\boldsymbol", "\\symbfit")
  if m.mathtype == 'DisplayMath' then
    equation_count = equation_count + 1
    local prefix = '\\begin{center}\n\\begingroup\n\\sbox{\\grmathbox}{$\\displaystyle '
    local suffix = '$}\n\\typeout{GRDISPLAY|'..equation_count..'|\\the\\wd\\grmathbox|\\the\\linewidth}\n\\ifdim\\wd\\grmathbox>\\linewidth\n\\resizebox{\\linewidth}{!}{\\usebox{\\grmathbox}}\n\\else\\usebox{\\grmathbox}\\fi\n\\endgroup\n\\end{center}'
    return pandoc.RawInline('latex',prefix..m.text..suffix)
  end
  return m
end
function Header(h)
  if h.identifier == 'chapter-1' then
    return {pandoc.RawBlock('latex','\\mainmatter'),h}
  end
end
function Table(t)
  local n=#t.colspecs
  local widths = n==2 and {0.30,0.70} or n==3 and {0.25,0.36,0.39} or nil
  if widths then
    for i=1,n do t.colspecs[i][2]=widths[i] end
  end
  return {pandoc.RawBlock('latex','\\begingroup\\small\\setlength{\\tabcolsep}{5pt}\\renewcommand{\\arraystretch}{1.13}'),t,pandoc.RawBlock('latex','\\endgroup')}
end

function HorizontalRule()
  return {}
end
