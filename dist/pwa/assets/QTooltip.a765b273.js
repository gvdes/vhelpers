import{j as ee,r as O,c as f,p as k,v as C,aw as E,av as x,K as te,k as H,_ as oe,m as ae,l as ne,D as ie}from"./index.b119c6a8.js";import{u as le,v as A,a as se,b as re,c as ue,r as D,s as ce,e as j,p as q,d as de}from"./position-engine.09c30a1c.js";import{u as fe,a as ve,b as he,c as me,d as ge,e as ye,f as Te,g as pe}from"./QDialog.d51e1757.js";var we=ee({name:"QTooltip",inheritAttrs:!1,props:{...le,...fe,...ve,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:A},self:{type:String,default:"top middle",validator:A},offset:{type:Array,default:()=>[14,14],validator:se},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...he],setup(e,{slots:M,emit:y,attrs:v}){let i,l;const h=ae(),{proxy:{$q:a}}=h,s=O(null),c=O(!1),L=f(()=>q(e.anchor,a.lang.rtl)),Q=f(()=>q(e.self,a.lang.rtl)),W=f(()=>e.persistent!==!0),{registerTick:_,removeTick:N}=me(),{registerTimeout:d}=ge(),{transitionProps:R,transitionStyle:B}=ye(e),{localScrollTarget:T,changeScrollEvent:I,unconfigureScrollTarget:K}=re(e,P),{anchorEl:o,canShow:U,anchorEvents:r}=ue({showing:c,configureAnchorEl:X}),{show:V,hide:m}=Te({showing:c,canShow:U,handleShow:z,handleHide:F,hideOnRouteChange:W,processOnMount:!0});Object.assign(r,{delayShow:G,delayHide:J});const{showPortal:p,hidePortal:b,renderPortal:$}=pe(h,s,Z,"tooltip");if(a.platform.is.mobile===!0){const t={anchorEl:o,innerRef:s,onClickOutside(n){return m(n),n.target.classList.contains("q-dialog__backdrop")&&ie(n),!0}},g=f(()=>e.modelValue===null&&e.persistent!==!0&&c.value===!0);k(g,n=>{(n===!0?de:D)(t)}),C(()=>{D(t)})}function z(t){p(),_(()=>{l=new MutationObserver(()=>u()),l.observe(s.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),u(),P()}),i===void 0&&(i=k(()=>a.screen.width+"|"+a.screen.height+"|"+e.self+"|"+e.anchor+"|"+a.lang.rtl,u)),d(()=>{p(!0),y("show",t)},e.transitionDuration)}function F(t){N(),b(),S(),d(()=>{b(!0),y("hide",t)},e.transitionDuration)}function S(){l!==void 0&&(l.disconnect(),l=void 0),i!==void 0&&(i(),i=void 0),K(),E(r,"tooltipTemp")}function u(){const t=s.value;o.value===null||!t||ce({el:t,offset:e.offset,anchorEl:o.value,anchorOrigin:L.value,selfOrigin:Q.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function G(t){if(a.platform.is.mobile===!0){j(),document.body.classList.add("non-selectable");const g=o.value,n=["touchmove","touchcancel","touchend","click"].map(w=>[g,w,"delayHide","passiveCapture"]);x(r,"tooltipTemp",n)}d(()=>{V(t)},e.delay)}function J(t){a.platform.is.mobile===!0&&(E(r,"tooltipTemp"),j(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),d(()=>{m(t)},e.hideDelay)}function X(){if(e.noParentEvent===!0||o.value===null)return;const t=a.platform.is.mobile===!0?[[o.value,"touchstart","delayShow","passive"]]:[[o.value,"mouseenter","delayShow","passive"],[o.value,"mouseleave","delayHide","passive"]];x(r,"anchor",t)}function P(){if(o.value!==null||e.scrollTarget!==void 0){T.value=te(o.value,e.scrollTarget);const t=e.noParentEvent===!0?u:m;I(T.value,t)}}function Y(){return c.value===!0?H("div",{...v,ref:s,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",v.class],style:[v.style,B.value],role:"tooltip"},ne(M.default)):null}function Z(){return H(oe,R.value,Y)}return C(S),Object.assign(h.proxy,{updatePosition:u}),$}});export{we as Q};