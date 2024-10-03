import{Q as y}from"./QSeparator.6afdd730.js";import{r as c,c as q,o as x,a as V,w as a,u as j,e,i as p,a3 as o,Y as D,Q as m,g as F,a0 as H,a1 as M,f as k,a2 as P,a4 as d,a6 as z}from"./index.7ded638f.js";import{Q as G}from"./QHeader.47cd956a.js";import{a as T,b as n,Q as O}from"./QSelect.855981be.js";import{Q as $}from"./QList.7097774e.js";import{Q as J}from"./QDate.c6bc6348.js";import{Q as A,a as _}from"./QCard.f0e183b6.js";import{Q as S}from"./QCardActions.df110778.js";import{Q as I}from"./QDialog.05f54e67.js";import{Q as K}from"./QInput.b14ac6c2.js";import{Q as W}from"./QPage.7674c300.js";import{u as X}from"./VDB.733f137f.js";import{u as Z}from"./use-quasar.ef17de3c.js";import"./jspdf.plugin.autotable.eabbebae.js";import{t as w}from"./transferApi.355b732a.js";import"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import{d as ee}from"./dayjs.min.25545ff6.js";import{_ as ae}from"./UserToolbar.703d99a0.js";import"./QResizeObserver.8a64e691.js";import"./use-key-composition.c6b4d655.js";import"./uid.42677368.js";import"./position-engine.e4f86561.js";import"./rtl.b51694b1.js";import"./format.2bc25e5f.js";import"./use-cache.b0833c75.js";import"./date.9cf0417f.js";import"./_commonjsHelpers.88e99c8f.js";import"./axios.ae0a941c.js";import"./axios.f1f32898.js";import"./ClosePopup.ce59bb50.js";const te={class:"row justify-between"},le=p("span",{class:"text-h6"},"Traspasos entre Almacenes",-1),oe={class:"q-pa-md"},se=p("div",{class:"q-pb-sm"},null,-1),Ye={__name:"Index",setup(ne){const C=j(),g=X(),r=Z(),u=c(!1),f=c(null),v=c(!1),b=c([]),Q=c([]),s=c({_origin:null,_destiny:null,notes:null}),N=q(()=>s.value._origin&&s.value._destiny&&s.value.notes),R=async()=>{console.log("Recibiendo Datos :)"),r.loading.show({message:"Obteniendo Datos"});let i=g.session.store.id;const l=await w.index(i);l.error?console.log(l):(console.log(l),b.value=l.transfer,Q.value=l.warehouses,r.loading.hide())},U=async()=>{r.loading.show({message:"Creando Traspaso"}),s.value.created_by=g.session.name,s.value._store=g.session.store.id,console.log(s.value);const i=await w.addTransfer(s.value);i.error?(console.log(i),r.notify({message:"No se logro crear el traspaso",position:"center",type:"negative"})):(r.loading.hide(),r.notify({message:`Traspaso ${i.code_fs} creada`,position:"center",type:"positive"}),C.push(`transfers/${i.id}`))},B=()=>{v.value=!1,s.value={_origin:null,_destiny:null,notes:null}},h=i=>i.id==s.value._origin.id,E=async()=>{console.log(f.value),r.loading.show({message:"Obteniendo Datos"});let l={store:g.session.store.id,date:f.value};console.log("Recibiendo Datos :)");const t=await w.getDate(l);t.fail?console.log(t):(console.log(t),b.value=t,r.loading.hide(),f.value=null,u.value=!1)},Y=i=>{C.push(`transfers/${i}`)};return R(),(i,l)=>(x(),V(W,{padding:""},{default:a(()=>[e(G,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(ae),e(y),p("div",te,[p("div",null,[o("Helpers "),e(D,{name:"navigate_next",color:"primary"}),o(),le]),p("div",null,[e(m,{color:"primary",icon:"add",flat:"",onClick:l[0]||(l[0]=t=>v.value=!v.value),round:""}),e(m,{color:"primary",icon:"event",onClick:l[1]||(l[1]=t=>u.value=!u.value),flat:"",round:""})])]),e(y)]),_:1}),e($,null,{default:a(()=>[e(T,null,{default:a(()=>[e(n,{class:"text-center"},{default:a(()=>[o("ID")]),_:1}),e(n,{class:"text-center"},{default:a(()=>[o("CREADO")]),_:1}),e(n,{class:"text-center"},{default:a(()=>[o("CREADO POR")]),_:1}),e(n,{class:"text-center"},{default:a(()=>[o("NOTAS")]),_:1}),e(n,{class:"text-center"},{default:a(()=>[o("ORIGEN")]),_:1}),e(n,{class:"text-center"},{default:a(()=>[o("DESTINO")]),_:1}),e(n,{class:"text-center"},{default:a(()=>[o("FACTUSOL")]),_:1}),e(n,{class:"text-center"},{default:a(()=>[o("ARTICULOS")]),_:1})]),_:1})]),_:1}),e(y,{spaced:"",inset:"",vertical:"",dark:""}),(x(!0),F(M,null,H(b.value,(t,L)=>(x(),V($,{bordered:"",key:L},{default:a(()=>[P((x(),V(T,{clickable:"",onClick:ie=>Y(t.id)},{default:a(()=>[e(n,{class:"text-center"},{default:a(()=>[o(d(t.id),1)]),_:2},1024),e(n,{class:"text-center"},{default:a(()=>[o(d(k(ee)(t.created_at).format("YYYY-MM-D")),1)]),_:2},1024),e(n,{class:"text-center"},{default:a(()=>[o(d(t.created_by),1)]),_:2},1024),e(n,{class:"text-center"},{default:a(()=>[o(d(t.notes),1)]),_:2},1024),e(n,{class:"text-center"},{default:a(()=>[o(d(t.origin.alias),1)]),_:2},1024),e(n,{class:"text-center"},{default:a(()=>[o(d(t.destiny.alias),1)]),_:2},1024),e(n,{class:"text-center"},{default:a(()=>[o(d(t.code_fs),1)]),_:2},1024),e(n,{class:"text-center"},{default:a(()=>[o(d(t.bodie.length),1)]),_:2},1024)]),_:2},1032,["onClick"])),[[z]])]),_:2},1024))),128)),e(I,{modelValue:u.value,"onUpdate:modelValue":l[4]||(l[4]=t=>u.value=t)},{default:a(()=>[e(A,{class:"my-card"},{default:a(()=>[e(_,null,{default:a(()=>[p("div",oe,[se,e(J,{modelValue:f.value,"onUpdate:modelValue":l[2]||(l[2]=t=>f.value=t),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),e(_,null,{default:a(()=>[e(S,{align:"right"},{default:a(()=>[e(m,{flat:"",icon:"close",color:"negative",onClick:l[3]||(l[3]=t=>u.value=!u.value)}),e(m,{flat:"",icon:"check",color:"positive",onClick:E})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(I,{modelValue:v.value,"onUpdate:modelValue":l[9]||(l[9]=t=>v.value=t),persistent:""},{default:a(()=>[e(A,{style:{width:"700px","max-width":"80vw"}},{default:a(()=>[e(_,{class:"text-h5 text-bold text-center"},{default:a(()=>[o(" Nuevo Traspaso ")]),_:1}),e(_,{class:"row items-center"},{default:a(()=>[e(O,{modelValue:s.value._origin,"onUpdate:modelValue":[l[5]||(l[5]=t=>s.value._origin=t),l[6]||(l[6]=t=>s.value._destiny=null)],options:Q.value,label:"Almacen Origen",class:"col","option-label":"name"},null,8,["modelValue","options"]),e(D,{name:"arrow_forward",class:"col",size:"md"}),e(O,{modelValue:s.value._destiny,"onUpdate:modelValue":l[7]||(l[7]=t=>s.value._destiny=t),options:Q.value,label:"Almacen Destino",class:"col","option-label":"name","option-disable":t=>h(t)},null,8,["modelValue","options","option-disable"])]),_:1}),e(_,null,{default:a(()=>[e(K,{modelValue:s.value.notes,"onUpdate:modelValue":l[8]||(l[8]=t=>s.value.notes=t),type:"text",label:"Notas"},null,8,["modelValue"])]),_:1}),e(S,{align:"center"},{default:a(()=>[e(m,{flat:"",label:"Cancelar",color:"negative",onClick:B}),e(m,{flat:"",label:"Crear",color:"positive",onClick:U,disable:!k(N)},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};export{Ye as default};
