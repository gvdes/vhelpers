import{Q as h}from"./QSeparator.0cb87880.js";import{r as R,c as $,o as p,a as w,w as t,aD as te,u as ae,aV as le,e,i as l,Y as D,f as g,h as C,Q as A,a4 as s,aW as se,a3 as o,a2 as z,aX as oe,g as B,a6 as de,a0 as M,a1 as U}from"./index.a3aaa1bd.js";import{Q as re,a as Q,b as u,c as _}from"./QSelect.fa0e1b0f.js";import{Q as ne}from"./QToolbar.9e67375b.js";import{Q as ie}from"./QHeader.b3fffd33.js";import{u as ce,Q as k,a as i}from"./use-quasar.9d6c3e6f.js";import{Q as ue}from"./QInput.17a4f037.js";import{Q as _e}from"./QBadge.442fa5d8.js";import{Q as me}from"./QLinearProgress.6ef7d66b.js";import{Q as fe}from"./auto.79629a6d.js";import{Q as I}from"./QList.1fd363d5.js";import{Q as ve}from"./QTable.000ad3f7.js";import{Q as he}from"./QDialog.f9e079b0.js";import{Q as xe,a as be}from"./QLayout.e2fcf06b.js";import"./AppFullscreen.a022f119.js";import"./dayjs.min.25545ff6.js";import{E as pe}from"./exceljs.min.9e24d01d.js";import{_ as ge}from"./UserToolbar.25b4671d.js";import"./axios.ae0a941c.js";import{u as ke}from"./VDB.f28d7aeb.js";import{a as Y}from"./axios.f1f32898.js";import"./use-key-composition.e422a0b9.js";import"./uid.42677368.js";import"./position-engine.d15ee034.js";import"./rtl.b51694b1.js";import"./QResizeObserver.ea45863f.js";import"./QCheckbox.f0e04729.js";import"./_commonjsHelpers.88e99c8f.js";import"./QCardActions.315214bb.js";import"./ClosePopup.e808fc5b.js";const we=l("span",{class:"text-grey"},"Helpers",-1),ye=l("span",{class:"text-h6"},"Ventas Sucursales",-1),Ne={class:"row"},Fe={class:"text-bold text-h6"},Te=l("div",{class:"text-h6 text-center"},"Ventas 2023",-1),$e={class:"text-h4 text-center"},Ce=l("div",{class:"text-h6 text-center"},"Tickets 2023",-1),Qe={class:"text-h4 text-center"},Ve=l("div",{class:"text-h6 text-center"},"Ventas 2024",-1),Se={class:"text-h4 text-center"},Ee=l("div",{class:"text-h6 text-center"},"Tickets 2024",-1),Re={class:"text-h4 text-center"},De=l("div",{class:"text-h6 text-center"},"Diferencia",-1),Ie={class:"text-h4 text-center"},Ae=l("div",{class:"text-h6 text-center"},"Diferencia Tickets",-1),Be={class:"text-h4 text-center"},Le=l("div",{class:"text-h6 text-center"},"VENTAS HOY",-1),He={class:"text-h4 text-center"},Pe=l("div",{class:"text-h6 text-center"},"Tickets HOY",-1),Ke={class:"text-h4 text-center"},Oe={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"},ze={class:"text-bold"},Me={class:"text-overline"},Ue={class:"q-pa-sm flex justify-start"},Ye={class:"absolute-full flex flex-center"},qe={key:0,class:""},Je={class:"text-h6"},We={class:"text-subtitle2"},Xe=l("div",{class:"text-h6 text-center"},"Ventas 2023",-1),Ge={class:"text-h5 text-center"},Ze=l("div",{class:"text-h6 text-center"},"Tickets 2023",-1),je={class:"text-h5 text-center"},et=l("div",{class:"text-h6 text-center"},"Tickets Promedio 2023",-1),tt={class:"text-h5 text-center"},at=l("div",{class:"text-h6 text-center"},"Ventas 2024",-1),lt={class:"text-h5 text-center"},st=l("div",{class:"text-h6 text-center"},"Tickets 2024",-1),ot={class:"text-h5 text-center"},dt=l("div",{class:"text-h6 text-center"},"Tickets Promedio 2024",-1),rt={class:"text-h5 text-center"},nt=l("div",{class:"text-h6 text-center"},"Diferencias",-1),it={class:"text-h5 text-center"},ct=l("div",{class:"text-h6 text-center"},"Diferencia Tickts",-1),ut={class:"text-h5 text-center"},_t=l("div",{class:"text-h6 text-center"},"Ventas Hoy",-1),mt={class:"text-h5 text-center"},ft=l("div",{class:"text-h6 text-center"},"Tickets Hoy",-1),vt={class:"text-h5 text-center"},ht=l("div",{class:"text-h6"},"Resumen Dia",-1),xt=l("div",{class:"text-h6"},"Resumen Mensual",-1),Wt={__name:"SaleStore",setup(bt){const V=ce();te();const q=ae(),L=ke(),x=R([]),S=R({pagination:{rowsPerPage:0},filter:""}),c=R({state:!1,val:null}),N=R({val:null}),H=[{id:1,label:"Enero"},{id:2,label:"Febrero"},{id:3,label:"Marzo"},{id:4,label:"Abril"},{id:5,label:"Mayo"},{id:6,label:"Junio"},{id:7,label:"Julio"},{id:8,label:"Agosto"},{id:9,label:"Septiembre"},{id:10,label:"Octubre"},{id:11,label:"Noviembre"},{id:12,label:"Diciembre"}],F=$(()=>V.platform.is.mobile),J=$(()=>Number(x.value.reduce((v,d)=>{var f;return v+Number(((f=d.sales)==null?void 0:f.salesant)*1.1||0)},0)).toFixed(2)),W=$(()=>Number(x.value.reduce((v,d)=>{var f;return v+Number(((f=d.sales)==null?void 0:f.salesact)||0)},0)).toFixed(2)),X=$(()=>Number(x.value.reduce((v,d)=>{var f,a;return v+Number(((f=d.sales)==null?void 0:f.salesact)-((a=d.sales)==null?void 0:a.salesant)*1.1||0)},0)).toFixed(2)),P=$(()=>Number(x.value.reduce((v,d)=>{var f;return v+Number(((f=d.sales)==null?void 0:f.saleshoy)||0)},0)).toFixed(2)),K=async()=>{const d=new Date().getMonth()+1;N.value.val=H.filter(n=>n.id===d)[0],V.loading.show({message:"Cargando Informacion"}),console.log("se inicia el init");let f="http://mx100-cedis-mkrqpwcczk.dynamic-m.com:3030/Assist/public/api/sales/getSale";const a=await Y.get(f);a.error?console.log(a):(console.log(a),x.value=a.data,O(x.value,d))},O=async(v,d)=>{v.forEach((f,a)=>{setTimeout(()=>{let m=`http://${f.domain}/access/public/reports/getSalesPerMonth/${d}`;Y.get(m).then(r=>{f.sales=r.data==null?null:r.data,console.log(r)}).catch(r=>{console.log(r.response.data.message)})},a*1e3)}),V.loading.hide()};L.session.rol==="root"||L.session.rol==="dir"?K():(V.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),q.replace("/"));const G=()=>{x.value.map(v=>v.sales=null),O(x.value,N.value.val.id)},Z=v=>{c.value.state=!0,c.value.val=v,console.log(v)},j=async()=>{const v=new pe.Workbook,d=v.addWorksheet("Venta");console.log(),d.addTable({name:"Venta",ref:"A1",headerRow:!0,totalsRow:!0,style:{showRowStripes:!0},columns:[{name:"Sucursal",filterButton:!0},{name:"Total",filterButton:!0,totalsRowFunction:"sum"},{name:"Tickets",filterButton:!0,totalsRowFunction:"sum"}],rows:x.value.map(r=>{var b,y;return[r.name,Number((b=r.sales)==null?void 0:b.saleshoy),Number((y=r.sales)==null?void 0:y.hoytck)]})}),d.columns.forEach(r=>{let b=0;r.eachCell({includeEmpty:!0},y=>{const E=y.value?y.value.toString().length:10;E>b&&(b=E)}),r.width=b<10?10:b}),d.getRow(1).eachCell(r=>{r.font={bold:!0}});const f=2,a=x.value.length+2;for(let r=f;r<a;r++)d.getRow(r).eachCell(b=>{b.font={bold:!0}});d.getRow(a).eachCell(r=>{r.font={size:12,bold:!0},r.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFFF00"}}});const n=2;d.getColumn(n).numFmt='"$"#,##0.00',d.getCell(`B${a}`).numFmt='"$"#,##0.00',(async()=>{const b=new Date().toLocaleDateString("es-ES",{day:"2-digit",month:"2-digit",year:"numeric"}),y=await v.xlsx.writeBuffer(),E=new Blob([y],{type:"application/octet-stream"}),ee=URL.createObjectURL(E),T=document.createElement("a");T.href=ee,T.download=`Ventas${b}.xlsx`,document.body.appendChild(T),T.click(),document.body.removeChild(T)})()};return(v,d)=>{const f=le("router-view");return p(),w(xe,{view:"hHh Lpr fFf"},{default:t(()=>[e(be,null,{default:t(()=>[e(ie,{class:"bg-grey-3 text-dark",bordered:""},{default:t(()=>[e(ge),e(h),e(ne,{class:"justify-between"},{default:t(()=>[l("div",null,[we,e(D,{name:"navigate_next",color:"primary"}),ye]),l("div",Ne,[g(F)?C("",!0):(p(),w(re,{key:0,modelValue:N.value.val,"onUpdate:modelValue":[d[0]||(d[0]=a=>N.value.val=a),G],options:H,label:"mes",outlined:"",dense:""},null,8,["modelValue"])),e(A,{dense:"",flat:"",color:"primary",icon:"autorenew",onClick:K})])]),_:1})]),_:1}),e(h,{spaced:"",inset:"",vertical:"",dark:""}),l("div",Fe,s(N.value.val.label),1),e(h,{spaced:"",inset:"",vertical:"",dark:""}),l("div",{class:se(g(F)?"":"row")},[g(F)?C("",!0):(p(),w(k,{key:0,class:"my-card col",bordered:"",dense:""},{default:t(()=>[e(i,null,{default:t(()=>[Te,l("div",$e,s(g(J).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[Ce,l("div",Qe,s(Number(x.value.reduce((a,n)=>{var m;return a+Number(((m=n.sales)==null?void 0:m.tiketsant)||0)},0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1})]),_:1})),e(h,{spaced:"",inset:"",vertical:"",dark:""}),g(F)?C("",!0):(p(),w(k,{key:1,class:"my-card col",bordered:"",dense:""},{default:t(()=>[e(i,null,{default:t(()=>[Ve,l("div",Se,s(g(W).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[Ee,l("div",Re,s(Number(x.value.reduce((a,n)=>{var m;return a+Number(((m=n.sales)==null?void 0:m.tiketsact)||0)},0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1})]),_:1})),e(h,{spaced:"",inset:"",vertical:"",dark:""}),g(F)?C("",!0):(p(),w(k,{key:2,class:"my-card col",bordered:"",dense:""},{default:t(()=>[e(i,null,{default:t(()=>[De,l("div",Ie,s(g(X).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[Ae,l("div",Be,s(Number(x.value.reduce((a,n)=>{var m,r;return a+Number(((m=n.sales)==null?void 0:m.tiketsact)-((r=n.sales)==null?void 0:r.tiketsant)||0)},0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1})]),_:1})),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(k,{class:"my-card col",bordered:"",dense:""},{default:t(()=>[e(i,null,{default:t(()=>[Le,l("div",He,s(g(P).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[Pe,l("div",Ke,s(x.value.reduce((a,n)=>{var m;return a+Number(((m=n.sales)==null?void 0:m.hoytck)||0)},0)),1)]),_:1})]),_:1})],2),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(ve,{title:"Sucursales",rows:x.value.sort((a,n)=>{var m,r;return((m=n.sales)==null?void 0:m.saleshoy)-((r=a.sales)==null?void 0:r.saleshoy)}),"row-key":"id",pagination:S.value.pagination,filter:S.value.filter,"hide-header":""},{"top-right":t(()=>[e(ue,{borderless:"",dense:"",debounce:"300",modelValue:S.value.filter,"onUpdate:modelValue":d[1]||(d[1]=a=>S.value.filter=a),placeholder:"Buscar"},{append:t(()=>[e(D,{name:"search"})]),_:1},8,["modelValue"]),e(A,{color:"primary",icon:"ios_share",flat:"",onClick:j})]),body:t(a=>[l("div",Oe,[e(I,{bordered:"",dense:""},{default:t(()=>[e(Q,null,{default:t(()=>[e(u,null,{default:t(()=>[e(_,{class:"flex justify-between"},{default:t(()=>{var n;return[l("div",ze,s(a.row.name),1),l("div",Me,[o(s(`Tickets ${(n=a.row.sales)==null?void 0:n.hoytck}`)+" ",1),e(A,{color:"grey",flat:"",dense:"",icon:a.expand?"keyboard_arrow_up":"keyboard_arrow_down",onClick:m=>a.expand=!a.expand},null,8,["icon","onClick"])])]}),_:2},1024),e(_,null,{default:t(()=>{var n;return[l("div",Ue,[e(me,{value:Number((n=a.row.sales)==null?void 0:n.saleshoy)/Number(g(P)),buffer:1,size:"20px"},{default:t(()=>{var m;return[l("div",Ye,[e(_e,{color:"white","text-color":"accent",label:`$ ${Number((m=a.row.sales)==null?void 0:m.saleshoy).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")}`},null,8,["label"])])]}),_:2},1032,["value"])])]}),_:2},1024)]),_:2},1024)]),_:2},1024),e(fe,null,{default:t(()=>[a.row.sales?z((p(),B("div",qe,[e(h),z((p(),w(Q,{class:"text-center",dense:"",clickable:"",onClick:n=>Z(a.row)},{default:t(()=>[e(u,null,{default:t(()=>[e(_,{overline:""},{default:t(()=>[o("VENTAS 2023")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(Number(a.row.sales.salesant*1.1).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:2},1024),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(_,{overline:""},{default:t(()=>[o("TICKETS 2023")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(a.row.sales.tiketsant),1)]),_:2},1024)]),_:2},1024),e(u,null,{default:t(()=>[e(_,{overline:""},{default:t(()=>[o("Promedio 2023")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(Number(Number(a.row.sales.salesant*1.1)/Number(a.row.sales.tiketsant)).toFixed(2)),1)]),_:2},1024),e(h,{spaced:"",inset:"",vertical:"",dark:""})]),_:2},1024),e(u,null,{default:t(()=>[e(_,{overline:""},{default:t(()=>[o("VENTAS 2024")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(Number(a.row.sales.salesact).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:2},1024),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(_,{overline:""},{default:t(()=>[o("TICKETS 2024")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(a.row.sales.tiketsact),1)]),_:2},1024)]),_:2},1024),e(u,null,{default:t(()=>[e(_,{overline:""},{default:t(()=>[o("Promedio 2024 ")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(Number(Number(a.row.sales.salesact)/Number(a.row.sales.tiketsact)).toFixed(2)),1)]),_:2},1024),e(h,{spaced:"",inset:"",vertical:"",dark:""})]),_:2},1024),e(u,null,{default:t(()=>[e(_,{overline:""},{default:t(()=>[o("DIFERENCIA")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s((Number(a.row.sales.salesact).toFixed(2)-Number(a.row.sales.salesant*1.1).toFixed(2)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:2},1024),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(_,{overline:""},{default:t(()=>[o("DIFERENCIA TICKETS")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(a.row.sales.tiketsact-a.row.sales.tiketsant),1)]),_:2},1024)]),_:2},1024),e(u,null,{default:t(()=>[e(_,{overline:""},{default:t(()=>[o("VENTA HOY ")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(Number(a.row.sales.saleshoy).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:2},1024),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(_,{overline:""},{default:t(()=>[o("TICKETS HOY")]),_:1}),e(_,{caption:""},{default:t(()=>[o(s(a.row.sales.hoytck),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[de]])],512)),[[oe,a.expand]]):C("",!0)]),_:2},1024)]),_:2},1024),e(h,{spaced:"",inset:"",vertical:"",dark:""})])]),_:1},8,["rows","pagination","filter"]),e(he,{modelValue:c.value.state,"onUpdate:modelValue":d[2]||(d[2]=a=>c.value.state=a),"full-width":""},{default:t(()=>[e(k,{class:"my-card"},{default:t(()=>[e(i,null,{default:t(()=>[l("div",Je,s(c.value.val.name),1),l("div",We,s(c.value.val.alias),1)]),_:1}),e(i,{class:"row"},{default:t(()=>[e(k,{class:"my-card col"},{default:t(()=>[e(i,null,{default:t(()=>[Xe,l("div",Ge,s(Number(c.value.val.sales.salesant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[Ze,l("div",je,s(Number(c.value.val.sales.tiketsant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[et,l("div",tt,s(Number(c.value.val.sales.salesant/c.value.val.sales.tiketsant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1})]),_:1}),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(k,{class:"my-card col"},{default:t(()=>[e(i,null,{default:t(()=>[at,l("div",lt,s(Number(c.value.val.sales.salesact).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[st,l("div",ot,s(Number(c.value.val.sales.tiketsact).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[dt,l("div",rt,s(Number(c.value.val.sales.salesact/c.value.val.sales.tiketsact).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1})]),_:1}),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(k,{class:"my-card col"},{default:t(()=>[e(i,null,{default:t(()=>[nt,l("div",it,s(Number(c.value.val.sales.salesact-c.value.val.sales.salesant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[ct,l("div",ut,s(Number(c.value.val.sales.tiketsact-c.value.val.sales.tiketsant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1})]),_:1}),e(h,{spaced:"",inset:"",vertical:"",dark:""}),e(k,{class:"my-card col"},{default:t(()=>[e(i,null,{default:t(()=>[_t,l("div",mt,s(Number(c.value.val.sales.saleshoy).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1}),e(i,null,{default:t(()=>[ft,l("div",vt,s(Number(c.value.val.sales.hoytck).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:1})]),_:1})]),_:1}),e(i,null,{default:t(()=>[e(k,{class:"my-card"},{default:t(()=>[e(i,null,{default:t(()=>[e(I,{bordered:""},{default:t(()=>[e(Q,null,{default:t(()=>[e(u,{avatar:""}),e(u,null,{default:t(()=>[o("Caja")]),_:1}),e(u,null,{default:t(()=>[o("Venta")]),_:1}),e(u,null,{default:t(()=>[o("Tickets")]),_:1}),e(u,null,{default:t(()=>[o("Promedio")]),_:1})]),_:1})]),_:1})]),_:1}),e(i,null,{default:t(()=>[ht,e(I,{bordered:""},{default:t(()=>[(p(!0),B(U,null,M(c.value.val.sales.ventasdepday,(a,n)=>(p(),w(Q,{key:n},{default:t(()=>[e(u,{avatar:""},{default:t(()=>[e(D,{color:"primary",name:"point_of_sale"})]),_:1}),e(u,null,{default:t(()=>[o(s(a.DESTER),1)]),_:2},1024),e(u,null,{default:t(()=>[o(s(Number(a.VENTA).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:2},1024),e(u,null,{default:t(()=>[o(s(a.TCK),1)]),_:2},1024),e(u,null,{default:t(()=>[o(s(Number(a.VENTA/a.TCK).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1}),e(i,null,{default:t(()=>[xt,e(I,{bordered:""},{default:t(()=>[(p(!0),B(U,null,M(c.value.val.sales.ventasdepmonth,(a,n)=>(p(),w(Q,{key:n},{default:t(()=>[e(u,{avatar:""},{default:t(()=>[e(D,{color:"primary",name:"point_of_sale"})]),_:1}),e(u,null,{default:t(()=>[o(s(a.DESTER),1)]),_:2},1024),e(u,null,{default:t(()=>[o(s(Number(a.VENTA).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:2},1024),e(u,null,{default:t(()=>[o(s(a.TCK),1)]),_:2},1024),e(u,null,{default:t(()=>[o(s(Number(a.VENTA/a.TCK).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,")),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(f)]),_:1})]),_:1})}}};export{Wt as default};
