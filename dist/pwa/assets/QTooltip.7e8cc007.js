import{j as ee,r as O,c as f,n as k,q as C,ap as E,ao as x,J as te,k as H,_ as oe,m as ae,l as ne,B as ie}from"./index.cacc0fa4.js";import{u as le,a as se,b as re,v as j,c as ue,d as ce,e as de,f as fe,g as ve,h as he,i as me,j as ge,k as ye,m as q,s as Te,y as A,p as D,t as pe}from"./QDialog.987612f6.js";var Pe=ee({name:"QTooltip",inheritAttrs:!1,props:{...le,...se,...re,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:j},self:{type:String,default:"top middle",validator:j},offset:{type:Array,default:()=>[14,14],validator:ue},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...ce],setup(e,{slots:M,emit:y,attrs:v}){let i,l;const h=ae(),{proxy:{$q:a}}=h,s=O(null),c=O(!1),L=f(()=>D(e.anchor,a.lang.rtl)),Q=f(()=>D(e.self,a.lang.rtl)),W=f(()=>e.persistent!==!0),{registerTick:_,removeTick:B}=de(),{registerTimeout:d}=fe(),{transitionProps:N,transitionStyle:R}=ve(e),{localScrollTarget:T,changeScrollEvent:I,unconfigureScrollTarget:J}=he(e,P),{anchorEl:o,canShow:U,anchorEvents:r}=me({showing:c,configureAnchorEl:X}),{show:V,hide:m}=ge({showing:c,canShow:U,handleShow:z,handleHide:F,hideOnRouteChange:W,processOnMount:!0});Object.assign(r,{delayShow:G,delayHide:K});const{showPortal:p,hidePortal:b,renderPortal:$}=ye(h,s,Z,"tooltip");if(a.platform.is.mobile===!0){const t={anchorEl:o,innerRef:s,onClickOutside(n){return m(n),n.target.classList.contains("q-dialog__backdrop")&&ie(n),!0}},g=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);k(g,n=>{(n===!0?pe:q)(t)}),C(()=>{q(t)})}function z(t){p(),_(()=>{l=new MutationObserver(()=>u()),l.observe(s.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),P()}),i===void 0&&(i=k(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,u)),d(()=>{p(!0),y("show",t)},e.transitionDuration)}function F(t){B(),b(),S(),d(()=>{b(!0),y("hide",t)},e.transitionDuration)}function S(){l!==void 0&&(l.disconnect(),l=void 0),i!==void 0&&(i(),i=void 0),J(),E(r,"tooltipTemp")}function u(){const t=s.value;o.value===null||!t||Te({el:t,offset:e.offset,anchorEl:o.value,anchorOrigin:L.value,selfOrigin:Q.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function G(t){if(a.platform.is.mobile===!0){A(),document.body.classList.add("non-selectable");const g=o.value,n=["touchmove","touchcancel","touchend","click"].map(w=>[g,w,"delayHide","passiveCapture"]);x(r,"tooltipTemp",n)}d(()=>{V(t)},e.delay)}function K(t){a.platform.is.mobile===!0&&(E(r,"tooltipTemp"),A(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{m(t)},e.hideDelay)}function X(){if(e.noParentEvent===!0||o.value===null)return;const t=a.platform.is.mobile===!0?[[o.value,"touchstart","delayShow","passive"]]:[[o.value,"mouseenter","delayShow","passive"],[o.value,"mouseleave","delayHide","passive"]];x(r,"anchor",t)}function P(){if(o.value!==null||e.scrollTarget!==void 0){T.value=te(o.value,e.scrollTarget);const t=e.noParentEvent===!0?u:m;I(T.value,t)}}function Y(){return c.value===!0?H("div",{...v,ref:s,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",v.class],style:[v.style,R.value],role:"tooltip"},ne(M.default)):null}function Z(){return H(oe,N.value,Y)}return C(S),Object.assign(h.proxy,{updatePosition:u}),$}});export{Pe as Q};
