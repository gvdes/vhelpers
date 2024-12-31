import{Q as f}from"./QSeparator.10b082ec.js";import{r as v,c as $,o as L,a as P,w as n,e as s,i as V,a3 as C,Y as b,Q as x,b1 as Q,aE as h,f as _}from"./index.de75804d.js";import{Q as U}from"./QToolbar.f629ee07.js";import{Q as j}from"./QHeader.9eef47d4.js";import{Q as k}from"./QSelect.9736c9eb.js";import{u as D,Q as O,a as R}from"./use-quasar.cd8abceb.js";import{Q as z}from"./QTable.280c885b.js";import{Q as F}from"./QPage.3ee13e06.js";import{Q as H,a as M}from"./QLayout.947be09e.js";import{u as A}from"./VDB.7ad8e39e.js";import{_ as W}from"./UserToolbar.6079b6cc.js";import{d as N}from"./compareApi.fadaf615.js";import"./jspdf.plugin.autotable.31c98963.js";import{E as q}from"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import"./QResizeObserver.16cc8364.js";import"./use-key-composition.72997369.js";import"./uid.42677368.js";import"./position-engine.d6d23fb3.js";import"./QDialog.045af59c.js";import"./rtl.b51694b1.js";import"./QList.677fcee7.js";import"./QLinearProgress.da67291f.js";import"./QCheckbox.6cd96add.js";import"./QCardActions.67a4034f.js";import"./ClosePopup.b789b376.js";import"./axios.ae0a941c.js";import"./axios.f1f32898.js";import"./_commonjsHelpers.88e99c8f.js";const I=V("span",{class:"text-h6"},"Comparativo",-1),_e={__name:"CompareLayout",setup(J){const r=A(),p=D(),c=v({val:null,opts:[]}),o=v({categorias:{opts:[],val:null},familias:{opts:[],val:null}}),m=v([]),u=$(()=>o.value.familias.val&&!o.value.categorias.val?m.value.filter(a=>a.categories.familia.name==o.value.familias.val):o.value.familias.val&&o.value.categorias.val?m.value.filter(a=>a.categories.familia.name==o.value.familias.val&&a.categories.name==o.value.categorias.val):m.value),g=v({columns:[{name:"code",label:"Codigo",align:"left",field:a=>a.code},{name:"description",label:"Descripcion",align:"left",field:a=>a.description},{name:"pxc",label:"PXC",align:"center",field:a=>a.pieces},{name:"section",label:"Seccion",align:"left",field:a=>a.categories.familia.seccion.name},{name:"family",label:"Familia",align:"left",field:a=>a.categories.familia.name},{name:"category",label:"Categoria",align:"left",field:a=>a.categories.name},{name:"cedis",label:"Cedis",align:"center",field:a=>a.stocks.filter(e=>e.id==1).map(e=>e.pivot.stock)},{name:"texcoco",label:"Texcoco",align:"center",field:a=>a.stocks.filter(e=>e.id==2).map(e=>e.pivot.stock)},{name:"total",label:"Total",align:"center",field:a=>Number(a.stocks.filter(e=>e.id==1).map(e=>e.pivot.stock))+Number(a.stocks.filter(e=>e.id==2).map(e=>e.pivot.stock))},{name:"totalcj",label:"Total Cajas",align:"center",sortable:!0,field:a=>Math.round((Number(a.stocks.filter(e=>e.id==1).map(e=>e.pivot.stock))+Number(a.stocks.filter(e=>e.id==2).map(e=>e.pivot.stock)))/Number(a.pieces))},{name:"Sucursal",label:`${r.session.store.name}`,align:"center",field:a=>a.stocks.filter(e=>e.id==r.session.store.id_viz).map(e=>e.pivot.stock)},{name:"Sucursal",label:"Surtir En",align:"center",field:a=>a.stocks.filter(e=>e.id==1).map(e=>e.pivot.stock)>0?"Cedis":"Texcoco"}],pagination:{rowsPerPage:20}}),y=async()=>{p.loading.show({message:"Obteniendo secciones"});const a=await N.secciones();a.fail?console.log(a):(c.value.opts=a,p.loading.hide()),console.log(a)},S=async()=>{p.loading.show({message:"Obteniendo registros"}),o.value={categorias:{opts:[],val:null},familias:{opts:[],val:null}};let a=r.session.store.id_viz,e=[];c.value.val.forEach(i=>e.push(i.name)),console.log(Array.isArray(e));const t=await N.getData(a,{sections:e});t.fail?console.log(t):(console.log(t),m.value=t,m.value.forEach(i=>{const l=i.categories.familia.name;l&&!o.value.familias.opts.includes(l)&&o.value.familias.opts.push(l)}),p.loading.hide())},E=()=>{if(o.value.categorias.val=null,o.value.familias.val)o.value.categorias.opts=u.value.map(a=>a.categories.name).filter((a,e,t)=>t.indexOf(a)===e);else return[]},B=()=>{o.value={categorias:{opts:[],val:null},familias:{opts:[],val:null}},m.value=[],c.value.val=null},T=async()=>{const a=new q.Workbook,e=a.addWorksheet("Comparativo");e.addRow(g.value.columns.map(i=>i.label)),u.value.forEach(i=>e.addRow([i.code,i.description,i.pieces,i.categories.familia.seccion.name,i.categories.familia.name,i.categories.name,i.stocks.filter(l=>l.id==1).map(l=>l.pivot.stock)[0],i.stocks.filter(l=>l.id==2).map(l=>l.pivot.stock)[0],Number(i.stocks.filter(l=>l.id==1).map(l=>l.pivot.stock))+Number(i.stocks.filter(l=>l.id==2).map(l=>l.pivot.stock)),Math.round((Number(i.stocks.filter(l=>l.id==1).map(l=>l.pivot.stock))+Number(i.stocks.filter(l=>l.id==2).map(l=>l.pivot.stock)))/Number(i.pieces)),i.stocks.filter(l=>l.id==r.session.store.id_viz).map(l=>l.pivot.stock)[0],i.stocks.filter(l=>l.id==1).map(l=>l.pivot.stock)[0]>0?"Cedis":"Texcoco"])),(async()=>{const i=await a.xlsx.writeBuffer(),l=new Blob([i],{type:"application/octet-stream"}),w=URL.createObjectURL(l),d=document.createElement("a");d.href=w,d.download=`Comparativo${r.session.store.alias}.xlsx`,document.body.appendChild(d),d.click(),document.body.removeChild(d)})()};return r.session.rol=="aux"||r.session.rol=="gen"||r.session.rol=="aud"||r.session.rol=="root"?y():(p.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),y(),(a,e)=>(L(),P(H,{view:"hHh Lpr fFf"},{default:n(()=>[s(j,{class:"transparent text-dark",bordered:""},{default:n(()=>[s(W),s(f),s(U,{class:"justify-between"},{default:n(()=>[V("div",null,[C("Helpers "),s(b,{name:"navigate_next",color:"primary"}),C(),I]),s(x,{color:"primary",icon:"delete",flat:"",onClick:B,disable:!c.value.val},null,8,["disable"])]),_:1})]),_:1}),s(M,null,{default:n(()=>[s(F,{padding:""},{default:n(()=>[s(O,{class:"my-card"},{default:n(()=>[s(R,{class:"row"},{default:n(()=>[s(k,{class:"col",modelValue:c.value.val,"onUpdate:modelValue":e[0]||(e[0]=t=>c.value.val=t),options:c.value.opts,label:"Seccion","option-label":"name",multiple:"",filled:"",onBlur:S},null,8,["modelValue","options"]),s(f,{spaced:"",inset:"",vertical:"",dark:""}),s(k,{class:"col",modelValue:o.value.familias.val,"onUpdate:modelValue":[e[2]||(e[2]=t=>o.value.familias.val=t),E],options:o.value.familias.opts,label:"Familia",filled:"","option-label":"name",disable:!c.value.val},Q({_:2},[o.value.familias.val?{name:"append",fn:n(()=>[s(b,{name:"cancel",onClick:e[1]||(e[1]=h(t=>o.value.familias.val=null,["stop","prevent"])),class:"cursor-pointer"})]),key:"0"}:void 0]),1032,["modelValue","options","disable"]),s(f,{spaced:"",inset:"",vertical:"",dark:""}),s(k,{class:"col",modelValue:o.value.categorias.val,"onUpdate:modelValue":e[4]||(e[4]=t=>o.value.categorias.val=t),options:o.value.categorias.opts,label:"Categoria","option-label":"name",disable:!o.value.familias.val,filled:""},Q({_:2},[o.value.categorias.val?{name:"append",fn:n(()=>[s(b,{name:"cancel",onClick:e[3]||(e[3]=h(t=>o.value.categorias.val=null,["stop","prevent"])),class:"cursor-pointer"})]),key:"0"}:void 0]),1032,["modelValue","options","disable"])]),_:1})]),_:1}),s(f,{spaced:"",inset:"",vertical:"",dark:""}),s(z,{rows:_(u),columns:g.value.columns,pagination:g.value.pagination},{"top-right":n(()=>[s(x,{color:"primary","icon-right":"archive",flat:"",onClick:T,disable:_(u).length<=0},null,8,["disable"])]),_:1},8,["rows","columns","pagination"])]),_:1})]),_:1})]),_:1}))}};export{_e as default};
