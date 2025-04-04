import{Q as V}from"./QSeparator.627f718e.js";import{u as H,r as p,c as k,o as b,a as _,w as o,e as l,f,a4 as a,Y as T,Q as v,g as M,a1 as P,a2 as z,a3 as G,a5 as d,a0 as W,a7 as J}from"./index.92c83eab.js";import{Q as K}from"./QHeader.c9c3ae99.js";import{a as A,b as i,Q as O}from"./QSelect.8c4bde3e.js";import{Q as $}from"./QList.aad1889c.js";import{Q as X}from"./QDate.c97f2964.js";import{u as Z,Q as S,a as x}from"./use-quasar.62c1b70a.js";import{Q as I}from"./QCardActions.8058976b.js";import{Q as N}from"./QDialog.961426f9.js";import{Q as h}from"./QInput.83ffcb1a.js";import{Q as ee}from"./QPage.abb034bb.js";import{u as le}from"./VDB.a2407df2.js";import"./jspdf.plugin.autotable.5586d361.js";import{t as w}from"./transferApi.ce8ac4e5.js";import"./exceljs.min.9e24d01d.js";import"./browser.a927a609.js";import{d as te}from"./dayjs.min.cbcf888d.js";import{_ as oe}from"./UserToolbar.30548fee.js";import"./QResizeObserver.621faa2c.js";import"./use-key-composition.4a6272e0.js";import"./uid.937d8ee7.js";import"./position-engine.cf0d1de7.js";import"./rtl.276c3f1b.js";import"./use-render-cache.3aae9b27.js";import"./date.60ba1004.js";import"./_commonjsHelpers.88e99c8f.js";import"./axios.a3aaf9bc.js";import"./axios.9ab26c22.js";import"./ClosePopup.c94359a4.js";const se={class:"row justify-between"},ae={class:"q-pa-md"},Ee={__name:"Index",setup(ne){const C=H(),u=le(),r=Z(),m=p(!1),c=p(null),g=p(!1),Q=p([]),y=p([]),n=p({_origin:null,_destiny:null,notes:null}),R=k(()=>n.value._origin&&n.value._destiny&&n.value.notes),D=k(()=>u.session.rol!=="alm"?y.value.filter(s=>[1,2,3,4].includes(s.id)):y.value.filter(s=>[5,6].includes(s.id))),U=async()=>{console.log("Recibiendo Datos :)"),r.loading.show({message:"Obteniendo Datos"});let s=u.session.store.id;const e=await w.index(s);e.error?console.log(e):(console.log(e),Q.value=e.transfer,y.value=e.warehouses,r.loading.hide())},B=async()=>{r.loading.show({message:"Creando Traspaso"}),n.value.created_by=u.session.name,n.value._store=u.session.store.id,console.log(n.value);const s=await w.addTransfer(n.value);s.error?(console.log(s),r.notify({message:"No se logro crear el traspaso",position:"center",type:"negative"})):(r.loading.hide(),r.notify({message:`Traspaso ${s.code_fs} creada`,position:"center",type:"positive"}),C.push(`transfers/${s.id}`))},E=()=>{g.value=!1,n.value={_origin:null,_destiny:null,notes:null}},Y=s=>s.id===n.value._origin.id||u.session.rol!=="aud"&&s.id===4,L=s=>(console.log(s),u.session.rol!="aud"&&s.id==4),q=async()=>{console.log(c.value),r.loading.show({message:"Obteniendo Datos"});let e={store:u.session.store.id,date:c.value};console.log("Recibiendo Datos :)");const t=await w.getDate(e);t.fail?console.log(t):(console.log(t),Q.value=t,r.loading.hide(),c.value=null,m.value=!1)},j=s=>{C.push(`transfers/${s}`)};return U(),(s,e)=>(b(),_(ee,{padding:""},{default:o(()=>[l(K,{class:"transparent text-dark",bordered:""},{default:o(()=>[l(oe),l(V),f("div",se,[f("div",null,[e[10]||(e[10]=a("Helpers ")),l(T,{name:"navigate_next",color:"primary"}),e[11]||(e[11]=a()),e[12]||(e[12]=f("span",{class:"text-h6"},"Traspasos entre Almacenes",-1))]),f("div",null,[l(v,{color:"primary",icon:"add",flat:"",onClick:e[0]||(e[0]=t=>g.value=!g.value),round:""}),l(v,{color:"primary",icon:"event",onClick:e[1]||(e[1]=t=>m.value=!m.value),flat:"",round:""})])]),l(V)]),_:1}),l($,null,{default:o(()=>[l(A,null,{default:o(()=>[l(i,{class:"text-center"},{default:o(()=>e[13]||(e[13]=[a("ID")])),_:1}),l(i,{class:"text-center"},{default:o(()=>e[14]||(e[14]=[a("CREADO")])),_:1}),l(i,{class:"text-center"},{default:o(()=>e[15]||(e[15]=[a("CREADO POR")])),_:1}),l(i,{class:"text-center"},{default:o(()=>e[16]||(e[16]=[a("NOTAS")])),_:1}),l(i,{class:"text-center"},{default:o(()=>e[17]||(e[17]=[a("ORIGEN")])),_:1}),l(i,{class:"text-center"},{default:o(()=>e[18]||(e[18]=[a("DESTINO")])),_:1}),l(i,{class:"text-center"},{default:o(()=>e[19]||(e[19]=[a("FACTUSOL")])),_:1}),l(i,{class:"text-center"},{default:o(()=>e[20]||(e[20]=[a("ARTICULOS")])),_:1})]),_:1})]),_:1}),l(V,{spaced:"",inset:"",vertical:"",dark:""}),(b(!0),M(z,null,P(Q.value,(t,F)=>(b(),_($,{bordered:"",key:F},{default:o(()=>[G((b(),_(A,{clickable:"",onClick:ie=>j(t.id)},{default:o(()=>[l(i,{class:"text-center"},{default:o(()=>[a(d(t.id),1)]),_:2},1024),l(i,{class:"text-center"},{default:o(()=>[a(d(W(te)(t.created_at).format("YYYY-MM-D")),1)]),_:2},1024),l(i,{class:"text-center"},{default:o(()=>[a(d(t.created_by),1)]),_:2},1024),l(i,{class:"text-center"},{default:o(()=>[a(d(t.notes),1)]),_:2},1024),l(i,{class:"text-center"},{default:o(()=>[a(d(t.origin.alias),1)]),_:2},1024),l(i,{class:"text-center"},{default:o(()=>[a(d(t.destiny.alias),1)]),_:2},1024),l(i,{class:"text-center"},{default:o(()=>[a(d(t.code_fs),1)]),_:2},1024),l(i,{class:"text-center"},{default:o(()=>[a(d(t.bodie.length),1)]),_:2},1024)]),_:2},1032,["onClick"])),[[J]])]),_:2},1024))),128)),l(N,{modelValue:m.value,"onUpdate:modelValue":e[4]||(e[4]=t=>m.value=t)},{default:o(()=>[l(S,{class:"my-card"},{default:o(()=>[l(x,null,{default:o(()=>[f("div",ae,[e[21]||(e[21]=f("div",{class:"q-pb-sm"},null,-1)),l(X,{modelValue:c.value,"onUpdate:modelValue":e[2]||(e[2]=t=>c.value=t),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),l(x,null,{default:o(()=>[l(I,{align:"right"},{default:o(()=>[l(v,{flat:"",icon:"close",color:"negative",onClick:e[3]||(e[3]=t=>m.value=!m.value)}),l(v,{flat:"",icon:"check",color:"positive",onClick:q})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(N,{modelValue:g.value,"onUpdate:modelValue":e[9]||(e[9]=t=>g.value=t),persistent:""},{default:o(()=>[l(S,{style:{width:"700px","max-width":"80vw"}},{default:o(()=>[l(x,{class:"text-h5 text-bold text-center"},{default:o(()=>e[22]||(e[22]=[a(" Nuevo Traspaso ")])),_:1}),l(x,{class:"row items-center"},{default:o(()=>[l(O,{modelValue:n.value._origin,"onUpdate:modelValue":[e[5]||(e[5]=t=>n.value._origin=t),e[6]||(e[6]=t=>n.value._destiny=null)],options:D.value,label:"Almacen Origen",class:"col","option-label":"name","option-disable":t=>L(t)},null,8,["modelValue","options","option-disable"]),l(T,{name:"arrow_forward",class:"col",size:"md"}),l(O,{modelValue:n.value._destiny,"onUpdate:modelValue":e[7]||(e[7]=t=>n.value._destiny=t),options:D.value,label:"Almacen Destino",class:"col","option-label":"name","option-disable":t=>Y(t),disable:n.value._origin==null},null,8,["modelValue","options","option-disable","disable"])]),_:1}),l(x,null,{default:o(()=>[l(h,{modelValue:n.value.notes,"onUpdate:modelValue":e[8]||(e[8]=t=>n.value.notes=t),type:"text",label:"Notas"},null,8,["modelValue"])]),_:1}),l(I,{align:"center"},{default:o(()=>[l(v,{flat:"",label:"Cancelar",color:"negative",onClick:E}),l(v,{flat:"",label:"Crear",color:"positive",onClick:B,disable:!R.value},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};export{Ee as default};
