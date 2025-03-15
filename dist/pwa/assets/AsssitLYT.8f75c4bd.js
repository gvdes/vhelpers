import{Q as E}from"./QSeparator.6b89e4f2.js";import{r as p,c as v,o as L,a as x,w as i,e as r,f as m,a4 as S,Y as R,a0 as F,a5 as h,Q as I}from"./index.ad93775a.js";import{Q as T}from"./QToolbar.80ed4e2e.js";import{Q as U}from"./QHeader.f08b1aec.js";import{Q as D}from"./QSpace.95f06f4f.js";import{Q}from"./QInput.778f889d.js";import{Q as V}from"./QTable.7df7013c.js";import{Q as M}from"./QPage.8994904c.js";import{Q as w,a as B}from"./QLayout.b8466695.js";import{u as _}from"./VDB.3e486cc6.js";import{_ as k}from"./UserToolbar.e60334de.js";import{A as J}from"./assistApi.2e43d6ae.js";import{u as G}from"./use-quasar.0b385c2f.js";import"./jspdf.plugin.autotable.61723d92.js";import{E as H}from"./exceljs.min.9e24d01d.js";import"./browser.a927a609.js";import"./QResizeObserver.cf4e2aed.js";import"./use-key-composition.f55f5f94.js";import"./uid.937d8ee7.js";import"./QList.ef2ca34f.js";import"./QSelect.5b7237bc.js";import"./position-engine.96014762.js";import"./QDialog.84084cfd.js";import"./rtl.276c3f1b.js";import"./QLinearProgress.0ce831d2.js";import"./QCheckbox.aff41f06.js";import"./QCardActions.5642de55.js";import"./ClosePopup.5a991dac.js";import"./axios.ba7b1b0e.js";import"./axios.9ab26c22.js";import"./_commonjsHelpers.88e99c8f.js";const $={class:"row items-center"},j={class:"col text-h6"},Ne={__name:"AsssitLYT",setup(P){const c=_(),f=G(),d=p({filter:"",report:[]}),b=p([]),C=p({columns:[{name:"ANIO",label:"A\xD1O",field:e=>e.ANIO,sortable:!0,align:"center"},{name:"week",label:"SEMANA",field:e=>e.semana,sortable:!0,align:"center"},{name:"id",label:"ID",field:e=>e.ID,sortable:!0,classes:"bg-white",align:"center"},{name:"name",label:"NOMBRE",field:e=>e.NOMBRE,sortable:!0,classes:"bg-white",align:"left"},{name:"store",label:"SUCURSAL",field:e=>e.SUCURSAL,sortable:!0,classes:"bg-white",align:"left"},{name:"turn",label:"TURNO",field:e=>e.TURNO,sortable:!0,classes:"bg-white",align:"center"},{name:"saturday",label:"SABADO",field:e=>e.SABADO,sortable:!0,classes:e=>{var t;return e.SABADO=="FALTA"?"bg-red-2 text-red":(t=e.SABADO)!=null&&t.includes("R")?"text-red bg-yellow":null},align:"center"},{name:"sunday",label:"DOMINGO",field:e=>e.DOMINGO,sortable:!0,classes:e=>{var t;return e.DOMINGO=="DESCANSO"?"bg-lime-11 text-green":(t=e.DOMINGO)!=null&&t.includes("R")?"text-red bg-yellow":null},align:"center"},{name:"monday",label:"LUNES",field:e=>e.LUNES,sortable:!0,classes:e=>{var t;return e.LUNES=="FALTA"?"bg-red-2 text-red":(t=e.LUNES)!=null&&t.includes("R")?"text-red bg-yellow":null},align:"center"},{name:"tuesday",label:"MARTES",field:e=>e.MARTES,sortable:!0,classes:e=>{var t;return e.MARTES=="FALTA"?"bg-red-2 text-red":(t=e.MARTES)!=null&&t.includes("R")?"text-red bg-yellow":null},align:"center"},{name:"wednesday",label:"MIERCOLES",field:e=>e.MIERCOLES,sortable:!0,classes:e=>{var t;return e.MIERCOLES=="FALTA"?"bg-red-2 text-red":(t=e.MIERCOLES)!=null&&t.includes("R")?"text-red bg-yellow":null},align:"center"},{name:"thursday",label:"JUEVES",field:e=>e.JUEVES,sortable:!0,classes:e=>{var t;return e.JUEVES=="FALTA"?"bg-red-2 text-red":(t=e.JUEVES)!=null&&t.includes("R")?"text-red bg-yellow":null},align:"center"},{name:"friday",label:"VIERNES",field:e=>e.VIERNES,sortable:!0,classes:e=>{var t;return e.VIERNES=="FALTA"?"bg-red-2 text-red":(t=e.VIERNES)!=null&&t.includes("R")?"text-red bg-yellow":null},align:"center"},{name:"absence",label:"FALTAS",field:e=>e.FALTAS,sortable:!0,classes:"bg-white",align:"center"},{name:"delays",label:"RETARDOS",field:e=>e.RETARDOS,sortable:!0,classes:"bg-white",align:"center"},{name:"vacations",label:"VACACIONES",field:e=>e.VACACIONES,sortable:!0,classes:"bg-white",align:"center"}]}),u=v(()=>d.value.report.filter(e=>e.SUCURSAL==b.value.name)),O=async()=>{var t;f.loading.show({meesage:"Obteniendo Reporte"});const e=await J.getReport();e.error?console.log(e):(console.log(e),d.value.report=e.reporte,b.value=(t=e.sucursal)==null?void 0:t.find(o=>o._store==c.session.store.id),f.loading.hide())},y=async()=>{const e=new H.Workbook,t=["G","H","I","J","K","L","M"],o=e.addWorksheet("Reporte");o.addRow(Object.keys(u.value[0]).map(l=>l)),u.value.forEach(l=>{o.addRow([l.ANIO,l.semana,l.ID,l.NOMBRE,l.SUCURSAL,l.TURNO,l.SABADO,l.DOMINGO,l.LUNES,l.MARTES,l.MIERCOLES,l.JUEVES,l.VIERNES,Number(l.FALTAS),Number(l.RETARDOS),Number(l.VACACIONES)])}),o.eachRow((l,n)=>{l.eachCell((a,s)=>{const N=o.getColumn(s).letter;if(t.includes(N)){a.value=="FALTA"||a.value=="string"&&a.value.includes("-0%")?(a.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFFFCCCC"}},a.font={color:{argb:"FF990000"}}):typeof a.value=="string"&&a.value.includes("-50%")?(a.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFFFFFCC"}},a.font={color:{argb:"FF999900"}}):typeof a.value=="string"&&a.value.includes(" R")?(a.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFFFFF00"}},a.font={color:{argb:"FFCC0000"}}):typeof a.value=="string"&&a.value.includes("-100%")?(a.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFCCCCFF"}},a.font={color:{argb:"FF000099"}}):a.value=="DESCANSO"&&(a.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFFFFFCC"}},a.font={color:{argb:"FF999900"}});const g=/\(([^)]+)\)/,A=typeof a.value=="string"?a.value.match(g):null;A&&(a.note=A[1].trim(),a.value=a.value.replace(g,"").trim())}})}),o.columns.forEach(l=>{let n=0;l.eachCell({includeEmpty:!0},a=>{const s=a.value?a.value.toString().length:10;s>n&&(n=s)}),l.width=n<10?10:n}),(async()=>{const l=await e.xlsx.writeBuffer(),n=new Blob([l],{type:"application/octet-stream"}),a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download="Reporte.xlsx",document.body.appendChild(s),s.click(),document.body.removeChild(s)})()};return O(),(e,t)=>(L(),x(w,{view:"hHh Lpr fFf"},{default:i(()=>[r(U,{class:"transparent text-dark",bordered:""},{default:i(()=>[r(k),r(E),r(T,{class:"justify-between"},{default:i(()=>[m("div",null,[t[1]||(t[1]=S("Helpers ")),r(R,{name:"navigate_next",color:"primary"}),t[2]||(t[2]=S()),t[3]||(t[3]=m("span",{class:"text-h6"},"Asistencias",-1))])]),_:1})]),_:1}),r(B,null,{default:i(()=>[r(M,{padding:""},{default:i(()=>[r(V,{title:`Asistencias ${F(c).session.store.name}`,rows:u.value,filter:d.value.filter,separator:"cell",columns:C.value.columns},{top:i(()=>[r(E,{spaced:"",inset:"",vertical:"",dark:""}),m("div",$,[m("div",j,h(`Asistencias ${F(c).session.store.name}`),1)]),r(D),r(Q,{borderless:"",dense:"",debounce:"300",color:"primary",modelValue:d.value.filter,"onUpdate:modelValue":t[0]||(t[0]=o=>d.value.filter=o),placeholder:"Buscar"},{append:i(()=>[r(R,{name:"search"})]),_:1},8,["modelValue"]),r(I,{onClick:y,color:"primary",icon:"cloud_download",disable:u.value.length==0,flat:""},null,8,["disable"])]),_:1},8,["title","rows","filter","columns"])]),_:1})]),_:1})]),_:1}))}};export{Ne as default};
