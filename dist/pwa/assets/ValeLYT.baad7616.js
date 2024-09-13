import{Q as T}from"./position-engine.4e30ed36.js";import{r as C,c as A,o as i,a as p,w as a,e,i as v,a3 as r,F as z,Q as V,f as c,g as w,h as g,T as X,aU as Y,a4 as b,a0 as G,a1 as J,a5 as K,a2 as D,a6 as W}from"./index.0eb6779d.js";import{a as ee,Q as S}from"./QSelect.36de7d42.js";import{Q as N}from"./QInput.fb740e0b.js";import{Q as ae}from"./QForm.8ff439fc.js";import{Q as le,a as L}from"./axios.4a3c4e0e.js";import{_ as te,Q as se,a as O,C as oe}from"./UserToolbar.48ef4053.js";import{Q as U,a as x}from"./QCard.53b4b453.js";import{Q as E,a as n}from"./QItem.994282f6.js";import{Q as P}from"./QList.73d308f1.js";import{Q as re}from"./QCheckbox.abac7ad3.js";import{Q as ne}from"./QDialog.bb757c59.js";import{Q as ue}from"./QPage.8684f3e6.js";import{Q as ie,a as de}from"./QLayout.79495cc4.js";import{u as ce}from"./VDB.4cd48481.js";import{u as me}from"./use-quasar.8da50ab4.js";import{a as fe}from"./axios.542af26b.js";const pe=v("span",{class:"text-h6"},"VALES",-1),ve=v("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1),be={key:0,class:"text-right"},ge={class:"row justify-center"},ye={class:"text-bold text-h5"},_e=v("span",{class:"q-ml-sm"},"Selecciona Impresora",-1),Re={__name:"ValeLYT",setup(he){const _=ce(),m=me(),R=_.series,h=C(null),Q=C(""),u=C({state:!1,body:null}),d=C({state:!1,val:null,body:null}),k=C(""),f=C([]),F=A(()=>h.value&&Q.value.length),$=A(()=>k.value?u.value.body.product.filter(o=>o.ARTICULO.includes(k.value)):u.value.body.product),y=A(()=>m.platform.is.mobile),B=A(()=>f.value.length>0?f.value.every(o=>Number(o.change)>0)&&f.value.every(o=>Number(o.change)<=Number(o.CANTIDAD)):!1),q=async()=>{let o=_.session.store.id;console.log(o);try{let t=await fe.get(`/cashier/getPrinters/${o}`);t.status==200&&(d.value.body=t.data,console.log("Impresoras listas :)"))}catch(t){console.log(t),m.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},H=async()=>{m.loading.show({message:"Obteniendo Ticket"}),u.value.body=null;let o={type:"Modificacion",serie:h.value,folio:Q.value},l=`http://${_.session.store.ip}/access/public/modify/newmod`;L.post(l,o).then(s=>{console.log(s),u.value.state=!0,u.value.body=s.data,m.loading.hide()}).catch(s=>{console.log(s.response.data.message),m.notify({html:!0,message:s.response.data.message,color:"negative",position:"center"})})},j=()=>{d.value.state=!0},M=()=>{m.loading.show({message:"Obteniendo Ticket"}),f.value.map(s=>s._chantot=s.change*s.PRECIO);let o={ticket:u.value.body.ticket,products:f.value,print:d.value.val,created:`${_.session.name} - ${_.session.store.alias}`},l=`http://${_.session.store.ip}/access/public/modify/createVal`;L.post(l,o).then(s=>{console.log(s),s.data.mmsg&&(m.notify({message:`devolucion ${s.data.devolucion}`,type:"positive",position:"center"}),m.notify({message:`vale ${s.data.vale}`,type:"positive",position:"center"})),h.value=null,Q.value="",u.value={state:!1,body:null},d.value={state:!1,val:null,body:null},k.value="",f.value=[],m.loading.hide()}).catch(s=>{console.log(s),m.notify({html:!0,message:s,color:"negative",position:"center"})}),console.log(o)},Z=()=>{h.value=null,Q.value="",u.value={state:!1,body:null},d.value={state:!1,val:null,body:null},k.value="",f.value=[]};return q(),(o,t)=>(i(),p(ie,{view:"hHh Lpr fFf"},{default:a(()=>[e(se,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(te),e(T),e(le,{class:"justify-between"},{default:a(()=>[v("div",null,[r("Helpers "),e(z,{name:"navigate_next",color:"primary"}),r(),pe]),e(V,{color:"primary",icon:"add"},{default:a(()=>[e(ee,null,{default:a(()=>[ve,e(T),e(ae,{dense:"",onSubmit:H,class:"q-gutter-md q-pa-md"},{default:a(()=>[e(S,{modelValue:h.value,"onUpdate:modelValue":t[0]||(t[0]=l=>h.value=l),options:c(R),label:"Serie",autofocus:""},null,8,["modelValue","options"]),e(N,{modelValue:Q.value,"onUpdate:modelValue":t[1]||(t[1]=l=>Q.value=l),type:"number",label:"Folio"},null,8,["modelValue"]),c(F)?(i(),w("div",be,[e(V,{type:"submit",color:"primary",icon:"search"})])):g("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(de,null,{default:a(()=>[e(ue,{class:"bg-grey-3",padding:""},{default:a(()=>[v("div",ge,[e(X,{name:"bounce"},{default:a(()=>[u.value.state?(i(),p(U,{key:0,flat:"",bordered:"",style:Y(`width: ${c(y)?"100%;":"70%;"}`)},{default:a(()=>[e(x,null,{default:a(()=>[v("div",ye,"Ticket: "+b(u.value.body.ticket.ticket),1),v("div",null,"N\xBA Cliente: "+b(u.value.body.ticket.codcli),1),v("div",null,"Cliente: "+b(u.value.body.ticket.cliente),1),v("div",null,"Fecha: "+b(u.value.body.ticket.fecha),1)]),_:1}),e(x,{class:"text-center text-bold"},{default:a(()=>[r(" Selecciona los productos que se creara el vale ")]),_:1}),e(x,null,{default:a(()=>[e(N,{modelValue:k.value,"onUpdate:modelValue":t[2]||(t[2]=l=>k.value=l),type:"text",label:"Buscar",filled:""},null,8,["modelValue"])]),_:1}),e(x,null,{default:a(()=>[e(P,{bordered:""},{default:a(()=>[e(E,{dense:""},{default:a(()=>[e(n,null,{default:a(()=>[r("ARTICULO")]),_:1}),c(y)?g("",!0):(i(),p(n,{key:0,class:"text-left"},{default:a(()=>[r("DESCRIPCION")]),_:1})),e(n,{class:"text-right"},{default:a(()=>[r("CANTIDAD")]),_:1}),c(y)?g("",!0):(i(),p(n,{key:1,class:"text-right"},{default:a(()=>[r("PRECIO")]),_:1})),c(y)?g("",!0):(i(),p(n,{key:2,class:"text-right"},{default:a(()=>[r("TOTAL")]),_:1})),e(n,null,{default:a(()=>[r(" SELECT ")]),_:1}),e(n,null,{default:a(()=>[r(" PIEZAS A DEV")]),_:1}),e(T,{spaced:"",inset:"",vertical:"",dark:""})]),_:1})]),_:1}),e(T,{spaced:"",inset:"",vertical:"",dark:""}),(i(!0),w(J,null,G(c($),(l,s)=>(i(),p(P,{bordered:"",key:s},{default:a(()=>[D((i(),p(E,{dense:"",tag:"label"},{default:a(()=>[e(n,null,{default:a(()=>[r(b(l.ARTICULO),1)]),_:2},1024),c(y)?g("",!0):(i(),p(n,{key:0,class:"text-left"},{default:a(()=>[r(b(l.DESCRIPCION),1)]),_:2},1024)),e(n,{class:"text-right"},{default:a(()=>[r(b(Number(l.CANTIDAD).toFixed(2)),1)]),_:2},1024),c(y)?g("",!0):(i(),p(n,{key:1,class:"text-right"},{default:a(()=>[r(b(Number(l.PRECIO).toFixed(2)),1)]),_:2},1024)),c(y)?g("",!0):(i(),p(n,{key:2,class:"text-right"},{default:a(()=>[r(b(Number(l.TOTAL).toFixed(2)),1)]),_:2},1024)),e(n,null,{default:a(()=>[e(re,{modelValue:f.value,"onUpdate:modelValue":t[3]||(t[3]=I=>f.value=I),val:l},null,8,["modelValue","val"])]),_:2},1024),e(n,null,{default:a(()=>[e(N,{modelValue:l.change,"onUpdate:modelValue":I=>l.change=I,type:"number",label:"PZ",outlined:"",error:l.change>Number(l.CANTIDAD),"error-message":"es mayor que la cantidad X(",disable:!f.value.some(I=>I.ARTICULO===l.ARTICULO)},null,8,["modelValue","onUpdate:modelValue","error","disable"])]),_:2},1024),e(T,{spaced:"",inset:"",vertical:"",dark:""})]),_:2},1024)),[[W]])]),_:2},1024))),128))]),_:1}),v("div",null,[e(O,{align:"between"},{default:a(()=>[e(V,{flat:"",icon:"cancel",onClick:Z}),e(V,{flat:"",icon:"arrow_forward",disable:!c(B),onClick:j},null,8,["disable"])]),_:1})])]),_:1},8,["style"])):g("",!0)]),_:1})]),e(ne,{modelValue:d.value.state,"onUpdate:modelValue":t[5]||(t[5]=l=>d.value.state=l),persistent:""},{default:a(()=>[e(U,null,{default:a(()=>[e(x,{class:"row items-center"},{default:a(()=>[e(K,{icon:"print",color:"primary","text-color":"white"}),_e]),_:1}),e(x,null,{default:a(()=>[e(S,{modelValue:d.value.val,"onUpdate:modelValue":t[4]||(t[4]=l=>d.value.val=l),options:d.value.body,label:"Impresora","option-label":"name",filled:""},null,8,["modelValue","options"])]),_:1}),e(O,{align:"right"},{default:a(()=>[D(e(V,{flat:"",label:"Cancel",color:"negative"},null,512),[[oe]]),e(V,{flat:"",label:"Continuar",color:"positive",onClick:M,disable:!d.value.val},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Re as default};
