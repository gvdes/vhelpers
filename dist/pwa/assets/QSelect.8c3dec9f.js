import{u as Qe,a as ht,b as yt,c as bt,d as Lt,e as Dt,f as rt,g as Kt}from"./QInput.f85c5281.js";import{j as Te,ar as $t,as as jt,c as m,at as Nt,k,F as _e,au as Qt,a6 as Ut,m as Pe,z as se,r as T,n as ce,av as Wt,S as Xt,l as Yt,T as Gt,q as Ue,al as Jt,R as Zt,v as el,aw as tl,B as ll,C as ul,A as re,y as nl,ax as ol,E as je,ay as Oe,ac as al,J as ke,H as il,_ as rl}from"./index.bad39945.js";import{u as wt,c as Ct,b as sl}from"./QCard.9d33fcc6.js";import{a as cl,b as dl,Q as fl}from"./QItem.ad6d725e.js";import{u as vl,v as st,a as ml,b as Sl,c as gl,r as ct,s as hl,p as dt,d as yl}from"./position-engine.c09d1507.js";import{u as bl,a as wl,b as Cl,d as Vl,e as kl,f as xl,h as ql,i as Al,j as Ol,r as zl,k as ft,l as Bl,m as Fl,Q as Ml}from"./QDialog.a1998ae0.js";var pl=Te({name:"QField",inheritAttrs:!1,props:Qe,emits:ht,setup(){return yt(bt())}});const Il={xs:8,sm:10,md:14,lg:20,xl:24};var _l=Te({name:"QChip",props:{...wt,...$t,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:o,emit:i}){const{proxy:{$q:f}}=Pe(),x=Ct(e,f),r=jt(e,Il),B=m(()=>e.selected===!0||e.icon!==void 0),y=m(()=>e.selected===!0?e.iconSelected||f.iconSet.chip.selected:e.icon),b=m(()=>e.iconRemove||f.iconSet.chip.remove),F=m(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),c=m(()=>{const V=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(V?` text-${V} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(F.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(x.value===!0?" q-chip--dark q-dark":"")}),h=m(()=>{const V=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},D={...V,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||f.lang.label.remove};return{chip:V,remove:D}});function q(V){V.keyCode===13&&w(V)}function w(V){e.disable||(i("update:selected",!e.selected),i("click",V))}function H(V){(V.keyCode===void 0||V.keyCode===13)&&(se(V),e.disable===!1&&(i("update:modelValue",!1),i("remove")))}function I(){const V=[];F.value===!0&&V.push(k("div",{class:"q-focus-helper"})),B.value===!0&&V.push(k(_e,{class:"q-chip__icon q-chip__icon--left",name:y.value}));const D=e.label!==void 0?[k("div",{class:"ellipsis"},[e.label])]:void 0;return V.push(k("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Qt(o.default,D))),e.iconRight&&V.push(k(_e,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&V.push(k(_e,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:b.value,...h.value.remove,onClick:H,onKeyup:H})),V}return()=>{if(e.modelValue===!1)return;const V={class:c.value,style:r.value};return F.value===!0&&Object.assign(V,h.value.chip,{onClick:w,onKeyup:q}),Nt("div",V,I(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Ut,e.ripple]])}}}),El=Te({name:"QMenu",inheritAttrs:!1,props:{...vl,...bl,...wt,...wl,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:st},self:{type:String,validator:st},offset:{type:Array,validator:ml},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Cl,"click","escapeKey"],setup(e,{slots:o,emit:i,attrs:f}){let x=null,r,B,y;const b=Pe(),{proxy:F}=b,{$q:c}=F,h=T(null),q=T(!1),w=m(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),H=Ct(e,c),{registerTick:I,removeTick:V}=Vl(),{registerTimeout:D}=kl(),{transitionProps:L,transitionStyle:U}=xl(e),{localScrollTarget:M,changeScrollEvent:p,unconfigureScrollTarget:W}=Sl(e,g),{anchorEl:Q,canShow:le}=gl({showing:q}),{hide:ue}=ql({showing:q,canShow:le,handleShow:s,handleHide:n,hideOnRouteChange:w,processOnMount:!0}),{showPortal:Y,hidePortal:j,renderPortal:ne}=Al(b,h,P,"menu"),ee={anchorEl:Q,innerRef:h,onClickOutside(l){if(e.persistent!==!0&&q.value===!0)return ue(l),(l.type==="touchstart"||l.target.classList.contains("q-dialog__backdrop"))&&se(l),!0}},oe=m(()=>dt(e.anchor||(e.cover===!0?"center middle":"bottom start"),c.lang.rtl)),te=m(()=>e.cover===!0?oe.value:dt(e.self||"top start",c.lang.rtl)),G=m(()=>(e.square===!0?" q-menu--square":"")+(H.value===!0?" q-menu--dark q-dark":"")),Se=m(()=>e.autoClose===!0?{onClick:O}:{}),ae=m(()=>q.value===!0&&e.persistent!==!0);ce(ae,l=>{l===!0?(Fl(C),yl(ee)):(ft(C),ct(ee))});function J(){sl(()=>{let l=h.value;l&&l.contains(document.activeElement)!==!0&&(l=l.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||l.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||l.querySelector("[autofocus], [data-autofocus]")||l,l.focus({preventScroll:!0}))})}function s(l){if(x=e.noRefocus===!1?document.activeElement:null,Ol(E),Y(),g(),r=void 0,l!==void 0&&(e.touchPosition||e.contextMenu)){const R=Wt(l);if(R.left!==void 0){const{top:ie,left:de}=Q.value.getBoundingClientRect();r={left:R.left-de,top:R.top-ie}}}B===void 0&&(B=ce(()=>c.screen.width+"|"+c.screen.height+"|"+e.self+"|"+e.anchor+"|"+c.lang.rtl,v)),e.noFocus!==!0&&document.activeElement.blur(),I(()=>{v(),e.noFocus!==!0&&J()}),D(()=>{c.platform.is.ios===!0&&(y=e.autoClose,h.value.click()),v(),Y(!0),i("show",l)},e.transitionDuration)}function n(l){V(),j(),d(!0),x!==null&&(l===void 0||l.qClickOutside!==!0)&&(((l&&l.type.indexOf("key")===0?x.closest('[tabindex]:not([tabindex^="-"])'):void 0)||x).focus(),x=null),D(()=>{j(!0),i("hide",l)},e.transitionDuration)}function d(l){r=void 0,B!==void 0&&(B(),B=void 0),(l===!0||q.value===!0)&&(zl(E),W(),ct(ee),ft(C)),l!==!0&&(x=null)}function g(){(Q.value!==null||e.scrollTarget!==void 0)&&(M.value=Xt(Q.value,e.scrollTarget),p(M.value,v))}function O(l){y!==!0?(Bl(F,l),i("click",l)):y=!1}function E(l){ae.value===!0&&e.noFocus!==!0&&Jt(h.value,l.target)!==!0&&J()}function C(l){i("escapeKey"),ue(l)}function v(){const l=h.value;l===null||Q.value===null||hl({el:l,offset:e.offset,anchorEl:Q.value,anchorOrigin:oe.value,selfOrigin:te.value,absoluteOffset:r,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function P(){return k(Gt,L.value,()=>q.value===!0?k("div",{role:"menu",...f,ref:h,tabindex:-1,class:["q-menu q-position-engine scroll"+G.value,f.class],style:[f.style,U.value],...Se.value},Yt(o.default)):null)}return Ue(d),Object.assign(F,{focus:J,updatePosition:v}),ne}});let Ee=!1;{const e=document.createElement("div");e.setAttribute("dir","rtl"),Object.assign(e.style,{width:"1px",height:"1px",overflow:"auto"});const o=document.createElement("div");Object.assign(o.style,{width:"1000px",height:"1px"}),document.body.appendChild(e),e.appendChild(o),e.scrollLeft=-1e3,Ee=e.scrollLeft>=0,e.remove()}const X=1e3,Tl=["start","center","end","start-force","center-force","end-force"],Vt=Array.prototype.filter,Pl=window.getComputedStyle(document.body).overflowAnchor===void 0?Zt:function(e,o){e!==null&&(e._qOverflowAnimationFrame!==void 0&&cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;e._qOverflowAnimationFrame=void 0;const i=e.children||[];Vt.call(i,x=>x.dataset&&x.dataset.qVsAnchor!==void 0).forEach(x=>{delete x.dataset.qVsAnchor});const f=i[o];f&&f.dataset&&(f.dataset.qVsAnchor="")}))};function xe(e,o){return e+o}function Ne(e,o,i,f,x,r,B,y){const b=e===window?document.scrollingElement||document.documentElement:e,F=x===!0?"offsetWidth":"offsetHeight",c={scrollStart:0,scrollViewSize:-B-y,scrollMaxSize:0,offsetStart:-B,offsetEnd:-y};if(x===!0?(e===window?(c.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,c.scrollViewSize+=document.documentElement.clientWidth):(c.scrollStart=b.scrollLeft,c.scrollViewSize+=b.clientWidth),c.scrollMaxSize=b.scrollWidth,r===!0&&(c.scrollStart=(Ee===!0?c.scrollMaxSize-c.scrollViewSize:0)-c.scrollStart)):(e===window?(c.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,c.scrollViewSize+=document.documentElement.clientHeight):(c.scrollStart=b.scrollTop,c.scrollViewSize+=b.clientHeight),c.scrollMaxSize=b.scrollHeight),i!==null)for(let h=i.previousElementSibling;h!==null;h=h.previousElementSibling)h.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetStart+=h[F]);if(f!==null)for(let h=f.nextElementSibling;h!==null;h=h.nextElementSibling)h.classList.contains("q-virtual-scroll--skip")===!1&&(c.offsetEnd+=h[F]);if(o!==e){const h=b.getBoundingClientRect(),q=o.getBoundingClientRect();x===!0?(c.offsetStart+=q.left-h.left,c.offsetEnd-=q.width):(c.offsetStart+=q.top-h.top,c.offsetEnd-=q.height),e!==window&&(c.offsetStart+=c.scrollStart),c.offsetEnd+=c.scrollMaxSize-c.offsetStart}return c}function vt(e,o,i,f){o==="end"&&(o=(e===window?document.body:e)[i===!0?"scrollWidth":"scrollHeight"]),e===window?i===!0?(f===!0&&(o=(Ee===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-o),window.scrollTo(o,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,o):i===!0?(f===!0&&(o=(Ee===!0?e.scrollWidth-e.offsetWidth:0)-o),e.scrollLeft=o):e.scrollTop=o}function ze(e,o,i,f){if(i>=f)return 0;const x=o.length,r=Math.floor(i/X),B=Math.floor((f-1)/X)+1;let y=e.slice(r,B).reduce(xe,0);return i%X!==0&&(y-=o.slice(r*X,i).reduce(xe,0)),f%X!==0&&f!==x&&(y-=o.slice(f,B*X).reduce(xe,0)),y}const kt={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},Wl=Object.keys(kt),Rl={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...kt};function Hl({virtualScrollLength:e,getVirtualScrollTarget:o,getVirtualScrollEl:i,virtualScrollItemSizeComputed:f}){const x=Pe(),{props:r,emit:B,proxy:y}=x,{$q:b}=y;let F,c,h,q=[],w;const H=T(0),I=T(0),V=T({}),D=T(null),L=T(null),U=T(null),M=T({from:0,to:0}),p=m(()=>r.tableColspan!==void 0?r.tableColspan:100);f===void 0&&(f=m(()=>r.virtualScrollItemSize));const W=m(()=>f.value+";"+r.virtualScrollHorizontal),Q=m(()=>W.value+";"+r.virtualScrollSliceRatioBefore+";"+r.virtualScrollSliceRatioAfter);ce(Q,()=>{G()}),ce(W,le);function le(){te(c,!0)}function ue(n){te(n===void 0?c:n)}function Y(n,d){const g=o();if(g==null||g.nodeType===8)return;const O=Ne(g,i(),D.value,L.value,r.virtualScrollHorizontal,b.lang.rtl,r.virtualScrollStickySizeStart,r.virtualScrollStickySizeEnd);h!==O.scrollViewSize&&G(O.scrollViewSize),ne(g,O,Math.min(e.value-1,Math.max(0,parseInt(n,10)||0)),0,Tl.indexOf(d)>-1?d:c>-1&&n>c?"end":"start")}function j(){const n=o();if(n==null||n.nodeType===8)return;const d=Ne(n,i(),D.value,L.value,r.virtualScrollHorizontal,b.lang.rtl,r.virtualScrollStickySizeStart,r.virtualScrollStickySizeEnd),g=e.value-1,O=d.scrollMaxSize-d.offsetStart-d.offsetEnd-I.value;if(F===d.scrollStart)return;if(d.scrollMaxSize<=0){ne(n,d,0,0);return}h!==d.scrollViewSize&&G(d.scrollViewSize),ee(M.value.from);const E=Math.floor(d.scrollMaxSize-Math.max(d.scrollViewSize,d.offsetEnd)-Math.min(w[g],d.scrollViewSize/2));if(E>0&&Math.ceil(d.scrollStart)>=E){ne(n,d,g,d.scrollMaxSize-d.offsetEnd-q.reduce(xe,0));return}let C=0,v=d.scrollStart-d.offsetStart,P=v;if(v<=O&&v+d.scrollViewSize>=H.value)v-=H.value,C=M.value.from,P=v;else for(let l=0;v>=q[l]&&C<g;l++)v-=q[l],C+=X;for(;v>0&&C<g;)v-=w[C],v>-d.scrollViewSize?(C++,P=v):P=w[C]+v;ne(n,d,C,P)}function ne(n,d,g,O,E){const C=typeof E=="string"&&E.indexOf("-force")>-1,v=C===!0?E.replace("-force",""):E,P=v!==void 0?v:"start";let l=Math.max(0,g-V.value[P]),R=l+V.value.total;R>e.value&&(R=e.value,l=Math.max(0,R-V.value.total)),F=d.scrollStart;const ie=l!==M.value.from||R!==M.value.to;if(ie===!1&&v===void 0){ae(g);return}const{activeElement:de}=document,Z=U.value;ie===!0&&Z!==null&&Z!==de&&Z.contains(de)===!0&&(Z.addEventListener("focusout",oe),setTimeout(()=>{Z!==null&&Z.removeEventListener("focusout",oe)})),Pl(Z,g-l);const Be=v!==void 0?w.slice(l,g).reduce(xe,0):0;if(ie===!0){const fe=R>=M.value.from&&l<=M.value.to?M.value.to:R;M.value={from:l,to:fe},H.value=ze(q,w,0,l),I.value=ze(q,w,R,e.value),requestAnimationFrame(()=>{M.value.to!==R&&F===d.scrollStart&&(M.value={from:M.value.from,to:R},I.value=ze(q,w,R,e.value))})}requestAnimationFrame(()=>{if(F!==d.scrollStart)return;ie===!0&&ee(l);const fe=w.slice(l,g).reduce(xe,0),ge=fe+d.offsetStart+H.value,Fe=ge+w[g];let qe=ge+O;if(v!==void 0){const Re=fe-Be,$=d.scrollStart+Re;qe=C!==!0&&$<ge&&Fe<$+d.scrollViewSize?$:v==="end"?Fe-d.scrollViewSize:ge-(v==="start"?0:Math.round((d.scrollViewSize-w[g])/2))}F=qe,vt(n,qe,r.virtualScrollHorizontal,b.lang.rtl),ae(g)})}function ee(n){const d=U.value;if(d){const g=Vt.call(d.children,l=>l.classList&&l.classList.contains("q-virtual-scroll--skip")===!1),O=g.length,E=r.virtualScrollHorizontal===!0?l=>l.getBoundingClientRect().width:l=>l.offsetHeight;let C=n,v,P;for(let l=0;l<O;){for(v=E(g[l]),l++;l<O&&g[l].classList.contains("q-virtual-scroll--with-prev")===!0;)v+=E(g[l]),l++;P=v-w[C],P!==0&&(w[C]+=P,q[Math.floor(C/X)]+=P),C++}}}function oe(){U.value!==null&&U.value!==void 0&&U.value.focus()}function te(n,d){const g=1*f.value;(d===!0||Array.isArray(w)===!1)&&(w=[]);const O=w.length;w.length=e.value;for(let C=e.value-1;C>=O;C--)w[C]=g;const E=Math.floor((e.value-1)/X);q=[];for(let C=0;C<=E;C++){let v=0;const P=Math.min((C+1)*X,e.value);for(let l=C*X;l<P;l++)v+=w[l];q.push(v)}c=-1,F=void 0,H.value=ze(q,w,0,M.value.from),I.value=ze(q,w,M.value.to,e.value),n>=0?(ee(M.value.from),re(()=>{Y(n)})):J()}function G(n){if(n===void 0&&typeof window!="undefined"){const v=o();v!=null&&v.nodeType!==8&&(n=Ne(v,i(),D.value,L.value,r.virtualScrollHorizontal,b.lang.rtl,r.virtualScrollStickySizeStart,r.virtualScrollStickySizeEnd).scrollViewSize)}h=n;const d=parseFloat(r.virtualScrollSliceRatioBefore)||0,g=parseFloat(r.virtualScrollSliceRatioAfter)||0,O=1+d+g,E=n===void 0||n<=0?1:Math.ceil(n/f.value),C=Math.max(1,E,Math.ceil((r.virtualScrollSliceSize>0?r.virtualScrollSliceSize:10)/O));V.value={total:Math.ceil(C*O),start:Math.ceil(C*d),center:Math.ceil(C*(.5+d)),end:Math.ceil(C*(1+d)),view:E}}function Se(n,d){const g=r.virtualScrollHorizontal===!0?"width":"height",O={["--q-virtual-scroll-item-"+g]:f.value+"px"};return[n==="tbody"?k(n,{class:"q-virtual-scroll__padding",key:"before",ref:D},[k("tr",[k("td",{style:{[g]:`${H.value}px`,...O},colspan:p.value})])]):k(n,{class:"q-virtual-scroll__padding",key:"before",ref:D,style:{[g]:`${H.value}px`,...O}}),k(n,{class:"q-virtual-scroll__content",key:"content",ref:U,tabindex:-1},d.flat()),n==="tbody"?k(n,{class:"q-virtual-scroll__padding",key:"after",ref:L},[k("tr",[k("td",{style:{[g]:`${I.value}px`,...O},colspan:p.value})])]):k(n,{class:"q-virtual-scroll__padding",key:"after",ref:L,style:{[g]:`${I.value}px`,...O}})]}function ae(n){c!==n&&(r.onVirtualScroll!==void 0&&B("virtualScroll",{index:n,from:M.value.from,to:M.value.to-1,direction:n<c?"decrease":"increase",ref:y}),c=n)}G();const J=el(j,b.platform.is.ios===!0?120:35);tl(()=>{G()});let s=!1;return ll(()=>{s=!0}),ul(()=>{if(s!==!0)return;const n=o();F!==void 0&&n!==void 0&&n!==null&&n.nodeType!==8?vt(n,F,r.virtualScrollHorizontal,b.lang.rtl):Y(c)}),Ue(()=>{J.cancel()}),Object.assign(y,{scrollTo:Y,reset:le,refresh:ue}),{virtualScrollSliceRange:M,virtualScrollSliceSizeComputed:V,setVirtualScrollSize:G,onVirtualScrollEvt:J,localResetVirtualScroll:te,padVirtualScroll:Se,scrollTo:Y,reset:le,refresh:ue}}const mt=["B","KB","MB","GB","TB","PB"];function Xl(e){let o=0;for(;parseInt(e,10)>=1024&&o<mt.length-1;)e/=1024,++o;return`${e.toFixed(1)}${mt[o]}`}function Yl(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Gl(e,o,i){return i<=o?o:Math.min(i,Math.max(o,e))}function St(e,o,i){if(i<=o)return o;const f=i-o+1;let x=o+(e-o)%f;return x<o&&(x=f+x),x===0?0:x}function Jl(e,o=2,i="0"){if(e==null)return e;const f=""+e;return f.length>=o?f:new Array(o-f.length+1).join(i)+f}const gt=e=>["add","add-unique","toggle"].includes(e),Ll=".*+?^${}()|[]\\",Dl=Object.keys(Qe);var Zl=Te({name:"QSelect",inheritAttrs:!1,props:{...Rl,...Lt,...Qe,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:gt},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:String,transitionHide:String,transitionDuration:[String,Number],behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:{type:[Number,String],default:void 0},onNewValue:Function,onFilter:Function},emits:[...ht,"add","remove","inputValue","newValue","keyup","keypress","keydown","filterAbort"],setup(e,{slots:o,emit:i}){const{proxy:f}=Pe(),{$q:x}=f,r=T(!1),B=T(!1),y=T(-1),b=T(""),F=T(!1),c=T(!1);let h=null,q,w,H,I=null,V,D,L,U;const M=T(null),p=T(null),W=T(null),Q=T(null),le=T(null),ue=Dt(e),Y=Kt(ut),j=m(()=>Array.isArray(e.options)?e.options.length:0),ne=m(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:ee,virtualScrollSliceSizeComputed:oe,localResetVirtualScroll:te,padVirtualScroll:G,onVirtualScrollEvt:Se,scrollTo:ae,setVirtualScrollSize:J}=Hl({virtualScrollLength:j,getVirtualScrollTarget:Ot,getVirtualScrollEl:tt,virtualScrollItemSizeComputed:ne}),s=bt(),n=m(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,a=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&q!==void 0?q:[],S=a.map(z=>At(z,u));return e.modelValue===null&&t===!0?S.filter(z=>z!==null):S}return a}),d=m(()=>{const t={};return Dl.forEach(a=>{const u=e[a];u!==void 0&&(t[a]=u)}),t}),g=m(()=>e.optionsDark===null?s.isDark.value:e.optionsDark),O=m(()=>rt(n.value)),E=m(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||n.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),C=m(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),v=m(()=>j.value===0),P=m(()=>n.value.map(t=>N.value(t)).join(", ")),l=m(()=>e.displayValue!==void 0?e.displayValue:P.value),R=m(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),ie=m(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||n.value.some(R.value))),de=m(()=>s.focused.value===!0?e.tabindex:-1),Z=m(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-readonly":e.readonly===!0?"true":"false","aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":r.value===!0?"true":"false","aria-controls":`${s.targetUid.value}_lb`};return y.value>=0&&(t["aria-activedescendant"]=`${s.targetUid.value}_${y.value}`),t}),Be=m(()=>({id:`${s.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"})),fe=m(()=>n.value.map((t,a)=>({index:a,opt:t,html:R.value(t),selected:!0,removeAtIndex:qt,toggleOption:ve,tabindex:de.value}))),ge=m(()=>{if(j.value===0)return[];const{from:t,to:a}=ee.value;return e.options.slice(t,a).map((u,S)=>{const z=he.value(u)===!0,A=t+S,_={clickable:!0,active:!1,activeClass:Re.value,manualFocus:!0,focused:!1,disable:z,tabindex:-1,dense:e.optionsDense,dark:g.value,role:"option",id:`${s.targetUid.value}_${A}`,onClick:()=>{ve(u)}};return z!==!0&&(De(u)===!0&&(_.active=!0),y.value===A&&(_.focused=!0),_["aria-selected"]=_.active===!0?"true":"false",x.platform.is.desktop===!0&&(_.onMousemove=()=>{r.value===!0&&ye(A)})),{index:A,opt:u,html:R.value(u),label:N.value(u),selected:_.active,focused:_.focused,toggleOption:ve,setOptionIndex:ye,itemProps:_}})}),Fe=m(()=>e.dropdownIcon!==void 0?e.dropdownIcon:x.iconSet.arrow.dropdown),qe=m(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Re=m(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),$=m(()=>Le(e.optionValue,"value")),N=m(()=>Le(e.optionLabel,"label")),he=m(()=>Le(e.optionDisable,"disable")),Me=m(()=>n.value.map(t=>$.value(t))),xt=m(()=>{const t={onInput:ut,onChange:Y,onKeydown:et,onKeyup:Je,onKeypress:Ze,onFocus:Ye,onClick(a){w===!0&&ke(a)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=Y,t});ce(n,t=>{q=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&s.innerLoading.value!==!0&&(B.value!==!0&&r.value!==!0||O.value!==!0)&&(H!==!0&&Ve(),(B.value===!0||r.value===!0)&&be(""))},{immediate:!0}),ce(()=>e.fillInput,Ve),ce(r,Ke),ce(j,Ht);function We(t){return e.emitValue===!0?$.value(t):t}function He(t){if(t>-1&&t<n.value.length)if(e.multiple===!0){const a=e.modelValue.slice();i("remove",{index:t,value:a.splice(t,1)[0]}),i("update:modelValue",a)}else i("update:modelValue",null)}function qt(t){He(t),s.focus()}function Xe(t,a){const u=We(t);if(e.multiple!==!0){e.fillInput===!0&&Ae(N.value(t),!0,!0),i("update:modelValue",u);return}if(n.value.length===0){i("add",{index:0,value:u}),i("update:modelValue",e.multiple===!0?[u]:u);return}if(a===!0&&De(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const S=e.modelValue.slice();i("add",{index:S.length,value:u}),S.push(u),i("update:modelValue",S)}function ve(t,a){if(s.editable.value!==!0||t===void 0||he.value(t)===!0)return;const u=$.value(t);if(e.multiple!==!0){a!==!0&&(Ae(e.fillInput===!0?N.value(t):"",!0,!0),me()),p.value!==null&&p.value.focus(),(n.value.length===0||Oe($.value(n.value[0]),u)!==!0)&&i("update:modelValue",e.emitValue===!0?u:t);return}if((w!==!0||F.value===!0)&&s.focus(),Ye(),n.value.length===0){const A=e.emitValue===!0?u:t;i("add",{index:0,value:A}),i("update:modelValue",e.multiple===!0?[A]:A);return}const S=e.modelValue.slice(),z=Me.value.findIndex(A=>Oe(A,u));if(z>-1)i("remove",{index:z,value:S.splice(z,1)[0]});else{if(e.maxValues!==void 0&&S.length>=e.maxValues)return;const A=e.emitValue===!0?u:t;i("add",{index:S.length,value:A}),S.push(A)}i("update:modelValue",S)}function ye(t){if(x.platform.is.desktop!==!0)return;const a=t>-1&&t<j.value?t:-1;y.value!==a&&(y.value=a)}function pe(t=1,a){if(r.value===!0){let u=y.value;do u=St(u+t,-1,j.value-1);while(u!==-1&&u!==y.value&&he.value(e.options[u])===!0);y.value!==u&&(ye(u),ae(u),a!==!0&&e.useInput===!0&&e.fillInput===!0&&Ie(u>=0?N.value(e.options[u]):V))}}function At(t,a){const u=S=>Oe($.value(S),t);return e.options.find(u)||a.find(u)||t}function Le(t,a){const u=t!==void 0?t:a;return typeof u=="function"?u:S=>S!==null&&typeof S=="object"&&u in S?S[u]:S}function De(t){const a=$.value(t);return Me.value.find(u=>Oe(u,a))!==void 0}function Ye(t){e.useInput===!0&&p.value!==null&&(t===void 0||p.value===t.target&&t.target.value===P.value)&&p.value.select()}function Ge(t){al(t,27)===!0&&r.value===!0&&(ke(t),me(),Ve()),i("keyup",t)}function Je(t){const{value:a}=t.target;if(t.keyCode!==void 0){Ge(t);return}if(t.target.value="",h!==null&&(clearTimeout(h),h=null),Ve(),typeof a=="string"&&a.length>0){const u=a.toLocaleLowerCase(),S=A=>{const _=e.options.find(K=>A.value(K).toLocaleLowerCase()===u);return _===void 0?!1:(n.value.indexOf(_)===-1?ve(_):me(),!0)},z=A=>{S($)!==!0&&(S(N)===!0||A===!0||be(a,!0,()=>z(!0)))};z()}else s.clearValue(t)}function Ze(t){i("keypress",t)}function et(t){if(i("keydown",t),il(t)===!0)return;const a=b.value.length>0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(y.value>-1||a===!0);if(t.keyCode===27){je(t);return}if(t.keyCode===9&&u===!1){we();return}if(t.target===void 0||t.target.id!==s.targetUid.value)return;if(t.keyCode===40&&s.innerLoading.value!==!0&&r.value===!1){se(t),Ce();return}if(t.keyCode===8&&e.hideSelected!==!0&&b.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?He(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&i("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof b.value!="string"||b.value.length===0)&&(se(t),y.value=-1,pe(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&oe.value!==void 0&&(se(t),y.value=Math.max(-1,Math.min(j.value,y.value+(t.keyCode===33?-1:1)*oe.value.view)),pe(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(se(t),pe(t.keyCode===38?-1:1,e.multiple));const S=j.value;if((L===void 0||U<Date.now())&&(L=""),S>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===!1&&t.ctrlKey===!1&&t.metaKey===!1&&(t.keyCode!==32||L.length>0)){r.value!==!0&&Ce(t);const z=t.key.toLocaleLowerCase(),A=L.length===1&&L[0]===z;U=Date.now()+1500,A===!1&&(se(t),L+=z);const _=new RegExp("^"+L.split("").map($e=>Ll.indexOf($e)>-1?"\\"+$e:$e).join(".*"),"i");let K=y.value;if(A===!0||K<0||_.test(N.value(e.options[K]))!==!0)do K=St(K+1,-1,S-1);while(K!==y.value&&(he.value(e.options[K])===!0||_.test(N.value(e.options[K]))!==!0));y.value!==K&&re(()=>{ye(K),ae(K),K>=0&&e.useInput===!0&&e.fillInput===!0&&Ie(N.value(e.options[K]))});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||L!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&se(t),y.value>-1&&y.value<S){ve(e.options[y.value]);return}if(a===!0){const z=(A,_)=>{if(_){if(gt(_)!==!0)return}else _=e.newValueMode;if(A==null)return;Ae("",e.multiple!==!0,!0),(_==="toggle"?ve:Xe)(A,_==="add-unique"),e.multiple!==!0&&(p.value!==null&&p.value.focus(),me())};if(e.onNewValue!==void 0?i("newValue",b.value,z):z(b.value),e.multiple!==!0)return}r.value===!0?we():s.innerLoading.value!==!0&&Ce()}}function tt(){return w===!0?le.value:W.value!==null&&W.value.contentEl!==null?W.value.contentEl:void 0}function Ot(){return tt()}function zt(){return e.hideSelected===!0?[]:o["selected-item"]!==void 0?fe.value.map(t=>o["selected-item"](t)).slice():o.selected!==void 0?[].concat(o.selected()):e.useChips===!0?fe.value.map((t,a)=>k(_l,{key:"option-"+a,removable:s.editable.value===!0&&he.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:de.value,onRemove(){t.removeAtIndex(a)}},()=>k("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:N.value(t.opt)}))):[k("span",{[ie.value===!0?"innerHTML":"textContent"]:l.value})]}function lt(){if(v.value===!0)return o["no-option"]!==void 0?o["no-option"]({inputValue:b.value}):void 0;const t=o.option!==void 0?o.option:u=>k(fl,{key:u.index,...u.itemProps},()=>k(cl,()=>k(dl,()=>k("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let a=G("div",ge.value.map(t));return o["before-options"]!==void 0&&(a=o["before-options"]().concat(a)),rl(o["after-options"],a)}function Bt(t,a){const u=a===!0?{...Z.value,...s.splitAttrs.attributes.value}:void 0,S={ref:a===!0?p:void 0,key:"i_t",class:E.value,style:e.inputStyle,value:b.value!==void 0?b.value:"",type:"search",...u,id:a===!0?s.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t===!0||e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...xt.value};return t!==!0&&w===!0&&(Array.isArray(S.class)===!0?S.class=[...S.class,"no-pointer-events"]:S.class+=" no-pointer-events"),k("input",S)}function ut(t){h!==null&&(clearTimeout(h),h=null),!(t&&t.target&&t.target.qComposing===!0)&&(Ie(t.target.value||""),H=!0,V=b.value,s.focused.value!==!0&&(w!==!0||F.value===!0)&&s.focus(),e.onFilter!==void 0&&(h=setTimeout(()=>{h=null,be(b.value)},e.inputDebounce)))}function Ie(t){b.value!==t&&(b.value=t,i("inputValue",t))}function Ae(t,a,u){H=u!==!0,e.useInput===!0&&(Ie(t),(a===!0||u!==!0)&&(V=t),a!==!0&&be(t))}function be(t,a,u){if(e.onFilter===void 0||a!==!0&&s.focused.value!==!0)return;s.innerLoading.value===!0?i("filterAbort"):(s.innerLoading.value=!0,c.value=!0),t!==""&&e.multiple!==!0&&n.value.length>0&&H!==!0&&t===N.value(n.value[0])&&(t="");const S=setTimeout(()=>{r.value===!0&&(r.value=!1)},10);I!==null&&clearTimeout(I),I=S,i("filter",t,(z,A)=>{(a===!0||s.focused.value===!0)&&I===S&&(clearTimeout(I),typeof z=="function"&&z(),c.value=!1,re(()=>{s.innerLoading.value=!1,s.editable.value===!0&&(a===!0?r.value===!0&&me():r.value===!0?Ke(!0):r.value=!0),typeof A=="function"&&re(()=>{A(f)}),typeof u=="function"&&re(()=>{u(f)})}))},()=>{s.focused.value===!0&&I===S&&(clearTimeout(I),s.innerLoading.value=!1,c.value=!1),r.value===!0&&(r.value=!1)})}function Ft(){return k(El,{ref:W,class:C.value,style:e.popupContentStyle,modelValue:r.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&v.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:g.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,square:qe.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...Be.value,onScrollPassive:Se,onBeforeShow:ot,onBeforeHide:Mt,onShow:pt},lt)}function Mt(t){at(t),we()}function pt(){J()}function It(t){ke(t),p.value!==null&&p.value.focus(),F.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function _t(t){ke(t),re(()=>{F.value=!1})}function Et(){const t=[k(pl,{class:`col-auto ${s.fieldClass.value}`,...d.value,for:s.targetUid.value,dark:g.value,square:!0,loading:c.value,itemAligned:!1,filled:!0,stackLabel:b.value.length>0,...s.splitAttrs.listeners.value,onFocus:It,onBlur:_t},{...o,rawControl:()=>s.getControl(!0),before:void 0,after:void 0})];return r.value===!0&&t.push(k("div",{ref:le,class:C.value+" scroll",style:e.popupContentStyle,...Be.value,onClick:je,onScrollPassive:Se},lt())),k(Ml,{ref:Q,modelValue:B.value,position:e.useInput===!0?"top":void 0,transitionShow:D,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:ot,onBeforeHide:Tt,onHide:Pt,onShow:Rt},()=>k("div",{class:"q-select__dialog"+(g.value===!0?" q-select__dialog--dark q-dark":"")+(F.value===!0?" q-select__dialog--focused":"")},t))}function Tt(t){at(t),Q.value!==null&&Q.value.__updateRefocusTarget(s.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),s.focused.value=!1}function Pt(t){me(),s.focused.value===!1&&i("blur",t),Ve()}function Rt(){const t=document.activeElement;(t===null||t.id!==s.targetUid.value)&&p.value!==null&&p.value!==t&&p.value.focus(),J()}function we(){B.value!==!0&&(y.value=-1,r.value===!0&&(r.value=!1),s.focused.value===!1&&(I!==null&&(clearTimeout(I),I=null),s.innerLoading.value===!0&&(i("filterAbort"),s.innerLoading.value=!1,c.value=!1)))}function Ce(t){s.editable.value===!0&&(w===!0?(s.onControlFocusin(t),B.value=!0,re(()=>{s.focus()})):s.focus(),e.onFilter!==void 0?be(b.value):(v.value!==!0||o["no-option"]!==void 0)&&(r.value=!0))}function me(){B.value=!1,we()}function Ve(){e.useInput===!0&&Ae(e.multiple!==!0&&e.fillInput===!0&&n.value.length>0&&N.value(n.value[0])||"",!0,!0)}function Ke(t){let a=-1;if(t===!0){if(n.value.length>0){const u=$.value(n.value[0]);a=e.options.findIndex(S=>Oe($.value(S),u))}te(a)}ye(a)}function Ht(t,a){r.value===!0&&s.innerLoading.value===!1&&(te(-1,!0),re(()=>{r.value===!0&&s.innerLoading.value===!1&&(t>a?te():Ke(!0))}))}function nt(){B.value===!1&&W.value!==null&&W.value.updatePosition()}function ot(t){t!==void 0&&ke(t),i("popupShow",t),s.hasPopupOpen=!0,s.onControlFocusin(t)}function at(t){t!==void 0&&ke(t),i("popupHide",t),s.hasPopupOpen=!1,s.onControlFocusout(t)}function it(){w=x.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?o["no-option"]!==void 0||e.onFilter!==void 0||v.value===!1:!0),D=x.platform.is.ios===!0&&w===!0&&e.useInput===!0?"fade":e.transitionShow}return nl(it),ol(nt),it(),Ue(()=>{h!==null&&clearTimeout(h)}),Object.assign(f,{showPopup:Ce,hidePopup:me,removeAtIndex:He,add:Xe,toggleOption:ve,getOptionIndex:()=>y.value,setOptionIndex:ye,moveOptionSelection:pe,filter:be,updateMenuPosition:nt,updateInputValue:Ae,isOptionSelected:De,getEmittingOptionValue:We,isOptionDisabled:(...t)=>he.value.apply(null,t)===!0,getOptionValue:(...t)=>$.value.apply(null,t),getOptionLabel:(...t)=>N.value.apply(null,t)}),Object.assign(s,{innerValue:n,fieldClass:m(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:M,targetRef:p,hasValue:O,showPopup:Ce,floatingLabel:m(()=>e.hideSelected!==!0&&O.value===!0||typeof b.value=="number"||b.value.length>0||rt(e.displayValue)),getControlChild:()=>{if(s.editable.value!==!1&&(B.value===!0||v.value!==!0||o["no-option"]!==void 0))return w===!0?Et():Ft();s.hasPopupOpen===!0&&(s.hasPopupOpen=!1)},controlEvents:{onFocusin(t){s.onControlFocusin(t)},onFocusout(t){s.onControlFocusout(t,()=>{Ve(),we()})},onClick(t){if(je(t),w!==!0&&r.value===!0){we(),p.value!==null&&p.value.focus();return}Ce(t)}},getControl:t=>{const a=zt(),u=t===!0||B.value!==!0||w!==!0;if(e.useInput===!0)a.push(Bt(t,u));else if(s.editable.value===!0){const z=u===!0?Z.value:void 0;a.push(k("input",{ref:u===!0?p:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?s.targetUid.value:void 0,value:l.value,readonly:!0,"data-autofocus":t===!0||e.autofocus===!0||void 0,...z,onKeydown:et,onKeyup:Ge,onKeypress:Ze})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length>0&&a.push(k("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,tabindex:-1,onKeyup:Je}))}if(ue.value!==void 0&&e.disable!==!0&&Me.value.length>0){const z=Me.value.map(A=>k("option",{value:A,selected:!0}));a.push(k("select",{class:"hidden",name:ue.value,multiple:e.multiple},z))}const S=e.useInput===!0||u!==!0?void 0:s.splitAttrs.attributes.value;return k("div",{class:"q-field__native row items-center",...S},a)},getInnerAppend:()=>e.loading!==!0&&c.value!==!0&&e.hideDropdownIcon!==!0?[k(_e,{class:"q-select__dropdown-icon"+(r.value===!0?" rotate-180":""),name:Fe.value})]:null}),yt(s)}});export{Zl as Q,El as a,Hl as b,Wl as c,Gl as d,Yl as e,_l as f,Xl as h,Jl as p,Ee as r,Rl as u};