import{Q}from"./QSeparator.ce612a9b.js";import{r,o as _,a as y,w as l,e as o,f as d,a4 as x,Y as C}from"./index.b74b1f02.js";import{Q as P}from"./QToolbar.c58f35c2.js";import{Q as k}from"./QHeader.eda05513.js";import{Q as w}from"./QTable.2918548f.js";import{Q as R}from"./QPage.df9cca3f.js";import{Q as h,a as S}from"./QLayout.6eca8e90.js";import{u as V}from"./VDB.b35d8b80.js";import{_ as B}from"./UserToolbar.c5843b53.js";import{d as N}from"./compareApi.0293d6bf.js";import{u as T}from"./use-quasar.dab623e9.js";import{a as $}from"./axios.9ab26c22.js";import"./QResizeObserver.16876550.js";import"./QList.4a8ecd31.js";import"./QSelect.b35db3ac.js";import"./use-key-composition.a9baf238.js";import"./uid.937d8ee7.js";import"./position-engine.65b3a12c.js";import"./QDialog.326110a0.js";import"./rtl.276c3f1b.js";import"./QLinearProgress.46c8d9f6.js";import"./QCheckbox.3acfccef.js";import"./QCardActions.a3d5e118.js";import"./ClosePopup.65268477.js";import"./axios.ba7b1b0e.js";const se={__name:"reportStock",setup(A){const s=V(),c=T(),m=r([]),u=r([]),p=r([]),i=r([]),f=r({pagination:{rowsPerPage:20},columns:[{name:"code",label:"Codigo",align:"left",field:e=>e.code},{name:"description",label:"Descripcion",align:"left",field:e=>e.description},{name:"section",label:"Seccion",align:"left",field:e=>{var a;return(a=e.categories.familia.seccion)==null?void 0:a.name}},{name:"family",label:"Familia",align:"left",field:e=>{var a;return(a=e.categories.familia)==null?void 0:a.name}},{name:"category",label:"Categoria",align:"left",field:e=>{var a;return(a=e.categories)==null?void 0:a.name}},{name:"pxc",label:"PXC",align:"center",field:e=>e.pieces},{name:"stock",label:"Stock",align:"center",field:e=>e.total_stock},{name:"venta",label:"Venta",align:"center",field:e=>e.total_venta},{name:"compra",label:"Compra",align:"center",field:e=>e.compras}]}),n=r(!1),g=async()=>{n.value=!0;try{const e=await N.getProductReport();e.fail?console.error("Error al obtener los datos:",e.fail):(console.log(e),m.value=e.products,i.value=m.value.map(a=>{const t=p.value.find(b=>b.ARTLFR==a.code)||{COMPRA:0};return{...a,compras:Number(t.COMPRA)}}),console.log(i.value),u.value=e.families)}catch(e){console.error("Error durante la carga de datos:",e),c.notify({message:"Error al cargar los datos",type:"negative"})}finally{n.value=!1}},v=async()=>{let a="http://192.168.10.160:1619/storetools/public/api/Products/getReceived";$.get(a).then(t=>{console.log(t.data),p.value=t.data,g()}).catch(t=>{console.log(t)})};return s.session.rol==="aux"||s.session.rol==="gen"||s.session.rol==="aud"||s.session.rol==="root"?v():(c.notify({message:"No tienes acceso a esta p\xE1gina",type:"negative",position:"center"}),$router.replace("/")),(e,a)=>(_(),y(h,{view:"hHh Lpr fFf"},{default:l(()=>[o(k,{class:"transparent text-dark",bordered:""},{default:l(()=>[o(B),o(Q),o(P,{class:"justify-between"},{default:l(()=>[d("div",null,[a[0]||(a[0]=x(" Helpers ")),o(C,{name:"navigate_next",color:"primary"}),a[1]||(a[1]=d("span",{class:"text-h6"},"Reporte Stocks",-1))])]),_:1})]),_:1}),o(S,null,{default:l(()=>[o(R,{padding:""},{default:l(()=>[o(w,{rows:i.value,loading:n.value,columns:f.value.columns,pagination:f.value.pagination},null,8,["rows","loading","columns","pagination"])]),_:1})]),_:1})]),_:1}))}};export{se as default};
