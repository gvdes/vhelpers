import{ad as _,ac as h,u as v,r as y,o as x,g as k,i,e as o,f as d,Q as l,a4 as u,w as c,a5 as g,a2 as C,a1 as D}from"./index.bad39945.js";import{Q,a as q}from"./QCard.9d33fcc6.js";import{a as w}from"./QCardActions.24a876bf.js";import{g as V,c as b,Q as B}from"./QDialog.a1998ae0.js";import{u as E}from"./VDB.11ac9c4b.js";function m(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const t=parseInt(e,10);return isNaN(t)?0:t}var N=_({name:"close-popup",beforeMount(e,{value:t}){const s={depth:m(t),handler(a){s.depth!==0&&setTimeout(()=>{const r=V(e);r!==void 0&&b(r,a,s.depth)})},handlerKey(a){h(a,13)===!0&&s.handler(a)}};e.__qclosepopup=s,e.addEventListener("click",s.handler),e.addEventListener("keyup",s.handlerKey)},updated(e,{value:t,oldValue:s}){t!==s&&(e.__qclosepopup.depth=m(t))},beforeUnmount(e){const t=e.__qclosepopup;e.removeEventListener("click",t.handler),e.removeEventListener("keyup",t.handlerKey),delete e.__qclosepopup}});const S={class:"q-pa-sm transparent text-dark row items-center"},K={class:"col"},L={class:"text-h6 text-pink"},P={class:"col text-center fs-inc1 text-primary fw-sbold"},U={class:"col text-right"},$=i("span",{class:"q-ml-sm"},"Estas por cerrar sesion",-1),W={__name:"UserToolbar",setup(e){const t=E(),s=t.session,a=v(),r=y({state:!1}),f=()=>{t.sessionDestroy(),a.replace("/auth")};return(A,n)=>(x(),k(D,null,[i("div",S,[o(l,{color:"primary",icon:"home",flat:"",dense:"",class:"q-mr-sm",onClick:n[0]||(n[0]=p=>d(a).push("/"))}),i("div",K,[i("span",L,u(d(s).credentials.nick),1)]),i("div",P,u(d(s).store.name),1),i("div",U,[o(l,{color:"pink",icon:"logout","no-caps":"",flat:"",onClick:n[1]||(n[1]=p=>r.value.state=!0)})])]),o(B,{modelValue:r.value.state,"onUpdate:modelValue":n[2]||(n[2]=p=>r.value.state=p),persistent:""},{default:c(()=>[o(Q,null,{default:c(()=>[o(q,{class:"row items-center"},{default:c(()=>[o(g,{icon:"logout",color:"primary","text-color":"white"}),$]),_:1}),o(w,{align:"right"},{default:c(()=>[C(o(l,{flat:"",label:"Nope!",color:"primary"},null,512),[[N]]),o(l,{flat:"",label:"Simon!",color:"primary",onClick:f})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{N as C,W as _};