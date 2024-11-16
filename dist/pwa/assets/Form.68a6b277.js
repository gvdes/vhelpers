import{Q as p}from"./QInput.dde7a750.js";import{Q as w,a as S,b as h,c as Q}from"./QSelect.cd15c727.js";import{Q as B}from"./QTooltip.a765b273.js";import{j as R,G as A,n as D,aT as N,r as y,c as T,o as i,a as c,w as t,i as s,e as a,ax as I,ay as L,a3 as f,a4 as d,Q as u,h as V,Z as P,g as F,a0 as $,a1 as j,f as E}from"./index.b119c6a8.js";import{d as z,Q as G}from"./deposits.b5867088.js";import{Q as J}from"./QUploader.dd1c6ba8.js";import{Q as K}from"./QForm.c8334444.js";import{Q as M}from"./QPage.fd0afc9e.js";import{u as O}from"./VDB.b53f4f5e.js";import{u as Z}from"./use-quasar.eeb29ad5.js";import"./QCardActions.eb086336.js";import"./QDialog.d51e1757.js";import"./ClosePopup.e8214829.js";import"./jspdf.plugin.autotable.997776c2.js";import"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import{$socket as m}from"./socket.8658b04d.js";import"./use-key-composition.30efdcd7.js";import"./uid.42677368.js";import"./position-engine.09c30a1c.js";import"./rtl.b51694b1.js";import"./axios.ae0a941c.js";import"./axios.f1f32898.js";import"./_commonjsHelpers.88e99c8f.js";var H=R({name:"QUploaderAddTrigger",setup(){const v=D(N,A);return v===A&&console.error("QUploaderAddTrigger needs to be child of QUploader"),v}});const W={class:"flex justify-center"},X={class:"row no-wrap items-center q-pa-sm q-gutter-xs"},Y={class:"col"},ee=s("div",{class:"q-uploader__title"},"Subir Archivo",-1),oe={class:"q-uploader__subtitle"},le={class:"row"},ae={class:"text-overline"},ne={class:"flex justify-center"},qe={__name:"Form",setup(v){const g=O(),_=Z();m.connect(),m.emit("paramscon",g),m.on("Room",n=>{console.log(`Joined room ${n}`)}),m.on("disconnect",()=>{console.log("%c No hay conexion en el socket ","background: #222; color: #bada55")});const x=y([{id:1,name:"0110292745",bank:"BBVA"},{id:2,name:"0110292974",bank:"BBVA"},{id:3,name:"0110292834",bank:"BBVA"},{id:4,name:"0110292761",bank:"BBVA"},{id:5,name:"0110292982",bank:"BBVA"},{id:6,name:"0110293040",bank:"BBVA"},{id:7,name:"0473998967",bank:"BBVA"},{id:8,name:"0110292729",bank:"BBVA"}]),b=y(null),e=y({origin:null,destiny:null,reference:null,concepto:null,amount:null,files:[]}),k=()=>{e.value={origin:null,destiny:null,reference:null,concepto:null,amount:null,files:[]},b.value.reset()},C=T(()=>e.value.origin&&e.value.destiny&&e.value.reference&&e.value.concepto&&e.value.amount&&e.value.files.length>0),U=n=>{e.value.files=n,console.log("Archivos a\xF1adidos:",e.value.files)},q=async()=>{_.loading.show({message:"Enviando Formulario"});const n=new FormData;n.append("origin",e.value.origin),n.append("destiny",e.value.destiny.name),n.append("reference",e.value.reference),n.append("concepto",e.value.concepto),n.append("amount",e.value.amount),n.append("_store",g.session.store.id),n.append("send_by",g.session.name),e.value.files.forEach((o,r)=>{n.append(`file_${r}`,o),console.log(e.value.files)});const l=await z.newForm(n);l.fail?console.log(l):(console.log(l),_.loading.hide(),m.emit("Create",l.insert),_.notify({type:"positive",message:l.message}),k())};return(n,l)=>(i(),c(M,{padding:""},{default:t(()=>[s("div",W,[a(K,{onSubmit:q,onReset:k,class:"q-gutter-md"},{default:t(()=>[a(p,{modelValue:e.value.origin,"onUpdate:modelValue":l[0]||(l[0]=o=>e.value.origin=o),type:"number",label:"Cuenta Origen",filled:"",dense:""},null,8,["modelValue"]),a(w,{modelValue:e.value.destiny,"onUpdate:modelValue":l[1]||(l[1]=o=>e.value.destiny=o),options:x.value,label:"Cuenta Destino",filled:"",dense:"","option-label":"name","option-value":"name"},{option:t(o=>[a(S,I(L(o.itemProps)),{default:t(()=>[a(h,null,{default:t(()=>[a(Q,null,{default:t(()=>[f(d(o.opt.name),1)]),_:2},1024),a(Q,{caption:""},{default:t(()=>[f(d(o.opt.bank),1)]),_:2},1024)]),_:2},1024)]),_:2},1040)]),_:1},8,["modelValue","options"]),a(p,{modelValue:e.value.concepto,"onUpdate:modelValue":l[2]||(l[2]=o=>e.value.concepto=o),type:"text",label:"Referencia",filled:"",dense:""},null,8,["modelValue"]),a(p,{modelValue:e.value.reference,"onUpdate:modelValue":l[3]||(l[3]=o=>e.value.reference=o),type:"number",label:"Referencia Numerica / Folio",filled:"",dense:""},null,8,["modelValue"]),a(p,{modelValue:e.value.amount,"onUpdate:modelValue":l[4]||(l[4]=o=>e.value.amount=o),type:"number",label:"Monto",filled:"",dense:""},null,8,["modelValue"]),a(J,{modelValue:e.value.files,"onUpdate:modelValue":l[6]||(l[6]=o=>e.value.files=o),accept:"image/*","auto-upload":!1,onAdded:U,ref_key:"refe",ref:b},{header:t(o=>[s("div",X,[o.queuedFiles.length>0?(i(),c(u,{key:0,icon:"clear_all",onClick:l[5]||(l[5]=()=>{b.value.reset(),e.value.files=[]}),round:"",dense:"",flat:""},{default:t(()=>[a(B,null,{default:t(()=>[f("Limpiar")]),_:1})]),_:1})):V("",!0),o.isUploading?(i(),c(P,{key:1,class:"q-uploader__spinner"})):V("",!0),s("div",Y,[ee,s("div",oe,d(o.uploadSizeLabel)+" / "+d(o.uploadProgressLabel),1)]),o.canAddFiles?(i(),c(u,{key:2,type:"a",icon:"add_box",onClick:o.pickFiles,round:"",dense:"",flat:""},{default:t(()=>[a(H),a(B,null,{default:t(()=>[f("Subir Archivo")]),_:1})]),_:2},1032,["onClick"])):V("",!0)])]),list:t(o=>[(i(!0),F(j,null,$(o.files,r=>(i(),F("div",{key:r.__key},[s("div",le,[a(G,{src:r.__img.src,ratio:20/8,"spinner-color":"primary","spinner-size":"82px",class:"col"},null,8,["src"]),a(u,{color:"negative",icon:"delete",onClick:()=>{o.removeFile(r),e.value.files=[]},flat:"",rounded:""},null,8,["onClick"])]),s("div",ae,d(r.name),1)]))),128))]),_:1},8,["modelValue"]),s("div",ne,[a(u,{label:"Cancelar",type:"reset",color:"primary",flat:"",class:"q-ml-sm"}),a(u,{label:"Enviar",type:"submit",color:"primary",flat:"",disable:!E(C)},null,8,["disable"])])]),_:1})])]),_:1}))}};export{qe as default};