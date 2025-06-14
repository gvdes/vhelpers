import{Q as T,c as V}from"./QSeparator.a685c464.js";import{Q as k}from"./QHeader.cc416a08.js";import{a$ as O,u as N,aH as B,r as n,aZ as A,o as d,a as f,w as o,e as a,f as C,a6 as v,E as L,T as P,g as Y,a4 as U,a3 as H,Q as m,a5 as x,a_ as $,h as F,a0 as D}from"./index.ebb5d6f0.js";import{Q as M}from"./QToolbar.203b7292.js";import{Q as R,a as _}from"./QTr.4e9f3bf8.js";import{Q as g}from"./QTable.143fe6c7.js";import{Q as j,a as z}from"./QLayout.013eafb2.js";import{u as Z,Q as G,a as b}from"./use-quasar.f631986c.js";import{Q as J}from"./QSelect.55b984df.js";import{Q as K}from"./QCardActions.3018f561.js";import{C as W}from"./ClosePopup.16a3e09e.js";import{u as X}from"./VDB.96be1380.js";import{_ as ee}from"./UserToolbar.abec38a6.js";import{d as ae}from"./dayjs.min.cbcf888d.js";import{u as oe,r as Q}from"./requisitionApi.c33c55a8.js";import"./QResizeObserver.de9e7aa1.js";import"./QList.8c156a7a.js";import"./QLinearProgress.d4aa19f9.js";import"./QCheckbox.5d9b3f79.js";import"./QScrollObserver.853189d3.js";import"./QDrawer.b855ad24.js";import"./auth.47587533.js";import"./axios.0d2bd0f9.js";import"./_commonjsHelpers.88e99c8f.js";const te={class:"row items-center"},se={__name:"inputsLYT",setup(le){const w=X();oe();const S=N();B();const i=Z();n(""),n([]);const r=n([]),t=n({state:!1,val:null}),y=n([]),c=n({columnsReq:[{name:"id",label:"ID",field:e=>e.id},{name:"user",label:"USUARIO",field:e=>e.user.complete_name},{name:"status",label:"ESTADO",field:e=>e.status.name},{name:"date",label:"FECHA",field:e=>ae(e.created_at).format("YYYY/MM/DD")},{name:"products",label:"PRODUCTOS",field:e=>e.bodie.length},{name:"notes",label:"NOTAS",field:e=>e.notes}],columns:[{name:"id",label:"ID",field:e=>e.id},{name:"name",label:"NOMBRE",field:e=>e.name},{name:"countRequisition",label:"REQUISISIONES",field:e=>e.requisition_count}],columnsRequired:[{name:"code",label:"CODE",field:e=>e.code},{name:"descripcion",label:"DESCRIPCION",field:e=>e.description},{name:"amount",label:"CANTIDAD",field:e=>e.amount}]}),q=async()=>{i.loading.show({message:"Obteniendo Datos"});const e=await Q.getRequisitionsStore();e.status!==200?console.log(e):(i.loading.hide(),r.value=e.data.stores,y.value=e.data.status,console.log(e.data))},h=(e,s)=>{t.value.state=!0,t.value.val=s,console.log(s)},I=async()=>{i.loading.show({message:"Imprimiendo"});const e=await Q.printReq(t.value.val._stores,t.value.val.id);e.status!=200?console.log(e):(console.log(e),i.loading.hide())},E=async()=>{i.loading.hide({message:"Cambiando Status"});const e=await Q.change(t.value.val._stores,t.value.val.id);e.status!=200?console.log(e):(console.log(e),i.loading.hide(),i.notify({message:"El pedido se cambio de estado",type:"positive",position:"center"}),r.value.forEach(s=>{if(s.id==e.data._stores){let u=s.requisition.findIndex(l=>l.id==e.data.id);u>=0&&(s.requisition[u]=e.data)}}),t.value.val=e.data,t.value.state=!1)};return w.session.rol=="adm"||w.session.rol=="root"?q():(i.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),S.replace("/")),(e,s)=>{const u=A("router-view");return d(),f(j,{view:"hHh Lpr fFf"},{default:o(()=>[a(k,{class:"transparent text-dark",bordered:""},{default:o(()=>[a(ee),a(T)]),_:1}),a(z,null,{default:o(()=>[a(M,{class:"justify-between"},{default:o(()=>[C("div",te,[s[3]||(s[3]=v(" Helpers ")),a(L,{name:"navigate_next",color:"primary",class:"q-mx-sm"}),a(P,{name:"fade"},{default:o(()=>s[2]||(s[2]=[C("span",{class:"text-h6"},"Pedidos Insumos ",-1)])),_:1})])]),_:1}),r.value.length>0?(d(),f(g,{key:0,title:"Pedidos",rows:r.value,columns:c.value.columns},{body:o(l=>[a(R,{props:l},{default:o(()=>[(d(!0),Y(H,null,U(l.cols,p=>(d(),f(_,{key:p.name,props:l},{default:o(()=>[v(D(p.value),1)]),_:2},1032,["props"]))),128)),a(_,{"auto-width":""},{default:o(()=>[a(m,{size:"sm",color:"accent",round:"",dense:"",onClick:p=>l.expand=!l.expand,icon:l.expand?"remove":"add"},null,8,["onClick","icon"])]),_:2},1024)]),_:2},1032,["props"]),x(a(R,{props:l},{default:o(()=>[a(_,{colspan:"100%"},{default:o(()=>[a(g,{rows:l.row.requisition,columns:c.value.columnsReq,onRowClick:h},null,8,["rows","columns"])]),_:2},1024)]),_:2},1032,["props"]),[[$,l.expand]])]),_:1},8,["rows","columns"])):F("",!0),a(u)]),_:1}),a(V,{modelValue:t.value.state,"onUpdate:modelValue":s[1]||(s[1]=l=>t.value.state=l),persistent:""},{default:o(()=>[a(G,{style:{width:"500px"}},{default:o(()=>[a(b,{class:"text-bold text-h6 text-center"},{default:o(()=>[v(" PEDIDO: "+D(t.value.val.id),1)]),_:1}),a(b,null,{default:o(()=>[a(J,{modelValue:t.value.val.status,"onUpdate:modelValue":s[0]||(s[0]=l=>t.value.val.status=l),options:y.value,label:"Estado",filled:"","option-label":"name",disable:""},null,8,["modelValue","options"])]),_:1}),a(b,null,{default:o(()=>[a(g,{rows:t.value.val.bodie,columns:c.value.columnsRequired},null,8,["rows","columns"])]),_:1}),a(K,{align:"right"},{default:o(()=>[x(a(m,{flat:"",icon:"close",color:"primary"},null,512),[[W]]),a(m,{flat:"",icon:"print",color:"primary",onClick:I}),a(m,{flat:"",icon:"send",color:"primary",onClick:E,disable:t.value.val._status>3},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}};var Ee=O(se,[["__scopeId","data-v-4e0d7674"]]);export{Ee as default};
