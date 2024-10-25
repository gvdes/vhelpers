import{p as H,ak as he,x as be,m as M,s as K,al as F,r as E,T as ye,y as pe,k as w,am as ke,an as we,ao as qe,c as b,A as Z,v as V,C as ee,ae as Te,$ as te,ap as G,aq as xe,j as Se,_ as W,l as Ee,ag as Pe}from"./index.b3ed90d9.js";import{e as N,f as _e,b as Be}from"./use-quasar.ece0bdc1.js";const Ce={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},$e=["beforeShow","show","beforeHide","hide"];function Fe({showing:e,canShow:t,hideOnRouteChange:n,handleShow:l,handleHide:a,processOnMount:f}){const r=M(),{props:s,emit:u,proxy:m}=r;let d;function v(i){e.value===!0?k(i):h(i)}function h(i){if(s.disable===!0||i!==void 0&&i.qAnchorHandled===!0||t!==void 0&&t(i)!==!0)return;const g=s["onUpdate:modelValue"]!==void 0;g===!0&&(u("update:modelValue",!0),d=i,K(()=>{d===i&&(d=void 0)})),(s.modelValue===null||g===!1)&&T(i)}function T(i){e.value!==!0&&(e.value=!0,u("beforeShow",i),l!==void 0?l(i):u("show",i))}function k(i){if(s.disable===!0)return;const g=s["onUpdate:modelValue"]!==void 0;g===!0&&(u("update:modelValue",!1),d=i,K(()=>{d===i&&(d=void 0)})),(s.modelValue===null||g===!1)&&P(i)}function P(i){e.value!==!1&&(e.value=!1,u("beforeHide",i),a!==void 0?a(i):u("hide",i))}function x(i){s.disable===!0&&i===!0?s["onUpdate:modelValue"]!==void 0&&u("update:modelValue",!1):i===!0!==e.value&&(i===!0?T:P)(d)}H(()=>s.modelValue,x),n!==void 0&&he(r)===!0&&H(()=>m.$route.fullPath,()=>{n.value===!0&&e.value===!0&&k()}),f===!0&&be(()=>{x(s.modelValue)});const _={show:h,hide:k,toggle:v};return Object.assign(m,_),_}const D=[];function Je(e){return D.find(t=>t.contentEl!==null&&t.contentEl.contains(e))}function De(e,t){do{if(e.$options.name==="QMenu"){if(e.hide(t),e.$props.separateClosePopup===!0)return F(e)}else if(e.__qPortal===!0){const n=F(e);return n!==void 0&&n.$options.name==="QPopupProxy"?(e.hide(t),n):e}e=F(e)}while(e!=null)}function Xe(e,t,n){for(;n!==0&&e!==void 0&&e!==null;){if(e.__qPortal===!0){if(n--,e.$options.name==="QMenu"){e=De(e,t);continue}e.hide(t)}e=F(e)}}function He(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function Me(e,t,n,l){const a=E(!1),f=E(!1);let r=null;const s={},u=l==="dialog"&&He(e);function m(v){if(v===!0){N(s),f.value=!0;return}f.value=!1,a.value===!1&&(u===!1&&r===null&&(r=we(!1,l)),a.value=!0,D.push(e.proxy),_e(s))}function d(v){if(f.value=!1,v!==!0)return;N(s),a.value=!1;const h=D.indexOf(e.proxy);h!==-1&&D.splice(h,1),r!==null&&(qe(r),r=null)}return ye(()=>{d(!0)}),e.proxy.__qPortal=!0,pe(e.proxy,"contentEl",()=>t.value),{showPortal:m,hidePortal:d,portalIsActive:a,portalIsAccessible:f,renderPortal:()=>u===!0?n():a.value===!0?[w(ke,{to:r},n())]:void 0}}const Ve={transitionShow:{type:String,default:"fade"},transitionHide:{type:String,default:"fade"},transitionDuration:{type:[String,Number],default:300}};function Ae(e,t=()=>{},n=()=>{}){return{transitionProps:b(()=>{const l=`q-transition--${e.transitionShow||t()}`,a=`q-transition--${e.transitionHide||n()}`;return{appear:!0,enterFromClass:`${l}-enter-from`,enterActiveClass:`${l}-enter-active`,enterToClass:`${l}-enter-to`,leaveFromClass:`${a}-leave-from`,leaveActiveClass:`${a}-leave-active`,leaveToClass:`${a}-leave-to`}}),transitionStyle:b(()=>`--q-transition-duration: ${e.transitionDuration}ms`)}}function Oe(){let e;const t=M();function n(){e=void 0}return Z(n),V(n),{removeTick:n,registerTick(l){e=l,K(()=>{e===l&&(ee(t)===!1&&e(),e=void 0)})}}}function ze(){let e=null;const t=M();function n(){e!==null&&(clearTimeout(e),e=null)}return Z(n),V(n),{removeTimeout:n,registerTimeout(l,a){n(),ee(t)===!1&&(e=setTimeout(l,a))}}}const y=[];let q;function Le(e){q=e.keyCode===27}function Qe(){q===!0&&(q=!1)}function je(e){q===!0&&(q=!1,Te(e,27)===!0&&y[y.length-1](e))}function ne(e){window[e]("keydown",Le),window[e]("blur",Qe),window[e]("keyup",je),q=!1}function Ke(e){te.is.desktop===!0&&(y.push(e),y.length===1&&ne("addEventListener"))}function J(e){const t=y.indexOf(e);t>-1&&(y.splice(t,1),y.length===0&&ne("removeEventListener"))}const p=[];function oe(e){p[p.length-1](e)}function Re(e){te.is.desktop===!0&&(p.push(e),p.length===1&&document.body.addEventListener("focusin",oe))}function X(e){const t=p.indexOf(e);t>-1&&(p.splice(t,1),p.length===0&&document.body.removeEventListener("focusin",oe))}function Ie(e,t,n){let l;function a(){l!==void 0&&(G.remove(l),l=void 0)}return V(()=>{e.value===!0&&a()}),{removeFromHistory:a,addToHistory(){l={condition:()=>n.value===!0,handler:t},G.add(l)}}}function Ue(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,xe(t))}}}let $=0;const Ge={standard:"fixed-full flex-center",top:"fixed-top justify-center",bottom:"fixed-bottom justify-center",right:"fixed-right items-center",left:"fixed-left items-center"},Y={standard:["scale","scale"],top:["slide-down","slide-up"],bottom:["slide-up","slide-down"],right:["slide-left","slide-right"],left:["slide-right","slide-left"]};var Ye=Se({name:"QDialog",inheritAttrs:!1,props:{...Ce,...Ve,transitionShow:String,transitionHide:String,persistent:Boolean,autoClose:Boolean,allowFocusOutside:Boolean,noEscDismiss:Boolean,noBackdropDismiss:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,noShake:Boolean,seamless:Boolean,maximized:Boolean,fullWidth:Boolean,fullHeight:Boolean,square:Boolean,position:{type:String,default:"standard",validator:e=>e==="standard"||["top","bottom","left","right"].includes(e)}},emits:[...$e,"shake","click","escapeKey"],setup(e,{slots:t,emit:n,attrs:l}){const a=M(),f=E(null),r=E(!1),s=E(!1);let u=null,m=null,d,v;const h=b(()=>e.persistent!==!0&&e.noRouteDismiss!==!0&&e.seamless!==!0),{preventBodyScroll:T}=Ue(),{registerTimeout:k}=ze(),{registerTick:P,removeTick:x}=Oe(),{transitionProps:_,transitionStyle:i}=Ae(e,()=>Y[e.position][0],()=>Y[e.position][1]),{showPortal:g,hidePortal:R,portalIsAccessible:ie,renderPortal:le}=Me(a,f,ge,"dialog"),{hide:B}=Fe({showing:r,hideOnRouteChange:h,handleShow:de,handleHide:fe,processOnMount:!0}),{addToHistory:ae,removeFromHistory:se}=Ie(r,B,h),ue=b(()=>`q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized===!0?"maximized":"minimized"} q-dialog__inner--${e.position} ${Ge[e.position]}`+(s.value===!0?" q-dialog__inner--animating":"")+(e.fullWidth===!0?" q-dialog__inner--fullwidth":"")+(e.fullHeight===!0?" q-dialog__inner--fullheight":"")+(e.square===!0?" q-dialog__inner--square":"")),C=b(()=>r.value===!0&&e.seamless!==!0),re=b(()=>e.autoClose===!0?{onClick:me}:{}),ce=b(()=>[`q-dialog fullscreen no-pointer-events q-dialog--${C.value===!0?"modal":"seamless"}`,l.class]);H(()=>e.maximized,o=>{r.value===!0&&z(o)}),H(C,o=>{T(o),o===!0?(Re(L),Ke(O)):(X(L),J(O))});function de(o){ae(),m=e.noRefocus===!1&&document.activeElement!==null?document.activeElement:null,z(e.maximized),g(),s.value=!0,e.noFocus!==!0?(document.activeElement!==null&&document.activeElement.blur(),P(S)):x(),k(()=>{if(a.proxy.$q.platform.is.ios===!0){if(e.seamless!==!0&&document.activeElement){const{top:c,bottom:Q}=document.activeElement.getBoundingClientRect(),{innerHeight:U}=window,j=window.visualViewport!==void 0?window.visualViewport.height:U;c>0&&Q>j/2&&(document.scrollingElement.scrollTop=Math.min(document.scrollingElement.scrollHeight-j,Q>=U?1/0:Math.ceil(document.scrollingElement.scrollTop+Q-j/2))),document.activeElement.scrollIntoView()}v=!0,f.value.click(),v=!1}g(!0),s.value=!1,n("show",o)},e.transitionDuration)}function fe(o){x(),se(),I(!0),s.value=!0,R(),m!==null&&(((o&&o.type.indexOf("key")===0?m.closest('[tabindex]:not([tabindex^="-"])'):void 0)||m).focus(),m=null),k(()=>{R(!0),s.value=!1,n("hide",o)},e.transitionDuration)}function S(o){Be(()=>{let c=f.value;c===null||c.contains(document.activeElement)===!0||(c=(o!==""?c.querySelector(o):null)||c.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||c.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||c.querySelector("[autofocus], [data-autofocus]")||c,c.focus({preventScroll:!0}))})}function A(o){o&&typeof o.focus=="function"?o.focus({preventScroll:!0}):S(),n("shake");const c=f.value;c!==null&&(c.classList.remove("q-animate--scale"),c.classList.add("q-animate--scale"),u!==null&&clearTimeout(u),u=setTimeout(()=>{u=null,f.value!==null&&(c.classList.remove("q-animate--scale"),S())},170))}function O(){e.seamless!==!0&&(e.persistent===!0||e.noEscDismiss===!0?e.maximized!==!0&&e.noShake!==!0&&A():(n("escapeKey"),B()))}function I(o){u!==null&&(clearTimeout(u),u=null),(o===!0||r.value===!0)&&(z(!1),e.seamless!==!0&&(T(!1),X(L),J(O))),o!==!0&&(m=null)}function z(o){o===!0?d!==!0&&($<1&&document.body.classList.add("q-body--dialog"),$++,d=!0):d===!0&&($<2&&document.body.classList.remove("q-body--dialog"),$--,d=!1)}function me(o){v!==!0&&(B(o),n("click",o))}function ve(o){e.persistent!==!0&&e.noBackdropDismiss!==!0?B(o):e.noShake!==!0&&A()}function L(o){e.allowFocusOutside!==!0&&ie.value===!0&&Pe(f.value,o.target)!==!0&&S('[tabindex]:not([tabindex="-1"])')}Object.assign(a.proxy,{focus:S,shake:A,__updateRefocusTarget(o){m=o||null}}),V(I);function ge(){return w("div",{role:"dialog","aria-modal":C.value===!0?"true":"false",...l,class:ce.value},[w(W,{name:"q-transition--fade",appear:!0},()=>C.value===!0?w("div",{class:"q-dialog__backdrop fixed-full",style:i.value,"aria-hidden":"true",tabindex:-1,onClick:ve}):null),w(W,_.value,()=>r.value===!0?w("div",{ref:f,class:ue.value,style:i.value,tabindex:-1,...re.value},Ee(t.default)):null)])}return le}});export{Ye as Q,Ve as a,$e as b,Oe as c,ze as d,Ae as e,Fe as f,Me as g,Re as h,J as i,De as j,Ke as k,Je as l,Xe as m,Ie as n,Ue as o,D as p,X as r,Ce as u};