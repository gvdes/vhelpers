import{Q as S}from"./QSeparator.9b22600b.js";import{r as c,c as P,T as Y,o as v,a as V,w as a,e,a3 as n,a4 as b,f,h as F,Q as I,i as o,ax as J,ay as W,g as N,a1 as M,u as X,Y as Z,_ as ee}from"./index.6553c4a3.js";import{a as x,b as u,Q as U,c as A,d as ae}from"./QSelect.1376d70e.js";import{Q as G}from"./QInput.9cc45321.js";import{Q as R}from"./QForm.17d476a6.js";import{Q as te}from"./QToolbar.b4a2aaab.js";import{Q as le}from"./QHeader.e3c4603e.js";import{Q as oe}from"./QDialog.03672914.js";import{Q as se}from"./QPage.fecb4179.js";import{Q as ne,a as ie}from"./QLayout.b7211c56.js";import{u as z}from"./VDB.a74ead22.js";import{_ as ue}from"./UserToolbar.38961c8d.js";import{a as H}from"./axios.f1f32898.js";import{Q as K,a as O,u as re}from"./use-quasar.2618ef58.js";import{Q as de}from"./QList.a86a105f.js";import{Q as ce}from"./QCardActions.b485e075.js";import{a as pe}from"./axios.30672b3a.js";import"./use-key-composition.a57e001a.js";import"./uid.42677368.js";import"./position-engine.3f787d31.js";import"./rtl.b51694b1.js";import"./QResizeObserver.718ce7c7.js";import"./ClosePopup.d20223ef.js";const me={__name:"Ticket",props:{data:{type:Object,default:null}},emits:["openCashDesk"],setup(q,{emit:E}){const i=q,g=z(),t=c(i.data),p=c(null),_=["6%","8%","16%"],r={"6%":.06,"8%":.08,"16%":.16},y=c({body:null,val:null}),k=c(i.data.total),s=P(()=>{if(p.value&&t.value){let $=r[p.value],d=parseFloat(k.value).toFixed(2);return parseFloat((d*$).toFixed(2))}return 0}),l=P(()=>k.value>i.data.total),j=()=>{E("openCashDesk",{_inc:s.value,_iva:r[p.value],impresora:y.value.val.ip_address,_monto:k.value}),console.log(k.value)};return Y(()=>{console.log("El componente ha muerto!!")}),(async()=>{let $=g.session.store.id;console.log($);try{let d=await pe.get(`/cashier/getPrinters/${$}`);d.status==200&&(y.value.body=d.data,console.log("Impresoras listas :)"))}catch(d){console.log(d),$q.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}})(),($,d)=>(v(),V(K,{style:{"min-width":"400px"},flat:"",bordered:""},{default:a(()=>[e(de,{bordered:""},{default:a(()=>[e(x,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Ticket")]),_:1}),e(u,null,{default:a(()=>[n(b(t.value.ticket),1)]),_:1})]),_:1}),e(x,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Cliente")]),_:1}),e(u,null,{default:a(()=>[n(b(t.value.cliente),1)]),_:1})]),_:1}),e(x,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Fecha")]),_:1}),e(u,null,{default:a(()=>[n(b(t.value.fecha),1)]),_:1})]),_:1}),e(x,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Total")]),_:1}),e(u,null,{default:a(()=>[n("$ "+b(t.value.total),1)]),_:1})]),_:1}),e(x,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Impresora")]),_:1}),e(u,null,{default:a(()=>[e(U,{dense:"",modelValue:y.value.val,"onUpdate:modelValue":d[0]||(d[0]=C=>y.value.val=C),options:y.value.body,label:"Impresora","option-label":"name",filled:"",autofocus:""},null,8,["modelValue","options"])]),_:1})]),_:1}),e(S),e(x,null,{default:a(()=>[e(u,null,{default:a(()=>[n("Monto")]),_:1}),e(u,null,{default:a(()=>[e(G,{dense:"",modelValue:k.value,"onUpdate:modelValue":d[1]||(d[1]=C=>k.value=C),type:"number",label:"Monto",filled:"",autofocus:"","error-message":"El Monto a facturar es mayor que el total de el ticket :x",error:f(l)},null,8,["modelValue","error"])]),_:1})]),_:1}),e(S),y.value.val&&!f(l)?(v(),V(x,{key:0,class:"bg-deep-purple-1"},{default:a(()=>[e(u,null,{default:a(()=>[n("IVA")]),_:1}),e(u,null,{default:a(()=>[e(U,{dense:"",modelValue:p.value,"onUpdate:modelValue":d[2]||(d[2]=C=>p.value=C),options:_,label:"Seleccione",filled:"",autofocus:""},null,8,["modelValue"])]),_:1})]),_:1})):F("",!0),f(s)&&!f(l)?(v(),V(x,{key:1,class:"bg-deep-purple-1"},{default:a(()=>[e(u,null,{default:a(()=>[n("Total")]),_:1}),e(u,null,{default:a(()=>[e(A,{class:"fc-bluegrey text-h4 fw-sbold"},{default:a(()=>[n("$ "+b(f(s)),1)]),_:1}),e(A,{caption:""},{default:a(()=>[n("$ "+b((parseFloat(t.value.total)+parseFloat(f(s))).toFixed(2)),1)]),_:1})]),_:1})]),_:1})):F("",!0)]),_:1}),p.value&&!f(l)?(v(),V(ce,{key:0,align:"between"},{default:a(()=>[e(I,{color:"primary",label:"Cancelar",flat:"","no-caps":""}),e(I,{color:"primary",label:"Cobrar",onClick:j})]),_:1})):F("",!0)]),_:1}))}},fe={class:"bg-primary row items-center justify-between q-pa-md text-white"},ve=o("div",{class:"fs-dec3"},"TICKET",-1),_e={class:"text-h4"},ye={class:"text-right"},be=o("div",{class:"fs-dec3"},"IVA",-1),ge={class:"fw-bold text-h4"},he={class:"row items-center"},ke=o("div",{class:"col-3"},"Efectivo",-1),Ve={class:"row"},Qe={class:"bg-grey-2 row items-stretch justify-between q-pa-sm"},xe=o("div",{class:"fs-dec1"},"Cambio:",-1),Fe={class:"text-h5 fw-sbold fc-primary"},De=o("div",{class:"fs-dec1"},"Falta:",-1),$e={class:"text-h6 fs-inc3 fw-bold fc-negative"},Ce={__name:"CashDesk",props:{data:{type:Object,default:null},inc:{type:Number,default:0}},emits:["pay"],setup(q,{emit:E}){const i=q,g=[{id:"TBA",desc:"Tarjeta Credito/Debito BBVA (Bancomer)"},{id:"TDB",desc:"Transferencia/Deposito BBVA (Bancomer)"},{id:"TSA",desc:"Tarjeta Credito/Debito Santander"},{id:"TDA",desc:"Transferencia/Deposito Santander"},{id:"TSC",desc:"Tarjeta Credito/Debito Scotiabank"},{id:"TDS",desc:"Transferencia/Deposito Scotiabank"}],t=c({EFE:0,DIG:{id:null,val:0}}),p=c(i.data),_=c(i.inc),r=P(()=>(parseFloat(t.value.EFE)+parseFloat(t.value.DIG.val)).toFixed(2)),y=()=>{E("pay",t.value)};return(k,s)=>p.value?(v(),V(K,{key:0},{default:a(()=>[o("div",fe,[o("div",null,[ve,o("div",_e,b(p.value.ticket),1)]),o("div",ye,[be,o("div",ge,"$ "+b(_.value),1)])]),e(R,{class:"q-pa-none",onSubmit:y},{default:a(()=>[e(O,null,{default:a(()=>[o("div",he,[ke,e(G,{class:"col",modelValue:t.value.EFE,"onUpdate:modelValue":s[0]||(s[0]=l=>t.value.EFE=l),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4"},null,8,["modelValue","min"]),parseFloat(t.value.EFE)?(v(),V(I,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:s[1]||(s[1]=l=>t.value.EFE=0)})):F("",!0)])]),_:1}),e(O,null,{default:a(()=>[o("div",Ve,[e(U,{class:"col-3",modelValue:t.value.DIG.id,"onUpdate:modelValue":s[2]||(s[2]=l=>t.value.DIG.id=l),options:g,label:"Terminal","option-value":"id","emit-value":"","option-label":"id",dense:""},{option:a(l=>[e(x,J(W(l.itemProps)),{default:a(()=>[e(u,null,{default:a(()=>[e(A,{class:"text-bold"},{default:a(()=>[n(b(l.opt.id),1)]),_:2},1024),e(A,{caption:""},{default:a(()=>[n(b(l.opt.desc),1)]),_:2},1024)]),_:2},1024)]),_:2},1040)]),_:1},8,["modelValue"]),e(G,{class:"col",modelValue:t.value.DIG.val,"onUpdate:modelValue":s[3]||(s[3]=l=>t.value.DIG.val=l),type:"number",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4"},null,8,["modelValue","min"]),parseFloat(t.value.DIG.val)?(v(),V(I,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:s[4]||(s[4]=l=>{t.value.DIG.val=0,t.value.DIG.id=null})})):F("",!0)])]),_:1}),e(S),o("div",Qe,[o("div",null,[f(r)>=_.value?(v(),N(M,{key:0},[xe,o("div",Fe,"$ "+b((f(r)-_.value).toFixed(2)),1)],64)):(v(),N(M,{key:1},[De,o("div",$e,"$ "+b((_.value-f(r)).toFixed(2)),1)],64))]),o("div",null,[f(r)>=_.value?(v(),V(I,{key:0,color:"positive",icon:"fas fa-dollar-sign",label:"Pagar",type:"submit",class:"full-height"})):F("",!0)])])]),_:1})]),_:1})):F("",!0)}};const Ie=o("span",{class:"text-h6"},"IVA",-1),we=o("div",{class:"q-pa-md bg-grey-2 text-primary"},"Buscar Folio",-1),Te={key:0,class:"text-right"},Ee={class:"row justify-center"},ta={__name:"IvaLayout",setup(q){const E=X(),i=z(),g=re(),t=i.series,p=c(null),_=c(""),r=c(null),y=c(0),k=c(0),s=c(0),l=c({state:!1}),j=c(null),L=P(()=>p.value&&_.value.length),$=async()=>{r.value=null,y.value=0;let D=p.value,m=_.value,w=`http://${i.session.store.ip}/access/public/iva/ticket?serie=${D}&folio=${m}`;H.get(w).then(Q=>{r.value=Q.data}).catch(Q=>{console.log(Q);let T=Q.response.status,B=Q.response.data;console.log(T),console.log(B),g.notify({html:!0,message:B.message,color:"negative",position:"center"})})},d=({_inc:D,_iva:m,impresora:h,_monto:w})=>{console.log(D,m,h,w),j.value=h,y.value=parseFloat(D),k.value=parseFloat(m),s.value=parseFloat(w),l.value.state=!0},C=D=>{console.log("pagando..."),console.log(D);let m=i.session.store.ip,h=`${i.session.name} - ${i.session.store.alias}`,w=`http://${m}/access/public/iva/create`,Q={modes:D,by:h,ticket:r.value.ticket,iva:k.value,monto:s.value,impresora:j.value};console.log(Q),g.loading.show({message:"Imprimiendo..."}),console.log(Q),H.post(w,Q).then(T=>{console.log(T.data);let B=T.data;g.loading.hide(),l.value.state=!1,r.iva=null,r.value=null,g.notify({html:!0,color:"positive",position:"center",message:`<span class="fs-inc2"> El ticket <b>${B.ticket}</b> fue generado! </span>`}),B.printed||g.notify({html:!0,color:"negative",position:"top",icon:"fas fa-bugs",message:'<span class="fs-inc2"> No se pudo emitir el ticket, la conexion a la impresora no esta disponible! </span>'})}).catch(T=>{console.log(T),g.loading.hide()})};return i.session.rol=="aux"||i.session.rol=="gen"||i.session.rol=="aud"||i.session.rol=="root"||i.session.rol=="caj"||(g.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),E.replace("/")),(D,m)=>(v(),V(ne,{view:"hHh Lpr fFf"},{default:a(()=>[e(le,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(ue),e(S),e(te,{class:"justify-between"},{default:a(()=>[o("div",null,[n("Helpers "),e(Z,{name:"navigate_next",color:"primary"}),n(),Ie]),e(I,{color:"primary",icon:"add"},{default:a(()=>[e(ae,null,{default:a(()=>[we,e(S),e(R,{dense:"",onSubmit:$,class:"q-gutter-md q-pa-md"},{default:a(()=>[e(U,{modelValue:p.value,"onUpdate:modelValue":m[0]||(m[0]=h=>p.value=h),options:f(t),label:"Serie",autofocus:""},null,8,["modelValue","options"]),e(G,{modelValue:_.value,"onUpdate:modelValue":m[1]||(m[1]=h=>_.value=h),type:"number",label:"Folio"},null,8,["modelValue"]),f(L)?(v(),N("div",Te,[e(I,{type:"submit",color:"primary",icon:"search"})])):F("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),e(ie,null,{default:a(()=>[e(se,{class:"bg-grey-3",padding:""},{default:a(()=>[o("div",Ee,[e(ee,{name:"bounce"},{default:a(()=>[r.value?(v(),V(me,{key:0,data:r.value,onOpenCashDesk:d},null,8,["data"])):F("",!0)]),_:1})]),e(oe,{modelValue:l.value.state,"onUpdate:modelValue":m[2]||(m[2]=h=>l.value.state=h)},{default:a(()=>[e(Ce,{data:r.value,inc:y.value,onPay:C},null,8,["data","inc"])]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{ta as default};
