import{Q as z}from"./QHeader.07a50f68.js";import{Q,a as x,b as c,c as f}from"./QSelect.ce47e387.js";import{u as P,r as b,c as R,o as n,a as u,w as e,e as i,a0 as v,h as A,f as m,g as B,a1 as y,a2 as V,a3 as L,a4 as _,a5 as g,a6 as w,a7 as k}from"./index.799ea64d.js";import{Q as D}from"./QList.cb0e0954.js";import{Q as E}from"./QPage.ee291f3e.js";import{Q as I,a as N}from"./QLayout.c9bb255d.js";import{u as F}from"./VDB.629335f4.js";import{_ as H}from"./UserToolbar.8a6b1e74.js";import{u as O}from"./use-quasar.efa320bd.js";import"./QResizeObserver.d6ed544e.js";import"./use-key-composition.e86631ca.js";import"./uid.937d8ee7.js";import"./position-engine.2ec3e418.js";import"./QDialog.037698d8.js";import"./rtl.276c3f1b.js";import"./QCardActions.78604d5b.js";import"./ClosePopup.4819653f.js";const ra={__name:"LauncherLayout",setup($){const a=F(),h=P(),o=a.session,p=O(),s=b({val:a.session.store,opts:[{id:1,name:"CEDIS SP",alias:"CDS",ip:"192.168.10.53:1619",id_viz:1},{id:3,name:"San Pablo 1",alias:"SP1",ip:"192.168.100.250:1619",id_viz:3},{id:4,name:"San Pablo 2",alias:"SP2",ip:"192.168.60.253:1619",id_viz:4},{id:6,name:"San Pablo C",alias:"SPC",ip:"192.168.60.249:1619",id_viz:17},{id:7,name:"Sotano",alias:"SOT",ip:"192.168.150.253:1619",id_viz:19},{id:8,name:"Correo 1",alias:"CR1",ip:"192.168.30.253:1619",id_viz:5},{id:9,name:"Correo 2",alias:"CR2",ip:"192.168.50.253:1619",id_viz:6},{id:10,name:"Ramon C 1",alias:"RA1",ip:"192.168.10.46:1619",id_viz:9},{id:11,name:"Ramon C 2",alias:"RA2",ip:"192.168.10.232:1619",id_viz:10},{id:12,name:"Bolivia",alias:"BOL",ip:"192.168.10.92:1619",id_viz:13},{id:13,name:"Brasil 1",alias:"BR1",ip:"192.168.10.177:1619",id_viz:11},{id:16,name:"Apartado 1",alias:"AP1",ip:"192.168.10.55:1619",id_viz:7},{id:17,name:"Apartado 2",alias:"AP2",ip:"192.168.20.249:1619",id_viz:8},{id:18,name:"Puebla",alias:"PUE",ip:"192.168.90.253:1619",id_viz:18},{id:20,name:"Corregidora",alias:"CRG",ip:"192.168.130.2:1619",id_viz:23},{id:19,name:"Ecommerce",alias:"ECO",ip:"192.168.10.191:1619",id_viz:20}]}),t=R(()=>{if(o.rol=="caj")return a.authsCashiers;if(o.rol=="aux")return a.authsAux;if(o.rol=="gen")return a.authGen;if(o.rol=="adm")return a.authAdm;if(o.rol=="root")return a.autRoot;if(o.rol=="aud")return a.autAud;if(o.rol=="ven")return a.authsSeller;if(o.rol=="floor")return a.authsFloor;if(o.rol=="dir")return a.authdir});if(t.length>1)console.log("vamo a seleccionar modulo");else{console.log(t.length);const d=t[0];d&&h.replace(d.path)}const S=()=>{p.loading.show({message:"Cambiando sucursal"}),a.session.store=s.value.val,a.setSession({...a.session,store:s.value.val}),console.log(a.session),p.loading.hide()};return(d,l)=>(n(),u(I,{view:"hHh Lpr fFf"},{default:e(()=>[i(z,{bordered:"",class:"bg-grey-3"},{default:e(()=>[i(H)]),_:1}),i(N,null,{default:e(()=>[i(E,{class:"flex flex-center",padding:""},{default:e(()=>[i(D,{separator:""},{default:e(()=>[v(a).session.rol=="aud"||v(a).session.rol=="root"?(n(),u(Q,{key:0,modelValue:s.value.val,"onUpdate:modelValue":[l[0]||(l[0]=r=>s.value.val=r),S],options:s.value.opts,label:"Selecciona Sucursal","option-label":"name",filled:""},null,8,["modelValue","options"])):A("",!0),l[1]||(l[1]=m("div",{class:"q-py-md text-center"},[m("div",{class:"text-h4 text-indigo-10"},"Menu"),m("div",{class:"text-grey-5"},"Herramientas rapiditas")],-1)),(n(!0),B(V,null,y(t.value,(r,C)=>L((n(),u(x,{clickable:"",key:C,to:r.path},{default:e(()=>[i(c,null,{default:e(()=>[i(f,{class:"text-h6"},{default:e(()=>[_(g(r.name),1)]),_:2},1024),i(f,{caption:""},{default:e(()=>[_(g(r.desc),1)]),_:2},1024)]),_:2},1024),i(c,{avatar:""},{default:e(()=>[i(w,{flat:"",color:"transparent","text-color":"primary",icon:"arrow_forward"})]),_:1})]),_:2},1032,["to"])),[[k]])),128))]),_:1})]),_:1})]),_:1})]),_:1}))}};export{ra as default};
