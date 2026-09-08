<script>
 import DOMPurify from 'dompurify';
 let {html}=$props();
 function render(node){
  // Book content, model replies, and TeX are always sanitized before insertion.
  node.replaceChildren(DOMPurify.sanitize(html,{RETURN_DOM_FRAGMENT:true,ADD_TAGS:['annotation','semantics'],ADD_ATTR:['encoding','tabindex'],USE_PROFILES:{html:true,svg:true,svgFilters:true,mathMl:true}}));
  return ()=>node.replaceChildren();
 }
</script>
<div {@attach render}></div>
