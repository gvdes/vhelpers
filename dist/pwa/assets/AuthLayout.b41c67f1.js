import{u as g,Q as v,a as l}from"./use-quasar.772555ff.js";import{Q as u}from"./QInput.bbf81730.js";import{u as y,r as Q,c as h,o as c,a as x,w as a,e,f as d,g as V,Q as _,h as k,P as S}from"./index.ee411de5.js";import{Q as C}from"./QForm.536ac0a5.js";import{Q as b}from"./QPage.dd71aa4a.js";import{Q as B,a as w}from"./QLayout.5be6e713.js";import{u as N}from"./VDB.4d945a6a.js";import{C as P}from"./index.70a36b3d.js";import"./use-key-composition.b5343cc0.js";import"./uid.937d8ee7.js";import"./QResizeObserver.3a322cf2.js";import"./_commonjsHelpers.88e99c8f.js";const D={key:0,class:"text-center"},M={__name:"AuthLayout",setup(J){const n=N(),i=g(),p=y(),t=Q({nick:"",pass:""}),f=h(()=>t.value.nick&&t.value.pass),m=()=>{console.log("Iniciando sesion ...",t.value);const r=n.findByNick(t.value.nick);if(r)if(P.MD5(t.value.pass).toString()==r.credentials.hash){let o=JSON.parse(JSON.stringify(r));delete o.credentials.pass,S.set("auth",o),n.setSession(o),p.replace("/")}else i.notify({message:"Credenciales erroneas",color:"negative",icon:"fas fa-bugs"});else i.notify({message:"Credenciales erroneas",color:"negative",icon:"fas fa-bugs"})};return(r,s)=>(c(),x(B,{view:"hHh Lpr fFf"},{default:a(()=>[e(w,null,{default:a(()=>[e(b,{padding:"",class:"flex flex-center"},{default:a(()=>[e(v,{flat:"",class:"bg-transparent"},{default:a(()=>[e(l,{class:"row items-center justify-between"},{default:a(()=>s[2]||(s[2]=[d("div",{class:"fs-inc4"},"Acceso",-1),d("div",{class:"text-right fw-xbold text-primary fs-dec2"},"VH v1.0",-1)])),_:1}),e(l,{horizontal:""},{default:a(()=>[e(l,null,{default:a(()=>[e(C,{onSubmit:m,class:"q-gutter-lg"},{default:a(()=>[e(u,{outlined:"",rounded:"",standout:"text-primary",placeholder:"nick","input-class":"fs-inc2 text-center",modelValue:t.value.nick,"onUpdate:modelValue":s[0]||(s[0]=o=>t.value.nick=o),type:"text",autofocus:"",autocapitalize:"off",autocomplete:"off"},null,8,["modelValue"]),e(u,{outlined:"",rounded:"",placeholder:"nip","input-class":"fs-inc2 text-center",modelValue:t.value.pass,"onUpdate:modelValue":s[1]||(s[1]=o=>t.value.pass=o),type:"password"},null,8,["modelValue"]),f.value?(c(),V("div",D,[e(_,{label:"Entrar",type:"submit",color:"primary"})])):k("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};export{M as default};
