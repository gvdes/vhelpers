import{Q as T}from"./position-engine.76b8e37f.js";import{r as C,c as A,o as i,a as v,w as a,e,i as p,a3 as n,U as z,Q as V,f as c,g as w,h as g,W,aU as X,a4 as b,a0 as Y,a1 as G,a5 as J,a2 as D,a6 as K}from"./index.ede7f7c0.js";import{a as ee,Q as S}from"./QSelect.f4326807.js";import{Q as N}from"./QInput.ed352046.js";import{Q as ae}from"./QForm.73e2418f.js";import{Q as le,a as U}from"./axios.02b62974.js";import{_ as te,Q as se,a as L,C as oe}from"./UserToolbar.d70408ba.js";import{Q as ne,a as O,b as x,c as re}from"./QLayout.847b8aa1.js";import{Q as E,a as r}from"./QItem.d6657750.js";import{Q as P}from"./QList.9a05507e.js";import{Q as ue}from"./QCheckbox.4d98ec23.js";import{Q as ie}from"./QDialog.a422d261.js";import{Q as de}from"./QPage.f501daa6.js";import{u as ce}from"./VDB.45cddf73.js";import{u as me}from"./use-quasar.81f4fe91.js";import{a as fe}from"./axios.1a21dc44.js";const ve=p("span",{class:"text-h6"},"VALES",-1),pe=p("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1),be={key:0,class:"text-right"},ge={class:"row justify-center"},ye={class:"text-bold text-h5"},_e=p("span",{class:"q-ml-sm"},"Selecciona Impresora",-1),Pe={__name:"ValeLYT",setup(he){const _=ce(),m=me(),R=_.series,h=C(null),Q=C(""),u=C({state:!1,body:null}),d=C({state:!1,val:null,body:null}),k=C(""),f=C([]),$=A(()=>h.value&&Q.value.length),B=A(()=>k.value?u.value.body.product.filter(o=>o.ARTICULO.includes(k.value)):u.value.body.product),y=A(()=>m.platform.is.mobile),F=A(()=>f.value.length>0?f.value.every(o=>Number(o.change)>0)&&f.value.every(o=>Number(o.change)<=Number(o.CANTIDAD)):!1),q=async()=>{let o=_.session.store.id;console.log(o);try{let t=await fe.get(`/cashier/getPrinters/${o}`);t.status==200&&(d.value.body=t.data,console.log("Impresoras listas :)"))}catch(t){console.log(t),m.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},H=async()=>{m.loading.show({message:"Obteniendo Ticket"}),u.value.body=null;let o={type:"Modificacion",serie:h.value,folio:Q.value},l=`http://${_.session.store.ip}/access/public/modify/newmod`;U.post(l,o).then(s=>{console.log(s),u.value.state=!0,u.value.body=s.data,m.loading.hide()}).catch(s=>{console.log(s.response.data.message),m.notify({html:!0,message:s.response.data.message,color:"negative",position:"center"})})},j=()=>{d.value.state=!0},M=()=>{m.loading.show({message:"Obteniendo Ticket"}),f.value.map(s=>s._chantot=s.change*s.PRECIO);let o={ticket:u.value.body.ticket,products:f.value,print:d.value.val,created:`${_.session.name} - ${_.session.store.alias}`},l=`http://${_.session.store.ip}/access/public/modify/createVal`;U.post(l,o).then(s=>{console.log(s),s.data.mmsg&&(m.notify({message:`devolucion ${s.data.devolucion}`,type:"positive",position:"center"}),m.notify({message:`vale ${s.data.vale}`,type:"positive",position:"center"})),h.value=null,Q.value="",u.value={state:!1,body:null},d.value={state:!1,val:null,body:null},k.value="",f.value=[],m.loading.hide()}).catch(s=>{console.log(s),m.notify({html:!0,message:s,color:"negative",position:"center"})}),console.log(o)},Z=()=>{h.value=null,Q.value="",u.value={state:!1,body:null},d.value={state:!1,val:null,body:null},k.value="",f.value=[]};return q(),(o,t)=>(i(),v(ne,{view:"hHh Lpr fFf"},{default:a(()=>[e(se,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(te),e(T),e(le,{class:"justify-between"},{default:a(()=>[p("div",null,[n("Helpers "),e(z,{name:"navigate_next",color:"primary"}),n(),ve]),e(V,{color:"primary",icon:"add"},{default:a(()=>[e(ee,null,{default:a(()=>[pe,e(T),e(ae,{dense:"",onSubmit:H,class:"q-gutter-md q-pa-md"},{default:a(()=>[e(S,{modelValue:h.value,"onUpdate:modelValue":t[0]||(t[0]=l=>h.value=l),options:c(R),label:"Serie",autofocus:""},null,8,["modelValue","options"]),e(N,{modelValue:Q.value,"onUpdate:modelValue":t[1]||(t[1]=l=>Q.value=l),type:"number",label:"Folio"},null,8,["modelValue"]),c($)?(i(),w("div",be,[e(V,{type:"submit",color:"primary",icon:"search"})])):g("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(re,null,{default:a(()=>[e(de,{class:"bg-grey-3",padding:""},{default:a(()=>[p("div",ge,[e(W,{name:"bounce"},{default:a(()=>[u.value.state?(i(),v(O,{key:0,flat:"",bordered:"",style:X(`width: ${c(y)?"100%;":"70%;"}`)},{default:a(()=>[e(x,null,{default:a(()=>[p("div",ye,"Ticket: "+b(u.value.body.ticket.ticket),1),p("div",null,"N\xBA Cliente: "+b(u.value.body.ticket.codcli),1),p("div",null,"Cliente: "+b(u.value.body.ticket.cliente),1),p("div",null,"Fecha: "+b(u.value.body.ticket.fecha),1)]),_:1}),e(x,{class:"text-center text-bold"},{default:a(()=>[n(" Selecciona los productos que se creara el vale ")]),_:1}),e(x,null,{default:a(()=>[e(N,{modelValue:k.value,"onUpdate:modelValue":t[2]||(t[2]=l=>k.value=l),type:"text",label:"Buscar",filled:""},null,8,["modelValue"])]),_:1}),e(x,null,{default:a(()=>[e(P,{bordered:""},{default:a(()=>[e(E,{dense:""},{default:a(()=>[e(r,null,{default:a(()=>[n("ARTICULO")]),_:1}),c(y)?g("",!0):(i(),v(r,{key:0,class:"text-left"},{default:a(()=>[n("DESCRIPCION")]),_:1})),e(r,{class:"text-right"},{default:a(()=>[n("CANTIDAD")]),_:1}),c(y)?g("",!0):(i(),v(r,{key:1,class:"text-right"},{default:a(()=>[n("PRECIO")]),_:1})),c(y)?g("",!0):(i(),v(r,{key:2,class:"text-right"},{default:a(()=>[n("TOTAL")]),_:1})),e(r,null,{default:a(()=>[n(" SELECT ")]),_:1}),e(r,null,{default:a(()=>[n(" PIEZAS A DEV")]),_:1}),e(T,{spaced:"",inset:"",vertical:"",dark:""})]),_:1})]),_:1}),e(T,{spaced:"",inset:"",vertical:"",dark:""}),(i(!0),w(G,null,Y(c(B),(l,s)=>(i(),v(P,{bordered:"",key:s},{default:a(()=>[D((i(),v(E,{dense:"",tag:"label"},{default:a(()=>[e(r,null,{default:a(()=>[n(b(l.ARTICULO),1)]),_:2},1024),c(y)?g("",!0):(i(),v(r,{key:0,class:"text-left"},{default:a(()=>[n(b(l.DESCRIPCION),1)]),_:2},1024)),e(r,{class:"text-right"},{default:a(()=>[n(b(Number(l.CANTIDAD).toFixed(2)),1)]),_:2},1024),c(y)?g("",!0):(i(),v(r,{key:1,class:"text-right"},{default:a(()=>[n(b(Number(l.PRECIO).toFixed(2)),1)]),_:2},1024)),c(y)?g("",!0):(i(),v(r,{key:2,class:"text-right"},{default:a(()=>[n(b(Number(l.TOTAL).toFixed(2)),1)]),_:2},1024)),e(r,null,{default:a(()=>[e(ue,{modelValue:f.value,"onUpdate:modelValue":t[3]||(t[3]=I=>f.value=I),val:l},null,8,["modelValue","val"])]),_:2},1024),e(r,null,{default:a(()=>[e(N,{modelValue:l.change,"onUpdate:modelValue":I=>l.change=I,type:"number",label:"PZ",outlined:"",error:l.change>Number(l.CANTIDAD),"error-message":"es mayor que la cantidad X(",disable:!f.value.some(I=>I.ARTICULO===l.ARTICULO)},null,8,["modelValue","onUpdate:modelValue","error","disable"])]),_:2},1024),e(T,{spaced:"",inset:"",vertical:"",dark:""})]),_:2},1024)),[[K]])]),_:2},1024))),128))]),_:1}),p("div",null,[e(L,{align:"between"},{default:a(()=>[e(V,{flat:"",icon:"cancel",onClick:Z}),e(V,{flat:"",icon:"arrow_forward",disable:!c(F),onClick:j},null,8,["disable"])]),_:1})])]),_:1},8,["style"])):g("",!0)]),_:1})]),e(ie,{modelValue:d.value.state,"onUpdate:modelValue":t[5]||(t[5]=l=>d.value.state=l),persistent:""},{default:a(()=>[e(O,null,{default:a(()=>[e(x,{class:"row items-center"},{default:a(()=>[e(J,{icon:"print",color:"primary","text-color":"white"}),_e]),_:1}),e(x,null,{default:a(()=>[e(S,{modelValue:d.value.val,"onUpdate:modelValue":t[4]||(t[4]=l=>d.value.val=l),options:d.value.body,label:"Impresora","option-label":"name",filled:""},null,8,["modelValue","options"])]),_:1}),e(L,{align:"right"},{default:a(()=>[D(e(V,{flat:"",label:"Cancel",color:"negative"},null,512),[[oe]]),e(V,{flat:"",label:"Continuar",color:"positive",onClick:M,disable:!d.value.val},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Pe as default};
