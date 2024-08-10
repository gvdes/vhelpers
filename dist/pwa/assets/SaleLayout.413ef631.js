import{Q as q}from"./position-engine.987468e8.js";import{j as w,c as N,k as E,J as L,r as _,o as n,a as $,w as a,u as A,e,i as s,a3 as Q,U as H,g as r,a4 as i,h as x,a1 as V,a0 as C}from"./index.11398e2a.js";import{a as P,Q as j}from"./axios.151676c1.js";import{_ as z,Q as M}from"./UserToolbar.3d4348d4.js";import{Q as O,a as h,b as c,c as U}from"./QLayout.78a5e73d.js";import{Q as S}from"./QLinearProgress.578c9c15.js";import{Q as I}from"./QSpinnerFacebook.0ae59007.js";import{Q as J}from"./QTooltip.8fa72d2c.js";import{Q as R}from"./QDialog.42c0b89a.js";import{Q as Y}from"./QPage.3c7e04df.js";import{u as G}from"./VDB.ac75e5f5.js";import{u as K}from"./use-quasar.cc6b1f0b.js";const W=["top","middle","bottom"];var B=w({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:l=>W.includes(l)}},setup(l,{slots:g}){const u=N(()=>l.align!==void 0?{verticalAlign:l.align}:null),b=N(()=>{const d=l.outline===!0&&l.color||l.textColor;return`q-badge flex inline items-center no-wrap q-badge--${l.multiLine===!0?"multi":"single"}-line`+(l.outline===!0?" q-badge--outline":l.color!==void 0?` bg-${l.color}`:"")+(d!==void 0?` text-${d}`:"")+(l.floating===!0?" q-badge--floating":"")+(l.rounded===!0?" q-badge--rounded":"")+(l.transparent===!0?" q-badge--transparent":"")});return()=>E("div",{class:b.value,style:u.value,role:"status","aria-label":l.label},L(g.default,l.label!==void 0?[l.label]:[]))}});const X=s("span",{class:"text-h6"},"Consulta Ventas",-1),Z={key:0,class:"row justify-between"},ee=s("div",{class:"text-h6 text-center"},"Ventas 2023",-1),te={class:"text-h4 text-center"},ae=s("div",{class:"text-h6 text-center"},"Tickets 2023",-1),se={class:"text-h4 text-center"},le=s("div",{class:"text-h6 text-center"},"Ventas 2024",-1),oe={class:"text-h4 text-center"},ne=s("div",{class:"text-h6 text-center"},"Tickets 2024",-1),re={class:"text-h4 text-center"},ie=s("div",{class:"text-h6 text-center"},"Diferencia",-1),ce={class:"text-h4 text-center"},ue=s("div",{class:"text-h6 text-center"},"Tickets Diferencia",-1),de={class:"text-h4 text-center"},me=s("div",{class:"text-h6 text-center"},"VENTA HOY ",-1),_e={class:"text-h4 text-center"},ve=s("div",{class:"text-h6 text-center"},"Tickets Hoy",-1),fe={class:"text-h4 text-center"},xe={key:1},he={class:"absolute-full flex flex-center"},ge={key:2},be={class:"absolute-full flex flex-center"},ye={key:0},we={__name:"SaleLayout",setup(l){const g=A(),u=G(),b=K(),d=_(!1),v=_(!1),y=_(!1),t=_(null),m=_(!1),F=async()=>{m.value=!0;let f=`http://${u.session.store.ip}/access/public/reports/getSales`;P.get(f).then(o=>{t.value=o.data,console.log("datos obt"),d.value=!0,v.value=!0,m.value=!1}).catch(o=>{console.log(o.response.data.message)})},T=()=>{v.value=!1,y.value=!0},p=()=>{v.value=!0,y.value=!1};return u.session.rol=="root"||u.session.rol=="gen"?F():(b.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),g.replace("/")),(D,f)=>(n(),$(O,{view:"hHh Lpr fFf"},{default:a(()=>[e(M,{class:"transparent text-dark",bordered:""},{default:a(()=>[e(z),e(q),e(j,{class:"justify-between"},{default:a(()=>[s("div",null,[Q("Helpers "),e(H,{name:"navigate_next",color:"primary"}),Q(),X])]),_:1})]),_:1}),e(U,null,{default:a(()=>[e(Y,{padding:""},{default:a(()=>[d.value?(n(),r("div",Z,[e(h,{class:"my-card",onClick:p},{default:a(()=>[e(c,null,{default:a(()=>[ee,s("div",te,i(Number(t.value.salesant/t.value.salesant*100)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[ae,s("div",se,i(t.value.tiketsant),1)]),_:1})]),_:1}),e(h,{class:"my-card",onClick:p},{default:a(()=>[e(c,null,{default:a(()=>[le,s("div",oe,i(Number(t.value.salesact/t.value.salesant*100).toFixed(2)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[ne,s("div",re,i(t.value.tiketsact),1)]),_:1})]),_:1}),e(h,{class:"my-card",onClick:p},{default:a(()=>[e(c,null,{default:a(()=>[ie,s("div",ce,i(Number(Number(t.value.salesact/t.value.salesant*100)-Number(t.value.salesant/t.value.salesant*100)).toFixed(2)+"%"),1)]),_:1}),e(c,null,{default:a(()=>[ue,s("div",de,i(t.value.tiketsact-t.value.tiketsant),1)]),_:1})]),_:1}),e(h,{class:"my-card",onClick:T},{default:a(()=>[e(c,null,{default:a(()=>[me,s("div",_e,i(Number.parseFloat(t.value.saleshoy).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),1)]),_:1}),e(c,null,{default:a(()=>[ve,s("div",fe,i(t.value.hoytck),1)]),_:1})]),_:1})])):x("",!0),v.value?(n(),r("div",xe,[(n(!0),r(V,null,C(t.value.ventasdepmonth,(o,k)=>(n(),r("div",{class:"q-pa-md",key:k},[e(S,{size:"25px",stripe:"",rounded:"",value:o.VENTA/t.value.salesact,color:"primary"},{default:a(()=>[s("div",he,[e(B,{color:"white","text-color":"accent",label:o.NOMDEP+"   (% "+Number.parseFloat(o.VENTA/t.value.salesact*100).toFixed(2)+")"},null,8,["label"])])]),_:2},1032,["value"])]))),128))])):x("",!0),y.value?(n(),r("div",ge,[(n(!0),r(V,null,C(t.value.ventasdepday,(o,k)=>(n(),r("div",{class:"q-pa-md",key:k},[e(S,{size:"25px",stripe:"",rounded:"",value:o.VENTA/t.value.saleshoy,color:"primary"},{default:a(()=>[s("div",be,[e(B,{color:"white","text-color":"accent",label:o.NOMDEP+"   (% "+Number.parseFloat(o.VENTA/t.value.saleshoy*100).toFixed(2)+")"},null,8,["label"])])]),_:2},1032,["value"])]))),128))])):x("",!0),e(R,{modelValue:m.value,"onUpdate:modelValue":f[0]||(f[0]=o=>m.value=o),persistent:""},{default:a(()=>[m.value?(n(),r("div",ye,[e(I,{color:"primary",size:"7.5em"}),e(J,{offset:[0,8]},{default:a(()=>[Q("Cargando Informacion")]),_:1})])):x("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{we as default};
