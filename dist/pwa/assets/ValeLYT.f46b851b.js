import{Q as T}from"./position-engine.5cc17045.js";import{r as C,c as A,o as u,a as p,w as a,e,i as v,a3 as r,Y as Z,Q as V,f as c,g as w,h as g,_ as z,aU as X,a4 as b,a0 as G,a1 as J,a5 as K,a2 as D,a6 as W}from"./index.c1d18584.js";import{a as ee,Q as S}from"./QSelect.16369ee7.js";import{Q as N}from"./QInput.3a2caa8e.js";import{Q as ae}from"./QForm.28872589.js";import{Q as le}from"./QToolbar.b77366d8.js";import{Q as te,a as L}from"./QCardActions.83155447.js";import{Q as O,a as x}from"./QCard.da559450.js";import{Q as U,a as n}from"./QItem.30265627.js";import{Q as E}from"./QList.aef8e44a.js";import{Q as se}from"./QCheckbox.ea945aa1.js";import{Q as oe}from"./QDialog.70ae4825.js";import{Q as re}from"./QPage.eacbdd30.js";import{Q as ne,a as ie}from"./QLayout.0f4fbdef.js";import{_ as ue,C as de}from"./UserToolbar.4af90c70.js";import{u as ce}from"./VDB.b282cc03.js";import{a as P}from"./axios.f1f32898.js";import{u as me}from"./use-quasar.0c2d8930.js";import{a as fe}from"./axios.9ea69889.js";import"./use-key-composition.9bcd2fdd.js";import"./QResizeObserver.892829ff.js";const pe=v("span",{class:"text-h6"},"VALES",-1),ve=v("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1),be={key:0,class:"text-right"},ge={class:"row justify-center"},ye={class:"text-bold text-h5"},_e=v("span",{class:"q-ml-sm"},"Selecciona Impresora",-1),qe={__name:"ValeLYT",setup(he){const _=ce(),m=me(),R=_.series,h=C(null),Q=C(""),i=C({state:!1,body:null}),d=C({state:!1,val:null,body:null}),k=C(""),f=C([]),$=A(()=>h.value&&Q.value.length),B=A(()=>k.value?i.value.body.product.filter(o=>o.ARTICULO.includes(k.value)):i.value.body.product),y=A(()=>m.platform.is.mobile),F=A(()=>f.value.length>0?f.value.every(o=>Number(o.change)>0)&&f.value.every(o=>Number(o.change)<=Number(o.CANTIDAD)):!1),q=async()=>{let o=_.session.store.id;console.log(o);try{let t=await fe.get(`/cashier/getPrinters/${o}`);t.status==200&&(d.value.body=t.data,console.log("Impresoras listas :)"))}catch(t){console.log(t),m.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},H=async()=>{m.loading.show({message:"Obteniendo Ticket"}),i.value.body=null;let o={type:"Modificacion",serie:h.value,folio:Q.value},l=`http://${_.session.store.ip}/access/public/modify/newmod`;P.post(l,o).then(s=>{console.log(s),i.value.state=!0,i.value.body=s.data,m.loading.hide()}).catch(s=>{console.log(s.response.data.message),m.notify({html:!0,message:s.response.data.message,color:"negative",position:"center"})})},j=()=>{d.value.state=!0},M=()=>{m.loading.show({message:"Obteniendo Ticket"}),f.value.map(s=>s._chantot=s.change*s.PRECIO);let o={ticket:i.value.body.ticket,products:f.value,print:d.value.val,created:`${_.session.name} - ${_.session.store.alias}`},l=`http://${_.session.store.ip}/access/public/modify/createVal`;P.post(l,o).then(s=>{console.log(s),s.data.mmsg&&(m.notify({message:`devolucion ${s.data.devolucion}`,type:"positive",position:"center"}),m.notify({message:`vale ${s.data.vale}`,type:"positive",position:"center"})),h.value=null,Q.value="",i.value={state:!1,body:null},d.value={state:!1,val:null,body:null},k.value="",f.value=[],m.loading.hide()}).catch(s=>{console.log(s),m.notify({html:!0,message:s,color:"negative",position:"center"})}),console.log(o)},Y=()=>{h.value=null,Q.value="",i.value={state:!1,body:null},d.value={state:!1,val:null,body:null},k.value="",f.value=[]};return q(),(o,t)=>(u(),p(ne,{view:"hHh Lpr fFf"},{default:a(()=>[e(te,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(ue),e(T),e(le,{class:"justify-between"},{default:a(()=>[v("div",null,[r("Helpers "),e(Z,{name:"navigate_next",color:"primary"}),r(),pe]),e(V,{color:"primary",icon:"add"},{default:a(()=>[e(ee,null,{default:a(()=>[ve,e(T),e(ae,{dense:"",onSubmit:H,class:"q-gutter-md q-pa-md"},{default:a(()=>[e(S,{modelValue:h.value,"onUpdate:modelValue":t[0]||(t[0]=l=>h.value=l),options:c(R),label:"Serie",autofocus:""},null,8,["modelValue","options"]),e(N,{modelValue:Q.value,"onUpdate:modelValue":t[1]||(t[1]=l=>Q.value=l),type:"number",label:"Folio"},null,8,["modelValue"]),c($)?(u(),w("div",be,[e(V,{type:"submit",color:"primary",icon:"search"})])):g("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(ie,null,{default:a(()=>[e(re,{class:"bg-grey-3",padding:""},{default:a(()=>[v("div",ge,[e(z,{name:"bounce"},{default:a(()=>[i.value.state?(u(),p(O,{key:0,flat:"",bordered:"",style:X(`width: ${c(y)?"100%;":"70%;"}`)},{default:a(()=>[e(x,null,{default:a(()=>[v("div",ye,"Ticket: "+b(i.value.body.ticket.ticket),1),v("div",null,"N\xBA Cliente: "+b(i.value.body.ticket.codcli),1),v("div",null,"Cliente: "+b(i.value.body.ticket.cliente),1),v("div",null,"Fecha: "+b(i.value.body.ticket.fecha),1)]),_:1}),e(x,{class:"text-center text-bold"},{default:a(()=>[r(" Selecciona los productos que se creara el vale ")]),_:1}),e(x,null,{default:a(()=>[e(N,{modelValue:k.value,"onUpdate:modelValue":t[2]||(t[2]=l=>k.value=l),type:"text",label:"Buscar",filled:""},null,8,["modelValue"])]),_:1}),e(x,null,{default:a(()=>[e(E,{bordered:""},{default:a(()=>[e(U,{dense:""},{default:a(()=>[e(n,null,{default:a(()=>[r("ARTICULO")]),_:1}),c(y)?g("",!0):(u(),p(n,{key:0,class:"text-left"},{default:a(()=>[r("DESCRIPCION")]),_:1})),e(n,{class:"text-right"},{default:a(()=>[r("CANTIDAD")]),_:1}),c(y)?g("",!0):(u(),p(n,{key:1,class:"text-right"},{default:a(()=>[r("PRECIO")]),_:1})),c(y)?g("",!0):(u(),p(n,{key:2,class:"text-right"},{default:a(()=>[r("TOTAL")]),_:1})),e(n,null,{default:a(()=>[r(" SELECT ")]),_:1}),e(n,null,{default:a(()=>[r(" PIEZAS A DEV")]),_:1}),e(T,{spaced:"",inset:"",vertical:"",dark:""})]),_:1})]),_:1}),e(T,{spaced:"",inset:"",vertical:"",dark:""}),(u(!0),w(J,null,G(c(B),(l,s)=>(u(),p(E,{bordered:"",key:s},{default:a(()=>[D((u(),p(U,{dense:"",tag:"label"},{default:a(()=>[e(n,null,{default:a(()=>[r(b(l.ARTICULO),1)]),_:2},1024),c(y)?g("",!0):(u(),p(n,{key:0,class:"text-left"},{default:a(()=>[r(b(l.DESCRIPCION),1)]),_:2},1024)),e(n,{class:"text-right"},{default:a(()=>[r(b(Number(l.CANTIDAD).toFixed(2)),1)]),_:2},1024),c(y)?g("",!0):(u(),p(n,{key:1,class:"text-right"},{default:a(()=>[r(b(Number(l.PRECIO).toFixed(2)),1)]),_:2},1024)),c(y)?g("",!0):(u(),p(n,{key:2,class:"text-right"},{default:a(()=>[r(b(Number(l.TOTAL).toFixed(2)),1)]),_:2},1024)),e(n,null,{default:a(()=>[e(se,{modelValue:f.value,"onUpdate:modelValue":t[3]||(t[3]=I=>f.value=I),val:l},null,8,["modelValue","val"])]),_:2},1024),e(n,null,{default:a(()=>[e(N,{modelValue:l.change,"onUpdate:modelValue":I=>l.change=I,type:"number",label:"PZ",outlined:"",error:l.change>Number(l.CANTIDAD),"error-message":"es mayor que la cantidad X(",disable:!f.value.some(I=>I.ARTICULO===l.ARTICULO)},null,8,["modelValue","onUpdate:modelValue","error","disable"])]),_:2},1024),e(T,{spaced:"",inset:"",vertical:"",dark:""})]),_:2},1024)),[[W]])]),_:2},1024))),128))]),_:1}),v("div",null,[e(L,{align:"between"},{default:a(()=>[e(V,{flat:"",icon:"cancel",onClick:Y}),e(V,{flat:"",icon:"arrow_forward",disable:!c(F),onClick:j},null,8,["disable"])]),_:1})])]),_:1},8,["style"])):g("",!0)]),_:1})]),e(oe,{modelValue:d.value.state,"onUpdate:modelValue":t[5]||(t[5]=l=>d.value.state=l),persistent:""},{default:a(()=>[e(O,null,{default:a(()=>[e(x,{class:"row items-center"},{default:a(()=>[e(K,{icon:"print",color:"primary","text-color":"white"}),_e]),_:1}),e(x,null,{default:a(()=>[e(S,{modelValue:d.value.val,"onUpdate:modelValue":t[4]||(t[4]=l=>d.value.val=l),options:d.value.body,label:"Impresora","option-label":"name",filled:""},null,8,["modelValue","options"])]),_:1}),e(L,{align:"right"},{default:a(()=>[D(e(V,{flat:"",label:"Cancel",color:"negative"},null,512),[[de]]),e(V,{flat:"",label:"Continuar",color:"positive",onClick:M,disable:!d.value.val},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{qe as default};
