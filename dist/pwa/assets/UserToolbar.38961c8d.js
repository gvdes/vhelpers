import{u as d,r as f,o as _,g as v,i as e,e as s,f as n,Q as o,a4 as p,w as a,a5 as h,a2 as x,a1 as Q}from"./index.6553c4a3.js";import{Q as g,a as k}from"./use-quasar.2618ef58.js";import{Q as C}from"./QCardActions.b485e075.js";import{Q as y}from"./QDialog.03672914.js";import{C as D}from"./ClosePopup.d20223ef.js";import{u as w}from"./VDB.a74ead22.js";const V={class:"q-pa-sm transparent text-dark row items-center"},B={class:"col"},S={class:"text-h6 text-pink"},b={class:"col text-center fs-inc1 text-primary fw-sbold"},q={class:"col text-right"},N=e("span",{class:"q-ml-sm"},"Estas por cerrar sesion",-1),W={__name:"UserToolbar",setup($){const i=w(),c=i.session,m=d(),r=f({state:!1}),u=()=>{i.sessionDestroy(),m.replace("/auth")};return(A,t)=>(_(),v(Q,null,[e("div",V,[s(o,{color:"primary",icon:"home",flat:"",dense:"",class:"q-mr-sm",onClick:t[0]||(t[0]=l=>n(m).push("/"))}),e("div",B,[e("span",S,p(n(c).credentials.nick),1)]),e("div",b,p(n(c).store.name),1),e("div",q,[s(o,{color:"pink",icon:"logout","no-caps":"",flat:"",onClick:t[1]||(t[1]=l=>r.value.state=!0)})])]),s(y,{modelValue:r.value.state,"onUpdate:modelValue":t[2]||(t[2]=l=>r.value.state=l),persistent:""},{default:a(()=>[s(g,null,{default:a(()=>[s(k,{class:"row items-center"},{default:a(()=>[s(h,{icon:"logout",color:"primary","text-color":"white"}),N]),_:1}),s(C,{align:"right"},{default:a(()=>[x(s(o,{flat:"",label:"Nope!",color:"primary"},null,512),[[D]]),s(o,{flat:"",label:"Simon!",color:"primary",onClick:u})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{W as _};
