import{Q as we}from"./position-engine.aec911bd.js";import{k as W,j as ye,ar as at,as as ot,r as te,c as p,F as ze,_ as lt,l as Ne,m as Be,aK as Ae,z as Re,M as xe,n as K,p as nt,A as Ge,q as st,a2 as Ce,at as je,s as Ke,N as et,o as re,a as _e,w as m,e as i,Q as j,i as $,a3 as ge,aW as it,f as rt,g as ke,a1 as Pe,h as Le,a4 as ee,a0 as Ee,a5 as Ue}from"./index.da915ee4.js";import{Q as ct}from"./QToolbar.74153805.js";import{Q as ut,a as qe}from"./QCardActions.ed6716ea.js";import{u as De,c as He,Q as Fe,a as ve}from"./QCard.3d0bf6b9.js";import{o as dt,u as vt,a as ft,b as mt,c as gt,Q as ht}from"./QCheckbox.1d9bffcb.js";import{d as bt,i as pt,Q as xt}from"./QInput.6bee8f80.js";import{u as yt,b as wt,e as _t,h as kt,n as Ft,o as St,Q as Ie}from"./QDialog.3bf2b86d.js";import{T as Ve}from"./TouchPan.61fd89c1.js";import{d as $e,f as Pt,Q as qt}from"./QSelect.e049b487.js";import{Q as $t}from"./QTable.8df69cbb.js";import{Q as Xe,a as We,b as Oe}from"./QItem.c7b83b6e.js";import{Q as Ye}from"./QList.a4374ae8.js";import{Q as Ct}from"./QPage.1d065ca7.js";import{Q as zt,a as Nt}from"./QLayout.c6b32c67.js";import{_ as Bt,C as Me}from"./UserToolbar.39be2767.js";import{u as Qt}from"./VDB.8fd718da.js";import{P as Tt,d as Lt}from"./ProductsAutocomplete.a9d0f39b.js";import{u as Et}from"./use-quasar.f404305b.js";import{E as pe}from"./jspdf.plugin.autotable.6df6db48.js";import"./axios.ae0a941c.js";import{E as It}from"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import"./QResizeObserver.8f301229.js";import"./touch.70a9dd44.js";import"./QLinearProgress.7376bb05.js";import"./_commonjsHelpers.88e99c8f.js";import"./axios.f1f32898.js";const Vt=W("svg",{key:"svg",class:"q-radio__bg absolute non-selectable",viewBox:"0 0 24 24"},[W("path",{d:"M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"}),W("path",{class:"q-radio__check",d:"M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"})]);var Wt=ye({name:"QRadio",props:{...De,...at,...bt,modelValue:{required:!0},val:{required:!0},label:String,leftLabel:Boolean,checkedIcon:String,uncheckedIcon:String,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},emits:["update:modelValue"],setup(t,{slots:S,emit:v}){const{proxy:P}=Be(),_=He(t,P.$q),C=ot(t,dt),h=te(null),{refocusTargetEl:T,refocusTarget:se}=vt(t,h),k=p(()=>Ae(t.modelValue)===Ae(t.val)),l=p(()=>"q-radio cursor-pointer no-outline row inline no-wrap items-center"+(t.disable===!0?" disabled":"")+(_.value===!0?" q-radio--dark":"")+(t.dense===!0?" q-radio--dense":"")+(t.leftLabel===!0?" reverse":"")),N=p(()=>{const z=t.color!==void 0&&(t.keepColor===!0||k.value===!0)?` text-${t.color}`:"";return`q-radio__inner relative-position q-radio__inner--${k.value===!0?"truthy":"falsy"}${z}`}),V=p(()=>(k.value===!0?t.checkedIcon:t.uncheckedIcon)||null),O=p(()=>t.disable===!0?-1:t.tabindex||0),E=p(()=>{const z={type:"radio"};return t.name!==void 0&&Object.assign(z,{".checked":k.value===!0,"^checked":k.value===!0?"checked":void 0,name:t.name,value:t.val}),z}),U=pt(E);function H(z){z!==void 0&&(Re(z),se(z)),t.disable!==!0&&k.value!==!0&&v("update:modelValue",t.val,z)}function B(z){(z.keyCode===13||z.keyCode===32)&&Re(z)}function he(z){(z.keyCode===13||z.keyCode===32)&&H(z)}return Object.assign(P,{set:H}),()=>{const z=V.value!==null?[W("div",{key:"icon",class:"q-radio__icon-container absolute-full flex flex-center no-wrap"},[W(ze,{class:"q-radio__icon",name:V.value})])]:[Vt];t.disable!==!0&&U(z,"unshift"," q-radio__native q-ma-none q-pa-none");const ce=[W("div",{class:N.value,style:C.value,"aria-hidden":"true"},z)];T.value!==null&&ce.push(T.value);const ue=t.label!==void 0?lt(S.default,[t.label]):Ne(S.default);return ue!==void 0&&ce.push(W("div",{class:"q-radio__label q-anchor--skip"},ue)),W("div",{ref:h,class:l.value,tabindex:O.value,role:"radio","aria-label":t.label,"aria-checked":k.value===!0?"true":"false","aria-disabled":t.disable===!0?"true":void 0,onClick:H,onKeydown:B,onKeyup:he},ce)}}}),Ot=ye({name:"QToggle",props:{...ft,icon:String,iconColor:String},emits:mt,setup(t){function S(v,P){const _=p(()=>(v.value===!0?t.checkedIcon:P.value===!0?t.indeterminateIcon:t.uncheckedIcon)||t.icon),C=p(()=>v.value===!0?t.iconColor:null);return()=>[W("div",{class:"q-toggle__track"}),W("div",{class:"q-toggle__thumb absolute flex flex-center no-wrap"},_.value!==void 0?[W(ze,{name:_.value,color:C.value})]:void 0)]}return gt("toggle",S)}});const tt={radio:Wt,checkbox:ht,toggle:Ot},Mt=Object.keys(tt);var Dt=ye({name:"QOptionGroup",props:{...De,modelValue:{required:!0},options:{type:Array,validator:t=>t.every(S=>"value"in S&&"label"in S)},name:String,type:{default:"radio",validator:t=>Mt.includes(t)},color:String,keepColor:Boolean,dense:Boolean,size:String,leftLabel:Boolean,inline:Boolean,disable:Boolean},emits:["update:modelValue"],setup(t,{emit:S,slots:v}){const{proxy:{$q:P}}=Be(),_=Array.isArray(t.modelValue);t.type==="radio"?_===!0&&console.error("q-option-group: model should not be array"):_===!1&&console.error("q-option-group: model should be array in your case");const C=He(t,P),h=p(()=>tt[t.type]),T=p(()=>"q-option-group q-gutter-x-sm"+(t.inline===!0?" q-option-group--inline":"")),se=p(()=>{const l={role:"group"};return t.type==="radio"&&(l.role="radiogroup",t.disable===!0&&(l["aria-disabled"]="true")),l});function k(l){S("update:modelValue",l)}return()=>W("div",{class:T.value,...se.value},t.options.map((l,N)=>{const V=v["label-"+N]!==void 0?()=>v["label-"+N](l):v.label!==void 0?()=>v.label(l):void 0;return W("div",[W(h.value,{modelValue:t.modelValue,val:l.value,name:l.name===void 0?t.name:l.name,disable:t.disable||l.disable,label:V===void 0?l.label:null,leftLabel:l.leftLabel===void 0?t.leftLabel:l.leftLabel,color:l.color===void 0?t.color:l.color,checkedIcon:l.checkedIcon,uncheckedIcon:l.uncheckedIcon,dark:l.dark||C.value,size:l.size===void 0?t.size:l.size,dense:t.dense,keepColor:l.keepColor===void 0?t.keepColor:l.keepColor,"onUpdate:modelValue":k},V)])}))}}),Je=ye({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(t,{slots:S}){const v=p(()=>{const P=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(_=>t[_]===!0).map(_=>`q-btn-group--${_}`).join(" ");return`q-btn-group row no-wrap${P.length>0?" "+P:""}`+(t.spread===!0?" q-btn-group--spread":" inline")});return()=>W("div",{class:v.value},Ne(S.default))}});const Ze=150;var Ht=ye({name:"QDrawer",inheritAttrs:!1,props:{...yt,...De,side:{type:String,default:"left",validator:t=>["left","right"].includes(t)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:t=>["default","desktop","mobile"].includes(t),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...wt,"onLayout","miniState"],setup(t,{slots:S,emit:v,attrs:P}){const _=Be(),{proxy:{$q:C}}=_,h=He(t,C),{preventBodyScroll:T}=St(),{registerTimeout:se,removeTimeout:k}=_t(),l=Ke(et,xe);if(l===xe)return console.error("QDrawer needs to be child of QLayout"),xe;let N,V=null,O;const E=te(t.behavior==="mobile"||t.behavior!=="desktop"&&l.totalWidth.value<=t.breakpoint),U=p(()=>t.mini===!0&&E.value!==!0),H=p(()=>U.value===!0?t.miniWidth:t.width),B=te(t.showIfAbove===!0&&E.value===!1?!0:t.modelValue===!0),he=p(()=>t.persistent!==!0&&(E.value===!0||J.value===!0));function z(a,r){if(Qe(),a!==!1&&l.animate(),R(0),E.value===!0){const oe=l.instances[b.value];oe!==void 0&&oe.belowBreakpoint===!0&&oe.hide(!1),w(1),l.isContainer.value!==!0&&T(!0)}else w(0),a!==!1&&Z(!1);se(()=>{a!==!1&&Z(!0),r!==!0&&v("show",a)},Ze)}function ce(a,r){Te(),a!==!1&&l.animate(),w(0),R(de.value*H.value),G(),r!==!0?se(()=>{v("hide",a)},Ze):k()}const{show:ue,hide:fe}=kt({showing:B,hideOnRouteChange:he,handleShow:z,handleHide:ce}),{addToHistory:Qe,removeFromHistory:Te}=Ft(B,fe,he),be={belowBreakpoint:E,hide:fe},ie=p(()=>t.side==="right"),de=p(()=>(C.lang.rtl===!0?-1:1)*(ie.value===!0?1:-1)),d=te(0),u=te(!1),o=te(!1),f=te(H.value*de.value),b=p(()=>ie.value===!0?"left":"right"),L=p(()=>B.value===!0&&E.value===!1&&t.overlay===!1?t.miniToOverlay===!0?t.miniWidth:H.value:0),X=p(()=>t.overlay===!0||t.miniToOverlay===!0||l.view.value.indexOf(ie.value?"R":"L")>-1||C.platform.is.ios===!0&&l.isContainer.value===!0),e=p(()=>t.overlay===!1&&B.value===!0&&E.value===!1),J=p(()=>t.overlay===!0&&B.value===!0&&E.value===!1),ae=p(()=>"fullscreen q-drawer__backdrop"+(B.value===!1&&u.value===!1?" hidden":"")),M=p(()=>({backgroundColor:`rgba(0,0,0,${d.value*.4})`})),A=p(()=>ie.value===!0?l.rows.value.top[2]==="r":l.rows.value.top[0]==="l"),q=p(()=>ie.value===!0?l.rows.value.bottom[2]==="r":l.rows.value.bottom[0]==="l"),F=p(()=>{const a={};return l.header.space===!0&&A.value===!1&&(X.value===!0?a.top=`${l.header.offset}px`:l.header.space===!0&&(a.top=`${l.header.size}px`)),l.footer.space===!0&&q.value===!1&&(X.value===!0?a.bottom=`${l.footer.offset}px`:l.footer.space===!0&&(a.bottom=`${l.footer.size}px`)),a}),Y=p(()=>{const a={width:`${H.value}px`,transform:`translateX(${f.value}px)`};return E.value===!0?a:Object.assign(a,F.value)}),le=p(()=>"q-drawer__content fit "+(l.isContainer.value!==!0?"scroll":"overflow-auto")),Q=p(()=>`q-drawer q-drawer--${t.side}`+(o.value===!0?" q-drawer--mini-animate":"")+(t.bordered===!0?" q-drawer--bordered":"")+(h.value===!0?" q-drawer--dark q-dark":"")+(u.value===!0?" no-transition":B.value===!0?"":" q-layout--prevent-focus")+(E.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${U.value===!0?"mini":"standard"}`+(X.value===!0||e.value!==!0?" fixed":"")+(t.overlay===!0||t.miniToOverlay===!0?" q-drawer--on-top":"")+(A.value===!0?" q-drawer--top-padding":""))),me=p(()=>{const a=C.lang.rtl===!0?t.side:b.value;return[[Ve,n,void 0,{[a]:!0,mouse:!0}]]}),D=p(()=>{const a=C.lang.rtl===!0?b.value:t.side;return[[Ve,c,void 0,{[a]:!0,mouse:!0}]]}),s=p(()=>{const a=C.lang.rtl===!0?b.value:t.side;return[[Ve,c,void 0,{[a]:!0,mouse:!0,mouseAllDir:!0}]]});function g(){x(E,t.behavior==="mobile"||t.behavior!=="desktop"&&l.totalWidth.value<=t.breakpoint)}K(E,a=>{a===!0?(N=B.value,B.value===!0&&fe(!1)):t.overlay===!1&&t.behavior!=="mobile"&&N!==!1&&(B.value===!0?(R(0),w(0),G()):ue(!1))}),K(()=>t.side,(a,r)=>{l.instances[r]===be&&(l.instances[r]=void 0,l[r].space=!1,l[r].offset=0),l.instances[a]=be,l[a].size=H.value,l[a].space=e.value,l[a].offset=L.value}),K(l.totalWidth,()=>{(l.isContainer.value===!0||document.qScrollPrevented!==!0)&&g()}),K(()=>t.behavior+t.breakpoint,g),K(l.isContainer,a=>{B.value===!0&&T(a!==!0),a===!0&&g()}),K(l.scrollbarWidth,()=>{R(B.value===!0?0:void 0)}),K(L,a=>{I("offset",a)}),K(e,a=>{v("onLayout",a),I("space",a)}),K(ie,()=>{R()}),K(H,a=>{R(),y(t.miniToOverlay,a)}),K(()=>t.miniToOverlay,a=>{y(a,H.value)}),K(()=>C.lang.rtl,()=>{R()}),K(()=>t.mini,()=>{t.modelValue===!0&&(ne(),l.animate())}),K(U,a=>{v("miniState",a)});function R(a){a===void 0?Ge(()=>{a=B.value===!0?0:H.value,R(de.value*a)}):(l.isContainer.value===!0&&ie.value===!0&&(E.value===!0||Math.abs(a)===H.value)&&(a+=de.value*l.scrollbarWidth.value),f.value=a)}function w(a){d.value=a}function Z(a){const r=a===!0?"remove":l.isContainer.value!==!0?"add":"";r!==""&&document.body.classList[r]("q-body--drawer-toggle")}function ne(){V!==null&&clearTimeout(V),_.proxy&&_.proxy.$el&&_.proxy.$el.classList.add("q-drawer--mini-animate"),o.value=!0,V=setTimeout(()=>{V=null,o.value=!1,_&&_.proxy&&_.proxy.$el&&_.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function n(a){if(B.value!==!1)return;const r=H.value,oe=$e(a.distance.x,0,r);if(a.isFinal===!0){oe>=Math.min(75,r)===!0?ue():(l.animate(),w(0),R(de.value*r)),u.value=!1;return}R((C.lang.rtl===!0?ie.value!==!0:ie.value)?Math.max(r-oe,0):Math.min(0,oe-r)),w($e(oe/r,0,1)),a.isFirst===!0&&(u.value=!0)}function c(a){if(B.value!==!0)return;const r=H.value,oe=a.direction===t.side,Se=(C.lang.rtl===!0?oe!==!0:oe)?$e(a.distance.x,0,r):0;if(a.isFinal===!0){Math.abs(Se)<Math.min(75,r)===!0?(l.animate(),w(1),R(0)):fe(),u.value=!1;return}R(de.value*Se),w($e(1-Se/r,0,1)),a.isFirst===!0&&(u.value=!0)}function G(){T(!1),Z(!0)}function I(a,r){l.update(t.side,a,r)}function x(a,r){a.value!==r&&(a.value=r)}function y(a,r){I("size",a===!0?t.miniWidth:r)}return l.instances[t.side]=be,y(t.miniToOverlay,H.value),I("space",e.value),I("offset",L.value),t.showIfAbove===!0&&t.modelValue!==!0&&B.value===!0&&t["onUpdate:modelValue"]!==void 0&&v("update:modelValue",!0),nt(()=>{v("onLayout",e.value),v("miniState",U.value),N=t.showIfAbove===!0;const a=()=>{(B.value===!0?z:ce)(!1,!0)};if(l.totalWidth.value!==0){Ge(a);return}O=K(l.totalWidth,()=>{O(),O=void 0,B.value===!1&&t.showIfAbove===!0&&E.value===!1?ue(!1):a()})}),st(()=>{O!==void 0&&O(),V!==null&&(clearTimeout(V),V=null),B.value===!0&&G(),l.instances[t.side]===be&&(l.instances[t.side]=void 0,I("size",0),I("offset",0),I("space",!1))}),()=>{const a=[];E.value===!0&&(t.noSwipeOpen===!1&&a.push(Ce(W("div",{key:"open",class:`q-drawer__opener fixed-${t.side}`,"aria-hidden":"true"}),me.value)),a.push(je("div",{ref:"backdrop",class:ae.value,style:M.value,"aria-hidden":"true",onClick:fe},void 0,"backdrop",t.noSwipeBackdrop!==!0&&B.value===!0,()=>s.value)));const r=U.value===!0&&S.mini!==void 0,oe=[W("div",{...P,key:""+r,class:[le.value,P.class]},r===!0?S.mini():Ne(S.default))];return t.elevated===!0&&B.value===!0&&oe.push(W("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),a.push(je("aside",{ref:"content",class:Q.value,style:Y.value},oe,"contentclose",t.noSwipeClose!==!0&&E.value===!0,()=>D.value)),W("div",{class:"q-drawer-container"},a)}}});const At={position:{type:String,default:"bottom-right",validator:t=>["top-right","top-left","bottom-right","bottom-left","top","right","bottom","left"].includes(t)},offset:{type:Array,validator:t=>t.length===2},expand:Boolean};function Rt(){const{props:t,proxy:{$q:S}}=Be(),v=Ke(et,xe);if(v===xe)return console.error("QPageSticky needs to be child of QLayout"),xe;const P=p(()=>{const N=t.position;return{top:N.indexOf("top")>-1,right:N.indexOf("right")>-1,bottom:N.indexOf("bottom")>-1,left:N.indexOf("left")>-1,vertical:N==="top"||N==="bottom",horizontal:N==="left"||N==="right"}}),_=p(()=>v.header.offset),C=p(()=>v.right.offset),h=p(()=>v.footer.offset),T=p(()=>v.left.offset),se=p(()=>{let N=0,V=0;const O=P.value,E=S.lang.rtl===!0?-1:1;O.top===!0&&_.value!==0?V=`${_.value}px`:O.bottom===!0&&h.value!==0&&(V=`${-h.value}px`),O.left===!0&&T.value!==0?N=`${E*T.value}px`:O.right===!0&&C.value!==0&&(N=`${-E*C.value}px`);const U={transform:`translate(${N}, ${V})`};return t.offset&&(U.margin=`${t.offset[1]}px ${t.offset[0]}px`),O.vertical===!0?(T.value!==0&&(U[S.lang.rtl===!0?"right":"left"]=`${T.value}px`),C.value!==0&&(U[S.lang.rtl===!0?"left":"right"]=`${C.value}px`)):O.horizontal===!0&&(_.value!==0&&(U.top=`${_.value}px`),h.value!==0&&(U.bottom=`${h.value}px`)),U}),k=p(()=>`q-page-sticky row flex-center fixed-${t.position} q-page-sticky--${t.expand===!0?"expand":"shrink"}`);function l(N){const V=Ne(N.default);return W("div",{class:k.value,style:se.value},t.expand===!0?V:[W("div",V)])}return{$layout:v,getStickyContent:l}}var Gt=ye({name:"QPageSticky",props:At,setup(t,{slots:S}){const{getStickyContent:v}=Rt();return()=>v(S)}});const jt=$("span",{class:"text-h6"},"Creacion de Etiquetas",-1),Ut=$("div",{class:"text-center text-bold"},"Precios",-1),Xt={class:"q-pa-md"},Yt=$("div",{class:"text-center text-bold"}," Opciones ",-1),Jt={class:"q-pa-md"},Zt={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},Kt={class:"text-h5 text-bold text-center"},ea={class:"text-subtitle2 text-bold text-center"},ta={class:"text-subtitle2 text-bold text-center"},aa={class:"text-subtitle2 text-bold text-center"},oa={class:"text-subtitle2 text-bold text-center"},la={class:"row"},na={class:"text-center"},sa={class:"text-center"},ia=$("div",{class:"text-caption text--2"},"copias",-1),ra={class:"text-bold q-pb-sm text-center"},ca={class:"row q-pt-xs"},ua=$("div",{class:"q-ml-sm"},"Se eliminaran todos los articulos de la lista ",-1),da=$("div",{class:"q-ml-sm"},"Deseas Continuar?",-1),va=$("div",{class:"q-ml-sm"},"En que Formato deseas las etiquetas?",-1),fa=$("div",{class:"text-center text-bold"},"Repetidos",-1),ma={class:"text-negative"},ga=$("div",{class:"text-center"},"Productos Sin Precio",-1),ha=$("div",{class:"text-center"},"Productos Sin Existencia",-1),Ga={__name:"LabelsLayout",setup(t){const S=Qt(),v=Et(),P=te([]),_=te({filter:"",pagination:{rowsPerPage:9}}),C=te({state:!1}),h=te({state:!1,val:null,opts:[{id:1,label:"Navidad Extra Grande"},{id:2,label:"Navidad Grande"},{id:3,label:"Navidad Mediano"},{id:4,label:"Navidad Pequeno"},{id:5,label:"Juguete Ni\xF1o"},{id:6,label:"Juguete Ni\xF1a"}]}),T=te({val:[0,1,2,4],opts:[{label:"Menudeo",value:1},{label:"Mayoreo",value:2},{label:"Docena",value:3},{label:"Caja",value:4}]}),se=te(null),k=te({state:!1,wndGetRows:[],wndNoDataFound:[],wndTotal:[],wndGetAdded:[],_supply_by:0,message:"",messageRepeat:"",wndNotExist:[]}),l=d=>{let u=[],o=[],f=new Object;return d.products.map(b=>N(b.prices)?u.push(b):o.push(b)),console.log(d),f.notFound=u,f.add=o,f},N=d=>{let u=!0;return d.map((o,f)=>{u=o.pivot.price==0}),u},V=d=>{console.log(d)},O=te({state:!1}),E=d=>{let u=P.value.findIndex(o=>o.id==d.id);if(console.log(u),u>=0)v.notify({message:"El Producto ya esta agregado",type:"negative",position:"center"});else{let o=z(d.prices,d.pieces);d._copies=1,d.type=o.type,d.usedPrices=o.prices,d._copies=1,P.value.push(d),console.log(d)}},U=d=>{let u=P.value.findIndex(o=>o.id==d.id);P.value.splice(u,1)},H=()=>{P.value=[],C.value.state=!1},B=()=>{se.value.click()},he=async()=>{let d=document.getElementById("inputFile").files[0],u=new It.Workbook,o=[],f=[],b=0;u.xlsx.load(d).then(L=>{if(u.worksheets[0].getColumn("A").eachCell({includeEmpty:!0},function(J,ae){J.value&&o.push(J.value)}),f=o.filter((J,ae,M)=>M.indexOf(J)==ae),o.length){let J={codes:o,_workpoint:S.session.store.id_viz};console.log(J),v.loading.show({message:"Procesando archivo, espera.."}),Lt.getMassive(J).then(ae=>{let M=ae.data,A=0,q=l(M);if(M.fails.notFound.map(F=>k.value.wndNotExist.push(F)),k.value.wndGetRows=q.add.length,k.value.state=!k.value.state,k.value.wndGetAdded=q.add,k.value.wndNoDataFound=q.notFound,k.value.wndNoDataFound.length>0){let F=k.value.wndNoDataFound.length;k.value.message=F<=1?"El producto no contiene precios.":"Los productos no contienen precios."}q.add.map(F=>{let Y=z(F.prices,F.pieces);F._copies=1,F.type=Y.type,F.usedPrices=Y.prices,P.value.push(F),A++}),A&&!M.fails.notFound.length&&f.length==o.length?v.notify({message:`Etiquetas generadas: ${A}`,color:"positive",icon:"done",timeout:1e3}):(b=o.length-f.length,k.value.messageRepeat=b<=1?`${b} producto se repitio. Favor de validar su documento antes de subirlo.`:`${b} productos se repitieron. Favor de validar su documento antes de subirlo.`),console.log(k.value),v.loading.hide()}).catch(ae=>{console.log(ae),v.notify({message:"Hay un problema con obtener los datos :/.",icon:"fas fa-grin-beam-sweat",color:"negative"})})}else v.notify({message:"Vaya!! Al parecer este archivo esta vacio.",icon:"fas fa-grin-beam-sweat",color:"negative"})})},z=(d,u)=>{let o=[...d];const f=o.find(L=>L.pivot._type==4),b=o.find(L=>L.pivot._type==1);if(f.pivot.price==b.pivot.price){let L={id:0,alias:"OFERTA",name:"Oferta",pivot:{price:o[0].pivot.price},used:!0};return console.log("oferta"),{type:"off",prices:[L]}}else return console.log("estandar"),{type:"std",prices:o}},ce=d=>{switch(d){case"off":return"orange-9";case"std":return"green-9"}},ue=()=>{v.loading.show({message:"Generando Etiquetas"}),h.value.val.id==1?Qe(P.value).then(d=>{v.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),h.value.state=!1,h.value.val=null,v.loading.hide()}).catch(d=>{alert("Hubo un error al descargar las etiquetas")}):h.value.val.id==2?fe(P.value).then(d=>{v.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),h.value.state=!1,h.value.val=null,v.loading.hide()}).catch(d=>{alert("Hubo un error al descargar las etiquetas")}):h.value.val.id==3?Te(P.value).then(d=>{v.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),h.value.state=!1,h.value.val=null,v.loading.hide()}).catch(d=>{alert("Hubo un error al descargar las etiquetas")}):h.value.val.id==4?be(P.value).then(d=>{v.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),h.value.state=!1,h.value.val=null,v.loading.hide()}).catch(d=>{alert("Hubo un error al descargar las etiquetas")}):h.value.val.id==5?ie(P.value).then(d=>{v.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),h.value.state=!1,h.value.val=null,v.loading.hide()}).catch(d=>{alert("Hubo un error al descargar las etiquetas")}):h.value.val.id==6&&de(P.value).then(d=>{v.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),h.value.state=!1,h.value.val=null,v.loading.hide()}).catch(d=>{alert("Hubo un error al descargar las etiquetas")})},fe=d=>new Promise((u,o)=>{try{const f=d,b=[];f.forEach(s=>{for(let g=0;g<s._copies;g++)b.push(s)});const L="/icons/Navidad/Navidad6(2).png",X="PNG",e=new pe({format:"letter"}),J=e.internal.pageSize.getWidth(),ae=e.internal.pageSize.getHeight(),M=5,A=10,q=100,F=85,Y=5,le=5,Q=2,D=Q*3;b.forEach((s,g)=>{const R=Math.floor(g/D),w=g%D,Z=Math.floor(w/Q),ne=w%Q,n=M+ne*(q+Y),c=A+Z*(F+le);g>0&&w===0&&e.addPage(),e.addImage(L,X,n,c,q,F),e.setFontSize(30),e.setFont("helvetica","bold"),e.text(s.name,n+61,c+77),e.setFontSize(14),e.setFont("helvetica","normal");const G=q-20,I=e.splitTextToSize(s.label,G);e.text(I,n+10,c+25),e.setFontSize(12);let x=c+39,y=7;s.usedPrices.filter(a=>T.value.val.includes(a.id)).forEach((a,r)=>{a.alias=="OFERTA"?(e.setFontSize(22),e.setFont("helvetica","bold"),e.text("Unico Precio",n+30,x+r*y+5),e.setFontSize(28),e.text(`$ ${Number(a.pivot.price).toFixed(2)}`,n+34,x+r*y+20)):(e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.alias,n+23,x+r*y),e.text(`$ ${Number(a.pivot.price).toFixed(2)}`,n+45,x+r*y))}),e.setFontSize(16),e.setFont("helvetica","bold"),e.text(`${s.code}`,n+10,c+12),e.text(s.large,n+18,c+74),e.setFont("helvetica","normal"),e.text(`${s.pieces} PZS`,n+70,c+12),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(s.locations?s.locations.map(a=>a.path).join("/"):"",n+19,c+77)}),e.save(`${S.session.credentials.nick} etiquetas ${h.value.val.label}`),u()}catch(f){o(f)}}),Qe=d=>new Promise((u,o)=>{try{const f=d,b=[];f.forEach(s=>{for(let g=0;g<s._copies;g++)b.push(s)});const L="/icons/Navidad/Navidad6(2).png",X="PNG",e=new pe({format:"letter"}),J=e.internal.pageSize.getWidth(),ae=e.internal.pageSize.getHeight(),M=5,A=10,q=205,F=125,Y=5,le=5,Q=1,D=Q*2;b.forEach((s,g)=>{const R=Math.floor(g/D),w=g%D,Z=Math.floor(w/Q),ne=w%Q,n=M+ne*(q+Y),c=A+Z*(F+le);g>0&&w===0&&e.addPage(),e.addImage(L,X,n,c,q,F),e.setFontSize(70),e.setFont("helvetica","bold"),e.text(s.name,n+120,c+112),e.setFontSize(20),e.setFont("helvetica","normal");const G=q-20,I=e.splitTextToSize(s.label,G);e.text(I,n+18,c+31),e.setFontSize(12);let x=c+39,y=12;s.usedPrices.filter(a=>T.value.val.includes(a.id)).forEach((a,r)=>{a.alias=="OFERTA"?(e.setFontSize(35),e.setFont("helvetica","bold"),e.text("Unico Precio",n+60,x+r*y+10),e.setFontSize(50),e.text(`$ ${Number(a.pivot.price).toFixed(2)}`,n+64,x+r*y+35)):(e.setFontSize(35),e.setFont("helvetica","bold"),e.text(a.alias,n+60,x+r*y+15),e.text(`$ ${Number(a.pivot.price).toFixed(2)}`,n+93,x+r*y+15))}),e.setFontSize(45),e.setFont("helvetica","bold"),e.text(`${s.code}`,n+18,c+23),e.text(s.large,n+35,c+112),e.setFont("helvetica","normal"),e.text(`${s.pieces} PZS`,n+185,c+23,{align:"right"}),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(s.locations?s.locations.map(a=>a.path).join("/"):"",n+38,c+114)}),e.save(`${S.session.credentials.nick} etiquetas ${h.value.val.label}`),u()}catch(f){o(f)}}),Te=d=>new Promise((u,o)=>{try{const f=d,b=[];f.forEach(s=>{for(let g=0;g<s._copies;g++)b.push(s)});const L="/icons/Navidad/Navidad9(1).png",X="PNG",e=new pe({format:"letter"}),J=e.internal.pageSize.getWidth(),ae=e.internal.pageSize.getHeight(),M=5,A=10,q=65,F=85,Y=5,le=5,Q=3,D=Q*3;b.forEach((s,g)=>{const R=Math.floor(g/D),w=g%D,Z=Math.floor(w/Q),ne=w%Q,n=M+ne*(q+Y),c=A+Z*(F+le);g>0&&w===0&&e.addPage(),e.addImage(L,X,n,c,q,F),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(s.name,n+37,c+77),e.setFontSize(10),e.setFont("helvetica","normal");const G=q-20,I=e.splitTextToSize(s.label,G);e.text(I,n+5,c+25),e.setFontSize(12);let x=c+40,y=7;s.usedPrices.filter(a=>T.value.val.includes(a.id)).forEach((a,r)=>{a.alias=="OFERTA"?(e.setFontSize(18),e.setFont("helvetica","bold"),e.text("Unico Precio",n+13,x+r*y),e.setFontSize(26),e.text(`$ ${Number(a.pivot.price).toFixed(2)}`,n+13,x+r*y+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(a.alias,n+10,x+r*y),e.text(`$ ${Number(a.pivot.price).toFixed(2)}`,n+30,x+r*y))}),e.setFontSize(12),e.setFont("helvetica","bold"),e.text(`${s.code}`,n+25,c+20),e.text(s.large,n+18,c+77),e.text(`${s.pieces} PZS`,n+20,c+73),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(s.locations?s.locations.map(a=>a.path).join("/"):"",n+18,c+79)}),e.save(`${S.session.credentials.nick} etiquetas ${h.value.val.label}`),u()}catch(f){o(f)}}),be=d=>new Promise((u,o)=>{try{const f=d,b=[];f.forEach(s=>{for(let g=0;g<s._copies;g++)b.push(s)});const L="/icons/Navidad/NaviSan(1).png",X="PNG",e=new pe({format:"letter"}),J=e.internal.pageSize.getWidth(),ae=e.internal.pageSize.getHeight(),M=5,A=10,q=67,F=63,Y=0,le=3,Q=3,D=Q*4;b.forEach((s,g)=>{const R=Math.floor(g/D),w=g%D,Z=Math.floor(w/Q),ne=w%Q,n=M+ne*(q+Y),c=A+Z*(F+le);g>0&&w===0&&e.addPage(),e.addImage(L,X,n,c,q,F),e.setFontSize(18),e.setFont("helvetica","bold"),e.text(s.name,n+23,c+37),e.setFontSize(8),e.setFont("helvetica","normal"),e.text(s.label.substring(0,25),n+15,c+43),e.setFontSize(10);let G=c+36,I=12;s.usedPrices.filter(x=>T.value.val.includes(x.id)).forEach((x,y)=>{x.alias=="OFERTA"?(e.setFontSize(10),e.setFont("helvetica","bold"),e.text("Unico Precio",n+23,G+y*I+12),e.setFontSize(14),e.text(`$ ${Number(x.pivot.price).toFixed(0)}`,n+27,G+y*I+17)):(e.setFontSize(10),e.setFont("helvetica","bold"),e.text(x.alias,n+y*I+10,G+12),e.text(`$ ${Number(x.pivot.price).toFixed(0)}`,n+y*I+10,G+16))}),e.setFontSize(6),e.setFont("helvetica","bold"),e.text(`(${s.code})`,n+28,c+40),e.text(s.large,n+40,c+55),e.text(`${s.pieces} PZS`,n+40,c+57)}),e.save(`${S.session.credentials.nick} etiquetas ${h.value.val.label}`),u()}catch(f){o(f)}}),ie=d=>new Promise((u,o)=>{try{const f=d,b=[];f.forEach(s=>{for(let g=0;g<s._copies;g++)b.push(s)});const L="/icons/Juguete/Ninio.png",X="PNG",e=new pe({format:"letter"}),J=e.internal.pageSize.getWidth(),ae=e.internal.pageSize.getHeight(),M=5,A=10,q=65,F=85,Y=5,le=5,Q=3,D=Q*3;b.forEach((s,g)=>{const R=Math.floor(g/D),w=g%D,Z=Math.floor(w/Q),ne=w%Q,n=M+ne*(q+Y),c=A+Z*(F+le);g>0&&w===0&&e.addPage(),e.addImage(L,X,n,c,q,F),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(s.name,n+15,c+10),e.setFontSize(10),e.setFont("helvetica","normal");const G=q-20,I=e.splitTextToSize(s.label,G);e.text(I,n+3,c+25),e.setFontSize(12);let x=c+40,y=7;s.usedPrices.filter(a=>T.value.val.includes(a.id)).forEach((a,r)=>{a.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",n+5,x+r*y),e.setFontSize(20),e.text(`$ ${Number(a.pivot.price).toFixed(2)}`,n+5,x+r*y+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(a.alias,n+2,x+r*y),e.text(`$${Number(a.pivot.price).toFixed(0)}`,n+19,x+r*y))}),e.setFontSize(10),e.setFont("helvetica","bold"),e.text(`${s.code}`,n+45,c+40),e.text(s.large,n+45,c+52),e.text(`${s.pieces} PZS`,n+45,c+46),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(s.locations?s.locations.map(a=>a.path).join("/"):"",n+18,c+84)}),e.save(`${S.session.credentials.nick} etiquetas ${h.value.val.label}`),u()}catch(f){o(f)}}),de=d=>new Promise((u,o)=>{try{const f=d,b=[];f.forEach(s=>{for(let g=0;g<s._copies;g++)b.push(s)});const L="/icons/Juguete/Ninia.png",X="PNG",e=new pe({format:"letter"}),J=e.internal.pageSize.getWidth(),ae=e.internal.pageSize.getHeight(),M=5,A=10,q=65,F=85,Y=5,le=5,Q=3,D=Q*3;b.forEach((s,g)=>{const R=Math.floor(g/D),w=g%D,Z=Math.floor(w/Q),ne=w%Q,n=M+ne*(q+Y),c=A+Z*(F+le);g>0&&w===0&&e.addPage(),e.addImage(L,X,n,c,q,F),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(s.name,n+15,c+20),e.setFontSize(10),e.setFont("helvetica","normal");const G=q-20,I=e.splitTextToSize(s.label,G);e.text(I,n+5,c+25),e.setFontSize(12);let x=c+40,y=7;s.usedPrices.filter(a=>T.value.val.includes(a.id)).forEach((a,r)=>{a.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",n+15,x+r*y),e.setFontSize(20),e.text(`$ ${Number(a.pivot.price).toFixed(2)}`,n+15,x+r*y+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(a.alias,n+15,x+r*y),e.text(`$${Number(a.pivot.price).toFixed(0)}`,n+32,x+r*y))}),e.setFontSize(13),e.setFont("helvetica","bold"),e.text(`${s.code}`,n+62,c+70,{align:"right"}),e.setFont("helvetica","normal"),e.text(s.large,n+15,c+65),e.text(`${s.pieces} PZS`,n+15,c+70),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(s.locations?s.locations.map(a=>a.path).join("/"):"",n+18,c+84)}),e.save(`${S.session.credentials.nick} etiquetas ${h.value.val.label}`),u()}catch(f){o(f)}});return(d,u)=>(re(),_e(zt,{view:"hHh Lpr fFf"},{default:m(()=>[i(ut,{class:"transparent text-dark",bordered:""},{default:m(()=>[i(Bt),i(we),i(ct,{class:"justify-between"},{default:m(()=>[i(j,{flat:"",onClick:u[0]||(u[0]=o=>O.value.state=!O.value.state),round:"",dense:"",icon:"menu"}),$("div",null,[ge("Helpers "),i(ze,{name:"navigate_next",color:"primary"}),ge(),jt])]),_:1})]),_:1}),i(Nt,null,{default:m(()=>[i(Ct,{padding:""},{default:m(()=>[i(Fe,{class:"my-card"},{default:m(()=>[i(Tt,{checkState:!1,onInput:V,with_prices:"",onAgregar:E,with_locations:""})]),_:1}),i(we,{spaced:"",inset:"",vertical:"",dark:""}),i(Ht,{modelValue:O.value.state,"onUpdate:modelValue":u[4]||(u[4]=o=>O.value.state=o),"show-if-above":"",width:200,breakpoint:500,bordered:"",class:it(rt(v).dark.isActive?"bg-grey-9":"bg-grey-3")},{default:m(()=>[$("div",null,[i(we,{spaced:"",inset:"",vertical:"",dark:""}),Ut,$("div",Xt,[i(Dt,{options:T.value.opts,type:"checkbox",modelValue:T.value.val,"onUpdate:modelValue":u[1]||(u[1]=o=>T.value.val=o)},null,8,["options","modelValue"])])]),i(we,{spaced:"",inset:"",vertical:"",dark:""}),Yt,$("div",Jt,[i(Je,{spread:""},{default:m(()=>[i(j,{color:"primary",icon:"upload_file",flat:"",title:"Subir Etiquetas",onClick:B}),P.value.length?(re(),ke(Pe,{key:0},[i(j,{color:"primary",icon:"delete",flat:"",title:"Eliminar Etiquetas",onClick:u[2]||(u[2]=o=>C.value.state=!C.value.state)}),i(j,{color:"primary",icon:"download",flat:"",title:"Descargar Etquetas",onClick:u[3]||(u[3]=o=>h.value.state=!h.value.state)})],64)):Le("",!0)]),_:1}),$("input",{type:"file",ref_key:"inputFile",ref:se,id:"inputFile",onInput:he,hidden:"",accept:".xlsx,.xls"},null,544)])]),_:1},8,["modelValue","class"]),i($t,{rows:P.value,"row-key":"name",grid:"",filter:_.value.filter,pagination:_.value.pagination,"no-data-label":"''"},{"top-right":m(()=>[i(xt,{borderless:"",dense:"",debounce:"300",modelValue:_.value.filter,"onUpdate:modelValue":u[5]||(u[5]=o=>_.value.filter=o),placeholder:"Buscar"},{append:m(()=>[i(ze,{name:"search"})]),_:1},8,["modelValue"])]),item:m(o=>[$("div",Zt,[i(Fe,{class:"my-card"},{default:m(()=>[i(ve,null,{default:m(()=>{var f;return[i(Pt,{size:"sm",class:"fixed-right absolute-right text-bold text-white text-uppercase",color:ce(o.row.type)},{default:m(()=>[ge(ee(o.row.type),1)]),_:2},1032,["color"]),$("div",Kt,ee(o.row.code),1),$("div",ea,ee(o.row.name),1),$("div",ta,ee(o.row.label),1),$("div",aa,"Longitud: "+ee(o.row.large),1),$("div",oa,"Ubicacion: "+ee((f=o.row.locations)==null?void 0:f.map(b=>b.path).join("/")),1),i(we,{spaced:"",inset:"",vertical:"",dark:""}),$("div",la,[(re(!0),ke(Pe,null,Ee(o.row.usedPrices.filter(b=>T.value.val.includes(b.id)),(b,L)=>(re(),ke("div",{class:"col items-start",key:L},[$("div",na,ee(b.alias),1),$("div",sa,ee(b.pivot.price),1)]))),128))])]}),_:2},1024),i(qe,{align:"center"},{default:m(()=>[i(j,{flat:"",icon:"delete",color:"negative",onClick:f=>U(o.row)},null,8,["onClick"]),i(j,{flat:"",icon:"add",onClick:f=>o.row._copies++},null,8,["onClick"]),$("div",null,[ia,$("div",ra,ee(o.row._copies),1)]),i(j,{flat:"",icon:"remove",onClick:f=>o.row._copies<=1?"":o.row._copies--},null,8,["onClick"])]),_:2},1024)]),_:2},1024)])]),bottom:m(o=>[i(Gt,{position:"bottom",class:"full-width",offset:[0,18]},{default:m(()=>[$("div",ca,[i(Je,{rounded:"",flat:"",color:"primary"},{default:m(()=>[o.pagesNumber>2?(re(),_e(j,{key:0,icon:"first_page",round:"",dense:"",flat:"",disable:o.isFirstPage,onClick:o.firstPage,class:"q-px-sm"},null,8,["disable","onClick"])):Le("",!0),i(j,{icon:"chevron_left",round:"",dense:"",flat:"",disable:o.isFirstPage,onClick:o.prevPage,class:"q-px-sm"},null,8,["disable","onClick"]),i(j,{flat:"",disable:"","no-caps":""},{default:m(()=>[ge(ee(o.pagination.page)+" / "+ee(o.pagesNumber),1)]),_:2},1024),i(j,{icon:"chevron_right",round:"",dense:"",flat:"",disable:o.isLastPage,onClick:o.nextPage,class:"q-px-sm"},null,8,["disable","onClick"]),o.pagesNumber>2?(re(),_e(j,{key:1,icon:"last_page",round:"",dense:"",flat:"",onClick:o.lastPage,class:"q-px-sm"},null,8,["onClick"])):Le("",!0)]),_:2},1024)])]),_:2},1024)]),"no-data":m(()=>[]),_:1},8,["rows","filter","pagination"]),i(Ie,{modelValue:C.value.state,"onUpdate:modelValue":u[6]||(u[6]=o=>C.value.state=o),persistent:""},{default:m(()=>[i(Fe,null,{default:m(()=>[i(ve,{class:"row items-center"},{default:m(()=>[i(Ue,{icon:"warning",color:"white","text-color":"negative"}),ua]),_:1}),i(ve,null,{default:m(()=>[da]),_:1}),i(qe,{align:"right"},{default:m(()=>[Ce(i(j,{flat:"",label:"No",color:"positive"},null,512),[[Me]]),i(j,{flat:"",label:"Si",color:"negative",onClick:H})]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(Ie,{modelValue:h.value.state,"onUpdate:modelValue":u[8]||(u[8]=o=>h.value.state=o),persistent:""},{default:m(()=>[i(Fe,null,{default:m(()=>[i(ve,{class:"row items-center"},{default:m(()=>[i(Ue,{icon:"picture_as_pdf",color:"white","text-color":"red"}),va]),_:1}),i(ve,null,{default:m(()=>[i(qt,{modelValue:h.value.val,"onUpdate:modelValue":u[7]||(u[7]=o=>h.value.val=o),options:h.value.opts,label:"Etiquetas",filled:""},null,8,["modelValue","options"])]),_:1}),i(qe,{align:"right"},{default:m(()=>[Ce(i(j,{flat:"",label:"Cancel",color:"negative"},null,512),[[Me]]),i(j,{flat:"",label:"Generar",color:"positive",onClick:ue,disable:h.value.val==null},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(Ie,{modelValue:k.value.state,"onUpdate:modelValue":u[9]||(u[9]=o=>k.value.state=o)},{default:m(()=>[i(Fe,{class:"my-card",style:{width:"70%"}},{default:m(()=>[i(ve,{class:"items-center"},{default:m(()=>[fa,$("div",ma,ee(k.value.messageRepeat),1)]),_:1}),i(ve,null,{default:m(()=>[ga,i(Ye,null,{default:m(()=>[(re(!0),ke(Pe,null,Ee(k.value.wndNoDataFound,(o,f)=>(re(),_e(Xe,{key:f},{default:m(()=>[i(We,null,{default:m(()=>[i(Oe,{overline:""},{default:m(()=>[ge(ee(o.code),1)]),_:2},1024)]),_:2},1024),i(We,null,{default:m(()=>[i(Oe,{caption:""},{default:m(()=>[ge(ee(o.description),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}),i(ve,null,{default:m(()=>[ha,i(Ye,null,{default:m(()=>[(re(!0),ke(Pe,null,Ee(k.value.wndNotExist,(o,f)=>(re(),_e(Xe,{key:f},{default:m(()=>[i(We,null,{default:m(()=>[i(Oe,{overline:""},{default:m(()=>[ge(ee(o),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}),i(qe,{align:"right"},{default:m(()=>[Ce(i(j,{flat:"",label:"OK",color:"primary"},null,512),[[Me]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Ga as default};