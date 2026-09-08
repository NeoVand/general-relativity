import MarkdownIt from 'markdown-it';
import katex from 'katex';
import {semanticTex} from '../../scripts/math-system.mjs';
const md=new MarkdownIt({html:false,linkify:false,breaks:true});
export function answerHTML(text,chapter=''){
 const expressions=[];
 const masked=text.replace(/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|(?<!\\)\$([^$\n]+?)\$|\\\(([^\n]+?)\\\)/g,(_,display,bracket,inline,paren)=>{
  const tex=display||bracket||inline||paren;
  let html;
  try{html=katex.renderToString(semanticTex(tex,chapter),{displayMode:!!(display||bracket),throwOnError:true,trust:ctx=>ctx.command==='\\htmlClass',strict:'ignore'});}catch{html=md.utils.escapeHtml(tex)}
  expressions.push(html);return `GRASSISTANTMATH${expressions.length-1}END`;
 });
 return md.render(masked).replace(/GRASSISTANTMATH(\d+)END/g,(_,i)=>expressions[+i]);
}
