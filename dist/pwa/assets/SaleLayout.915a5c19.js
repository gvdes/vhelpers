import{Q as S}from"./position-engine.3fe932b7.js";import{r as u,o,a as w,w as a,u as E,e,i as s,a3 as y,U as B,g as r,a4 as n,h as m,a1 as b,a0 as k}from"./index.eea6daba.js";import{a as L,Q as A}from"./axios.34f40f8c.js";import{_ as H,Q as P}from"./UserToolbar.9039f2d9.js";import{Q as $,a as v,b as c,c as q}from"./QLayout.3bb03295.js";import{Q as g}from"./QBadge.4fee4c74.js";import{Q as N}from"./QLinearProgress.5d0dfbf2.js";import{Q as z}from"./QSpinnerFacebook.3b0b4363.js";import{Q as O}from"./QTooltip.79340b49.js";import{Q as U}from"./QDialog.c8e62941.js";import{Q as j}from"./QPage.5134ad9c.js";import{u as I}from"./VDB.cfa23985.js";import{u as M}from"./use-quasar.a0b9779e.js";const R=s("span",{class:"text-h6"},"Consulta Ventas",-1),Y={key:0,class:"row justify-between"},G=s("div",{class:"text-h6 text-center"},"Ventas 2023",-1),J={class:"text-h4 text-center"},K=s("div",{class:"text-h6 text-center"},"Tickets 2023",-1),W={class:"text-h4 text-center"},X=s("div",{class:"text-h6 text-center"},"Ventas 2024",-1),Z={class:"text-h4 text-center"},ee=s("div",{class:"text-h6 text-center"},"Tickets 2024",-1),te={class:"text-h4 text-center"},ae=s("div",{class:"text-h6 text-center"},"Diferencia",-1),se={class:"text-h4 text-center"},le=s("div",{class:"text-h6 text-center"},"Tickets Diferencia",-1),oe={class:"text-h4 text-center"},re=s("div",{class:"text-h6 text-center"},"VENTA HOY ",-1),ne={class:"text-h4 text-center"},ce=s("div",{class:"text-h6 text-center"},"Tickets Hoy",-1),ie={class:"text-h4 text-center"},ue={key:1},de={class:"absolute-full flex flex-center"},_e={key:2},me={class:"absolute-full flex flex-center"},ve={key:0},De={__name:"SaleLayout",setup(fe){const V=E(),f=I(),F=M(),Q=u(!1),d=u(!1),h=u(!1),t=u(null),i=u(!1),T=async()=>{i.value=!0;let _=`http://${f.session.store.ip}/access/public/reports/getSales`;L.get(_).then(l=>{t.value=l.data,console.log("datos obt"),Q.value=!0,d.value=!0,i.value=!1}).catch(l=>{console.log(l.response.data.message)})},C=()=>{d.value=!1,h.value=!0},x=()=>{d.value=!0,h.value=!1};return f.session.rol=="root"||f.session.rol=="gen"?T():(F.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),V.replace("/")),(D,_)=>(o(),w($,{view:"hHh Lpr fFf"},{default:a(()=>[e(P,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(H),e(S),e(A,{class:"justify-between"},{default:a(()=>[s("div",null,[y("Helpers "),e(B,{name:"navigate_next",color:"primary"}),y(),R])]),_:1})]),_:1}),e(q,null,{default:a(()=>[e(j,{padding:""},{default:a(()=>[Q.value?(o(),r("div",Y,[e(v,{class:"my-card",onClick:x},{default:a(()=>[e(c,null,{default:a(()=>[G,s("div",J,n(Number(t.value.salesant/t.value.salesant*100)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[K,s("div",W,n(t.value.tiketsant),1)]),_:1})]),_:1}),e(v,{class:"my-card",onClick:x},{default:a(()=>[e(c,null,{default:a(()=>[X,s("div",Z,n(Number(t.value.salesact/t.value.salesant*100).toFixed(2)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[ee,s("div",te,n(t.value.tiketsact),1)]),_:1})]),_:1}),e(v,{class:"my-card",onClick:x},{default:a(()=>[e(c,null,{default:a(()=>[ae,s("div",se,n(Number(Number(t.value.salesact/t.value.salesant*100)-Number(t.value.salesant/t.value.salesant*100)).toFixed(2)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[le,s("div",oe,n(t.value.tiketsact-t.value.tiketsant),1)]),_:1})]),_:1}),e(v,{class:"my-card",onClick:C},{default:a(()=>[e(c,null,{default:a(()=>[re,s("div",ne,n(Number.parseFloat(t.value.saleshoy).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),1)]),_:1}),e(c,null,{default:a(()=>[ce,s("div",ie,n(t.value.hoytck),1)]),_:1})]),_:1})])):m("",!0),d.value?(o(),r("div",ue,[(o(!0),r(b,null,k(t.value.ventasdepmonth,(l,p)=>(o(),r("div",{class:"q-pa-md",key:p},[e(N,{size:"25px",stripe:"",rounded:"",value:l.VENTA/t.value.salesact,color:"primary"},{default:a(()=>[s("div",de,[e(g,{color:"white","text-color":"accent",label:l.NOMDEP+"   (% "+Number.parseFloat(l.VENTA/t.value.salesact*100).toFixed(2)+")"},null,8,["label"])])]),_:2},1032,["value"])]))),128))])):m("",!0),h.value?(o(),r("div",_e,[(o(!0),r(b,null,k(t.value.ventasdepday,(l,p)=>(o(),r("div",{class:"q-pa-md",key:p},[e(N,{size:"25px",stripe:"",rounded:"",value:l.VENTA/t.value.saleshoy,color:"primary"},{default:a(()=>[s("div",me,[e(g,{color:"white","text-color":"accent",label:l.NOMDEP+"   (% "+Number.parseFloat(l.VENTA/t.value.saleshoy*100).toFixed(2)+")"},null,8,["label"])])]),_:2},1032,["value"])]))),128))])):m("",!0),e(U,{modelValue:i.value,"onUpdate:modelValue":_[0]||(_[0]=l=>i.value=l),persistent:""},{default:a(()=>[i.value?(o(),r("div",ve,[e(z,{color:"primary",size:"7.5em"}),e(O,{offset:[0,8]},{default:a(()=>[y("Cargando Informacion")]),_:1})])):m("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{De as default};
