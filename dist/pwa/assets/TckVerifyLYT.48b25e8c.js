import{Q as b}from"./QSeparator.1c73cca5.js";import{r as w,c as P,o as p,a as M,w as t,e as l,f as s,a4 as m,Y as X,Q as g,a0 as A,g as x,h as N,_ as me,a5 as c,aF as pe,a6 as H,a1 as B,a2 as F,a3 as fe}from"./index.54d447e3.js";import{d as be,Q as I,a as ge,b as R,c as k}from"./QSelect.711403d0.js";import{Q as L}from"./QInput.f4aaafa9.js";import{Q as j}from"./QForm.cff053ef.js";import{Q as ye}from"./QToolbar.eb82c9cb.js";import{Q as xe}from"./QHeader.781663ae.js";import{Q as we}from"./QList.fa7ccc12.js";import{u as Ve,Q as y,a as u}from"./use-quasar.e7b3e98f.js";import{Q as G}from"./QSpace.c8152a47.js";import{Q as J}from"./QTable.d3f01a8d.js";import{Q as q}from"./QDialog.711949b7.js";import{Q as S}from"./QCardActions.4ba469fb.js";import{Q as ke}from"./QPage.2bae49fe.js";import{Q as Ce}from"./QFooter.b9c6c919.js";import{Q as _e,a as Qe}from"./QLayout.bc7b9374.js";import{C as he}from"./ClosePopup.5a0721b4.js";import{u as Pe}from"./VDB.cb7932a0.js";import{_ as Te}from"./UserToolbar.39f31d3c.js";import{a as W}from"./axios.9ab26c22.js";import{a as Ue}from"./axios.ba7b1b0e.js";/* empty css                                                                         */import"./use-key-composition.eac0cc74.js";import"./uid.937d8ee7.js";import"./position-engine.b9957c85.js";import"./rtl.276c3f1b.js";import"./QResizeObserver.eb637c66.js";import"./QLinearProgress.11942ba4.js";import"./QCheckbox.a9d08855.js";const Ie={key:0,class:"text-right"},qe={key:0},Se={class:"row justify-center"},De={class:"row"},Ne={class:"row justify-center"},Be={class:"row justify-between"},Fe={class:"text-left"},Re={class:"text--3"},$e={class:"text-right"},Ee={class:"text-bold"},Me={class:"text--2"},Ae={class:"row"},He={class:"text-center col"},Le={class:"text-center col"},je={class:"text-center col"},Oe={class:"text-h6"},kl={__name:"TckVerifyLYT",setup(Ye){const V=Pe(),r=Ve(),Z=V.series,T=w(null),C=w(null),U=w(""),v=w({state:!1,val:null,body:null}),$=w({state:!1}),i=w({state:!1,body:[],head:null}),d=w({state:!1,val:null}),E=w([]),f=w({pagination:{rowsPerPage:10},visibleColumns:["code","description"],visibleColumnstwo:["code","description","checkout","diferencia"],columns:[{name:"code",label:"Codigo",field:o=>o.codigo,required:!0,align:"left",sortable:!0},{name:"barcode",label:"CB",field:o=>o.cb,align:"left",sortable:!0},{name:"shortcode",label:"Corto",field:o=>o.corto,align:"center",sortable:!0},{name:"description",label:"Descripcion",field:o=>o.descripcion,align:"left",sortable:!0},{name:"checkout",label:"Validado",field:o=>o.checkout,align:"center",sortable:!0},{name:"diferencia",label:"Diferencia",field:o=>o.diferencia,align:"center",sortable:!0}]}),ee=P(()=>T.value&&U.value.length),Q=P(()=>i.value.body.filter(o=>o.validate==0)),_=P(()=>i.value.body.filter(o=>o.validate==1)),h=P(()=>{var o;return(o=i.value.body)==null?void 0:o.filter(e=>e.diferencia!=0)}),O=P(()=>_.value.length>0&&h.value.length==0&&Q.value.length==0),Y=P(()=>_.value.length>0&&h.value.length>0&&Q.value.length==0),le=async()=>{r.loading.show({message:"Se esta obteniendo el ticket"});let o={serie:T.value,folio:U.value},a=`http://${V.session.store.ip}/access/public/modify/getTck`;W.post(a,o).then(n=>{console.log(n.data),i.value.head=n.data.ticket,i.value.body=n.data.product,i.value.state=!0,r.loading.hide()}).catch(n=>{console.log(n.response.data),r.notify({html:!0,message:n.response.data,color:"negative",position:"center"}),r.loading.hide()})},te=()=>{let o=d.value.val,e=i.value.body.findIndex(a=>a.codigo==o.codigo);e>=0?(i.value.body[e].checkout=o.conteo*o.pxc,i.value.body[e].validate=1,i.value.body[e].diferencia=o.checkout-o.cantidad,i.value.body[e].diferencia!=0?(console.log("Hay diferencia se bloquea productos sin revisar para que se analice el producto revisado ?"),r.notify({message:"El producto esta mal contado",type:"negative",icon:"sentiment_dissatisfied",position:"top"})):r.notify({message:"El producto esta bien contado",type:"positive",icon:"mood",position:"top"}),d.value.val=null,d.value.state=!1):r.notify({message:"No se encuentra el articulo"})},z=(o,e)=>{console.log(e),d.value.state=!0,d.value.val=e},ae=()=>{console.log("conteo terminado"),T.value=null,C.value="",U.value="",i.value={state:!1,body:[],head:null},d.value={state:!1,val:null}},oe=()=>{console.log("Terminado Incompleto"),$.value.state=!0},se=()=>{h.value.forEach(o=>{let e=i.value.body.findIndex(a=>a.codigo==o.codigo);e>=0&&(i.value.body[e].checkout=0,i.value.body[e].diferencia=0,i.value.body[e].conteo=0,i.value.body[e].validate=0)})},ie=(o,e,a)=>{e(()=>{const n=o.toUpperCase();E.value=i.value.body.filter(D=>{const re=D.variants.some(ve=>ve.cb.toUpperCase().indexOf(n)>-1),ce=D.codigo.toUpperCase().indexOf(n)>-1||D.cb.toUpperCase().indexOf(n)>-1||D.corto.toUpperCase().indexOf(n)>-1;return re||ce}),console.log(E.value)})},ne=()=>{let o=i.value.body.filter(e=>e==C.value);d.value.state=!0,d.value.val=o[0],C.value=""},ue=o=>{C.value=o,console.log(C.value)},K=async()=>{let o=V.session.store.id;try{let e=await Ue.get(`/cashier/getPrinters/${o}`);e.status==200&&(v.value.body=e.data,console.log("Impresoras listas :)"))}catch(e){console.log(e),r.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},de=async()=>{r.loading.show({message:"Imprimiendo Diferencias"});let o={printer:v.value.val.ip_address,data:i.value,invalid:Q.value,valid:_.value,diff:h.value},a=`http://${V.session.store.ip}/access/public/modify/PrintDiff`;W.post(a,o).then(n=>{console.log(n.data),n.data==1&&(r.notify({message:"Impresion Correcta",type:"positive",position:"center"}),v.value.state=!1,v.value.val=null),r.loading.hide()}).catch(n=>{console.log(n.response.data),r.notify({html:!0,message:n.response.data,color:"negative",position:"center"}),r.loading.hide()})};return V.session.rol=="aux"||V.session.rol=="gen"||V.session.rol=="aud"||V.session.rol=="root"?(console.log("Acceso Validado"),K()):(r.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),K(),(o,e)=>(p(),M(_e,{view:"hHh Lpr fFf"},{default:t(()=>[l(xe,{class:"transparent text-dark",bordered:""},{default:t(()=>[l(Te),l(b),l(ye,{class:"justify-between"},{default:t(()=>[s("div",null,[e[16]||(e[16]=m("Helpers ")),l(X,{name:"navigate_next",color:"primary"}),e[17]||(e[17]=m()),e[18]||(e[18]=s("span",{class:"text-h6"},"TICKETS",-1))]),l(g,{color:"primary",icon:"add"},{default:t(()=>[l(be,null,{default:t(()=>[e[19]||(e[19]=s("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1)),l(b),l(j,{dense:"",onSubmit:le,class:"q-gutter-md q-pa-md"},{default:t(()=>[l(I,{modelValue:T.value,"onUpdate:modelValue":e[0]||(e[0]=a=>T.value=a),options:A(Z),label:"Serie",autofocus:""},null,8,["modelValue","options"]),l(L,{modelValue:U.value,"onUpdate:modelValue":e[1]||(e[1]=a=>U.value=a),type:"number",label:"Folio"},null,8,["modelValue"]),ee.value?(p(),x("div",Ie,[l(g,{type:"submit",color:"primary",icon:"search"})])):N("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),l(Qe,null,{default:t(()=>[l(ke,{class:"bg-grey-3",padding:""},{default:t(()=>[i.value.state?(p(),x("div",qe,[s("div",Se,[l(me,{name:"bounce"},{default:t(()=>[l(y,{style:{width:"700px","max-width":"80vw"}},{default:t(()=>[l(u,null,{default:t(()=>[l(we,null,{default:t(()=>[l(ge,null,{default:t(()=>[l(R,null,{default:t(()=>[l(k,null,{default:t(()=>e[20]||(e[20]=[m("Fecha:")])),_:1}),l(k,null,{default:t(()=>[m(c(i.value.head.fecha),1)]),_:1})]),_:1}),l(b,{spaced:"",inset:"",vertical:"",dark:""}),l(R,null,{default:t(()=>[l(k,null,{default:t(()=>e[21]||(e[21]=[m("Ticket:")])),_:1}),l(k,null,{default:t(()=>[m(c(i.value.head.ticket),1)]),_:1})]),_:1}),l(b,{spaced:"",inset:"",vertical:"",dark:""}),l(R,null,{default:t(()=>[l(k,null,{default:t(()=>e[22]||(e[22]=[m("Cliente:")])),_:1}),l(k,null,{default:t(()=>[m(c(i.value.head.cliente),1)]),_:1})]),_:1}),l(b,{spaced:"",inset:"",vertical:"",dark:""}),l(R,null,{default:t(()=>[l(k,null,{default:t(()=>e[23]||(e[23]=[m("Total:")])),_:1}),l(k,null,{default:t(()=>[m(c(i.value.head.total),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),l(b,{spaced:"",inset:"",vertical:"",dark:""}),s("div",De,[l(y,{class:"my-card col"},{default:t(()=>[l(u,null,{default:t(()=>e[24]||(e[24]=[s("div",{class:"text-h6 text-center"},"Articulos Por Validar",-1)])),_:1}),l(u,{class:"text-center text-h4"},{default:t(()=>[m(c(Q.value.length),1)]),_:1})]),_:1}),l(b,{spaced:"",inset:"",vertical:"",dark:""}),l(y,{class:"my-card col"},{default:t(()=>[l(u,null,{default:t(()=>e[25]||(e[25]=[s("div",{class:"text-h6 text-center"},"Articulos Validados",-1)])),_:1}),l(u,{class:"text-center text-h4"},{default:t(()=>[m(c(_.value.length),1)]),_:1})]),_:1}),l(b,{spaced:"",inset:"",vertical:"",dark:""}),l(y,{class:"my-card col"},{default:t(()=>[l(u,null,{default:t(()=>e[26]||(e[26]=[s("div",{class:"text-h6 text-center"},"Diferencias",-1)])),_:1}),l(u,{class:"text-center text-h4"},{default:t(()=>[m(c(i.value.body.reduce((a,n)=>a+Number(n.diferencia),0)),1)]),_:1})]),_:1})]),l(b,{spaced:"",inset:"",vertical:"",dark:""}),s("div",Ne,[l(y,{class:"my-card col",style:{width:"700px","max-width":"80vw"}},{default:t(()=>[l(u,null,{default:t(()=>[l(J,{flat:"",title:"Productos Sin Revisar",rows:Q.value,columns:f.value.columns,"visible-columns":f.value.visibleColumns,"no-data-label":"No hay datos :(",pagination:f.value.pagination,onRowClick:z},{top:t(()=>[e[27]||(e[27]=s("div",{class:"text-h6"}," Productos Sin Revisar",-1)),l(G),l(I,{modelValue:f.value.visibleColumns,"onUpdate:modelValue":e[2]||(e[2]=a=>f.value.visibleColumns=a),multiple:"",outlined:"",dense:"","options-dense":"","display-value":A(r).lang.table.columns,"emit-value":"","map-options":"",options:f.value.columns,"option-value":"name","options-cover":"",style:{"min-width":"150px"}},null,8,["modelValue","display-value","options"])]),_:1},8,["rows","columns","visible-columns","pagination"])]),_:1})]),_:1}),l(b,{spaced:"",inset:"",vertical:"",dark:""}),l(y,{class:"my-card col",style:{width:"700px","max-width":"80vw"}},{default:t(()=>[l(u,null,{default:t(()=>[l(J,{flat:"",title:"Productos Revisados",rows:_.value,columns:f.value.columns,"visible-columns":f.value.visibleColumnstwo,"no-data-label":"No hay datos :(",pagination:f.value.pagination,onRowClick:z},{top:t(()=>[e[28]||(e[28]=s("div",{class:"text-h6"}," Productos Revisados",-1)),l(G),l(I,{modelValue:f.value.visibleColumnstwo,"onUpdate:modelValue":e[3]||(e[3]=a=>f.value.visibleColumnstwo=a),multiple:"",outlined:"",dense:"","options-dense":"","display-value":A(r).lang.table.columns,"emit-value":"","map-options":"",options:f.value.columns,"option-value":"name","options-cover":"",style:{"min-width":"150px"}},null,8,["modelValue","display-value","options"])]),_:1},8,["rows","columns","visible-columns","pagination"])]),_:1})]),_:1})])])):N("",!0),l(q,{modelValue:d.value.state,"onUpdate:modelValue":e[6]||(e[6]=a=>d.value.state=a),persistent:"",position:"bottom"},{default:t(()=>[l(y,null,{default:t(()=>[l(u,{class:"bg-grey-3"},{default:t(()=>[s("div",Be,[s("div",Fe,[s("div",Re,"CCO: "+c(d.value.val.corto),1)]),s("div",$e,[s("div",Ee,c(d.value.val.codigo),1),s("div",Me,c(d.value.val.cb),1)])])]),_:1}),l(b),l(u,null,{default:t(()=>[m(c(d.value.val.descripcion),1)]),_:1}),l(j,{onSubmit:pe(te,["prevent"])},{default:t(()=>[l(u,null,{default:t(()=>[s("div",Ae,[s("div",He,[e[29]||(e[29]=s("div",null,"Cajas",-1)),l(L,{dense:"",borderless:"",modelValue:d.value.val.conteo,"onUpdate:modelValue":e[4]||(e[4]=a=>d.value.val.conteo=a),type:"number",min:"0","input-class":"text-h6 text-center",ref:"iptcounter"},null,8,["modelValue"])]),s("div",Le,[e[30]||(e[30]=s("div",null,"PXC",-1)),l(L,{dense:"",borderless:"",modelValue:d.value.val.pxc,"onUpdate:modelValue":e[5]||(e[5]=a=>d.value.val.pxc=a),type:"number",min:"0","input-class":"text-h6 text-center",ref:"iptcounter"},null,8,["modelValue"])]),s("div",je,[e[31]||(e[31]=s("div",null,"Conteo",-1)),s("div",Oe,c(d.value.val.conteo*d.value.val.pxc),1)])])]),_:1}),l(g,{color:"green-5",type:"submit",square:"",icon:"done_all","no-caps":"",class:"q-mt-md q-py-md full-width"})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(q,{modelValue:O.value,"onUpdate:modelValue":e[8]||(e[8]=a=>O.value=a),persistent:""},{default:t(()=>[l(y,null,{default:t(()=>[l(u,{class:"row items-center"},{default:t(()=>[l(H,{icon:"mood",color:"positive","text-color":"white"}),e[32]||(e[32]=s("span",{class:"q-ml-sm"},"Productos validados correctamente",-1))]),_:1}),l(u,{class:"row"},{default:t(()=>[l(S,{class:"col"},{default:t(()=>[l(g,{flat:"",icon:"print",color:"primary",onClick:e[7]||(e[7]=a=>v.value.state=!v.value.state)})]),_:1}),l(S,null,{default:t(()=>[l(g,{flat:"",label:"TERMINAR",color:"positive",onClick:ae})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(q,{modelValue:Y.value,"onUpdate:modelValue":e[10]||(e[10]=a=>Y.value=a),persistent:""},{default:t(()=>[l(y,null,{default:t(()=>[l(u,{class:"row items-center"},{default:t(()=>[l(H,{icon:"sentiment_dissatisfied",color:"negative","text-color":"white"}),e[33]||(e[33]=s("span",{class:"q-ml-sm"},"Hay productos Con diferencia",-1))]),_:1}),l(u,null,{default:t(()=>[(p(!0),x(F,null,B(h.value,(a,n)=>(p(),x("div",null,c(a.codigo),1))),256))]),_:1}),l(u,{class:"row"},{default:t(()=>[l(S,{class:"col"},{default:t(()=>[l(g,{flat:"",icon:"print",color:"primary",onClick:e[9]||(e[9]=a=>v.value.state=!v.value.state)})]),_:1}),l(S,null,{default:t(()=>[l(g,{flat:"",label:"Regresar",color:"negative",onClick:se})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(q,{modelValue:v.value.state,"onUpdate:modelValue":e[12]||(e[12]=a=>v.value.state=a)},{default:t(()=>[l(y,{class:"my-card"},{default:t(()=>[l(u,null,{default:t(()=>e[34]||(e[34]=[s("div",{class:"text-h6 text-center"},"Impresora",-1)])),_:1}),l(u,null,{default:t(()=>[l(j,{onSubmit:de,class:"q-gutter-md"},{default:t(()=>[l(I,{dense:"","option-label":"name",modelValue:v.value.val,"onUpdate:modelValue":e[11]||(e[11]=a=>v.value.val=a),options:v.value.body,label:"Impresora",filled:"",autofocus:"",style:{width:"200px"}},null,8,["modelValue","options"]),s("div",null,[l(g,{label:"Enviar",type:"submit",color:"primary",style:{width:"200px"}})])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(q,{modelValue:$.value.state,"onUpdate:modelValue":e[14]||(e[14]=a=>$.value.state=a),persistent:""},{default:t(()=>[l(y,null,{default:t(()=>[l(u,{class:"row items-center"},{default:t(()=>[l(H,{icon:"warning",color:"warning","text-color":"black"}),e[35]||(e[35]=s("span",{class:"q-ml-sm"},"Hay Productos que no estan validados",-1))]),_:1}),l(u,null,{default:t(()=>[e[36]||(e[36]=s("div",{class:"text-bold"}," Productos No Validados ",-1)),(p(!0),x(F,null,B(Q.value,(a,n)=>(p(),x("div",{key:n},c(a.codigo),1))),128))]),_:1}),l(u,null,{default:t(()=>[e[37]||(e[37]=s("div",{class:"text-bold"}," Productos Con Diferencia ",-1)),(p(!0),x(F,null,B(h.value,(a,n)=>(p(),x("div",{key:n},c(a.codigo),1))),128))]),_:1}),l(u,null,{default:t(()=>[e[38]||(e[38]=s("div",{class:"text-bold"}," Productos Validados ",-1)),(p(!0),x(F,null,B(_.value,(a,n)=>(p(),x("div",{key:n},c(a.codigo),1))),128))]),_:1}),l(S,{align:"right"},{default:t(()=>[l(g,{flat:"",color:"primary",icon:"print",onClick:e[13]||(e[13]=a=>v.value.state=!v.value.state)}),fe(l(g,{flat:"",label:"Continuar",color:"primary"},null,512),[[he]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),i.value.state?(p(),M(Ce,{key:0,reveal:"",elevated:"",bordered:"",class:"row"},{default:t(()=>[l(I,{class:"col",modelValue:C.value,"onUpdate:modelValue":[e[15]||(e[15]=a=>C.value=a),ne],options:E.value,filled:"","option-label":"codigo","use-input":"","fill-input":"","hide-selected":"","input-class":"text-white","input-debounce":"0",onFilter:ie,onInputValue:ue,dense:""},{before:t(()=>[l(X,{name:"fas fa-barcode",color:"white"})]),_:1},8,["modelValue","options"]),_.value.length>0?(p(),M(g,{key:0,color:"white","text-color":"primary",size:"sm",label:"Terminar",onClick:oe})):N("",!0)]),_:1})):N("",!0)]),_:1})]),_:1}))}};export{kl as default};
