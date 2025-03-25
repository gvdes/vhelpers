import{Q as M}from"./QSeparator.1c524e3d.js";import{k as C,j as Oe,aL as Je,aM as Ke,r as v,c as k,V as Xe,p as We,A as Ze,B as el,v as ll,U as tl,a2 as te,m as al,aN as xe,aO as ke,o as I,a as j,w as l,e,i as u,a3 as m,Y as ol,Q as V,f as ue,g as ee,h as R,_ as we,a4 as p,a0 as sl,a1 as ul,a6 as il}from"./index.f230f022.js";import{g as he,d as nl,Q as le,a as Q,b as f,c as K}from"./QSelect.c1eea1d3.js";import{Q as X}from"./QInput.55e7d485.js";import{Q as me}from"./QForm.e982d13c.js";import{Q as rl}from"./QToolbar.27077d41.js";import{Q as dl}from"./QHeader.7126e984.js";import{Q as cl}from"./QTooltip.d40138ae.js";import{Q as Ae}from"./QList.e86be665.js";import{Q as ye}from"./QCardActions.399bf6db.js";import{c as vl,d as ml,u as fl,Q as q,a as x}from"./use-quasar.e39b8eab.js";import{Q as Ve}from"./QResizeObserver.f839cf65.js";import{b as pl,Q as bl,a as hl}from"./QLayout.5338a477.js";import{T as Fe}from"./TouchPan.34add445.js";import{Q as fe}from"./QDialog.4e21d602.js";import{Q as yl}from"./QCheckbox.baf50a2a.js";import{Q as _l}from"./QPage.e6a2a5a9.js";import{C as pe}from"./ClosePopup.f972e7f6.js";import{u as gl}from"./VDB.62c6e2ff.js";import{_ as Cl}from"./UserToolbar.7a022b79.js";import{a as H}from"./axios.f1f32898.js";import{a as Sl}from"./axios.30672b3a.js";import"./use-key-composition.951681c7.js";import"./uid.42677368.js";import"./position-engine.b4a3ff3c.js";import"./rtl.b51694b1.js";import"./touch.70a9dd44.js";const zl=[C("g",[C("path",{fill:"none",stroke:"currentColor","stroke-width":"5","stroke-miterlimit":"10",d:"M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z"}),C("clipPath",{id:"uil-hourglass-clip1"},[C("rect",{x:"15",y:"20",width:" 70",height:"25"},[C("animate",{attributeName:"height",from:"25",to:"0",dur:"1s",repeatCount:"indefinite",values:"25;0;0",keyTimes:"0;0.5;1"}),C("animate",{attributeName:"y",from:"20",to:"45",dur:"1s",repeatCount:"indefinite",values:"20;45;45",keyTimes:"0;0.5;1"})])]),C("clipPath",{id:"uil-hourglass-clip2"},[C("rect",{x:"15",y:"55",width:" 70",height:"25"},[C("animate",{attributeName:"height",from:"0",to:"25",dur:"1s",repeatCount:"indefinite",values:"0;25;25",keyTimes:"0;0.5;1"}),C("animate",{attributeName:"y",from:"80",to:"55",dur:"1s",repeatCount:"indefinite",values:"80;55;55",keyTimes:"0;0.5;1"})])]),C("path",{d:"M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z","clip-path":"url(#uil-hourglass-clip1)",fill:"currentColor"}),C("path",{d:"M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z","clip-path":"url(#uil-hourglass-clip2)",fill:"currentColor"}),C("animateTransform",{attributeName:"transform",type:"rotate",from:"0 50 50",to:"180 50 50",repeatCount:"indefinite",dur:"1s",values:"0 50 50;0 50 50;180 50 50",keyTimes:"0;0.7;1"})])];var Tl=Oe({name:"QSpinnerHourglass",props:Je,setup(g){const{cSize:z,classes:h}=Ke(g);return()=>C("svg",{class:h.value,width:z.value,height:z.value,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid",xmlns:"http://www.w3.org/2000/svg"},zl)}});const Ne=["vertical","horizontal"],De={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},Re={prevent:!0,mouse:!0,mouseAllDir:!0},Pe=g=>g>=250?50:Math.ceil(g/5);var kl=Oe({name:"QScrollArea",props:{...vl,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(g,{slots:z,emit:h}){const B=v(!1),ae=v(!1),P=v(!1),y={vertical:v(0),horizontal:v(0)},o={vertical:{ref:v(null),position:v(0),size:v(0)},horizontal:{ref:v(null),position:v(0),size:v(0)}},{proxy:E}=al(),w=ml(g,E.$q);let b=null,S;const $=v(null),W=k(()=>"q-scrollarea"+(w.value===!0?" q-scrollarea--dark":""));o.vertical.percentage=k(()=>{const s=o.vertical.size.value-y.vertical.value;if(s<=0)return 0;const i=he(o.vertical.position.value/s,0,1);return Math.round(i*1e4)/1e4}),o.vertical.thumbHidden=k(()=>(g.visible===null?P.value:g.visible)!==!0&&B.value===!1&&ae.value===!1||o.vertical.size.value<=y.vertical.value+1),o.vertical.thumbStart=k(()=>o.vertical.percentage.value*(y.vertical.value-o.vertical.thumbSize.value)),o.vertical.thumbSize=k(()=>Math.round(he(y.vertical.value*y.vertical.value/o.vertical.size.value,Pe(y.vertical.value),y.vertical.value))),o.vertical.style=k(()=>({...g.thumbStyle,...g.verticalThumbStyle,top:`${o.vertical.thumbStart.value}px`,height:`${o.vertical.thumbSize.value}px`})),o.vertical.thumbClass=k(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(o.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),o.vertical.barClass=k(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(o.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),o.horizontal.percentage=k(()=>{const s=o.horizontal.size.value-y.horizontal.value;if(s<=0)return 0;const i=he(Math.abs(o.horizontal.position.value)/s,0,1);return Math.round(i*1e4)/1e4}),o.horizontal.thumbHidden=k(()=>(g.visible===null?P.value:g.visible)!==!0&&B.value===!1&&ae.value===!1||o.horizontal.size.value<=y.horizontal.value+1),o.horizontal.thumbStart=k(()=>o.horizontal.percentage.value*(y.horizontal.value-o.horizontal.thumbSize.value)),o.horizontal.thumbSize=k(()=>Math.round(he(y.horizontal.value*y.horizontal.value/o.horizontal.size.value,Pe(y.horizontal.value),y.horizontal.value))),o.horizontal.style=k(()=>({...g.thumbStyle,...g.horizontalThumbStyle,[E.$q.lang.rtl===!0?"right":"left"]:`${o.horizontal.thumbStart.value}px`,width:`${o.horizontal.thumbSize.value}px`})),o.horizontal.thumbClass=k(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(o.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),o.horizontal.barClass=k(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(o.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const re=k(()=>o.vertical.thumbHidden.value===!0&&o.horizontal.thumbHidden.value===!0?g.contentStyle:g.contentActiveStyle),A=[[Fe,s=>{U(s,"vertical")},void 0,{vertical:!0,...Re}]],D=[[Fe,s=>{U(s,"horizontal")},void 0,{horizontal:!0,...Re}]];function Z(){const s={};return Ne.forEach(i=>{const _=o[i];s[i+"Position"]=_.position.value,s[i+"Percentage"]=_.percentage.value,s[i+"Size"]=_.size.value,s[i+"ContainerSize"]=y[i].value}),s}const de=Xe(()=>{const s=Z();s.ref=E,h("scroll",s)},0);function F(s,i,_){if(Ne.includes(s)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(s==="vertical"?xe:ke)($.value,i,_)}function oe({height:s,width:i}){let _=!1;y.vertical.value!==s&&(y.vertical.value=s,_=!0),y.horizontal.value!==i&&(y.horizontal.value=i,_=!0),_===!0&&L()}function N({position:s}){let i=!1;o.vertical.position.value!==s.top&&(o.vertical.position.value=s.top,i=!0),o.horizontal.position.value!==s.left&&(o.horizontal.position.value=s.left,i=!0),i===!0&&L()}function ce({height:s,width:i}){o.horizontal.size.value!==i&&(o.horizontal.size.value=i,L()),o.vertical.size.value!==s&&(o.vertical.size.value=s,L())}function U(s,i){const _=o[i];if(s.isFirst===!0){if(_.thumbHidden.value===!0)return;S=_.position.value,ae.value=!0}else if(ae.value!==!0)return;s.isFinal===!0&&(ae.value=!1);const J=De[i],se=y[i].value,Ce=(_.size.value-se)/(se-_.thumbSize.value),Se=s.distance[J.dist],ze=S+(s.direction===J.dir?1:-1)*Se*Ce;T(ze,i)}function O(s,i){const _=o[i];if(_.thumbHidden.value!==!0){const J=s[De[i].offset];if(J<_.thumbStart.value||J>_.thumbStart.value+_.thumbSize.value){const se=J-_.thumbSize.value/2;T(se/y[i].value*_.size.value,i)}_.ref.value!==null&&_.ref.value.dispatchEvent(new MouseEvent(s.type,s))}}function d(s){O(s,"vertical")}function be(s){O(s,"horizontal")}function L(){B.value=!0,b!==null&&clearTimeout(b),b=setTimeout(()=>{b=null,B.value=!1},g.delay),g.onScroll!==void 0&&de()}function T(s,i){$.value[De[i].scroll]=s}function _e(){P.value=!0}function ge(){P.value=!1}let ie=null;return We(()=>E.$q.lang.rtl,s=>{$.value!==null&&ke($.value,Math.abs(o.horizontal.position.value)*(s===!0?-1:1))}),Ze(()=>{ie={top:o.vertical.position.value,left:o.horizontal.position.value}}),el(()=>{if(ie===null)return;const s=$.value;s!==null&&(ke(s,ie.left),xe(s,ie.top))}),ll(de.cancel),Object.assign(E,{getScrollTarget:()=>$.value,getScroll:Z,getScrollPosition:()=>({top:o.vertical.position.value,left:o.horizontal.position.value}),getScrollPercentage:()=>({top:o.vertical.percentage.value,left:o.horizontal.percentage.value}),setScrollPosition:F,setScrollPercentage(s,i,_){F(s,i*(o[s].size.value-y[s].value)*(s==="horizontal"&&E.$q.lang.rtl===!0?-1:1),_)}}),()=>C("div",{class:W.value,onMouseenter:_e,onMouseleave:ge},[C("div",{ref:$,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:g.tabindex!==void 0?g.tabindex:void 0},[C("div",{class:"q-scrollarea__content absolute",style:re.value},tl(z.default,[C(Ve,{debounce:0,onResize:ce})])),C(pl,{axis:"both",onScroll:N})]),C(Ve,{debounce:0,onResize:oe}),C("div",{class:o.vertical.barClass.value,style:[g.barStyle,g.verticalBarStyle],"aria-hidden":"true",onMousedown:d}),C("div",{class:o.horizontal.barClass.value,style:[g.barStyle,g.horizontalBarStyle],"aria-hidden":"true",onMousedown:be}),te(C("div",{ref:o.vertical.ref,class:o.vertical.thumbClass.value,style:o.vertical.style.value,"aria-hidden":"true"}),A),te(C("div",{ref:o.horizontal.ref,class:o.horizontal.thumbClass.value,style:o.horizontal.style.value,"aria-hidden":"true"}),D)])}});const Dl=u("span",{class:"text-h6"},"TICKETS",-1),El=u("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1),Il={key:0,class:"text-right"},xl={class:"row justify-center"},wl={key:1},Al={key:0},Vl={class:"text-h6"},Fl={class:"text-subtitle2"},Nl={class:"row justify-between"},Rl={class:"text-subtitle2"},Pl={class:"text-subtitle2"},Ol={class:"text-h6"},Ql={class:"text-subtitle2"},$l={class:"row justify-between"},Ml={class:"text-subtitle2"},ql={class:"text-subtitle2"},Ul=u("div",{class:"text-h5"},"Se cambiara el cliente a:",-1),Ll={class:"text-h6 text-center text-bold"},jl=u("div",{class:"q-ml-sm text-center"},"Desea recalcular el ticket ?",-1),Hl={class:"bg-primary row items-center justify-between q-pa-md text-white"},Bl=u("div",{class:"fs-dec3"},"TICKET",-1),Gl={class:"text-h4"},Yl={class:"text-center"},Jl=u("div",{class:"fs-dec3"},"Total Anterior",-1),Kl={class:"fw-bold text-h6"},Xl={class:"text-right"},Wl=u("div",{class:"fs-dec3"},"Total Actual",-1),Zl={class:"fw-bold text-h4"},et={class:"row text-center items-center"},lt=u("div",{class:"col"}," Forma de pago: ",-1),tt={class:"col"},at={class:"row text-center items-center"},ot={class:"col"},st={class:"col"},ut={class:"row flex justify-center"},it={class:"col flex justify-center"},nt={key:0,class:"col"},rt={key:0,class:"row flex justify-center text-center"},dt={class:"col"},ct={class:"col"},vt={class:"row items-center"},mt=u("div",{class:"col-3"},"No. Vale",-1),ft={key:0,class:"col-3 bg-blue-grey-2"},pt={class:"fs-dec3 row items-center justify-end q-pa-xs text-black"},bt={class:"bg-deep-purple-3 row items-center justify-between q-pa-md text-black"},ht=u("div",{class:"fs-dec3"},"Cambio",-1),yt={class:"text-h5"},_t={key:0,class:"text-center"},gt=u("div",{class:"text-h6 text-center"},"Impresora",-1),Yt={__name:"ModifyLayout",setup(g){const z=gl(),h=fl(),B=v(!1),ae=z.series,P=v(null),y=v(!1),o=v(null),E=v(""),w=v({state:!1,body:null}),b=v({state:!1,body:null}),S=v({val:null,body:null}),$=v(!1),W=v(null),re=v(null),A=v({state:!1,body:null}),D=v({state:!1,body:null,account:0}),Z=v({state:!1,body:null}),de=v(null),F=v(null),oe=v({val:null,opts:["SI","NO"]}),N=v({prc:null,body:null}),ce=v(0),U=v(""),O=v(null),d=v({EFE:{id:null,val:0},DIG:{id:null,val:0}}),be=[{id:"EFE",desc:"CONTADO EFECTIVO"},{id:"TBA",desc:"TARJETA C/D BANCOMER"},{id:"TSA",desc:"TARJETA C/D SANTANDER"},{id:"TDB",desc:"TRA/DEP BANCOMER"},{id:"TDA",desc:"TRA/DEP Santander"},{id:"TDS",desc:"TRA/DEP Scotiabank"},{id:"C30",desc:"CREDITO"}],L=v(!1),T=v(null),_e=["Devolucion","Modificacion","Reimpresion"],ge=k(()=>o.value&&E.value.length),ie=k(()=>b.value.body.product),s=k(()=>S.value.val&&(T.value=="Devolucion"&&U.value.length>10||T.value=="Reimpresion")||T.value=="Modificacion"),i=k(()=>Number.parseFloat(d.value.DIG.val)+Number.parseFloat(d.value.EFE.val)+Number.parseFloat(ce.value)-F.value),_=k(()=>{var n,t;return!!(((n=d.value.DIG.id)==null?void 0:n.id)!="EFE"&&Number.parseFloat(d.value.DIG.val)&&Number.parseFloat(d.value.DIG.val)>F.value&&Number.parseFloat(d.value.EFE.val)==0||((t=d.value.EFE.id)==null?void 0:t.id)!="EFE"&&Number.parseFloat(d.value.EFE.val)&&Number.parseFloat(d.value.EFE.val)>F.value&&Number.parseFloat(d.value.DIG.val)==0)}),J=k(()=>{var n,t;return i.value>=0&&(((n=d.value.EFE.id)==null?void 0:n.id)&&d.value.EFE.val>0||((t=d.value.DIG.id)==null?void 0:t.id)&&d.value.DIG.val>0)}),se=async()=>{let n=z.session.store.id;console.log(n);try{let t=await Sl.get(`/cashier/getPrinters/${n}`);t.status==200&&(S.value.body=t.data,console.log("Impresoras listas :)"))}catch(t){console.log(t),h.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},Ce=async()=>{w.value.body=null;let n=o.value,t=E.value,r=`http://${z.session.store.ip}/access/public/modify/getTicket?serie=${n}&folio=${t}`;H.get(r).then(c=>{w.value.state=!0,w.value.body=c.data}).catch(c=>{console.log(c.response.data.message),h.notify({html:!0,message:c.response.data.message,color:"negative",position:"center"})})},Se=async()=>{let n=z.session.store.ip,t=`${z.session.name} - ${z.session.store.alias}`;if(T.value=="Devolucion"){O.value=!0;let a={type:T.value,serie:o.value,folio:E.value,mot:U.value,create:t,print:S.value.val.ip_address};console.log(a);let r=`http://${n}/access/public/modify/newmod`;H.post(r,a).then(c=>{w.value.state=!1,console.log(c),c.status==200?h.notify({html:!0,message:c.data.original.mssg,color:"positive",position:"center"}):h.notify({html:!0,message:c.data.original.message,color:"negative",position:"center"}),T.value=null,U.value="",S.value.val=null,o.value=null,E.value="",O.value=!1}).catch(c=>{console.log(c.response.data.original.message),O.value=!1,h.notify({html:!0,message:c.response.data.original.message,color:"negative",position:"center"}),w.value.state=!1,T.value=null,U.value="",S.value.val=null,o.value=null,E.value="",O.value=!1})}else if(T.value=="Reimpresion"){console.log(S.value.val),O.value=!0;let a={type:T.value,serie:o.value,folio:E.value,print:S.value.val.ip_address},r=`http://${n}/access/public/modify/newmod`;H.post(r,a).then(c=>{w.value.state=!1,console.log(c),T.value=null,S.value.val=null,o.value=null,E.value="",O.value=!1}).catch(c=>c)}else if(T.value=="Modificacion"){console.log("modificado");let a={type:T.value,serie:o.value,folio:E.value};O.value=!0;let r=`http://${n}/access/public/modify/newmod`;H.post(r,a).then(c=>{console.log(c.data),b.value.state=!0,w.value.state=!1,b.value.body=c.data,F.value=Number(c.data.ticket.total),P.value=c.data.ticket.codcli,re.value=c.data.ticket.observacion,O.value=!1}).catch(c=>{console.log(c.response.data.message),O.value=!1,h.notify({html:!0,message:c.response.data.message,color:"negative",position:"center"})})}},ze=async()=>{console.log("cambio de cliente");let n=P.value;console.log(n);let a=`http://${z.session.store.ip}/access/public/modify/getClient?client=${n}`;H.get(a).then(r=>{console.log(r.data),Z.value.body=r.data,b.value.body.ticket.cliente=r.data.NOFCLI,Z.value.state=!0}).catch(r=>{console.log(r.response.data),h.notify({html:!0,message:r.response.data,color:"negative",position:"center"})})},Qe=n=>{console.log(`Mostrando Articulo ${n.ARTICULO}`),A.value.state=!0,A.value.body=n},$e=async()=>{console.log("Buscando Producto Y propiedades");let n={product:W.value,price:P.value};if(b.value.body.product.findIndex(a=>a.ARTICULO==W.value)==-1){let r=`http://${z.session.store.ip}/access/public/modify/getProduct`;H.get(r,{params:n}).then(c=>{console.log(c.data),D.value.body=c.data,D.value.state=!0}).catch(c=>{console.log(c.response.data),h.notify({html:!0,message:c.response.data,color:"negative",position:"center"})})}else h.notify({html:!0,message:`El productos ${W.value} ya esta en el ticket`,color:"negative",position:"center"})},Me=()=>{y.value=!0},qe=()=>{console.log("Se eliminara el articulo");let n=A.value.body.ARTICULO,t=b.value.body.product.findIndex(a=>a.ARTICULO==n);console.log(t),b.value.body.product.splice(t,1),A.value.state=!1,F.value=b.value.body.product.reduce((a,r)=>a+Number(r.CANTIDAD)*Number(r.PRECIO),0)},Ue=()=>{let n={ARTICULO:D.value.body.CODART,DESCRIPCION:D.value.body.DESART,CANTIDAD:D.value.account,PRECIO:D.value.body.PRELTA,TOTAL:D.value.account*D.value.body.PRELTA};b.value.body.product.push(n),F.value=b.value.body.product.reduce((t,a)=>t+Number(a.CANTIDAD)*Number(a.PRECIO),0),D.value.account=0,W.value=null},Le=()=>{console.log("recalculando ticket");let n=b.value.body.product,a={cliente:P.value,productos:n},c=`http://${z.session.store.ip}/access/public/modify/getPrices`;H.get(c,{params:a}).then(G=>{console.log(G.data),de.value=G.data,de.value.forEach(ne=>{let Y=b.value.body.product.findIndex(Te=>Te.ARTICULO==ne.CODART);b.value.body.product[Y].PRECIO=ne.PRELTA}),F.value=b.value.body.product.reduce((ne,Y)=>ne+Number(Y.CANTIDAD)*Number(Y.PRECIO),0),h.notify({html:!0,message:"Total cambiado",color:"positive",position:"center"})}).catch(G=>{console.log(G.response.data),h.notify({html:!0,message:G.response.data,color:"negative",position:"center"})})},je=()=>{F.value=b.value.body.product.reduce((n,t)=>n+Number(t.CANTIDAD)*Number(t.PRECIO),0)},He=async()=>{if(oe.value.val=="SI"){console.log("Buscando vales");let t=`http://${z.session.store.ip}/access/public/modify/vales?price=${P.value}`;H.get(t).then(a=>{console.log(a.data),N.value.body=a.data}).catch(a=>{console.log(a.response.data),h.notify({html:!0,message:a.response.data,color:"negative",position:"center"})})}else console.log("No se buscan vales"),N.value.body=null,ce.value=0},Ee=()=>$.value=!0,Be=async()=>{h.loading.show({message:"Realizando Devolucion"});let n=z.session.store.ip,t=`${z.session.name} - ${z.session.store.alias}`;console.log("Realizando proceso de modificacion de tickeet");let a={type:T.value,serie:o.value,folio:E.value,mot:U.value,create:t,print:S.value.val.ip_address},r={serdev:o.value,foldev:E.value,fdp:{efedig:d.value,vale:N.value.prc},total:F.value,create:t,productos:b.value.body.product,print:S.value.val.ip_address,cliente:P.value,cambio:i.value};console.log(N.value.prc),console.log(r);let c=`http://${n}/access/public/modify/modificacion`;H.post(c,a).then(G=>{w.value.state=!1,console.log(G),T.value=null,U.value="",E.value="",$.value=!1,y.value=!1,b.value.state=!1,b.value.body=null,h.notify({html:!0,message:G.data.mssg,color:"positive",position:"center"}),h.loading.hide(),h.loading.show({message:"Realizando Factura"});let ne=`http://${n}/access/public/modify/nwtck`;H.post(ne,r).then(Y=>{if(h.notify({html:!0,message:Y.data.mssg,color:"positive",position:"center"}),B.value==!0){let Te=`http://${n}/access/public/modify/retirada`,Ie={nota:Y.data.mssg,retiro:i.value,serdev:o.value,print:S.value.val.ip_address,create:t};console.log(Ie),H.post(Te,Ie).then(ve=>{console.log(ve),h.notify({html:!0,message:ve.data.mssg,color:"positive",postion:"center"}),S.value.val=null,o.value=null,B.value=!1,d.value={EFE:{id:null,val:0},DIG:{id:null,val:0}},N.value={prc:null,body:null},L.value=!1}).catch(ve=>{console.log(ve),h.notify({html:!0,message:ve.data,color:"negative",position:"center"})})}S.value.val=null,o.value=null,B.value=!1,d.value={EFE:{id:null,val:0},DIG:{id:null,val:0}},N.value={prc:null,body:null},L.value=!1,h.loading.hide()}).catch(Y=>{console.log(Y),h.notify({html:!0,message:Y.data,color:"negative",position:"center"})})}).catch(G=>{h.notify({html:!0,message:G.data.mssg,color:"negative",position:"center"})})},Ge=n=>{var t;return n.id==((t=d.value.EFE.id)==null?void 0:t.id)},Ye=n=>{var t;return n.id==((t=d.value.DIG.id)==null?void 0:t.id)};return z.session.rol=="aux"||z.session.rol=="gen"||z.session.rol=="aud"||z.session.rol=="root"?se():(h.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),se(),(n,t)=>(I(),j(bl,{view:"hHh Lpr fFf"},{default:l(()=>[e(dl,{class:"transparent text-dark",bordered:""},{default:l(()=>[e(Cl),e(M),e(rl,{class:"justify-between"},{default:l(()=>[u("div",null,[m("Helpers "),e(ol,{name:"navigate_next",color:"primary"}),m(),Dl]),e(V,{color:"primary",icon:"add"},{default:l(()=>[e(nl,null,{default:l(()=>[El,e(M),e(me,{dense:"",onSubmit:Ce,class:"q-gutter-md q-pa-md"},{default:l(()=>[e(le,{modelValue:o.value,"onUpdate:modelValue":t[0]||(t[0]=a=>o.value=a),options:ue(ae),label:"Serie",autofocus:""},null,8,["modelValue","options"]),e(X,{modelValue:E.value,"onUpdate:modelValue":t[1]||(t[1]=a=>E.value=a),type:"number",label:"Folio"},null,8,["modelValue"]),ue(ge)?(I(),ee("div",Il,[e(V,{type:"submit",color:"primary",icon:"search"})])):R("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(hl,null,{default:l(()=>[e(_l,{class:"bg-grey-3",padding:""},{default:l(()=>[u("div",xl,[e(we,{name:"bounce"},{default:l(()=>[w.value.state?(I(),j(q,{key:0,style:{"min-width":"400px"},flat:"",bordered:""},{default:l(()=>[e(Ae,{bordered:""},{default:l(()=>[e(Q,null,{default:l(()=>[e(f,null,{default:l(()=>[m("Ticket : ")]),_:1}),e(f,null,{default:l(()=>[m(p(w.value.body.ticket),1)]),_:1})]),_:1}),e(Q,null,{default:l(()=>[e(f,null,{default:l(()=>[m("Cliente : ")]),_:1}),e(f,null,{default:l(()=>[m(p(w.value.body.cliente),1)]),_:1})]),_:1}),e(Q,null,{default:l(()=>[e(f,null,{default:l(()=>[m("Fecha : ")]),_:1}),e(f,null,{default:l(()=>[m(p(w.value.body.fecha),1)]),_:1})]),_:1}),e(Q,null,{default:l(()=>[e(f,null,{default:l(()=>[m("Total : ")]),_:1}),e(f,null,{default:l(()=>[m("$ "+p(w.value.body.total),1)]),_:1})]),_:1}),e(M),e(Q,{class:"bg-indigo-2"},{default:l(()=>[e(f,null,{default:l(()=>[m("Movimiento")]),_:1}),e(f,null,{default:l(()=>[e(le,{dense:"",modelValue:T.value,"onUpdate:modelValue":t[2]||(t[2]=a=>T.value=a),options:_e,label:"Seleccione",filled:"",autofocus:""},null,8,["modelValue"])]),_:1})]),_:1}),T.value=="Devolucion"||T.value=="Reimpresion"?(I(),j(Q,{key:0},{default:l(()=>[e(f,null,{default:l(()=>[m("Impresora")]),_:1}),S.value.body?(I(),j(f,{key:1},{default:l(()=>[e(le,{dense:"","option-label":"name",modelValue:S.value.val,"onUpdate:modelValue":t[3]||(t[3]=a=>S.value.val=a),options:S.value.body,label:"Impresora",filled:"",autofocus:""},null,8,["modelValue","options"])]),_:1})):(I(),j(f,{key:0},{default:l(()=>[e(Tl,{color:"purple",size:"2em"}),e(cl,{offset:[0,8]},{default:l(()=>[m("Obteniendo Impresoras")]),_:1})]),_:1}))]),_:1})):R("",!0),T.value=="Devolucion"?(I(),ee("div",wl,[e(Q,null,{default:l(()=>[e(f,null,{default:l(()=>[m("Motivo de la devolucion")]),_:1}),e(f,null,{default:l(()=>[e(X,{modelValue:U.value,"onUpdate:modelValue":t[4]||(t[4]=a=>U.value=a),type:"text",label:"describe el motivo"},null,8,["modelValue"])]),_:1})]),_:1})])):R("",!0)]),_:1}),ue(s)?(I(),ee("div",Al,[e(ye,{align:"between"},{default:l(()=>[e(V,{flat:"",icon:"cancel"}),e(V,{flat:"",icon:"arrow_forward",onClick:Se,disable:O.value},null,8,["disable"])]),_:1})])):R("",!0)]),_:1})):R("",!0)]),_:1})]),e(we,{name:"bounce"},{default:l(()=>[b.value.state?(I(),j(q,{key:0,class:"my-card",style:{"min-width":"400px"},flat:"",bordered:""},{default:l(()=>[e(Ae,{bordered:""},{default:l(()=>[e(q,{class:"my-card"},{default:l(()=>[e(x,null,{default:l(()=>[e(Q,{class:"text-center"},{default:l(()=>[e(f,null,{default:l(()=>[e(K,{caption:"",lines:"2"},{default:l(()=>[m("Ticket")]),_:1}),e(K,{class:"text-h4"},{default:l(()=>[m(p(b.value.body.ticket.ticket),1)]),_:1})]),_:1}),e(f,null,{default:l(()=>[e(K,{caption:"",lines:"2"},{default:l(()=>[m("Fecha")]),_:1}),e(K,{class:"text-h6"},{default:l(()=>[m(p(b.value.body.ticket.fecha),1)]),_:1})]),_:1}),e(f,null,{default:l(()=>[e(K,{caption:"",lines:"2"},{default:l(()=>[m("Total")]),_:1}),e(K,{class:"text-h6"},{default:l(()=>[m(p(Number.parseFloat(F.value).toFixed(2)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(M,{spaced:"",inset:"",vertical:"",dark:""}),e(q,{class:"my-card"},{default:l(()=>[e(x,null,{default:l(()=>[e(Q,{class:"text-h6"},{default:l(()=>[e(f,null,{default:l(()=>[e(K,{lines:"2"},{default:l(()=>[m("Cliente")]),_:1}),e(K,null,{default:l(()=>[e(me,{onSubmit:ze,class:"q-gutter-md q-display-flex q-justify-center"},{default:l(()=>[e(X,{modelValue:P.value,"onUpdate:modelValue":t[5]||(t[5]=a=>P.value=a),type:"number",style:{"max-width":"100px"}},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(f,null,{default:l(()=>[m(p(b.value.body.ticket.cliente),1)]),_:1})]),_:1})]),_:1})]),_:1}),e(M,{spaced:"",inset:"",vertical:"",dark:""}),e(q,{class:"my-card"},{default:l(()=>[e(x,null,{default:l(()=>[e(Q,null,{default:l(()=>[e(f,null,{default:l(()=>[e(me,{onSubmit:$e,class:"q-gutter-md"},{default:l(()=>[u("div",null,[e(X,{modelValue:W.value,"onUpdate:modelValue":t[6]||(t[6]=a=>W.value=a),type:"text",label:"Agregar Modelo"},null,8,["modelValue"])])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(M,{spaced:"",inset:"",vertical:"",dark:""}),e(q,{class:"my-card"},{default:l(()=>[e(x,null,{default:l(()=>[e(Q,null,{default:l(()=>[e(f,null,{default:l(()=>[m("ARTICULO")]),_:1}),e(f,null,{default:l(()=>[m("DESCRIPCION")]),_:1}),e(f,null,{default:l(()=>[m("CANTIDAD")]),_:1}),e(f,null,{default:l(()=>[m("PRECIO")]),_:1}),e(f,null,{default:l(()=>[m("TOTAL")]),_:1})]),_:1}),e(kl,{style:{height:"300px","max-width":"1700px"}},{default:l(()=>[(I(!0),ee(ul,null,sl(ue(ie),(a,r)=>te((I(),j(Q,{class:"border",key:r,onClick:c=>Qe(a),clickable:""},{default:l(()=>[e(f,null,{default:l(()=>[m(p(a.ARTICULO),1)]),_:2},1024),e(f,null,{default:l(()=>[m(p(a.DESCRIPCION),1)]),_:2},1024),e(f,null,{default:l(()=>[m(p(Number.parseFloat(a.CANTIDAD).toFixed(2)),1)]),_:2},1024),e(f,null,{default:l(()=>[m("$ "+p(Number.parseFloat(a.PRECIO).toFixed(2)),1)]),_:2},1024),e(f,null,{default:l(()=>[m("$ "+p(Number.parseFloat(a.PRECIO*a.CANTIDAD).toFixed(2)),1)]),_:2},1024)]),_:2},1032,["onClick"])),[[il]])),128))]),_:1})]),_:1})]),_:1}),e(M,{spaced:"",inset:"",vertical:"",dark:""}),e(q,{class:"my-card"},{default:l(()=>[e(x,null,{default:l(()=>[e(Q,null,{default:l(()=>[e(f,null,{default:l(()=>[e(K,null,{default:l(()=>[m("Observaciones")]),_:1})]),_:1}),e(f,{side:"",top:""},{default:l(()=>[e(X,{modelValue:re.value,"onUpdate:modelValue":t[7]||(t[7]=a=>re.value=a),type:"text",label:"observaciones",style:{"max-width":"100%"}},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),e(V,{class:"full-width",color:"primary",icon:"receipt",label:"PAGAR",onClick:Me})]),_:1})]),_:1})):R("",!0)]),_:1}),e(fe,{modelValue:A.value.state,"onUpdate:modelValue":t[9]||(t[9]=a=>A.value.state=a),position:"right",persistent:""},{default:l(()=>[e(q,{class:"my-card"},{default:l(()=>[e(x,null,{default:l(()=>[u("div",Vl,"Articulo : "+p(A.value.body.ARTICULO),1),u("div",Fl,"Descripcion : "+p(A.value.body.DESCRIPCION),1)]),_:1}),e(x,{class:"row"},{default:l(()=>[u("div",Nl,[e(X,{modelValue:A.value.body.CANTIDAD,"onUpdate:modelValue":t[8]||(t[8]=a=>A.value.body.CANTIDAD=a),type:"number",label:"Cantidad",style:{"max-width":"50%"}},null,8,["modelValue"])])]),_:1}),e(x,{class:"row justify-between"},{default:l(()=>[u("div",Rl,"Precio : "+p(Number.parseFloat(A.value.body.PRECIO).toFixed(2)),1),u("div",Pl,"Total : "+p(Number.parseFloat(A.value.body.PRECIO*A.value.body.CANTIDAD).toFixed(2)),1)]),_:1}),e(ye,{class:"row justify-between"},{default:l(()=>[e(V,{flat:"",icon:"delete",color:"negative",onClick:qe}),te(e(V,{flat:"",icon:"arrow_forward_ios",disable:A.value.body.CANTIDAD.length<=0,onClick:je},null,8,["disable"]),[[pe]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(fe,{modelValue:D.value.state,"onUpdate:modelValue":t[11]||(t[11]=a=>D.value.state=a),position:"left",persistent:""},{default:l(()=>[e(q,{class:"my-card"},{default:l(()=>[e(x,null,{default:l(()=>[u("div",Ol,"Articulo : "+p(D.value.body.CODART),1),u("div",Ql,"Descripcion : "+p(D.value.body.DESART),1)]),_:1}),e(x,{class:"row"},{default:l(()=>[u("div",$l,[e(X,{modelValue:D.value.account,"onUpdate:modelValue":t[10]||(t[10]=a=>D.value.account=a),type:"number",label:"Cantidad",style:{"max-width":"50%"}},null,8,["modelValue"])])]),_:1}),e(x,{class:"row justify-between"},{default:l(()=>[u("div",Ml,"Precio : "+p(Number.parseFloat(D.value.body.PRELTA).toFixed(2)),1),u("div",ql,"Total : "+p(Number.parseFloat(D.value.body.PRELTA*D.value.account).toFixed(2)),1)]),_:1}),e(ye,{class:"row justify-between"},{default:l(()=>[te(e(V,{flat:"",icon:"close",color:"positive"},null,512),[[pe]]),te(e(V,{flat:"",icon:"arrow_forward_ios",disable:D.value.account<=0,onClick:Ue},null,8,["disable"]),[[pe]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(fe,{modelValue:Z.value.state,"onUpdate:modelValue":t[12]||(t[12]=a=>Z.value.state=a)},{default:l(()=>[e(q,null,{default:l(()=>[e(x,{class:"items-center"},{default:l(()=>[Ul,e(M,{spaced:"",inset:"",vertical:"",dark:""}),u("div",Ll,p(Z.value.body.NOFCLI),1),e(M,{spaced:"",inset:"",vertical:"",dark:""}),jl]),_:1}),e(ye,{align:"center"},{default:l(()=>[te(e(V,{flat:"",icon:"close",color:"primary"},null,512),[[pe]]),te(e(V,{flat:"",icon:"check",color:"positive",onClick:Le},null,512),[[pe]])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(fe,{modelValue:y.value,"onUpdate:modelValue":t[26]||(t[26]=a=>y.value=a)},{default:l(()=>[e(q,{class:"my-card",style:{width:"700px","max-width":"80vw"}},{default:l(()=>[u("div",Hl,[u("div",null,[Bl,u("div",Gl,p(b.value.body.ticket.ticket),1)]),u("div",Yl,[Jl,u("div",Kl,"$ "+p(w.value.body.total),1)]),u("div",Xl,[Wl,u("div",Zl,"$ "+p(F.value),1)])]),u("div",null,[e(me,{onSubmit:Ee,class:"q-gutter-md"},{default:l(()=>[e(x,null,{default:l(()=>{var a;return[u("div",et,[lt,u("div",tt,[e(le,{class:"col-3",modelValue:d.value.EFE.id,"onUpdate:modelValue":t[13]||(t[13]=r=>d.value.EFE.id=r),options:be,"option-value":"id","option-label":"desc",dense:"",filled:"",label:"Forma de pago","option-disable":r=>Ye(r)},null,8,["modelValue","option-disable"])])]),e(M,{spaced:"",inset:"",vertical:"",dark:""}),u("div",at,[u("div",ot,p(((a=d.value.EFE.id)==null?void 0:a.id)=="EFE"?"Efectivo":"Importe Cobrado"),1),u("div",st,[e(X,{class:"col",modelValue:d.value.EFE.val,"onUpdate:modelValue":t[15]||(t[15]=r=>d.value.EFE.val=r),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4",filled:""},{after:l(()=>[parseFloat(d.value.EFE.val)?(I(),j(V,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:t[14]||(t[14]=r=>d.value.EFE.val=0)})):R("",!0)]),_:1},8,["modelValue","min"])])])]}),_:1}),e(x,null,{default:l(()=>{var a;return[u("div",ut,[u("div",it,[e(V,{color:"primary",label:"2\xAA Forma de pago",onClick:t[16]||(t[16]=()=>{L.value=!L.value,d.value.DIG.val=0,d.value.DIG.id=null}),outline:"",rounded:"",dense:"",size:"md",style:{width:"70%"}})]),L.value?(I(),ee("div",nt,[e(le,{class:"col-3",modelValue:d.value.DIG.id,"onUpdate:modelValue":t[17]||(t[17]=r=>d.value.DIG.id=r),options:be,label:"Forma Pago","option-value":"id","option-label":"desc",dense:"",filled:"","option-disable":r=>Ge(r)},null,8,["modelValue","option-disable"])])):R("",!0)]),e(M,{spaced:"",inset:"",vertical:"",dark:""}),L.value?(I(),ee("div",rt,[u("div",dt,p(((a=d.value.DIG.id)==null?void 0:a.id)=="EFE"?"Efectivo":"Importe Cobrado"),1),u("div",ct,[e(X,{class:"col",modelValue:d.value.DIG.val,"onUpdate:modelValue":t[19]||(t[19]=r=>d.value.DIG.val=r),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4",filled:""},{after:l(()=>[parseFloat(d.value.DIG.val)?(I(),j(V,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:t[18]||(t[18]=r=>d.value.DIG.val=0)})):R("",!0)]),_:1},8,["modelValue","min"])])])):R("",!0)]}),_:1}),u("div",null,[e(x,null,{default:l(()=>[e(le,{modelValue:oe.value.val,"onUpdate:modelValue":[t[20]||(t[20]=a=>oe.value.val=a),He],options:oe.value.opts,label:"Descontar Vale",filled:""},null,8,["modelValue","options"])]),_:1}),oe.value.val=="SI"?(I(),j(x,{key:0},{default:l(()=>[u("div",vt,[mt,e(le,{modelValue:N.value.prc,"onUpdate:modelValue":[t[21]||(t[21]=a=>N.value.prc=a),t[22]||(t[22]=a=>ce.value=N.value.prc.IMPANT)],options:N.value.body,"option-label":"CODANT",label:"Descontar Vale",filled:"",style:{width:"250px"}},null,8,["modelValue","options"]),e(M,{spaced:"",inset:"",vertical:"",dark:""}),N.value.prc?(I(),ee("div",ft," $ "+p(Number.parseFloat(N.value.prc.IMPANT).toFixed(2)),1)):R("",!0)])]),_:1})):R("",!0),ue(_)?(I(),j(x,{key:1},{default:l(()=>[u("div",pt,[e(yl,{"left-label":"",modelValue:B.value,"onUpdate:modelValue":t[23]||(t[23]=a=>B.value=a),label:"Hacer Retirada de el sobrante"},null,8,["modelValue"])])]),_:1})):R("",!0)])]),_:1})]),u("div",bt,[u("div",null,[ht,u("div",yt," $ "+p(ue(i)),1)]),ue(J)?(I(),ee("div",_t,[e(V,{color:"primary",icon:"payment",label:"Pagar",onClick:Ee})])):R("",!0)]),e(fe,{modelValue:$.value,"onUpdate:modelValue":t[25]||(t[25]=a=>$.value=a)},{default:l(()=>[e(q,{class:"my-card"},{default:l(()=>[e(x,null,{default:l(()=>[gt]),_:1}),e(x,null,{default:l(()=>[e(me,{onSubmit:Be,class:"q-gutter-md"},{default:l(()=>[e(le,{dense:"","option-label":"name",modelValue:S.value.val,"onUpdate:modelValue":t[24]||(t[24]=a=>S.value.val=a),options:S.value.body,label:"Impresora",filled:"",autofocus:"",style:{width:"200px"}},null,8,["modelValue","options"]),u("div",null,[e(V,{label:"Enviar",type:"submit",color:"primary",style:{width:"200px"}})])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Yt as default};
