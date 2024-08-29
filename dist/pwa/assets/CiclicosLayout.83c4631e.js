import{e as it,Q as Be}from"./position-engine.76b8e37f.js";import{n as ye,r as q,c as w,y as He,x as ut,p as ct,a2 as dt,a6 as vt,k as D,az as We,O as ae,ab as ft,X as mt,U as oe,J as pt,m as ce,ay as bt,j as de,v as J,R as ht,S as gt,l as ve,q as yt,aa as wt,Y as Z,z as _t,aA as Ct,ap as se,aB as we,av as Ee,aq as _e,W as kt,aC as Tt,F as xt,aD as St,at as qt,o as z,g as ie,a as ke,w as E,e as k,i as Q,a4 as G,f as N,Q as ue,a3 as ne,a1 as De,a0 as Pt,h as Te,aE as Lt,u as At,aF as Rt}from"./index.ede7f7c0.js";import{r as Mt,Q as $t,a as It}from"./QSelect.f4326807.js";import{h as Bt,Q as Et}from"./QInput.ed352046.js";import{Q as Dt}from"./QForm.73e2418f.js";import{Q as Qt}from"./axios.02b62974.js";import{_ as Vt,Q as jt}from"./UserToolbar.d70408ba.js";import{Q as ze}from"./QTable.260a55e2.js";import{f as Ut,u as Ft,e as Nt,b as Qe,a as xe,Q as Ot,c as Yt}from"./QLayout.847b8aa1.js";import{d as Ce,e as Ve,Q as Ht}from"./QDialog.a422d261.js";import{Q as Wt}from"./QPage.f501daa6.js";import{u as zt}from"./use-quasar.81f4fe91.js";import{d as ee}from"./dayjs.min.25545ff6.js";import{v as je}from"./axios.1a21dc44.js";import{u as Kt}from"./VDB.45cddf73.js";import{g as Ue,s as Fe}from"./touch.70a9dd44.js";import{u as Xt}from"./use-cache.b0833c75.js";import{E as Gt}from"./exceljs.min.9e24d01d.js";import{c as te}from"./_commonjsHelpers.88e99c8f.js";import"./QItem.d6657750.js";import"./QList.9a05507e.js";import"./QLinearProgress.c46c8781.js";import"./QCheckbox.4d98ec23.js";var Ke={index({dateranges:e,view:c,store:p}){let d=c.id;return e.to,e.from,je.get(`/ciclicos?v=${d}&store=${p}`).then(l=>l.data).catch(l=>({fail:l}))},find(e,c){return je.get(`/ciclicos/${e}?store=${c}`).then(p=>p.data).catch(p=>({fail:p}))}};let Jt=0;const Zt=["click","keydown"],ea={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Jt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function ta(e,c,p,d){const l=ct(We,ye);if(l===ye)return console.error("QTab/QRouteTab component needs to be child of QTabs"),ye;const{proxy:t}=ce(),n=q(null),h=q(null),A=q(null),v=w(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),o=w(()=>l.currentModel.value===e.name),T=w(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(o.value===!0?" q-tab--active"+(l.tabProps.value.activeClass?" "+l.tabProps.value.activeClass:"")+(l.tabProps.value.activeColor?` text-${l.tabProps.value.activeColor}`:"")+(l.tabProps.value.activeBgColor?` bg-${l.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&l.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||l.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(d!==void 0?d.linkClass.value:"")),r=w(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(l.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),m=w(()=>e.disable===!0||l.hasFocus.value===!0||o.value===!1&&l.hasActiveTab.value===!0?-1:e.tabindex||0);function L(s,i){if(i!==!0&&n.value!==null&&n.value.focus(),e.disable===!0){d!==void 0&&d.hasRouterLink.value===!0&&ae(s);return}if(d===void 0){l.updateModel({name:e.name}),p("click",s);return}if(d.hasRouterLink.value===!0){const f=(_={})=>{let $;const V=_.to===void 0||bt(_.to,e.to)===!0?l.avoidRouteWatcher=Bt():null;return d.navigateToRouterLink(s,{..._,returnRouterError:!0}).catch(F=>{$=F}).then(F=>{if(V===l.avoidRouteWatcher&&(l.avoidRouteWatcher=!1,$===void 0&&(F===void 0||F.message.startsWith("Avoided redundant navigation")===!0)&&l.updateModel({name:e.name})),_.returnRouterError===!0)return $!==void 0?Promise.reject($):F})};p("click",s,f),s.defaultPrevented!==!0&&f();return}p("click",s)}function I(s){ft(s,[13,32])?L(s,!0):mt(s)!==!0&&s.keyCode>=35&&s.keyCode<=40&&s.altKey!==!0&&s.metaKey!==!0&&l.onKbdNavigate(s.keyCode,t.$el)===!0&&ae(s),p("keydown",s)}function B(){const s=l.tabProps.value.narrowIndicator,i=[],f=D("div",{ref:A,class:["q-tab__indicator",l.tabProps.value.indicatorClass]});e.icon!==void 0&&i.push(D(oe,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&i.push(D("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&i.push(e.alertIcon!==void 0?D(oe,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):D("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),s===!0&&i.push(f);const _=[D("div",{class:"q-focus-helper",tabindex:-1,ref:n}),D("div",{class:r.value},pt(c.default,i))];return s===!1&&_.push(f),_}const y={name:w(()=>e.name),rootRef:h,tabIndicatorRef:A,routeData:d};He(()=>{l.unregisterTab(y)}),ut(()=>{l.registerTab(y)});function x(s,i){const f={ref:h,class:T.value,tabindex:m.value,role:"tab","aria-selected":o.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:L,onKeydown:I,...i};return dt(D(s,f,B()),[[vt,v.value]])}return{renderTab:x,$tabs:l}}var Ne=de({name:"QTab",props:ea,emits:Zt,setup(e,{slots:c,emit:p}){const{renderTab:d}=ta(e,c,p);return()=>d("div")}});function aa(e,c,p){const d=p===!0?["left","right"]:["top","bottom"];return`absolute-${c===!0?d[0]:d[1]}${e?` text-${e}`:""}`}const na=["left","center","right","justify"];var oa=de({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>na.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:c,emit:p}){const{proxy:d}=ce(),{$q:l}=d,{registerTick:t}=Ce(),{registerTick:n}=Ce(),{registerTick:h}=Ce(),{registerTimeout:A,removeTimeout:v}=Ve(),{registerTimeout:o,removeTimeout:T}=Ve(),r=q(null),m=q(null),L=q(e.modelValue),I=q(!1),B=q(!0),y=q(!1),x=q(!1),s=[],i=q(0),f=q(!1);let _=null,$=null,V;const F=w(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:aa(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),fe=w(()=>{const a=i.value,u=L.value;for(let b=0;b<a;b++)if(s[b].name.value===u)return!0;return!1}),me=w(()=>`q-tabs__content--align-${I.value===!0?"left":x.value===!0?"justify":e.align}`),pe=w(()=>`q-tabs row no-wrap items-center q-tabs--${I.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),g=w(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+me.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),P=w(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),U=w(()=>e.vertical!==!0&&l.lang.rtl===!0),Y=w(()=>Mt===!1&&U.value===!0);J(U,X),J(()=>e.modelValue,a=>{be({name:a,setCurrent:!0,skipEmit:!0})}),J(()=>e.outsideArrows,le);function be({name:a,setCurrent:u,skipEmit:b}){L.value!==a&&(b!==!0&&e["onUpdate:modelValue"]!==void 0&&p("update:modelValue",a),(u===!0||e["onUpdate:modelValue"]===void 0)&&(Ge(L.value,a),L.value=a))}function le(){t(()=>{Se({width:r.value.offsetWidth,height:r.value.offsetHeight})})}function Se(a){if(P.value===void 0||m.value===null)return;const u=a[P.value.container],b=Math.min(m.value[P.value.scroll],Array.prototype.reduce.call(m.value.children,(M,S)=>M+(S[P.value.content]||0),0)),R=u>0&&b>u;I.value=R,R===!0&&n(X),x.value=u<parseInt(e.breakpoint,10)}function Ge(a,u){const b=a!=null&&a!==""?s.find(M=>M.name.value===a):null,R=u!=null&&u!==""?s.find(M=>M.name.value===u):null;if(b&&R){const M=b.tabIndicatorRef.value,S=R.tabIndicatorRef.value;_!==null&&(clearTimeout(_),_=null),M.style.transition="none",M.style.transform="none",S.style.transition="none",S.style.transform="none";const C=M.getBoundingClientRect(),j=S.getBoundingClientRect();S.style.transform=e.vertical===!0?`translate3d(0,${C.top-j.top}px,0) scale3d(1,${j.height?C.height/j.height:1},1)`:`translate3d(${C.left-j.left}px,0,0) scale3d(${j.width?C.width/j.width:1},1,1)`,h(()=>{_=setTimeout(()=>{_=null,S.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",S.style.transform="none"},70)})}R&&I.value===!0&&K(R.rootRef.value)}function K(a){const{left:u,width:b,top:R,height:M}=m.value.getBoundingClientRect(),S=a.getBoundingClientRect();let C=e.vertical===!0?S.top-R:S.left-u;if(C<0){m.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(C),X();return}C+=e.vertical===!0?S.height-M:S.width-b,C>0&&(m.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(C),X())}function X(){const a=m.value;if(a===null)return;const u=a.getBoundingClientRect(),b=e.vertical===!0?a.scrollTop:Math.abs(a.scrollLeft);U.value===!0?(B.value=Math.ceil(b+u.width)<a.scrollWidth-1,y.value=b>0):(B.value=b>0,y.value=e.vertical===!0?Math.ceil(b+u.height)<a.scrollHeight:Math.ceil(b+u.width)<a.scrollWidth)}function qe(a){$!==null&&clearInterval($),$=setInterval(()=>{et(a)===!0&&H()},5)}function Pe(){qe(Y.value===!0?Number.MAX_SAFE_INTEGER:0)}function Le(){qe(Y.value===!0?0:Number.MAX_SAFE_INTEGER)}function H(){$!==null&&(clearInterval($),$=null)}function Je(a,u){const b=Array.prototype.filter.call(m.value.children,j=>j===u||j.matches&&j.matches(".q-tab.q-focusable")===!0),R=b.length;if(R===0)return;if(a===36)return K(b[0]),b[0].focus(),!0;if(a===35)return K(b[R-1]),b[R-1].focus(),!0;const M=a===(e.vertical===!0?38:37),S=a===(e.vertical===!0?40:39),C=M===!0?-1:S===!0?1:void 0;if(C!==void 0){const j=U.value===!0?-1:1,O=b.indexOf(u)+C*j;return O>=0&&O<R&&(K(b[O]),b[O].focus({preventScroll:!0})),!0}}const Ze=w(()=>Y.value===!0?{get:a=>Math.abs(a.scrollLeft),set:(a,u)=>{a.scrollLeft=-u}}:e.vertical===!0?{get:a=>a.scrollTop,set:(a,u)=>{a.scrollTop=u}}:{get:a=>a.scrollLeft,set:(a,u)=>{a.scrollLeft=u}});function et(a){const u=m.value,{get:b,set:R}=Ze.value;let M=!1,S=b(u);const C=a<S?-1:1;return S+=C*5,S<0?(M=!0,S=0):(C===-1&&S<=a||C===1&&S>=a)&&(M=!0,S=a),R(u,S),X(),M}function Ae(a,u){for(const b in a)if(a[b]!==u[b])return!1;return!0}function tt(){let a=null,u={matchedLen:0,queryDiff:9999,hrefLen:0};const b=s.filter(C=>C.routeData!==void 0&&C.routeData.hasRouterLink.value===!0),{hash:R,query:M}=d.$route,S=Object.keys(M).length;for(const C of b){const j=C.routeData.exact.value===!0;if(C.routeData[j===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:O,query:he,matched:rt,href:st}=C.routeData.resolvedLink.value,ge=Object.keys(he).length;if(j===!0){if(O!==R||ge!==S||Ae(M,he)===!1)continue;a=C.name.value;break}if(O!==""&&O!==R||ge!==0&&Ae(he,M)===!1)continue;const W={matchedLen:rt.length,queryDiff:S-ge,hrefLen:st.length-O.length};if(W.matchedLen>u.matchedLen){a=C.name.value,u=W;continue}else if(W.matchedLen!==u.matchedLen)continue;if(W.queryDiff<u.queryDiff)a=C.name.value,u=W;else if(W.queryDiff!==u.queryDiff)continue;W.hrefLen>u.hrefLen&&(a=C.name.value,u=W)}a===null&&s.some(C=>C.routeData===void 0&&C.name.value===L.value)===!0||be({name:a,setCurrent:!0})}function at(a){if(v(),f.value!==!0&&r.value!==null&&a.target&&typeof a.target.closest=="function"){const u=a.target.closest(".q-tab");u&&r.value.contains(u)===!0&&(f.value=!0,I.value===!0&&K(u))}}function nt(){A(()=>{f.value=!1},30)}function re(){Me.avoidRouteWatcher===!1?o(tt):T()}function Re(){if(V===void 0){const a=J(()=>d.$route.fullPath,re);V=()=>{a(),V=void 0}}}function ot(a){s.push(a),i.value++,le(),a.routeData===void 0||d.$route===void 0?o(()=>{if(I.value===!0){const u=L.value,b=u!=null&&u!==""?s.find(R=>R.name.value===u):null;b&&K(b.rootRef.value)}}):(Re(),a.routeData.hasRouterLink.value===!0&&re())}function lt(a){s.splice(s.indexOf(a),1),i.value--,le(),V!==void 0&&a.routeData!==void 0&&(s.every(u=>u.routeData===void 0)===!0&&V(),re())}const Me={currentModel:L,tabProps:F,hasFocus:f,hasActiveTab:fe,registerTab:ot,unregisterTab:lt,verifyRouteModel:re,updateModel:be,onKbdNavigate:Je,avoidRouteWatcher:!1};yt(We,Me);function $e(){_!==null&&clearTimeout(_),H(),V!==void 0&&V()}let Ie;return He($e),ht(()=>{Ie=V!==void 0,$e()}),gt(()=>{Ie===!0&&Re(),le()}),()=>D("div",{ref:r,class:pe.value,role:"tablist",onFocusin:at,onFocusout:nt},[D(Ut,{onResize:Se}),D("div",{ref:m,class:g.value,onScroll:X},ve(c.default)),D(oe,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(B.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||l.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:Pe,onTouchstartPassive:Pe,onMouseupPassive:H,onMouseleavePassive:H,onTouchendPassive:H}),D(oe,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(y.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||l.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:Le,onTouchstartPassive:Le,onMouseupPassive:H,onMouseleavePassive:H,onTouchendPassive:H})])}});function la(e){const c=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((p,d)=>{const l=parseFloat(p);l&&(c[d]=l)}),c}var ra=wt({name:"touch-swipe",beforeMount(e,{value:c,arg:p,modifiers:d}){if(d.mouse!==!0&&Z.has.touch!==!0)return;const l=d.mouseCapture===!0?"Capture":"",t={handler:c,sensitivity:la(p),direction:Ue(d),noop:_t,mouseStart(n){Fe(n,t)&&Ct(n)&&(se(t,"temp",[[document,"mousemove","move",`notPassive${l}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(n,!0))},touchStart(n){if(Fe(n,t)){const h=n.target;se(t,"temp",[[h,"touchmove","move","notPassiveCapture"],[h,"touchcancel","end","notPassiveCapture"],[h,"touchend","end","notPassiveCapture"]]),t.start(n)}},start(n,h){Z.is.firefox===!0&&we(e,!0);const A=Ee(n);t.event={x:A.left,y:A.top,time:Date.now(),mouse:h===!0,dir:!1}},move(n){if(t.event===void 0)return;if(t.event.dir!==!1){ae(n);return}const h=Date.now()-t.event.time;if(h===0)return;const A=Ee(n),v=A.left-t.event.x,o=Math.abs(v),T=A.top-t.event.y,r=Math.abs(T);if(t.event.mouse!==!0){if(o<t.sensitivity[1]&&r<t.sensitivity[1]){t.end(n);return}}else if(o<t.sensitivity[2]&&r<t.sensitivity[2])return;const m=o/h,L=r/h;t.direction.vertical===!0&&o<r&&o<100&&L>t.sensitivity[0]&&(t.event.dir=T<0?"up":"down"),t.direction.horizontal===!0&&o>r&&r<100&&m>t.sensitivity[0]&&(t.event.dir=v<0?"left":"right"),t.direction.up===!0&&o<r&&T<0&&o<100&&L>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&o<r&&T>0&&o<100&&L>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&o>r&&v<0&&r<100&&m>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&o>r&&v>0&&r<100&&m>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(ae(n),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),it(),t.styleCleanup=I=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const B=()=>{document.body.classList.remove("no-pointer-events--children")};I===!0?setTimeout(B,50):B()}),t.handler({evt:n,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:h,distance:{x:o,y:r}})):t.end(n)},end(n){t.event!==void 0&&(_e(t,"temp"),Z.is.firefox===!0&&we(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),n!==void 0&&t.event.dir!==!1&&ae(n),t.event=void 0)}};if(e.__qtouchswipe=t,d.mouse===!0){const n=d.mouseCapture===!0||d.mousecapture===!0?"Capture":"";se(t,"main",[[e,"mousedown","mouseStart",`passive${n}`]])}Z.has.touch===!0&&se(t,"main",[[e,"touchstart","touchStart",`passive${d.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,c){const p=e.__qtouchswipe;p!==void 0&&(c.oldValue!==c.value&&(typeof c.value!="function"&&p.end(),p.handler=c.value),p.direction=Ue(c.modifiers))},beforeUnmount(e){const c=e.__qtouchswipe;c!==void 0&&(_e(c,"main"),_e(c,"temp"),Z.is.firefox===!0&&we(e,!1),c.styleCleanup!==void 0&&c.styleCleanup(),delete e.__qtouchswipe)}});const sa={name:{required:!0},disable:Boolean},Oe={setup(e,{slots:c}){return()=>D("div",{class:"q-panel scroll",role:"tabpanel"},ve(c.default))}},ia={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},ua=["update:modelValue","beforeTransition","transition"];function ca(){const{props:e,emit:c,proxy:p}=ce(),{getCacheWithFn:d}=Xt();let l,t;const n=q(null),h=q(null);function A(g){const P=e.vertical===!0?"up":"left";$((p.$q.lang.rtl===!0?-1:1)*(g.direction===P?1:-1))}const v=w(()=>[[ra,A,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),o=w(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),T=w(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),r=w(()=>`--q-transition-duration: ${e.transitionDuration}ms`),m=w(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),L=w(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),I=w(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);J(()=>e.modelValue,(g,P)=>{const U=s(g)===!0?i(g):-1;t!==!0&&_(U===-1?0:U<i(P)?-1:1),n.value!==U&&(n.value=U,c("beforeTransition",g,P),xt(()=>{c("transition",g,P)}))});function B(){$(1)}function y(){$(-1)}function x(g){c("update:modelValue",g)}function s(g){return g!=null&&g!==""}function i(g){return l.findIndex(P=>P.props.name===g&&P.props.disable!==""&&P.props.disable!==!0)}function f(){return l.filter(g=>g.props.disable!==""&&g.props.disable!==!0)}function _(g){const P=g!==0&&e.animated===!0&&n.value!==-1?"q-transition--"+(g===-1?o.value:T.value):null;h.value!==P&&(h.value=P)}function $(g,P=n.value){let U=P+g;for(;U>-1&&U<l.length;){const Y=l[U];if(Y!==void 0&&Y.props.disable!==""&&Y.props.disable!==!0){_(g),t=!0,c("update:modelValue",Y.props.name),setTimeout(()=>{t=!1});return}U+=g}e.infinite===!0&&l.length>0&&P!==-1&&P!==l.length&&$(g,g===-1?l.length:-1)}function V(){const g=i(e.modelValue);return n.value!==g&&(n.value=g),!0}function F(){const g=s(e.modelValue)===!0&&V()&&l[n.value];return e.keepAlive===!0?[D(St,L.value,[D(I.value===!0?d(m.value,()=>({...Oe,name:m.value})):Oe,{key:m.value,style:r.value},()=>g)])]:[D("div",{class:"q-panel scroll",style:r.value,key:m.value,role:"tabpanel"},[g])]}function fe(){if(l.length!==0)return e.animated===!0?[D(kt,{name:h.value},F)]:F()}function me(g){return l=Tt(ve(g.default,[])).filter(P=>P.props!==null&&P.props.slot===void 0&&s(P.props.name)===!0),l.length}function pe(){return l}return Object.assign(p,{next:B,previous:y,goTo:x}),{panelIndex:n,panelDirectives:v,updatePanelsList:me,updatePanelIndex:V,getPanelContent:fe,getEnabledPanels:f,getPanels:pe,isValidPanelName:s,keepAliveProps:L,needsUniqueKeepAliveWrapper:I,goToPanelByOffset:$,goToPanel:x,nextPanel:B,previousPanel:y}}var Ye=de({name:"QTabPanel",props:sa,setup(e,{slots:c}){return()=>D("div",{class:"q-tab-panel",role:"tabpanel"},ve(c.default))}}),da=de({name:"QTabPanels",props:{...ia,...Ft},emits:ua,setup(e,{slots:c}){const p=ce(),d=Nt(e,p.proxy.$q),{updatePanelsList:l,getPanelContent:t,panelDirectives:n}=ca(),h=w(()=>"q-tab-panels q-panel-parent"+(d.value===!0?" q-tab-panels--dark q-dark":""));return()=>(l(c),qt("div",{class:h.value},t(),"pan",e.swipeable,()=>n.value))}}),Xe={exports:{}};(function(e,c){(function(p,d){d()})(te,function(){function p(v,o){return typeof o=="undefined"?o={autoBom:!1}:typeof o!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),o={autoBom:!o}),o.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(v.type)?new Blob(["\uFEFF",v],{type:v.type}):v}function d(v,o,T){var r=new XMLHttpRequest;r.open("GET",v),r.responseType="blob",r.onload=function(){A(r.response,o,T)},r.onerror=function(){console.error("could not download file")},r.send()}function l(v){var o=new XMLHttpRequest;o.open("HEAD",v,!1);try{o.send()}catch{}return 200<=o.status&&299>=o.status}function t(v){try{v.dispatchEvent(new MouseEvent("click"))}catch{var o=document.createEvent("MouseEvents");o.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),v.dispatchEvent(o)}}var n=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof te=="object"&&te.global===te?te:void 0,h=n.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),A=n.saveAs||(typeof window!="object"||window!==n?function(){}:"download"in HTMLAnchorElement.prototype&&!h?function(v,o,T){var r=n.URL||n.webkitURL,m=document.createElement("a");o=o||v.name||"download",m.download=o,m.rel="noopener",typeof v=="string"?(m.href=v,m.origin===location.origin?t(m):l(m.href)?d(v,o,T):t(m,m.target="_blank")):(m.href=r.createObjectURL(v),setTimeout(function(){r.revokeObjectURL(m.href)},4e4),setTimeout(function(){t(m)},0))}:"msSaveOrOpenBlob"in navigator?function(v,o,T){if(o=o||v.name||"download",typeof v!="string")navigator.msSaveOrOpenBlob(p(v,T),o);else if(l(v))d(v,o,T);else{var r=document.createElement("a");r.href=v,r.target="_blank",setTimeout(function(){t(r)})}}:function(v,o,T,r){if(r=r||open("","_blank"),r&&(r.document.title=r.document.body.innerText="downloading..."),typeof v=="string")return d(v,o,T);var m=v.type==="application/octet-stream",L=/constructor/i.test(n.HTMLElement)||n.safari,I=/CriOS\/[\d]+/.test(navigator.userAgent);if((I||m&&L||h)&&typeof FileReader!="undefined"){var B=new FileReader;B.onloadend=function(){var s=B.result;s=I?s:s.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=s:location=s,r=null},B.readAsDataURL(v)}else{var y=n.URL||n.webkitURL,x=y.createObjectURL(v);r?r.location=x:location.href=x,r=null,setTimeout(function(){y.revokeObjectURL(x)},4e4)}});n.saveAs=A.saveAs=A,e.exports=A})})(Xe);var va=Xe.exports;const fa={class:"row justify-between"},ma={class:"text-h6"},pa={class:"text-subtitle2"},ba={class:"text-subtitle2"},ha={class:"text-subtitle2"},ga=Q("div",{class:"text-h6"},"Log",-1),ya={class:"text-white"},wa={__name:"Viewer",props:{folio:[String,Number],store:[String,Number]},emits:["errorsearch"],setup(e,{emit:c}){const p=e,d=p.folio,l=p.store,t=q(null),n=q(null),h=q("body"),A=q(null),v=q({cols:[{name:"id",field:"id",label:"ID",align:"left"},{name:"lcode",field:"code",label:"Codigo"},{name:"scode",field:"name",label:"Codigo C."},{name:"descr",field:"description",label:"Articulo",align:"left",classes:"fs-dec4"},{name:"sai",field:y=>y.ordered.stocks,label:"SAI",align:"center"},{name:"counteds",field:y=>y.ordered.stocks_acc,label:"UC",align:"center"},{name:"sat",field:y=>{var x;return(x=y.ordered.stocks_end)!=null?x:"--"},label:"SAT",align:"center"},{name:"ufus",field:y=>y.ordered.stocks_acc-y.ordered.stocks,label:"UF/US",align:"center"},{name:"locs",field:y=>y.locations.map(x=>x.path).join(", "),label:"Ubicacion (es)",align:"left"}]}),o=w(()=>t.value?t.value.created_by:null),T=w(()=>t.value?t.value.log:[]),r=w(()=>t.value&&t.value.responsables&&t.value.responsables.length?t.value.responsables.map(y=>y.nick).join(","):""),m=w(()=>t.value&&t.value.products&&t.value.products.length?t.value.products:[]),L=w(()=>t.value?t.value.status.name:"");w(()=>""),w(()=>""),(async()=>{const y=await Ke.find(d,l);console.log(y),y.fail?n.value=y.fail:t.value=y.inventory})();const B=y=>{let x=`INV_${t.value.id}_${t.value.workpoint.alias}.xlsx`;console.log(x);let s=new Gt.Workbook,i=s.addWorksheet("Sheet1");i.columns=[{header:"ID",key:"id"},{header:"Codigo",key:"lcode"},{header:"Codigo C.",key:"scode"},{header:"Articulo",key:"description"},{header:"SAI",key:"sai"},{header:"UC",key:"uc"},{header:"SAT",key:"sat"},{header:"UF/US",key:"ufus"},{header:"Ubicacion(es)",key:"locs"}],m.value.forEach(f=>{i.addRow({id:f.id,lcode:f.code,scode:f.name,description:f.description,sai:parseInt(f.ordered.stocks),uc:parseInt(f.ordered.stocks_acc),sat:parseInt(f.ordered.stocks_end),ufus:parseInt(f.ordered.stocks_acc)-parseInt(f.ordered.stocks),locs:f.locations.map(_=>_.path).join(", ")})}),i.getCell("L2").value="Folio:",i.getCell("M2").value=t.value.id,i.getCell("L3").value="Sucursal:",i.getCell("M3").value=t.value.workpoint.name,i.getCell("L4").value="Estado:",i.getCell("M4").value=L.value,i.getCell("L5").value="Creado por:",i.getCell("M5").value=o.value?o.value.names:"",i.getCell("L6").value="Realizado por:",i.getCell("M6").value=r.value,i.getCell("L7").value="Inicio:",i.getCell("M7").value="",i.getCell("L8").value="Termino:",i.getCell("M8").value="",s.xlsx.writeBuffer().then(f=>va(new Blob([f],{type:"application/octet-stream"}),x))};return(y,x)=>(z(),ie(De,null,[t.value?(z(),ke(xe,{key:0,class:"my-card"},{default:E(()=>[k(Qe,null,{default:E(()=>[Q("div",fa,[Q("div",ma,"Inventario "+G(N(d)),1),Q("div",null,[k(ue,{color:"primary",label:"descargar",onClick:B})])]),Q("div",pa,[ne("Creado por: "),Q("b",null,G(N(o)?N(o).names:"Nobody"),1)]),Q("div",ba,[ne("Realizado por: "),Q("b",null,G(N(r)),1)]),Q("div",ha,[ne("Estado: "),Q("b",null,G(N(L)),1)])]),_:1}),k(oa,{modelValue:h.value,"onUpdate:modelValue":x[0]||(x[0]=s=>h.value=s)},{default:E(()=>[k(Ne,{name:"log",label:"Log"}),k(Ne,{name:"body",label:"Resumen"})]),_:1},8,["modelValue"]),k(da,{modelValue:h.value,"onUpdate:modelValue":x[1]||(x[1]=s=>h.value=s),animated:""},{default:E(()=>[k(Ye,{name:"log"},{default:E(()=>[ga,(z(!0),ie(De,null,Pt(N(T),(s,i)=>(z(),ie("div",{key:i},[Q("pre",null,G(s),1)]))),128))]),_:1}),k(Ye,{name:"body"},{default:E(()=>[k(ze,{flat:"",rows:N(m),columns:v.value.cols,"row-key":"name",ref_key:"rowsproducts",ref:A},null,8,["rows","columns"])]),_:1})]),_:1},8,["modelValue"])]),_:1})):Te("",!0),n.value?(z(),ke(xe,{key:1,class:"bg-negative"},{default:E(()=>[k(Qe,null,{default:E(()=>[Q("pre",ya,G(n.value),1)]),_:1})]),_:1})):Te("",!0)],64))}},_a=Q("span",{class:"text-grey"},"Helpers",-1),Ca=Q("span",{class:"text-h6"},"Ciclicos",-1),ka={class:"row items-center"},Ta=Q("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Inventario",-1),xa={key:0,class:"text-right"},Ka={__name:"CiclicosLayout",setup(e){const c=q(""),p=zt(),d=Lt(),l=At(),t=Kt(),n=q({state:!1,data:null}),h=q(null),A=q([]),v=q({cols:[{name:"id",field:"id",label:"Folio"},{name:"started",field:i=>ee(i.created_at).format("YYYY/MM/DD HH:mm:ss"),label:"Creacion",align:"center"},{name:"status",field:i=>i.status.name,label:"Estado",align:"center"},{name:"ended",field:i=>{let f=i.log.find(_=>_.id==3);return f?ee(f.pivot.created_at).format("YYYY/MM/DD HH:mm:ss"):"--"},align:"center",label:"Termino"},{name:"models",field:"products_count",label:"Modelos"},{name:"type",field:i=>i.type.name,label:"Tipo"},{name:"warehouse",field:i=>i.settings?i.settings.warehouse.name:"---",label:"Almacen"}]}),o=q([{id:"day",label:"Hoy"},{id:"week",label:"Semana"},{id:"month",label:"Mes"},{id:"c",label:"otra ...",disable:!0}]),T=q({from:ee(Date.now()).startOf("day"),to:ee(Date.now()).endOf("day")}),r=w(()=>A.value.map(i=>(i.settings=JSON.parse(i.settings),i))),m=w(()=>c.value&&c.value.length),L=w(()=>T.value.from.format("YYYY/MM/DD")),I=w(()=>T.value.to.format("YYYY/MM/DD")),B=()=>{console.log("searching folio"),n.value.folio=c.value,n.value.state=!0},y=async(i,f,_)=>{n.value.folio=f.id,n.value.state=!0},x=async()=>{var V;console.log(t.session),p.loading.show({message:"Cargado vista..."});let i=(V=d.query.v)!=null?V:"day",f=o.value.findIndex(F=>F.id==i),_=f>=0?f:0;console.log(_),h.value=o.value[_],T.value.from=ee(Date.now()).startOf(h.value.id);const $=await Ke.index({dateranges:T,view:h.value,store:t.session.store.id_viz});console.log($),A.value=$.inventories,p.loading.hide()},s=()=>{l.push(`/ciclicos?v=${h.value.id}`)};return x(),J(()=>d.query,()=>{x()}),(i,f)=>(z(),ke(Ot,{view:"hHh Lpr fFf"},{default:E(()=>[k(jt,{class:"bg-grey-3 text-dark",bordered:""},{default:E(()=>[k(Vt),k(Be),k(Qt,{class:"justify-between"},{default:E(()=>[Q("div",null,[_a,ne(),k(oe,{name:"navigate_next",color:"primary"}),ne(),Ca]),Q("div",ka,[k($t,{modelValue:h.value,"onUpdate:modelValue":[f[0]||(f[0]=_=>h.value=_),s],options:o.value,label:"Vista",autofocus:"",borderless:""},{prepend:E(()=>[k(ue,{dense:"",flat:"",color:"primary",icon:"autorenew",onClick:Rt(x,["stop"])},null,8,["onClick"])]),_:1},8,["modelValue","options"]),k(ue,{color:"primary",icon:"search",dense:"",flat:""},{default:E(()=>[k(It,null,{default:E(()=>[Ta,k(Be),k(Dt,{dense:"",onSubmit:B,class:"q-gutter-md q-pa-md"},{default:E(()=>[k(Et,{modelValue:c.value,"onUpdate:modelValue":f[1]||(f[1]=_=>c.value=_),type:"number",label:"Folio",autofocus:""},null,8,["modelValue"]),N(m)?(z(),ie("div",xa,[k(ue,{type:"submit",color:"primary",icon:"search"})])):Te("",!0)]),_:1})]),_:1})]),_:1})])]),_:1})]),_:1}),k(Yt,null,{default:E(()=>[k(Wt,{padding:""},{default:E(()=>[k(xe,{class:"my-card",flat:""},{default:E(()=>[k(ze,{title:`Inventarios del ${N(L)} al ${N(I)} [ ${A.value.length} ]`,rows:N(r),columns:v.value.cols,"row-key":"id",onRowClick:y},null,8,["title","rows","columns"])]),_:1}),k(Ht,{modelValue:n.value.state,"onUpdate:modelValue":f[2]||(f[2]=_=>n.value.state=_),"full-width":""},{default:E(()=>[k(wa,{folio:n.value.folio,store:N(t).session.store.id_viz},null,8,["folio","store"])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Ka as default};
