import{r as s,o as m,a as p,w as e,u as _,e as r,Y as g,i as w,a4 as k,h as y}from"./index.a398b87a.js";import{Q as B}from"./QInput.fcedfc08.js";import{Q as C}from"./QTable.b6d0d7d8.js";import{Q as D,a as N}from"./QCard.3d4f36ea.js";import{Q as S}from"./QDialog.ff319547.js";import{Q as x}from"./QPage.a9aa8a57.js";import{Q as U,a as h}from"./QLayout.33acb715.js";import{u as d}from"./VDB.f91c493a.js";import"./index.6ece48f5.js";import"./AppFullscreen.7e9b2745.js";import{u as I}from"./use-quasar.edf415c4.js";import"./use-key-composition.b68e04f7.js";import"./uid.42677368.js";import"./QSeparator.72efa417.js";import"./QList.848a94ea.js";import"./QSelect.6ecca14a.js";import"./position-engine.dc9ebcfa.js";import"./rtl.b51694b1.js";import"./format.2bc25e5f.js";import"./QLinearProgress.d017e4a7.js";import"./QCheckbox.25ba6f05.js";import"./QResizeObserver.4b2dd9be.js";import"./_commonjsHelpers.88e99c8f.js";const te={__name:"Setter1",setup($){const c=d(),f=I(),Q=_(),v=d(),i=s([]),b=s([{name:"id",field:"id",label:"UID"},{name:"uname",field:"name",label:"Nombre",sortable:!0},{name:"unick",field:a=>a.credentials.nick,label:"nick",sortable:!0},{name:"upass",field:a=>"****",label:"nip"},{name:"store",field:a=>a.store.name,label:"Sucursal",sortable:!0}]),u=s(""),o=s({state:!1,user:null,idx:null}),V=(a,t,l)=>{console.log(a),console.log(t),console.log(l),o.value.idx=l,o.value.user=t,o.value.state=!0},n=()=>{i.value=v.users};return c.session.rol=="root"?n():(f.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),Q.replace("/")),n(),(a,t)=>(m(),p(U,{view:"hHh Lpr fFf"},{default:e(()=>[r(h,null,{default:e(()=>[r(x,{padding:""},{default:e(()=>[r(C,{title:"Usuarios",rows:i.value,columns:b.value,"row-key":"id",onRowClick:V,filter:u.value},{top:e(()=>[r(B,{borderless:"",dense:"",debounce:"150",modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=l=>u.value=l),placeholder:"Buscar"},{append:e(()=>[r(g,{name:"search"})]),_:1},8,["modelValue"])]),_:1},8,["rows","columns","filter"]),r(S,{modelValue:o.value.state,"onUpdate:modelValue":t[1]||(t[1]=l=>o.value.state=l)},{default:e(()=>[o.value.user?(m(),p(D,{key:0},{default:e(()=>[r(N,null,{default:e(()=>[w("pre",null,k(o.value.user),1)]),_:1})]),_:1})):y("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{te as default};