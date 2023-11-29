import{y as M,ae as G,R as Z,_ as ee,m as V,F as R,v as H,af as ge,x as be,c as b,ag as $,r as E,I as ye,M as pe,k as w,ah as ke,ai as we,aj as qe,ak as Te,ab as xe,Y as te,j as Se,W,l as Ee,al as Pe}from"./index.84395746.js";import{h as N,i as _e,e as Be}from"./QLayout.324173c3.js";function Ce(e,t,n){let l;function a(){l!==void 0&&(G.remove(l),l=void 0)}return M(()=>{e.value===!0&&a()}),{removeFromHistory:a,addToHistory(){l={condition:()=>n.value===!0,handler:t},G.add(l)}}}function Fe(){let e=null;const t=V();function n(){e!==null&&(clearTimeout(e),e=null)}return Z(n),M(n),{removeTimeout:n,registerTimeout(l,a){n(),ee(t)===!1&&(e=setTimeout(l,a))}}}function $e(){let e;const t=V();function n(){e=void 0}return Z(n),M(n),{removeTick:n,registerTick(l){e=l,R(()=>{e===l&&(ee(t)===!1&&e(),e=void 0)})}}}const De={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},He=["beforeShow","show","beforeHide","hide"];function Me({showing:e,canShow:t,hideOnRouteChange:n,handleShow:l,handleHide:a,processOnMount:f}){const r=V(),{props:s,emit:u,proxy:m}=r;let d;function v(i){e.value===!0?k(i):g(i)}function g(i){if(s.disable===!0||i!==void 0&&i.qAnchorHandled===!0||t!==void 0&&t(i)!==!0)return;const h=s["onUpdate:modelValue"]!==void 0;h===!0&&(u("update:modelValue",!0),d=i,R(()=>{d===i&&(d=void 0)})),(s.modelValue===null||h===!1)&&T(i)}function T(i){e.value!==!0&&(e.value=!0,u("beforeShow",i),l!==void 0?l(i):u("show",i))}function k(i){if(s.disable===!0)return;const h=s["onUpdate:modelValue"]!==void 0;h===!0&&(u("update:modelValue",!1),d=i,R(()=>{d===i&&(d=void 0)})),(s.modelValue===null||h===!1)&&P(i)}function P(i){e.value!==!1&&(e.value=!1,u("beforeHide",i),a!==void 0?a(i):u("hide",i))}function x(i){s.disable===!0&&i===!0?s["onUpdate:modelValue"]!==void 0&&u("update:modelValue",!1):i===!0!==e.value&&(i===!0?T:P)(d)}H(()=>s.modelValue,x),n!==void 0&&ge(r)===!0&&H(()=>m.$route.fullPath,()=>{n.value===!0&&e.value===!0&&k()}),f===!0&&be(()=>{x(s.modelValue)});const _={show:g,hide:k,toggle:v};return Object.assign(m,_),_}const Ve={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function Oe(e,t=()=>{},n=()=>{}){return{transitionProps:b(()=>{const l=`q-transition--${e.transitionShow||t()}`,a=`q-transition--${e.transitionHide||n()}`;return{appear:!0,enterFromClass:`${l}-enter-from`,enterActiveClass:`${l}-enter-active`,enterToClass:`${l}-enter-to`,leaveFromClass:`${a}-leave-from`,leaveActiveClass:`${a}-leave-active`,leaveToClass:`${a}-leave-to`}}),transitionStyle:b(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}const D=[];function Ye(e){return D.find(t=>t.contentEl!==null&&t.contentEl.contains(e))}function ze(e,t){do{if(e.$options.name==="QMenu"){if(e.hide(t),e.$props.separateClosePopup===!0)return $(e)}else if(e.__qPortal===!0){const n=$(e);return n!==void 0&&n.$options.name==="QPopupProxy"?(e.hide(t),n):e}e=$(e)}while(e!=null)}function Je(e,t,n){for(;n!==0&&e!==void 0&&e!==null;){if(e.__qPortal===!0){if(n--,e.$options.name==="QMenu"){e=ze(e,t);continue}e.hide(t)}e=$(e)}}function Ae(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Le(e,t,n,l){const a=E(!1),f=E(!1);let r=null;const s={},u=l==="dialog"&&Ae(e);function m(v){if(v===!0){N(s),f.value=!0;return}f.value=!1,a.value===!1&&(u===!1&&r===null&&(r=we(!1,l)),a.value=!0,D.push(e.proxy),_e(s))}function d(v){if(f.value=!1,v!==!0)return;N(s),a.value=!1;const g=D.indexOf(e.proxy);g!==-1&&D.splice(g,1),r!==null&&(qe(r),r=null)}return ye(()=>{d(!0)}),e.proxy.__qPortal=!0,pe(e.proxy,"contentEl",()=>t.value),{showPortal:m,hidePortal:d,portalIsActive:a,portalIsAccessible:f,renderPortal:()=>u===!0?n():a.value===!0?[w(ke,{to:r},n())]:void 0}}function je(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,Te(t))}}}const y=[];let q;function Qe(e){q=e.keyCode===27}function Re(){q===!0&&(q=!1)}function Ie(e){q===!0&&(q=!1,xe(e,27)===!0&&y[y.length-1](e))}function ne(e){window[e]("keydown",Qe),window[e]("blur",Re),window[e]("keyup",Ie),q=!1}function Ke(e){te.is.desktop===!0&&(y.push(e),y.length===1&&ne("addEventListener"))}function Y(e){const t=y.indexOf(e);t>-1&&(y.splice(t,1),y.length===0&&ne("removeEventListener"))}const p=[];function oe(e){p[p.length-1](e)}function Ue(e){te.is.desktop===!0&&(p.push(e),p.length===1&&document.body.addEventListener("focusin",oe))}function J(e){const t=p.indexOf(e);t>-1&&(p.splice(t,1),p.length===0&&document.body.removeEventListener("focusin",oe))}let F=0;const Ge={standard:"fixed-full flex-center",top:"fixed-top justify-center",bottom:"fixed-bottom justify-center",right:"fixed-right items-center",left:"fixed-left items-center"},X={standard:["scale","scale"],top:["slide-down","slide-up"],bottom:["slide-up","slide-down"],right:["slide-left","slide-right"],left:["slide-right","slide-left"]};var Xe=Se({name:"QDialog",inheritAttrs:!1,props:{...De,...Ve,transitionShow:String,transitionHide:String,persistent:Boolean,autoClose:Boolean,allowFocusOutside:Boolean,noEscDismiss:Boolean,noBackdropDismiss:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,noShake:Boolean,seamless:Boolean,maximized:Boolean,fullWidth:Boolean,fullHeight:Boolean,square:Boolean,position:{type:String,default:"standard",validator:e=>e==="standard"||["top","bottom","left","right"].includes(e)}},emits:[...He,"shake","click","escapeKey"],setup(e,{slots:t,emit:n,attrs:l}){const a=V(),f=E(null),r=E(!1),s=E(!1);let u=null,m=null,d,v;const g=b(()=>e.persistent!==!0&&e.noRouteDismiss!==!0&&e.seamless!==!0),{preventBodyScroll:T}=je(),{registerTimeout:k}=Fe(),{registerTick:P,removeTick:x}=$e(),{transitionProps:_,transitionStyle:i}=Oe(e,()=>X[e.position][0],()=>X[e.position][1]),{showPortal:h,hidePortal:I,portalIsAccessible:ie,renderPortal:le}=Le(a,f,he,"dialog"),{hide:B}=Me({showing:r,hideOnRouteChange:g,handleShow:de,handleHide:fe,processOnMount:!0}),{addToHistory:ae,removeFromHistory:se}=Ce(r,B,g),ue=b(()=>`q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized===!0?"maximized":"minimized"} q-dialog__inner--${e.position} ${Ge[e.position]}`+(s.value===!0?" q-dialog__inner--animating":"")+(e.fullWidth===!0?" q-dialog__inner--fullwidth":"")+(e.fullHeight===!0?" q-dialog__inner--fullheight":"")+(e.square===!0?" q-dialog__inner--square":"")),C=b(()=>r.value===!0&&e.seamless!==!0),re=b(()=>e.autoClose===!0?{onClick:me}:{}),ce=b(()=>[`q-dialog fullscreen no-pointer-events q-dialog--${C.value===!0?"modal":"seamless"}`,l.class]);H(()=>e.maximized,o=>{r.value===!0&&A(o)}),H(C,o=>{T(o),o===!0?(Ue(L),Ke(z)):(J(L),Y(z))});function de(o){ae(),m=e.noRefocus===!1&&document.activeElement!==null?document.activeElement:null,A(e.maximized),h(),s.value=!0,e.noFocus!==!0?(document.activeElement!==null&&document.activeElement.blur(),P(S)):x(),k(()=>{if(a.proxy.$q.platform.is.ios===!0){if(e.seamless!==!0&&document.activeElement){const{top:c,bottom:j}=document.activeElement.getBoundingClientRect(),{innerHeight:U}=window,Q=window.visualViewport!==void 0?window.visualViewport.height:U;c>0&&j>Q/2&&(document.scrollingElement.scrollTop=Math.min(document.scrollingElement.scrollHeight-Q,j>=U?1/0:Math.ceil(document.scrollingElement.scrollTop+j-Q/2))),document.activeElement.scrollIntoView()}v=!0,f.value.click(),v=!1}h(!0),s.value=!1,n("show",o)},e.transitionDuration)}function fe(o){x(),se(),K(!0),s.value=!0,I(),m!==null&&(((o&&o.type.indexOf("key")===0?m.closest('[tabindex]:not([tabindex^="-"])'):void 0)||m).focus(),m=null),k(()=>{I(!0),s.value=!1,n("hide",o)},e.transitionDuration)}function S(o){Be(()=>{let c=f.value;c===null||c.contains(document.activeElement)===!0||(c=(o!==""?c.querySelector(o):null)||c.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||c.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||c.querySelector("[autofocus], [data-autofocus]")||c,c.focus({preventScroll:!0}))})}function O(o){o&&typeof o.focus=="function"?o.focus({preventScroll:!0}):S(),n("shake");const c=f.value;c!==null&&(c.classList.remove("q-animate--scale"),c.classList.add("q-animate--scale"),u!==null&&clearTimeout(u),u=setTimeout(()=>{u=null,f.value!==null&&(c.classList.remove("q-animate--scale"),S())},170))}function z(){e.seamless!==!0&&(e.persistent===!0||e.noEscDismiss===!0?e.maximized!==!0&&e.noShake!==!0&&O():(n("escapeKey"),B()))}function K(o){u!==null&&(clearTimeout(u),u=null),(o===!0||r.value===!0)&&(A(!1),e.seamless!==!0&&(T(!1),J(L),Y(z))),o!==!0&&(m=null)}function A(o){o===!0?d!==!0&&(F<1&&document.body.classList.add("q-body--dialog"),F++,d=!0):d===!0&&(F<2&&document.body.classList.remove("q-body--dialog"),F--,d=!1)}function me(o){v!==!0&&(B(o),n("click",o))}function ve(o){e.persistent!==!0&&e.noBackdropDismiss!==!0?B(o):e.noShake!==!0&&O()}function L(o){e.allowFocusOutside!==!0&&ie.value===!0&&Pe(f.value,o.target)!==!0&&S('[tabindex]:not([tabindex="-1"])')}Object.assign(a.proxy,{focus:S,shake:O,__updateRefocusTarget(o){m=o||null}}),M(K);function he(){return w("div",{role:"dialog","aria-modal":C.value===!0?"true":"false",...l,class:ce.value},[w(W,{name:"q-transition--fade",appear:!0},()=>C.value===!0?w("div",{class:"q-dialog__backdrop fixed-full",style:i.value,"aria-hidden":"true",tabindex:-1,onClick:ve}):null),w(W,_.value,()=>r.value===!0?w("div",{ref:f,class:ue.value,style:i.value,tabindex:-1,...re.value},Ee(t.default)):null)])}return le}});export{Xe as Q,Ve as a,He as b,Je as c,$e as d,Fe as e,Oe as f,Ye as g,Me as h,Le as i,Ue as j,Y as k,ze as l,Ke as m,D as p,J as r,De as u};
