import{Q as c}from"./QSeparator.4c3df87b.js";import{r as E,c as q,o as u,a as y,w as i,e as l,f as s,a4 as p,Y as X,a5 as b,h as v,a3 as D,Q as m,b3 as Z,g as Q}from"./index.ee411de5.js";import{Q as ee}from"./QToolbar.4b5eb18f.js";import{Q as le}from"./QHeader.feabcb05.js";import{Q as ae}from"./QTable.0d8943eb.js";import{u as te,Q as T,a as k}from"./use-quasar.772555ff.js";import{Q as oe}from"./QPage.dd71aa4a.js";import{Q as se,a as ie}from"./QLayout.5be6e713.js";import{Q as I,a as S,b as _}from"./QSelect.f84dc228.js";import{Q as F}from"./QInput.bbf81730.js";import{Q as ne}from"./QList.aeab4735.js";import{Q as de}from"./QCardActions.674c9557.js";import{Q as G}from"./QDialog.3a28a0ad.js";import{Q as re}from"./QForm.536ac0a5.js";import{Q as ue}from"./QFooter.436441bd.js";import{C as A}from"./ClosePopup.edf0e745.js";import{u as ve}from"./VDB.4d945a6a.js";import{_ as ce}from"./UserToolbar.bb94b620.js";import{a as B}from"./axios.9ab26c22.js";import{P as pe}from"./ProductsAutocomplete.c0ba5bf8.js";import{a as me}from"./axios.ba7b1b0e.js";import"./QResizeObserver.3a322cf2.js";import"./QLinearProgress.781e6dae.js";import"./QCheckbox.0b33e665.js";import"./use-key-composition.b5343cc0.js";import"./uid.937d8ee7.js";import"./position-engine.bf034c4f.js";import"./rtl.276c3f1b.js";/* empty css                                                                         */const fe={class:"text-bold"},be={class:"row text-h6"},ge={class:"col"},ye={class:"text-bold"},xe={class:"col"},Ee={class:"text-bold"},ke={class:"row items-end"},Ce={class:"text-center"},Ve={class:"col q-pa-xs"},_e={class:"col column q-py-md"},we={class:"col q-pa-xs"},De={class:"row"},Ie={class:"col"},Qe={key:1,class:"col"},Te={class:"row text-center items-center"},Fe={class:"col"},Ae={class:"row text-center items-center"},Pe={class:"col text-h5 text-bold bg-grey-3"},Se={class:"row text-center items-center"},Ge={class:"col"},Ne={class:"col"},Ue={class:"row flex justify-center"},$e={class:"col flex justify-center"},Oe={key:0,class:"col"},Re={key:0,class:"row flex justify-center text-center"},qe={class:"col"},Be={class:"col"},je={class:"text-h5"},ze={key:0,class:"text-center"},Le={class:"row"},kl={__name:"salesOffers",setup(he){const V=ve(),w=te(),f=E({state:!1,val:null,body:null}),C=E({val:null,opts:[]}),N=E({val:null,opts:[]}),t=E({val:null,state:!1}),x=E({state:!1,dafpa:!1}),n=E({EFE:{id:null,val:0},DIG:{id:null,val:0}}),U=[{id:"EFE",desc:"CONTADO EFECTIVO"},{id:"TBA",desc:"TARJETA C/D BANCOMER"},{id:"TSA",desc:"TARJETA C/D SANTANDER"},{id:"TDB",desc:"TRA/DEP BANCOMER"},{id:"TDA",desc:"TRA/DEP Santander"},{id:"TDS",desc:"TRA/DEP Scotiabank"},{id:"C30",desc:"CREDITO"}],r=E([]),$=E({columns:[{name:"code",label:"ARICULO",field:o=>o.code,align:"left"},{name:"description",label:"DESCRIPCION",field:o=>o.description,align:"left"},{name:"amount",label:"CANTIDAD",field:o=>o.amount,align:"center"},{name:"price",label:"PRECIO",field:o=>{var e;return(e=o.price)==null?void 0:e.pivot.price},align:"center"},{name:"total",label:"TOTAL",field:o=>{var e;return o.amount*((e=o.price)==null?void 0:e.pivot.price)},align:"center"}],pagination:{rowsPerPage:0},filter:""}),j=q(()=>{var o,e;return P.value>=0&&(((o=n.value.EFE.id)==null?void 0:o.id)&&n.value.EFE.val>0||((e=n.value.DIG.id)==null?void 0:e.id)&&n.value.DIG.val>0)}),P=q(()=>Number.parseFloat(n.value.DIG.val)+Number.parseFloat(n.value.EFE.val)-r.value.reduce((o,e)=>{var a;return o+e.amount*((a=e.price)==null?void 0:a.pivot.price)},0)),z=async()=>{w.loading.show({message:"Obteniendo Cajas"});let o=V.session.store.ip;console.log(V.session);let e=`http://${o}/access/public/reports/getTerminal`;const a=await B.get(e);a.status!=200?console.log(a):(console.log(a),C.value.opts=a.data,w.loading.hide())},L=o=>{console.log(o)},h=o=>{console.log(o);let e=r.value.findIndex(a=>a.id==o.id);console.log(e),e>=0?(w.notify({message:"El Producto ya esta agregado",type:"negative",position:"center"}),t.value.state=!0,t.value.val=r.value[e],t.value.val.edit=!0):(t.value.state=!0,o.amount=1,o.notes="",o.edit=!1,t.value.val=o)},H=(o,e)=>{let a=r.value.findIndex(d=>d.id==e.id);console.log(a),a>=0&&(t.value.state=!0,t.value.val=r.value[a],t.value.val.edit=!0)},O=()=>{let o=r.value.findIndex(e=>e.id==t.value.val.id);o>=0?r.value.splice(o,1,t.value.val):(console.log(t.value.val),r.value.push(t.value.val))},M=()=>{let o=r.value.findIndex(e=>e.id==t.value.val.id);o>=0&&r.value.splice(o,1)},J=async()=>{let o=V.session.store.id;console.log(o);try{let e=await me.get(`/cashier/getPrinters/${o}`);e.status==200&&(f.value.body=e.data,console.log("Impresoras listas :)"),x.value.state=!0)}catch(e){console.log(e),w.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},Y=o=>{var e;return o.id==((e=n.value.DIG.id)==null?void 0:e.id)},K=o=>{var e;return o.id==((e=n.value.EFE.id)==null?void 0:e.id)},W=async()=>{let e=`http://${V.session.store.ip}/access/public/modify/createTicket`,d={by:`${V.session.name} - ${V.session.store.alias}`,modes:n.value,colab:N.value.val,terminal:C.value.val,impresoras:f.value.val,productos:r.value,cambio:P.value};const g=await B.post(e,d);g.status!=200?console.log(g):(console.log(g.data),f.value={state:!1,val:null,body:null},C.value={val:null,opts:[]},N.value={val:null,opts:[]},t.value={val:null,state:!1},x.value={state:!1,dafpa:!1},n.value={EFE:{id:null,val:0},DIG:{id:null,val:0}},r.value=[],w.notify({message:g.data.mssg,type:"positive",position:"center"}))};return z(),(o,e)=>(u(),y(se,{view:"hHh Lpr fFf"},{default:i(()=>[l(le,{class:"transparent text-dark",bordered:""},{default:i(()=>[l(ce),l(c),l(ee,{class:"justify-between"},{default:i(()=>[s("div",null,[e[19]||(e[19]=p("Helpers ")),l(X,{name:"navigate_next",color:"primary"}),e[20]||(e[20]=p()),e[21]||(e[21]=s("span",{class:"text-h6"},"Cobro Ofertas",-1))]),s("div",null,[e[22]||(e[22]=p("Total $")),s("span",fe,b(r.value.reduce((a,d)=>{var g;return a+d.amount*((g=d.price)==null?void 0:g.pivot.price)},0)),1)])]),_:1})]),_:1}),l(ie,null,{default:i(()=>[l(oe,{class:"bg-grey-3",padding:""},{default:i(()=>[l(T,{class:"my-card"},{default:i(()=>[r.value.length>0?(u(),y(k,{key:0},{default:i(()=>[l(ae,{"hide-bottom":"",rows:r.value,"row-key":"id",columns:$.value.columns,pagination:$.value.pagination,onRowClick:H},null,8,["rows","columns","pagination"])]),_:1})):v("",!0)]),_:1})]),_:1})]),_:1}),l(G,{modelValue:t.value.state,"onUpdate:modelValue":e[6]||(e[6]=a=>t.value.state=a),persistent:"",position:"bottom"},{default:i(()=>[l(T,null,{default:i(()=>[l(k,{class:"bg-grey-4"},{default:i(()=>[s("div",be,[s("div",ge,[e[23]||(e[23]=p("Codigo: ")),s("span",ye,b(t.value.val.code),1)]),s("div",xe,[e[24]||(e[24]=p("Cco: ")),s("span",Ee,b(t.value.val.name),1)]),s("div",null,[t.value.val.edit==!0?D((u(),y(m,{key:0,color:"negative",icon:"delete",onClick:M,flat:"",size:"sm"},null,512)),[[A]]):v("",!0)])]),p(" "+b(t.value.val.description),1)]),_:1}),l(k,null,{default:i(()=>[s("div",ke,[s("div",Ce,[s("div",Ve,[e[25]||(e[25]=s("div",{class:"text-bold text-h6"},"Cantidad:",-1)),l(m,{flat:"",color:"positive",icon:"add",class:"text-h5",onClick:e[0]||(e[0]=a=>t.value.val.amount++)}),l(c,{spaced:"",inset:"",vertical:"",dark:""}),s("div",_e,[D(s("input",{type:"number",min:"1","onUpdate:modelValue":e[1]||(e[1]=a=>t.value.val.amount=a),class:"text-center exo",style:{width:"100px","font-size":"3em",margin:"auto auto",border:"none"}},null,512),[[Z,t.value.val.amount]])]),l(c,{spaced:"",inset:"",vertical:"",dark:""}),l(m,{flat:"",color:"negative",icon:"remove",class:"text-h5",onClick:e[2]||(e[2]=a=>t.value.val.amount>1?t.value.val.amount--:""),disable:t.value.val.amount<=1},null,8,["disable"])])]),l(c,{spaced:"",inset:"",vertical:"",dark:""}),s("div",we,[s("div",De,[s("div",Ie,[l(I,{modelValue:t.value.val.price,"onUpdate:modelValue":e[3]||(e[3]=a=>t.value.val.price=a),options:t.value.val.prices,label:"Precios",filled:"","option-label":"name",dense:""},null,8,["modelValue","options"])]),t.value.val.price?(u(),y(c,{key:0,spaced:"",inset:"",vertical:"",dark:""})):v("",!0),t.value.val.price?(u(),Q("div",Qe,[l(F,{modelValue:t.value.val.price.pivot.price,"onUpdate:modelValue":e[4]||(e[4]=a=>t.value.val.price.pivot.price=a),type:"number",label:"Precio",filled:"",dense:"",error:t.value.val.price.pivot.price<=t.value.val.cost,"error-message":"El importe tiene que ser mayor que el costo"},null,8,["modelValue","error"])])):v("",!0)]),l(c,{spaced:"",inset:"",vertical:"",dark:""}),l(F,{dense:"",filled:"",modelValue:t.value.val.notes,"onUpdate:modelValue":e[5]||(e[5]=a=>t.value.val.notes=a),type:"text",label:"Notas",error:t.value.val.notes.length<=0,"error-message":"Campo Obligatorio"},null,8,["modelValue","error"]),l(c,{spaced:"",inset:"",vertical:"",dark:""}),l(ne,null,{default:i(()=>[l(S,{class:"bg-grey-11"},{default:i(()=>[l(_,{class:"text-left text-caption"},{default:i(()=>e[26]||(e[26]=[p("P x C")])),_:1}),l(_,{class:"text-bold text-center"},{default:i(()=>[p(b(t.value.pieces)+" pzs",1)]),_:1})]),_:1}),l(S,null,{default:i(()=>[l(_,{class:"text-left text-caption"},{default:i(()=>e[27]||(e[27]=[p("Unidades")])),_:1}),l(_,{class:"text-bold text-center"},{default:i(()=>[p(b(t.value.val.amount)+" pzs",1)]),_:1})]),_:1}),l(S,{class:"bg-grey-11"},{default:i(()=>[l(_,{class:"text-left text-caption text-bold"},{default:i(()=>e[28]||(e[28]=[p("Total")])),_:1}),l(_,{class:"text-bold text-center"},{default:i(()=>{var a;return[p("$ "+b(t.value.val.price?t.value.val.amount*((a=t.value.val.price)==null?void 0:a.pivot.price):0),1)]}),_:1})]),_:1})]),_:1})])])]),_:1}),l(de,{align:"center"},{default:i(()=>{var a;return[D(l(m,{flat:"",icon:"close",color:"negative"},null,512),[[A]]),t.value.val.edit==!0?D((u(),y(m,{key:0,flat:"",icon:"edit",color:"warning",onClick:O},null,512)),[[A]]):v("",!0),t.value.val.edit==!1?D((u(),y(m,{key:1,flat:"",icon:"check",color:"positive",onClick:O,disable:((a=t.value.val.price)==null?void 0:a.pivot.price)<=t.value.val.cost||t.value.val.notes.length<=0},null,8,["disable"])),[[A]]):v("",!0)]}),_:1})]),_:1})]),_:1},8,["modelValue"]),l(G,{modelValue:x.value.state,"onUpdate:modelValue":e[15]||(e[15]=a=>x.value.state=a)},{default:i(()=>[l(T,{class:"my-card",style:{width:"700px","max-width":"80vw"}},{default:i(()=>[e[32]||(e[32]=s("div",{class:"bg-primary q-pa-md text-white text-center"},[s("div",{class:"fw-bold text-h6"},"Cobro del documento")],-1)),l(k,null,{default:i(()=>{var a;return[s("div",Te,[e[29]||(e[29]=s("div",{class:"col"}," Forma de pago: ",-1)),s("div",Fe,[l(I,{class:"col-3",modelValue:n.value.EFE.id,"onUpdate:modelValue":e[7]||(e[7]=d=>n.value.EFE.id=d),options:U,"option-value":"id","option-label":"desc",dense:"",filled:"",label:"Forma de pago","option-disable":d=>Y(d)},null,8,["modelValue","option-disable"])])]),l(c,{spaced:"",inset:"",vertical:"",dark:""}),s("div",Ae,[e[30]||(e[30]=s("div",{class:"col"}," Total a pagar: ",-1)),s("div",Pe,b(r.value.reduce((d,g)=>{var R;return d+g.amount*((R=g.price)==null?void 0:R.pivot.price)},0)),1)]),l(c,{spaced:"",inset:"",vertical:"",dark:""}),s("div",Se,[s("div",Ge,b(((a=n.value.EFE.id)==null?void 0:a.id)=="EFE"?"Efectivo":"Importe Cobrado"),1),s("div",Ne,[l(F,{class:"col",modelValue:n.value.EFE.val,"onUpdate:modelValue":e[9]||(e[9]=d=>n.value.EFE.val=d),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4 text-center",filled:""},{after:i(()=>[parseFloat(n.value.EFE.val)?(u(),y(m,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:e[8]||(e[8]=d=>n.value.EFE.val=0)})):v("",!0)]),_:1},8,["modelValue"])])])]}),_:1}),l(k,null,{default:i(()=>{var a;return[s("div",Ue,[s("div",$e,[l(m,{color:"primary",label:"2\xAA Forma de pago",onClick:e[10]||(e[10]=()=>{x.value.dafpa=!x.value.dafpa,n.value.DIG.val=0,n.value.DIG.id=null}),outline:"",rounded:"",dense:"",size:"md",style:{width:"70%"}})]),x.value.dafpa?(u(),Q("div",Oe,[l(I,{class:"col-3",modelValue:n.value.DIG.id,"onUpdate:modelValue":e[11]||(e[11]=d=>n.value.DIG.id=d),options:U,label:"Forma Pago","option-value":"id","option-label":"desc",dense:"",filled:"","option-disable":d=>K(d)},null,8,["modelValue","option-disable"])])):v("",!0)]),l(c,{spaced:"",inset:"",vertical:"",dark:""}),x.value.dafpa?(u(),Q("div",Re,[s("div",qe,b(((a=n.value.DIG.id)==null?void 0:a.id)=="EFE"?"Efectivo":"Importe Cobrado"),1),s("div",Be,[l(F,{class:"col",modelValue:n.value.DIG.val,"onUpdate:modelValue":e[13]||(e[13]=d=>n.value.DIG.val=d),type:"number",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md fw-sbold fs-inc4 text-center",filled:""},{after:i(()=>[parseFloat(n.value.DIG.val)?(u(),y(m,{key:0,color:"primary",icon:"backspace",flat:"",dense:"",round:"",onClick:e[12]||(e[12]=d=>n.value.DIG.val=0)})):v("",!0)]),_:1},8,["modelValue"])])])):v("",!0)]}),_:1}),l(k,{class:"bg-deep-purple-3 row items-center justify-between q-pa-md text-black"},{default:i(()=>[s("div",null,[e[31]||(e[31]=s("div",{class:"fs-dec3"},"Cambio",-1)),s("div",je," $ "+b(P.value),1)]),j.value?(u(),Q("div",ze,[l(m,{color:"primary",icon:"payment",label:"Pagar",onClick:e[14]||(e[14]=a=>f.value.state=!f.value.state)})])):v("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(G,{modelValue:f.value.state,"onUpdate:modelValue":e[18]||(e[18]=a=>f.value.state=a)},{default:i(()=>[l(T,{class:"my-card"},{default:i(()=>[l(k,null,{default:i(()=>e[33]||(e[33]=[s("div",{class:"text-h6 text-center"},"Selecciona Caja e Impresora",-1)])),_:1}),l(k,null,{default:i(()=>[l(re,{onSubmit:W,class:"q-gutter-md"},{default:i(()=>[l(I,{dense:"",modelValue:C.value.val,"onUpdate:modelValue":e[16]||(e[16]=a=>C.value.val=a),options:C.value.opts,label:"Caja",filled:"","option-label":"DESTER"},null,8,["modelValue","options"]),l(c,{spaced:"",inset:"",vertical:"",dark:""}),l(I,{dense:"","option-label":"name",modelValue:f.value.val,"onUpdate:modelValue":e[17]||(e[17]=a=>f.value.val=a),options:f.value.body,label:"Impresora",filled:""},null,8,["modelValue","options"]),s("div",null,[l(m,{label:"Enviar",type:"submit",color:"primary",class:"full-width",disable:f.value.val==null||C.value.val==null},null,8,["disable"])])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(ue,{reveal:"",elevated:"",bordered:"",class:"bg-white"},{default:i(()=>[s("div",Le,[l(pe,{checkState:!1,onInput:L,with_prices:"",onAgregar:h,class:"col"}),r.value.length>0?(u(),y(c,{key:0,spaced:"",inset:"",vertical:"",dark:""})):v("",!0),r.value.length>0?(u(),y(m,{key:1,color:"primary",icon:"send",onClick:J,flat:""})):v("",!0)])]),_:1})]),_:1}))}};export{kl as default};
