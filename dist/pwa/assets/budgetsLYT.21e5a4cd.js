import{Q as c}from"./QSeparator.1bab9251.js";import{r as b,o as T,a as C,w as a,e,i as A,a3 as i,Y as I,Q as x,_ as $,a4 as m,h as O}from"./index.7c99b950.js";import{Q as S}from"./QToolbar.53e179e0.js";import{Q as P}from"./QHeader.b8b867f7.js";import{Q as F,a as L,b as f,c as d}from"./QSelect.16e3bd2b.js";import{Q as N}from"./QInput.7a62d090.js";import{u as B,Q as _,a as g}from"./use-quasar.9cecd99a.js";import{Q as R}from"./QTable.6010e70f.js";import{Q as D}from"./QList.39de04a4.js";import{Q as E}from"./QPage.d89a109f.js";import{Q as H,a as U}from"./QLayout.7f8a02b2.js";import{u as Y}from"./VDB.bd73a196.js";import{_ as z}from"./UserToolbar.3e76ecc4.js";import"./axios.ed74c1ba.js";import{a as k}from"./axios.f1f32898.js";import"./jspdf.plugin.autotable.512a9086.js";import"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import"./QResizeObserver.117f85ff.js";import"./use-key-composition.2f07afdb.js";import"./uid.42677368.js";import"./position-engine.e492bbe1.js";import"./QDialog.33d4e940.js";import"./rtl.b51694b1.js";import"./QLinearProgress.f7db3f6b.js";import"./QCheckbox.6b323503.js";import"./QCardActions.179861b3.js";import"./ClosePopup.aea3cc69.js";import"./_commonjsHelpers.88e99c8f.js";const j=A("span",{class:"text-h6"},"Presupuestos",-1),Te={__name:"budgetsLYT",setup(q){const y=Y(),n=B(),r=b({val:null,opts:[{id:1,label:"Salida"},{id:2,label:"Comanda"}]}),o=b({number:null,client:null,store:null}),s=b({state:!1,client:null,products:null,factura:null}),Q=b({columns:[{name:"code",label:"ARTICULO",align:"center",field:t=>t.ARTLFA},{name:"des",label:"DESCRIPCION",align:"left",field:t=>t.DESLFA},{name:"cantidad",label:"CANTIDAD",align:"center",field:t=>Number(t.CANLFA)},{name:"precio",label:"PRECIO",align:"center",field:t=>Number(t.PRELTA),format:(t,u)=>`$ ${t}`},{name:"total",label:"TOTAL",align:"center",field:t=>Number(t.TOTAL),format:(t,u)=>`$ ${t}`}],filter:"",pagination:{rowsPerPage:0}}),V=()=>{n.loading.show({message:"Obteniendo Salida"});let t="192.168.10.53:1619",u=null;r.value.val.id==1?(o.value.store=y.session.store.id,console.log(o.value),u=`http://${t}/storetools/public/api/Resources/getInvoiceBudget`):r.value.val.id==2&&(u=`http://${t}/storetools/public/api/Resources/getCommand`,o.value.store=y.session.store.id_viz),k.post(u,o.value).then(l=>{console.log(l.data),s.value.client=l.data.cliente,s.value.factura=l.data.factura,s.value.products=l.data.productos,s.value.state=!0,n.loading.hide()}).catch(l=>{console.log(l.response.data),n.notify({message:l.response.data.message,type:"negative",position:"center"}),n.loading.hide()})},h=()=>{s.value={state:!1,client:null,products:null,factura:null},o.value.client=null,o.value.number=null},w=()=>{n.loading.show({message:"Generando Presupuesto"}),s.value.factura.TOTAL=s.value.products.reduce((l,p)=>Number(l)+Number(p.TOTAL),0),console.log(s.value);let t=y.session.store.ip;console.log(o.value);let u=`http://${t}/storetools/public/api/Resources/createBudget`;k.post(u,s.value).then(l=>{l.data.status?(setTimeout(()=>{n.notify({message:l.data.message,caption:`Folio ${l.data.folio} =>  Productos ${l.data.productos}`,type:"positive",position:"center"})},3200),h(),n.loading.hide()):(n.notify({message:l.data.message,type:"negative",position:"center"}),n.loading.hide())}).catch(l=>{console.log(l.response.data),n.notify({message:l.response.data.message,type:"negative",position:"center"}),n.loading.hide()})};return(t,u)=>(T(),C(H,{view:"hHh Lpr fFf"},{default:a(()=>[e(P,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(z),e(c),e(S,{class:"justify-between"},{default:a(()=>[A("div",null,[i("Helpers "),e(I,{name:"navigate_next",color:"primary"}),i(),j])]),_:1})]),_:1}),e(U,null,{default:a(()=>[e(E,{padding:""},{default:a(()=>[e(_,{class:"my-card"},{default:a(()=>[e(g,{class:"row"},{default:a(()=>{var l,p;return[e(F,{class:"col",modelValue:r.value.val,"onUpdate:modelValue":[u[0]||(u[0]=v=>r.value.val=v),h],options:r.value.opts,label:"Tipo",filled:""},null,8,["modelValue","options"]),e(c,{spaced:"",inset:"",vertical:"",dark:""}),e(N,{class:"col",modelValue:o.value.number,"onUpdate:modelValue":u[1]||(u[1]=v=>o.value.number=v),type:"text",label:((l=r.value.val)==null?void 0:l.id)==1?"Salida":"Comanda",mask:((p=r.value.val)==null?void 0:p.id)==1?"#-######":"",filled:"",disable:r.value.val==null},null,8,["modelValue","label","mask","type","disable"]),e(c,{spaced:"",inset:"",vertical:"",dark:""}),e(N,{class:"col",modelValue:o.value.client,"onUpdate:modelValue":u[2]||(u[2]=v=>o.value.client=v),type:"number",label:"Numero de cliente",filled:"",disable:r.value.val==null||o.value.number==null},null,8,["modelValue","disable"]),e(c,{spaced:"",inset:"",vertical:"",dark:""}),e(x,{color:"primary",icon:"send",flat:"",onClick:V,disable:r.value.val==null||o.value.number==null||o.value.client==null},null,8,["disable"])]}),_:1})]),_:1}),e(c,{spaced:"",inset:"",vertical:"",dark:""}),e($,{name:"bounce"},{default:a(()=>[s.value.state?(T(),C(_,{key:0,class:"my-card",style:{"min-width":"400px"},flat:"",bordered:""},{default:a(()=>[e(D,{bordered:""},{default:a(()=>[e(_,{class:"my-card"},{default:a(()=>[e(g,null,{default:a(()=>[e(L,{class:"text-center"},{default:a(()=>[e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>{var l;return[i(m(((l=r.value.val)==null?void 0:l.id)==1?"Salida":"Comanda"),1)]}),_:1}),e(d,{class:"text-h4"},{default:a(()=>[i(m(`${s.value.factura.FOLIO}`),1)]),_:1})]),_:1}),e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>[i("Fecha")]),_:1}),e(d,{class:"text-h6"},{default:a(()=>[i(m(s.value.factura.FECHA),1)]),_:1})]),_:1}),e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>[i("Modelos")]),_:1}),e(d,{class:"text-h6"},{default:a(()=>[i(m(s.value.products.length),1)]),_:1})]),_:1}),e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>[i("Piezas")]),_:1}),e(d,{class:"text-h6"},{default:a(()=>[i(m(s.value.products.reduce((l,p)=>Number(l)+Number(p.CANLFA),0)),1)]),_:1})]),_:1}),e(f,null,{default:a(()=>[e(d,{caption:"",lines:"2"},{default:a(()=>[i("Total")]),_:1}),e(d,{class:"text-h6"},{default:a(()=>[i("$"+m(s.value.products.reduce((l,p)=>Number(l)+Number(p.TOTAL),0)),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(c,{spaced:"",inset:"",vertical:"",dark:""}),e(_,{class:"my-card"},{default:a(()=>[e(g,null,{default:a(()=>[e(L,{class:"text-h6"},{default:a(()=>[e(f,null,{default:a(()=>[e(d,{lines:"2"},{default:a(()=>[i("Cliente")]),_:1})]),_:1}),e(f,null,{default:a(()=>[i(m(s.value.client.NOFCLI),1)]),_:1})]),_:1})]),_:1})]),_:1}),e(c,{spaced:"",inset:"",vertical:"",dark:""}),e(c,{spaced:"",inset:"",vertical:"",dark:""}),e(_,{class:"my-card"},{default:a(()=>[e(g,null,{default:a(()=>[e(R,{class:"my-sticky-virtscroll-table",style:{height:"400px"},rows:s.value.products,columns:Q.value.columns,"hide-bottom":"","virtual-scroll":"",pagination:Q.value.pagination},null,8,["rows","columns","pagination"])]),_:1})]),_:1}),e(c,{spaced:"",inset:"",vertical:"",dark:""}),e(x,{class:"full-width",color:"primary",icon:"receipt",label:"Crear",onClick:w})]),_:1})]),_:1})):O("",!0)]),_:1})]),_:1})]),_:1})]),_:1}))}};export{Te as default};