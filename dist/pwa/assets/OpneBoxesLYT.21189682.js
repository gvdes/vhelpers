import{Q as _}from"./QSeparator.1c73cca5.js";import{aE as j,u as L,r as b,c as P,aW as M,o as C,a as S,w as t,e,f as c,Y as T,Q as v,a5 as y,a4 as m,a3 as D,aY as N,g as Y,a2 as U,a1 as q,h as H,a0 as K,a7 as O}from"./index.54d447e3.js";import{Q as W}from"./QToolbar.eb82c9cb.js";import{Q as J}from"./QHeader.781663ae.js";import{Q as z}from"./QInput.f4aaafa9.js";import{a as x,b as f,c as G}from"./QSelect.711403d0.js";import{Q as X}from"./QSlideTransition.7880da93.js";import{Q as Z}from"./QList.fa7ccc12.js";import{Q as ee}from"./QTable.d3f01a8d.js";import{Q as ae}from"./QDate.a591d058.js";import{u as oe,Q as te,a as R}from"./use-quasar.e7b3e98f.js";import{Q as le}from"./QCardActions.4ba469fb.js";import{Q as se}from"./QDialog.711949b7.js";import{Q as re,a as ne}from"./QLayout.bc7b9374.js";import"./AppFullscreen.55e0e68b.js";import"./auto.ba62c17c.js";import{d as Q}from"./dayjs.min.cbcf888d.js";import{E as ie}from"./exceljs.min.9e24d01d.js";import{E as de,a as ce}from"./jspdf.plugin.autotable.57a91780.js";import{_ as ue}from"./UserToolbar.39f31d3c.js";import{A as me}from"./assistApi.2e43d6ae.js";import{u as fe}from"./VDB.cb7932a0.js";import{a as pe}from"./axios.9ab26c22.js";import"./QResizeObserver.eb637c66.js";import"./use-key-composition.eac0cc74.js";import"./uid.937d8ee7.js";import"./position-engine.b9957c85.js";import"./rtl.276c3f1b.js";import"./QLinearProgress.11942ba4.js";import"./QCheckbox.a9d08855.js";import"./use-render-cache.3aae9b27.js";import"./date.804f7234.js";import"./_commonjsHelpers.88e99c8f.js";import"./ClosePopup.5a0721b4.js";import"./axios.ba7b1b0e.js";const ge={class:"row"},ve={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"},we={class:"text-bold"},ye={class:"text-overline"},he={key:0,class:""},be={class:"q-pa-md"},la={__name:"OpneBoxesLYT",setup(Ce){const i=oe();j();const V=L(),k=fe(),u=b(!1),w=b(null),p=b([]),h=b({pagination:{rowsPerPage:0},filter:""});P(()=>i.platform.is.mobile);const A=async()=>{i.loading.show({message:"Cargando Informacion"}),console.log("se inicia el init");const r=await me.index();if(r.error)console.log(r);else{console.log(r),p.value=r;let a=new Date,s=Q(a).format("YYYY/MM/DD");w.value=s,console.log(s),E(p.value,w.value).finally(()=>{i.loading.hide()})}},E=async(r,a)=>{console.log(a);const s=r.map((o,l)=>new Promise((d,n)=>{setTimeout(()=>{o.sale=null;let B=`http://${o.ip_address}/access/public/reports/OpenCash`;pe.post(B,{filt:a}).then(g=>{o.sales=g.data||null,console.log(g.data),console.log(`Sucursal ${o.name} procesada con \xE9xito.`),d({success:!0,data:g.data})}).catch(g=>{console.log(`Error en sucursal ${o.name}: ${g.message}`),o.sales=[],i.notify({message:`Sucursal ${o.name} no tiene conexion`,type:"negative",position:"center"}),d({success:!1,error:g.message})})},l*1e3)}));try{await Promise.all(s)}catch(o){console.error("Error en alguna de las solicitudes:",o)}};k.session.rol==="adm"||k.session.rol==="root"?A():(i.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),V.replace("/"));const $=()=>{u.value=!1,i.loading.show({message:"Obteniendo Datos"}),E(p.value,w.value).finally(()=>{i.loading.hide()})},F=()=>new Promise((r,a)=>{try{let s=[];p.value.forEach((l,d)=>{s.push([{content:l.name,colSpan:3,styles:{halign:"center",fillColor:[173,216,230],fontStyle:"bold"}}]),l.sales.forEach(n=>{s.push([Q(n.FECFAC).format("YYYY-MM-DD"),n.DESTER,n.TICKETS])})});const o=new de({format:"letter"});ce(o,{head:[["Fecha","Caja","Tickets"]],body:s}),o.save("Reporte de Cajas"),r()}catch(s){a(s)}}),I=()=>{i.loading.show({message:"Importando Ticket"});const r=new ie.Workbook,a=r.addWorksheet("Comparativo");a.columns=[{header:"Fecha",key:"FECFAC",width:20},{header:"Destino",key:"DESTER",width:30},{header:"Tickets",key:"TICKETS",width:10}],p.value.forEach(o=>{const l=a.addRow([o.name]);l.font={bold:!0},l.fill={type:"pattern",pattern:"solid",fgColor:{argb:"ADD8E6"}},l.alignment={horizontal:"center"},o.sales.forEach(d=>{a.addRow(d)}),a.addRow([])}),(async()=>{const o=await r.xlsx.writeBuffer(),l=new Blob([o],{type:"application/octet-stream"}),d=URL.createObjectURL(l),n=document.createElement("a");n.href=d,n.download="ReporteCajas.xlsx",document.body.appendChild(n),n.click(),document.body.removeChild(n)})(),i.loading.hide()};return(r,a)=>{const s=M("router-view");return C(),S(re,{view:"hHh Lpr fFf"},{default:t(()=>[e(ne,null,{default:t(()=>[e(J,{class:"bg-grey-3 text-dark",bordered:""},{default:t(()=>[e(ue),e(_),e(W,{class:"justify-between"},{default:t(()=>[c("div",null,[a[5]||(a[5]=c("span",{class:"text-grey"},"Helpers",-1)),e(T,{name:"navigate_next",color:"primary"}),a[6]||(a[6]=c("span",{class:"text-h6"},"Cajas Abiertas",-1))]),c("div",ge,[e(v,{color:"primary",icon:"event",onClick:a[0]||(a[0]=o=>u.value=!u.value),flat:"",round:""}),e(v,{color:"primary",icon:"download",onClick:F,flat:"",round:""}),e(v,{color:"primary",icon:"calculate",onClick:I,flat:"",round:""})])]),_:1})]),_:1}),e(ee,{title:"Sucursales",rows:p.value,"hide-header":"",pagination:h.value.pagination,filter:h.value.filter},{"top-right":t(()=>[e(z,{borderless:"",dense:"",debounce:"300",modelValue:h.value.filter,"onUpdate:modelValue":a[1]||(a[1]=o=>h.value.filter=o),placeholder:"Buscar"},{append:t(()=>[e(T,{name:"search"})]),_:1},8,["modelValue"])]),body:t(o=>[c("div",ve,[e(Z,{bordered:"",dense:""},{default:t(()=>[e(x,null,{default:t(()=>[e(f,null,{default:t(()=>[e(G,{class:"flex justify-between"},{default:t(()=>{var l;return[c("div",we,y(o.row.name),1),c("div",ye,[m(y((l=o.row.sales)==null?void 0:l.length)+" ",1),e(v,{color:"grey",flat:"",dense:"",icon:o.expand?"keyboard_arrow_up":"keyboard_arrow_down",onClick:d=>o.expand=!o.expand},null,8,["icon","onClick"])])]}),_:2},1024)]),_:2},1024)]),_:2},1024),e(X,null,{default:t(()=>[o.row.sales?D((C(),Y("div",he,[e(_),e(x,{class:"text-center"},{default:t(()=>[e(f,null,{default:t(()=>a[7]||(a[7]=[m(" FECHA ")])),_:1}),e(f,null,{default:t(()=>a[8]||(a[8]=[m(" CAJA ")])),_:1}),e(f,null,{default:t(()=>a[9]||(a[9]=[m(" TICKETS ")])),_:1})]),_:1}),(C(!0),Y(U,null,q(o.row.sales,(l,d)=>D((C(),S(x,{class:"text-center",dense:"",clickable:""},{default:t(()=>[e(f,null,{default:t(()=>[m(y(K(Q)(l.FECFAC).format("YYYY-MM-DD")),1)]),_:2},1024),e(f,null,{default:t(()=>[m(y(l.DESTER),1)]),_:2},1024),e(f,null,{default:t(()=>[m(y(l.TICKETS),1)]),_:2},1024)]),_:2},1024)),[[O]])),256))],512)),[[N,o.expand]]):H("",!0)]),_:2},1024)]),_:2},1024),e(_,{spaced:"",inset:"",vertical:"",dark:""})])]),_:1},8,["rows","pagination","filter"]),e(se,{modelValue:u.value,"onUpdate:modelValue":a[4]||(a[4]=o=>u.value=o)},{default:t(()=>[e(te,{class:"my-card"},{default:t(()=>[e(R,null,{default:t(()=>[c("div",be,[a[10]||(a[10]=c("div",{class:"q-pb-sm"},null,-1)),e(ae,{modelValue:w.value,"onUpdate:modelValue":a[2]||(a[2]=o=>w.value=o),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),e(R,null,{default:t(()=>[e(le,{align:"right"},{default:t(()=>[e(v,{flat:"",icon:"close",color:"negative",onClick:a[3]||(a[3]=o=>u.value=!u.value)}),e(v,{flat:"",icon:"check",color:"positive",onClick:$})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(s)]),_:1})]),_:1})}}};export{la as default};
