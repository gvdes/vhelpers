import{r as g,N as z,t as d,j as y,q as f,I as w,p as v,k as R,m as O,K as b}from"./index.a398b87a.js";function x(){const r=g(!z.value);return r.value===!1&&d(()=>{r.value=!0}),r}const h=typeof ResizeObserver!="undefined",m=h===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var L=y({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(r,{emit:p}){let i=null,t,o={width:-1,height:-1};function s(e){e===!0||r.debounce===0||r.debounce==="0"?u():i===null&&(i=setTimeout(u,r.debounce))}function u(){if(i!==null&&(clearTimeout(i),i=null),t){const{offsetWidth:e,offsetHeight:n}=t;(e!==o.width||n!==o.height)&&(o={width:e,height:n},p("resize",o))}}const{proxy:a}=O();if(h===!0){let e;const n=l=>{t=a.$el.parentNode,t?(e=new ResizeObserver(s),e.observe(t),u()):l!==!0&&v(()=>{n(!0)})};return d(()=>{n()}),f(()=>{i!==null&&clearTimeout(i),e!==void 0&&(e.disconnect!==void 0?e.disconnect():t&&e.unobserve(t))}),w}else{let l=function(){i!==null&&(clearTimeout(i),i=null),n!==void 0&&(n.removeEventListener!==void 0&&n.removeEventListener("resize",s,b.passive),n=void 0)},c=function(){l(),t&&t.contentDocument&&(n=t.contentDocument.defaultView,n.addEventListener("resize",s,b.passive),u())};const e=x();let n;return d(()=>{v(()=>{t=a.$el,t&&c()})}),f(l),a.trigger=s,()=>{if(e.value===!0)return R("object",{style:m.style,tabindex:-1,type:"text/html",data:m.url,"aria-hidden":"true",onLoad:c})}}}});export{L as Q};