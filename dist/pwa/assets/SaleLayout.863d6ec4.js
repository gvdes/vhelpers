import{Q as S}from"./QSeparator.1bab9251.js";import{r as u,o as l,a as w,w as a,u as E,e,i as s,a3 as y,Y as B,g as r,a4 as n,h as f,a1 as Q,a0 as g}from"./index.7c99b950.js";import{Q as L}from"./QToolbar.53e179e0.js";import{Q as A}from"./QHeader.b8b867f7.js";import{u as H,Q as v,a as c}from"./use-quasar.9cecd99a.js";import{Q as k}from"./QBadge.68e6dd61.js";import{Q as N}from"./QLinearProgress.f7db3f6b.js";import{Q as P}from"./QSpinnerFacebook.3b126813.js";import{Q as $}from"./QTooltip.eedca99d.js";import{Q as q}from"./QDialog.33d4e940.js";import{Q as z}from"./QPage.d89a109f.js";import{Q as O,a as j}from"./QLayout.7f8a02b2.js";import{u as I}from"./VDB.bd73a196.js";import{_ as M}from"./UserToolbar.3e76ecc4.js";import{a as U}from"./axios.f1f32898.js";import"./QResizeObserver.117f85ff.js";import"./position-engine.e492bbe1.js";import"./QCardActions.179861b3.js";import"./ClosePopup.aea3cc69.js";const Y=s("span",{class:"text-h6"},"Consulta Ventas",-1),R={key:0,class:"row justify-between"},G=s("div",{class:"text-h6 text-center"},"Ventas 2023",-1),J={class:"text-h4 text-center"},K=s("div",{class:"text-h6 text-center"},"Tickets 2023",-1),W={class:"text-h4 text-center"},X=s("div",{class:"text-h6 text-center"},"Ventas 2024",-1),Z={class:"text-h4 text-center"},ee=s("div",{class:"text-h6 text-center"},"Tickets 2024",-1),te={class:"text-h4 text-center"},ae=s("div",{class:"text-h6 text-center"},"Diferencia",-1),se={class:"text-h4 text-center"},oe=s("div",{class:"text-h6 text-center"},"Tickets Diferencia",-1),le={class:"text-h4 text-center"},re=s("div",{class:"text-h6 text-center"},"VENTA HOY ",-1),ne={class:"text-h4 text-center"},ce=s("div",{class:"text-h6 text-center"},"Tickets Hoy",-1),ie={class:"text-h4 text-center"},ue={key:1},de={class:"absolute-full flex flex-center"},me={key:2},_e={class:"absolute-full flex flex-center"},fe={key:0},Ae={__name:"SaleLayout",setup(ve){const V=E(),d=I(),F=H(),b=u(!1),m=u(!1),h=u(!1),t=u(null),i=u(!1),T=async()=>{i.value=!0;let _=`http://${d.session.store.ip}/access/public/reports/getSales`;U.get(_).then(o=>{console.log(o.data),t.value=o.data,console.log("datos obt"),b.value=!0,m.value=!0,i.value=!1}).catch(o=>{console.log(o.response.data.message)})},C=()=>{m.value=!1,h.value=!0},p=()=>{m.value=!0,h.value=!1};return d.session.rol=="root"||d.session.rol=="gen"||d.session.rol=="aud"?T():(F.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),V.replace("/")),(D,_)=>(l(),w(O,{view:"hHh Lpr fFf"},{default:a(()=>[e(A,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(M),e(S),e(L,{class:"justify-between"},{default:a(()=>[s("div",null,[y("Helpers "),e(B,{name:"navigate_next",color:"primary"}),y(),Y])]),_:1})]),_:1}),e(j,null,{default:a(()=>[e(z,{padding:""},{default:a(()=>[b.value?(l(),r("div",R,[e(v,{class:"my-card",onClick:p},{default:a(()=>[e(c,null,{default:a(()=>[G,s("div",J,n(Number(t.value.salesant/t.value.salesant*100)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[K,s("div",W,n(t.value.tiketsant),1)]),_:1})]),_:1}),e(v,{class:"my-card",onClick:p},{default:a(()=>[e(c,null,{default:a(()=>[X,s("div",Z,n(Number(t.value.salesact/Number(t.value.salesant*1.1)*100).toFixed(2)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[ee,s("div",te,n(t.value.tiketsact),1)]),_:1})]),_:1}),e(v,{class:"my-card",onClick:p},{default:a(()=>[e(c,null,{default:a(()=>[ae,s("div",se,n(Number(Number(t.value.salesact/Number(t.value.salesant*1.1)*100)-Number(Number(t.value.salesant*1.1)/Number(t.value.salesant*1.1)*100)).toFixed(2)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[oe,s("div",le,n(t.value.tiketsact-t.value.tiketsant),1)]),_:1})]),_:1}),e(v,{class:"my-card",onClick:C},{default:a(()=>[e(c,null,{default:a(()=>[re,s("div",ne,n(Number.parseFloat(t.value.saleshoy).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),1)]),_:1}),e(c,null,{default:a(()=>[ce,s("div",ie,n(t.value.hoytck),1)]),_:1})]),_:1})])):f("",!0),m.value?(l(),r("div",ue,[(l(!0),r(Q,null,g(t.value.ventasdepmonth,(o,x)=>(l(),r("div",{class:"q-pa-md",key:x},[e(N,{size:"25px",stripe:"",rounded:"",value:o.VENTA/t.value.salesact,color:"primary"},{default:a(()=>[s("div",de,[e(k,{color:"white","text-color":"accent",label:o.NOMDEP+"   (% "+Number.parseFloat(o.VENTA/t.value.salesact*100).toFixed(2)+")"},null,8,["label"])])]),_:2},1032,["value"])]))),128))])):f("",!0),h.value?(l(),r("div",me,[(l(!0),r(Q,null,g(t.value.ventasdepday,(o,x)=>(l(),r("div",{class:"q-pa-md",key:x},[e(N,{size:"25px",stripe:"",rounded:"",value:o.VENTA/t.value.saleshoy,color:"primary"},{default:a(()=>[s("div",_e,[e(k,{color:"white","text-color":"accent",label:o.NOMDEP+"   (% "+Number.parseFloat(o.VENTA/t.value.saleshoy*100).toFixed(2)+")"},null,8,["label"])])]),_:2},1032,["value"])]))),128))])):f("",!0),e(q,{modelValue:i.value,"onUpdate:modelValue":_[0]||(_[0]=o=>i.value=o),persistent:""},{default:a(()=>[i.value?(l(),r("div",fe,[e(P,{color:"primary",size:"7.5em"}),e($,{offset:[0,8]},{default:a(()=>[y("Cargando Informacion")]),_:1})])):f("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Ae as default};