import{Q as ee}from"./QSeparator.1e30bf59.js";import{j as G,at as he,$ as I,J as ye,az as _e,av as N,aA as H,af as te,D as z,aw as W,r as P,c as k,p as de,m as ce,k as $,_ as we,aB as ke,l as Z,s as xe,aC as Ce,aa as Se,o as M,g as F,a as X,w,e as m,i as C,a4 as L,f as D,Q as O,a3 as R,a1 as ae,a0 as Pe,h as K,aD as Te,u as Ae,Y as De,aE as Ee}from"./index.00e62a55.js";import{Q as Qe,d as Ve}from"./QSelect.edfceb70.js";import{Q as Me}from"./QInput.d28c3313.js";import{Q as Le}from"./QForm.b58ee416.js";import{Q as $e}from"./QToolbar.e1f085c3.js";import{Q as qe}from"./QHeader.bb26ef4f.js";import{Q as pe}from"./QTable.d5a46261.js";import{c as Ie,d as Be,a as oe,Q as J,u as Ue}from"./use-quasar.6ca7eeb7.js";import{Q as Re}from"./QDialog.1bc1008f.js";import{Q as je}from"./QPage.fd46a8f4.js";import{Q as Ye,a as Ne}from"./QLayout.58073940.js";import{d as B}from"./dayjs.min.25545ff6.js";import{_ as Fe}from"./UserToolbar.3c127de0.js";import{v as ne}from"./axios.ae0a941c.js";import{u as Oe}from"./VDB.aaaf8a94.js";import{u as He,a as ze,b as We,Q as Xe}from"./QTabs.3ae95e2e.js";import{g as se,s as le}from"./touch.70a9dd44.js";import{e as Ke}from"./position-engine.3a036981.js";import{u as Je}from"./use-cache.b0833c75.js";import{E as Ge}from"./exceljs.min.9e24d01d.js";import{c as U}from"./_commonjsHelpers.88e99c8f.js";import"./use-key-composition.f7f5cb71.js";import"./uid.42677368.js";import"./rtl.b51694b1.js";import"./QResizeObserver.75a41c01.js";import"./QList.524b32e3.js";import"./QLinearProgress.5e6dfdf7.js";import"./QCheckbox.b887bf6e.js";import"./QCardActions.fc4ace56.js";import"./ClosePopup.e6f2960a.js";import"./axios.f1f32898.js";var ve={index({dateranges:t,view:s,store:d}){let p=s.id;return t.to,t.from,ne.get(`/ciclicos?v=${p}&store=${d}`).then(c=>c.data).catch(c=>({fail:c}))},find(t,s){return ne.get(`/ciclicos/${t}?store=${s}`).then(d=>d.data).catch(d=>({fail:d}))}},re=G({name:"QTab",props:He,emits:ze,setup(t,{slots:s,emit:d}){const{renderTab:p}=We(t,s,d);return()=>p("div")}});function Ze(t){const s=[.06,6,50];return typeof t=="string"&&t.length&&t.split(":").forEach((d,p)=>{const c=parseFloat(d);c&&(s[p]=c)}),s}var et=he({name:"touch-swipe",beforeMount(t,{value:s,arg:d,modifiers:p}){if(p.mouse!==!0&&I.has.touch!==!0)return;const c=p.mouseCapture===!0?"Capture":"",e={handler:s,sensitivity:Ze(d),direction:se(p),noop:ye,mouseStart(a){le(a,e)&&_e(a)&&(N(e,"temp",[[document,"mousemove","move",`notPassive${c}`],[document,"mouseup","end","notPassiveCapture"]]),e.start(a,!0))},touchStart(a){if(le(a,e)){const u=a.target;N(e,"temp",[[u,"touchmove","move","notPassiveCapture"],[u,"touchcancel","end","notPassiveCapture"],[u,"touchend","end","notPassiveCapture"]]),e.start(a)}},start(a,u){I.is.firefox===!0&&H(t,!0);const x=te(a);e.event={x:x.left,y:x.top,time:Date.now(),mouse:u===!0,dir:!1}},move(a){if(e.event===void 0)return;if(e.event.dir!==!1){z(a);return}const u=Date.now()-e.event.time;if(u===0)return;const x=te(a),l=x.left-e.event.x,o=Math.abs(l),g=x.top-e.event.y,n=Math.abs(g);if(e.event.mouse!==!0){if(o<e.sensitivity[1]&&n<e.sensitivity[1]){e.end(a);return}}else if(o<e.sensitivity[2]&&n<e.sensitivity[2])return;const f=o/u,T=n/u;e.direction.vertical===!0&&o<n&&o<100&&T>e.sensitivity[0]&&(e.event.dir=g<0?"up":"down"),e.direction.horizontal===!0&&o>n&&n<100&&f>e.sensitivity[0]&&(e.event.dir=l<0?"left":"right"),e.direction.up===!0&&o<n&&g<0&&o<100&&T>e.sensitivity[0]&&(e.event.dir="up"),e.direction.down===!0&&o<n&&g>0&&o<100&&T>e.sensitivity[0]&&(e.event.dir="down"),e.direction.left===!0&&o>n&&l<0&&n<100&&f>e.sensitivity[0]&&(e.event.dir="left"),e.direction.right===!0&&o>n&&l>0&&n<100&&f>e.sensitivity[0]&&(e.event.dir="right"),e.event.dir!==!1?(z(a),e.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Ke(),e.styleCleanup=E=>{e.styleCleanup=void 0,document.body.classList.remove("non-selectable");const A=()=>{document.body.classList.remove("no-pointer-events--children")};E===!0?setTimeout(A,50):A()}),e.handler({evt:a,touch:e.event.mouse!==!0,mouse:e.event.mouse,direction:e.event.dir,duration:u,distance:{x:o,y:n}})):e.end(a)},end(a){e.event!==void 0&&(W(e,"temp"),I.is.firefox===!0&&H(t,!1),e.styleCleanup!==void 0&&e.styleCleanup(!0),a!==void 0&&e.event.dir!==!1&&z(a),e.event=void 0)}};if(t.__qtouchswipe=e,p.mouse===!0){const a=p.mouseCapture===!0||p.mousecapture===!0?"Capture":"";N(e,"main",[[t,"mousedown","mouseStart",`passive${a}`]])}I.has.touch===!0&&N(e,"main",[[t,"touchstart","touchStart",`passive${p.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,s){const d=t.__qtouchswipe;d!==void 0&&(s.oldValue!==s.value&&(typeof s.value!="function"&&d.end(),d.handler=s.value),d.direction=se(s.modifiers))},beforeUnmount(t){const s=t.__qtouchswipe;s!==void 0&&(W(s,"main"),W(s,"temp"),I.is.firefox===!0&&H(t,!1),s.styleCleanup!==void 0&&s.styleCleanup(),delete t.__qtouchswipe)}});const tt={name:{required:!0},disable:Boolean},ie={setup(t,{slots:s}){return()=>$("div",{class:"q-panel scroll",role:"tabpanel"},Z(s.default))}},at={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},ot=["update:modelValue","beforeTransition","transition"];function nt(){const{props:t,emit:s,proxy:d}=ce(),{getCacheWithFn:p}=Je();let c,e;const a=P(null),u=P(null);function x(i){const _=t.vertical===!0?"up":"left";V((d.$q.lang.rtl===!0?-1:1)*(i.direction===_?1:-1))}const l=k(()=>[[et,x,void 0,{horizontal:t.vertical!==!0,vertical:t.vertical,mouse:!0}]]),o=k(()=>t.transitionPrev||`slide-${t.vertical===!0?"down":"right"}`),g=k(()=>t.transitionNext||`slide-${t.vertical===!0?"up":"left"}`),n=k(()=>`--q-transition-duration: ${t.transitionDuration}ms`),f=k(()=>typeof t.modelValue=="string"||typeof t.modelValue=="number"?t.modelValue:String(t.modelValue)),T=k(()=>({include:t.keepAliveInclude,exclude:t.keepAliveExclude,max:t.keepAliveMax})),E=k(()=>t.keepAliveInclude!==void 0||t.keepAliveExclude!==void 0);de(()=>t.modelValue,(i,_)=>{const Q=y(i)===!0?r(i):-1;e!==!0&&S(Q===-1?0:Q<r(_)?-1:1),a.value!==Q&&(a.value=Q,s("beforeTransition",i,_),xe(()=>{s("transition",i,_)}))});function A(){V(1)}function b(){V(-1)}function h(i){s("update:modelValue",i)}function y(i){return i!=null&&i!==""}function r(i){return c.findIndex(_=>_.props.name===i&&_.props.disable!==""&&_.props.disable!==!0)}function v(){return c.filter(i=>i.props.disable!==""&&i.props.disable!==!0)}function S(i){const _=i!==0&&t.animated===!0&&a.value!==-1?"q-transition--"+(i===-1?o.value:g.value):null;u.value!==_&&(u.value=_)}function V(i,_=a.value){let Q=_+i;for(;Q>-1&&Q<c.length;){const Y=c[Q];if(Y!==void 0&&Y.props.disable!==""&&Y.props.disable!==!0){S(i),e=!0,s("update:modelValue",Y.props.name),setTimeout(()=>{e=!1});return}Q+=i}t.infinite===!0&&c.length>0&&_!==-1&&_!==c.length&&V(i,i===-1?c.length:-1)}function q(){const i=r(t.modelValue);return a.value!==i&&(a.value=i),!0}function j(){const i=y(t.modelValue)===!0&&q()&&c[a.value];return t.keepAlive===!0?[$(Ce,T.value,[$(E.value===!0?p(f.value,()=>({...ie,name:f.value})):ie,{key:f.value,style:n.value},()=>i)])]:[$("div",{class:"q-panel scroll",style:n.value,key:f.value,role:"tabpanel"},[i])]}function fe(){if(c.length!==0)return t.animated===!0?[$(we,{name:u.value},j)]:j()}function be(i){return c=ke(Z(i.default,[])).filter(_=>_.props!==null&&_.props.slot===void 0&&y(_.props.name)===!0),c.length}function ge(){return c}return Object.assign(d,{next:A,previous:b,goTo:h}),{panelIndex:a,panelDirectives:l,updatePanelsList:be,updatePanelIndex:q,getPanelContent:fe,getEnabledPanels:v,getPanels:ge,isValidPanelName:y,keepAliveProps:T,needsUniqueKeepAliveWrapper:E,goToPanelByOffset:V,goToPanel:h,nextPanel:A,previousPanel:b}}var ue=G({name:"QTabPanel",props:tt,setup(t,{slots:s}){return()=>$("div",{class:"q-tab-panel",role:"tabpanel"},Z(s.default))}}),st=G({name:"QTabPanels",props:{...at,...Ie},emits:ot,setup(t,{slots:s}){const d=ce(),p=Be(t,d.proxy.$q),{updatePanelsList:c,getPanelContent:e,panelDirectives:a}=nt(),u=k(()=>"q-tab-panels q-panel-parent"+(p.value===!0?" q-tab-panels--dark q-dark":""));return()=>(c(s),Se("div",{class:u.value},e(),"pan",t.swipeable,()=>a.value))}}),me={exports:{}};(function(t,s){(function(d,p){p()})(U,function(){function d(l,o){return typeof o=="undefined"?o={autoBom:!1}:typeof o!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),o={autoBom:!o}),o.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type)?new Blob(["\uFEFF",l],{type:l.type}):l}function p(l,o,g){var n=new XMLHttpRequest;n.open("GET",l),n.responseType="blob",n.onload=function(){x(n.response,o,g)},n.onerror=function(){console.error("could not download file")},n.send()}function c(l){var o=new XMLHttpRequest;o.open("HEAD",l,!1);try{o.send()}catch{}return 200<=o.status&&299>=o.status}function e(l){try{l.dispatchEvent(new MouseEvent("click"))}catch{var o=document.createEvent("MouseEvents");o.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),l.dispatchEvent(o)}}var a=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof U=="object"&&U.global===U?U:void 0,u=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),x=a.saveAs||(typeof window!="object"||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!u?function(l,o,g){var n=a.URL||a.webkitURL,f=document.createElement("a");o=o||l.name||"download",f.download=o,f.rel="noopener",typeof l=="string"?(f.href=l,f.origin===location.origin?e(f):c(f.href)?p(l,o,g):e(f,f.target="_blank")):(f.href=n.createObjectURL(l),setTimeout(function(){n.revokeObjectURL(f.href)},4e4),setTimeout(function(){e(f)},0))}:"msSaveOrOpenBlob"in navigator?function(l,o,g){if(o=o||l.name||"download",typeof l!="string")navigator.msSaveOrOpenBlob(d(l,g),o);else if(c(l))p(l,o,g);else{var n=document.createElement("a");n.href=l,n.target="_blank",setTimeout(function(){e(n)})}}:function(l,o,g,n){if(n=n||open("","_blank"),n&&(n.document.title=n.document.body.innerText="downloading..."),typeof l=="string")return p(l,o,g);var f=l.type==="application/octet-stream",T=/constructor/i.test(a.HTMLElement)||a.safari,E=/CriOS\/[\d]+/.test(navigator.userAgent);if((E||f&&T||u)&&typeof FileReader!="undefined"){var A=new FileReader;A.onloadend=function(){var y=A.result;y=E?y:y.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=y:location=y,n=null},A.readAsDataURL(l)}else{var b=a.URL||a.webkitURL,h=b.createObjectURL(l);n?n.location=h:location.href=h,n=null,setTimeout(function(){b.revokeObjectURL(h)},4e4)}});a.saveAs=x.saveAs=x,t.exports=x})})(me);var lt=me.exports;const rt={class:"row justify-between"},it={class:"text-h6"},ut={class:"text-subtitle2"},dt={class:"text-subtitle2"},ct={class:"text-subtitle2"},pt=C("div",{class:"text-h6"},"Log",-1),vt={class:"text-white"},mt={__name:"Viewer",props:{folio:[String,Number],store:[String,Number]},emits:["errorsearch"],setup(t,{emit:s}){const d=t,p=d.folio,c=d.store,e=P(null),a=P(null),u=P("body"),x=P(null),l=P({cols:[{name:"id",field:"id",label:"ID",align:"left"},{name:"lcode",field:"code",label:"Codigo"},{name:"scode",field:"name",label:"Codigo C."},{name:"descr",field:"description",label:"Articulo",align:"left",classes:"fs-dec4"},{name:"sai",field:b=>b.ordered.stocks,label:"SAI",align:"center"},{name:"counteds",field:b=>b.ordered.stocks_acc,label:"UC",align:"center"},{name:"sat",field:b=>{var h;return(h=b.ordered.stocks_end)!=null?h:"--"},label:"SAT",align:"center"},{name:"ufus",field:b=>b.ordered.stocks_acc-b.ordered.stocks,label:"UF/US",align:"center"},{name:"locs",field:b=>b.locations.map(h=>h.path).join(", "),label:"Ubicacion (es)",align:"left"}]}),o=k(()=>e.value?e.value.created_by:null),g=k(()=>e.value?e.value.log:[]),n=k(()=>e.value&&e.value.responsables&&e.value.responsables.length?e.value.responsables.map(b=>b.nick).join(","):""),f=k(()=>e.value&&e.value.products&&e.value.products.length?e.value.products:[]),T=k(()=>e.value?e.value.status.name:"");k(()=>""),k(()=>""),(async()=>{const b=await ve.find(p,c);console.log(b),b.fail?a.value=b.fail:e.value=b.inventory})();const A=b=>{let h=`INV_${e.value.id}_${e.value.workpoint.alias}.xlsx`;console.log(h);let y=new Ge.Workbook,r=y.addWorksheet("Sheet1");r.columns=[{header:"ID",key:"id"},{header:"Codigo",key:"lcode"},{header:"Codigo C.",key:"scode"},{header:"Articulo",key:"description"},{header:"SAI",key:"sai"},{header:"UC",key:"uc"},{header:"SAT",key:"sat"},{header:"UF/US",key:"ufus"},{header:"Ubicacion(es)",key:"locs"}],f.value.forEach(v=>{r.addRow({id:v.id,lcode:v.code,scode:v.name,description:v.description,sai:parseInt(v.ordered.stocks),uc:parseInt(v.ordered.stocks_acc),sat:parseInt(v.ordered.stocks_end),ufus:parseInt(v.ordered.stocks_acc)-parseInt(v.ordered.stocks),locs:v.locations.map(S=>S.path).join(", ")})}),r.getCell("L2").value="Folio:",r.getCell("M2").value=e.value.id,r.getCell("L3").value="Sucursal:",r.getCell("M3").value=e.value.workpoint.name,r.getCell("L4").value="Estado:",r.getCell("M4").value=T.value,r.getCell("L5").value="Creado por:",r.getCell("M5").value=o.value?o.value.names:"",r.getCell("L6").value="Realizado por:",r.getCell("M6").value=n.value,r.getCell("L7").value="Inicio:",r.getCell("M7").value="",r.getCell("L8").value="Termino:",r.getCell("M8").value="",y.xlsx.writeBuffer().then(v=>lt(new Blob([v],{type:"application/octet-stream"}),h))};return(b,h)=>(M(),F(ae,null,[e.value?(M(),X(J,{key:0,class:"my-card"},{default:w(()=>[m(oe,null,{default:w(()=>[C("div",rt,[C("div",it,"Inventario "+L(D(p)),1),C("div",null,[m(O,{color:"primary",label:"descargar",onClick:A})])]),C("div",ut,[R("Creado por: "),C("b",null,L(D(o)?D(o).names:"Nobody"),1)]),C("div",dt,[R("Realizado por: "),C("b",null,L(D(n)),1)]),C("div",ct,[R("Estado: "),C("b",null,L(D(T)),1)])]),_:1}),m(Xe,{modelValue:u.value,"onUpdate:modelValue":h[0]||(h[0]=y=>u.value=y)},{default:w(()=>[m(re,{name:"log",label:"Log"}),m(re,{name:"body",label:"Resumen"})]),_:1},8,["modelValue"]),m(st,{modelValue:u.value,"onUpdate:modelValue":h[1]||(h[1]=y=>u.value=y),animated:""},{default:w(()=>[m(ue,{name:"log"},{default:w(()=>[pt,(M(!0),F(ae,null,Pe(D(g),(y,r)=>(M(),F("div",{key:r},[C("pre",null,L(y),1)]))),128))]),_:1}),m(ue,{name:"body"},{default:w(()=>[m(pe,{flat:"",rows:D(f),columns:l.value.cols,"row-key":"name",ref_key:"rowsproducts",ref:x},null,8,["rows","columns"])]),_:1})]),_:1},8,["modelValue"])]),_:1})):K("",!0),a.value?(M(),X(J,{key:1,class:"bg-negative"},{default:w(()=>[m(oe,null,{default:w(()=>[C("pre",vt,L(a.value),1)]),_:1})]),_:1})):K("",!0)],64))}},ft=C("span",{class:"text-grey"},"Helpers",-1),bt=C("span",{class:"text-h6"},"Ciclicos",-1),gt={class:"row items-center"},ht=C("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Inventario",-1),yt={key:0,class:"text-right"},Gt={__name:"CiclicosLayout",setup(t){const s=P(""),d=Ue(),p=Te(),c=Ae(),e=Oe(),a=P({state:!1,data:null}),u=P(null),x=P([]),l=P({cols:[{name:"id",field:"id",label:"Folio"},{name:"started",field:r=>B(r.created_at).format("YYYY/MM/DD HH:mm:ss"),label:"Creacion",align:"center"},{name:"status",field:r=>r.status.name,label:"Estado",align:"center"},{name:"ended",field:r=>{let v=r.log.find(S=>S.id==3);return v?B(v.pivot.created_at).format("YYYY/MM/DD HH:mm:ss"):"--"},align:"center",label:"Termino"},{name:"models",field:"products_count",label:"Modelos"},{name:"type",field:r=>r.type.name,label:"Tipo"},{name:"warehouse",field:r=>r.settings?r.settings.warehouse.name:"---",label:"Almacen"}]}),o=P([{id:"day",label:"Hoy"},{id:"week",label:"Semana"},{id:"month",label:"Mes"},{id:"c",label:"otra ...",disable:!0}]),g=P({from:B(Date.now()).startOf("day"),to:B(Date.now()).endOf("day")}),n=k(()=>x.value.map(r=>(r.settings=JSON.parse(r.settings),r))),f=k(()=>s.value&&s.value.length),T=k(()=>g.value.from.format("YYYY/MM/DD")),E=k(()=>g.value.to.format("YYYY/MM/DD")),A=()=>{console.log("searching folio"),a.value.folio=s.value,a.value.state=!0},b=async(r,v,S)=>{a.value.folio=v.id,a.value.state=!0},h=async()=>{var q;console.log(e.session),d.loading.show({message:"Cargado vista..."});let r=(q=p.query.v)!=null?q:"day",v=o.value.findIndex(j=>j.id==r),S=v>=0?v:0;console.log(S),u.value=o.value[S],g.value.from=B(Date.now()).startOf(u.value.id);const V=await ve.index({dateranges:g,view:u.value,store:e.session.store.id_viz});console.log(V),x.value=V.inventories,d.loading.hide()},y=()=>{c.push(`/ciclicos?v=${u.value.id}`)};return h(),de(()=>p.query,()=>{h()}),(r,v)=>(M(),X(Ye,{view:"hHh Lpr fFf"},{default:w(()=>[m(qe,{class:"bg-grey-3 text-dark",bordered:""},{default:w(()=>[m(Fe),m(ee),m($e,{class:"justify-between"},{default:w(()=>[C("div",null,[ft,R(),m(De,{name:"navigate_next",color:"primary"}),R(),bt]),C("div",gt,[m(Qe,{modelValue:u.value,"onUpdate:modelValue":[v[0]||(v[0]=S=>u.value=S),y],options:o.value,label:"Vista",autofocus:"",borderless:""},{prepend:w(()=>[m(O,{dense:"",flat:"",color:"primary",icon:"autorenew",onClick:Ee(h,["stop"])},null,8,["onClick"])]),_:1},8,["modelValue","options"]),m(O,{color:"primary",icon:"search",dense:"",flat:""},{default:w(()=>[m(Ve,null,{default:w(()=>[ht,m(ee),m(Le,{dense:"",onSubmit:A,class:"q-gutter-md q-pa-md"},{default:w(()=>[m(Me,{modelValue:s.value,"onUpdate:modelValue":v[1]||(v[1]=S=>s.value=S),type:"number",label:"Folio",autofocus:""},null,8,["modelValue"]),D(f)?(M(),F("div",yt,[m(O,{type:"submit",color:"primary",icon:"search"})])):K("",!0)]),_:1})]),_:1})]),_:1})])]),_:1})]),_:1}),m(Ne,null,{default:w(()=>[m(je,{padding:""},{default:w(()=>[m(J,{class:"my-card",flat:""},{default:w(()=>[m(pe,{title:`Inventarios del ${D(T)} al ${D(E)} [ ${x.value.length} ]`,rows:D(n),columns:l.value.cols,"row-key":"id",onRowClick:b},null,8,["title","rows","columns"])]),_:1}),m(Re,{modelValue:a.value.state,"onUpdate:modelValue":v[2]||(v[2]=S=>a.value.state=S),"full-width":""},{default:w(()=>[m(mt,{folio:a.value.folio,store:D(e).session.store.id_viz},null,8,["folio","store"])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Gt as default};
