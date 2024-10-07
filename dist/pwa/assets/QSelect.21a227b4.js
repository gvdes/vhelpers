import{u as Qe,b as wt,e as Ct,d as kt,a as Kt,c as $t,f as dt,g as jt}from"./use-key-composition.4cfe21f0.js";import{j as Se,a8 as Nt,a9 as Qt,c as d,aa as Wt,k as b,Y as Pe,ab as Ut,a6 as Xt,m as ze,B as le,ac as Yt,ad as Gt,r as T,ae as qt,a7 as Jt,l as We,n as ce,af as Zt,J as el,_ as tl,q as Ue,ag as ll,I as ul,V as nl,ah as al,y as ol,z as il,p as se,W as rl,ai as sl,X as $e,aj as _e,x as Ve,s as cl,T as dl}from"./index.60accdeb.js";import{u as Xe,c as Ye,b as fl}from"./QCard.451e90b4.js";import{u as vl,v as ft,a as ml,b as Sl,c as gl,r as vt,s as hl,p as mt,d as yl}from"./position-engine.77b1ebb9.js";import{u as bl,a as wl,b as Cl,c as kl,d as ql,e as Vl,f as xl,g as Al,h as Bl,r as _l,i as St,j as Ol,k as zl,Q as Fl}from"./QDialog.b2c3aa5a.js";import{r as Ne}from"./rtl.b51694b1.js";var Il=Se({name:"QField",inheritAttrs:!1,props:Qe,emits:wt,setup(){return Ct(kt())}});const Ml={xs:8,sm:10,md:14,lg:20,xl:24};var El=Se({name:"QChip",props:{...Xe,...Nt,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:a,emit:n}){const{proxy:{$q:v}}=ze(),q=Ye(e,v),r=Qt(e,Ml),_=d(()=>e.selected===!0||e.icon!==void 0),w=d(()=>e.selected===!0?e.iconSelected||v.iconSet.chip.selected:e.icon),C=d(()=>e.iconRemove||v.iconSet.chip.remove),O=d(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),c=d(()=>{const k=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(k?` text-${k} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(O.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(q.value===!0?" q-chip--dark q-dark":"")}),m=d(()=>{const k=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},K={...k,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||v.lang.label.remove};return{chip:k,remove:K}});function x(k){k.keyCode===13&&g(k)}function g(k){e.disable||(n("update:selected",!e.selected),n("click",k))}function L(k){(k.keyCode===void 0||k.keyCode===13)&&(le(k),e.disable===!1&&(n("update:modelValue",!1),n("remove")))}function M(){const k=[];O.value===!0&&k.push(b("div",{class:"q-focus-helper"})),_.value===!0&&k.push(b(Pe,{class:"q-chip__icon q-chip__icon--left",name:w.value}));const K=e.label!==void 0?[b("div",{class:"ellipsis"},[e.label])]:void 0;return k.push(b("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Ut(a.default,K))),e.iconRight&&k.push(b(Pe,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&k.push(b(Pe,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:C.value,...m.value.remove,onClick:L,onKeyup:L})),k}return()=>{if(e.modelValue===!1)return;const k={class:c.value,style:r.value};return O.value===!0&&Object.assign(k,m.value.chip,{onClick:g,onKeyup:x}),Wt("div",k,M(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Xt,e.ripple]])}}}),Tl=Se({name:"QItem",props:{...Xe,...Yt,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:a,emit:n}){const{proxy:{$q:v}}=ze(),q=Ye(e,v),{hasLink:r,linkAttrs:_,linkClass:w,linkTag:C,navigateOnClick:O}=Gt(),c=T(null),m=T(null),x=d(()=>e.clickable===!0||r.value===!0||e.tag==="label"),g=d(()=>e.disable!==!0&&x.value===!0),L=d(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(q.value===!0?" q-item--dark":"")+(r.value===!0&&e.active===null?w.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(g.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),M=d(()=>{if(e.insetLevel===void 0)return null;const A=v.lang.rtl===!0?"Right":"Left";return{["padding"+A]:16+e.insetLevel*56+"px"}});function k(A){g.value===!0&&(m.value!==null&&(A.qKeyEvent!==!0&&document.activeElement===c.value?m.value.focus():document.activeElement===m.value&&c.value.focus()),O(A))}function K(A){if(g.value===!0&&qt(A,13)===!0){le(A),A.qKeyEvent=!0;const I=new MouseEvent("click",A);I.qKeyEvent=!0,c.value.dispatchEvent(I)}n("keyup",A)}function H(){const A=Jt(a.default,[]);return g.value===!0&&A.unshift(b("div",{class:"q-focus-helper",tabindex:-1,ref:m})),A}return()=>{const A={ref:c,class:L.value,style:M.value,role:"listitem",onClick:k,onKeyup:K};return g.value===!0?(A.tabindex=e.tabindex||"0",Object.assign(A,_.value)):x.value===!0&&(A["aria-disabled"]="true"),b(C.value,A,H())}}}),Pl=Se({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:a}){const n=d(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>b("div",{class:n.value},We(a.default))}}),Rl=Se({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:a}){const n=d(()=>parseInt(e.lines,10)),v=d(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(n.value===1?" ellipsis":"")),q=d(()=>e.lines!==void 0&&n.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":n.value}:null);return()=>b("div",{style:q.value,class:v.value},We(a.default))}}),Ll=Se({name:"QMenu",inheritAttrs:!1,props:{...vl,...bl,...Xe,...wl,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ft},self:{type:String,validator:ft},offset:{type:Array,validator:ml},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Cl,"click","escapeKey"],setup(e,{slots:a,emit:n,attrs:v}){let q=null,r,_,w;const C=ze(),{proxy:O}=C,{$q:c}=O,m=T(null),x=T(!1),g=d(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),L=Ye(e,c),{registerTick:M,removeTick:k}=kl(),{registerTimeout:K}=ql(),{transitionProps:H,transitionStyle:A}=Vl(e),{localScrollTarget:I,changeScrollEvent:E,unconfigureScrollTarget:U}=Sl(e,y),{anchorEl:W,canShow:ue}=gl({showing:x}),{hide:ne}=xl({showing:x,canShow:ue,handleShow:s,handleHide:o,hideOnRouteChange:g,processOnMount:!0}),{showPortal:Y,hidePortal:N,renderPortal:ae}=Al(C,m,p,"menu"),ee={anchorEl:W,innerRef:m,onClickOutside(l){if(e.persistent!==!0&&x.value===!0)return ne(l),(l.type==="touchstart"||l.target.classList.contains("q-dialog__backdrop"))&&le(l),!0}},oe=d(()=>mt(e.anchor||(e.cover===!0?"center middle":"bottom start"),c.lang.rtl)),te=d(()=>e.cover===!0?oe.value:mt(e.self||"top start",c.lang.rtl)),G=d(()=>(e.square===!0?" q-menu--square":"")+(L.value===!0?" q-menu--dark q-dark":"")),ge=d(()=>e.autoClose===!0?{onClick:z}:{}),ie=d(()=>x.value===!0&&e.persistent!==!0);ce(ie,l=>{l===!0?(zl(V),yl(ee)):(St(V),vt(ee))});function J(){fl(()=>{let l=m.value;l&&l.contains(document.activeElement)!==!0&&(l=l.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||l.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||l.querySelector("[autofocus], [data-autofocus]")||l,l.focus({preventScroll:!0}))})}function s(l){if(q=e.noRefocus===!1?document.activeElement:null,Bl(R),Y(),y(),r=void 0,l!==void 0&&(e.touchPosition||e.contextMenu)){const D=Zt(l);if(D.left!==void 0){const{top:re,left:de}=W.value.getBoundingClientRect();r={left:D.left-de,top:D.top-re}}}_===void 0&&(_=ce(()=>c.screen.width+"|"+c.screen.height+"|"+e.self+"|"+e.anchor+"|"+c.lang.rtl,S)),e.noFocus!==!0&&document.activeElement.blur(),M(()=>{S(),e.noFocus!==!0&&J()}),K(()=>{c.platform.is.ios===!0&&(w=e.autoClose,m.value.click()),S(),Y(!0),n("show",l)},e.transitionDuration)}function o(l){k(),N(),f(!0),q!==null&&(l===void 0||l.qClickOutside!==!0)&&(((l&&l.type.indexOf("key")===0?q.closest('[tabindex]:not([tabindex^="-"])'):void 0)||q).focus(),q=null),K(()=>{N(!0),n("hide",l)},e.transitionDuration)}function f(l){r=void 0,_!==void 0&&(_(),_=void 0),(l===!0||x.value===!0)&&(_l(R),U(),vt(ee),St(V)),l!==!0&&(q=null)}function y(){(W.value!==null||e.scrollTarget!==void 0)&&(I.value=el(W.value,e.scrollTarget),E(I.value,S))}function z(l){w!==!0?(Ol(O,l),n("click",l)):w=!1}function R(l){ie.value===!0&&e.noFocus!==!0&&ll(m.value,l.target)!==!0&&J()}function V(l){n("escapeKey"),ne(l)}function S(){const l=m.value;l===null||W.value===null||hl({el:l,offset:e.offset,anchorEl:W.value,anchorOrigin:oe.value,selfOrigin:te.value,absoluteOffset:r,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function p(){return b(tl,H.value,()=>x.value===!0?b("div",{role:"menu",...v,ref:m,tabindex:-1,class:["q-menu q-position-engine scroll"+G.value,v.class],style:[v.style,A.value],...ge.value},We(a.default)):null)}return Ue(f),Object.assign(O,{focus:J,updatePosition:S}),ae}});const X=1e3,Hl=["start","center","end","start-force","center-force","end-force"],Vt=Array.prototype.filter,pl=window.getComputedStyle(document.body).overflowAnchor===void 0?ul:function(e,a){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const n=e.children||[];Vt.call(n,q=>q.dataset&&q.dataset.qVsAnchor!==void 0).forEach(q=>{delete q.dataset.qVsAnchor});const v=n[a];v&&v.dataset&&(v.dataset.qVsAnchor="")}))};function xe(e,a){return e+a}function je(e,a,n,v,q,r,_,w){const C=e===window?document.scrollingElement||document.documentElement:e,O=q===!0?"offsetWidth":"offsetHeight",c={scrollStart:0,scrollViewSize:-_-w,scrollMaxSize:0,offsetStart:-_,offsetEnd:-w};if(q===!0?(e===window?(c.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,c.scrollViewSize+=document.documentElement.clientWidth):(c.scrollStart=C.scrollLeft,c.scrollViewSize+=C.clientWidth),c.scrollMaxSize=C.scrollWidth,r===!0&&(c.scrollStart=(Ne===!0?c.scrollMaxSize-c.scrollViewSize:0)-c.scrollStart)):(e===window?(c.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,c.scrollViewSize+=document.documentElement.clientHeight):(c.scrollStart=C.scrollTop,c.scrollViewSize+=C.clientHeight),c.scrollMaxSize=C.scrollHeight),n!==null)for(let m=n.previousElementSibling;m!==null;m=m.previousElementSibling)m.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetStart+=m[O]);if(v!==null)for(let m=v.nextElementSibling;m!==null;m=m.nextElementSibling)m.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetEnd+=m[O]);if(a!==e){const m=C.getBoundingClientRect(),x=a.getBoundingClientRect();q===!0?(c.offsetStart+=x.left-m.left,c.offsetEnd-=x.width):(c.offsetStart+=x.top-m.top,c.offsetEnd-=x.height),e!==window&&(c.offsetStart+=c.scrollStart),c.offsetEnd+=c.scrollMaxSize-c.offsetStart}return c}function gt(e,a,n,v){a==="end"&&(a=(e===window?document.body:e)[n===!0?"scrollWidth":"scrollHeight"]),e===window?n===!0?(v===!0&&(a=(Ne===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-a),window.scrollTo(a,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,a):n===!0?(v===!0&&(a=(Ne===!0?e.scrollWidth-e.offsetWidth:0)-a),e.scrollLeft=a):e.scrollTop=a}function Oe(e,a,n,v){if(n>=v)return 0;const q=a.length,r=Math.floor(n/X),_=Math.floor((v-1)/X)+1;let w=e.slice(r,_).reduce(xe,0);return n%X!==0&&(w-=a.slice(r*X,n).reduce(xe,0)),v%X!==0&&v!==q&&(w-=a.slice(v,_*X).reduce(xe,0)),w}const xt={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},Gl=Object.keys(xt),Dl={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...xt};function Kl({virtualScrollLength:e,getVirtualScrollTarget:a,getVirtualScrollEl:n,virtualScrollItemSizeComputed:v}){const q=ze(),{props:r,emit:_,proxy:w}=q,{$q:C}=w;let O,c,m,x=[],g;const L=T(0),M=T(0),k=T({}),K=T(null),H=T(null),A=T(null),I=T({from:0,to:0}),E=d(()=>r.tableColspan!==void 0?r.tableColspan:100);v===void 0&&(v=d(()=>r.virtualScrollItemSize));const U=d(()=>v.value+";"+r.virtualScrollHorizontal),W=d(()=>U.value+";"+r.virtualScrollSliceRatioBefore+";"+r.virtualScrollSliceRatioAfter);ce(W,()=>{G()}),ce(U,ue);function ue(){te(c,!0)}function ne(o){te(o===void 0?c:o)}function Y(o,f){const y=a();if(y==null||y.nodeType===8)return;const z=je(y,n(),K.value,H.value,r.virtualScrollHorizontal,C.lang.rtl,r.virtualScrollStickySizeStart,r.virtualScrollStickySizeEnd);m!==z.scrollViewSize&&G(z.scrollViewSize),ae(y,z,Math.min(e.value-1,Math.max(0,parseInt(o,10)||0)),0,Hl.indexOf(f)>-1?f:c>-1&&o>c?"end":"start")}function N(){const o=a();if(o==null||o.nodeType===8)return;const f=je(o,n(),K.value,H.value,r.virtualScrollHorizontal,C.lang.rtl,r.virtualScrollStickySizeStart,r.virtualScrollStickySizeEnd),y=e.value-1,z=f.scrollMaxSize-f.offsetStart-f.offsetEnd-M.value;if(O===f.scrollStart)return;if(f.scrollMaxSize<=0){ae(o,f,0,0);return}m!==f.scrollViewSize&&G(f.scrollViewSize),ee(I.value.from);const R=Math.floor(f.scrollMaxSize-Math.max(f.scrollViewSize,f.offsetEnd)-Math.min(g[y],f.scrollViewSize/2));if(R>0&&Math.ceil(f.scrollStart)>=R){ae(o,f,y,f.scrollMaxSize-f.offsetEnd-x.reduce(xe,0));return}let V=0,S=f.scrollStart-f.offsetStart,p=S;if(S<=z&&S+f.scrollViewSize>=L.value)S-=L.value,V=I.value.from,p=S;else for(let l=0;S>=x[l]&&V<y;l++)S-=x[l],V+=X;for(;S>0&&V<y;)S-=g[V],S>-f.scrollViewSize?(V++,p=S):p=g[V]+S;ae(o,f,V,p)}function ae(o,f,y,z,R){const V=typeof R=="string"&&R.indexOf("-force")>-1,S=V===!0?R.replace("-force",""):R,p=S!==void 0?S:"start";let l=Math.max(0,y-k.value[p]),D=l+k.value.total;D>e.value&&(D=e.value,l=Math.max(0,D-k.value.total)),O=f.scrollStart;const re=l!==I.value.from||D!==I.value.to;if(re===!1&&S===void 0){ie(y);return}const{activeElement:de}=document,Z=A.value;re===!0&&Z!==null&&Z!==de&&Z.contains(de)===!0&&(Z.addEventListener("focusout",oe),setTimeout(()=>{Z!==null&&Z.removeEventListener("focusout",oe)})),pl(Z,y-l);const Fe=S!==void 0?g.slice(l,y).reduce(xe,0):0;if(re===!0){const fe=D>=I.value.from&&l<=I.value.to?I.value.to:D;I.value={from:l,to:fe},L.value=Oe(x,g,0,l),M.value=Oe(x,g,D,e.value),requestAnimationFrame(()=>{I.value.to!==D&&O===f.scrollStart&&(I.value={from:I.value.from,to:D},M.value=Oe(x,g,D,e.value))})}requestAnimationFrame(()=>{if(O!==f.scrollStart)return;re===!0&&ee(l);const fe=g.slice(l,y).reduce(xe,0),he=fe+f.offsetStart+L.value,Ie=he+g[y];let Ae=he+z;if(S!==void 0){const Re=fe-Fe,j=f.scrollStart+Re;Ae=V!==!0&&j<he&&Ie<j+f.scrollViewSize?j:S==="end"?Ie-f.scrollViewSize:he-(S==="start"?0:Math.round((f.scrollViewSize-g[y])/2))}O=Ae,gt(o,Ae,r.virtualScrollHorizontal,C.lang.rtl),ie(y)})}function ee(o){const f=A.value;if(f){const y=Vt.call(f.children,l=>l.classList&&l.classList.contains("q-virtual-scroll--skip")===!1),z=y.length,R=r.virtualScrollHorizontal===!0?l=>l.getBoundingClientRect().width:l=>l.offsetHeight;let V=o,S,p;for(let l=0;l<z;){for(S=R(y[l]),l++;l<z&&y[l].classList.contains("q-virtual-scroll--with-prev")===!0;)S+=R(y[l]),l++;p=S-g[V],p!==0&&(g[V]+=p,x[Math.floor(V/X)]+=p),V++}}}function oe(){A.value!==null&&A.value!==void 0&&A.value.focus()}function te(o,f){const y=1*v.value;(f===!0||Array.isArray(g)===!1)&&(g=[]);const z=g.length;g.length=e.value;for(let V=e.value-1;V>=z;V--)g[V]=y;const R=Math.floor((e.value-1)/X);x=[];for(let V=0;V<=R;V++){let S=0;const p=Math.min((V+1)*X,e.value);for(let l=V*X;l<p;l++)S+=g[l];x.push(S)}c=-1,O=void 0,L.value=Oe(x,g,0,I.value.from),M.value=Oe(x,g,I.value.to,e.value),o>=0?(ee(I.value.from),se(()=>{Y(o)})):J()}function G(o){if(o===void 0&&typeof window!="undefined"){const S=a();S!=null&&S.nodeType!==8&&(o=je(S,n(),K.value,H.value,r.virtualScrollHorizontal,C.lang.rtl,r.virtualScrollStickySizeStart,r.virtualScrollStickySizeEnd).scrollViewSize)}m=o;const f=parseFloat(r.virtualScrollSliceRatioBefore)||0,y=parseFloat(r.virtualScrollSliceRatioAfter)||0,z=1+f+y,R=o===void 0||o<=0?1:Math.ceil(o/v.value),V=Math.max(1,R,Math.ceil((r.virtualScrollSliceSize>0?r.virtualScrollSliceSize:10)/z));k.value={total:Math.ceil(V*z),start:Math.ceil(V*f),center:Math.ceil(V*(.5+f)),end:Math.ceil(V*(1+f)),view:R}}function ge(o,f){const y=r.virtualScrollHorizontal===!0?"width":"height",z={["--q-virtual-scroll-item-"+y]:v.value+"px"};return[o==="tbody"?b(o,{class:"q-virtual-scroll__padding",key:"before",ref:K},[b("tr",[b("td",{style:{[y]:`${L.value}px`,...z},colspan:E.value})])]):b(o,{class:"q-virtual-scroll__padding",key:"before",ref:K,style:{[y]:`${L.value}px`,...z}}),b(o,{class:"q-virtual-scroll__content",key:"content",ref:A,tabindex:-1},f.flat()),o==="tbody"?b(o,{class:"q-virtual-scroll__padding",key:"after",ref:H},[b("tr",[b("td",{style:{[y]:`${M.value}px`,...z},colspan:E.value})])]):b(o,{class:"q-virtual-scroll__padding",key:"after",ref:H,style:{[y]:`${M.value}px`,...z}})]}function ie(o){c!==o&&(r.onVirtualScroll!==void 0&&_("virtualScroll",{index:o,from:I.value.from,to:I.value.to-1,direction:o<c?"decrease":"increase",ref:w}),c=o)}G();const J=nl(N,C.platform.is.ios===!0?120:35);al(()=>{G()});let s=!1;return ol(()=>{s=!0}),il(()=>{if(s!==!0)return;const o=a();O!==void 0&&o!==void 0&&o!==null&&o.nodeType!==8?gt(o,O,r.virtualScrollHorizontal,C.lang.rtl):Y(c)}),Ue(()=>{J.cancel()}),Object.assign(w,{scrollTo:Y,reset:ue,refresh:ne}),{virtualScrollSliceRange:I,virtualScrollSliceSizeComputed:k,setVirtualScrollSize:G,onVirtualScrollEvt:J,localResetVirtualScroll:te,padVirtualScroll:ge,scrollTo:Y,reset:ue,refresh:ne}}const ht=["B","KB","MB","GB","TB","PB"];function Jl(e){let a=0;for(;parseInt(e,10)>=1024&&a<ht.length-1;)e/=1024,++a;return`${e.toFixed(1)}${ht[a]}`}function Zl(e){return e.charAt(0).toUpperCase()+e.slice(1)}function eu(e,a,n){return n<=a?a:Math.min(n,Math.max(a,e))}function yt(e,a,n){if(n<=a)return a;const v=n-a+1;let q=a+(e-a)%v;return q<a&&(q=v+q),q===0?0:q}function tu(e,a=2,n="0"){if(e==null)return e;const v=""+e;return v.length>=a?v:new Array(a-v.length+1).join(n)+v}const bt=e=>["add","add-unique","toggle"].includes(e),$l=".*+?^${}()|[]\\",jl=Object.keys(Qe);var lu=Se({name:"QSelect",inheritAttrs:!1,props:{...Dl,...Kt,...Qe,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:bt},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:String,transitionHide:String,transitionDuration:[String,Number],behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:{type:[Number,String],default:void 0},onNewValue:Function,onFilter:Function},emits:[...wt,"add","remove","inputValue","newValue","keyup","keypress","keydown","filterAbort"],setup(e,{slots:a,emit:n}){const{proxy:v}=ze(),{$q:q}=v,r=T(!1),_=T(!1),w=T(-1),C=T(""),O=T(!1),c=T(!1);let m=null,x,g,L,M=null,k,K,H,A;const I=T(null),E=T(null),U=T(null),W=T(null),ue=T(null),ne=$t(e),Y=jt(ot),N=d(()=>Array.isArray(e.options)?e.options.length:0),ae=d(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:ee,virtualScrollSliceSizeComputed:oe,localResetVirtualScroll:te,padVirtualScroll:G,onVirtualScrollEvt:ge,scrollTo:ie,setVirtualScrollSize:J}=Kl({virtualScrollLength:N,getVirtualScrollTarget:Ot,getVirtualScrollEl:nt,virtualScrollItemSizeComputed:ae}),s=kt(),o=d(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,i=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&x!==void 0?x:[],h=i.map(F=>_t(F,u));return e.modelValue===null&&t===!0?h.filter(F=>F!==null):h}return i}),f=d(()=>{const t={};return jl.forEach(i=>{const u=e[i];u!==void 0&&(t[i]=u)}),t}),y=d(()=>e.optionsDark===null?s.isDark.value:e.optionsDark),z=d(()=>dt(o.value)),R=d(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||o.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),V=d(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),S=d(()=>N.value===0),p=d(()=>o.value.map(t=>Q.value(t)).join(", ")),l=d(()=>e.displayValue!==void 0?e.displayValue:p.value),D=d(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),re=d(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||o.value.some(D.value))),de=d(()=>s.focused.value===!0?e.tabindex:-1),Z=d(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":r.value===!0?"true":"false","aria-controls":`${s.targetUid.value}_lb`};return w.value>=0&&(t["aria-activedescendant"]=`${s.targetUid.value}_${w.value}`),t}),Fe=d(()=>({id:`${s.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),fe=d(()=>o.value.map((t,i)=>({index:i,opt:t,html:D.value(t),selected:!0,removeAtIndex:Bt,toggleOption:ve,tabindex:de.value}))),he=d(()=>{if(N.value===0)return[];const{from:t,to:i}=ee.value;return e.options.slice(t,i).map((u,h)=>{const F=ye.value(u)===!0,B=t+h,P={clickable:!0,active:!1,activeClass:Re.value,manualFocus:!0,focused:!1,disable:F,tabindex:-1,dense:e.optionsDense,dark:y.value,role:"option",id:`${s.targetUid.value}_${B}`,onClick:()=>{ve(u)}};return F!==!0&&(pe(u)===!0&&(P.active=!0),w.value===B&&(P.focused=!0),P["aria-selected"]=P.active===!0?"true":"false",q.platform.is.desktop===!0&&(P.onMousemove=()=>{r.value===!0&&be(B)})),{index:B,opt:u,html:D.value(u),label:Q.value(u),selected:P.active,focused:P.focused,toggleOption:ve,setOptionIndex:be,itemProps:P}})}),Ie=d(()=>e.dropdownIcon!==void 0?e.dropdownIcon:q.iconSet.arrow.dropdown),Ae=d(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Re=d(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),j=d(()=>He(e.optionValue,"value")),Q=d(()=>He(e.optionLabel,"label")),ye=d(()=>He(e.optionDisable,"disable")),Me=d(()=>o.value.map(t=>j.value(t))),At=d(()=>{const t={onInput:ot,onChange:Y,onKeydown:ut,onKeyup:tt,onKeypress:lt,onFocus:Ze,onClick(i){g===!0&&Ve(i)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=Y,t});ce(o,t=>{x=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&s.innerLoading.value!==!0&&(_.value!==!0&&r.value!==!0||z.value!==!0)&&(L!==!0&&qe(),(_.value===!0||r.value===!0)&&we(""))},{immediate:!0}),ce(()=>e.fillInput,qe),ce(r,De),ce(N,Dt);function Ge(t){return e.emitValue===!0?j.value(t):t}function Le(t){if(t>-1&&t<o.value.length)if(e.multiple===!0){const i=e.modelValue.slice();n("remove",{index:t,value:i.splice(t,1)[0]}),n("update:modelValue",i)}else n("update:modelValue",null)}function Bt(t){Le(t),s.focus()}function Je(t,i){const u=Ge(t);if(e.multiple!==!0){e.fillInput===!0&&Be(Q.value(t),!0,!0),n("update:modelValue",u);return}if(o.value.length===0){n("add",{index:0,value:u}),n("update:modelValue",e.multiple===!0?[u]:u);return}if(i===!0&&pe(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const h=e.modelValue.slice();n("add",{index:h.length,value:u}),h.push(u),n("update:modelValue",h)}function ve(t,i){if(s.editable.value!==!0||t===void 0||ye.value(t)===!0)return;const u=j.value(t);if(e.multiple!==!0){i!==!0&&(Be(e.fillInput===!0?Q.value(t):"",!0,!0),me()),E.value!==null&&E.value.focus(),(o.value.length===0||_e(j.value(o.value[0]),u)!==!0)&&n("update:modelValue",e.emitValue===!0?u:t);return}if((g!==!0||O.value===!0)&&s.focus(),Ze(),o.value.length===0){const B=e.emitValue===!0?u:t;n("add",{index:0,value:B}),n("update:modelValue",e.multiple===!0?[B]:B);return}const h=e.modelValue.slice(),F=Me.value.findIndex(B=>_e(B,u));if(F>-1)n("remove",{index:F,value:h.splice(F,1)[0]});else{if(e.maxValues!==void 0&&h.length>=e.maxValues)return;const B=e.emitValue===!0?u:t;n("add",{index:h.length,value:B}),h.push(B)}n("update:modelValue",h)}function be(t){if(q.platform.is.desktop!==!0)return;const i=t>-1&&t<N.value?t:-1;w.value!==i&&(w.value=i)}function Ee(t=1,i){if(r.value===!0){let u=w.value;do u=yt(u+t,-1,N.value-1);while(u!==-1&&u!==w.value&&ye.value(e.options[u])===!0);w.value!==u&&(be(u),ie(u),i!==!0&&e.useInput===!0&&e.fillInput===!0&&Te(u>=0?Q.value(e.options[u]):k))}}function _t(t,i){const u=h=>_e(j.value(h),t);return e.options.find(u)||i.find(u)||t}function He(t,i){const u=t!==void 0?t:i;return typeof u=="function"?u:h=>h!==null&&typeof h=="object"&&u in h?h[u]:h}function pe(t){const i=j.value(t);return Me.value.find(u=>_e(u,i))!==void 0}function Ze(t){e.useInput===!0&&E.value!==null&&(t===void 0||E.value===t.target&&t.target.value===p.value)&&E.value.select()}function et(t){qt(t,27)===!0&&r.value===!0&&(Ve(t),me(),qe()),n("keyup",t)}function tt(t){const{value:i}=t.target;if(t.keyCode!==void 0){et(t);return}if(t.target.value="",m!==null&&(clearTimeout(m),m=null),qe(),typeof i=="string"&&i.length>0){const u=i.toLocaleLowerCase(),h=B=>{const P=e.options.find($=>B.value($).toLocaleLowerCase()===u);return P===void 0?!1:(o.value.indexOf(P)===-1?ve(P):me(),!0)},F=B=>{h(j)!==!0&&(h(Q)===!0||B===!0||we(i,!0,()=>F(!0)))};F()}else s.clearValue(t)}function lt(t){n("keypress",t)}function ut(t){if(n("keydown",t),cl(t)===!0)return;const i=C.value.length>0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(w.value>-1||i===!0);if(t.keyCode===27){$e(t);return}if(t.keyCode===9&&u===!1){Ce();return}if(t.target===void 0||t.target.id!==s.targetUid.value)return;if(t.keyCode===40&&s.innerLoading.value!==!0&&r.value===!1){le(t),ke();return}if(t.keyCode===8&&e.hideSelected!==!0&&C.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?Le(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&n("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof C.value!="string"||C.value.length===0)&&(le(t),w.value=-1,Ee(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&oe.value!==void 0&&(le(t),w.value=Math.max(-1,Math.min(N.value,w.value+(t.keyCode===33?-1:1)*oe.value.view)),Ee(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(le(t),Ee(t.keyCode===38?-1:1,e.multiple));const h=N.value;if((H===void 0||A<Date.now())&&(H=""),h>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||H.length>0)){r.value!==!0&&ke(t);const F=t.key.toLocaleLowerCase(),B=H.length===1&&H[0]===F;A=Date.now()+1500,B===!1&&(le(t),H+=F);const P=new RegExp("^"+H.split("").map(Ke=>$l.indexOf(Ke)>-1?"\\"+Ke:Ke).join(".*"),"i");let $=w.value;if(B===!0||$<0||P.test(Q.value(e.options[$]))!==!0)do $=yt($+1,-1,h-1);while($!==w.value&&(ye.value(e.options[$])===!0||P.test(Q.value(e.options[$]))!==!0));w.value!==$&&se(()=>{be($),ie($),$>=0&&e.useInput===!0&&e.fillInput===!0&&Te(Q.value(e.options[$]))});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||H!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&le(t),w.value>-1&&w.value<h){ve(e.options[w.value]);return}if(i===!0){const F=(B,P)=>{if(P){if(bt(P)!==!0)return}else P=e.newValueMode;if(B==null)return;Be("",e.multiple!==!0,!0),(P==="toggle"?ve:Je)(B,P==="add-unique"),e.multiple!==!0&&(E.value!==null&&E.value.focus(),me())};if(e.onNewValue!==void 0?n("newValue",C.value,F):F(C.value),e.multiple!==!0)return}r.value===!0?Ce():s.innerLoading.value!==!0&&ke()}}function nt(){return g===!0?ue.value:U.value!==null&&U.value.contentEl!==null?U.value.contentEl:void 0}function Ot(){return nt()}function zt(){return e.hideSelected===!0?[]:a["selected-item"]!==void 0?fe.value.map(t=>a["selected-item"](t)).slice():a.selected!==void 0?[].concat(a.selected()):e.useChips===!0?fe.value.map((t,i)=>b(El,{key:"option-"+i,removable:s.editable.value===!0&&ye.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:de.value,onRemove(){t.removeAtIndex(i)}},()=>b("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:Q.value(t.opt)}))):[b("span",{[re.value===!0?"innerHTML":"textContent"]:l.value})]}function at(){if(S.value===!0)return a["no-option"]!==void 0?a["no-option"]({inputValue:C.value}):void 0;const t=a.option!==void 0?a.option:u=>b(Tl,{key:u.index,...u.itemProps},()=>b(Pl,()=>b(Rl,()=>b("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let i=G("div",he.value.map(t));return a["before-options"]!==void 0&&(i=a["before-options"]().concat(i)),dl(a["after-options"],i)}function Ft(t,i){const u=i===!0?{...Z.value,...s.splitAttrs.attributes.value}:void 0,h={ref:i===!0?E:void 0,key:"i_t",class:R.value,style:e.inputStyle,value:C.value!==void 0?C.value:"",type:"search",...u,id:i===!0?s.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...At.value};return t!==!0&&g===!0&&(Array.isArray(h.class)===!0?h.class=[...h.class,"no-pointer-events"]:h.class+=" no-pointer-events"),b("input",h)}function ot(t){m!==null&&(clearTimeout(m),m=null),!(t&&t.target&&t.target.qComposing===!0)&&(Te(t.target.value||""),L=!0,k=C.value,s.focused.value!==!0&&(g!==!0||O.value===!0)&&s.focus(),e.onFilter!==void 0&&(m=setTimeout(()=>{m=null,we(C.value)},e.inputDebounce)))}function Te(t){C.value!==t&&(C.value=t,n("inputValue",t))}function Be(t,i,u){L=u!==!0,e.useInput===!0&&(Te(t),(i===!0||u!==!0)&&(k=t),i!==!0&&we(t))}function we(t,i,u){if(e.onFilter===void 0||i!==!0&&s.focused.value!==!0)return;s.innerLoading.value===!0?n("filterAbort"):(s.innerLoading.value=!0,c.value=!0),t!==""&&e.multiple!==!0&&o.value.length>0&&L!==!0&&t===Q.value(o.value[0])&&(t="");const h=setTimeout(()=>{r.value===!0&&(r.value=!1)},10);M!==null&&clearTimeout(M),M=h,n("filter",t,(F,B)=>{(i===!0||s.focused.value===!0)&&M===h&&(clearTimeout(M),typeof F=="function"&&F(),c.value=!1,se(()=>{s.innerLoading.value=!1,s.editable.value===!0&&(i===!0?r.value===!0&&me():r.value===!0?De(!0):r.value=!0),typeof B=="function"&&se(()=>{B(v)}),typeof u=="function"&&se(()=>{u(v)})}))},()=>{s.focused.value===!0&&M===h&&(clearTimeout(M),s.innerLoading.value=!1,c.value=!1),r.value===!0&&(r.value=!1)})}function It(){return b(Ll,{ref:U,class:V.value,style:e.popupContentStyle,modelValue:r.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&S.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:y.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,square:Ae.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...Fe.value,onScrollPassive:ge,onBeforeShow:rt,onBeforeHide:Mt,onShow:Et},at)}function Mt(t){st(t),Ce()}function Et(){J()}function Tt(t){Ve(t),E.value!==null&&E.value.focus(),O.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function Pt(t){Ve(t),se(()=>{O.value=!1})}function Rt(){const t=[b(Il,{class:`col-auto ${s.fieldClass.value}`,...f.value,for:s.targetUid.value,dark:y.value,square:!0,loading:c.value,itemAligned:!1,filled:!0,stackLabel:C.value.length>0,...s.splitAttrs.listeners.value,onFocus:Tt,onBlur:Pt},{...a,rawControl:()=>s.getControl(!0),before:void 0,after:void 0})];return r.value===!0&&t.push(b("div",{ref:ue,class:V.value+" scroll",style:e.popupContentStyle,...Fe.value,onClick:$e,onScrollPassive:ge},at())),b(Fl,{ref:W,modelValue:_.value,position:e.useInput===!0?"top":void 0,transitionShow:K,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:rt,onBeforeHide:Lt,onHide:Ht,onShow:pt},()=>b("div",{class:"q-select__dialog"+(y.value===!0?" q-select__dialog--dark q-dark":"")+(O.value===!0?" q-select__dialog--focused":"")},t))}function Lt(t){st(t),W.value!==null&&W.value.__updateRefocusTarget(s.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),s.focused.value=!1}function Ht(t){me(),s.focused.value===!1&&n("blur",t),qe()}function pt(){const t=document.activeElement;(t===null||t.id!==s.targetUid.value)&&E.value!==null&&E.value!==t&&E.value.focus(),J()}function Ce(){_.value!==!0&&(w.value=-1,r.value===!0&&(r.value=!1),s.focused.value===!1&&(M!==null&&(clearTimeout(M),M=null),s.innerLoading.value===!0&&(n("filterAbort"),s.innerLoading.value=!1,c.value=!1)))}function ke(t){s.editable.value===!0&&(g===!0?(s.onControlFocusin(t),_.value=!0,se(()=>{s.focus()})):s.focus(),e.onFilter!==void 0?we(C.value):(S.value!==!0||a["no-option"]!==void 0)&&(r.value=!0))}function me(){_.value=!1,Ce()}function qe(){e.useInput===!0&&Be(e.multiple!==!0&&e.fillInput===!0&&o.value.length>0&&Q.value(o.value[0])||"",!0,!0)}function De(t){let i=-1;if(t===!0){if(o.value.length>0){const u=j.value(o.value[0]);i=e.options.findIndex(h=>_e(j.value(h),u))}te(i)}be(i)}function Dt(t,i){r.value===!0&&s.innerLoading.value===!1&&(te(-1,!0),se(()=>{r.value===!0&&s.innerLoading.value===!1&&(t>i?te():De(!0))}))}function it(){_.value===!1&&U.value!==null&&U.value.updatePosition()}function rt(t){t!==void 0&&Ve(t),n("popupShow",t),s.hasPopupOpen=!0,s.onControlFocusin(t)}function st(t){t!==void 0&&Ve(t),n("popupHide",t),s.hasPopupOpen=!1,s.onControlFocusout(t)}function ct(){g=q.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?a["no-option"]!==void 0||e.onFilter!==void 0||S.value===!1:!0),K=q.platform.is.ios===!0&&g===!0&&e.useInput===!0?"fade":e.transitionShow}return rl(ct),sl(it),ct(),Ue(()=>{m!==null&&clearTimeout(m)}),Object.assign(v,{showPopup:ke,hidePopup:me,removeAtIndex:Le,add:Je,toggleOption:ve,getOptionIndex:()=>w.value,setOptionIndex:be,moveOptionSelection:Ee,filter:we,updateMenuPosition:it,updateInputValue:Be,isOptionSelected:pe,getEmittingOptionValue:Ge,isOptionDisabled:(...t)=>ye.value.apply(null,t)===!0,getOptionValue:(...t)=>j.value.apply(null,t),getOptionLabel:(...t)=>Q.value.apply(null,t)}),Object.assign(s,{innerValue:o,fieldClass:d(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:I,targetRef:E,hasValue:z,showPopup:ke,floatingLabel:d(()=>e.hideSelected!==!0&&z.value===!0||typeof C.value=="number"||C.value.length>0||dt(e.displayValue)),getControlChild:()=>{if(s.editable.value!==!1&&(_.value===!0||S.value!==!0||a["no-option"]!==void 0))return g===!0?Rt():It();s.hasPopupOpen===!0&&(s.hasPopupOpen=!1)},controlEvents:{onFocusin(t){s.onControlFocusin(t)},onFocusout(t){s.onControlFocusout(t,()=>{qe(),Ce()})},onClick(t){if($e(t),g!==!0&&r.value===!0){Ce(),E.value!==null&&E.value.focus();return}ke(t)}},getControl:t=>{const i=zt(),u=t===!0||_.value!==!0||g!==!0;if(e.useInput===!0)i.push(Ft(t,u));else if(s.editable.value===!0){const F=u===!0?Z.value:void 0;i.push(b("input",{ref:u===!0?E:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?s.targetUid.value:void 0,value:l.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...F,onKeydown:ut,onKeyup:et,onKeypress:lt})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length>0&&i.push(b("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:tt}))}if(ne.value!==void 0&&e.disable!==!0&&Me.value.length>0){const F=Me.value.map(B=>b("option",{value:B,selected:!0}));i.push(b("select",{class:"hidden",name:ne.value,multiple:e.multiple},F))}const h=e.useInput===!0||u!==!0?void 0:s.splitAttrs.attributes.value;return b("div",{class:"q-field__native row items-center",...h},i)},getInnerAppend:()=>e.loading!==!0&&c.value!==!0&&e.hideDropdownIcon!==!0?[b(Pe,{class:"q-select__dropdown-icon"+(r.value===!0?" rotate-180":""),name:Ie.value})]:null}),Ct(s)}});export{lu as Q,Tl as a,Pl as b,Rl as c,Ll as d,Kl as e,Gl as f,eu as g,Zl as h,Jl as i,El as j,tu as p,Dl as u};
