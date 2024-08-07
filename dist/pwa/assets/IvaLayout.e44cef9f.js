import{Q as B}from"./QSeparator.ea6140ac.js";import{r as d,c as q,I as R,o as _,a as V,w as a,e,a3 as n,a4 as y,f as v,h as D,Q as I,i as t,am as W,an as J,g as G,a1 as L,U as X,W as Y}from"./index.4a8ccb08.js";import{Q as U,a as Z}from"./QSelect.f8d14f54.js";import{Q as P}from"./QInput.02b0dda2.js";import{Q as O}from"./QForm.3b8451ab.js";import{Q as ee,a as M}from"./axios.c1cb7215.js";import{a as ae,_ as le,Q as te}from"./UserToolbar.57932e4d.js";import{Q as oe}from"./QDialog.f2789095.js";import{Q as se}from"./QPage.0cd814f6.js";import{a as z,b as H,Q as ne,c as ue}from"./QLayout.a60f97f2.js";import{u as K}from"./VDB.1f939cea.js";import{u as ie}from"./use-quasar.2beb3990.js";import{Q as F,a as u,b as j}from"./QItem.343d6a4c.js";import{Q as re}from"./QList.0c2710dc.js";import{a as de}from"./axios.015cef45.js";import"./position-engine.eb629977.js";const ce={__name:"Ticket",props:{data:{type:Object,default:null}},emits:["openCashDesk"],setup(S,{emit:Q}){const m=S,T=K(),l=d(m.data),c=d(null),i=["6%","8%","16%"],b={"6%":.06,"8%":.08,"16%":.16},g=d({body:null,val:null}),k=d(m.data.total),o=q(()=>{if(c.value&&l.value){let $=b[c.value],r=parseFloat(k.value).toFixed(2);return parseFloat((r*$).toFixed(2))}return 0}),s=q(()=>k.value>m.data.total),A=()=>{Q("openCashDesk",{_inc:o.value,_iva:b[c.value],impresora:g.value.val.ip_address,_monto:k.value}),console.log(k.value)};return R(()=>{console.log("El componente ha muerto!!")}),(async()=>{let $=T.session.store.id;console.log($);try{let r=await de.get(`/cashier/getPrinters/${$}`);r.status==200&&(g.value.body=r.data,console.log("Impresoras listas :)"))}catch(r){console.log(r),$q.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}})(),($,r)=>(_(),V(z,{style:{"min-width":"400px"},flat:"",bordered:""},{default:a(()=>[e(re,{bordered:""},{default:a(()=>[e(F,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Ticket")]),_:1}),e(u,null,{default:a(()=>[n(y(l.value.ticket),1)]),_:1})]),_:1}),e(F,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Cliente")]),_:1}),e(u,null,{default:a(()=>[n(y(l.value.cliente),1)]),_:1})]),_:1}),e(F,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Fecha")]),_:1}),e(u,null,{default:a(()=>[n(y(l.value.fecha),1)]),_:1})]),_:1}),e(F,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Total")]),_:1}),e(u,null,{default:a(()=>[n("$ "+y(l.value.total),1)]),_:1})]),_:1}),e(F,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Impresora")]),_:1}),e(u,null,{default:a(()=>[e(U,{dense:"",modelValue:g.value.val,"onUpdate:modelValue":r[0]||(r[0]=p=>g.value.val=p),options:g.value.body,label:"Impresora","option-label":"name",filled:"",autofocus:""},null,8,["modelValue","options"])]),_:1})]),_:1}),e(B),e(F,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Monto")]),_:1}),e(u,null,{default:a(()=>[e(P,{dense:"",modelValue:k.value,"onUpdate:modelValue":r[1]||(r[1]=p=>k.value=p),type:"number",label:"Monto",filled:"",autofocus:"","error-message":"El Monto a facturar es mayor que el total de el ticket :x",error:v(s)},null,8,["modelValue","error"])]),_:1})]),_:1}),e(B),g.value.val&&!v(s)?(_(),V(F,{key:0,class:"bg-deep-purple-1"},{default:a(()=>[e(u,null,{default:a(()=>[n("IVA")]),_:1}),e(u,null,{default:a(()=>[e(U,{dense:"",modelValue:c.value,"onUpdate:modelValue":r[2]||(r[2]=p=>c.value=p),options:i,label:"Seleccione",filled:"",autofocus:""},null,8,["modelValue"])]),_:1})]),_:1})):D("",!0),v(o)&&!v(s)?(_(),V(F,{key:1,class:"bg-deep-purple-1"},{default:a(()=>[e(u,null,{default:a(()=>[n("Total")]),_:1}),e(u,null,{default:a(()=>[e(j,{class:"fc-bluegrey text-h4 fw-sbold"},{default:a(()=>[n("$ "+y(v(o)),1)]),_:1}),e(j,{caption:""},{default:a(()=>[n("$ "+y((parseFloat(l.value.total)+parseFloat(v(o))).toFixed(2)),1)]),_:1})]),_:1})]),_:1})):D("",!0)]),_:1}),c.value&&!v(s)?(_(),V(ae,{key:0,align:"between"},{default:a(()=>[e(I,{color:"primary",label:"Cancelar",flat:"","no-caps":""}),e(I,{color:"primary",label:"Cobrar",onClick:A})]),_:1})):D("",!0)]),_:1}))}},pe={class:"bg-primary row items-center justify-between q-pa-md text-white"},me=t("div",{class:"fs-dec3"},"TICKET",-1),fe={class:"text-h4"},ve={class:"text-right"},_e=t("div",{class:"fs-dec3"},"IVA",-1),ye={class:"fw-bold text-h4"},be={class:"row items-center"},ge=t("div",{class:"col-3"},"Efectivo",-1),he={class:"row"},ke={class:"bg-grey-2 row items-stretch justify-between q-pa-sm"},Ve=t("div",{class:"fs-dec1"},"Cambio:",-1),Qe={class:"text-h5 fw-sbold fc-primary"},xe=t("div",{class:"fs-dec1"},"Falta:",-1),Fe={class:"text-h6 fs-inc3 fw-bold fc-negative"},De={__name:"CashDesk",props:{data:{type:Object,default:null},inc:{type:Number,default:0}},emits:["pay"],setup(S,{emit:Q}){const m=S,T=[{id:"TBA",desc:"Tarjeta Credito/Debito BBVA (Bancomer)"},{id:"TDB",desc:"Transferencia/Deposito BBVA (Bancomer)"},{id:"TSA",desc:"Tarjeta Credito/Debito Santander"},{id:"TDA",desc:"Transferencia/Deposito Santander"},{id:"TSC",desc:"Tarjeta Credito/Debito Scotiabank"},{id:"TDS",desc:"Transferencia/Deposito Scotiabank"}],l=d({EFE:0,DIG:{id:null,val:0}}),c=d(m.data),i=d(m.inc),b=q(()=>(parseFloat(l.value.EFE)+parseFloat(l.value.DIG.val)).toFixed(2)),g=()=>{Q("pay",l.value)};return(k,o)=>c.value?(_(),V(z,{key:0},{default:a(()=>[t("div",pe,[t("div",null,[me,t("div",fe,y(c.value.ticket),1)]),t("div",ve,[_e,t("div",ye,"$ "+y(i.value),1)])]),e(O,{class:"q-pa-none",onSubmit:g},{default:a(()=>[e(H,null,{default:a(()=>[t("div",be,[ge,e(P,{class:"col",modelValue:l.value.EFE,"onUpdate:modelValue":o[0]||(o[0]=s=>l.value.EFE=s),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4"},null,8,["modelValue","min"]),parseFloat(l.value.EFE)?(_(),V(I,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:o[1]||(o[1]=s=>l.value.EFE=0)})):D("",!0)])]),_:1}),e(H,null,{default:a(()=>[t("div",he,[e(U,{class:"col-3",modelValue:l.value.DIG.id,"onUpdate:modelValue":o[2]||(o[2]=s=>l.value.DIG.id=s),options:T,label:"Terminal","option-value":"id","emit-value":"","option-label":"id",dense:""},{option:a(s=>[e(F,W(J(s.itemProps)),{default:a(()=>[e(u,null,{default:a(()=>[e(j,{class:"text-bold"},{default:a(()=>[n(y(s.opt.id),1)]),_:2},1024),e(j,{caption:""},{default:a(()=>[n(y(s.opt.desc),1)]),_:2},1024)]),_:2},1024)]),_:2},1040)]),_:1},8,["modelValue"]),e(P,{class:"col",modelValue:l.value.DIG.val,"onUpdate:modelValue":o[3]||(o[3]=s=>l.value.DIG.val=s),type:"number",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4"},null,8,["modelValue","min"]),parseFloat(l.value.DIG.val)?(_(),V(I,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:o[4]||(o[4]=s=>{l.value.DIG.val=0,l.value.DIG.id=null})})):D("",!0)])]),_:1}),e(B),t("div",ke,[t("div",null,[v(b)>=i.value?(_(),G(L,{key:0},[Ve,t("div",Qe,"$ "+y((v(b)-i.value).toFixed(2)),1)],64)):(_(),G(L,{key:1},[xe,t("div",Fe,"$ "+y((i.value-v(b)).toFixed(2)),1)],64))]),t("div",null,[v(b)>=i.value?(_(),V(I,{key:0,color:"positive",icon:"fas fa-dollar-sign",label:"Pagar",type:"submit",class:"full-height"})):D("",!0)])])]),_:1})]),_:1})):D("",!0)}};const $e=t("span",{class:"text-h6"},"IVA",-1),Ie=t("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1),Ce={key:0,class:"text-right"},we={class:"row justify-center"},Ke={__name:"IvaLayout",setup(S){const Q=K(),m=ie(),T=Q.series,l=d(null),c=d(""),i=d(null),b=d(0),g=d(0),k=d(0),o=d({state:!1}),s=d(null),A=q(()=>l.value&&c.value.length),N=async()=>{i.value=null,b.value=0;let p=l.value,f=c.value,C=`http://${Q.session.store.ip}/access/public/iva/ticket?serie=${p}&folio=${f}`;M.get(C).then(x=>{i.value=x.data}).catch(x=>{console.log(x);let w=x.response.status,E=x.response.data;console.log(w),console.log(E),m.notify({html:!0,message:E.message,color:"negative",position:"center"})})},$=({_inc:p,_iva:f,impresora:h,_monto:C})=>{console.log(p,f,h,C),s.value=h,b.value=parseFloat(p),g.value=parseFloat(f),k.value=parseFloat(C),o.value.state=!0},r=p=>{console.log("pagando..."),console.log(p);let f=Q.session.store.ip,h=`${Q.session.name} - ${Q.session.store.alias}`,C=`http://${f}/access/public/iva/create`,x={modes:p,by:h,ticket:i.value.ticket,iva:g.value,monto:k.value,impresora:s.value};console.log(x),m.loading.show({message:"Imprimiendo..."}),console.log(x),M.post(C,x).then(w=>{console.log(w.data);let E=w.data;m.loading.hide(),o.value.state=!1,i.iva=null,i.value=null,m.notify({html:!0,color:"positive",position:"center",message:`<span class="fs-inc2"> El ticket <b>${E.ticket}</b> fue generado! </span>`}),E.printed||m.notify({html:!0,color:"negative",position:"top",icon:"fas fa-bugs",message:'<span class="fs-inc2"> No se pudo emitir el ticket, la conexion a la impresora no esta disponible! </span>'})}).catch(w=>{console.log(w),m.loading.hide()})};return(p,f)=>(_(),V(ne,{view:"hHh Lpr fFf"},{default:a(()=>[e(te,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(le),e(B),e(ee,{class:"justify-between"},{default:a(()=>[t("div",null,[n("Helpers "),e(X,{name:"navigate_next",color:"primary"}),n(),$e]),e(I,{color:"primary",icon:"add"},{default:a(()=>[e(Z,null,{default:a(()=>[Ie,e(B),e(O,{dense:"",onSubmit:N,class:"q-gutter-md q-pa-md"},{default:a(()=>[e(U,{modelValue:l.value,"onUpdate:modelValue":f[0]||(f[0]=h=>l.value=h),options:v(T),label:"Serie",autofocus:""},null,8,["modelValue","options"]),e(P,{modelValue:c.value,"onUpdate:modelValue":f[1]||(f[1]=h=>c.value=h),type:"number",label:"Folio"},null,8,["modelValue"]),v(A)?(_(),G("div",Ce,[e(I,{type:"submit",color:"primary",icon:"search"})])):D("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(ue,null,{default:a(()=>[e(se,{class:"bg-grey-3",padding:""},{default:a(()=>[t("div",we,[e(Y,{name:"bounce"},{default:a(()=>[i.value?(_(),V(ce,{key:0,data:i.value,onOpenCashDesk:$},null,8,["data"])):D("",!0)]),_:1})]),e(oe,{modelValue:o.value.state,"onUpdate:modelValue":f[2]||(f[2]=h=>o.value.state=h)},{default:a(()=>[e(De,{data:i.value,inc:b.value,onPay:r},null,8,["data","inc"])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Ke as default};
