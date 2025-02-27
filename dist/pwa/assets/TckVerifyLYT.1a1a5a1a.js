import{Q as b}from"./QSeparator.9b22600b.js";import{r as x,c as T,o as f,a as L,w as t,e,i as s,a3 as p,Y as X,Q as g,f as m,g as h,h as B,_ as pe,a4 as c,aE as fe,aS as G,a5 as j,a0 as R,a1 as F,a2 as _e}from"./index.6553c4a3.js";import{d as be,Q as S,a as ge,b as $,c as V}from"./QSelect.1376d70e.js";import{Q as O}from"./QInput.9cc45321.js";import{Q as Y}from"./QForm.17d476a6.js";import{Q as ye}from"./QToolbar.b4a2aaab.js";import{Q as he}from"./QHeader.e3c4603e.js";import{Q as xe}from"./QList.a86a105f.js";import{u as we,Q as y,a as d}from"./use-quasar.2618ef58.js";import{Q as J}from"./QSpace.6181b42d.js";import{Q as W}from"./QTable.276907f1.js";import{Q as q}from"./QDialog.03672914.js";import{Q as D}from"./QCardActions.b485e075.js";import{Q as Ve}from"./QPage.fecb4179.js";import{Q as ke}from"./QFooter.a9590b0a.js";import{Q as Ce,a as Qe}from"./QLayout.b7211c56.js";import{C as Pe}from"./ClosePopup.d20223ef.js";import{u as Te}from"./VDB.a74ead22.js";import{_ as Ue}from"./UserToolbar.38961c8d.js";import{a as Z}from"./axios.f1f32898.js";import{a as Ie}from"./axios.30672b3a.js";/* empty css                                                                         */import"./use-key-composition.a57e001a.js";import"./uid.42677368.js";import"./position-engine.3f787d31.js";import"./rtl.b51694b1.js";import"./QResizeObserver.718ce7c7.js";import"./QLinearProgress.35050ded.js";import"./QCheckbox.08cf0c53.js";const Se=s("span",{class:"text-h6"},"TICKETS",-1),qe=s("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1),De={key:0,class:"text-right"},Ne={key:0},Be={class:"row justify-center"},Re={class:"row"},Fe=s("div",{class:"text-h6 text-center"},"Articulos Por Validar",-1),$e=s("div",{class:"text-h6 text-center"},"Articulos Validados",-1),Ee=s("div",{class:"text-h6 text-center"},"Diferencias",-1),Me={class:"row justify-center"},Ae=s("div",{class:"text-h6"}," Productos Sin Revisar",-1),He=s("div",{class:"text-h6"}," Productos Revisados",-1),Le={class:"row justify-between"},je={class:"text-left"},Oe={class:"text--3"},Ye={class:"text-right"},ze={class:"text-bold"},Ke={class:"text--2"},Xe={class:"row"},Ge={class:"text-center col"},Je=s("div",null,"Cajas",-1),We={class:"text-center col"},Ze=s("div",null,"PXC",-1),et={class:"text-center col"},tt=s("div",null,"Conteo",-1),lt={class:"text-h6"},at=s("span",{class:"q-ml-sm"},"Productos validados correctamente",-1),ot=s("span",{class:"q-ml-sm"},"Hay productos Con diferencia",-1),st=s("div",{class:"text-h6 text-center"},"Impresora",-1),it=s("span",{class:"q-ml-sm"},"Hay Productos que no estan validados",-1),nt=s("div",{class:"text-bold"}," Productos No Validados ",-1),dt=s("div",{class:"text-bold"}," Productos Con Diferencia ",-1),ut=s("div",{class:"text-bold"}," Productos Validados ",-1),Mt={__name:"TckVerifyLYT",setup(rt){const w=Te(),r=we(),ee=w.series,U=x(null),k=x(null),I=x(""),v=x({state:!1,val:null,body:null}),E=x({state:!1}),i=x({state:!1,body:[],head:null}),u=x({state:!1,val:null}),M=x([]),_=x({pagination:{rowsPerPage:10},visibleColumns:["code","description"],visibleColumnstwo:["code","description","checkout","diferencia"],columns:[{name:"code",label:"Codigo",field:o=>o.codigo,required:!0,align:"left",sortable:!0},{name:"barcode",label:"CB",field:o=>o.cb,align:"left",sortable:!0},{name:"shortcode",label:"Corto",field:o=>o.corto,align:"center",sortable:!0},{name:"description",label:"Descripcion",field:o=>o.descripcion,align:"left",sortable:!0},{name:"checkout",label:"Validado",field:o=>o.checkout,align:"center",sortable:!0},{name:"diferencia",label:"Diferencia",field:o=>o.diferencia,align:"center",sortable:!0}]}),te=T(()=>U.value&&I.value.length),Q=T(()=>i.value.body.filter(o=>o.validate==0)),C=T(()=>i.value.body.filter(o=>o.validate==1)),P=T(()=>{var o;return(o=i.value.body)==null?void 0:o.filter(l=>l.diferencia!=0)}),A=T(()=>C.value.length>0&&P.value.length==0&&Q.value.length==0),H=T(()=>C.value.length>0&&P.value.length>0&&Q.value.length==0),le=async()=>{r.loading.show({message:"Se esta obteniendo el ticket"});let o={serie:U.value,folio:I.value},a=`http://${w.session.store.ip}/access/public/modify/getTck`;Z.post(a,o).then(n=>{console.log(n.data),i.value.head=n.data.ticket,i.value.body=n.data.product,i.value.state=!0,r.loading.hide()}).catch(n=>{console.log(n.response.data),r.notify({html:!0,message:n.response.data,color:"negative",position:"center"}),r.loading.hide()})},ae=()=>{let o=u.value.val,l=i.value.body.findIndex(a=>a.codigo==o.codigo);l>=0?(i.value.body[l].checkout=o.conteo*o.pxc,i.value.body[l].validate=1,i.value.body[l].diferencia=o.checkout-o.cantidad,i.value.body[l].diferencia!=0?(console.log("Hay diferencia se bloquea productos sin revisar para que se analice el producto revisado ?"),r.notify({message:"El producto esta mal contado",type:"negative",icon:"sentiment_dissatisfied",position:"top"})):r.notify({message:"El producto esta bien contado",type:"positive",icon:"mood",position:"top"}),u.value.val=null,u.value.state=!1):r.notify({message:"No se encuentra el articulo"})},z=(o,l)=>{console.log(l),u.value.state=!0,u.value.val=l},oe=()=>{console.log("conteo terminado"),U.value=null,k.value="",I.value="",i.value={state:!1,body:[],head:null},u.value={state:!1,val:null}},se=()=>{console.log("Terminado Incompleto"),E.value.state=!0},ie=()=>{P.value.forEach(o=>{let l=i.value.body.findIndex(a=>a.codigo==o.codigo);l>=0&&(i.value.body[l].checkout=0,i.value.body[l].diferencia=0,i.value.body[l].conteo=0,i.value.body[l].validate=0)})},ne=(o,l,a)=>{l(()=>{const n=o.toUpperCase();M.value=i.value.body.filter(N=>{const ce=N.variants.some(me=>me.cb.toUpperCase().indexOf(n)>-1),ve=N.codigo.toUpperCase().indexOf(n)>-1||N.cb.toUpperCase().indexOf(n)>-1||N.corto.toUpperCase().indexOf(n)>-1;return ce||ve}),console.log(M.value)})},de=()=>{let o=i.value.body.filter(l=>l==k.value);u.value.state=!0,u.value.val=o[0],k.value=""},ue=o=>{k.value=o,console.log(k.value)},K=async()=>{let o=w.session.store.id;try{let l=await Ie.get(`/cashier/getPrinters/${o}`);l.status==200&&(v.value.body=l.data,console.log("Impresoras listas :)"))}catch(l){console.log(l),r.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},re=async()=>{r.loading.show({message:"Imprimiendo Diferencias"});let o={printer:v.value.val.ip_address,data:i.value,invalid:Q.value,valid:C.value,diff:P.value},a=`http://${w.session.store.ip}/access/public/modify/PrintDiff`;Z.post(a,o).then(n=>{console.log(n.data),n.data==1&&(r.notify({message:"Impresion Correcta",type:"positive",position:"center"}),v.value.state=!1,v.value.val=null),r.loading.hide()}).catch(n=>{console.log(n.response.data),r.notify({html:!0,message:n.response.data,color:"negative",position:"center"}),r.loading.hide()})};return w.session.rol=="aux"||w.session.rol=="gen"||w.session.rol=="aud"||w.session.rol=="root"?(console.log("Acceso Validado"),K()):(r.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),K(),(o,l)=>(f(),L(Ce,{view:"hHh Lpr fFf"},{default:t(()=>[e(he,{class:"transparent text-dark",bordered:""},{default:t(()=>[e(Ue),e(b),e(ye,{class:"justify-between"},{default:t(()=>[s("div",null,[p("Helpers "),e(X,{name:"navigate_next",color:"primary"}),p(),Se]),e(g,{color:"primary",icon:"add"},{default:t(()=>[e(be,null,{default:t(()=>[qe,e(b),e(Y,{dense:"",onSubmit:le,class:"q-gutter-md q-pa-md"},{default:t(()=>[e(S,{modelValue:U.value,"onUpdate:modelValue":l[0]||(l[0]=a=>U.value=a),options:m(ee),label:"Serie",autofocus:""},null,8,["modelValue","options"]),e(O,{modelValue:I.value,"onUpdate:modelValue":l[1]||(l[1]=a=>I.value=a),type:"number",label:"Folio"},null,8,["modelValue"]),m(te)?(f(),h("div",De,[e(g,{type:"submit",color:"primary",icon:"search"})])):B("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(Qe,null,{default:t(()=>[e(Ve,{class:"bg-grey-3",padding:""},{default:t(()=>[i.value.state?(f(),h("div",Ne,[s("div",Be,[e(pe,{name:"bounce"},{default:t(()=>[e(y,{style:{width:"700px","max-width":"80vw"}},{default:t(()=>[e(d,null,{default:t(()=>[e(xe,null,{default:t(()=>[e(ge,null,{default:t(()=>[e($,null,{default:t(()=>[e(V,null,{default:t(()=>[p("Fecha:")]),_:1}),e(V,null,{default:t(()=>[p(c(i.value.head.fecha),1)]),_:1})]),_:1}),e(b,{spaced:"",inset:"",vertical:"",dark:""}),e($,null,{default:t(()=>[e(V,null,{default:t(()=>[p("Ticket:")]),_:1}),e(V,null,{default:t(()=>[p(c(i.value.head.ticket),1)]),_:1})]),_:1}),e(b,{spaced:"",inset:"",vertical:"",dark:""}),e($,null,{default:t(()=>[e(V,null,{default:t(()=>[p("Cliente:")]),_:1}),e(V,null,{default:t(()=>[p(c(i.value.head.cliente),1)]),_:1})]),_:1}),e(b,{spaced:"",inset:"",vertical:"",dark:""}),e($,null,{default:t(()=>[e(V,null,{default:t(()=>[p("Total:")]),_:1}),e(V,null,{default:t(()=>[p(c(i.value.head.total),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),e(b,{spaced:"",inset:"",vertical:"",dark:""}),s("div",Re,[e(y,{class:"my-card col"},{default:t(()=>[e(d,null,{default:t(()=>[Fe]),_:1}),e(d,{class:"text-center text-h4"},{default:t(()=>[p(c(m(Q).length),1)]),_:1})]),_:1}),e(b,{spaced:"",inset:"",vertical:"",dark:""}),e(y,{class:"my-card col"},{default:t(()=>[e(d,null,{default:t(()=>[$e]),_:1}),e(d,{class:"text-center text-h4"},{default:t(()=>[p(c(m(C).length),1)]),_:1})]),_:1}),e(b,{spaced:"",inset:"",vertical:"",dark:""}),e(y,{class:"my-card col"},{default:t(()=>[e(d,null,{default:t(()=>[Ee]),_:1}),e(d,{class:"text-center text-h4"},{default:t(()=>[p(c(i.value.body.reduce((a,n)=>a+Number(n.diferencia),0)),1)]),_:1})]),_:1})]),e(b,{spaced:"",inset:"",vertical:"",dark:""}),s("div",Me,[e(y,{class:"my-card col",style:{width:"700px","max-width":"80vw"}},{default:t(()=>[e(d,null,{default:t(()=>[e(W,{flat:"",title:"Productos Sin Revisar",rows:m(Q),columns:_.value.columns,"visible-columns":_.value.visibleColumns,"no-data-label":"No hay datos :(",pagination:_.value.pagination,onRowClick:z},{top:t(()=>[Ae,e(J),e(S,{modelValue:_.value.visibleColumns,"onUpdate:modelValue":l[2]||(l[2]=a=>_.value.visibleColumns=a),multiple:"",outlined:"",dense:"","options-dense":"","display-value":m(r).lang.table.columns,"emit-value":"","map-options":"",options:_.value.columns,"option-value":"name","options-cover":"",style:{"min-width":"150px"}},null,8,["modelValue","display-value","options"])]),_:1},8,["rows","columns","visible-columns","pagination"])]),_:1})]),_:1}),e(b,{spaced:"",inset:"",vertical:"",dark:""}),e(y,{class:"my-card col",style:{width:"700px","max-width":"80vw"}},{default:t(()=>[e(d,null,{default:t(()=>[e(W,{flat:"",title:"Productos Revisados",rows:m(C),columns:_.value.columns,"visible-columns":_.value.visibleColumnstwo,"no-data-label":"No hay datos :(",pagination:_.value.pagination,onRowClick:z},{top:t(()=>[He,e(J),e(S,{modelValue:_.value.visibleColumnstwo,"onUpdate:modelValue":l[3]||(l[3]=a=>_.value.visibleColumnstwo=a),multiple:"",outlined:"",dense:"","options-dense":"","display-value":m(r).lang.table.columns,"emit-value":"","map-options":"",options:_.value.columns,"option-value":"name","options-cover":"",style:{"min-width":"150px"}},null,8,["modelValue","display-value","options"])]),_:1},8,["rows","columns","visible-columns","pagination"])]),_:1})]),_:1})])])):B("",!0),e(q,{modelValue:u.value.state,"onUpdate:modelValue":l[6]||(l[6]=a=>u.value.state=a),persistent:"",position:"bottom"},{default:t(()=>[e(y,null,{default:t(()=>[e(d,{class:"bg-grey-3"},{default:t(()=>[s("div",Le,[s("div",je,[s("div",Oe,"CCO: "+c(u.value.val.corto),1)]),s("div",Ye,[s("div",ze,c(u.value.val.codigo),1),s("div",Ke,c(u.value.val.cb),1)])])]),_:1}),e(b),e(d,null,{default:t(()=>[p(c(u.value.val.descripcion),1)]),_:1}),e(Y,{onSubmit:fe(ae,["prevent"])},{default:t(()=>[e(d,null,{default:t(()=>[s("div",Xe,[s("div",Ge,[Je,e(O,{dense:"",borderless:"",modelValue:u.value.val.conteo,"onUpdate:modelValue":l[4]||(l[4]=a=>u.value.val.conteo=a),type:"number",min:"0","input-class":"text-h6 text-center",ref:"iptcounter"},null,8,["modelValue"])]),s("div",We,[Ze,e(O,{dense:"",borderless:"",modelValue:u.value.val.pxc,"onUpdate:modelValue":l[5]||(l[5]=a=>u.value.val.pxc=a),type:"number",min:"0","input-class":"text-h6 text-center",ref:"iptcounter"},null,8,["modelValue"])]),s("div",et,[tt,s("div",lt,c(u.value.val.conteo*u.value.val.pxc),1)])])]),_:1}),e(g,{color:"green-5",type:"submit",square:"",icon:"done_all","no-caps":"",class:"q-mt-md q-py-md full-width"})]),_:1},8,["onSubmit"])]),_:1})]),_:1},8,["modelValue"]),e(q,{modelValue:m(A),"onUpdate:modelValue":l[8]||(l[8]=a=>G(A)?A.value=a:null),persistent:""},{default:t(()=>[e(y,null,{default:t(()=>[e(d,{class:"row items-center"},{default:t(()=>[e(j,{icon:"mood",color:"positive","text-color":"white"}),at]),_:1}),e(d,{class:"row"},{default:t(()=>[e(D,{class:"col"},{default:t(()=>[e(g,{flat:"",icon:"print",color:"primary",onClick:l[7]||(l[7]=a=>v.value.state=!v.value.state)})]),_:1}),e(D,null,{default:t(()=>[e(g,{flat:"",label:"TERMINAR",color:"positive",onClick:oe})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(q,{modelValue:m(H),"onUpdate:modelValue":l[10]||(l[10]=a=>G(H)?H.value=a:null),persistent:""},{default:t(()=>[e(y,null,{default:t(()=>[e(d,{class:"row items-center"},{default:t(()=>[e(j,{icon:"sentiment_dissatisfied",color:"negative","text-color":"white"}),ot]),_:1}),e(d,null,{default:t(()=>[(f(!0),h(F,null,R(m(P),(a,n)=>(f(),h("div",null,c(a.codigo),1))),256))]),_:1}),e(d,{class:"row"},{default:t(()=>[e(D,{class:"col"},{default:t(()=>[e(g,{flat:"",icon:"print",color:"primary",onClick:l[9]||(l[9]=a=>v.value.state=!v.value.state)})]),_:1}),e(D,null,{default:t(()=>[e(g,{flat:"",label:"Regresar",color:"negative",onClick:ie})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(q,{modelValue:v.value.state,"onUpdate:modelValue":l[12]||(l[12]=a=>v.value.state=a)},{default:t(()=>[e(y,{class:"my-card"},{default:t(()=>[e(d,null,{default:t(()=>[st]),_:1}),e(d,null,{default:t(()=>[e(Y,{onSubmit:re,class:"q-gutter-md"},{default:t(()=>[e(S,{dense:"","option-label":"name",modelValue:v.value.val,"onUpdate:modelValue":l[11]||(l[11]=a=>v.value.val=a),options:v.value.body,label:"Impresora",filled:"",autofocus:"",style:{width:"200px"}},null,8,["modelValue","options"]),s("div",null,[e(g,{label:"Enviar",type:"submit",color:"primary",style:{width:"200px"}})])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(q,{modelValue:E.value.state,"onUpdate:modelValue":l[14]||(l[14]=a=>E.value.state=a),persistent:""},{default:t(()=>[e(y,null,{default:t(()=>[e(d,{class:"row items-center"},{default:t(()=>[e(j,{icon:"warning",color:"warning","text-color":"black"}),it]),_:1}),e(d,null,{default:t(()=>[nt,(f(!0),h(F,null,R(m(Q),(a,n)=>(f(),h("div",{key:n},c(a.codigo),1))),128))]),_:1}),e(d,null,{default:t(()=>[dt,(f(!0),h(F,null,R(m(P),(a,n)=>(f(),h("div",{key:n},c(a.codigo),1))),128))]),_:1}),e(d,null,{default:t(()=>[ut,(f(!0),h(F,null,R(m(C),(a,n)=>(f(),h("div",{key:n},c(a.codigo),1))),128))]),_:1}),e(D,{align:"right"},{default:t(()=>[e(g,{flat:"",color:"primary",icon:"print",onClick:l[13]||(l[13]=a=>v.value.state=!v.value.state)}),_e(e(g,{flat:"",label:"Continuar",color:"primary"},null,512),[[Pe]])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}),i.value.state?(f(),L(ke,{key:0,reveal:"",elevated:"",bordered:"",class:"row"},{default:t(()=>[e(S,{class:"col",modelValue:k.value,"onUpdate:modelValue":[l[15]||(l[15]=a=>k.value=a),de],options:M.value,filled:"","option-label":"codigo","use-input":"","fill-input":"","hide-selected":"","input-class":"text-white","input-debounce":"0",onFilter:ne,onInputValue:ue,dense:""},{before:t(()=>[e(X,{name:"fas fa-barcode",color:"white"})]),_:1},8,["modelValue","options"]),m(C).length>0?(f(),L(g,{key:0,color:"white","text-color":"primary",size:"sm",label:"Terminar",onClick:se})):B("",!0)]),_:1})):B("",!0)]),_:1})]),_:1}))}};export{Mt as default};
