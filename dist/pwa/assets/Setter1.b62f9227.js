import{u as _,r as s,o as m,a as p,w as e,e as r,Y as g,f as w,a5 as k,h as y}from"./index.ad93775a.js";import{Q as B}from"./QInput.778f889d.js";import{Q as C}from"./QTable.7df7013c.js";import{u as D,Q as N,a as S}from"./use-quasar.0b385c2f.js";import{Q as x}from"./QDialog.84084cfd.js";import{Q as U}from"./QPage.8994904c.js";import{Q as h,a as I}from"./QLayout.b8466695.js";import{u as d}from"./VDB.3e486cc6.js";import"./index.70a36b3d.js";import"./AppFullscreen.7512cb31.js";import"./use-key-composition.f55f5f94.js";import"./uid.937d8ee7.js";import"./QSeparator.6b89e4f2.js";import"./QList.ef2ca34f.js";import"./QSelect.5b7237bc.js";import"./position-engine.96014762.js";import"./rtl.276c3f1b.js";import"./QLinearProgress.0ce831d2.js";import"./QCheckbox.aff41f06.js";import"./QResizeObserver.cf4e2aed.js";import"./_commonjsHelpers.88e99c8f.js";const ae={__name:"Setter1",setup($){const c=d(),f=D(),Q=_(),v=d(),n=s([]),b=s([{name:"id",field:"id",label:"UID"},{name:"uname",field:"name",label:"Nombre",sortable:!0},{name:"unick",field:o=>o.credentials.nick,label:"nick",sortable:!0},{name:"upass",field:o=>"****",label:"nip"},{name:"store",field:o=>o.store.name,label:"Sucursal",sortable:!0}]),u=s(""),a=s({state:!1,user:null,idx:null}),V=(o,t,l)=>{console.log(o),console.log(t),console.log(l),a.value.idx=l,a.value.user=t,a.value.state=!0},i=()=>{n.value=v.users};return c.session.rol=="root"?i():(f.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),Q.replace("/")),i(),(o,t)=>(m(),p(h,{view:"hHh Lpr fFf"},{default:e(()=>[r(I,null,{default:e(()=>[r(U,{padding:""},{default:e(()=>[r(C,{title:"Usuarios",rows:n.value,columns:b.value,"row-key":"id",onRowClick:V,filter:u.value},{top:e(()=>[r(B,{borderless:"",dense:"",debounce:"150",modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=l=>u.value=l),placeholder:"Buscar"},{append:e(()=>[r(g,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","filter"]),r(x,{modelValue:a.value.state,"onUpdate:modelValue":t[1]||(t[1]=l=>a.value.state=l)},{default:e(()=>[a.value.user?(m(),p(N,{key:0},{default:e(()=>[r(S,null,{default:e(()=>[w("pre",null,k(a.value.user),1)]),_:1})]),_:1})):y("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{ae as default};
