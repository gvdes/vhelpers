import{Q as w}from"./QSeparator.2df9944c.js";import{r as h,c as q,o as c,a as j,w as o,e as l,i as d,a3 as x,Y as E,g as f,h as y,Q as F,f as S}from"./index.69521ace.js";import{Q as B}from"./QToolbar.7e6ad7a9.js";import{Q as R}from"./QHeader.ad3d9f83.js";import{u as H,Q as I,a as u}from"./use-quasar.66a4eee9.js";import{Q as b}from"./QSelect.8df49e52.js";import{Q as r}from"./QInput.fe5dc355.js";import{Q as L}from"./QUploader.88ed2f4e.js";import{Q as O}from"./QForm.337bcf33.js";import{Q as P}from"./QPage.5ecc0964.js";import{Q as T,a as Y}from"./QLayout.e453c444.js";import{u as J}from"./VDB.fcb44d97.js";import{_ as z}from"./UserToolbar.896d8852.js";import{a as k}from"./axios.ae0a941c.js";import{a as G}from"./axios.f1f32898.js";import"./QResizeObserver.9996e5bb.js";import"./use-key-composition.3e80e314.js";import"./uid.42677368.js";import"./position-engine.52822e4b.js";import"./QDialog.eb93db52.js";import"./rtl.b51694b1.js";import"./QCardActions.c923ee13.js";import"./ClosePopup.302ee10d.js";const K=d("span",{class:"text-h6"},"Apertura de Cajas",-1),W={class:"flex justify-center"},X=d("div",{class:"text-h4 text-center"},"APERTURA DE CAJA",-1),Z=d("div",{class:"text-subtitle2 text-center"},"Movimientos en cajas despues de el corte",-1),ee={key:0},le={key:1},ae={key:2},te={key:0},oe={class:"col flex justify-center"},Ue={__name:"OpenLayout",setup(ue){const i=J(),p=H(),g=h(null),$=[{id:1,label:"Descuadre"},{id:2,label:"Mal Devolucion"},{id:3,label:"Retirada Mal"}],D=[{id:1,label:"Eliminar"},{id:2,label:"Modificar"}],V=h({val:null,opts:null}),e=h({_store:null,cash:null,_created_by:null,_cashier:null,_type:{id:0,label:"Ninguno"},unsquare:null,mismatch_reason:null,current_cut:null,ticket:null,refund_ticket:null,refund_reason:null,withdrawal_number:null,movement_type_id:{id:0,label:"Ninguno"},reason_modify:null,withdrawal_mount:null}),M=q(()=>e.value._type.id==1&&e.value.cash&&e.value._cashier&&e.value.unsquare&&e.value.mismatch_reason&&e.value.current_cut||e.value._type.id==2&&e.value.cash&&e.value._cashier&&e.value.ticket&&e.value.refund_reason&&e.value.current_cut?!1:!(e.value._type.id==3&&e.value.cash&&e.value._cashier&&e.value.current_cut&&e.value.withdrawal_number&&e.value.movement_type_id.id!=0&&e.value.reason_modify)),Q=async()=>{let n=i.session.store.id;console.log(n),k.get(`/cashier/getStaff/${n}`).then(a=>{console.log(a.data),V.value.opts=a.data})},U=()=>{g.value.upload()},N=async()=>{let n=e.value._cashier.id,a=e.value._type.id,t=e.value.movement_type_id.id!=0?e.value.movement_type_id.id:null;e.value.movement_type_id=t,e.value._type=a,e.value._cashier=n,e.value._store=i.session.store.id,e.value._created_by=i.session.id;let s=new Date;const v=`${s.getFullYear()}_${s.getMonth()+1}_${s.getDate()}_${s.getHours()}${s.getMinutes()}${s.getSeconds()}`;let m="/corte"+v+"_"+e.value._store+"_"+e.value._created_by+".jpg";e.value.current_cut=m,U(),console.log(e.value),k.post("/cashier/Opening",e.value).then(_=>{console.log(_.data),p.notify({type:"positive",message:_.data,position:"center"}),e.value.cash=null,e.value._cashier=null,e.value._type={id:0,label:"Ninguno"},e.value.unsquare=null,e.value.mismatch_reason=null,e.value.current_cut=null,e.value.ticket=null,e.value.refund_ticket=null,e.value.refund_reason=null,e.value.withdrawal_number=null,e.value.movement_type_id={id:0,label:"Ninguno"},e.value.reason_modify=null,e.value.withdrawal_mount=null}).catch(_=>{console.log(_.data),p.notify({type:"negative",message:_.data,position:"center"})})},C=()=>{e.value.current_cut=!0},A=n=>{console.log(n);const a=new FormData;a.append("files",n[0]);let t=new Date;const s=`${t.getFullYear()}_${t.getMonth()+1}_${t.getDate()}_${t.getHours()}${t.getMinutes()}${t.getSeconds()}`;let v="corte"+s+"_"+e.value._store+"_"+e.value._created_by;return console.log(v),a.append("__key",v+".jpg"),console.log(a),G.post("http://192.168.10.238:2902/Assist/public/api/cashier/AddFile",a).then(m=>{console.log(m.data),g.value.reset(),p.notify({type:"positive",message:"Imagen se subio con exito :"+m.data,position:"center"})}).catch(m=>{console.error("Error al subir archivos:",m),p.notify({type:"negative",message:"(I)Error al subir archivo:"+response.data,position:"center"})}),"http://192.168.10.238:2902/Assist/public/api/cashier/AddFile"};return i.session.rol=="aux"||i.session.rol=="gen"||i.session.rol=="aud"||i.session.rol=="root"?Q():(p.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),Q(),(n,a)=>(c(),j(T,{view:"hHh Lpr fFf"},{default:o(()=>[l(R,{class:"transparent text-dark",bordered:""},{default:o(()=>[l(z),l(w),l(B,{class:"justify-between"},{default:o(()=>[d("div",null,[x("Helpers "),l(E,{name:"navigate_next",color:"primary"}),x(),K])]),_:1})]),_:1}),l(w,{spaced:"",inset:"",vertical:"",dark:""}),l(Y,null,{default:o(()=>[l(P,null,{default:o(()=>[d("div",W,[l(O,{class:"q-gutter-md",onSubmit:N},{default:o(()=>[l(I,{class:"my-card",square:"",bordere:""},{default:o(()=>[l(u,null,{default:o(()=>[X,Z]),_:1}),l(u,null,{default:o(()=>[l(b,{modelValue:e.value.cash,"onUpdate:modelValue":a[0]||(a[0]=t=>e.value.cash=t),options:[1,2,3,4,5,6,7,8,9],label:"Caja",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(b,{modelValue:e.value._cashier,"onUpdate:modelValue":a[1]||(a[1]=t=>e.value._cashier=t),options:V.value.opts,label:"Cajero","option-label":"complete_name",outlined:"",dense:""},null,8,["modelValue","options"])]),_:1}),l(u,null,{default:o(()=>[l(b,{modelValue:e.value._type,"onUpdate:modelValue":a[2]||(a[2]=t=>e.value._type=t),options:$,label:"Motivo",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),e.value._type.label=="Descuadre"?(c(),f("div",ee,[l(u,null,{default:o(()=>[l(r,{modelValue:e.value.unsquare,"onUpdate:modelValue":a[3]||(a[3]=t=>e.value.unsquare=t),type:"Number",label:"Monto de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(r,{modelValue:e.value.mismatch_reason,"onUpdate:modelValue":a[4]||(a[4]=t=>e.value.mismatch_reason=t),type:"text",label:"Motivo de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):y("",!0),e.value._type.label=="Mal Devolucion"?(c(),f("div",le,[l(u,null,{default:o(()=>[l(r,{modelValue:e.value.ticket,"onUpdate:modelValue":a[5]||(a[5]=t=>e.value.ticket=t),type:"text",label:"Cual es el numero de ticket original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(r,{modelValue:e.value.refund_ticket,"onUpdate:modelValue":a[6]||(a[6]=t=>e.value.refund_ticket=t),type:"text",label:"Cual es el numero de devolucion original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(r,{modelValue:e.value.refund_reason,"onUpdate:modelValue":a[7]||(a[7]=t=>e.value.refund_reason=t),type:"text",label:"Especifica por que se creara una devolucion nueva",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):y("",!0),e.value._type.label=="Retirada Mal"?(c(),f("div",ae,[l(u,null,{default:o(()=>[l(r,{modelValue:e.value.withdrawal_number,"onUpdate:modelValue":a[8]||(a[8]=t=>e.value.withdrawal_number=t),type:"Number",label:"Numero de retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),l(u,null,{default:o(()=>[l(b,{modelValue:e.value.movement_type_id,"onUpdate:modelValue":a[9]||(a[9]=t=>e.value.movement_type_id=t),options:D,label:"Que se la hara?",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),e.value.movement_type_id.label=="Modificar"?(c(),f("div",te,[l(u,null,{default:o(()=>[l(r,{modelValue:e.value.withdrawal_mount,"onUpdate:modelValue":a[10]||(a[10]=t=>e.value.withdrawal_mount=t),type:"Number",label:"Monto a modificar",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):y("",!0),l(u,null,{default:o(()=>[l(r,{modelValue:e.value.reason_modify,"onUpdate:modelValue":a[11]||(a[11]=t=>e.value.reason_modify=t),type:"text",label:"Especifica por que el cambio de la retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):y("",!0),l(u,null,{default:o(()=>[d("div",oe,[l(L,{"hide-upload-btn":!0,ref_key:"uploaderRef",ref:g,url:A,color:"primary",label:"Corte Actual",onAdded:C},null,512)])]),_:1})]),_:1}),d("div",null,[l(F,{label:"Enviar",type:"submit",color:"primary",class:"full-width",disable:S(M)},null,8,["disable"])])]),_:1})])]),_:1})]),_:1})]),_:1}))}};export{Ue as default};
