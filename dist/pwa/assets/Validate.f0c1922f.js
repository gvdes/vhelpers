import{Q as A}from"./QSpace.95f06f4f.js";import{r as v,c as E,o as _,a as b,w as a,e as o,f as s,b2 as N,Y,aF as q,Q as w,a5 as n,a4 as x,b0 as z,h as K,a6 as M}from"./index.ad93775a.js";import{Q as O}from"./QSelect.5b7237bc.js";import{Q as P}from"./QSeparator.6b89e4f2.js";import{Q as L,a as r}from"./QTr.72e9365a.js";import{Q as V}from"./QInput.778f889d.js";import{Q as R}from"./QPopupEdit.11d69bc8.js";import{d as Q,Q as j}from"./deposits.eb83de0f.js";import{Q as G}from"./QTable.7df7013c.js";import{u as H,Q as h,a as y}from"./use-quasar.0b385c2f.js";import{Q as C}from"./QDialog.84084cfd.js";import{Q as J}from"./QDate.09768da5.js";import{Q as W}from"./QCardActions.5642de55.js";import{Q as X}from"./QPage.8994904c.js";import{u as Z}from"./VDB.3e486cc6.js";import"./ClosePopup.5a991dac.js";import{d as ee}from"./dayjs.min.cbcf888d.js";import"./jspdf.plugin.autotable.61723d92.js";import"./exceljs.min.9e24d01d.js";import"./browser.a927a609.js";import{$socket as g}from"./socket.e8679fa2.js";import"./use-key-composition.f55f5f94.js";import"./uid.937d8ee7.js";import"./position-engine.96014762.js";import"./rtl.276c3f1b.js";import"./axios.ba7b1b0e.js";import"./axios.9ab26c22.js";import"./QList.ef2ca34f.js";import"./QLinearProgress.0ce831d2.js";import"./QCheckbox.aff41f06.js";import"./use-render-cache.3aae9b27.js";import"./date.5d6e1ce2.js";import"./_commonjsHelpers.88e99c8f.js";const te={class:"text-bold text-left"},oe={class:"text-bold text-center"},le={class:"text-bold text-center"},ae={class:"text-bold text-center"},se={class:"text-bold text-center"},ie={class:"text-bold text-left"},ne={class:"text-bold text-center"},re={class:"text-bold text-center"},de=["src"],ue={class:"text-h6"},ce={class:"text-subtitle2"},me={class:"q-pa-md"},je={__name:"Validate",setup(pe){const k=Z(),d=H();g.connect(),g.emit("paramscon",k),g.on("Room",t=>{console.log(t)}),g.on("StoreList",t=>{console.log(t),m.value.push(t)}),g.on("ChangeStatus",t=>{let l=m.value.findIndex(e=>e.id==t.id);l>=0&&(m.value[l].status=t.status,m.value[l]._status=t._status,d.notify({message:`El deposito de $ ${t.import} cambio de status a ${t.status.name}`,type:`${t.status.id==2?"positive":"negative"}`,position:"center"}))});const u=v({state:!1,val:null}),D=["yellow-11","green-11","red-11"],c=v({val:null,opts:[]}),p=v(!1),f=v(null),m=v([]),S=v({columns:[{name:"id",label:"Id",align:"center",field:t=>t.id},{name:"created",label:"Creado por",align:"center",field:t=>t.send_by},{name:"store",label:"Sucursal",align:"center",field:t=>t.store.name},{name:"origin",label:"Origen",align:"center",field:t=>t.origin},{name:"destiny",label:"Destino",align:"center",field:t=>t.destiny},{name:"concept",label:"Concepto",align:"left",field:t=>t.concept},{name:"reference",label:"Referencia / Folio",align:"center",field:t=>t.refernce},{name:"amount",label:"Importe",align:"center",field:t=>t.amount},{name:"status",label:"Estado",align:"left",field:t=>t.status.name},{name:"ticket",label:"Ticket",align:"center",field:t=>t.ticket},{name:"picture",label:"Foto",align:"center",field:t=>t.picture}]}),$=E(()=>c.value.val?m.value.filter(t=>t._status==c.value.val.id):m.value),T=async()=>{let t=new Date,l=ee(t).format("YYYY/MM/DD");f.value=l,console.log(l),d.loading.show({message:"Obteniendo Datos"});const e=await Q.getFormStore(k.session.store.id,{filt:f.value});e.fail?console.log(e):(console.log(e),d.loading.hide(),m.value=e.deposit,c.value.opts=e.status)},U=t=>{u.value.val=t,u.value.state=!0},F=async()=>{console.log(f.value),d.loading.show({message:"Obteniendo Datos"});const t=await Q.getFormStore(k.session.store.id,{filt:f.value});t.fail?console.log(t):(console.log(t),d.loading.hide(),m.value=t.deposit,p.value=!1)},B=async t=>{console.log(t),d.loading.show({message:"Poniendo Ticket"});let l={id:t.id,ticket:t.ticket};console.log(l);const e=await Q.changeTicket(l);console.log(e),e.fail?console.log(e):(d.loading.hide(),t.ticket=t.ticket,g.emit("ChangeTicket",e),d.notify({message:"Se agrego Ticket",type:"positive"}))};return T(),(t,l)=>(_(),b(X,{padding:""},{default:a(()=>[o(G,{title:"Depositos",rows:$.value,"row-key":"id","rows-per-page-options":[0],separator:"cell",columns:S.value.columns},{top:a(e=>[l[7]||(l[7]=s("div",{class:"col-2 q-table__title"},"Depositos",-1)),o(A),o(O,{modelValue:c.value.val,"onUpdate:modelValue":l[1]||(l[1]=i=>c.value.val=i),options:c.value.opts,label:"Estado","option-label":"name",filled:"",style:{width:"200px"}},N({_:2},[c.value.val?{name:"append",fn:a(()=>[o(Y,{name:"cancel",onClick:l[0]||(l[0]=q(i=>c.value.val=null,["stop","prevent"])),class:"cursor-pointer"})]),key:"0"}:void 0]),1032,["modelValue","options"]),o(P,{spaced:"",inset:"",vertical:""}),o(w,{color:"primary",icon:"event",onClick:l[2]||(l[2]=i=>p.value=!p.value),flat:"",round:""})]),body:a(e=>[o(L,{props:e},{default:a(()=>[o(r,{key:"id",props:e},{default:a(()=>[s("div",te,n(e.row.id),1)]),_:2},1032,["props"]),o(r,{key:"created",props:e},{default:a(()=>[s("div",oe,n(e.row.send_by),1)]),_:2},1032,["props"]),o(r,{key:"store",props:e},{default:a(()=>[s("div",le,n(e.row.store.name),1)]),_:2},1032,["props"]),o(r,{key:"origin",props:e},{default:a(()=>[s("div",ae,n(e.row.origin),1)]),_:2},1032,["props"]),o(r,{key:"destiny",props:e},{default:a(()=>[s("div",se,n(e.row.destiny),1)]),_:2},1032,["props"]),o(r,{key:"concept",props:e},{default:a(()=>[s("div",ie,n(e.row.concept),1)]),_:2},1032,["props"]),o(r,{key:"reference",props:e},{default:a(()=>[s("div",ne,n(e.row.refernce),1)]),_:2},1032,["props"]),o(r,{key:"amount",props:e},{default:a(()=>[s("div",re,"$ "+n(Number(e.row.import).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),1)]),_:2},1032,["props"]),o(r,{key:"status",props:e},{default:a(()=>[o(V,{modelValue:e.row.status.name,"onUpdate:modelValue":i=>e.row.status.name=i,type:"text",filled:"","bg-color":D[e.row.status.id-1],dense:"",disable:!0},null,8,["modelValue","onUpdate:modelValue","bg-color"])]),_:2},1032,["props"]),o(r,{key:"ticket",props:e},{default:a(()=>[x(n(e.row.ticket)+" ",1),e.row.ticket==null&&e.row._status==2?(_(),b(R,{key:0,modelValue:e.row.ticket,"onUpdate:modelValue":[i=>e.row.ticket=i,i=>B(e.row)],title:"Ticket",buttons:"","label-set":"Guardar","label-cancel":"Cancelar"},{default:a(i=>[o(V,{modelValue:i.value,"onUpdate:modelValue":I=>i.value=I,dense:"",autofocus:"",onKeyup:z(i.set,["enter"]),mask:"#-######"},null,8,["modelValue","onUpdate:modelValue","onKeyup"])]),_:2},1032,["modelValue","onUpdate:modelValue"])):K("",!0)]),_:2},1032,["props"]),o(r,{key:"picture",props:e,onClick:i=>U(e.row)},{default:a(()=>[e.row.picture!=null?(_(),b(j,{key:0,src:`http://192.168.10.160:1920/Assist/public/storage/${e.row.picture}`,ratio:1.7,"spinner-color":"primary","spinner-size":"20px",style:{width:"100px"}},null,8,["src"])):(_(),b(M,{key:1,rounded:"",size:"100px","font-size":"52px",color:"white","text-color":"primary",icon:"close"}))]),_:2},1032,["props","onClick"])]),_:2},1032,["props"])]),_:1},8,["rows","columns"]),o(C,{modelValue:u.value.state,"onUpdate:modelValue":l[3]||(l[3]=e=>u.value.state=e)},{default:a(()=>[o(h,{class:"my-card"},{default:a(()=>[s("img",{src:`http://192.168.10.160:1920/Assist/public/storage/${u.value.val.picture}`},null,8,de),o(y,null,{default:a(()=>[s("div",ue,"Creado: "+n(u.value.val.send_by),1),s("div",ce,"Estado: "+n(u.value.val.status.name),1)]),_:1}),o(y,null,{default:a(()=>[x(n(u.value.val.concept),1)]),_:1})]),_:1})]),_:1},8,["modelValue"]),o(C,{modelValue:p.value,"onUpdate:modelValue":l[6]||(l[6]=e=>p.value=e)},{default:a(()=>[o(h,{class:"my-card"},{default:a(()=>[o(y,null,{default:a(()=>[s("div",me,[l[8]||(l[8]=s("div",{class:"q-pb-sm"},null,-1)),o(J,{modelValue:f.value,"onUpdate:modelValue":l[4]||(l[4]=e=>f.value=e),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),o(y,null,{default:a(()=>[o(W,{align:"right"},{default:a(()=>[o(w,{flat:"",icon:"close",color:"negative",onClick:l[5]||(l[5]=e=>p.value=!p.value)}),o(w,{flat:"",icon:"check",color:"positive",onClick:F})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};export{je as default};
