import{Q as A}from"./QSeparator.332e683a.js";import{aE as B,u as I,r as d,c as E,aW as O,o as k,a as R,w as t,e as a,f as r,Y as b,Q as v,h as P}from"./index.88b0e408.js";import{Q as T}from"./QSelect.b285f46a.js";import{Q as M}from"./QToolbar.47aa1402.js";import{Q as H}from"./QHeader.b3bb0a79.js";import{Q as S}from"./QInput.0ea8e4ab.js";import{Q as D}from"./QTable.abda7be7.js";import{Q as L}from"./QDate.d84ec1eb.js";import{u as N,Q as $,a as V}from"./use-quasar.f8ef9c2a.js";import{Q as U}from"./QCardActions.f7144987.js";import{Q as j}from"./QDialog.fcfa48c1.js";import{Q as Y,a as G}from"./QLayout.d8587efb.js";import"./AppFullscreen.1a9b1030.js";import"./auto.ba62c17c.js";import{d as q}from"./dayjs.min.cbcf888d.js";import{E as K}from"./exceljs.min.9e24d01d.js";import"./jspdf.plugin.autotable.fa71905d.js";import{_ as W}from"./UserToolbar.42c4b87a.js";import{A as J}from"./assistApi.2e43d6ae.js";import{u as z}from"./VDB.18de019a.js";import{a as X}from"./axios.9ab26c22.js";import"./use-key-composition.52ad584e.js";import"./uid.937d8ee7.js";import"./position-engine.e84b4dfa.js";import"./rtl.276c3f1b.js";import"./QResizeObserver.0c0a6833.js";import"./QList.31f49c5a.js";import"./QLinearProgress.8f072e99.js";import"./QCheckbox.220492ce.js";import"./use-render-cache.3aae9b27.js";import"./date.2a8506ad.js";import"./_commonjsHelpers.88e99c8f.js";import"./ClosePopup.3afec617.js";import"./axios.ba7b1b0e.js";const Z={class:"col"},ee={class:"col"},oe={class:"row"},ae={class:"row"},le={class:"col"},te={class:"q-pa-md"},Le={__name:"BoxesReport",setup(se){const n=N();B();const _=I(),C=z(),u=d(!1),p=d(null),m=d({opts:[],val:null}),c=d({columns:[{name:"cash",label:"CAJA",field:o=>o.TERMINAL,align:"left",sortable:!0},{name:"ticket",label:"TICKET",field:o=>o.TICKET,align:"left",sortable:!0},{name:"cliet",label:"CLIENTE",field:o=>o.CLIENTE,align:"left",sortable:!0},{name:"date",label:"FECHA",field:o=>o.FECHA,align:"left",sortable:!0},{name:"hour",label:"HORA",field:o=>o.HORA,align:"left",sortable:!0},{name:"fop",label:"FORMA DE PAGO",field:o=>o.FORMA_PAGO,align:"left",sortable:!0},{name:"import",label:"IMPORTE",field:o=>parseFloat(o.IMPORTE),align:"left",sortable:!0}],pagination:{rowsPerPage:20},filter:""}),w=d([]),i=d({val:null,opts:[]});E(()=>n.platform.is.mobile);const g=E(()=>w.value.filter(o=>i.value.val?o.FORMA_PAGO==i.value.val.DESFPA:o)),y=async()=>{n.loading.show({message:"Cargando Informacion"}),console.log("se inicia el init");const o=await J.index();if(!o.error){console.log(o),m.value.opts=o;let e=new Date,s=q(e).format("YYYY/MM/DD");p.value=s,console.log(s),n.loading.hide()}},Q=async()=>{console.log(m.value.val.ip_address),n.loading.show({message:"Obteniendo Registros"}),console.log(p.value);let e=`http://${m.value.val.ip_address}/access/public/reports/getCashCob`;const s=await X.post(e,{filt:p.value});s.status!=200?console.log(s):(console.log(s.data),w.value=s.data.formaspagos,i.value.opts=s.data.formas,u.value=!1,n.loading.hide())};C.session.rol==="adm"||C.session.rol==="root"?y():(n.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),_.replace("/"));const h=()=>{n.loading.show({message:"Importando Ticket"});const o=new K.Workbook;o.addWorksheet("Venta").addTable({name:"Venta",ref:"A1",headerRow:!0,totalsRow:!0,style:{showRowStripes:!0},columns:[{name:"Terminal",filterButton:!0},{name:"Tickets",filterButton:!0},{name:"Cliente",filterButton:!0},{name:"Fecha",filterButton:!0},{name:"Hora",filterButton:!0},{name:"Forma de Pago",filterButton:!0},{name:"Importe",filterButton:!0,totalsRowFunction:"sum"}],rows:g.value.map(l=>[l.TERMINAL,l.TICKET,l.CLIENTE,l.FECHA,l.HORA,l.FORMA_PAGO,parseFloat(l.IMPORTE)])}),(async()=>{const l=await o.xlsx.writeBuffer(),x=new Blob([l],{type:"application/octet-stream"}),F=URL.createObjectURL(x),f=document.createElement("a");f.href=F,f.download="ReporteCajas.xlsx",document.body.appendChild(f),f.click(),document.body.removeChild(f)})(),n.loading.hide()};return(o,e)=>{const s=O("router-view");return k(),R(Y,{view:"hHh Lpr fFf"},{default:t(()=>[a(G,null,{default:t(()=>[a(H,{class:"bg-grey-3 text-dark",bordered:""},{default:t(()=>[a(W),a(A),a(M,{class:"justify-between row"},{default:t(()=>[r("div",Z,[e[8]||(e[8]=r("span",{class:"text-grey"},"Helpers",-1)),a(b,{name:"navigate_next",color:"primary"}),e[9]||(e[9]=r("span",{class:"text-h6"},"Cajas Abiertas",-1))]),r("div",ee,[r("div",oe,[e[10]||(e[10]=r("div",{class:"col"},null,-1)),a(v,{color:"primary",icon:"event",onClick:e[0]||(e[0]=l=>u.value=!u.value),flat:"",round:"",disable:!m.value.val},null,8,["disable"]),a(v,{color:"primary",icon:"download",onClick:h,flat:"",round:"",disable:g.value.length<=0},null,8,["disable"]),a(T,{class:"col",modelValue:m.value.val,"onUpdate:modelValue":[e[1]||(e[1]=l=>m.value.val=l),Q],options:m.value.opts,label:"Sucursales",filled:"","option-label":"name",dense:""},null,8,["modelValue","options"])])])]),_:1})]),_:1}),a(D,{title:"Tickets",rows:g.value,pagination:c.value.pagination,filter:c.value.filter,columns:c.value.columns},{"top-right":t(()=>[r("div",ae,[r("div",le,[a(S,{borderless:"",dense:"",debounce:"300",modelValue:c.value.filter,"onUpdate:modelValue":e[2]||(e[2]=l=>c.value.filter=l),placeholder:"Buscar"},{append:t(()=>[a(b,{name:"search"})]),_:1},8,["modelValue"])]),a(A,{spaced:"",inset:"",vertical:"",dark:""}),a(T,{class:"col",modelValue:i.value.val,"onUpdate:modelValue":e[4]||(e[4]=l=>i.value.val=l),options:i.value.opts,label:"Formas de pago",filled:"","option-label":"DESFPA",dense:""},{append:t(()=>[i.value.val?(k(),R(b,{key:0,name:"close",onClick:e[3]||(e[3]=l=>i.value.val=null)})):P("",!0)]),_:1},8,["modelValue","options"])])]),_:1},8,["rows","pagination","filter","columns"]),a(j,{modelValue:u.value,"onUpdate:modelValue":e[7]||(e[7]=l=>u.value=l)},{default:t(()=>[a($,{class:"my-card"},{default:t(()=>[a(V,null,{default:t(()=>[r("div",te,[e[11]||(e[11]=r("div",{class:"q-pb-sm"},null,-1)),a(L,{modelValue:p.value,"onUpdate:modelValue":e[5]||(e[5]=l=>p.value=l),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),a(V,null,{default:t(()=>[a(U,{align:"right"},{default:t(()=>[a(v,{flat:"",icon:"close",color:"negative",onClick:e[6]||(e[6]=l=>u.value=!u.value)}),a(v,{flat:"",icon:"check",color:"positive",onClick:Q})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(s)]),_:1})]),_:1})}}};export{Le as default};
