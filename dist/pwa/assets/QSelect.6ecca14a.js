import{u as Qe,b as bt,e as wt,d as Ct,a as Dt,c as Kt,f as dt,g as $t}from"./use-key-composition.b68e04f7.js";import{j as Se,a8 as Nt,a9 as jt,c as d,aa as Qt,k as b,Y as Re,ab as Wt,a6 as Ut,m as Fe,B as le,ac as Xt,ad as Yt,r as T,ae as kt,a7 as Jt,l as We,n as ce,af as Gt,J as Zt,_ as el,q as Ue,ag as tl,I as ll,V as ul,ah as nl,y as al,z as ol,p as se,W as il,ai as rl,X as $e,aj as Be,x as Ve,s as sl,T as cl}from"./index.a398b87a.js";import{u as Xe,c as Ye,b as dl}from"./QCard.3d4f36ea.js";import{u as fl,v as ft,a as vl,b as ml,c as Sl,r as vt,s as gl,p as mt,d as hl}from"./position-engine.dc9ebcfa.js";import{u as yl,a as bl,b as wl,c as Cl,d as kl,e as ql,f as Vl,g as xl,h as _l,r as Al,i as St,j as Bl,k as Ol,Q as Fl}from"./QDialog.ff319547.js";import{r as je}from"./rtl.b51694b1.js";import{n as gt}from"./format.2bc25e5f.js";var zl=Se({name:"QField",inheritAttrs:!1,props:Qe,emits:bt,setup(){return wt(Ct())}});const Il={xs:8,sm:10,md:14,lg:20,xl:24};var Ml=Se({name:"QChip",props:{...Xe,...Nt,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:c,emit:i}){const{proxy:{$q:y}}=Fe(),x=Ye(e,y),o=jt(e,Il),B=d(()=>e.selected===!0||e.icon!==void 0),w=d(()=>e.selected===!0?e.iconSelected||y.iconSet.chip.selected:e.icon),C=d(()=>e.iconRemove||y.iconSet.chip.remove),O=d(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),s=d(()=>{const k=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(k?` text-${k} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(O.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(x.value===!0?" q-chip--dark q-dark":"")}),v=d(()=>{const k=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},K={...k,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||y.lang.label.remove};return{chip:k,remove:K}});function V(k){k.keyCode===13&&S(k)}function S(k){e.disable||(i("update:selected",!e.selected),i("click",k))}function L(k){(k.keyCode===void 0||k.keyCode===13)&&(le(k),e.disable===!1&&(i("update:modelValue",!1),i("remove")))}function M(){const k=[];O.value===!0&&k.push(b("div",{class:"q-focus-helper"})),B.value===!0&&k.push(b(Re,{class:"q-chip__icon q-chip__icon--left",name:w.value}));const K=e.label!==void 0?[b("div",{class:"ellipsis"},[e.label])]:void 0;return k.push(b("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Wt(c.default,K))),e.iconRight&&k.push(b(Re,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&k.push(b(Re,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:C.value,...v.value.remove,onClick:L,onKeyup:L})),k}return()=>{if(e.modelValue===!1)return;const k={class:s.value,style:o.value};return O.value===!0&&Object.assign(k,v.value.chip,{onClick:S,onKeyup:V}),Qt("div",k,M(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Ut,e.ripple]])}}}),El=Se({name:"QItem",props:{...Xe,...Xt,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:c,emit:i}){const{proxy:{$q:y}}=Fe(),x=Ye(e,y),{hasLink:o,linkAttrs:B,linkClass:w,linkTag:C,navigateOnClick:O}=Yt(),s=T(null),v=T(null),V=d(()=>e.clickable===!0||o.value===!0||e.tag==="label"),S=d(()=>e.disable!==!0&&V.value===!0),L=d(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(x.value===!0?" q-item--dark":"")+(o.value===!0&&e.active===null?w.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(S.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),M=d(()=>{if(e.insetLevel===void 0)return null;const _=y.lang.rtl===!0?"Right":"Left";return{["padding"+_]:16+e.insetLevel*56+"px"}});function k(_){S.value===!0&&(v.value!==null&&(_.qKeyEvent!==!0&&document.activeElement===s.value?v.value.focus():document.activeElement===v.value&&s.value.focus()),O(_))}function K(_){if(S.value===!0&&kt(_,13)===!0){le(_),_.qKeyEvent=!0;const I=new MouseEvent("click",_);I.qKeyEvent=!0,s.value.dispatchEvent(I)}i("keyup",_)}function H(){const _=Jt(c.default,[]);return S.value===!0&&_.unshift(b("div",{class:"q-focus-helper",tabindex:-1,ref:v})),_}return()=>{const _={ref:s,class:L.value,style:M.value,role:"listitem",onClick:k,onKeyup:K};return S.value===!0?(_.tabindex=e.tabindex||"0",Object.assign(_,B.value)):V.value===!0&&(_["aria-disabled"]="true"),b(C.value,_,H())}}}),Tl=Se({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:c}){const i=d(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>b("div",{class:i.value},We(c.default))}}),Rl=Se({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:c}){const i=d(()=>parseInt(e.lines,10)),y=d(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(i.value===1?" ellipsis":"")),x=d(()=>e.lines!==void 0&&i.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":i.value}:null);return()=>b("div",{style:x.value,class:y.value},We(c.default))}}),Pl=Se({name:"QMenu",inheritAttrs:!1,props:{...fl,...yl,...Xe,...bl,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ft},self:{type:String,validator:ft},offset:{type:Array,validator:vl},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...wl,"click","escapeKey"],setup(e,{slots:c,emit:i,attrs:y}){let x=null,o,B,w;const C=Fe(),{proxy:O}=C,{$q:s}=O,v=T(null),V=T(!1),S=d(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),L=Ye(e,s),{registerTick:M,removeTick:k}=Cl(),{registerTimeout:K}=kl(),{transitionProps:H,transitionStyle:_}=ql(e),{localScrollTarget:I,changeScrollEvent:E,unconfigureScrollTarget:U}=ml(e,h),{anchorEl:W,canShow:ue}=Sl({showing:V}),{hide:ne}=Vl({showing:V,canShow:ue,handleShow:r,handleHide:n,hideOnRouteChange:S,processOnMount:!0}),{showPortal:Y,hidePortal:j,renderPortal:ae}=xl(C,v,p,"menu"),ee={anchorEl:W,innerRef:v,onClickOutside(l){if(e.persistent!==!0&&V.value===!0)return ne(l),(l.type==="touchstart"||l.target.classList.contains("q-dialog__backdrop"))&&le(l),!0}},oe=d(()=>mt(e.anchor||(e.cover===!0?"center middle":"bottom start"),s.lang.rtl)),te=d(()=>e.cover===!0?oe.value:mt(e.self||"top start",s.lang.rtl)),J=d(()=>(e.square===!0?" q-menu--square":"")+(L.value===!0?" q-menu--dark q-dark":"")),ge=d(()=>e.autoClose===!0?{onClick:F}:{}),ie=d(()=>V.value===!0&&e.persistent!==!0);ce(ie,l=>{l===!0?(Ol(q),hl(ee)):(St(q),vt(ee))});function G(){dl(()=>{let l=v.value;l&&l.contains(document.activeElement)!==!0&&(l=l.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||l.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||l.querySelector("[autofocus], [data-autofocus]")||l,l.focus({preventScroll:!0}))})}function r(l){if(x=e.noRefocus===!1?document.activeElement:null,_l(P),Y(),h(),o=void 0,l!==void 0&&(e.touchPosition||e.contextMenu)){const D=Gt(l);if(D.left!==void 0){const{top:re,left:de}=W.value.getBoundingClientRect();o={left:D.left-de,top:D.top-re}}}B===void 0&&(B=ce(()=>s.screen.width+"|"+s.screen.height+"|"+e.self+"|"+e.anchor+"|"+s.lang.rtl,m)),e.noFocus!==!0&&document.activeElement.blur(),M(()=>{m(),e.noFocus!==!0&&G()}),K(()=>{s.platform.is.ios===!0&&(w=e.autoClose,v.value.click()),m(),Y(!0),i("show",l)},e.transitionDuration)}function n(l){k(),j(),f(!0),x!==null&&(l===void 0||l.qClickOutside!==!0)&&(((l&&l.type.indexOf("key")===0?x.closest('[tabindex]:not([tabindex^="-"])'):void 0)||x).focus(),x=null),K(()=>{j(!0),i("hide",l)},e.transitionDuration)}function f(l){o=void 0,B!==void 0&&(B(),B=void 0),(l===!0||V.value===!0)&&(Al(P),U(),vt(ee),St(q)),l!==!0&&(x=null)}function h(){(W.value!==null||e.scrollTarget!==void 0)&&(I.value=Zt(W.value,e.scrollTarget),E(I.value,m))}function F(l){w!==!0?(Bl(O,l),i("click",l)):w=!1}function P(l){ie.value===!0&&e.noFocus!==!0&&tl(v.value,l.target)!==!0&&G()}function q(l){i("escapeKey"),ne(l)}function m(){const l=v.value;l===null||W.value===null||gl({el:l,offset:e.offset,anchorEl:W.value,anchorOrigin:oe.value,selfOrigin:te.value,absoluteOffset:o,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function p(){return b(el,H.value,()=>V.value===!0?b("div",{role:"menu",...y,ref:v,tabindex:-1,class:["q-menu q-position-engine scroll"+J.value,y.class],style:[y.style,_.value],...ge.value},We(c.default)):null)}return Ue(f),Object.assign(O,{focus:G,updatePosition:m}),ae}});const X=1e3,Ll=["start","center","end","start-force","center-force","end-force"],qt=Array.prototype.filter,Hl=window.getComputedStyle(document.body).overflowAnchor===void 0?ll:function(e,c){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const i=e.children||[];qt.call(i,x=>x.dataset&&x.dataset.qVsAnchor!==void 0).forEach(x=>{delete x.dataset.qVsAnchor});const y=i[c];y&&y.dataset&&(y.dataset.qVsAnchor="")}))};function xe(e,c){return e+c}function Ne(e,c,i,y,x,o,B,w){const C=e===window?document.scrollingElement||document.documentElement:e,O=x===!0?"offsetWidth":"offsetHeight",s={scrollStart:0,scrollViewSize:-B-w,scrollMaxSize:0,offsetStart:-B,offsetEnd:-w};if(x===!0?(e===window?(s.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,s.scrollViewSize+=document.documentElement.clientWidth):(s.scrollStart=C.scrollLeft,s.scrollViewSize+=C.clientWidth),s.scrollMaxSize=C.scrollWidth,o===!0&&(s.scrollStart=(je===!0?s.scrollMaxSize-s.scrollViewSize:0)-s.scrollStart)):(e===window?(s.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,s.scrollViewSize+=document.documentElement.clientHeight):(s.scrollStart=C.scrollTop,s.scrollViewSize+=C.clientHeight),s.scrollMaxSize=C.scrollHeight),i!==null)for(let v=i.previousElementSibling;v!==null;v=v.previousElementSibling)v.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetStart+=v[O]);if(y!==null)for(let v=y.nextElementSibling;v!==null;v=v.nextElementSibling)v.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetEnd+=v[O]);if(c!==e){const v=C.getBoundingClientRect(),V=c.getBoundingClientRect();x===!0?(s.offsetStart+=V.left-v.left,s.offsetEnd-=V.width):(s.offsetStart+=V.top-v.top,s.offsetEnd-=V.height),e!==window&&(s.offsetStart+=s.scrollStart),s.offsetEnd+=s.scrollMaxSize-s.offsetStart}return s}function ht(e,c,i,y){c==="end"&&(c=(e===window?document.body:e)[i===!0?"scrollWidth":"scrollHeight"]),e===window?i===!0?(y===!0&&(c=(je===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-c),window.scrollTo(c,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,c):i===!0?(y===!0&&(c=(je===!0?e.scrollWidth-e.offsetWidth:0)-c),e.scrollLeft=c):e.scrollTop=c}function Oe(e,c,i,y){if(i>=y)return 0;const x=c.length,o=Math.floor(i/X),B=Math.floor((y-1)/X)+1;let w=e.slice(o,B).reduce(xe,0);return i%X!==0&&(w-=c.slice(o*X,i).reduce(xe,0)),y%X!==0&&y!==x&&(w-=c.slice(y,B*X).reduce(xe,0)),w}const Vt={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},Jl=Object.keys(Vt),pl={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...Vt};function Dl({virtualScrollLength:e,getVirtualScrollTarget:c,getVirtualScrollEl:i,virtualScrollItemSizeComputed:y}){const x=Fe(),{props:o,emit:B,proxy:w}=x,{$q:C}=w;let O,s,v,V=[],S;const L=T(0),M=T(0),k=T({}),K=T(null),H=T(null),_=T(null),I=T({from:0,to:0}),E=d(()=>o.tableColspan!==void 0?o.tableColspan:100);y===void 0&&(y=d(()=>o.virtualScrollItemSize));const U=d(()=>y.value+";"+o.virtualScrollHorizontal),W=d(()=>U.value+";"+o.virtualScrollSliceRatioBefore+";"+o.virtualScrollSliceRatioAfter);ce(W,()=>{J()}),ce(U,ue);function ue(){te(s,!0)}function ne(n){te(n===void 0?s:n)}function Y(n,f){const h=c();if(h==null||h.nodeType===8)return;const F=Ne(h,i(),K.value,H.value,o.virtualScrollHorizontal,C.lang.rtl,o.virtualScrollStickySizeStart,o.virtualScrollStickySizeEnd);v!==F.scrollViewSize&&J(F.scrollViewSize),ae(h,F,Math.min(e.value-1,Math.max(0,parseInt(n,10)||0)),0,Ll.indexOf(f)>-1?f:s>-1&&n>s?"end":"start")}function j(){const n=c();if(n==null||n.nodeType===8)return;const f=Ne(n,i(),K.value,H.value,o.virtualScrollHorizontal,C.lang.rtl,o.virtualScrollStickySizeStart,o.virtualScrollStickySizeEnd),h=e.value-1,F=f.scrollMaxSize-f.offsetStart-f.offsetEnd-M.value;if(O===f.scrollStart)return;if(f.scrollMaxSize<=0){ae(n,f,0,0);return}v!==f.scrollViewSize&&J(f.scrollViewSize),ee(I.value.from);const P=Math.floor(f.scrollMaxSize-Math.max(f.scrollViewSize,f.offsetEnd)-Math.min(S[h],f.scrollViewSize/2));if(P>0&&Math.ceil(f.scrollStart)>=P){ae(n,f,h,f.scrollMaxSize-f.offsetEnd-V.reduce(xe,0));return}let q=0,m=f.scrollStart-f.offsetStart,p=m;if(m<=F&&m+f.scrollViewSize>=L.value)m-=L.value,q=I.value.from,p=m;else for(let l=0;m>=V[l]&&q<h;l++)m-=V[l],q+=X;for(;m>0&&q<h;)m-=S[q],m>-f.scrollViewSize?(q++,p=m):p=S[q]+m;ae(n,f,q,p)}function ae(n,f,h,F,P){const q=typeof P=="string"&&P.indexOf("-force")>-1,m=q===!0?P.replace("-force",""):P,p=m!==void 0?m:"start";let l=Math.max(0,h-k.value[p]),D=l+k.value.total;D>e.value&&(D=e.value,l=Math.max(0,D-k.value.total)),O=f.scrollStart;const re=l!==I.value.from||D!==I.value.to;if(re===!1&&m===void 0){ie(h);return}const{activeElement:de}=document,Z=_.value;re===!0&&Z!==null&&Z!==de&&Z.contains(de)===!0&&(Z.addEventListener("focusout",oe),setTimeout(()=>{Z!==null&&Z.removeEventListener("focusout",oe)})),Hl(Z,h-l);const ze=m!==void 0?S.slice(l,h).reduce(xe,0):0;if(re===!0){const fe=D>=I.value.from&&l<=I.value.to?I.value.to:D;I.value={from:l,to:fe},L.value=Oe(V,S,0,l),M.value=Oe(V,S,D,e.value),requestAnimationFrame(()=>{I.value.to!==D&&O===f.scrollStart&&(I.value={from:I.value.from,to:D},M.value=Oe(V,S,D,e.value))})}requestAnimationFrame(()=>{if(O!==f.scrollStart)return;re===!0&&ee(l);const fe=S.slice(l,h).reduce(xe,0),he=fe+f.offsetStart+L.value,Ie=he+S[h];let _e=he+F;if(m!==void 0){const Pe=fe-ze,N=f.scrollStart+Pe;_e=q!==!0&&N<he&&Ie<N+f.scrollViewSize?N:m==="end"?Ie-f.scrollViewSize:he-(m==="start"?0:Math.round((f.scrollViewSize-S[h])/2))}O=_e,ht(n,_e,o.virtualScrollHorizontal,C.lang.rtl),ie(h)})}function ee(n){const f=_.value;if(f){const h=qt.call(f.children,l=>l.classList&&l.classList.contains("q-virtual-scroll--skip")===!1),F=h.length,P=o.virtualScrollHorizontal===!0?l=>l.getBoundingClientRect().width:l=>l.offsetHeight;let q=n,m,p;for(let l=0;l<F;){for(m=P(h[l]),l++;l<F&&h[l].classList.contains("q-virtual-scroll--with-prev")===!0;)m+=P(h[l]),l++;p=m-S[q],p!==0&&(S[q]+=p,V[Math.floor(q/X)]+=p),q++}}}function oe(){_.value!==null&&_.value!==void 0&&_.value.focus()}function te(n,f){const h=1*y.value;(f===!0||Array.isArray(S)===!1)&&(S=[]);const F=S.length;S.length=e.value;for(let q=e.value-1;q>=F;q--)S[q]=h;const P=Math.floor((e.value-1)/X);V=[];for(let q=0;q<=P;q++){let m=0;const p=Math.min((q+1)*X,e.value);for(let l=q*X;l<p;l++)m+=S[l];V.push(m)}s=-1,O=void 0,L.value=Oe(V,S,0,I.value.from),M.value=Oe(V,S,I.value.to,e.value),n>=0?(ee(I.value.from),se(()=>{Y(n)})):G()}function J(n){if(n===void 0&&typeof window!="undefined"){const m=c();m!=null&&m.nodeType!==8&&(n=Ne(m,i(),K.value,H.value,o.virtualScrollHorizontal,C.lang.rtl,o.virtualScrollStickySizeStart,o.virtualScrollStickySizeEnd).scrollViewSize)}v=n;const f=parseFloat(o.virtualScrollSliceRatioBefore)||0,h=parseFloat(o.virtualScrollSliceRatioAfter)||0,F=1+f+h,P=n===void 0||n<=0?1:Math.ceil(n/y.value),q=Math.max(1,P,Math.ceil((o.virtualScrollSliceSize>0?o.virtualScrollSliceSize:10)/F));k.value={total:Math.ceil(q*F),start:Math.ceil(q*f),center:Math.ceil(q*(.5+f)),end:Math.ceil(q*(1+f)),view:P}}function ge(n,f){const h=o.virtualScrollHorizontal===!0?"width":"height",F={["--q-virtual-scroll-item-"+h]:y.value+"px"};return[n==="tbody"?b(n,{class:"q-virtual-scroll__padding",key:"before",ref:K},[b("tr",[b("td",{style:{[h]:`${L.value}px`,...F},colspan:E.value})])]):b(n,{class:"q-virtual-scroll__padding",key:"before",ref:K,style:{[h]:`${L.value}px`,...F}}),b(n,{class:"q-virtual-scroll__content",key:"content",ref:_,tabindex:-1},f.flat()),n==="tbody"?b(n,{class:"q-virtual-scroll__padding",key:"after",ref:H},[b("tr",[b("td",{style:{[h]:`${M.value}px`,...F},colspan:E.value})])]):b(n,{class:"q-virtual-scroll__padding",key:"after",ref:H,style:{[h]:`${M.value}px`,...F}})]}function ie(n){s!==n&&(o.onVirtualScroll!==void 0&&B("virtualScroll",{index:n,from:I.value.from,to:I.value.to-1,direction:n<s?"decrease":"increase",ref:w}),s=n)}J();const G=ul(j,C.platform.is.ios===!0?120:35);nl(()=>{J()});let r=!1;return al(()=>{r=!0}),ol(()=>{if(r!==!0)return;const n=c();O!==void 0&&n!==void 0&&n!==null&&n.nodeType!==8?ht(n,O,o.virtualScrollHorizontal,C.lang.rtl):Y(s)}),Ue(()=>{G.cancel()}),Object.assign(w,{scrollTo:Y,reset:ue,refresh:ne}),{virtualScrollSliceRange:I,virtualScrollSliceSizeComputed:k,setVirtualScrollSize:J,onVirtualScrollEvt:G,localResetVirtualScroll:te,padVirtualScroll:ge,scrollTo:Y,reset:ue,refresh:ne}}const yt=e=>["add","add-unique","toggle"].includes(e),Kl=".*+?^${}()|[]\\",$l=Object.keys(Qe);var Gl=Se({name:"QSelect",inheritAttrs:!1,props:{...pl,...Dt,...Qe,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:yt},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:String,transitionHide:String,transitionDuration:[String,Number],behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:{type:[Number,String],default:void 0},onNewValue:Function,onFilter:Function},emits:[...bt,"add","remove","inputValue","newValue","keyup","keypress","keydown","filterAbort"],setup(e,{slots:c,emit:i}){const{proxy:y}=Fe(),{$q:x}=y,o=T(!1),B=T(!1),w=T(-1),C=T(""),O=T(!1),s=T(!1);let v=null,V,S,L,M=null,k,K,H,_;const I=T(null),E=T(null),U=T(null),W=T(null),ue=T(null),ne=Kt(e),Y=$t(ot),j=d(()=>Array.isArray(e.options)?e.options.length:0),ae=d(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:ee,virtualScrollSliceSizeComputed:oe,localResetVirtualScroll:te,padVirtualScroll:J,onVirtualScrollEvt:ge,scrollTo:ie,setVirtualScrollSize:G}=Dl({virtualScrollLength:j,getVirtualScrollTarget:Bt,getVirtualScrollEl:nt,virtualScrollItemSizeComputed:ae}),r=Ct(),n=d(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,a=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&V!==void 0?V:[],g=a.map(z=>At(z,u));return e.modelValue===null&&t===!0?g.filter(z=>z!==null):g}return a}),f=d(()=>{const t={};return $l.forEach(a=>{const u=e[a];u!==void 0&&(t[a]=u)}),t}),h=d(()=>e.optionsDark===null?r.isDark.value:e.optionsDark),F=d(()=>dt(n.value)),P=d(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||n.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),q=d(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),m=d(()=>j.value===0),p=d(()=>n.value.map(t=>Q.value(t)).join(", ")),l=d(()=>e.displayValue!==void 0?e.displayValue:p.value),D=d(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),re=d(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||n.value.some(D.value))),de=d(()=>r.focused.value===!0?e.tabindex:-1),Z=d(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":o.value===!0?"true":"false","aria-controls":`${r.targetUid.value}_lb`};return w.value>=0&&(t["aria-activedescendant"]=`${r.targetUid.value}_${w.value}`),t}),ze=d(()=>({id:`${r.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),fe=d(()=>n.value.map((t,a)=>({index:a,opt:t,html:D.value(t),selected:!0,removeAtIndex:_t,toggleOption:ve,tabindex:de.value}))),he=d(()=>{if(j.value===0)return[];const{from:t,to:a}=ee.value;return e.options.slice(t,a).map((u,g)=>{const z=ye.value(u)===!0,A=t+g,R={clickable:!0,active:!1,activeClass:Pe.value,manualFocus:!0,focused:!1,disable:z,tabindex:-1,dense:e.optionsDense,dark:h.value,role:"option",id:`${r.targetUid.value}_${A}`,onClick:()=>{ve(u)}};return z!==!0&&(pe(u)===!0&&(R.active=!0),w.value===A&&(R.focused=!0),R["aria-selected"]=R.active===!0?"true":"false",x.platform.is.desktop===!0&&(R.onMousemove=()=>{o.value===!0&&be(A)})),{index:A,opt:u,html:D.value(u),label:Q.value(u),selected:R.active,focused:R.focused,toggleOption:ve,setOptionIndex:be,itemProps:R}})}),Ie=d(()=>e.dropdownIcon!==void 0?e.dropdownIcon:x.iconSet.arrow.dropdown),_e=d(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Pe=d(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),N=d(()=>He(e.optionValue,"value")),Q=d(()=>He(e.optionLabel,"label")),ye=d(()=>He(e.optionDisable,"disable")),Me=d(()=>n.value.map(t=>N.value(t))),xt=d(()=>{const t={onInput:ot,onChange:Y,onKeydown:ut,onKeyup:tt,onKeypress:lt,onFocus:Ze,onClick(a){S===!0&&Ve(a)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=Y,t});ce(n,t=>{V=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&r.innerLoading.value!==!0&&(B.value!==!0&&o.value!==!0||F.value!==!0)&&(L!==!0&&qe(),(B.value===!0||o.value===!0)&&we(""))},{immediate:!0}),ce(()=>e.fillInput,qe),ce(o,De),ce(j,pt);function Je(t){return e.emitValue===!0?N.value(t):t}function Le(t){if(t>-1&&t<n.value.length)if(e.multiple===!0){const a=e.modelValue.slice();i("remove",{index:t,value:a.splice(t,1)[0]}),i("update:modelValue",a)}else i("update:modelValue",null)}function _t(t){Le(t),r.focus()}function Ge(t,a){const u=Je(t);if(e.multiple!==!0){e.fillInput===!0&&Ae(Q.value(t),!0,!0),i("update:modelValue",u);return}if(n.value.length===0){i("add",{index:0,value:u}),i("update:modelValue",e.multiple===!0?[u]:u);return}if(a===!0&&pe(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const g=e.modelValue.slice();i("add",{index:g.length,value:u}),g.push(u),i("update:modelValue",g)}function ve(t,a){if(r.editable.value!==!0||t===void 0||ye.value(t)===!0)return;const u=N.value(t);if(e.multiple!==!0){a!==!0&&(Ae(e.fillInput===!0?Q.value(t):"",!0,!0),me()),E.value!==null&&E.value.focus(),(n.value.length===0||Be(N.value(n.value[0]),u)!==!0)&&i("update:modelValue",e.emitValue===!0?u:t);return}if((S!==!0||O.value===!0)&&r.focus(),Ze(),n.value.length===0){const A=e.emitValue===!0?u:t;i("add",{index:0,value:A}),i("update:modelValue",e.multiple===!0?[A]:A);return}const g=e.modelValue.slice(),z=Me.value.findIndex(A=>Be(A,u));if(z>-1)i("remove",{index:z,value:g.splice(z,1)[0]});else{if(e.maxValues!==void 0&&g.length>=e.maxValues)return;const A=e.emitValue===!0?u:t;i("add",{index:g.length,value:A}),g.push(A)}i("update:modelValue",g)}function be(t){if(x.platform.is.desktop!==!0)return;const a=t>-1&&t<j.value?t:-1;w.value!==a&&(w.value=a)}function Ee(t=1,a){if(o.value===!0){let u=w.value;do u=gt(u+t,-1,j.value-1);while(u!==-1&&u!==w.value&&ye.value(e.options[u])===!0);w.value!==u&&(be(u),ie(u),a!==!0&&e.useInput===!0&&e.fillInput===!0&&Te(u>=0?Q.value(e.options[u]):k))}}function At(t,a){const u=g=>Be(N.value(g),t);return e.options.find(u)||a.find(u)||t}function He(t,a){const u=t!==void 0?t:a;return typeof u=="function"?u:g=>g!==null&&typeof g=="object"&&u in g?g[u]:g}function pe(t){const a=N.value(t);return Me.value.find(u=>Be(u,a))!==void 0}function Ze(t){e.useInput===!0&&E.value!==null&&(t===void 0||E.value===t.target&&t.target.value===p.value)&&E.value.select()}function et(t){kt(t,27)===!0&&o.value===!0&&(Ve(t),me(),qe()),i("keyup",t)}function tt(t){const{value:a}=t.target;if(t.keyCode!==void 0){et(t);return}if(t.target.value="",v!==null&&(clearTimeout(v),v=null),qe(),typeof a=="string"&&a.length>0){const u=a.toLocaleLowerCase(),g=A=>{const R=e.options.find($=>A.value($).toLocaleLowerCase()===u);return R===void 0?!1:(n.value.indexOf(R)===-1?ve(R):me(),!0)},z=A=>{g(N)!==!0&&(g(Q)===!0||A===!0||we(a,!0,()=>z(!0)))};z()}else r.clearValue(t)}function lt(t){i("keypress",t)}function ut(t){if(i("keydown",t),sl(t)===!0)return;const a=C.value.length>0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(w.value>-1||a===!0);if(t.keyCode===27){$e(t);return}if(t.keyCode===9&&u===!1){Ce();return}if(t.target===void 0||t.target.id!==r.targetUid.value)return;if(t.keyCode===40&&r.innerLoading.value!==!0&&o.value===!1){le(t),ke();return}if(t.keyCode===8&&e.hideSelected!==!0&&C.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?Le(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&i("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof C.value!="string"||C.value.length===0)&&(le(t),w.value=-1,Ee(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&oe.value!==void 0&&(le(t),w.value=Math.max(-1,Math.min(j.value,w.value+(t.keyCode===33?-1:1)*oe.value.view)),Ee(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(le(t),Ee(t.keyCode===38?-1:1,e.multiple));const g=j.value;if((H===void 0||_<Date.now())&&(H=""),g>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||H.length>0)){o.value!==!0&&ke(t);const z=t.key.toLocaleLowerCase(),A=H.length===1&&H[0]===z;_=Date.now()+1500,A===!1&&(le(t),H+=z);const R=new RegExp("^"+H.split("").map(Ke=>Kl.indexOf(Ke)>-1?"\\"+Ke:Ke).join(".*"),"i");let $=w.value;if(A===!0||$<0||R.test(Q.value(e.options[$]))!==!0)do $=gt($+1,-1,g-1);while($!==w.value&&(ye.value(e.options[$])===!0||R.test(Q.value(e.options[$]))!==!0));w.value!==$&&se(()=>{be($),ie($),$>=0&&e.useInput===!0&&e.fillInput===!0&&Te(Q.value(e.options[$]))});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||H!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&le(t),w.value>-1&&w.value<g){ve(e.options[w.value]);return}if(a===!0){const z=(A,R)=>{if(R){if(yt(R)!==!0)return}else R=e.newValueMode;if(A==null)return;Ae("",e.multiple!==!0,!0),(R==="toggle"?ve:Ge)(A,R==="add-unique"),e.multiple!==!0&&(E.value!==null&&E.value.focus(),me())};if(e.onNewValue!==void 0?i("newValue",C.value,z):z(C.value),e.multiple!==!0)return}o.value===!0?Ce():r.innerLoading.value!==!0&&ke()}}function nt(){return S===!0?ue.value:U.value!==null&&U.value.contentEl!==null?U.value.contentEl:void 0}function Bt(){return nt()}function Ot(){return e.hideSelected===!0?[]:c["selected-item"]!==void 0?fe.value.map(t=>c["selected-item"](t)).slice():c.selected!==void 0?[].concat(c.selected()):e.useChips===!0?fe.value.map((t,a)=>b(Ml,{key:"option-"+a,removable:r.editable.value===!0&&ye.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:de.value,onRemove(){t.removeAtIndex(a)}},()=>b("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:Q.value(t.opt)}))):[b("span",{[re.value===!0?"innerHTML":"textContent"]:l.value})]}function at(){if(m.value===!0)return c["no-option"]!==void 0?c["no-option"]({inputValue:C.value}):void 0;const t=c.option!==void 0?c.option:u=>b(El,{key:u.index,...u.itemProps},()=>b(Tl,()=>b(Rl,()=>b("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let a=J("div",he.value.map(t));return c["before-options"]!==void 0&&(a=c["before-options"]().concat(a)),cl(c["after-options"],a)}function Ft(t,a){const u=a===!0?{...Z.value,...r.splitAttrs.attributes.value}:void 0,g={ref:a===!0?E:void 0,key:"i_t",class:P.value,style:e.inputStyle,value:C.value!==void 0?C.value:"",type:"search",...u,id:a===!0?r.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...xt.value};return t!==!0&&S===!0&&(Array.isArray(g.class)===!0?g.class=[...g.class,"no-pointer-events"]:g.class+=" no-pointer-events"),b("input",g)}function ot(t){v!==null&&(clearTimeout(v),v=null),!(t&&t.target&&t.target.qComposing===!0)&&(Te(t.target.value||""),L=!0,k=C.value,r.focused.value!==!0&&(S!==!0||O.value===!0)&&r.focus(),e.onFilter!==void 0&&(v=setTimeout(()=>{v=null,we(C.value)},e.inputDebounce)))}function Te(t){C.value!==t&&(C.value=t,i("inputValue",t))}function Ae(t,a,u){L=u!==!0,e.useInput===!0&&(Te(t),(a===!0||u!==!0)&&(k=t),a!==!0&&we(t))}function we(t,a,u){if(e.onFilter===void 0||a!==!0&&r.focused.value!==!0)return;r.innerLoading.value===!0?i("filterAbort"):(r.innerLoading.value=!0,s.value=!0),t!==""&&e.multiple!==!0&&n.value.length>0&&L!==!0&&t===Q.value(n.value[0])&&(t="");const g=setTimeout(()=>{o.value===!0&&(o.value=!1)},10);M!==null&&clearTimeout(M),M=g,i("filter",t,(z,A)=>{(a===!0||r.focused.value===!0)&&M===g&&(clearTimeout(M),typeof z=="function"&&z(),s.value=!1,se(()=>{r.innerLoading.value=!1,r.editable.value===!0&&(a===!0?o.value===!0&&me():o.value===!0?De(!0):o.value=!0),typeof A=="function"&&se(()=>{A(y)}),typeof u=="function"&&se(()=>{u(y)})}))},()=>{r.focused.value===!0&&M===g&&(clearTimeout(M),r.innerLoading.value=!1,s.value=!1),o.value===!0&&(o.value=!1)})}function zt(){return b(Pl,{ref:U,class:q.value,style:e.popupContentStyle,modelValue:o.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&m.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:h.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,square:_e.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...ze.value,onScrollPassive:ge,onBeforeShow:rt,onBeforeHide:It,onShow:Mt},at)}function It(t){st(t),Ce()}function Mt(){G()}function Et(t){Ve(t),E.value!==null&&E.value.focus(),O.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function Tt(t){Ve(t),se(()=>{O.value=!1})}function Rt(){const t=[b(zl,{class:`col-auto ${r.fieldClass.value}`,...f.value,for:r.targetUid.value,dark:h.value,square:!0,loading:s.value,itemAligned:!1,filled:!0,stackLabel:C.value.length>0,...r.splitAttrs.listeners.value,onFocus:Et,onBlur:Tt},{...c,rawControl:()=>r.getControl(!0),before:void 0,after:void 0})];return o.value===!0&&t.push(b("div",{ref:ue,class:q.value+" scroll",style:e.popupContentStyle,...ze.value,onClick:$e,onScrollPassive:ge},at())),b(Fl,{ref:W,modelValue:B.value,position:e.useInput===!0?"top":void 0,transitionShow:K,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:rt,onBeforeHide:Pt,onHide:Lt,onShow:Ht},()=>b("div",{class:"q-select__dialog"+(h.value===!0?" q-select__dialog--dark q-dark":"")+(O.value===!0?" q-select__dialog--focused":"")},t))}function Pt(t){st(t),W.value!==null&&W.value.__updateRefocusTarget(r.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),r.focused.value=!1}function Lt(t){me(),r.focused.value===!1&&i("blur",t),qe()}function Ht(){const t=document.activeElement;(t===null||t.id!==r.targetUid.value)&&E.value!==null&&E.value!==t&&E.value.focus(),G()}function Ce(){B.value!==!0&&(w.value=-1,o.value===!0&&(o.value=!1),r.focused.value===!1&&(M!==null&&(clearTimeout(M),M=null),r.innerLoading.value===!0&&(i("filterAbort"),r.innerLoading.value=!1,s.value=!1)))}function ke(t){r.editable.value===!0&&(S===!0?(r.onControlFocusin(t),B.value=!0,se(()=>{r.focus()})):r.focus(),e.onFilter!==void 0?we(C.value):(m.value!==!0||c["no-option"]!==void 0)&&(o.value=!0))}function me(){B.value=!1,Ce()}function qe(){e.useInput===!0&&Ae(e.multiple!==!0&&e.fillInput===!0&&n.value.length>0&&Q.value(n.value[0])||"",!0,!0)}function De(t){let a=-1;if(t===!0){if(n.value.length>0){const u=N.value(n.value[0]);a=e.options.findIndex(g=>Be(N.value(g),u))}te(a)}be(a)}function pt(t,a){o.value===!0&&r.innerLoading.value===!1&&(te(-1,!0),se(()=>{o.value===!0&&r.innerLoading.value===!1&&(t>a?te():De(!0))}))}function it(){B.value===!1&&U.value!==null&&U.value.updatePosition()}function rt(t){t!==void 0&&Ve(t),i("popupShow",t),r.hasPopupOpen=!0,r.onControlFocusin(t)}function st(t){t!==void 0&&Ve(t),i("popupHide",t),r.hasPopupOpen=!1,r.onControlFocusout(t)}function ct(){S=x.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?c["no-option"]!==void 0||e.onFilter!==void 0||m.value===!1:!0),K=x.platform.is.ios===!0&&S===!0&&e.useInput===!0?"fade":e.transitionShow}return il(ct),rl(it),ct(),Ue(()=>{v!==null&&clearTimeout(v)}),Object.assign(y,{showPopup:ke,hidePopup:me,removeAtIndex:Le,add:Ge,toggleOption:ve,getOptionIndex:()=>w.value,setOptionIndex:be,moveOptionSelection:Ee,filter:we,updateMenuPosition:it,updateInputValue:Ae,isOptionSelected:pe,getEmittingOptionValue:Je,isOptionDisabled:(...t)=>ye.value.apply(null,t)===!0,getOptionValue:(...t)=>N.value.apply(null,t),getOptionLabel:(...t)=>Q.value.apply(null,t)}),Object.assign(r,{innerValue:n,fieldClass:d(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:I,targetRef:E,hasValue:F,showPopup:ke,floatingLabel:d(()=>e.hideSelected!==!0&&F.value===!0||typeof C.value=="number"||C.value.length>0||dt(e.displayValue)),getControlChild:()=>{if(r.editable.value!==!1&&(B.value===!0||m.value!==!0||c["no-option"]!==void 0))return S===!0?Rt():zt();r.hasPopupOpen===!0&&(r.hasPopupOpen=!1)},controlEvents:{onFocusin(t){r.onControlFocusin(t)},onFocusout(t){r.onControlFocusout(t,()=>{qe(),Ce()})},onClick(t){if($e(t),S!==!0&&o.value===!0){Ce(),E.value!==null&&E.value.focus();return}ke(t)}},getControl:t=>{const a=Ot(),u=t===!0||B.value!==!0||S!==!0;if(e.useInput===!0)a.push(Ft(t,u));else if(r.editable.value===!0){const z=u===!0?Z.value:void 0;a.push(b("input",{ref:u===!0?E:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?r.targetUid.value:void 0,value:l.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...z,onKeydown:ut,onKeyup:et,onKeypress:lt})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length>0&&a.push(b("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:tt}))}if(ne.value!==void 0&&e.disable!==!0&&Me.value.length>0){const z=Me.value.map(A=>b("option",{value:A,selected:!0}));a.push(b("select",{class:"hidden",name:ne.value,multiple:e.multiple},z))}const g=e.useInput===!0||u!==!0?void 0:r.splitAttrs.attributes.value;return b("div",{class:"q-field__native row items-center",...g},a)},getInnerAppend:()=>e.loading!==!0&&s.value!==!0&&e.hideDropdownIcon!==!0?[b(Re,{class:"q-select__dropdown-icon"+(o.value===!0?" rotate-180":""),name:Ie.value})]:null}),wt(r)}});export{Gl as Q,El as a,Tl as b,Rl as c,Pl as d,Dl as e,Jl as f,Ml as g,pl as u};