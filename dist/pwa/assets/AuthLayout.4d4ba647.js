import{Q as g,a as _,b as h,c as l,d as v}from"./QLayout.324173c3.js";import{Q as u}from"./QInput.5cb787fd.js";import{r as y,c as x,o as c,a as Q,w as t,u as V,e,f as k,g as S,Q as b,h as C,i as d,P as B}from"./index.84395746.js";import{Q as w}from"./QForm.5e450e4d.js";import{u as N}from"./VDB.409ae954.js";import{u as P}from"./use-quasar.c7270a87.js";import{C as D}from"./index.6ece48f5.js";import"./_commonjsHelpers.88e99c8f.js";const J=d("div",{class:"fs-inc4"},"Acceso",-1),L=d("div",{class:"text-right fw-xbold text-primary fs-dec2"},"VH v1.0",-1),q={key:0,class:"text-center"},j={__name:"AuthLayout",setup(z){const r=N(),i=P(),f=V(),a=y({nick:"",pass:""}),p=x(()=>a.value.nick&&a.value.pass),m=()=>{console.log("Iniciando sesion ...",a.value);const n=r.findByNick(a.value.nick);if(n)if(D.MD5(a.value.pass).toString()==n.credentials.hash){let s=JSON.parse(JSON.stringify(n));delete s.credentials.pass,B.set("auth",s),r.setSession(s),f.replace("/")}else i.notify({message:"Credenciales erroneas",color:"negative",icon:"fas fa-bugs"});else i.notify({message:"Credenciales erroneas",color:"negative",icon:"fas fa-bugs"})};return(n,o)=>(c(),Q(g,{view:"hHh Lpr fFf"},{default:t(()=>[e(v,null,{default:t(()=>[e(_,{padding:"",class:"flex flex-center"},{default:t(()=>[e(h,{flat:"",class:"bg-transparent"},{default:t(()=>[e(l,{class:"row items-center justify-between"},{default:t(()=>[J,L]),_:1}),e(l,{horizontal:""},{default:t(()=>[e(l,null,{default:t(()=>[e(w,{onSubmit:m,class:"q-gutter-lg"},{default:t(()=>[e(u,{outlined:"",rounded:"",standout:"text-primary",placeholder:"nick","input-class":"fs-inc2 text-center",modelValue:a.value.nick,"onUpdate:modelValue":o[0]||(o[0]=s=>a.value.nick=s),type:"text",autofocus:"",autocapitalize:"off",autocomplete:"off"},null,8,["modelValue"]),e(u,{outlined:"",rounded:"",placeholder:"nip","input-class":"fs-inc2 text-center",modelValue:a.value.pass,"onUpdate:modelValue":o[1]||(o[1]=s=>a.value.pass=s),type:"password"},null,8,["modelValue"]),k(p)?(c(),S("div",q,[e(b,{label:"Entrar",type:"submit",color:"primary"})])):C("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};export{j as default};
