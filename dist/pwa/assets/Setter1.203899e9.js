import{r as s,o as m,a as p,w as e,u as _,e as r,Y as g,i as w,a4 as k,h as y}from"./index.8d8d529e.js";import{Q as B}from"./QInput.d27f7167.js";import{Q as C}from"./QTable.aa2b7cb2.js";import{u as D,Q as N,a as S}from"./use-quasar.161e4403.js";import{Q as x}from"./QDialog.4e6252b2.js";import{Q as U}from"./QPage.f53ff0e0.js";import{Q as h,a as I}from"./QLayout.23efbfb1.js";import{u as d}from"./VDB.2dc7b5f4.js";import"./index.6ece48f5.js";import"./AppFullscreen.7d864310.js";import"./use-key-composition.2d2755c0.js";import"./uid.42677368.js";import"./QSeparator.f7cfe323.js";import"./QList.7fdda655.js";import"./QSelect.6891a176.js";import"./position-engine.1aaf11ae.js";import"./rtl.b51694b1.js";import"./QLinearProgress.b04f1e19.js";import"./QCheckbox.f1bc2f21.js";import"./QResizeObserver.c7a06aa8.js";import"./_commonjsHelpers.88e99c8f.js";const ae={__name:"Setter1",setup($){const c=d(),f=D(),Q=_(),v=d(),n=s([]),b=s([{name:"id",field:"id",label:"UID"},{name:"uname",field:"name",label:"Nombre",sortable:!0},{name:"unick",field:o=>o.credentials.nick,label:"nick",sortable:!0},{name:"upass",field:o=>"****",label:"nip"},{name:"store",field:o=>o.store.name,label:"Sucursal",sortable:!0}]),u=s(""),a=s({state:!1,user:null,idx:null}),V=(o,t,l)=>{console.log(o),console.log(t),console.log(l),a.value.idx=l,a.value.user=t,a.value.state=!0},i=()=>{n.value=v.users};return c.session.rol=="root"?i():(f.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),Q.replace("/")),i(),(o,t)=>(m(),p(h,{view:"hHh Lpr fFf"},{default:e(()=>[r(I,null,{default:e(()=>[r(U,{padding:""},{default:e(()=>[r(C,{title:"Usuarios",rows:n.value,columns:b.value,"row-key":"id",onRowClick:V,filter:u.value},{top:e(()=>[r(B,{borderless:"",dense:"",debounce:"150",modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=l=>u.value=l),placeholder:"Buscar"},{append:e(()=>[r(g,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","filter"]),r(x,{modelValue:a.value.state,"onUpdate:modelValue":t[1]||(t[1]=l=>a.value.state=l)},{default:e(()=>[a.value.user?(m(),p(N,{key:0},{default:e(()=>[r(S,null,{default:e(()=>[w("pre",null,k(a.value.user),1)]),_:1})]),_:1})):y("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{ae as default};