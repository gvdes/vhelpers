import{au as S,r as C,ae as k,X as y,s as $,av as H,p as m,x as A,v as T,m as q,aw as R,L as x,$ as B,R as P}from"./index.7a652f76.js";import{p as W}from"./QDialog.10d0f8c0.js";function O(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),S.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const X={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function Y({showing:e,avoidEmit:l,configureAnchorEl:o}){const{props:t,proxy:n,emit:s}=q(),i=C(null);let d=null;function u(a){return i.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const r={};o===void 0&&(Object.assign(r,{hide(a){n.hide(a)},toggle(a){n.toggle(a),a.qAnchorHandled=!0},toggleKey(a){k(a,13)===!0&&r.toggle(a)},contextClick(a){n.hide(a),y(a),$(()=>{n.show(a),a.qAnchorHandled=!0})},prevent:y,mobileTouch(a){if(r.mobileCleanup(a),u(a)!==!0)return;n.hide(a),i.value.classList.add("non-selectable");const h=a.target;H(r,"anchor",[[h,"touchmove","mobileCleanup","passive"],[h,"touchend","mobileCleanup","passive"],[h,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),d=setTimeout(()=>{d=null,n.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){i.value.classList.remove("non-selectable"),d!==null&&(clearTimeout(d),d=null),e.value===!0&&a!==void 0&&O()}}),o=function(a=t.contextMenu){if(t.noParentEvent===!0||i.value===null)return;let h;a===!0?n.$q.platform.is.mobile===!0?h=[[i.value,"touchstart","mobileTouch","passive"]]:h=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:h=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],H(r,"anchor",h)});function c(){R(r,"anchor")}function z(a){for(i.value=a;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;o()}function w(){if(t.target===!1||t.target===""||n.$el.parentNode===null)i.value=null;else if(t.target===!0)z(n.$el.parentNode);else{let a=t.target;if(typeof t.target=="string")try{a=document.querySelector(t.target)}catch{a=void 0}a!=null?(i.value=a.$el||a,o()):(i.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return m(()=>t.contextMenu,a=>{i.value!==null&&(c(),o(a))}),m(()=>t.target,()=>{i.value!==null&&c(),w()}),m(()=>t.noParentEvent,a=>{i.value!==null&&(a===!0?c():o())}),A(()=>{w(),l!==!0&&t.modelValue===!0&&i.value===null&&s("update:modelValue",!1)}),T(()=>{d!==null&&clearTimeout(d),c()}),{anchorEl:i,canShow:u,anchorEvents:r}}function D(e,l){const o=C(null);let t;function n(d,u){const r=`${u!==void 0?"add":"remove"}EventListener`,c=u!==void 0?u:t;d!==window&&d[r]("scroll",c,x.passive),window[r]("scroll",c,x.passive),t=u}function s(){o.value!==null&&(n(o.value),o.value=null)}const i=m(()=>e.noParentEvent,()=>{o.value!==null&&(s(),l())});return T(i),{localScrollTarget:o,unconfigureScrollTarget:s,changeScrollEvent:n}}const{notPassiveCapture:v}=x,f=[];function p(e){const l=e.target;if(l===void 0||l.nodeType===8||l.classList.contains("no-pointer-events")===!0)return;let o=W.length-1;for(;o>=0;){const t=W[o].$;if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;o--}for(let t=f.length-1;t>=0;t--){const n=f[t];if((n.anchorEl.value===null||n.anchorEl.value.contains(l)===!1)&&(l===document.body||n.innerRef.value!==null&&n.innerRef.value.contains(l)===!1))e.qClickOutside=!0,n.onClickOutside(e);else return}}function F(e){f.push(e),f.length===1&&(document.addEventListener("mousedown",p,v),document.addEventListener("touchstart",p,v))}function Q(e){const l=f.findIndex(o=>o===e);l>-1&&(f.splice(l,1),f.length===0&&(document.removeEventListener("mousedown",p,v),document.removeEventListener("touchstart",p,v)))}let E,L;function U(e){const l=e.split(" ");return l.length!==2?!1:["top","center","bottom"].includes(l[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(l[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function G(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const b={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{b[`${e}#ltr`]=e,b[`${e}#rtl`]=e});function J(e,l){const o=e.split(" ");return{vertical:o[0],horizontal:b[`${o[1]}#${l===!0?"rtl":"ltr"}`]}}function V(e,l){let{top:o,left:t,right:n,bottom:s,width:i,height:d}=e.getBoundingClientRect();return l!==void 0&&(o-=l[1],t-=l[0],s+=l[1],n+=l[0],i+=l[0],d+=l[1]),{top:o,bottom:s,height:d,left:t,right:n,width:i,middle:t+(n-t)/2,center:o+(s-o)/2}}function j(e,l,o){let{top:t,left:n}=e.getBoundingClientRect();return t+=l.top,n+=l.left,o!==void 0&&(t+=o[1],n+=o[0]),{top:t,bottom:t+1,height:1,left:n,right:n+1,width:1,middle:n,center:t}}function I(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}}function M(e,l,o){return{top:e[o.anchorOrigin.vertical]-l[o.selfOrigin.vertical],left:e[o.anchorOrigin.horizontal]-l[o.selfOrigin.horizontal]}}function Z(e){if(B.is.ios===!0&&window.visualViewport!==void 0){const d=document.body.style,{offsetLeft:u,offsetTop:r}=window.visualViewport;u!==E&&(d.setProperty("--q-pe-left",u+"px"),E=u),r!==L&&(d.setProperty("--q-pe-top",r+"px"),L=r)}const{scrollLeft:l,scrollTop:o}=e.el,t=e.absoluteOffset===void 0?V(e.anchorEl,e.cover===!0?[0,0]:e.offset):j(e.anchorEl,e.absoluteOffset,e.offset);let n={maxHeight:e.maxHeight,maxWidth:e.maxWidth,visibility:"visible"};(e.fit===!0||e.cover===!0)&&(n.minWidth=t.width+"px",e.cover===!0&&(n.minHeight=t.height+"px")),Object.assign(e.el.style,n);const s=I(e.el);let i=M(t,s,e);if(e.absoluteOffset===void 0||e.offset===void 0)g(i,t,s,e.anchorOrigin,e.selfOrigin);else{const{top:d,left:u}=i;g(i,t,s,e.anchorOrigin,e.selfOrigin);let r=!1;if(i.top!==d){r=!0;const c=2*e.offset[1];t.center=t.top-=c,t.bottom-=c+2}if(i.left!==u){r=!0;const c=2*e.offset[0];t.middle=t.left-=c,t.right-=c+2}r===!0&&(i=M(t,s,e),g(i,t,s,e.anchorOrigin,e.selfOrigin))}n={top:i.top+"px",left:i.left+"px"},i.maxHeight!==void 0&&(n.maxHeight=i.maxHeight+"px",t.height>i.maxHeight&&(n.minHeight=n.maxHeight)),i.maxWidth!==void 0&&(n.maxWidth=i.maxWidth+"px",t.width>i.maxWidth&&(n.minWidth=n.maxWidth)),Object.assign(e.el.style,n),e.el.scrollTop!==o&&(e.el.scrollTop=o),e.el.scrollLeft!==l&&(e.el.scrollLeft=l)}function g(e,l,o,t,n){const s=o.bottom,i=o.right,d=P(),u=window.innerHeight-d,r=document.body.clientWidth;if(e.top<0||e.top+s>u)if(n.vertical==="center")e.top=l[t.vertical]>u/2?Math.max(0,u-s):0,e.maxHeight=Math.min(s,u);else if(l[t.vertical]>u/2){const c=Math.min(u,t.vertical==="center"?l.center:t.vertical===n.vertical?l.bottom:l.top);e.maxHeight=Math.min(s,c),e.top=Math.max(0,c-s)}else e.top=Math.max(0,t.vertical==="center"?l.center:t.vertical===n.vertical?l.top:l.bottom),e.maxHeight=Math.min(s,u-e.top);if(e.left<0||e.left+i>r)if(e.maxWidth=Math.min(i,r),n.horizontal==="middle")e.left=l[t.horizontal]>r/2?Math.max(0,r-i):0;else if(l[t.horizontal]>r/2){const c=Math.min(r,t.horizontal==="middle"?l.middle:t.horizontal===n.horizontal?l.right:l.left);e.maxWidth=Math.min(i,c),e.left=Math.max(0,c-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?l.middle:t.horizontal===n.horizontal?l.left:l.right),e.maxWidth=Math.min(i,r-e.left)}export{G as a,D as b,Y as c,F as d,O as e,J as p,Q as r,Z as s,X as u,U as v};
