import{Q as x}from"./QSeparator.9b22600b.js";import{r as f,c as R,o as v,a as S,w as o,e as l,i as d,a3 as k,Y as F,g as y,h as b,Q as B,f as T}from"./index.6553c4a3.js";import{Q as H}from"./QToolbar.b4a2aaab.js";import{Q as O}from"./QHeader.e3c4603e.js";import{u as I,Q as L,a as u}from"./use-quasar.2618ef58.js";import{Q as g}from"./QSelect.1376d70e.js";import{Q as i}from"./QInput.9cc45321.js";import{Q as P}from"./QUploader.88ebb98c.js";import{Q as Y}from"./QForm.17d476a6.js";import{Q as J}from"./QPage.fecb4179.js";import{Q as z,a as G}from"./QLayout.b7211c56.js";import{u as K}from"./VDB.a74ead22.js";import{_ as W}from"./UserToolbar.38961c8d.js";import{a as D}from"./axios.30672b3a.js";import{a as $}from"./axios.f1f32898.js";import"./QResizeObserver.718ce7c7.js";import"./use-key-composition.a57e001a.js";import"./uid.42677368.js";import"./position-engine.3f787d31.js";import"./QDialog.03672914.js";import"./rtl.b51694b1.js";import"./QCardActions.b485e075.js";import"./ClosePopup.d20223ef.js";const X=d("span",{class:"text-h6"},"Apertura de Cajas",-1),Z={class:"flex justify-center"},ee=d("div",{class:"text-h4 text-center"},"APERTURA DE CAJA",-1),le=d("div",{class:"text-subtitle2 text-center"},"Movimientos en cajas despues de el corte",-1),ae={key:0},te={key:1},oe={key:2},ue={key:0},ne={class:"col flex justify-center"},Ee={__name:"OpenLayout",setup(se){const s=K(),p=I(),h=f(null),V=f({val:null,opts:[]}),C=[{id:1,label:"Descuadre"},{id:2,label:"Mal Devolucion"},{id:3,label:"Retirada Mal"}],M=[{id:1,label:"Eliminar"},{id:2,label:"Modificar"}],Q=f({val:null,opts:null}),e=f({_store:null,cash:null,_created_by:null,_cashier:null,_type:{id:0,label:"Ninguno"},unsquare:null,mismatch_reason:null,current_cut:null,ticket:null,refund_ticket:null,refund_reason:null,withdrawal_number:null,movement_type_id:{id:0,label:"Ninguno"},reason_modify:null,withdrawal_mount:null}),U=R(()=>e.value._type.id==1&&e.value.cash&&e.value._cashier&&e.value.unsquare&&e.value.mismatch_reason&&e.value.current_cut||e.value._type.id==2&&e.value.cash&&e.value._cashier&&e.value.ticket&&e.value.refund_reason&&e.value.current_cut?!1:!(e.value._type.id==3&&e.value.cash&&e.value._cashier&&e.value.current_cut&&e.value.withdrawal_number&&e.value.movement_type_id.id!=0&&e.value.reason_modify)),w=async()=>{let n=s.session.store.id;console.log(n),D.get(`/cashier/getStaff/${n}`).then(t=>{console.log(t.data),Q.value.opts=t.data})},E=async()=>{let t=`http://${s.session.store.ip}/access/public/modify/getCash`;$.get(t).then(a=>{console.log(a.data),V.value.opts=a.data}).catch(a=>{console.log(a)})},N=()=>{h.value.upload()},A=async()=>{let n=e.value._cashier.id,t=e.value._type.id,a=e.value.movement_type_id.id!=0?e.value.movement_type_id.id:null;e.value.movement_type_id=a,e.value._type=t,e.value._cashier=n,e.value._store=s.session.store.id,e.value._created_by=s.session.id,e.value.cash=e.value.cash.CODTER,console.log(e.value);let r=new Date;const _=`${r.getFullYear()}_${r.getMonth()+1}_${r.getDate()}_${r.getHours()}${r.getMinutes()}${r.getSeconds()}`;let m="/corte"+_+"_"+e.value._store+"_"+e.value._created_by+".jpg";e.value.current_cut=m,N(),console.log(e.value),D.post("/cashier/Opening",e.value).then(c=>{console.log(c.data),p.notify({type:"positive",message:c.data,position:"center"}),e.value.cash=null,e.value._cashier=null,e.value._type={id:0,label:"Ninguno"},e.value.unsquare=null,e.value.mismatch_reason=null,e.value.current_cut=null,e.value.ticket=null,e.value.refund_ticket=null,e.value.refund_reason=null,e.value.withdrawal_number=null,e.value.movement_type_id={id:0,label:"Ninguno"},e.value.reason_modify=null,e.value.withdrawal_mount=null}).catch(c=>{console.log(c.data),p.notify({type:"negative",message:c.data,position:"center"})})},q=()=>{e.value.current_cut=!0},j=n=>{console.log(n);const t=new FormData;t.append("files",n[0]);let a=new Date;const r=`${a.getFullYear()}_${a.getMonth()+1}_${a.getDate()}_${a.getHours()}${a.getMinutes()}${a.getSeconds()}`;let _="corte"+r+"_"+e.value._store+"_"+e.value._created_by;return console.log(_),t.append("__key",_+".jpg"),console.log(t),$.post("http://192.168.10.238:2902/Assist/public/api/cashier/AddFile",t).then(m=>{console.log(m.data),h.value.reset(),p.notify({type:"positive",message:"Imagen se subio con exito :"+m.data,position:"center"})}).catch(m=>{console.error("Error al subir archivos:",m),p.notify({type:"negative",message:"(I)Error al subir archivo:"+response.data,position:"center"})}),"http://192.168.10.238:2902/Assist/public/api/cashier/AddFile"};return s.session.rol=="aux"||s.session.rol=="gen"||s.session.rol=="aud"||s.session.rol=="root"?w():(p.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),w(),E(),(n,t)=>(v(),S(z,{view:"hHh Lpr fFf"},{default:o(()=>[l(O,{class:"transparent text-dark",bordered:""},{default:o(()=>[l(W),l(x),l(H,{class:"justify-between"},{default:o(()=>[d("div",null,[k("Helpers "),l(F,{name:"navigate_next",color:"primary"}),k(),X])]),_:1})]),_:1}),l(x,{spaced:"",inset:"",vertical:"",dark:""}),l(G,null,{default:o(()=>[l(J,null,{default:o(()=>[d("div",Z,[l(Y,{class:"q-gutter-md",onSubmit:A},{default:o(()=>[l(L,{class:"my-card",square:"",bordere:""},{default:o(()=>[l(u,null,{default:o(()=>[ee,le]),_:1}),l(u,null,{default:o(()=>[l(g,{modelValue:e.value.cash,"onUpdate:modelValue":t[0]||(t[0]=a=>e.value.cash=a),options:V.value.opts,label:"Caja","option-label":"DESTER","option-value":"CODTER",outlined:"",dense:""},null,8,["modelValue","options"])]),_:1}),l(u,null,{default:o(()=>[l(g,{modelValue:e.value._cashier,"onUpdate:modelValue":t[1]||(t[1]=a=>e.value._cashier=a),options:Q.value.opts,label:"Cajero","option-label":"complete_name",outlined:"",dense:""},null,8,["modelValue","options"])]),_:1}),l(u,null,{default:o(()=>[l(g,{modelValue:e.value._type,"onUpdate:modelValue":t[2]||(t[2]=a=>e.value._type=a),options:C,label:"Motivo",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),e.value._type.label=="Descuadre"?(v(),y("div",ae,[l(u,null,{default:o(()=>[l(i,{modelValue:e.value.unsquare,"onUpdate:modelValue":t[3]||(t[3]=a=>e.value.unsquare=a),type:"Number",label:"Monto de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(i,{modelValue:e.value.mismatch_reason,"onUpdate:modelValue":t[4]||(t[4]=a=>e.value.mismatch_reason=a),type:"text",label:"Motivo de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):b("",!0),e.value._type.label=="Mal Devolucion"?(v(),y("div",te,[l(u,null,{default:o(()=>[l(i,{modelValue:e.value.ticket,"onUpdate:modelValue":t[5]||(t[5]=a=>e.value.ticket=a),type:"text",label:"Cual es el numero de ticket original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(i,{modelValue:e.value.refund_ticket,"onUpdate:modelValue":t[6]||(t[6]=a=>e.value.refund_ticket=a),type:"text",label:"Cual es el numero de devolucion original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(i,{modelValue:e.value.refund_reason,"onUpdate:modelValue":t[7]||(t[7]=a=>e.value.refund_reason=a),type:"text",label:"Especifica por que se creara una devolucion nueva",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):b("",!0),e.value._type.label=="Retirada Mal"?(v(),y("div",oe,[l(u,null,{default:o(()=>[l(i,{modelValue:e.value.withdrawal_number,"onUpdate:modelValue":t[8]||(t[8]=a=>e.value.withdrawal_number=a),type:"Number",label:"Numero de retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(g,{modelValue:e.value.movement_type_id,"onUpdate:modelValue":t[9]||(t[9]=a=>e.value.movement_type_id=a),options:M,label:"Que se la hara?",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),e.value.movement_type_id.label=="Modificar"?(v(),y("div",ue,[l(u,null,{default:o(()=>[l(i,{modelValue:e.value.withdrawal_mount,"onUpdate:modelValue":t[10]||(t[10]=a=>e.value.withdrawal_mount=a),type:"Number",label:"Monto a modificar",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):b("",!0),l(u,null,{default:o(()=>[l(i,{modelValue:e.value.reason_modify,"onUpdate:modelValue":t[11]||(t[11]=a=>e.value.reason_modify=a),type:"text",label:"Especifica por que el cambio de la retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):b("",!0),l(u,null,{default:o(()=>[d("div",ne,[l(P,{"hide-upload-btn":!0,ref_key:"uploaderRef",ref:h,url:j,color:"primary",label:"Corte Actual",onAdded:q},null,512)])]),_:1})]),_:1}),d("div",null,[l(B,{label:"Enviar",type:"submit",color:"primary",class:"full-width",disable:T(U)},null,8,["disable"])])]),_:1})])]),_:1})]),_:1})]),_:1}))}};export{Ee as default};
