import{Q as M}from"./QSeparator.6b89e4f2.js";import{i as Ie,aM as Ye,aN as Je,j as U,a3 as te,r as m,c as z,W as Ke,n as We,A as Xe,B as Ze,t as el,U as ll,l as tl,aO as Ee,aP as ze,o as E,a as L,w as t,e as l,f as i,a4 as p,Y as al,Q as x,a0 as ol,g as ee,h as F,_ as ke,a5 as y,a1 as sl,a2 as ul,a7 as il}from"./index.ad93775a.js";import{g as ve,d as nl,Q as le,a as $,b,c as J}from"./QSelect.5b7237bc.js";import{Q as K}from"./QInput.778f889d.js";import{Q as me}from"./QForm.396b4de9.js";import{Q as rl}from"./QToolbar.80ed4e2e.js";import{Q as dl}from"./QHeader.f08b1aec.js";import{Q as cl}from"./QTooltip.53534649.js";import{Q as Ae}from"./QList.ef2ca34f.js";import{Q as he}from"./QCardActions.5642de55.js";import{d as vl,c as ml,u as fl,Q as q,a as k}from"./use-quasar.0b385c2f.js";import{Q as we}from"./QResizeObserver.cf4e2aed.js";import{b as pl,Q as bl,a as yl}from"./QLayout.b8466695.js";import{T as xe}from"./TouchPan.1eabcd0a.js";import{Q as fe}from"./QDialog.84084cfd.js";import{Q as hl}from"./QCheckbox.aff41f06.js";import{Q as gl}from"./QPage.8994904c.js";import{C as pe}from"./ClosePopup.5a991dac.js";import{u as _l}from"./VDB.3e486cc6.js";import{_ as Sl}from"./UserToolbar.e60334de.js";import{a as j}from"./axios.9ab26c22.js";import{a as zl}from"./axios.ba7b1b0e.js";import"./use-key-composition.f55f5f94.js";import"./uid.937d8ee7.js";import"./position-engine.96014762.js";import"./rtl.276c3f1b.js";import"./touch.9135741d.js";const Cl='<g><path fill="none" stroke="currentColor" stroke-width="5" stroke-miterlimit="10" d="M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z"></path><clipPath id="uil-hourglass-clip1"><rect x="15" y="20" width="70" height="25"><animate attributeName="height" from="25" to="0" dur="1s" repeatCount="indefinite" values="25;0;0" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="20" to="45" dur="1s" repeatCount="indefinite" values="20;45;45" keyTimes="0;0.5;1"></animate></rect></clipPath><clipPath id="uil-hourglass-clip2"><rect x="15" y="55" width="70" height="25"><animate attributeName="height" from="0" to="25" dur="1s" repeatCount="indefinite" values="0;25;25" keyTimes="0;0.5;1"></animate><animate attributeName="y" from="80" to="55" dur="1s" repeatCount="indefinite" values="80;55;55" keyTimes="0;0.5;1"></animate></rect></clipPath><path d="M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z" clip-path="url(#uil-hourglass-clip1)" fill="currentColor"></path><path d="M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z" clip-path="url(#uil-hourglass-clip2)" fill="currentColor"></path><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="180 50 50" repeatCount="indefinite" dur="1s" values="0 50 50;0 50 50;180 50 50" keyTimes="0;0.7;1"></animateTransform></g>';var Il=Ie({name:"QSpinnerHourglass",props:Ye,setup(u){const{cSize:I,classes:g}=Je(u);return()=>U("svg",{class:g.value,width:I.value,height:I.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg",innerHTML:Cl})}}),Tl=Ie({props:["store","barStyle","verticalBarStyle","horizontalBarStyle"],setup(u){return()=>[U("div",{class:u.store.scroll.vertical.barClass.value,style:[u.barStyle,u.verticalBarStyle],"aria-hidden":"true",onMousedown:u.store.onVerticalMousedown}),U("div",{class:u.store.scroll.horizontal.barClass.value,style:[u.barStyle,u.horizontalBarStyle],"aria-hidden":"true",onMousedown:u.store.onHorizontalMousedown}),te(U("div",{ref:u.store.scroll.vertical.ref,class:u.store.scroll.vertical.thumbClass.value,style:u.store.scroll.vertical.style.value,"aria-hidden":"true"}),u.store.thumbVertDir),te(U("div",{ref:u.store.scroll.horizontal.ref,class:u.store.scroll.horizontal.thumbClass.value,style:u.store.scroll.horizontal.style.value,"aria-hidden":"true"}),u.store.thumbHorizDir)]}});const Ve=["vertical","horizontal"],Ce={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},Fe={prevent:!0,mouse:!0,mouseAllDir:!0},Ne=u=>u>=250?50:Math.ceil(u/5);var Dl=Ie({name:"QScrollArea",props:{...vl,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],verticalOffset:{type:Array,default:[0,0]},horizontalOffset:{type:Array,default:[0,0]},contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(u,{slots:I,emit:g}){const H=m(!1),ae=m(!1),N=m(!1),f={vertical:m(0),horizontal:m(0)},o={vertical:{ref:m(null),position:m(0),size:m(0)},horizontal:{ref:m(null),position:m(0),size:m(0)}},{proxy:D}=tl(),w=ml(u,D.$q);let h=null,C;const Q=m(null),W=z(()=>"q-scrollarea"+(w.value===!0?" q-scrollarea--dark":""));Object.assign(f,{verticalInner:z(()=>f.vertical.value-u.verticalOffset[0]-u.verticalOffset[1]),horizontalInner:z(()=>f.horizontal.value-u.horizontalOffset[0]-u.horizontalOffset[1])}),o.vertical.percentage=z(()=>{const s=o.vertical.size.value-f.vertical.value;if(s<=0)return 0;const r=ve(o.vertical.position.value/s,0,1);return Math.round(r*1e4)/1e4}),o.vertical.thumbHidden=z(()=>(u.visible===null?N.value:u.visible)!==!0&&H.value===!1&&ae.value===!1||o.vertical.size.value<=f.vertical.value+1),o.vertical.thumbStart=z(()=>u.verticalOffset[0]+o.vertical.percentage.value*(f.verticalInner.value-o.vertical.thumbSize.value)),o.vertical.thumbSize=z(()=>Math.round(ve(f.verticalInner.value*f.verticalInner.value/o.vertical.size.value,Ne(f.verticalInner.value),f.verticalInner.value))),o.vertical.style=z(()=>({...u.thumbStyle,...u.verticalThumbStyle,top:`${o.vertical.thumbStart.value}px`,height:`${o.vertical.thumbSize.value}px`,right:`${u.horizontalOffset[1]}px`})),o.vertical.thumbClass=z(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(o.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),o.vertical.barClass=z(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(o.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),o.horizontal.percentage=z(()=>{const s=o.horizontal.size.value-f.horizontal.value;if(s<=0)return 0;const r=ve(Math.abs(o.horizontal.position.value)/s,0,1);return Math.round(r*1e4)/1e4}),o.horizontal.thumbHidden=z(()=>(u.visible===null?N.value:u.visible)!==!0&&H.value===!1&&ae.value===!1||o.horizontal.size.value<=f.horizontal.value+1),o.horizontal.thumbStart=z(()=>u.horizontalOffset[0]+o.horizontal.percentage.value*(f.horizontalInner.value-o.horizontal.thumbSize.value)),o.horizontal.thumbSize=z(()=>Math.round(ve(f.horizontalInner.value*f.horizontalInner.value/o.horizontal.size.value,Ne(f.horizontalInner.value),f.horizontalInner.value))),o.horizontal.style=z(()=>({...u.thumbStyle,...u.horizontalThumbStyle,[D.$q.lang.rtl===!0?"right":"left"]:`${o.horizontal.thumbStart.value}px`,width:`${o.horizontal.thumbSize.value}px`,bottom:`${u.verticalOffset[1]}px`})),o.horizontal.thumbClass=z(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(o.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),o.horizontal.barClass=z(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(o.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const de=z(()=>o.vertical.thumbHidden.value===!0&&o.horizontal.thumbHidden.value===!0?u.contentStyle:u.contentActiveStyle);function A(){const s={};return Ve.forEach(r=>{const _=o[r];Object.assign(s,{[r+"Position"]:_.position.value,[r+"Percentage"]:_.percentage.value,[r+"Size"]:_.size.value,[r+"ContainerSize"]:f[r].value,[r+"ContainerInnerSize"]:f[r+"Inner"].value})}),s}const T=Ke(()=>{const s=A();s.ref=D,g("scroll",s)},0);function X(s,r,_){if(Ve.includes(s)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(s==="vertical"?Ee:ze)(Q.value,r,_)}function be({height:s,width:r}){let _=!1;f.vertical.value!==s&&(f.vertical.value=s,_=!0),f.horizontal.value!==r&&(f.horizontal.value=r,_=!0),_===!0&&P()}function O({position:s}){let r=!1;o.vertical.position.value!==s.top&&(o.vertical.position.value=s.top,r=!0),o.horizontal.position.value!==s.left&&(o.horizontal.position.value=s.left,r=!0),r===!0&&P()}function oe({height:s,width:r}){o.horizontal.size.value!==r&&(o.horizontal.size.value=r,P()),o.vertical.size.value!==s&&(o.vertical.size.value=s,P())}function V(s,r){const _=o[r];if(s.isFirst===!0){if(_.thumbHidden.value===!0)return;C=_.position.value,ae.value=!0}else if(ae.value!==!0)return;s.isFinal===!0&&(ae.value=!1);const B=Ce[r],se=(_.size.value-f[r].value)/(f[r+"Inner"].value-_.thumbSize.value),ie=s.distance[B.dist],ne=C+(s.direction===B.dir?1:-1)*ie*se;R(ne,r)}function ue(s,r){const _=o[r];if(_.thumbHidden.value!==!0){const B=r==="vertical"?u.verticalOffset[0]:u.horizontalOffset[0],se=s[Ce[r].offset]-B,ie=_.thumbStart.value-B;if(se<ie||se>ie+_.thumbSize.value){const ne=se-_.thumbSize.value/2,_e=ve(ne/(f[r+"Inner"].value-_.thumbSize.value),0,1);R(_e*Math.max(0,_.size.value-f[r].value),r)}_.ref.value!==null&&_.ref.value.dispatchEvent(new MouseEvent(s.type,s))}}function P(){H.value=!0,h!==null&&clearTimeout(h),h=setTimeout(()=>{h=null,H.value=!1},u.delay),u.onScroll!==void 0&&T()}function R(s,r){Q.value[Ce[r].scroll]=s}let n=null;function ye(){n!==null&&clearTimeout(n),n=setTimeout(()=>{n=null,N.value=!0},D.$q.platform.is.ios?50:0)}function Z(){n!==null&&(clearTimeout(n),n=null),N.value=!1}let S=null;We(()=>D.$q.lang.rtl,s=>{Q.value!==null&&ze(Q.value,Math.abs(o.horizontal.position.value)*(s===!0?-1:1))}),Xe(()=>{S={top:o.vertical.position.value,left:o.horizontal.position.value}}),Ze(()=>{if(S===null)return;const s=Q.value;s!==null&&(ze(s,S.left),Ee(s,S.top))}),el(T.cancel),Object.assign(D,{getScrollTarget:()=>Q.value,getScroll:A,getScrollPosition:()=>({top:o.vertical.position.value,left:o.horizontal.position.value}),getScrollPercentage:()=>({top:o.vertical.percentage.value,left:o.horizontal.percentage.value}),setScrollPosition:X,setScrollPercentage(s,r,_){X(s,r*(o[s].size.value-f[s].value)*(s==="horizontal"&&D.$q.lang.rtl===!0?-1:1),_)}});const ge={scroll:o,thumbVertDir:[[xe,s=>{V(s,"vertical")},void 0,{vertical:!0,...Fe}]],thumbHorizDir:[[xe,s=>{V(s,"horizontal")},void 0,{horizontal:!0,...Fe}]],onVerticalMousedown(s){ue(s,"vertical")},onHorizontalMousedown(s){ue(s,"horizontal")}};return()=>U("div",{class:W.value,onMouseenter:ye,onMouseleave:Z},[U("div",{ref:Q,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:u.tabindex!==void 0?u.tabindex:void 0},[U("div",{class:"q-scrollarea__content absolute",style:de.value},ll(I.default,[U(we,{debounce:0,onResize:oe})])),U(pl,{axis:"both",onScroll:O})]),U(we,{debounce:0,onResize:be}),U(Tl,{store:ge,barStyle:u.barStyle,verticalBarStyle:u.verticalBarStyle,horizontalBarStyle:u.horizontalBarStyle})])}});const El={key:0,class:"text-right"},kl={class:"row justify-center"},Al={key:1},wl={key:0},xl={class:"text-h6"},Vl={class:"text-subtitle2"},Fl={class:"row justify-between"},Nl={class:"text-subtitle2"},Ol={class:"text-subtitle2"},Pl={class:"text-h6"},Rl={class:"text-subtitle2"},$l={class:"row justify-between"},Ql={class:"text-subtitle2"},Ml={class:"text-subtitle2"},ql={class:"text-h6 text-center text-bold"},Ul={class:"bg-primary row items-center justify-between q-pa-md text-white"},Bl={class:"text-h4"},Ll={class:"text-center"},jl={class:"fw-bold text-h6"},Hl={class:"text-right"},Gl={class:"fw-bold text-h4"},Yl={class:"row text-center items-center"},Jl={class:"col"},Kl={class:"row text-center items-center"},Wl={class:"col"},Xl={class:"col"},Zl={class:"row flex justify-center"},et={class:"col flex justify-center"},lt={key:0,class:"col"},tt={key:0,class:"row flex justify-center text-center"},at={class:"col"},ot={class:"col"},st={class:"row items-center"},ut={key:0,class:"col-3 bg-blue-grey-2"},it={class:"fs-dec3 row items-center justify-end q-pa-xs text-black"},nt={class:"bg-deep-purple-3 row items-center justify-between q-pa-md text-black"},rt={class:"text-h5"},dt={key:0,class:"text-center"},$t={__name:"ModifyLayout",setup(u){const I=_l(),g=fl(),H=m(!1),ae=I.series,N=m(null),f=m(!1),o=m(null),D=m(""),w=m({state:!1,body:null}),h=m({state:!1,body:null}),C=m({val:null,body:null}),Q=m(!1),W=m(null),de=m(null),A=m({state:!1,body:null}),T=m({state:!1,body:null,account:0}),X=m({state:!1,body:null}),be=m(null),O=m(null),oe=m({val:null,opts:["SI","NO"]}),V=m({prc:null,body:null}),ue=m(0),P=m(""),R=m(null),n=m({EFE:{id:null,val:0},DIG:{id:null,val:0}}),ye=[{id:"EFE",desc:"CONTADO EFECTIVO"},{id:"TBA",desc:"TARJETA C/D BANCOMER"},{id:"TSA",desc:"TARJETA C/D SANTANDER"},{id:"TDB",desc:"TRA/DEP BANCOMER"},{id:"TDA",desc:"TRA/DEP Santander"},{id:"TDS",desc:"TRA/DEP Scotiabank"},{id:"C30",desc:"CREDITO"}],Z=m(!1),S=m(null),ge=["Devolucion","Modificacion","Reimpresion"],s=z(()=>o.value&&D.value.length),r=z(()=>h.value.body.product),_=z(()=>C.value.val&&(S.value=="Devolucion"&&P.value.length>10||S.value=="Reimpresion")||S.value=="Modificacion"),B=z(()=>Number.parseFloat(n.value.DIG.val)+Number.parseFloat(n.value.EFE.val)+Number.parseFloat(ue.value)-O.value),se=z(()=>{var d,e;return!!(((d=n.value.DIG.id)==null?void 0:d.id)!="EFE"&&Number.parseFloat(n.value.DIG.val)&&Number.parseFloat(n.value.DIG.val)>O.value&&Number.parseFloat(n.value.EFE.val)==0||((e=n.value.EFE.id)==null?void 0:e.id)!="EFE"&&Number.parseFloat(n.value.EFE.val)&&Number.parseFloat(n.value.EFE.val)>O.value&&Number.parseFloat(n.value.DIG.val)==0)}),ie=z(()=>{var d,e;return B.value>=0&&(((d=n.value.EFE.id)==null?void 0:d.id)&&n.value.EFE.val>0||((e=n.value.DIG.id)==null?void 0:e.id)&&n.value.DIG.val>0)}),ne=async()=>{let d=I.session.store.id;console.log(d);try{let e=await zl.get(`/cashier/getPrinters/${d}`);e.status==200&&(C.value.body=e.data,console.log("Impresoras listas :)"))}catch(e){console.log(e),g.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},_e=async()=>{w.value.body=null;let d=o.value,e=D.value,c=`http://${I.session.store.ip}/access/public/modify/getTicket?serie=${d}&folio=${e}`;j.get(c).then(v=>{w.value.state=!0,w.value.body=v.data}).catch(v=>{console.log(v.response.data.message),g.notify({html:!0,message:v.response.data.message,color:"negative",position:"center"})})},Oe=async()=>{let d=I.session.store.ip,e=`${I.session.name} - ${I.session.store.alias}`;if(S.value=="Devolucion"){R.value=!0;let a={type:S.value,serie:o.value,folio:D.value,mot:P.value,create:e,print:C.value.val.ip_address};console.log(a);let c=`http://${d}/access/public/modify/newmod`;j.post(c,a).then(v=>{w.value.state=!1,console.log(v),v.status==200?g.notify({html:!0,message:v.data.original.mssg,color:"positive",position:"center"}):g.notify({html:!0,message:v.data.original.message,color:"negative",position:"center"}),S.value=null,P.value="",C.value.val=null,o.value=null,D.value="",R.value=!1}).catch(v=>{console.log(v.response.data.original.message),R.value=!1,g.notify({html:!0,message:v.response.data.original.message,color:"negative",position:"center"}),w.value.state=!1,S.value=null,P.value="",C.value.val=null,o.value=null,D.value="",R.value=!1})}else if(S.value=="Reimpresion"){console.log(C.value.val),R.value=!0;let a={type:S.value,serie:o.value,folio:D.value,print:C.value.val.ip_address},c=`http://${d}/access/public/modify/newmod`;j.post(c,a).then(v=>{w.value.state=!1,console.log(v),S.value=null,C.value.val=null,o.value=null,D.value="",R.value=!1}).catch(v=>v)}else if(S.value=="Modificacion"){console.log("modificado");let a={type:S.value,serie:o.value,folio:D.value};R.value=!0;let c=`http://${d}/access/public/modify/newmod`;j.post(c,a).then(v=>{console.log(v.data),h.value.state=!0,w.value.state=!1,h.value.body=v.data,O.value=Number(v.data.ticket.total),N.value=v.data.ticket.codcli,de.value=v.data.ticket.observacion,R.value=!1}).catch(v=>{console.log(v.response.data.message),R.value=!1,g.notify({html:!0,message:v.response.data.message,color:"negative",position:"center"})})}},Pe=async()=>{console.log("cambio de cliente");let d=N.value;console.log(d);let a=`http://${I.session.store.ip}/access/public/modify/getClient?client=${d}`;j.get(a).then(c=>{console.log(c.data),X.value.body=c.data,h.value.body.ticket.cliente=c.data.NOFCLI,X.value.state=!0}).catch(c=>{console.log(c.response.data),g.notify({html:!0,message:c.response.data,color:"negative",position:"center"})})},Re=d=>{console.log(`Mostrando Articulo ${d.ARTICULO}`),A.value.state=!0,A.value.body=d},$e=async()=>{console.log("Buscando Producto Y propiedades");let d={product:W.value,price:N.value};if(h.value.body.product.findIndex(a=>a.ARTICULO==W.value)==-1){let c=`http://${I.session.store.ip}/access/public/modify/getProduct`;j.get(c,{params:d}).then(v=>{console.log(v.data),T.value.body=v.data,T.value.state=!0}).catch(v=>{console.log(v.response.data),g.notify({html:!0,message:v.response.data,color:"negative",position:"center"})})}else g.notify({html:!0,message:`El productos ${W.value} ya esta en el ticket`,color:"negative",position:"center"})},Qe=()=>{f.value=!0},Me=()=>{console.log("Se eliminara el articulo");let d=A.value.body.ARTICULO,e=h.value.body.product.findIndex(a=>a.ARTICULO==d);console.log(e),h.value.body.product.splice(e,1),A.value.state=!1,O.value=h.value.body.product.reduce((a,c)=>a+Number(c.CANTIDAD)*Number(c.PRECIO),0)},qe=()=>{let d={ARTICULO:T.value.body.CODART,DESCRIPCION:T.value.body.DESART,CANTIDAD:T.value.account,PRECIO:T.value.body.PRELTA,TOTAL:T.value.account*T.value.body.PRELTA};h.value.body.product.push(d),O.value=h.value.body.product.reduce((e,a)=>e+Number(a.CANTIDAD)*Number(a.PRECIO),0),T.value.account=0,W.value=null},Ue=()=>{console.log("recalculando ticket");let d=h.value.body.product,a={cliente:N.value,productos:d},v=`http://${I.session.store.ip}/access/public/modify/getPrices`;j.get(v,{params:a}).then(G=>{console.log(G.data),be.value=G.data,be.value.forEach(re=>{let Y=h.value.body.product.findIndex(Se=>Se.ARTICULO==re.CODART);h.value.body.product[Y].PRECIO=re.PRELTA}),O.value=h.value.body.product.reduce((re,Y)=>re+Number(Y.CANTIDAD)*Number(Y.PRECIO),0),g.notify({html:!0,message:"Total cambiado",color:"positive",position:"center"})}).catch(G=>{console.log(G.response.data),g.notify({html:!0,message:G.response.data,color:"negative",position:"center"})})},Be=()=>{O.value=h.value.body.product.reduce((d,e)=>d+Number(e.CANTIDAD)*Number(e.PRECIO),0)},Le=async()=>{if(oe.value.val=="SI"){console.log("Buscando vales");let e=`http://${I.session.store.ip}/access/public/modify/vales?price=${N.value}`;j.get(e).then(a=>{console.log(a.data),V.value.body=a.data}).catch(a=>{console.log(a.response.data),g.notify({html:!0,message:a.response.data,color:"negative",position:"center"})})}else console.log("No se buscan vales"),V.value.body=null,ue.value=0},Te=()=>Q.value=!0,je=async()=>{g.loading.show({message:"Realizando Devolucion"});let d=I.session.store.ip,e=`${I.session.name} - ${I.session.store.alias}`;console.log("Realizando proceso de modificacion de tickeet");let a={type:S.value,serie:o.value,folio:D.value,mot:P.value,create:e,print:C.value.val.ip_address},c={serdev:o.value,foldev:D.value,fdp:{efedig:n.value,vale:V.value.prc},total:O.value,create:e,productos:h.value.body.product,print:C.value.val.ip_address,cliente:N.value,cambio:B.value};console.log(V.value.prc),console.log(c);let v=`http://${d}/access/public/modify/modificacion`;j.post(v,a).then(G=>{w.value.state=!1,console.log(G),S.value=null,P.value="",D.value="",Q.value=!1,f.value=!1,h.value.state=!1,h.value.body=null,g.notify({html:!0,message:G.data.mssg,color:"positive",position:"center"}),g.loading.hide(),g.loading.show({message:"Realizando Factura"});let re=`http://${d}/access/public/modify/nwtck`;j.post(re,c).then(Y=>{if(g.notify({html:!0,message:Y.data.mssg,color:"positive",position:"center"}),H.value==!0){let Se=`http://${d}/access/public/modify/retirada`,De={nota:Y.data.mssg,retiro:B.value,serdev:o.value,print:C.value.val.ip_address,create:e};console.log(De),j.post(Se,De).then(ce=>{console.log(ce),g.notify({html:!0,message:ce.data.mssg,color:"positive",postion:"center"}),C.value.val=null,o.value=null,H.value=!1,n.value={EFE:{id:null,val:0},DIG:{id:null,val:0}},V.value={prc:null,body:null},Z.value=!1}).catch(ce=>{console.log(ce),g.notify({html:!0,message:ce.data,color:"negative",position:"center"})})}C.value.val=null,o.value=null,H.value=!1,n.value={EFE:{id:null,val:0},DIG:{id:null,val:0}},V.value={prc:null,body:null},Z.value=!1,g.loading.hide()}).catch(Y=>{console.log(Y),g.notify({html:!0,message:Y.data,color:"negative",position:"center"})})}).catch(G=>{g.notify({html:!0,message:G.data.mssg,color:"negative",position:"center"})})},He=d=>{var e;return d.id==((e=n.value.EFE.id)==null?void 0:e.id)},Ge=d=>{var e;return d.id==((e=n.value.DIG.id)==null?void 0:e.id)};return I.session.rol=="aux"||I.session.rol=="gen"||I.session.rol=="aud"||I.session.rol=="root"?ne():(g.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),ne(),(d,e)=>(E(),L(bl,{view:"hHh Lpr fFf"},{default:t(()=>[l(dl,{class:"transparent text-dark",bordered:""},{default:t(()=>[l(Sl),l(M),l(rl,{class:"justify-between"},{default:t(()=>[i("div",null,[e[27]||(e[27]=p("Helpers ")),l(al,{name:"navigate_next",color:"primary"}),e[28]||(e[28]=p()),e[29]||(e[29]=i("span",{class:"text-h6"},"TICKETS",-1))]),l(x,{color:"primary",icon:"add"},{default:t(()=>[l(nl,null,{default:t(()=>[e[30]||(e[30]=i("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1)),l(M),l(me,{dense:"",onSubmit:_e,class:"q-gutter-md q-pa-md"},{default:t(()=>[l(le,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),options:ol(ae),label:"Serie",autofocus:""},null,8,["modelValue","options"]),l(K,{modelValue:D.value,"onUpdate:modelValue":e[1]||(e[1]=a=>D.value=a),type:"number",label:"Folio"},null,8,["modelValue"]),s.value?(E(),ee("div",El,[l(x,{type:"submit",color:"primary",icon:"search"})])):F("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),l(yl,null,{default:t(()=>[l(gl,{class:"bg-grey-3",padding:""},{default:t(()=>[i("div",kl,[l(ke,{name:"bounce"},{default:t(()=>[w.value.state?(E(),L(q,{key:0,style:{"min-width":"400px"},flat:"",bordered:""},{default:t(()=>[l(Ae,{bordered:""},{default:t(()=>[l($,null,{default:t(()=>[l(b,null,{default:t(()=>e[31]||(e[31]=[p("Ticket : ")])),_:1}),l(b,null,{default:t(()=>[p(y(w.value.body.ticket),1)]),_:1})]),_:1}),l($,null,{default:t(()=>[l(b,null,{default:t(()=>e[32]||(e[32]=[p("Cliente : ")])),_:1}),l(b,null,{default:t(()=>[p(y(w.value.body.cliente),1)]),_:1})]),_:1}),l($,null,{default:t(()=>[l(b,null,{default:t(()=>e[33]||(e[33]=[p("Fecha : ")])),_:1}),l(b,null,{default:t(()=>[p(y(w.value.body.fecha),1)]),_:1})]),_:1}),l($,null,{default:t(()=>[l(b,null,{default:t(()=>e[34]||(e[34]=[p("Total : ")])),_:1}),l(b,null,{default:t(()=>[p("$ "+y(w.value.body.total),1)]),_:1})]),_:1}),l(M),l($,{class:"bg-indigo-2"},{default:t(()=>[l(b,null,{default:t(()=>e[35]||(e[35]=[p("Movimiento")])),_:1}),l(b,null,{default:t(()=>[l(le,{dense:"",modelValue:S.value,"onUpdate:modelValue":e[2]||(e[2]=a=>S.value=a),options:ge,label:"Seleccione",filled:"",autofocus:""},null,8,["modelValue"])]),_:1})]),_:1}),S.value=="Devolucion"||S.value=="Reimpresion"?(E(),L($,{key:0},{default:t(()=>[l(b,null,{default:t(()=>e[36]||(e[36]=[p("Impresora")])),_:1}),C.value.body?(E(),L(b,{key:1},{default:t(()=>[l(le,{dense:"","option-label":"name",modelValue:C.value.val,"onUpdate:modelValue":e[3]||(e[3]=a=>C.value.val=a),options:C.value.body,label:"Impresora",filled:"",autofocus:""},null,8,["modelValue","options"])]),_:1})):(E(),L(b,{key:0},{default:t(()=>[l(Il,{color:"purple",size:"2em"}),l(cl,{offset:[0,8]},{default:t(()=>e[37]||(e[37]=[p("Obteniendo Impresoras")])),_:1})]),_:1}))]),_:1})):F("",!0),S.value=="Devolucion"?(E(),ee("div",Al,[l($,null,{default:t(()=>[l(b,null,{default:t(()=>e[38]||(e[38]=[p("Motivo de la devolucion")])),_:1}),l(b,null,{default:t(()=>[l(K,{modelValue:P.value,"onUpdate:modelValue":e[4]||(e[4]=a=>P.value=a),type:"text",label:"describe el motivo"},null,8,["modelValue"])]),_:1})]),_:1})])):F("",!0)]),_:1}),_.value?(E(),ee("div",wl,[l(he,{align:"between"},{default:t(()=>[l(x,{flat:"",icon:"cancel"}),l(x,{flat:"",icon:"arrow_forward",onClick:Oe,disable:R.value},null,8,["disable"])]),_:1})])):F("",!0)]),_:1})):F("",!0)]),_:1})]),l(ke,{name:"bounce"},{default:t(()=>[h.value.state?(E(),L(q,{key:0,class:"my-card",style:{"min-width":"400px"},flat:"",bordered:""},{default:t(()=>[l(Ae,{bordered:""},{default:t(()=>[l(q,{class:"my-card"},{default:t(()=>[l(k,null,{default:t(()=>[l($,{class:"text-center"},{default:t(()=>[l(b,null,{default:t(()=>[l(J,{caption:"",lines:"2"},{default:t(()=>e[39]||(e[39]=[p("Ticket")])),_:1}),l(J,{class:"text-h4"},{default:t(()=>[p(y(h.value.body.ticket.ticket),1)]),_:1})]),_:1}),l(b,null,{default:t(()=>[l(J,{caption:"",lines:"2"},{default:t(()=>e[40]||(e[40]=[p("Fecha")])),_:1}),l(J,{class:"text-h6"},{default:t(()=>[p(y(h.value.body.ticket.fecha),1)]),_:1})]),_:1}),l(b,null,{default:t(()=>[l(J,{caption:"",lines:"2"},{default:t(()=>e[41]||(e[41]=[p("Total")])),_:1}),l(J,{class:"text-h6"},{default:t(()=>[p(y(Number.parseFloat(O.value).toFixed(2)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),l(M,{spaced:"",inset:"",vertical:"",dark:""}),l(q,{class:"my-card"},{default:t(()=>[l(k,null,{default:t(()=>[l($,{class:"text-h6"},{default:t(()=>[l(b,null,{default:t(()=>[l(J,{lines:"2"},{default:t(()=>e[42]||(e[42]=[p("Cliente")])),_:1}),l(J,null,{default:t(()=>[l(me,{onSubmit:Pe,class:"q-gutter-md q-display-flex q-justify-center"},{default:t(()=>[l(K,{modelValue:N.value,"onUpdate:modelValue":e[5]||(e[5]=a=>N.value=a),type:"number",style:{"max-width":"100px"}},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),l(b,null,{default:t(()=>[p(y(h.value.body.ticket.cliente),1)]),_:1})]),_:1})]),_:1})]),_:1}),l(M,{spaced:"",inset:"",vertical:"",dark:""}),l(q,{class:"my-card"},{default:t(()=>[l(k,null,{default:t(()=>[l($,null,{default:t(()=>[l(b,null,{default:t(()=>[l(me,{onSubmit:$e,class:"q-gutter-md"},{default:t(()=>[i("div",null,[l(K,{modelValue:W.value,"onUpdate:modelValue":e[6]||(e[6]=a=>W.value=a),type:"text",label:"Agregar Modelo"},null,8,["modelValue"])])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),l(M,{spaced:"",inset:"",vertical:"",dark:""}),l(q,{class:"my-card"},{default:t(()=>[l(k,null,{default:t(()=>[l($,null,{default:t(()=>[l(b,null,{default:t(()=>e[43]||(e[43]=[p("ARTICULO")])),_:1}),l(b,null,{default:t(()=>e[44]||(e[44]=[p("DESCRIPCION")])),_:1}),l(b,null,{default:t(()=>e[45]||(e[45]=[p("CANTIDAD")])),_:1}),l(b,null,{default:t(()=>e[46]||(e[46]=[p("PRECIO")])),_:1}),l(b,null,{default:t(()=>e[47]||(e[47]=[p("TOTAL")])),_:1})]),_:1}),l(Dl,{style:{height:"300px","max-width":"1700px"}},{default:t(()=>[(E(!0),ee(ul,null,sl(r.value,(a,c)=>te((E(),L($,{class:"border",key:c,onClick:v=>Re(a),clickable:""},{default:t(()=>[l(b,null,{default:t(()=>[p(y(a.ARTICULO),1)]),_:2},1024),l(b,null,{default:t(()=>[p(y(a.DESCRIPCION),1)]),_:2},1024),l(b,null,{default:t(()=>[p(y(Number.parseFloat(a.CANTIDAD).toFixed(2)),1)]),_:2},1024),l(b,null,{default:t(()=>[p("$ "+y(Number.parseFloat(a.PRECIO).toFixed(2)),1)]),_:2},1024),l(b,null,{default:t(()=>[p("$ "+y(Number.parseFloat(a.PRECIO*a.CANTIDAD).toFixed(2)),1)]),_:2},1024)]),_:2},1032,["onClick"])),[[il]])),128))]),_:1})]),_:1})]),_:1}),l(M,{spaced:"",inset:"",vertical:"",dark:""}),l(q,{class:"my-card"},{default:t(()=>[l(k,null,{default:t(()=>[l($,null,{default:t(()=>[l(b,null,{default:t(()=>[l(J,null,{default:t(()=>e[48]||(e[48]=[p("Observaciones")])),_:1})]),_:1}),l(b,{side:"",top:""},{default:t(()=>[l(K,{modelValue:de.value,"onUpdate:modelValue":e[7]||(e[7]=a=>de.value=a),type:"text",label:"observaciones",style:{"max-width":"100%"}},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),l(x,{class:"full-width",color:"primary",icon:"receipt",label:"PAGAR",onClick:Qe})]),_:1})]),_:1})):F("",!0)]),_:1}),l(fe,{modelValue:A.value.state,"onUpdate:modelValue":e[9]||(e[9]=a=>A.value.state=a),position:"right",persistent:""},{default:t(()=>[l(q,{class:"my-card"},{default:t(()=>[l(k,null,{default:t(()=>[i("div",xl,"Articulo : "+y(A.value.body.ARTICULO),1),i("div",Vl,"Descripcion : "+y(A.value.body.DESCRIPCION),1)]),_:1}),l(k,{class:"row"},{default:t(()=>[i("div",Fl,[l(K,{modelValue:A.value.body.CANTIDAD,"onUpdate:modelValue":e[8]||(e[8]=a=>A.value.body.CANTIDAD=a),type:"number",label:"Cantidad",style:{"max-width":"50%"}},null,8,["modelValue"])])]),_:1}),l(k,{class:"row justify-between"},{default:t(()=>[i("div",Nl,"Precio : "+y(Number.parseFloat(A.value.body.PRECIO).toFixed(2)),1),i("div",Ol,"Total : "+y(Number.parseFloat(A.value.body.PRECIO*A.value.body.CANTIDAD).toFixed(2)),1)]),_:1}),l(he,{class:"row justify-between"},{default:t(()=>[l(x,{flat:"",icon:"delete",color:"negative",onClick:Me}),te(l(x,{flat:"",icon:"arrow_forward_ios",disable:A.value.body.CANTIDAD.length<=0,onClick:Be},null,8,["disable"]),[[pe]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(fe,{modelValue:T.value.state,"onUpdate:modelValue":e[11]||(e[11]=a=>T.value.state=a),position:"left",persistent:""},{default:t(()=>[l(q,{class:"my-card"},{default:t(()=>[l(k,null,{default:t(()=>[i("div",Pl,"Articulo : "+y(T.value.body.CODART),1),i("div",Rl,"Descripcion : "+y(T.value.body.DESART),1)]),_:1}),l(k,{class:"row"},{default:t(()=>[i("div",$l,[l(K,{modelValue:T.value.account,"onUpdate:modelValue":e[10]||(e[10]=a=>T.value.account=a),type:"number",label:"Cantidad",style:{"max-width":"50%"}},null,8,["modelValue"])])]),_:1}),l(k,{class:"row justify-between"},{default:t(()=>[i("div",Ql,"Precio : "+y(Number.parseFloat(T.value.body.PRELTA).toFixed(2)),1),i("div",Ml,"Total : "+y(Number.parseFloat(T.value.body.PRELTA*T.value.account).toFixed(2)),1)]),_:1}),l(he,{class:"row justify-between"},{default:t(()=>[te(l(x,{flat:"",icon:"close",color:"positive"},null,512),[[pe]]),te(l(x,{flat:"",icon:"arrow_forward_ios",disable:T.value.account<=0,onClick:qe},null,8,["disable"]),[[pe]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(fe,{modelValue:X.value.state,"onUpdate:modelValue":e[12]||(e[12]=a=>X.value.state=a)},{default:t(()=>[l(q,null,{default:t(()=>[l(k,{class:"items-center"},{default:t(()=>[e[49]||(e[49]=i("div",{class:"text-h5"},"Se cambiara el cliente a:",-1)),l(M,{spaced:"",inset:"",vertical:"",dark:""}),i("div",ql,y(X.value.body.NOFCLI),1),l(M,{spaced:"",inset:"",vertical:"",dark:""}),e[50]||(e[50]=i("div",{class:"q-ml-sm text-center"},"Desea recalcular el ticket ?",-1))]),_:1}),l(he,{align:"center"},{default:t(()=>[te(l(x,{flat:"",icon:"close",color:"primary"},null,512),[[pe]]),te(l(x,{flat:"",icon:"check",color:"positive",onClick:Ue},null,512),[[pe]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(fe,{modelValue:f.value,"onUpdate:modelValue":e[26]||(e[26]=a=>f.value=a)},{default:t(()=>[l(q,{class:"my-card",style:{width:"700px","max-width":"80vw"}},{default:t(()=>[i("div",Ul,[i("div",null,[e[51]||(e[51]=i("div",{class:"fs-dec3"},"TICKET",-1)),i("div",Bl,y(h.value.body.ticket.ticket),1)]),i("div",Ll,[e[52]||(e[52]=i("div",{class:"fs-dec3"},"Total Anterior",-1)),i("div",jl,"$ "+y(w.value.body.total),1)]),i("div",Hl,[e[53]||(e[53]=i("div",{class:"fs-dec3"},"Total Actual",-1)),i("div",Gl,"$ "+y(O.value),1)])]),i("div",null,[l(me,{onSubmit:Te,class:"q-gutter-md"},{default:t(()=>[l(k,null,{default:t(()=>{var a;return[i("div",Yl,[e[54]||(e[54]=i("div",{class:"col"}," Forma de pago: ",-1)),i("div",Jl,[l(le,{class:"col-3",modelValue:n.value.EFE.id,"onUpdate:modelValue":e[13]||(e[13]=c=>n.value.EFE.id=c),options:ye,"option-value":"id","option-label":"desc",dense:"",filled:"",label:"Forma de pago","option-disable":c=>Ge(c)},null,8,["modelValue","option-disable"])])]),l(M,{spaced:"",inset:"",vertical:"",dark:""}),i("div",Kl,[i("div",Wl,y(((a=n.value.EFE.id)==null?void 0:a.id)=="EFE"?"Efectivo":"Importe Cobrado"),1),i("div",Xl,[l(K,{class:"col",modelValue:n.value.EFE.val,"onUpdate:modelValue":e[15]||(e[15]=c=>n.value.EFE.val=c),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4",filled:""},{after:t(()=>[parseFloat(n.value.EFE.val)?(E(),L(x,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:e[14]||(e[14]=c=>n.value.EFE.val=0)})):F("",!0)]),_:1},8,["modelValue"])])])]}),_:1}),l(k,null,{default:t(()=>{var a;return[i("div",Zl,[i("div",et,[l(x,{color:"primary",label:"2\xAA Forma de pago",onClick:e[16]||(e[16]=()=>{Z.value=!Z.value,n.value.DIG.val=0,n.value.DIG.id=null}),outline:"",rounded:"",dense:"",size:"md",style:{width:"70%"}})]),Z.value?(E(),ee("div",lt,[l(le,{class:"col-3",modelValue:n.value.DIG.id,"onUpdate:modelValue":e[17]||(e[17]=c=>n.value.DIG.id=c),options:ye,label:"Forma Pago","option-value":"id","option-label":"desc",dense:"",filled:"","option-disable":c=>He(c)},null,8,["modelValue","option-disable"])])):F("",!0)]),l(M,{spaced:"",inset:"",vertical:"",dark:""}),Z.value?(E(),ee("div",tt,[i("div",at,y(((a=n.value.DIG.id)==null?void 0:a.id)=="EFE"?"Efectivo":"Importe Cobrado"),1),i("div",ot,[l(K,{class:"col",modelValue:n.value.DIG.val,"onUpdate:modelValue":e[19]||(e[19]=c=>n.value.DIG.val=c),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4",filled:""},{after:t(()=>[parseFloat(n.value.DIG.val)?(E(),L(x,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:e[18]||(e[18]=c=>n.value.DIG.val=0)})):F("",!0)]),_:1},8,["modelValue"])])])):F("",!0)]}),_:1}),i("div",null,[l(k,null,{default:t(()=>[l(le,{modelValue:oe.value.val,"onUpdate:modelValue":[e[20]||(e[20]=a=>oe.value.val=a),Le],options:oe.value.opts,label:"Descontar Vale",filled:""},null,8,["modelValue","options"])]),_:1}),oe.value.val=="SI"?(E(),L(k,{key:0},{default:t(()=>[i("div",st,[e[55]||(e[55]=i("div",{class:"col-3"},"No. Vale",-1)),l(le,{modelValue:V.value.prc,"onUpdate:modelValue":[e[21]||(e[21]=a=>V.value.prc=a),e[22]||(e[22]=a=>ue.value=V.value.prc.IMPANT)],options:V.value.body,"option-label":"CODANT",label:"Descontar Vale",filled:"",style:{width:"250px"}},null,8,["modelValue","options"]),l(M,{spaced:"",inset:"",vertical:"",dark:""}),V.value.prc?(E(),ee("div",ut," $ "+y(Number.parseFloat(V.value.prc.IMPANT).toFixed(2)),1)):F("",!0)])]),_:1})):F("",!0),se.value?(E(),L(k,{key:1},{default:t(()=>[i("div",it,[l(hl,{"left-label":"",modelValue:H.value,"onUpdate:modelValue":e[23]||(e[23]=a=>H.value=a),label:"Hacer Retirada de el sobrante"},null,8,["modelValue"])])]),_:1})):F("",!0)])]),_:1})]),i("div",nt,[i("div",null,[e[56]||(e[56]=i("div",{class:"fs-dec3"},"Cambio",-1)),i("div",rt," $ "+y(B.value),1)]),ie.value?(E(),ee("div",dt,[l(x,{color:"primary",icon:"payment",label:"Pagar",onClick:Te})])):F("",!0)]),l(fe,{modelValue:Q.value,"onUpdate:modelValue":e[25]||(e[25]=a=>Q.value=a)},{default:t(()=>[l(q,{class:"my-card"},{default:t(()=>[l(k,null,{default:t(()=>e[57]||(e[57]=[i("div",{class:"text-h6 text-center"},"Impresora",-1)])),_:1}),l(k,null,{default:t(()=>[l(me,{onSubmit:je,class:"q-gutter-md"},{default:t(()=>[l(le,{dense:"","option-label":"name",modelValue:C.value.val,"onUpdate:modelValue":e[24]||(e[24]=a=>C.value.val=a),options:C.value.body,label:"Impresora",filled:"",autofocus:"",style:{width:"200px"}},null,8,["modelValue","options"]),i("div",null,[l(x,{label:"Enviar",type:"submit",color:"primary",style:{width:"200px"}})])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{$t as default};
