import{Q as N}from"./QSpace.f7802268.js";import{r as f,c as z,o as h,a as Q,w as s,e as l,b1 as $,Y as V,aE as E,Q as y,i,a4 as r,a5 as M,f as j,a3 as P}from"./index.2a0ff0f3.js";import{Q as C}from"./QSelect.eb47e5f1.js";import{Q as k}from"./QSeparator.52b589e6.js";import{Q as W}from"./QInput.be58b3ff.js";import{Q as J,a as c}from"./QTr.f45e086a.js";import{d as S,Q as G}from"./deposits.fb325e53.js";import{Q as H}from"./QTable.eddfa55b.js";import{u as K,Q as U,a as x}from"./use-quasar.92a9e43e.js";import{Q as B}from"./QDialog.db37770b.js";import{Q as X}from"./QDate.dca0ae3c.js";import{Q as Z}from"./QCardActions.3b757165.js";import{Q as ee}from"./QPage.a9220ac2.js";import{u as te}from"./VDB.7d4cf90d.js";import"./ClosePopup.9d7e89b4.js";import{d as le}from"./dayjs.min.25545ff6.js";import"./jspdf.plugin.autotable.44ab3559.js";import{E as oe}from"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import{$socket as w}from"./socket.8658b04d.js";import"./use-key-composition.ff214e8f.js";import"./uid.42677368.js";import"./position-engine.57176ff3.js";import"./rtl.b51694b1.js";import"./axios.ae0a941c.js";import"./axios.f1f32898.js";import"./QList.f9fb4a14.js";import"./QLinearProgress.9171fccf.js";import"./QCheckbox.ae5367c2.js";import"./use-cache.b0833c75.js";import"./date.8f3913d3.js";import"./_commonjsHelpers.88e99c8f.js";const ae=i("div",{class:"col-2 q-table__title q-mr-xl"},"Depositos",-1),se={class:"text-bold text-left"},ie={class:"text-bold text-center"},ne={class:"text-bold text-center"},re={class:"text-bold text-center"},de={class:"text-bold text-center"},ce={class:"text-bold text-left"},ue={class:"text-bold text-center"},me={class:"text-bold text-center"},pe={class:"text-bold text-left"},ve=["src"],fe={class:"text-h6"},ge={class:"text-subtitle2"},be={class:"q-pa-md"},_e=i("div",{class:"q-pb-sm"},null,-1),Xe={__name:"Confirm",setup(ye){const T=te(),u=K();w.connect(),w.on("List",e=>{console.log(e),m.value.push(e)}),w.on("ChangeTicket",e=>{let o=m.value.findIndex(t=>t.id==e.id);o>=0&&(m.value[o].ticket=e.ticket,u.notify({message:`El deposito de $ ${e.import} se agrego el ticket ${e.ticket}`,type:"positive",position:"center"}))});const p=f({state:!1,val:null}),n=f({val:{id:1,name:"Pendiente"},opts:[]}),A=["yellow-11","green-11","red-11"],v=f(!1),g=f(null),d=f({val:null,opts:[]}),m=f([]),b=f({columns:[{name:"id",label:"Id",align:"center",field:e=>e.id},{name:"created",label:"Creado por",align:"center",field:e=>e.send_by},{name:"store",label:"Sucursal",align:"center",field:e=>e.store.name},{name:"origin",label:"Origen",align:"center",field:e=>e.origin},{name:"destiny",label:"Destino",align:"center",field:e=>e.destiny},{name:"concept",label:"Concepto",align:"left",field:e=>e.concept},{name:"reference",label:"Referencia / Folio",align:"center",field:e=>e.refernce},{name:"amount",label:"Importe",align:"center",field:e=>e.amount},{name:"status",label:"Estado",align:"left",field:e=>e.status.name},{name:"ticket",label:"Ticket",align:"center",field:e=>e.ticket},{name:"picture",label:"Foto",align:"center",field:e=>e.picture}],filter:""}),D=z(()=>d.value.val&&n.value.val?m.value.filter(e=>e._store==d.value.val.id&&e._status==n.value.val.id):d.value.val&&!n.value.val?m.value.filter(e=>e._store==d.value.val.id):!d.value.val&&n.value.val?m.value.filter(e=>e._status==n.value.val.id):m.value),F=async()=>{let e=new Date,o=le(e).format("YYYY/MM/DD");g.value=o,console.log(o),u.loading.show({message:"Obteniendo Datos"}),u.loading.show({message:"Obteniendo Datos"});const t=await S.getForm({filt:g.value});t.fail?console.log(t):(console.log(t),u.loading.hide(),m.value=t.deposit,n.value.opts=t.status,d.value.opts=t.stores)},I=e=>{p.value.val=e,p.value.state=!0},q=async e=>{u.loading.show({message:"Cambiando estado"});let o={id:e.id,status:e.status.id};console.log(o);const t=await S.changeStatus(o);console.log(t),t.fail?console.log(t):(u.loading.hide(),e._status=e.status.id,w.emit("ChangeStatus",t),u.notify({message:"Se cambio de estado",type:"positive"}))},O=async()=>{console.log(g.value),u.loading.show({message:"Obteniendo Datos"});const e=await S.getForm({filt:g.value});e.fail?console.log(e):(console.log(e),u.loading.hide(),m.value=e.deposit,v.value=!1)},R=async()=>{const e=new oe.Workbook,o=e.addWorksheet("Comparativo");o.addRow(b.value.columns.map(a=>a.label)),D.value.forEach(async a=>{o.addRow([a.id,a.send_by,a.store.name,a.origin,a.destiny,a.concept,a.refernce,a.amount,a.status.name,a.ticket,`http://192.168.10.160:1920/Assist/public/storage/${a.picture}`])}),(async()=>{const a=await e.xlsx.writeBuffer(),Y=new Blob([a],{type:"application/octet-stream"}),L=URL.createObjectURL(Y),_=document.createElement("a");_.href=L,_.download=`Comparativo${T.session.store.alias}.xlsx`,document.body.appendChild(_),_.click(),document.body.removeChild(_)})()};return F(),(e,o)=>(h(),Q(ee,{padding:""},{default:s(()=>[l(H,{title:"Depositos",rows:j(D),"row-key":"id","rows-per-page-options":[0],separator:"cell",columns:b.value.columns,filter:b.value.filter},{top:s(t=>[ae,l(N),l(C,{modelValue:d.value.val,"onUpdate:modelValue":o[1]||(o[1]=a=>d.value.val=a),options:d.value.opts,label:"Sucursal","option-label":"name",filled:"",style:{width:"200px"}},$({_:2},[d.value.val?{name:"append",fn:s(()=>[l(V,{name:"cancel",onClick:o[0]||(o[0]=E(a=>d.value.val=null,["stop","prevent"])),class:"cursor-pointer"})]),key:"0"}:void 0]),1032,["modelValue","options"]),l(k,{spaced:"",inset:"",vertical:""}),l(C,{modelValue:n.value.val,"onUpdate:modelValue":o[3]||(o[3]=a=>n.value.val=a),options:n.value.opts,label:"Estado","option-label":"name",filled:"",style:{width:"200px"}},$({_:2},[n.value.val?{name:"append",fn:s(()=>[l(V,{name:"cancel",onClick:o[2]||(o[2]=E(a=>n.value.val=null,["stop","prevent"])),class:"cursor-pointer"})]),key:"0"}:void 0]),1032,["modelValue","options"]),l(k,{spaced:"",inset:"",vertical:""}),l(y,{color:"primary",icon:"event",onClick:o[4]||(o[4]=a=>v.value=!v.value),flat:"",round:""}),l(k,{spaced:"",inset:"",vertical:""}),l(y,{color:"primary",icon:"download",onClick:R,flat:"",round:""}),l(k,{spaced:"",inset:"",vertical:""}),l(W,{borderless:"",dense:"",debounce:"300",modelValue:b.value.filter,"onUpdate:modelValue":o[5]||(o[5]=a=>b.value.filter=a),placeholder:"Search"},{append:s(()=>[l(V,{name:"search"})]),_:1},8,["modelValue"])]),body:s(t=>[l(J,{props:t},{default:s(()=>[l(c,{key:"id",props:t},{default:s(()=>[i("div",se,r(t.row.id),1)]),_:2},1032,["props"]),l(c,{key:"created",props:t},{default:s(()=>[i("div",ie,r(t.row.send_by),1)]),_:2},1032,["props"]),l(c,{key:"store",props:t},{default:s(()=>[i("div",ne,r(t.row.store.name),1)]),_:2},1032,["props"]),l(c,{key:"origin",props:t},{default:s(()=>[i("div",re,r(t.row.origin),1)]),_:2},1032,["props"]),l(c,{key:"destiny",props:t},{default:s(()=>[i("div",de,r(t.row.destiny),1)]),_:2},1032,["props"]),l(c,{key:"concept",props:t},{default:s(()=>[i("div",ce,r(t.row.concept),1)]),_:2},1032,["props"]),l(c,{key:"reference",props:t},{default:s(()=>[i("div",ue,r(t.row.refernce),1)]),_:2},1032,["props"]),l(c,{key:"amount",props:t},{default:s(()=>[i("div",me,"$ "+r(Number(t.row.import).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),1)]),_:2},1032,["props"]),l(c,{key:"status",props:t},{default:s(()=>[l(C,{"bg-color":A[t.row.status.id-1],modelValue:t.row.status,"onUpdate:modelValue":[a=>t.row.status=a,a=>q(t.row)],options:n.value.opts,label:"Estado",filled:"","option-label":"name",dense:""},null,8,["bg-color","modelValue","onUpdate:modelValue","options"])]),_:2},1032,["props"]),l(c,{key:"ticket",props:t},{default:s(()=>[i("div",pe,r(t.row.ticket),1)]),_:2},1032,["props"]),l(c,{key:"picture",props:t,onClick:a=>I(t.row)},{default:s(()=>[t.row.picture!=null?(h(),Q(G,{key:0,src:`http://192.168.10.160:1920/Assist/public/storage/${t.row.picture}`,ratio:1.7,"spinner-color":"primary","spinner-size":"20px",style:{width:"100px"}},null,8,["src","ratio"])):(h(),Q(M,{key:1,rounded:"",size:"100px","font-size":"52px",color:"white","text-color":"primary",icon:"close"}))]),_:2},1032,["props","onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","columns","filter"]),l(B,{modelValue:p.value.state,"onUpdate:modelValue":o[6]||(o[6]=t=>p.value.state=t)},{default:s(()=>[l(U,{class:"my-card"},{default:s(()=>[i("img",{src:`http://192.168.10.160:1920/Assist/public/storage/${p.value.val.picture}`},null,8,ve),l(x,null,{default:s(()=>[i("div",fe,"Creado: "+r(p.value.val.send_by),1),i("div",ge,"Estado: "+r(p.value.val.status.name),1)]),_:1}),l(x,null,{default:s(()=>[P(r(p.value.val.concept),1)]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(B,{modelValue:v.value,"onUpdate:modelValue":o[9]||(o[9]=t=>v.value=t)},{default:s(()=>[l(U,{class:"my-card"},{default:s(()=>[l(x,null,{default:s(()=>[i("div",be,[_e,l(X,{modelValue:g.value,"onUpdate:modelValue":o[7]||(o[7]=t=>g.value=t),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),l(x,null,{default:s(()=>[l(Z,{align:"right"},{default:s(()=>[l(y,{flat:"",icon:"close",color:"negative",onClick:o[8]||(o[8]=t=>v.value=!v.value)}),l(y,{flat:"",icon:"check",color:"positive",onClick:O})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};export{Xe as default};
