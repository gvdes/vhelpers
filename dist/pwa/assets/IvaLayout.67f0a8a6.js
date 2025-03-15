import{Q as S}from"./QSeparator.4c3df87b.js";import{r as m,c as j,T as K,o as f,a as Q,w as l,e,a4 as i,a5 as b,h as D,Q as C,f as n,ay as Y,az as J,g as h,a2 as L,u as W,Y as X,a0 as Z,_ as ee}from"./index.ee411de5.js";import{a as F,b as r,Q as P,c as U,d as le}from"./QSelect.f84dc228.js";import{Q as A}from"./QInput.bbf81730.js";import{Q as O}from"./QForm.536ac0a5.js";import{Q as ae}from"./QToolbar.4b5eb18f.js";import{Q as te}from"./QHeader.feabcb05.js";import{Q as oe}from"./QDialog.3a28a0ad.js";import{Q as se}from"./QPage.dd71aa4a.js";import{Q as ne,a as ue}from"./QLayout.5be6e713.js";import{u as z}from"./VDB.4d945a6a.js";import{_ as ie}from"./UserToolbar.bb94b620.js";import{a as M}from"./axios.9ab26c22.js";import{Q as R,a as H,u as re}from"./use-quasar.772555ff.js";import{Q as de}from"./QList.aeab4735.js";import{Q as pe}from"./QCardActions.674c9557.js";import{a as me}from"./axios.ba7b1b0e.js";import"./use-key-composition.b5343cc0.js";import"./uid.937d8ee7.js";import"./position-engine.bf034c4f.js";import"./rtl.276c3f1b.js";import"./QResizeObserver.3a322cf2.js";import"./ClosePopup.edf0e745.js";const ce={__name:"Ticket",props:{data:{type:Object,default:null}},emits:["openCashDesk"],setup(q,{emit:T}){const d=q,y=z(),E=T,o=m(d.data),c=m(null),p=["6%","8%","16%"],g={"6%":.06,"8%":.08,"16%":.16},_=m({body:null,val:null}),V=m(d.data.total),t=j(()=>{if(c.value&&o.value){let $=g[c.value],a=parseFloat(V.value).toFixed(2);return parseFloat((a*$).toFixed(2))}return 0}),u=j(()=>V.value>d.data.total),G=()=>{E("openCashDesk",{_inc:t.value,_iva:g[c.value],impresora:_.value.val.ip_address,_monto:V.value}),console.log(V.value)};return K(()=>{console.log("El componente ha muerto!!")}),(async()=>{let $=y.session.store.id;console.log($);try{let a=await me.get(`/cashier/getPrinters/${$}`);a.status==200&&(_.value.body=a.data,console.log("Impresoras listas :)"))}catch(a){console.log(a),$q.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}})(),($,a)=>(f(),Q(R,{style:{"min-width":"400px"},flat:"",bordered:""},{default:l(()=>[e(de,{bordered:""},{default:l(()=>[e(F,null,{default:l(()=>[e(r,null,{default:l(()=>a[3]||(a[3]=[i("Ticket")])),_:1}),e(r,null,{default:l(()=>[i(b(o.value.ticket),1)]),_:1})]),_:1}),e(F,null,{default:l(()=>[e(r,null,{default:l(()=>a[4]||(a[4]=[i("Cliente")])),_:1}),e(r,null,{default:l(()=>[i(b(o.value.cliente),1)]),_:1})]),_:1}),e(F,null,{default:l(()=>[e(r,null,{default:l(()=>a[5]||(a[5]=[i("Fecha")])),_:1}),e(r,null,{default:l(()=>[i(b(o.value.fecha),1)]),_:1})]),_:1}),e(F,null,{default:l(()=>[e(r,null,{default:l(()=>a[6]||(a[6]=[i("Total")])),_:1}),e(r,null,{default:l(()=>[i("$ "+b(o.value.total),1)]),_:1})]),_:1}),e(F,null,{default:l(()=>[e(r,null,{default:l(()=>a[7]||(a[7]=[i("Impresora")])),_:1}),e(r,null,{default:l(()=>[e(P,{dense:"",modelValue:_.value.val,"onUpdate:modelValue":a[0]||(a[0]=v=>_.value.val=v),options:_.value.body,label:"Impresora","option-label":"name",filled:"",autofocus:""},null,8,["modelValue","options"])]),_:1})]),_:1}),e(S),e(F,null,{default:l(()=>[e(r,null,{default:l(()=>a[8]||(a[8]=[i("Monto")])),_:1}),e(r,null,{default:l(()=>[e(A,{dense:"",modelValue:V.value,"onUpdate:modelValue":a[1]||(a[1]=v=>V.value=v),type:"number",label:"Monto",filled:"",autofocus:"","error-message":"El Monto a facturar es mayor que el total de el ticket :x",error:u.value},null,8,["modelValue","error"])]),_:1})]),_:1}),e(S),_.value.val&&!u.value?(f(),Q(F,{key:0,class:"bg-deep-purple-1"},{default:l(()=>[e(r,null,{default:l(()=>a[9]||(a[9]=[i("IVA")])),_:1}),e(r,null,{default:l(()=>[e(P,{dense:"",modelValue:c.value,"onUpdate:modelValue":a[2]||(a[2]=v=>c.value=v),options:p,label:"Seleccione",filled:"",autofocus:""},null,8,["modelValue"])]),_:1})]),_:1})):D("",!0),t.value&&!u.value?(f(),Q(F,{key:1,class:"bg-deep-purple-1"},{default:l(()=>[e(r,null,{default:l(()=>a[10]||(a[10]=[i("Total")])),_:1}),e(r,null,{default:l(()=>[e(U,{class:"fc-bluegrey text-h4 fw-sbold"},{default:l(()=>[i("$ "+b(t.value),1)]),_:1}),e(U,{caption:""},{default:l(()=>[i("$ "+b((parseFloat(o.value.total)+parseFloat(t.value)).toFixed(2)),1)]),_:1})]),_:1})]),_:1})):D("",!0)]),_:1}),c.value&&!u.value?(f(),Q(pe,{key:0,align:"between"},{default:l(()=>[e(C,{color:"primary",label:"Cancelar",flat:"","no-caps":""}),e(C,{color:"primary",label:"Cobrar",onClick:G})]),_:1})):D("",!0)]),_:1}))}},ve={class:"bg-primary row items-center justify-between q-pa-md text-white"},fe={class:"text-h4"},ye={class:"text-right"},be={class:"fw-bold text-h4"},ge={class:"row items-center"},_e={class:"row"},ke={class:"bg-grey-2 row items-stretch justify-between q-pa-sm"},Ve={class:"text-h5 fw-sbold fc-primary"},Qe={class:"text-h6 fs-inc3 fw-bold fc-negative"},xe={__name:"CashDesk",props:{data:{type:Object,default:null},inc:{type:Number,default:0}},emits:["pay"],setup(q,{emit:T}){const d=[{id:"TBA",desc:"Tarjeta Credito/Debito BBVA (Bancomer)"},{id:"TDB",desc:"Transferencia/Deposito BBVA (Bancomer)"},{id:"TSA",desc:"Tarjeta Credito/Debito Santander"},{id:"TDA",desc:"Transferencia/Deposito Santander"},{id:"TSC",desc:"Tarjeta Credito/Debito Scotiabank"},{id:"TDS",desc:"Transferencia/Deposito Scotiabank"}],y=q,E=T,o=m({EFE:0,DIG:{id:null,val:0}}),c=m(y.data),p=m(y.inc),g=j(()=>(parseFloat(o.value.EFE)+parseFloat(o.value.DIG.val)).toFixed(2)),_=()=>{E("pay",o.value)};return(V,t)=>c.value?(f(),Q(R,{key:0},{default:l(()=>[n("div",ve,[n("div",null,[t[5]||(t[5]=n("div",{class:"fs-dec3"},"TICKET",-1)),n("div",fe,b(c.value.ticket),1)]),n("div",ye,[t[6]||(t[6]=n("div",{class:"fs-dec3"},"IVA",-1)),n("div",be,"$ "+b(p.value),1)])]),e(O,{class:"q-pa-none",onSubmit:_},{default:l(()=>[e(H,null,{default:l(()=>[n("div",ge,[t[7]||(t[7]=n("div",{class:"col-3"},"Efectivo",-1)),e(A,{class:"col",modelValue:o.value.EFE,"onUpdate:modelValue":t[0]||(t[0]=u=>o.value.EFE=u),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4"},null,8,["modelValue"]),parseFloat(o.value.EFE)?(f(),Q(C,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:t[1]||(t[1]=u=>o.value.EFE=0)})):D("",!0)])]),_:1}),e(H,null,{default:l(()=>[n("div",_e,[e(P,{class:"col-3",modelValue:o.value.DIG.id,"onUpdate:modelValue":t[2]||(t[2]=u=>o.value.DIG.id=u),options:d,label:"Terminal","option-value":"id","emit-value":"","option-label":"id",dense:""},{option:l(u=>[e(F,Y(J(u.itemProps)),{default:l(()=>[e(r,null,{default:l(()=>[e(U,{class:"text-bold"},{default:l(()=>[i(b(u.opt.id),1)]),_:2},1024),e(U,{caption:""},{default:l(()=>[i(b(u.opt.desc),1)]),_:2},1024)]),_:2},1024)]),_:2},1040)]),_:1},8,["modelValue"]),e(A,{class:"col",modelValue:o.value.DIG.val,"onUpdate:modelValue":t[3]||(t[3]=u=>o.value.DIG.val=u),type:"number",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4"},null,8,["modelValue"]),parseFloat(o.value.DIG.val)?(f(),Q(C,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:t[4]||(t[4]=u=>{o.value.DIG.val=0,o.value.DIG.id=null})})):D("",!0)])]),_:1}),e(S),n("div",ke,[n("div",null,[g.value>=p.value?(f(),h(L,{key:0},[t[8]||(t[8]=n("div",{class:"fs-dec1"},"Cambio:",-1)),n("div",Ve,"$ "+b((g.value-p.value).toFixed(2)),1)],64)):(f(),h(L,{key:1},[t[9]||(t[9]=n("div",{class:"fs-dec1"},"Falta:",-1)),n("div",Qe,"$ "+b((p.value-g.value).toFixed(2)),1)],64))]),n("div",null,[g.value>=p.value?(f(),Q(C,{key:0,color:"positive",icon:"fas fa-dollar-sign",label:"Pagar",type:"submit",class:"full-height"})):D("",!0)])])]),_:1})]),_:1})):D("",!0)}};const Fe={key:0,class:"text-right"},De={class:"row justify-center"},Ye={__name:"IvaLayout",setup(q){const T=W(),d=z(),y=re(),E=d.series,o=m(null),c=m(""),p=m(null),g=m(0),_=m(0),V=m(0),t=m({state:!1}),u=m(null),G=j(()=>o.value&&c.value.length),N=async()=>{p.value=null,g.value=0;let v=o.value,s=c.value,I=`http://${d.session.store.ip}/access/public/iva/ticket?serie=${v}&folio=${s}`;M.get(I).then(x=>{p.value=x.data}).catch(x=>{console.log(x);let w=x.response.status,B=x.response.data;console.log(w),console.log(B),y.notify({html:!0,message:B.message,color:"negative",position:"center"})})},$=({_inc:v,_iva:s,impresora:k,_monto:I})=>{console.log(v,s,k,I),u.value=k,g.value=parseFloat(v),_.value=parseFloat(s),V.value=parseFloat(I),t.value.state=!0},a=v=>{console.log("pagando..."),console.log(v);let s=d.session.store.ip,k=`${d.session.name} - ${d.session.store.alias}`,I=`http://${s}/access/public/iva/create`,x={modes:v,by:k,ticket:p.value.ticket,iva:_.value,monto:V.value,impresora:u.value};console.log(x),y.loading.show({message:"Imprimiendo..."}),console.log(x),M.post(I,x).then(w=>{console.log(w.data);let B=w.data;y.loading.hide(),t.value.state=!1,p.iva=null,p.value=null,y.notify({html:!0,color:"positive",position:"center",message:`<span class="fs-inc2"> El ticket <b>${B.ticket}</b> fue generado! </span>`}),B.printed||y.notify({html:!0,color:"negative",position:"top",icon:"fas fa-bugs",message:'<span class="fs-inc2"> No se pudo emitir el ticket, la conexion a la impresora no esta disponible! </span>'})}).catch(w=>{console.log(w),y.loading.hide()})};return d.session.rol=="aux"||d.session.rol=="gen"||d.session.rol=="aud"||d.session.rol=="root"||d.session.rol=="caj"||(y.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),T.replace("/")),(v,s)=>(f(),Q(ne,{view:"hHh Lpr fFf"},{default:l(()=>[e(te,{class:"transparent text-dark",bordered:""},{default:l(()=>[e(ie),e(S),e(ae,{class:"justify-between"},{default:l(()=>[n("div",null,[s[3]||(s[3]=i("Helpers ")),e(X,{name:"navigate_next",color:"primary"}),s[4]||(s[4]=i()),s[5]||(s[5]=n("span",{class:"text-h6"},"IVA",-1))]),e(C,{color:"primary",icon:"add"},{default:l(()=>[e(le,null,{default:l(()=>[s[6]||(s[6]=n("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1)),e(S),e(O,{dense:"",onSubmit:N,class:"q-gutter-md q-pa-md"},{default:l(()=>[e(P,{modelValue:o.value,"onUpdate:modelValue":s[0]||(s[0]=k=>o.value=k),options:Z(E),label:"Serie",autofocus:""},null,8,["modelValue","options"]),e(A,{modelValue:c.value,"onUpdate:modelValue":s[1]||(s[1]=k=>c.value=k),type:"number",label:"Folio"},null,8,["modelValue"]),G.value?(f(),h("div",Fe,[e(C,{type:"submit",color:"primary",icon:"search"})])):D("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(ue,null,{default:l(()=>[e(se,{class:"bg-grey-3",padding:""},{default:l(()=>[n("div",De,[e(ee,{name:"bounce"},{default:l(()=>[p.value?(f(),Q(ce,{key:0,data:p.value,onOpenCashDesk:$},null,8,["data"])):D("",!0)]),_:1})]),e(oe,{modelValue:t.value.state,"onUpdate:modelValue":s[2]||(s[2]=k=>t.value.state=k)},{default:l(()=>[e(xe,{data:p.value,inc:g.value,onPay:a},null,8,["data","inc"])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Ye as default};
