import MarkdownIt from 'markdown-it';
import katex from 'katex';
import DOMPurify from 'dompurify';
import { browser } from '$app/environment';
const markdown = new MarkdownIt({ html: false, breaks: true });
export function answerHTML(text: string) {
  if (!browser) return '';
  const math: string[] = [];
  const masked = text.replace(
    /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|(?<!\\)\$([^$\n]+?)\$|\\\(([^\n]+?)\\\)/g,
    (_, display, bracket, inline, paren) => {
      let html: string;
      try {
        html = katex.renderToString(display || bracket || inline || paren, {
          displayMode: !!(display || bracket),
          throwOnError: true,
          trust: false
        });
      } catch {
        html = markdown.utils.escapeHtml(display || bracket || inline || paren);
      }
      math.push(html);
      return `RELATIVITYMATH${math.length - 1}END`;
    }
  );
  return DOMPurify.sanitize(
    markdown.render(masked).replace(/RELATIVITYMATH(\d+)END/g, (_, index) => math[Number(index)]),
    {
      USE_PROFILES: { html: true, mathMl: true, svg: true },
      ADD_TAGS: ['annotation', 'semantics'],
      ADD_ATTR: ['encoding']
    }
  );
}
