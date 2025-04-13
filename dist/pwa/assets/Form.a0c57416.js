import{Q as p}from"./QInput.f4aaafa9.js";import{Q as w,a as S,b as R,c as Q}from"./QSelect.711403d0.js";import{Q as B}from"./QTooltip.51f539fc.js";import{i as D,m as N,F as A,aT as T,r as V,c as I,o as i,a as c,w as t,f as s,e as a,ay as L,az as P,a4 as f,a5 as d,Q as u,h as _,Z as $,g as F,a1 as z,a2 as E}from"./index.54d447e3.js";import{d as j,Q as h}from"./deposits.2d20494c.js";import{Q as J}from"./QUploader.1e9d4073.js";import{Q as K}from"./QForm.cff053ef.js";import{Q as M}from"./QPage.2bae49fe.js";import{u as O}from"./VDB.cb7932a0.js";import{u as Z}from"./use-quasar.e7b3e98f.js";import"./QCardActions.4ba469fb.js";import"./QDialog.711949b7.js";import"./ClosePopup.5a0721b4.js";import"./jspdf.plugin.autotable.57a91780.js";import"./exceljs.min.9e24d01d.js";import"./browser.a927a609.js";import{$socket as m}from"./socket.e8679fa2.js";import"./use-key-composition.eac0cc74.js";import"./uid.937d8ee7.js";import"./position-engine.b9957c85.js";import"./rtl.276c3f1b.js";import"./axios.ba7b1b0e.js";import"./axios.9ab26c22.js";import"./_commonjsHelpers.88e99c8f.js";var G=D({name:"QUploaderAddTrigger",setup(){const v=N(T,A);return v===A&&console.error("QUploaderAddTrigger needs to be child of QUploader"),v}});const H={class:"flex justify-center"},W={class:"row no-wrap items-center q-pa-sm q-gutter-xs"},X={class:"col"},Y={class:"q-uploader__subtitle"},ee={class:"row"},oe={class:"text-overline"},le={class:"flex justify-center"},Ce={__name:"Form",setup(v){const g=O(),b=Z();m.connect(),m.emit("paramscon",g),m.on("Room",n=>{console.log(`Joined room ${n}`)}),m.on("disconnect",()=>{console.log("%c No hay conexion en el socket ","background: #222; color: #bada55")});const x=V([{id:1,name:"0110292745",bank:"BBVA"},{id:2,name:"0110292974",bank:"BBVA"},{id:3,name:"0110292834",bank:"BBVA"},{id:4,name:"0110292761",bank:"BBVA"},{id:5,name:"0110292982",bank:"BBVA"},{id:6,name:"0110293040",bank:"BBVA"},{id:7,name:"0473998967",bank:"BBVA"},{id:8,name:"0110292729",bank:"BBVA"}]),y=V(null),e=V({origin:null,destiny:null,reference:null,concepto:null,amount:null,files:[]}),k=()=>{e.value={origin:null,destiny:null,reference:null,concepto:null,amount:null,files:[]},y.value.reset()},C=I(()=>e.value.origin&&e.value.destiny&&e.value.reference&&e.value.concepto&&e.value.amount&&e.value.files.length>0),U=n=>{e.value.files=n,console.log("Archivos a\xF1adidos:",e.value.files)},q=async()=>{b.loading.show({message:"Enviando Formulario"});const n=new FormData;n.append("origin",e.value.origin),n.append("destiny",e.value.destiny.name),n.append("reference",e.value.reference),n.append("concepto",e.value.concepto),n.append("amount",e.value.amount),n.append("_store",g.session.store.id),n.append("send_by",g.session.name),e.value.files.forEach((o,r)=>{n.append(`file_${r}`,o),console.log(e.value.files)});const l=await j.newForm(n);l.fail?console.log(l):(console.log(l),b.loading.hide(),m.emit("Create",l.insert),b.notify({type:"positive",message:l.message}),k())};return(n,l)=>(i(),c(M,{padding:""},{default:t(()=>[s("div",H,[a(K,{onSubmit:q,onReset:k,class:"q-gutter-md"},{default:t(()=>[a(p,{modelValue:e.value.origin,"onUpdate:modelValue":l[0]||(l[0]=o=>e.value.origin=o),type:"number",label:"Cuenta Origen",filled:"",dense:""},null,8,["modelValue"]),a(w,{modelValue:e.value.destiny,"onUpdate:modelValue":l[1]||(l[1]=o=>e.value.destiny=o),options:x.value,label:"Cuenta Destino",filled:"",dense:"","option-label":"name","option-value":"name"},{option:t(o=>[a(S,L(P(o.itemProps)),{default:t(()=>[a(R,null,{default:t(()=>[a(Q,null,{default:t(()=>[f(d(o.opt.name),1)]),_:2},1024),a(Q,{caption:""},{default:t(()=>[f(d(o.opt.bank),1)]),_:2},1024)]),_:2},1024)]),_:2},1040)]),_:1},8,["modelValue","options"]),a(p,{modelValue:e.value.concepto,"onUpdate:modelValue":l[2]||(l[2]=o=>e.value.concepto=o),type:"text",label:"Referencia",filled:"",dense:""},null,8,["modelValue"]),a(p,{modelValue:e.value.reference,"onUpdate:modelValue":l[3]||(l[3]=o=>e.value.reference=o),type:"number",label:"Referencia Numerica / Folio",filled:"",dense:""},null,8,["modelValue"]),a(p,{modelValue:e.value.amount,"onUpdate:modelValue":l[4]||(l[4]=o=>e.value.amount=o),type:"number",label:"Monto",filled:"",dense:""},null,8,["modelValue"]),a(J,{modelValue:e.value.files,"onUpdate:modelValue":l[6]||(l[6]=o=>e.value.files=o),accept:"image/*","auto-upload":!1,onAdded:U,ref_key:"refe",ref:y},{header:t(o=>[s("div",W,[o.queuedFiles.length>0?(i(),c(u,{key:0,icon:"clear_all",onClick:l[5]||(l[5]=()=>{y.value.reset(),e.value.files=[]}),round:"",dense:"",flat:""},{default:t(()=>[a(B,null,{default:t(()=>l[7]||(l[7]=[f("Limpiar")])),_:1})]),_:1})):_("",!0),o.isUploading?(i(),c($,{key:1,class:"q-uploader__spinner"})):_("",!0),s("div",X,[l[8]||(l[8]=s("div",{class:"q-uploader__title"},"Subir Archivo",-1)),s("div",Y,d(o.uploadSizeLabel)+" / "+d(o.uploadProgressLabel),1)]),o.canAddFiles?(i(),c(u,{key:2,type:"a",icon:"add_box",onClick:o.pickFiles,round:"",dense:"",flat:""},{default:t(()=>[a(G),a(B,null,{default:t(()=>l[9]||(l[9]=[f("Subir Archivo")])),_:1})]),_:2},1032,["onClick"])):_("",!0)])]),list:t(o=>[(i(!0),F(E,null,z(o.files,r=>(i(),F("div",{key:r.__key},[s("div",ee,[a(h,{src:r.__img.src,ratio:20/8,"spinner-color":"primary","spinner-size":"82px",class:"col"},null,8,["src"]),a(u,{color:"negative",icon:"delete",onClick:()=>{o.removeFile(r),e.value.files=[]},flat:"",rounded:""},null,8,["onClick"])]),s("div",oe,d(r.name),1)]))),128))]),_:1},8,["modelValue"]),s("div",le,[a(u,{label:"Cancelar",type:"reset",color:"primary",flat:"",class:"q-ml-sm"}),a(u,{label:"Enviar",type:"submit",color:"primary",flat:"",disable:!C.value},null,8,["disable"])])]),_:1})])]),_:1}))}};export{Ce as default};
