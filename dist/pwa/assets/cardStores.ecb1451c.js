import{Q as c}from"./QSeparator.6afdd730.js";import{r as u,c as T,o as z,a as G,w as n,u as W,e as o,i as l,Y as X,a4 as Q,f as m,Q as j}from"./index.7ded638f.js";import{Q as V}from"./QSelect.855981be.js";import{Q as B}from"./QInput.b14ac6c2.js";import{Q as Z}from"./QToolbar.ef454b06.js";import{Q as ee}from"./QHeader.47cd956a.js";import{Q as R,a as g}from"./QCard.f0e183b6.js";import{Q as te}from"./QForm.d3c06739.js";import{Q as S}from"./QTable.30fff041.js";import{Q as ae}from"./QPage.7674c300.js";import{Q as oe,a as se}from"./QLayout.9d5a7289.js";import{u as le}from"./VDB.733f137f.js";import{_ as ne}from"./UserToolbar.703d99a0.js";import{a as D}from"./axios.f1f32898.js";import{A as ie}from"./assistApi.1e6ecf0d.js";import{e as I}from"./export-file.dc78ba05.js";import{u as re}from"./use-quasar.ef17de3c.js";import{d as ce}from"./date.9cf0417f.js";import"./jspdf.plugin.autotable.eabbebae.js";import"./use-key-composition.c6b4d655.js";import"./uid.42677368.js";import"./position-engine.e4f86561.js";import"./QDialog.05f54e67.js";import"./rtl.b51694b1.js";import"./format.2bc25e5f.js";import"./QResizeObserver.8a64e691.js";import"./QList.7097774e.js";import"./QLinearProgress.865c0ebb.js";import"./QCheckbox.c2583d57.js";import"./QCardActions.df110778.js";import"./ClosePopup.ce59bb50.js";import"./axios.ae0a941c.js";import"./_commonjsHelpers.88e99c8f.js";const de=l("span",{class:"text-grey"},"Helpers",-1),ue=l("span",{class:"text-h6"},"Tarjetas",-1),me={class:"row"},pe={class:"q-mb-lg row"},fe=l("div",{class:"text-h6"},"Bauchers",-1),ve={class:"text-center text-h6"},he=l("div",{class:"text-h6"},"Cobros",-1),be={class:"text-center text-h6"},ge=l("div",{class:"text-h6"},"Diferencia",-1),_e={class:"text-center text-h6"},Ce={class:"row"},xe={class:"col"},Ae={class:"row"},Ee={class:"row"},Te={class:"col"},Se={class:"row"},ye={class:"col"},we={class:"row"},Ne={class:"col"},ct={__name:"cardStores",setup(ke){const y=le(),i=re(),$=W(),_=u(null),r=u([]),w=u([]),N=u(null),d=u({val:"SELECCIONA CAJA",opts:[]}),p=u({val:"SELECCIONA SUCURSAL",opts:[]}),x=u([{name:"bauchers",label:"Baucher",field:t=>t}]),v=u([{name:"terminal",label:"Caja",align:"left",field:t=>t.TERMINAL},{name:"ticket",label:"Ticket",field:t=>t.TICKET},{name:"total",label:"Total",field:t=>t.TARJETAS},{name:"fecha",label:"Fecha",field:t=>t.FECHA},{name:"hora",label:"Hora",field:t=>t.HORA},{name:"cliente",label:"Cliente",align:"left",field:t=>t.CLIENTE}]),h=T(()=>d.value.val?w.value.filter(t=>t.TERMINAL==d.value.val.DESTER):[]),k=T(()=>{if(r.value.length>0){let t=[...r.value];return h.value.filter(s=>{const e=t.indexOf(s.TARJETAS);return e!==-1?(t.splice(e,1),!0):!1})}else return[]}),A=T(()=>{if(r.value.length>0){let t=[...r.value];return h.value.filter(s=>{const e=t.indexOf(s.TARJETAS);return e!==-1?(t.splice(e,1),!1):!0})}else return h.value}),E=T(()=>{let t=[...h.value];return r.value.filter(s=>{const e=t.findIndex(a=>a.TARJETAS===s);return e!==-1?(t.splice(e,1),!1):!0})}),L=()=>{if(_.value){r.value.unshift(_.value),_.value=null;const t=P(E.value,A.value);t.length>0?(i.notify({message:`Se encontr\xF3 una coincidencia: Combinaci\xF3n: ${t[0].combinacion.map(s=>s).join(" + ")} = ${t[0].monto}, Ticket: ${t[0].ticket}`,type:"positive",position:"center"}),r.value.unshift(t[0].monto),t[0].combinacion.forEach(s=>{const e=r.value.findIndex(a=>a==s);e!==-1&&r.value.splice(e,1)})):console.log("No se encontraron coincidencias.")}},F=async()=>{const t=ce.formatDate(new Date,"YYYY-MM-DD");console.log("Recibiendo Datos :)"),i.loading.show({message:"Obteniendo datos"}),y.session.store.ip;const s=ie.index();console.log(s),s.then(e=>{console.log(e),N.value=t,p.value.opts=e,i.loading.hide()})},O=async t=>{console.log(t.ip_address),i.loading.show({message:"Obteniendo datos"});let s=`http://${t.ip_address}/access/public/reports/getCashCard`;D.get(s).then(e=>{console.log(e),d.value.val="SELECCIONA CAJA",w.value=e.data.formaspagos,d.value.opts=e.data.terminales,i.loading.hide()}).catch(e=>console.log(e))},J=async t=>{console.log(t),i.loading.show({message:"Obteniendo datos"});let s=`http://${p.value.val.ip_address}/access/public/reports/getCashCard/${t}`;D.get(s).then(e=>{console.log(e),d.value.val="SELECCIONA CAJA",w.value=e.data.formaspagos,d.value.opts=e.data.terminales,i.loading.hide()}).catch(e=>console.log(e))},U=()=>{const t=[x.value.map(e=>b(e.label))].concat(E.value.map(e=>x.value.map(a=>b(typeof a.field=="function"?a.field(e):e[a.field===void 0?a.name:a.field],a.format,e)).join(","))).join(`\r
`);I("SobrantesBauchers.csv",t,"text/csv")!==!0?i.notify({message:"Browser denied file download...",color:"negative",icon:"warning"}):i.notify({message:"Descarga Completa :)",color:"positive",icon:"check",position:"center"})},H=()=>{const t=[v.value.map(e=>b(e.label))].concat(A.value.map(e=>v.value.map(a=>b(typeof a.field=="function"?a.field(e):e[a.field===void 0?a.name:a.field],a.format,e)).join(","))).join(`\r
`);I("BucherFaltantes.csv",t,"text/csv")!==!0?i.notify({message:"Browser denied file download...",color:"negative",icon:"warning"}):i.notify({message:"Descarga Completa :)",color:"positive",icon:"check",position:"center"})},M=()=>{const t=[v.value.map(e=>b(e.label))].concat(k.value.map(e=>v.value.map(a=>b(typeof a.field=="function"?a.field(e):e[a.field===void 0?a.name:a.field],a.format,e)).join(","))).join(`\r
`);I("BauchersEncontrados.csv",t,"text/csv")!==!0?i.notify({message:"Browser denied file download...",color:"negative",icon:"warning"}):i.notify({message:"Descarga Completa :)",color:"positive",icon:"check",position:"center"})},b=(t,s,e)=>{let a=s!==void 0?s(t,e):t;return a=a==null?"":String(a),a=a.split('"').join('""'),/^\d{1,2}-\d{4}$/.test(a)&&(a=`'${a}`),`"${a}"`},P=(t,s)=>{const e=Y(t),a=[];return e.forEach(f=>{const q=f.reduce((C,K)=>Number(C)+Number(K),0);s.forEach(C=>{C.TARJETAS==q&&a.push({combinacion:f,ticket:C.TICKET,monto:C.TARJETAS})})}),a},Y=t=>{const s=[];for(let e=0;e<1<<t.length;e++){const a=[];for(let f=0;f<t.length;f++)e&1<<f&&a.push(t[f]);a.length>0&&s.push(a)}return s};return y.session.rol=="root"||y.session.rol=="adm"?F():(i.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$.replace("/")),(t,s)=>(z(),G(oe,{view:"hHh Lpr fFf"},{default:n(()=>[o(se,null,{default:n(()=>[o(ae,{padding:""},{default:n(()=>[o(ee,{class:"bg-grey-3 text-dark",bordered:""},{default:n(()=>[o(ne),o(c),o(Z,{class:"justify-between"},{default:n(()=>[l("div",null,[de,o(X,{name:"navigate_next",color:"primary"}),ue]),l("div",me,[o(V,{modelValue:p.value.val,"onUpdate:modelValue":[s[0]||(s[0]=e=>p.value.val=e),O],options:p.value.opts,"option-label":"name",label:"Sucursal",outlined:"",dense:""},null,8,["modelValue","options"]),o(c,{spaced:"",inset:"",vertical:"",dark:""}),o(V,{modelValue:d.value.val,"onUpdate:modelValue":s[1]||(s[1]=e=>d.value.val=e),options:d.value.opts,"option-label":"DESTER",label:"Caja",outlined:"",dense:""},null,8,["modelValue","options"]),o(c,{spaced:"",inset:"",vertical:"",dark:""}),o(B,{modelValue:N.value,"onUpdate:modelValue":[s[2]||(s[2]=e=>N.value=e),J],type:"date",outlined:"",dense:"",disable:p.value.val==null||p.value.val=="SELECCIONA SUCURSAL"},null,8,["modelValue","disable"])])]),_:1})]),_:1}),l("div",pe,[o(R,{class:"my-card col",bordered:""},{default:n(()=>[o(g,null,{default:n(()=>[fe]),_:1}),o(g,null,{default:n(()=>[l("div",ve,"$ "+Q(r.value.reduce((e,a)=>Number(Number(e)+Number(a)).toFixed(2),0)),1)]),_:1})]),_:1}),o(c,{spaced:"",inset:"",vertical:"",dark:""}),o(R,{class:"my-card col"},{default:n(()=>[o(g,null,{default:n(()=>[he]),_:1}),o(g,null,{default:n(()=>[l("div",be,"$ "+Q(m(h).reduce((e,a)=>Number(Number(e)+Number(a.TARJETAS)).toFixed(2),0)),1)]),_:1})]),_:1}),o(c,{spaced:"",inset:"",vertical:"",dark:""}),o(R,{class:"my-card col"},{default:n(()=>[o(g,null,{default:n(()=>[ge]),_:1}),o(g,null,{default:n(()=>[l("div",_e,"$ "+Q(Number(Number(r.value.reduce((e,a)=>Number(Number(e)+Number(a)).toFixed(2),0))-Number(m(h).reduce((e,a)=>Number(Number(e)+Number(a.TARJETAS)).toFixed(2),0))).toFixed(2)),1)]),_:1})]),_:1})]),o(te,{onSubmit:L,class:"q-gutter-md"},{default:n(()=>[o(B,{modelValue:_.value,"onUpdate:modelValue":s[3]||(s[3]=e=>_.value=e),type:"number",label:"IMPORTE",outlined:"",autofocus:"",min:0,step:"any",dense:"","input-class":"q-pl-md",disable:d.value.val=="SELECCIONA CAJA"},null,8,["modelValue","min","disable"])]),_:1}),o(c,{spaced:"",inset:"",vertical:"",dark:""}),l("div",Ce,[l("div",null,[o(S,{title:"LISTA",rows:r.value,"row-key":"name",columns:x.value,pagination:{rowsPerPage:9},"hide-bottom":""},null,8,["rows","columns"])]),o(c,{spaced:"",inset:"",vertical:"",dark:""}),l("div",xe,[l("div",Ae,[o(S,{title:"Bauchers Faltantes",rows:m(E),"row-key":"name",class:"col",columns:x.value},{"top-right":n(()=>[l("div",Ee,[o(c,{spaced:"",inset:"",vertical:"",dark:""}),l("div",Te,[o(j,{color:"primary",icon:"archive",dense:"","no-caps":"",flat:"",round:"",onClick:U,disable:!(m(E).length>0)},null,8,["disable"])])])]),_:1},8,["rows","columns"]),o(c,{spaced:"",inset:"",vertical:"",dark:""}),o(S,{title:"Cobros Faltantes",rows:m(A),"row-key":"name",class:"col",columns:v.value},{"top-right":n(()=>[l("div",Se,[o(c,{spaced:"",inset:"",vertical:"",dark:""}),l("div",ye,[o(j,{color:"primary",icon:"archive",dense:"","no-caps":"",flat:"",round:"",onClick:H,disable:!(m(A).length>0)},null,8,["disable"])])])]),_:1},8,["rows","columns"])]),o(c,{spaced:"",inset:"",vertical:"",dark:""}),o(S,{title:"Cobros Encontrados",rows:m(k),"row-key":"name",columns:v.value},{"top-right":n(()=>[l("div",we,[o(c,{spaced:"",inset:"",vertical:"",dark:""}),l("div",Ne,[o(j,{color:"primary",icon:"archive",dense:"","no-caps":"",flat:"",round:"",onClick:M,disable:!(m(k).length>0)},null,8,["disable"])])])]),_:1},8,["rows","columns"])])])]),_:1})]),_:1})]),_:1}))}};export{ct as default};
