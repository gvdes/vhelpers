import{r as s,o as m,a as p,w as e,u as _,e as r,Y as g,i as w,a4 as k,h as y}from"./index.750b3491.js";import{Q as B}from"./QInput.2406b7dd.js";import{Q as C}from"./QTable.846c2436.js";import{Q as D,a as N}from"./QCard.ec4d1510.js";import{Q as S}from"./QDialog.103c29de.js";import{Q as x}from"./QPage.ea685eba.js";import{Q as U,a as h}from"./QLayout.98b6d629.js";import{u as d}from"./VDB.65b3b90d.js";import"./index.6ece48f5.js";import"./AppFullscreen.b0b133b5.js";import{u as I}from"./use-quasar.77a22ded.js";import"./use-key-composition.7cafde3c.js";import"./uid.42677368.js";import"./QSeparator.1de90a6d.js";import"./QList.2169c3cd.js";import"./QSelect.9834a7f2.js";import"./position-engine.9a2e921b.js";import"./rtl.b51694b1.js";import"./QLinearProgress.bb3f4930.js";import"./QCheckbox.2ab8b26b.js";import"./QResizeObserver.7296d302.js";import"./_commonjsHelpers.88e99c8f.js";const oe={__name:"Setter1",setup($){const c=d(),f=I(),Q=_(),v=d(),i=s([]),b=s([{name:"id",field:"id",label:"UID"},{name:"uname",field:"name",label:"Nombre",sortable:!0},{name:"unick",field:o=>o.credentials.nick,label:"nick",sortable:!0},{name:"upass",field:o=>"****",label:"nip"},{name:"store",field:o=>o.store.name,label:"Sucursal",sortable:!0}]),u=s(""),a=s({state:!1,user:null,idx:null}),V=(o,t,l)=>{console.log(o),console.log(t),console.log(l),a.value.idx=l,a.value.user=t,a.value.state=!0},n=()=>{i.value=v.users};return c.session.rol=="root"?n():(f.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),Q.replace("/")),n(),(o,t)=>(m(),p(U,{view:"hHh Lpr fFf"},{default:e(()=>[r(h,null,{default:e(()=>[r(x,{padding:""},{default:e(()=>[r(C,{title:"Usuarios",rows:i.value,columns:b.value,"row-key":"id",onRowClick:V,filter:u.value},{top:e(()=>[r(B,{borderless:"",dense:"",debounce:"150",modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=l=>u.value=l),placeholder:"Buscar"},{append:e(()=>[r(g,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","filter"]),r(S,{modelValue:a.value.state,"onUpdate:modelValue":t[1]||(t[1]=l=>a.value.state=l)},{default:e(()=>[a.value.user?(m(),p(D,{key:0},{default:e(()=>[r(N,null,{default:e(()=>[w("pre",null,k(a.value.user),1)]),_:1})]),_:1})):y("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{oe as default};