import{Q as C}from"./QHeader.dfec5ce3.js";import{Q as x,a as z,b as f,c as _}from"./QSelect.03026320.js";import{r as b,c as P,o as l,a as d,w as e,u as R,e as i,f as u,h as A,g as B,a0 as y,a1 as V,i as m,a2 as L,a3 as v,a4 as g,a5 as w,a6 as k}from"./index.b3ed90d9.js";import{Q as D}from"./QList.0048b4a1.js";import{Q as N}from"./QPage.ab9a2bda.js";import{Q as H,a as I}from"./QLayout.e69601fb.js";import{u as $}from"./VDB.62f20163.js";import{_ as q}from"./UserToolbar.909d3337.js";import{u as E}from"./use-quasar.ece0bdc1.js";import"./QResizeObserver.b2e7de44.js";import"./use-key-composition.b0fb1ed5.js";import"./uid.42677368.js";import"./position-engine.32f92267.js";import"./QDialog.f55d8d82.js";import"./rtl.b51694b1.js";import"./QCardActions.c4634302.js";import"./ClosePopup.53e9d1f8.js";const F=m("div",{class:"q-py-md text-center"},[m("div",{class:"text-h4 text-indigo-10"},"Menu"),m("div",{class:"text-grey-5"},"Herramientas rapiditas")],-1),ra={__name:"LauncherLayout",setup(G){const a=$(),h=R(),o=a.session,p=E(),s=b({val:a.session.store,opts:[{id:3,name:"San Pablo 1",alias:"SP1",ip:"192.168.100.250:1619",id_viz:3},{id:4,name:"San Pablo 2",alias:"SP2",ip:"192.168.60.253:1619",id_viz:4},{id:6,name:"San Pablo C",alias:"SPC",ip:"192.168.60.249:1619",id_viz:17},{id:7,name:"Sotano",alias:"SOT",ip:"192.168.110.251:1619",id_viz:19},{id:8,name:"Correo 1",alias:"CR1",ip:"192.168.30.253:1619",id_viz:5},{id:9,name:"Correo 2",alias:"CR2",ip:"192.168.50.253:1619",id_viz:6},{id:10,name:"Ramon C 1",alias:"RA1",ip:"192.168.40.253:1619",id_viz:9},{id:11,name:"Ramon C 2",alias:"RA2",ip:"192.168.40.249:1619",id_viz:10},{id:12,name:"Bolivia",alias:"BOL",ip:"192.168.70.253:1619",id_viz:13},{id:13,name:"Brasil 1",alias:"BR1",ip:"192.168.80.253:1619",id_viz:11},{id:16,name:"Apartado 1",alias:"AP1",ip:"192.168.10.55:1619",id_viz:7},{id:17,name:"Apartado 2",alias:"AP2",ip:"192.168.20.249:1619",id_viz:8},{id:18,name:"Puebla",alias:"PUE",ip:"192.168.90.253:1619",id_viz:18},{id:20,name:"Corregidora",alias:"CRG",ip:"192.168.130.2:1619",id_viz:23}]}),r=P(()=>{if(o.rol=="caj")return a.authsCashiers;if(o.rol=="aux")return a.authsAux;if(o.rol=="gen")return a.authGen;if(o.rol=="adm")return a.authAdm;if(o.rol=="root")return a.autRoot;if(o.rol=="aud")return a.autAud;if(o.rol=="ven")return a.authsSeller});if(r.length>1)console.log("vamo a seleccionar modulo");else{console.log(r.length);const n=r[0];n&&h.replace(n.path)}const S=()=>{p.loading.show({message:"Cambiando sucursal"}),a.session.store=s.value.val,a.setSession({...a.session,store:s.value.val}),console.log(a.session),p.loading.hide()};return(n,c)=>(l(),d(H,{view:"hHh Lpr fFf"},{default:e(()=>[i(C,{bordered:"",class:"bg-grey-3"},{default:e(()=>[i(q)]),_:1}),i(I,null,{default:e(()=>[i(N,{class:"flex flex-center",padding:""},{default:e(()=>[i(D,{separator:""},{default:e(()=>[u(a).session.rol=="aud"||u(a).session.rol=="root"?(l(),d(x,{key:0,modelValue:s.value.val,"onUpdate:modelValue":[c[0]||(c[0]=t=>s.value.val=t),S],options:s.value.opts,label:"Selecciona Sucursal","option-label":"name",filled:""},null,8,["modelValue","options"])):A("",!0),F,(l(!0),B(V,null,y(u(r),(t,Q)=>L((l(),d(z,{clickable:"",key:Q,to:t.path},{default:e(()=>[i(f,null,{default:e(()=>[i(_,{class:"text-h6"},{default:e(()=>[v(g(t.name),1)]),_:2},1024),i(_,{caption:""},{default:e(()=>[v(g(t.desc),1)]),_:2},1024)]),_:2},1024),i(f,{avatar:""},{default:e(()=>[i(w,{flat:"",color:"transparent","text-color":"primary",icon:"arrow_forward"})]),_:1})]),_:2},1032,["to"])),[[k]])),128))]),_:1})]),_:1})]),_:1})]),_:1}))}};export{ra as default};