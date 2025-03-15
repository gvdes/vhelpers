import{Q as p}from"./QSeparator.6b89e4f2.js";import{r as g,o as C,a as x,w as a,e,f as L,a4 as n,Y as $,Q as N,_ as O,a5 as c,h as S}from"./index.ad93775a.js";import{Q as h}from"./QToolbar.80ed4e2e.js";import{Q as P}from"./QHeader.f08b1aec.js";import{Q as F,a as k,b as f,c as d}from"./QSelect.5b7237bc.js";import{Q as A}from"./QInput.778f889d.js";import{u as B,Q as b,a as _}from"./use-quasar.0b385c2f.js";import{Q as R}from"./QTable.7df7013c.js";import{Q as D}from"./QList.ef2ca34f.js";import{Q as E}from"./QPage.8994904c.js";import{Q as H,a as U}from"./QLayout.b8466695.js";import{u as Y}from"./VDB.3e486cc6.js";import{_ as z}from"./UserToolbar.e60334de.js";import"./axios.ba7b1b0e.js";import{a as V}from"./axios.9ab26c22.js";import"./jspdf.plugin.autotable.61723d92.js";import"./exceljs.min.9e24d01d.js";import"./browser.a927a609.js";import"./QResizeObserver.cf4e2aed.js";import"./use-key-composition.f55f5f94.js";import"./uid.937d8ee7.js";import"./position-engine.96014762.js";import"./QDialog.84084cfd.js";import"./rtl.276c3f1b.js";import"./QLinearProgress.0ce831d2.js";import"./QCheckbox.aff41f06.js";import"./QCardActions.5642de55.js";import"./ClosePopup.5a991dac.js";import"./_commonjsHelpers.88e99c8f.js";const Te={__name:"budgetsLYT",setup(j){const y=Y(),i=B(),r=g({val:null,opts:[{id:1,label:"Salida"},{id:2,label:"Comanda"}]}),u=g({number:null,client:null,store:null}),o=g({state:!1,client:null,products:null,factura:null}),Q=g({columns:[{name:"code",label:"ARTICULO",align:"center",field:s=>s.ARTLFA},{name:"des",label:"DESCRIPCION",align:"left",field:s=>s.DESLFA},{name:"cantidad",label:"CANTIDAD",align:"center",field:s=>Number(s.CANLFA)},{name:"precio",label:"PRECIO",align:"center",field:s=>Number(s.PRELTA),format:(s,l)=>`$ ${s}`},{name:"total",label:"TOTAL",align:"center",field:s=>Number(s.TOTAL),format:(s,l)=>`$ ${s}`}],filter:"",pagination:{rowsPerPage:0}}),w=()=>{i.loading.show({message:"Obteniendo Salida"});let s="192.168.10.53:1619",l=null;r.value.val.id==1?(u.value.store=y.session.store.id,console.log(u.value),l=`http://${s}/storetools/public/api/Resources/getInvoiceBudget`):r.value.val.id==2&&(l=`http://${s}/storetools/public/api/Resources/getCommand`,u.value.store=y.session.store.id_viz),V.post(l,u.value).then(t=>{console.log(t.data),o.value.client=t.data.cliente,o.value.factura=t.data.factura,o.value.products=t.data.productos,o.value.state=!0,i.loading.hide()}).catch(t=>{console.log(t.response.data),i.notify({message:t.response.data.message,type:"negative",position:"center"}),i.loading.hide()})},T=()=>{o.value={state:!1,client:null,products:null,factura:null},u.value.client=null,u.value.number=null},I=()=>{i.loading.show({message:"Generando Presupuesto"}),o.value.factura.TOTAL=o.value.products.reduce((t,m)=>Number(t)+Number(m.TOTAL),0),console.log(o.value);let s=y.session.store.ip;console.log(u.value);let l=`http://${s}/storetools/public/api/Resources/createBudget`;V.post(l,o.value).then(t=>{t.data.status?(setTimeout(()=>{i.notify({message:t.data.message,caption:`Folio ${t.data.folio} =>  Productos ${t.data.productos}`,type:"positive",position:"center"})},3200),T(),i.loading.hide()):(i.notify({message:t.data.message,type:"negative",position:"center"}),i.loading.hide())}).catch(t=>{console.log(t.response.data),i.notify({message:t.response.data.message,type:"negative",position:"center"}),i.loading.hide()})};return(s,l)=>(C(),x(H,{view:"hHh Lpr fFf"},{default:a(()=>[e(P,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(z),e(p),e(h,{class:"justify-between"},{default:a(()=>[L("div",null,[l[3]||(l[3]=n("Helpers ")),e($,{name:"navigate_next",color:"primary"}),l[4]||(l[4]=n()),l[5]||(l[5]=L("span",{class:"text-h6"},"Presupuestos",-1))])]),_:1})]),_:1}),e(U,null,{default:a(()=>[e(E,{padding:""},{default:a(()=>[e(b,{class:"my-card"},{default:a(()=>[e(_,{class:"row"},{default:a(()=>{var t,m;return[e(F,{class:"col",modelValue:r.value.val,"onUpdate:modelValue":[l[0]||(l[0]=v=>r.value.val=v),T],options:r.value.opts,label:"Tipo",filled:""},null,8,["modelValue","options"]),e(p,{spaced:"",inset:"",vertical:"",dark:""}),e(A,{class:"col",modelValue:u.value.number,"onUpdate:modelValue":l[1]||(l[1]=v=>u.value.number=v),type:"text",label:((t=r.value.val)==null?void 0:t.id)==1?"Salida":"Comanda",mask:((m=r.value.val)==null?void 0:m.id)==1?"#-######":"",filled:"",disable:r.value.val==null},null,8,["modelValue","label","mask","type","disable"]),e(p,{spaced:"",inset:"",vertical:"",dark:""}),e(A,{class:"col",modelValue:u.value.client,"onUpdate:modelValue":l[2]||(l[2]=v=>u.value.client=v),type:"number",label:"Numero de cliente",filled:"",disable:r.value.val==null||u.value.number==null},null,8,["modelValue","disable"]),e(p,{spaced:"",inset:"",vertical:"",dark:""}),e(N,{color:"primary",icon:"send",flat:"",onClick:w,disable:r.value.val==null||u.value.number==null||u.value.client==null},null,8,["disable"])]}),_:1})]),_:1}),e(p,{spaced:"",inset:"",vertical:"",dark:""}),e(O,{name:"bounce"},{default:a(()=>[o.value.state?(C(),x(b,{key:0,class:"my-card",style:{"min-width":"400px"},flat:"",bordered:""},{default:a(()=>[e(D,{bordered:""},{default:a(()=>[e(b,{class:"my-card"},{default:a(()=>[e(_,null,{default:a(()=>[e(k,{class:"text-center"},{default:a(()=>[e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>{var t;return[n(c(((t=r.value.val)==null?void 0:t.id)==1?"Salida":"Comanda"),1)]}),_:1}),e(d,{class:"text-h4"},{default:a(()=>[n(c(`${o.value.factura.FOLIO}`),1)]),_:1})]),_:1}),e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>l[6]||(l[6]=[n("Fecha")])),_:1}),e(d,{class:"text-h6"},{default:a(()=>[n(c(o.value.factura.FECHA),1)]),_:1})]),_:1}),e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>l[7]||(l[7]=[n("Modelos")])),_:1}),e(d,{class:"text-h6"},{default:a(()=>[n(c(o.value.products.length),1)]),_:1})]),_:1}),e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>l[8]||(l[8]=[n("Piezas")])),_:1}),e(d,{class:"text-h6"},{default:a(()=>[n(c(o.value.products.reduce((t,m)=>Number(t)+Number(m.CANLFA),0)),1)]),_:1})]),_:1}),e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>l[9]||(l[9]=[n("Total")])),_:1}),e(d,{class:"text-h6"},{default:a(()=>[n("$"+c(o.value.products.reduce((t,m)=>Number(t)+Number(m.TOTAL),0)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(p,{spaced:"",inset:"",vertical:"",dark:""}),e(b,{class:"my-card"},{default:a(()=>[e(_,null,{default:a(()=>[e(k,{class:"text-h6"},{default:a(()=>[e(f,null,{default:a(()=>[e(d,{lines:"2"},{default:a(()=>l[10]||(l[10]=[n("Cliente")])),_:1})]),_:1}),e(f,null,{default:a(()=>[n(c(o.value.client.NOFCLI),1)]),_:1})]),_:1})]),_:1})]),_:1}),e(p,{spaced:"",inset:"",vertical:"",dark:""}),e(p,{spaced:"",inset:"",vertical:"",dark:""}),e(b,{class:"my-card"},{default:a(()=>[e(_,null,{default:a(()=>[e(R,{class:"my-sticky-virtscroll-table",style:{height:"400px"},rows:o.value.products,columns:Q.value.columns,"hide-bottom":"","virtual-scroll":"",pagination:Q.value.pagination},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),e(p,{spaced:"",inset:"",vertical:"",dark:""}),e(N,{class:"full-width",color:"primary",icon:"receipt",label:"Crear",onClick:I})]),_:1})]),_:1})):S("",!0)]),_:1})]),_:1})]),_:1})]),_:1}))}};export{Te as default};
