import{Q as x}from"./QSeparator.1c73cca5.js";import{r as f,c as R,o as c,a as S,w as o,e as a,f as d,a4 as k,Y as F,g as y,h as b,Q as B}from"./index.54d447e3.js";import{Q as T}from"./QToolbar.eb82c9cb.js";import{Q as H}from"./QHeader.781663ae.js";import{u as O,Q as I,a as u}from"./use-quasar.e7b3e98f.js";import{Q as g}from"./QSelect.711403d0.js";import{Q as i}from"./QInput.f4aaafa9.js";import{Q as L}from"./QUploader.1e9d4073.js";import{Q as P}from"./QForm.cff053ef.js";import{Q as Y}from"./QPage.2bae49fe.js";import{Q as J,a as z}from"./QLayout.bc7b9374.js";import{u as G}from"./VDB.cb7932a0.js";import{_ as K}from"./UserToolbar.39f31d3c.js";import{a as D}from"./axios.ba7b1b0e.js";import{a as $}from"./axios.9ab26c22.js";import"./QResizeObserver.eb637c66.js";import"./use-key-composition.eac0cc74.js";import"./uid.937d8ee7.js";import"./position-engine.b9957c85.js";import"./QDialog.711949b7.js";import"./rtl.276c3f1b.js";import"./QCardActions.4ba469fb.js";import"./ClosePopup.5a0721b4.js";const W={class:"flex justify-center"},X={key:0},Z={key:1},ee={key:2},le={key:0},ae={class:"col flex justify-center"},$e={__name:"OpenLayout",setup(te){const s=G(),p=O(),V=f(null),h=f({val:null,opts:[]}),C=[{id:1,label:"Descuadre"},{id:2,label:"Mal Devolucion"},{id:3,label:"Retirada Mal"}],M=[{id:1,label:"Eliminar"},{id:2,label:"Modificar"}],Q=f({val:null,opts:null}),e=f({_store:null,cash:null,_created_by:null,_cashier:null,_type:{id:0,label:"Ninguno"},unsquare:null,mismatch_reason:null,current_cut:null,ticket:null,refund_ticket:null,refund_reason:null,withdrawal_number:null,movement_type_id:{id:0,label:"Ninguno"},reason_modify:null,withdrawal_mount:null}),U=R(()=>e.value._type.id==1&&e.value.cash&&e.value._cashier&&e.value.unsquare&&e.value.mismatch_reason&&e.value.current_cut||e.value._type.id==2&&e.value.cash&&e.value._cashier&&e.value.ticket&&e.value.refund_reason&&e.value.current_cut?!1:!(e.value._type.id==3&&e.value.cash&&e.value._cashier&&e.value.current_cut&&e.value.withdrawal_number&&e.value.movement_type_id.id!=0&&e.value.reason_modify)),w=async()=>{let n=s.session.store.id;console.log(n),D.get(`/cashier/getStaff/${n}`).then(l=>{console.log(l.data),Q.value.opts=l.data})},E=async()=>{let l=`http://${s.session.store.ip}/access/public/modify/getCash`;$.get(l).then(t=>{console.log(t.data),h.value.opts=t.data}).catch(t=>{console.log(t)})},N=()=>{V.value.upload()},A=async()=>{let n=e.value._cashier.id,l=e.value._type.id,t=e.value.movement_type_id.id!=0?e.value.movement_type_id.id:null;e.value.movement_type_id=t,e.value._type=l,e.value._cashier=n,e.value._store=s.session.store.id,e.value._created_by=s.session.id,e.value.cash=e.value.cash.CODTER,console.log(e.value);let r=new Date;const _=`${r.getFullYear()}_${r.getMonth()+1}_${r.getDate()}_${r.getHours()}${r.getMinutes()}${r.getSeconds()}`;let m="/corte"+_+"_"+e.value._store+"_"+e.value._created_by+".jpg";e.value.current_cut=m,N(),console.log(e.value),D.post("/cashier/Opening",e.value).then(v=>{console.log(v.data),p.notify({type:"positive",message:v.data,position:"center"}),e.value.cash=null,e.value._cashier=null,e.value._type={id:0,label:"Ninguno"},e.value.unsquare=null,e.value.mismatch_reason=null,e.value.current_cut=null,e.value.ticket=null,e.value.refund_ticket=null,e.value.refund_reason=null,e.value.withdrawal_number=null,e.value.movement_type_id={id:0,label:"Ninguno"},e.value.reason_modify=null,e.value.withdrawal_mount=null}).catch(v=>{console.log(v.data),p.notify({type:"negative",message:v.data,position:"center"})})},q=()=>{e.value.current_cut=!0},j=n=>{console.log(n);const l=new FormData;l.append("files",n[0]);let t=new Date;const r=`${t.getFullYear()}_${t.getMonth()+1}_${t.getDate()}_${t.getHours()}${t.getMinutes()}${t.getSeconds()}`;let _="corte"+r+"_"+e.value._store+"_"+e.value._created_by;return console.log(_),l.append("__key",_+".jpg"),console.log(l),$.post("http://192.168.10.238:2902/Assist/public/api/cashier/AddFile",l).then(m=>{console.log(m.data),V.value.reset(),p.notify({type:"positive",message:"Imagen se subio con exito :"+m.data,position:"center"})}).catch(m=>{console.error("Error al subir archivos:",m),p.notify({type:"negative",message:"(I)Error al subir archivo:"+response.data,position:"center"})}),"http://192.168.10.238:2902/Assist/public/api/cashier/AddFile"};return s.session.rol=="aux"||s.session.rol=="gen"||s.session.rol=="aud"||s.session.rol=="root"?w():(p.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),w(),E(),(n,l)=>(c(),S(J,{view:"hHh Lpr fFf"},{default:o(()=>[a(H,{class:"transparent text-dark",bordered:""},{default:o(()=>[a(K),a(x),a(T,{class:"justify-between"},{default:o(()=>[d("div",null,[l[12]||(l[12]=k("Helpers ")),a(F,{name:"navigate_next",color:"primary"}),l[13]||(l[13]=k()),l[14]||(l[14]=d("span",{class:"text-h6"},"Apertura de Cajas",-1))])]),_:1})]),_:1}),a(x,{spaced:"",inset:"",vertical:"",dark:""}),a(z,null,{default:o(()=>[a(Y,null,{default:o(()=>[d("div",W,[a(P,{class:"q-gutter-md",onSubmit:A},{default:o(()=>[a(I,{class:"my-card",square:"",bordere:""},{default:o(()=>[a(u,null,{default:o(()=>l[15]||(l[15]=[d("div",{class:"text-h4 text-center"},"APERTURA DE CAJA",-1),d("div",{class:"text-subtitle2 text-center"},"Movimientos en cajas despues de el corte",-1)])),_:1}),a(u,null,{default:o(()=>[a(g,{modelValue:e.value.cash,"onUpdate:modelValue":l[0]||(l[0]=t=>e.value.cash=t),options:h.value.opts,label:"Caja","option-label":"DESTER","option-value":"CODTER",outlined:"",dense:""},null,8,["modelValue","options"])]),_:1}),a(u,null,{default:o(()=>[a(g,{modelValue:e.value._cashier,"onUpdate:modelValue":l[1]||(l[1]=t=>e.value._cashier=t),options:Q.value.opts,label:"Cajero","option-label":"complete_name",outlined:"",dense:""},null,8,["modelValue","options"])]),_:1}),a(u,null,{default:o(()=>[a(g,{modelValue:e.value._type,"onUpdate:modelValue":l[2]||(l[2]=t=>e.value._type=t),options:C,label:"Motivo",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),e.value._type.label=="Descuadre"?(c(),y("div",X,[a(u,null,{default:o(()=>[a(i,{modelValue:e.value.unsquare,"onUpdate:modelValue":l[3]||(l[3]=t=>e.value.unsquare=t),type:"Number",label:"Monto de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),a(u,null,{default:o(()=>[a(i,{modelValue:e.value.mismatch_reason,"onUpdate:modelValue":l[4]||(l[4]=t=>e.value.mismatch_reason=t),type:"text",label:"Motivo de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):b("",!0),e.value._type.label=="Mal Devolucion"?(c(),y("div",Z,[a(u,null,{default:o(()=>[a(i,{modelValue:e.value.ticket,"onUpdate:modelValue":l[5]||(l[5]=t=>e.value.ticket=t),type:"text",label:"Cual es el numero de ticket original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),a(u,null,{default:o(()=>[a(i,{modelValue:e.value.refund_ticket,"onUpdate:modelValue":l[6]||(l[6]=t=>e.value.refund_ticket=t),type:"text",label:"Cual es el numero de devolucion original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),a(u,null,{default:o(()=>[a(i,{modelValue:e.value.refund_reason,"onUpdate:modelValue":l[7]||(l[7]=t=>e.value.refund_reason=t),type:"text",label:"Especifica por que se creara una devolucion nueva",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):b("",!0),e.value._type.label=="Retirada Mal"?(c(),y("div",ee,[a(u,null,{default:o(()=>[a(i,{modelValue:e.value.withdrawal_number,"onUpdate:modelValue":l[8]||(l[8]=t=>e.value.withdrawal_number=t),type:"Number",label:"Numero de retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),a(u,null,{default:o(()=>[a(g,{modelValue:e.value.movement_type_id,"onUpdate:modelValue":l[9]||(l[9]=t=>e.value.movement_type_id=t),options:M,label:"Que se la hara?",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),e.value.movement_type_id.label=="Modificar"?(c(),y("div",le,[a(u,null,{default:o(()=>[a(i,{modelValue:e.value.withdrawal_mount,"onUpdate:modelValue":l[10]||(l[10]=t=>e.value.withdrawal_mount=t),type:"Number",label:"Monto a modificar",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):b("",!0),a(u,null,{default:o(()=>[a(i,{modelValue:e.value.reason_modify,"onUpdate:modelValue":l[11]||(l[11]=t=>e.value.reason_modify=t),type:"text",label:"Especifica por que el cambio de la retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):b("",!0),a(u,null,{default:o(()=>[d("div",ae,[a(L,{"hide-upload-btn":!0,ref_key:"uploaderRef",ref:V,url:j,color:"primary",label:"Corte Actual",onAdded:q},null,512)])]),_:1})]),_:1}),d("div",null,[a(B,{label:"Enviar",type:"submit",color:"primary",class:"full-width",disable:U.value},null,8,["disable"])])]),_:1})])]),_:1})]),_:1})]),_:1}))}};export{$e as default};
