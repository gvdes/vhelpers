import{Q as g,a as n}from"./QCard.da559450.js";import{Q as u}from"./QInput.3a2caa8e.js";import{r as _,c as h,o as c,a as v,w as a,u as y,e,f as Q,g as x,Q as V,h as k,i as d,P as S}from"./index.c1d18584.js";import{Q as C}from"./QForm.28872589.js";import{Q as b}from"./QPage.eacbdd30.js";import{Q as B,a as w}from"./QLayout.0f4fbdef.js";import{u as N}from"./VDB.b282cc03.js";import{u as P}from"./use-quasar.0c2d8930.js";import{C as D}from"./index.6ece48f5.js";import"./use-key-composition.9bcd2fdd.js";import"./QResizeObserver.892829ff.js";import"./_commonjsHelpers.88e99c8f.js";const J=d("div",{class:"fs-inc4"},"Acceso",-1),L=d("div",{class:"text-right fw-xbold text-primary fs-dec2"},"VH v1.0",-1),q={key:0,class:"text-center"},K={__name:"AuthLayout",setup(z){const l=N(),i=P(),f=y(),t=_({nick:"",pass:""}),p=h(()=>t.value.nick&&t.value.pass),m=()=>{console.log("Iniciando sesion ...",t.value);const r=l.findByNick(t.value.nick);if(r)if(D.MD5(t.value.pass).toString()==r.credentials.hash){let s=JSON.parse(JSON.stringify(r));delete s.credentials.pass,S.set("auth",s),l.setSession(s),f.replace("/")}else i.notify({message:"Credenciales erroneas",color:"negative",icon:"fas fa-bugs"});else i.notify({message:"Credenciales erroneas",color:"negative",icon:"fas fa-bugs"})};return(r,o)=>(c(),v(B,{view:"hHh Lpr fFf"},{default:a(()=>[e(w,null,{default:a(()=>[e(b,{padding:"",class:"flex flex-center"},{default:a(()=>[e(g,{flat:"",class:"bg-transparent"},{default:a(()=>[e(n,{class:"row items-center justify-between"},{default:a(()=>[J,L]),_:1}),e(n,{horizontal:""},{default:a(()=>[e(n,null,{default:a(()=>[e(C,{onSubmit:m,class:"q-gutter-lg"},{default:a(()=>[e(u,{outlined:"",rounded:"",standout:"text-primary",placeholder:"nick","input-class":"fs-inc2 text-center",modelValue:t.value.nick,"onUpdate:modelValue":o[0]||(o[0]=s=>t.value.nick=s),type:"text",autofocus:"",autocapitalize:"off",autocomplete:"off"},null,8,["modelValue"]),e(u,{outlined:"",rounded:"",placeholder:"nip","input-class":"fs-inc2 text-center",modelValue:t.value.pass,"onUpdate:modelValue":o[1]||(o[1]=s=>t.value.pass=s),type:"password"},null,8,["modelValue"]),Q(p)?(c(),x("div",q,[e(V,{label:"Entrar",type:"submit",color:"primary"})])):k("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};export{K as default};
