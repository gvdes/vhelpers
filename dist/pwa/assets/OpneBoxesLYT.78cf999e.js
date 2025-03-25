import{Q as C}from"./QSeparator.1c524e3d.js";import{r as y,c as j,o as b,a as S,w as o,aD as L,u as P,aV as M,e,i as d,Y as T,Q as h,a4 as v,a3 as m,a2 as D,aX as N,g as V,a1 as U,a0 as q,h as H,f as K,a6 as O}from"./index.f230f022.js";import{Q as J}from"./QToolbar.27077d41.js";import{Q as W}from"./QHeader.7126e984.js";import{Q as z}from"./QInput.55e7d485.js";import{a as x,b as f,c as X}from"./QSelect.c1eea1d3.js";import{Q as G}from"./QSlideTransition.e22e5178.js";import{Q as Z}from"./QList.e86be665.js";import{Q as ee}from"./QTable.3191f054.js";import{Q as ae}from"./QDate.ccd90733.js";import{u as oe,Q as te,a as R}from"./use-quasar.e39b8eab.js";import{Q as le}from"./QCardActions.399bf6db.js";import{Q as se}from"./QDialog.4e21d602.js";import{Q as re,a as ne}from"./QLayout.5338a477.js";import"./AppFullscreen.9f82f9ab.js";import"./auto.c5e70433.js";import{d as Q}from"./dayjs.min.25545ff6.js";import{E as ie}from"./exceljs.min.9e24d01d.js";import{E as ce,a as de}from"./jspdf.plugin.autotable.0b626374.js";import{_ as ue}from"./UserToolbar.7a022b79.js";import{A as me}from"./assistApi.3df7fe01.js";import{u as fe}from"./VDB.62c6e2ff.js";import{a as pe}from"./axios.f1f32898.js";import"./QResizeObserver.f839cf65.js";import"./use-key-composition.951681c7.js";import"./uid.42677368.js";import"./position-engine.b4a3ff3c.js";import"./rtl.b51694b1.js";import"./QLinearProgress.89563db7.js";import"./QCheckbox.baf50a2a.js";import"./use-cache.b0833c75.js";import"./date.352da036.js";import"./_commonjsHelpers.88e99c8f.js";import"./ClosePopup.f972e7f6.js";import"./axios.30672b3a.js";const ge=d("span",{class:"text-grey"},"Helpers",-1),he=d("span",{class:"text-h6"},"Cajas Abiertas",-1),_e={class:"row"},ve={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"},we={class:"text-bold"},ye={class:"text-overline"},be={key:0,class:""},Ce={class:"q-pa-md"},xe=d("div",{class:"q-pb-sm"},null,-1),na={__name:"OpneBoxesLYT",setup(Qe){const i=oe();L();const Y=P(),k=fe(),u=y(!1),_=y(null),p=y([]),w=y({pagination:{rowsPerPage:0},filter:""});j(()=>i.platform.is.mobile);const A=async()=>{i.loading.show({message:"Cargando Informacion"}),console.log("se inicia el init");const r=await me.index();if(r.error)console.log(r);else{console.log(r),p.value=r;let t=new Date,s=Q(t).format("YYYY/MM/DD");_.value=s,console.log(s),E(p.value,_.value).finally(()=>{i.loading.hide()})}},E=async(r,t)=>{console.log(t);const s=r.map((a,l)=>new Promise((c,n)=>{setTimeout(()=>{a.sale=null;let B=`http://${a.ip_address}/access/public/reports/OpenCash`;pe.post(B,{filt:t}).then(g=>{a.sales=g.data||null,console.log(g.data),console.log(`Sucursal ${a.name} procesada con \xE9xito.`),c({success:!0,data:g.data})}).catch(g=>{console.log(`Error en sucursal ${a.name}: ${g.message}`),a.sales=[],i.notify({message:`Sucursal ${a.name} no tiene conexion`,type:"negative",position:"center"}),c({success:!1,error:g.message})})},l*1e3)}));try{await Promise.all(s)}catch(a){console.error("Error en alguna de las solicitudes:",a)}};k.session.rol==="adm"||k.session.rol==="root"?A():(i.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),Y.replace("/"));const $=()=>{u.value=!1,i.loading.show({message:"Obteniendo Datos"}),E(p.value,_.value).finally(()=>{i.loading.hide()})},F=()=>new Promise((r,t)=>{try{let s=[];p.value.forEach((l,c)=>{s.push([{content:l.name,colSpan:3,styles:{halign:"center",fillColor:[173,216,230],fontStyle:"bold"}}]),l.sales.forEach(n=>{s.push([Q(n.FECFAC).format("YYYY-MM-DD"),n.DESTER,n.TICKETS])})});const a=new ce({format:"letter"});de(a,{head:[["Fecha","Caja","Tickets"]],body:s}),a.save("Reporte de Cajas"),r()}catch(s){t(s)}}),I=()=>{i.loading.show({message:"Importando Ticket"});const r=new ie.Workbook,t=r.addWorksheet("Comparativo");t.columns=[{header:"Fecha",key:"FECFAC",width:20},{header:"Destino",key:"DESTER",width:30},{header:"Tickets",key:"TICKETS",width:10}],p.value.forEach(a=>{const l=t.addRow([a.name]);l.font={bold:!0},l.fill={type:"pattern",pattern:"solid",fgColor:{argb:"ADD8E6"}},l.alignment={horizontal:"center"},a.sales.forEach(c=>{t.addRow(c)}),t.addRow([])}),(async()=>{const a=await r.xlsx.writeBuffer(),l=new Blob([a],{type:"application/octet-stream"}),c=URL.createObjectURL(l),n=document.createElement("a");n.href=c,n.download="ReporteCajas.xlsx",document.body.appendChild(n),n.click(),document.body.removeChild(n)})(),i.loading.hide()};return(r,t)=>{const s=M("router-view");return b(),S(re,{view:"hHh Lpr fFf"},{default:o(()=>[e(ne,null,{default:o(()=>[e(W,{class:"bg-grey-3 text-dark",bordered:""},{default:o(()=>[e(ue),e(C),e(J,{class:"justify-between"},{default:o(()=>[d("div",null,[ge,e(T,{name:"navigate_next",color:"primary"}),he]),d("div",_e,[e(h,{color:"primary",icon:"event",onClick:t[0]||(t[0]=a=>u.value=!u.value),flat:"",round:""}),e(h,{color:"primary",icon:"download",onClick:F,flat:"",round:""}),e(h,{color:"primary",icon:"calculate",onClick:I,flat:"",round:""})])]),_:1})]),_:1}),e(ee,{title:"Sucursales",rows:p.value,"hide-header":"",pagination:w.value.pagination,filter:w.value.filter},{"top-right":o(()=>[e(z,{borderless:"",dense:"",debounce:"300",modelValue:w.value.filter,"onUpdate:modelValue":t[1]||(t[1]=a=>w.value.filter=a),placeholder:"Buscar"},{append:o(()=>[e(T,{name:"search"})]),_:1},8,["modelValue"])]),body:o(a=>[d("div",ve,[e(Z,{bordered:"",dense:""},{default:o(()=>[e(x,null,{default:o(()=>[e(f,null,{default:o(()=>[e(X,{class:"flex justify-between"},{default:o(()=>{var l;return[d("div",we,v(a.row.name),1),d("div",ye,[m(v((l=a.row.sales)==null?void 0:l.length)+" ",1),e(h,{color:"grey",flat:"",dense:"",icon:a.expand?"keyboard_arrow_up":"keyboard_arrow_down",onClick:c=>a.expand=!a.expand},null,8,["icon","onClick"])])]}),_:2},1024)]),_:2},1024)]),_:2},1024),e(G,null,{default:o(()=>[a.row.sales?D((b(),V("div",be,[e(C),e(x,{class:"text-center"},{default:o(()=>[e(f,null,{default:o(()=>[m(" FECHA ")]),_:1}),e(f,null,{default:o(()=>[m(" CAJA ")]),_:1}),e(f,null,{default:o(()=>[m(" TICKETS ")]),_:1})]),_:1}),(b(!0),V(U,null,q(a.row.sales,(l,c)=>D((b(),S(x,{class:"text-center",dense:"",clickable:""},{default:o(()=>[e(f,null,{default:o(()=>[m(v(K(Q)(l.FECFAC).format("YYYY-MM-DD")),1)]),_:2},1024),e(f,null,{default:o(()=>[m(v(l.DESTER),1)]),_:2},1024),e(f,null,{default:o(()=>[m(v(l.TICKETS),1)]),_:2},1024)]),_:2},1024)),[[O]])),256))],512)),[[N,a.expand]]):H("",!0)]),_:2},1024)]),_:2},1024),e(C,{spaced:"",inset:"",vertical:"",dark:""})])]),_:1},8,["rows","pagination","filter"]),e(se,{modelValue:u.value,"onUpdate:modelValue":t[4]||(t[4]=a=>u.value=a)},{default:o(()=>[e(te,{class:"my-card"},{default:o(()=>[e(R,null,{default:o(()=>[d("div",Ce,[xe,e(ae,{modelValue:_.value,"onUpdate:modelValue":t[2]||(t[2]=a=>_.value=a),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),e(R,null,{default:o(()=>[e(le,{align:"right"},{default:o(()=>[e(h,{flat:"",icon:"close",color:"negative",onClick:t[3]||(t[3]=a=>u.value=!u.value)}),e(h,{flat:"",icon:"check",color:"positive",onClick:$})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(s)]),_:1})]),_:1})}}};export{na as default};
