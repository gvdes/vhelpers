import{Q as X}from"./QSeparator.ad3d8262.js";import{r as U,c as Z,o as we,a as Ee,w as q,e as P,f as _,a4 as le,Y as Ne,a5 as He,Q as O,b2 as ee,a6 as Ie,a3 as ke}from"./index.cbc14e05.js";import{Q as Le}from"./QToolbar.37901c83.js";import{Q as We}from"./QHeader.91b5c196.js";import{Q as K}from"./QSelect.045aa614.js";import{u as qe,Q as te,a as j}from"./use-quasar.21e9871c.js";import{Q as Te}from"./QTable.45c5374a.js";import{Q as Re}from"./QOptionGroup.292d74e7.js";import{Q as se}from"./QCardActions.93d66acc.js";import{Q as ie}from"./QDialog.a8bd5004.js";import{Q as Me}from"./QDate.85f9ba5f.js";import{Q as Ve}from"./QPage.3bc78148.js";import{Q as Qe,a as De}from"./QLayout.43dfd575.js";import{C as Ye}from"./ClosePopup.d6592046.js";import{u as _e}from"./VDB.16835f2e.js";import{_ as Oe}from"./UserToolbar.1c87f466.js";import{v as Ae}from"./axios.ba7b1b0e.js";import{E as Y}from"./jspdf.plugin.autotable.07fd19fc.js";import{d as Xe}from"./dayjs.min.cbcf888d.js";import{E as Ue}from"./exceljs.min.9e24d01d.js";import"./browser.a927a609.js";import"./QResizeObserver.cbf35e3d.js";import"./use-key-composition.115046d5.js";import"./uid.937d8ee7.js";import"./position-engine.24173cfd.js";import"./rtl.276c3f1b.js";import"./QList.f7c67fa7.js";import"./QLinearProgress.81edd6bc.js";import"./QCheckbox.7c04e1cf.js";import"./QRadio.05c891b5.js";import"./use-render-cache.3aae9b27.js";import"./date.48a099d2.js";import"./axios.9ab26c22.js";import"./_commonjsHelpers.88e99c8f.js";var ne={getData(ae,M){return Ae.post(`/compare/getChangePrices/${ae}`,M).then(C=>C.data).catch(C=>({fail:C}))}};const Ge={class:"text-bold"},je={class:"row"},Je={class:"q-pa-md"},Be={class:"q-pa-md"},kt={__name:"ChangePricesLYT",setup(ae){const M=_e(),C=qe(),A=U([]),R=U({state:!1,date:null}),J=U([]),ce=U([{name:"stock_exh",label:"EXHIBICION",field:i=>{var l,r,n;return((n=(r=(l=i.stocks)==null?void 0:l.find(u=>u.pivot))==null?void 0:r.pivot)==null?void 0:n.exh)||0},align:"center",sortable:!0},{name:"stock_gen",label:"GENERAL",field:i=>{var l,r,n;return((n=(r=(l=i.stocks)==null?void 0:l.find(u=>u.pivot))==null?void 0:r.pivot)==null?void 0:n.gen)||0},align:"center",sortable:!0}]),g=U({seccion:{val:null,opts:[]},familias:{val:null,opts:[]},categorias:{val:null,opts:[]}}),G=U({columns:[{name:"code",label:"CODIGO",field:i=>i.code,align:"left",sortable:!0},{name:"barcode",label:"CB",field:i=>i.barcode,align:"left",sortable:!0},{name:"description",label:"DESCRIPCION",field:i=>i.description,align:"left",sortable:!0},{name:"section",label:"SECCION",field:i=>i.categories.familia.seccion.name,align:"left",sortable:!0},{name:"family",label:"FAMILIA",field:i=>i.categories.familia.name,align:"left",sortable:!0},{name:"category",label:"CATEGORIA",field:i=>i.categories.name,align:"left",sortable:!0},{name:"locations",label:"UBICACION",field:i=>{var l;return(l=i.locations)==null?void 0:l.map(r=>r.path).join("/")},align:"center",sortable:!0},...J.value,...ce.value]}),p=U({state:!1,val:null,opts:[{id:1,label:"Navidad Extra Grande"},{id:2,label:"Navidad Grande"},{id:3,label:"Navidad Mediano"},{id:4,label:"Navidad Pequeno"},{id:5,label:"Navidad Vertical"},{id:6,label:"Juguete Ni\xF1o"},{id:7,label:"Juguete Ni\xF1a"},{id:8,label:"Juguete Extra Ni\xF1a"},{id:9,label:"Juguete Extra Ni\xF1o"},{id:10,label:"Juguete Horizontal Ni\xF1o"},{id:11,label:"Juguete Horizontal Ni\xF1a"},{id:12,label:"Rectangular 2x4"}]}),V=U({val:[0,1,2,4],opts:[{label:"Menudeo",value:1},{label:"Mayoreo",value:2},{label:"Docena",value:3},{label:"Caja",value:4}]}),B=Z(()=>A.value.filter(i=>i.prices.some(l=>l.pivot.price!=0))),D=Z(()=>{var i,l,r,n,u,c,x,e,k,T,N,I,F,$,H,L,f,W,S,a,d,Q,b;return((l=(i=g.value)==null?void 0:i.seccion)==null?void 0:l.val)&&!((u=(n=(r=g.value)==null?void 0:r.seccion)==null?void 0:n.familia)!=null&&u.val)?B.value.filter(z=>{var y,t,o;return((o=(t=(y=z.categories)==null?void 0:y.familia)==null?void 0:t.seccion)==null?void 0:o.id)===g.value.seccion.val.id}):((x=(c=g.value)==null?void 0:c.seccion)==null?void 0:x.val)&&((T=(k=(e=g.value)==null?void 0:e.seccion)==null?void 0:k.familia)==null?void 0:T.val)&&!(($=(F=(I=(N=g.value)==null?void 0:N.seccion)==null?void 0:I.familia)==null?void 0:F.categorias)!=null&&$.val)?B.value.filter(z=>{var y,t,o;return((o=(t=(y=z.categories)==null?void 0:y.familia)==null?void 0:t.seccion)==null?void 0:o.id)===g.value.seccion.val.id}):((L=(H=g.value)==null?void 0:H.seccion)==null?void 0:L.val)&&((S=(W=(f=g.value)==null?void 0:f.seccion)==null?void 0:W.familia)==null?void 0:S.val)&&((b=(Q=(d=(a=g.value)==null?void 0:a.seccion)==null?void 0:d.familia)==null?void 0:Q.categorias)==null?void 0:b.val)?B.value.filter(z=>{var y,t,o;return((o=(t=(y=z.categories)==null?void 0:y.familia)==null?void 0:t.seccion)==null?void 0:o.id)===g.value.seccion.val.id}):B.value}),re=Z(()=>{var i,l;return(l=(i=g.value)==null?void 0:i.seccion)!=null&&l.val?g.value.familias.opts.filter(r=>{var n,u;return r.root==((u=(n=g.value)==null?void 0:n.seccion)==null?void 0:u.val.id)}):g.value.familias.opts}),de=Z(()=>{var i,l;return(l=(i=g.value)==null?void 0:i.familias)!=null&&l.val?g.value.categorias.opts.filter(r=>{var n,u;return r.root==((u=(n=g.value)==null?void 0:n.familias)==null?void 0:u.val.id)}):g.value.categorias.opts}),ue=async()=>{C.loading.show({message:"Obteniendo Informacion"});let i=new Date;R.value.date=Xe(i).format("YYYY/MM/DD");let l=M.session.store.id_viz;const r=await ne.getData(l,{fechas:R.value.date});if(r.fail)console.log(r);else{if(console.log(r),A.value=r,A.value.forEach(n=>{let u=oe(n.prices);n._copies=1,n.type=u.type,n.usedPrices=u.prices;const c=n.categories.familia.seccion;c&&!g.value.seccion.opts.map(k=>k.id).includes(c.id)&&g.value.seccion.opts.push(c);const x=n.categories.familia;x&&!g.value.familias.opts.map(k=>k.id).includes(x.id)&&g.value.familias.opts.push(x);const e=n.categories;e&&!g.value.categorias.opts.map(k=>k.id).includes(e.id)&&g.value.categorias.opts.push(e)}),A.value.length>0){const n=A.value[0];n.prices&&n.prices.forEach(u=>{J.value.push({name:`price_${u.id}`,label:u.name,field:c=>{var x,e;return((e=(x=c.prices.find(k=>k.id===u.id))==null?void 0:x.pivot)==null?void 0:e.price)||0},align:"center",sortable:!0})}),G.value.columns=[...G.value.columns,...J.value]}C.loading.hide()}},ve=async()=>{C.loading.show({message:"Obteniendo Informacion"});let i=M.session.store.id_viz;const l=await ne.getData(i,{fechas:R.value.date});if(l.fail)console.log(l);else{if(console.log(l),A.value=l,A.value.forEach(r=>{let n=oe(r.prices);r._copies=1,r.type=n.type,r.usedPrices=n.prices;const u=r.categories.familia.seccion;u&&!g.value.seccion.opts.map(e=>e.id).includes(u.id)&&g.value.seccion.opts.push(u);const c=r.categories.familia;c&&!g.value.familias.opts.map(e=>e.id).includes(c.id)&&g.value.familias.opts.push(c);const x=r.categories;x&&!g.value.categorias.opts.map(e=>e.id).includes(x.id)&&g.value.categorias.opts.push(x)}),A.value.length>0){const r=A.value[0];r.prices&&r.prices.forEach(n=>{J.value.push({name:`price_${n.id}`,label:n.name,field:u=>{var c,x;return((x=(c=u.prices.find(e=>e.id===n.id))==null?void 0:c.pivot)==null?void 0:x.price)||0},align:"center",sortable:!0})}),G.value.columns=[...G.value.columns,...J.value]}C.loading.hide(),R.value.state=!R.value.state}},me=async()=>{const i=new Ue.Workbook,l=i.addWorksheet("Comparativo");l.addRow(G.value.columns.map(x=>x.label)),D.value.forEach(x=>{l.addRow(G.value.columns.map(e=>typeof e.field=="function"?e.field(x):x[e.field]||"-"))}),l.columns.forEach(x=>{let e=0;x.eachCell({includeEmpty:!0},k=>{const T=k.value?k.value.toString().length:10;T>e&&(e=T)}),x.width=e<10?10:e});const r=await i.xlsx.writeBuffer(),n=new Blob([r],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),u=URL.createObjectURL(n),c=document.createElement("a");c.href=u,c.download="Cambio_Precios.xlsx",document.body.appendChild(c),c.click(),document.body.removeChild(c)},oe=(i,l)=>{let r=[...i];const n=r.find(c=>c.pivot._type==4),u=r.find(c=>c.pivot._type==1);if(n.pivot.price==u.pivot.price){let c={id:0,alias:"OFERTA",name:"Oferta",pivot:{price:r[0].pivot.price},used:!0};return console.log("oferta"),{type:"off",prices:[c]}}else return console.log("estandar"),{type:"std",prices:r}},pe=()=>{C.loading.show({message:"Generando Etiquetas"}),p.value.val.id==1?fe(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==2?ge(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==3?he(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==4?be(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==5?xe(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==6?Fe(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==7?Pe(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==8?Se(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==9?ze(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==10?ye(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==11?$e(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):p.value.val.id==12&&Ce(D.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),p.value.state=!1,p.value.val=null,C.loading.hide()}).catch(i=>{console.log(i),alert("Hubo un error al descargar las etiquetas")})},ge=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Navidad/Navidad6(2).png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=100,$=85,H=5,L=5,f=2,S=f*3;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(30),e.setFont("helvetica","bold"),e.text(a.name,t+61,o+77),e.setFontSize(14),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+10,o+25),e.setFontSize(12);let v=o+39,m=7;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(22),e.setFont("helvetica","bold"),e.text("Unico Precio",t+30,v+h*m+5),e.setFontSize(28),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+34,v+h*m+20)):(e.setFontSize(22),e.setFont("helvetica","bold"),e.text(s.alias,t+23,v+h*m),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+45,v+h*m))}),e.setFontSize(16),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+10,o+12),e.text(a.large,t+18,o+74),e.setFont("helvetica","normal"),e.text(`${a.pieces} PZS`,t+70,o+12),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+19,o+77)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),fe=i=>new Promise((l,r)=>{try{const n=i;console.log(n);const u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Navidad/Navidad6(2).png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=205,$=125,H=5,L=5,f=1,S=f*2;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(70),e.setFont("helvetica","bold"),e.text(a.name,t+120,o+112),e.setFontSize(20),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+18,o+31),e.setFontSize(12);let v=o+39,m=12;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(35),e.setFont("helvetica","bold"),e.text("Unico Precio",t+60,v+h*m+10),e.setFontSize(50),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+64,v+h*m+35)):(e.setFontSize(35),e.setFont("helvetica","bold"),e.text(s.alias,t+60,v+h*m+15),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+93,v+h*m+15))}),e.setFontSize(45),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+18,o+23),e.text(a.large,t+35,o+112),e.setFont("helvetica","normal"),e.text(`${a.pieces} PZS`,t+185,o+23,{align:"right"}),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+38,o+114)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),he=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Navidad/Navidad9(1).png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=65,$=85,H=5,L=5,f=3,S=f*3;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+37,o+77),e.setFontSize(10),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+5,o+25),e.setFontSize(12);let v=o+40,m=7;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(18),e.setFont("helvetica","bold"),e.text("Unico Precio",t+13,v+h*m),e.setFontSize(26),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+13,v+h*m+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(s.alias,t+10,v+h*m),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+30,v+h*m))}),e.setFontSize(12),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+25,o+20),e.text(a.large,t+18,o+77),e.text(`${a.pieces} PZS`,t+20,o+73),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+18,o+79)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),be=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Navidad/NaviSan(1).png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=67,$=63,H=0,L=3,f=3,S=f*4;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(18),e.setFont("helvetica","bold"),e.text(a.name,t+23,o+37),e.setFontSize(8),e.setFont("helvetica","normal"),e.text(a.label.substring(0,25),t+15,o+43),e.setFontSize(10);let w=o+36,E=12;a.usedPrices.filter(v=>V.value.val.includes(v.id)).forEach((v,m)=>{v.alias=="OFERTA"?(e.setFontSize(10),e.setFont("helvetica","bold"),e.text("Unico Precio",t+23,w+m*E+12),e.setFontSize(14),e.text(`$ ${Number(v.pivot.price).toFixed(0)}`,t+27,w+m*E+17)):(e.setFontSize(10),e.setFont("helvetica","bold"),e.text(v.alias,t+m*E+10,w+12),e.text(`$ ${Number(v.pivot.price).toFixed(0)}`,t+m*E+10,w+16))}),e.setFontSize(6),e.setFont("helvetica","bold"),e.text(`(${a.code})`,t+28,o+40),e.text(a.large,t+40,o+55),e.text(`${a.pieces} PZS`,t+40,o+57)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),xe=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Navidad/NavidadVer(2).png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=48,$=85,H=5,L=5,f=4,S=f*4;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+20,o+80),e.setFontSize(10),e.setFont("helvetica","normal");const w=F-15,E=e.splitTextToSize(a.label,w);e.text(E,t+5,o+22),e.setFontSize(12);let v=o+35,m=7;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(18),e.setFont("helvetica","bold"),e.text("Unico Precio",t+5,v+h*m),e.setFontSize(26),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+10,v+h*m+15)):(e.setFontSize(16),e.setFont("helvetica","bold"),e.text(s.alias,t+5,v+h*m),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+20,v+h*m))}),e.setFontSize(12),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+24,o+17,{align:"center"}),e.text(a.large,t+20,o+68),e.text(`${a.pieces} PZS`,t+20,o+73),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+18,o+81)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),Fe=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Juguete/Ninio.png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=65,$=85,H=5,L=5,f=3,S=f*3;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+15,o+10),e.setFontSize(10),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+3,o+25),e.setFontSize(12);let v=o+40,m=7;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",t+5,v+h*m),e.setFontSize(20),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+5,v+h*m+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(s.alias,t+2,v+h*m),e.text(`$${Number(s.pivot.price).toFixed(0)}`,t+19,v+h*m))}),e.setFontSize(10),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+45,o+40),e.text(a.large,t+45,o+52),e.text(`${a.pieces} PZS`,t+45,o+46),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+18,o+84)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),Pe=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Juguete/Ninia.png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=65,$=85,H=5,L=5,f=3,S=f*3;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+15,o+20),e.setFontSize(10),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+5,o+25),e.setFontSize(12);let v=o+40,m=7;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",t+15,v+h*m),e.setFontSize(20),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+15,v+h*m+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(s.alias,t+15,v+h*m),e.text(`$${Number(s.pivot.price).toFixed(0)}`,t+32,v+h*m))}),e.setFontSize(13),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+62,o+70,{align:"right"}),e.setFont("helvetica","normal"),e.text(a.large,t+15,o+65),e.text(`${a.pieces} PZS`,t+15,o+70),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+18,o+84)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),Se=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Juguete/xlargeninia.png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=205,$=125,H=5,L=5,f=1,S=f*2;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(70),e.setFont("helvetica","bold"),e.text(a.name,t+120,o+112),e.setFontSize(20),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+18,o+31),e.setFontSize(12);let v=o+39,m=12;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(35),e.setFont("helvetica","bold"),e.text("Unico Precio",t+60,v+h*m+10),e.setFontSize(50),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+64,v+h*m+35)):(e.setFontSize(35),e.setFont("helvetica","bold"),e.text(s.alias,t+60,v+h*m+15),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+93,v+h*m+15))}),e.setFontSize(45),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+18,o+23),e.text(a.large,t+35,o+112),e.setFont("helvetica","normal"),e.text(`${a.pieces} PZS`,t+185,o+23,{align:"right"}),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+38,o+114)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),ze=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Juguete/xlargeninio.png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=205,$=125,H=5,L=5,f=1,S=f*2;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(70),e.setFont("helvetica","bold"),e.text(a.name,t+120,o+112),e.setFontSize(20),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+18,o+31),e.setFontSize(12);let v=o+39,m=12;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(35),e.setFont("helvetica","bold"),e.text("Unico Precio",t+60,v+h*m+10),e.setFontSize(50),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+64,v+h*m+35)):(e.setFontSize(35),e.setFont("helvetica","bold"),e.text(s.alias,t+60,v+h*m+15),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+93,v+h*m+15))}),e.setFontSize(45),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+18,o+23),e.text(a.large,t+35,o+112),e.setFont("helvetica","normal"),e.text(`${a.pieces} PZS`,t+185,o+23,{align:"right"}),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+38,o+114)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),ye=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Juguete/Ninio.png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=100,$=60,H=5,L=5,f=2,S=f*4;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+5,o+10),e.setFontSize(10),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+5,o+15),e.setFontSize(12);let v=o+25,m=7;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",t+15,v+h*m),e.setFontSize(20),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+15,v+h*m+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(s.alias,t+15,v+h*m),e.text(`$${Number(s.pivot.price).toFixed(0)}`,t+32,v+h*m))}),e.setFontSize(13),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+70,o+25),e.text(a.large,t+45,o+52),e.text(`${a.pieces} PZS`,t+70,o+30),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+18,o+84)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),$e=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(a=>{for(let d=0;d<a._copies;d++)u.push(a)});const c="/icons/Juguete/Ninia.png",x="PNG",e=new Y({format:"letter"}),k=e.internal.pageSize.getWidth(),T=e.internal.pageSize.getHeight(),N=5,I=10,F=100,$=60,H=5,L=5,f=2,S=f*4;u.forEach((a,d)=>{const Q=Math.floor(d/S),b=d%S,z=Math.floor(b/f),y=b%f,t=N+y*(F+H),o=I+z*($+L);d>0&&b===0&&e.addPage(),e.addImage(c,x,t,o,F,$),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+5,o+20),e.setFontSize(10),e.setFont("helvetica","normal");const w=F-20,E=e.splitTextToSize(a.label,w);e.text(E,t+5,o+25),e.setFontSize(12);let v=o+32,m=7;a.usedPrices.filter(s=>V.value.val.includes(s.id)).forEach((s,h)=>{s.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",t+20,v+h*m),e.setFontSize(20),e.text(`$ ${Number(s.pivot.price).toFixed(2)}`,t+20,v+h*m+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(s.alias,t+20,v+h*m),e.text(`$${Number(s.pivot.price).toFixed(0)}`,t+37,v+h*m))}),e.setFontSize(13),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+70,o+32),e.text(a.large,t+45,o+52),e.text(`${a.pieces} PZS`,t+70,o+37),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(s=>s.path).join("/"):"",t+18,o+84)}),e.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}}),Ce=i=>new Promise((l,r)=>{try{const n=i,u=[];n.forEach(W=>{for(let S=0;S<W._copies;S++)u.push(W)});const c=new Y({format:"letter"}),x=c.internal.pageSize.getWidth(),e=c.internal.pageSize.getHeight(),k=5,T=10,N=100,I=60,F=5,$=5,H=2,f=H*4;u.forEach((W,S)=>{const a=Math.floor(S/f),d=S%f,Q=Math.floor(d/H),b=d%H,z=k+b*(N+F),y=T+Q*(I+$);S>0&&d===0&&c.addPage(),c.setDrawColor(0),c.setLineWidth(.5),c.rect(z,y,N,I),c.setFontSize(12),c.setFont("helvetica","bold"),c.text("Grupo Vizcarra",z+40,y+5),c.setFontSize(33),c.setFont("helvetica","bold"),c.text(W.name,z+5,y+15),c.setFontSize(10),c.setFont("helvetica","normal");const t=N-20,o=c.splitTextToSize(W.label.toUpperCase(),t);c.text(o,z+5,y+20),c.setFontSize(12);let w=y+32,E=7;W.usedPrices.filter(v=>V.value.val.includes(v.id)).forEach((v,m)=>{v.alias=="OFERTA"?(c.setFontSize(14),c.setFont("helvetica","bold"),c.text("Unico Precio",z+15,w+m*E),c.setFontSize(25),c.text(`$ ${Number(v.pivot.price).toFixed(2)}`,z+20,w+m*E+15)):(c.setFontSize(18),c.setFont("helvetica","bold"),c.text(v.alias,z+15,w+m*E),c.text(`$${Number(v.pivot.price).toFixed(0)}`,z+37,w+m*E))}),c.setFontSize(13),c.setFont("helvetica","bold"),c.text(`${W.code}`,z+66,y+32),c.text(W.large,z+45,y+52),c.text(`${W.pieces} PZS`,z+70,y+37),c.setFontSize(4),c.setFont("helvetica","normal"),c.text(W.locations?W.locations.map(v=>v.path).join("/"):"",z+18,y+55)}),c.save(`${M.session.credentials.nick} etiquetas ${p.value.val.label}`),l()}catch(n){r(n)}});return ue(),(i,l)=>(we(),Ee(Qe,{view:"hHh Lpr fFf"},{default:q(()=>[P(We,{class:"transparent text-dark",bordered:""},{default:q(()=>[P(Oe),P(X),P(Le,{class:"justify-between"},{default:q(()=>[_("div",null,[l[14]||(l[14]=le("Helpers ")),P(Ne,{name:"navigate_next",color:"primary"}),l[15]||(l[15]=le()),l[16]||(l[16]=_("span",{class:"text-h6"},"Cambios de precio",-1))]),_("div",Ge," Cambio de Precios : "+He(typeof R.value.date=="object"?`Del ${R.value.date.from} a ${R.value.date.to}`:R.value.date),1),_("div",je,[P(O,{color:"primary",icon:"event",flat:"",onClick:l[0]||(l[0]=r=>R.value.state=!R.value.state)}),P(X,{spaced:"",inset:"",vertical:"",dark:""}),P(O,{class:"col",flat:"",color:"primary",icon:"download",rounded:"",title:"Importar Excel",onClick:me}),P(X,{spaced:"",inset:"",vertical:"",dark:""}),P(O,{class:"col",flat:"",color:"primary",icon:"label",rounded:"",title:"Crear Etiquetas",onClick:l[1]||(l[1]=r=>p.value.state=!p.value.state)})])]),_:1})]),_:1}),P(De,null,{default:q(()=>[P(Ve,{padding:""},{default:q(()=>[P(te,{class:"my-card"},{default:q(()=>[P(j,{class:"row"},{default:q(()=>[P(K,{class:"col",modelValue:g.value.seccion.val,"onUpdate:modelValue":l[3]||(l[3]=r=>g.value.seccion.val=r),options:g.value.seccion.opts,label:"SECCION",filled:"","option-label":"name"},ee({_:2},[g.value.seccion.val?{name:"append",fn:q(()=>[P(O,{round:"",dense:"",flat:"",icon:"close",onClick:l[2]||(l[2]=r=>{g.value.seccion.val=null,g.value.familias.val=null,g.value.categorias.val=null})})]),key:"0"}:void 0]),1032,["modelValue","options"]),P(X,{spaced:"",inset:"",vertical:"",dark:""}),P(K,{class:"col",modelValue:g.value.familias.val,"onUpdate:modelValue":l[5]||(l[5]=r=>g.value.familias.val=r),options:re.value,label:"FAMILIA",filled:"","option-label":"name",disable:!g.value.seccion.val},ee({_:2},[g.value.familias.val?{name:"append",fn:q(()=>[P(O,{round:"",dense:"",flat:"",icon:"close",onClick:l[4]||(l[4]=r=>{g.value.familias.val=null,g.value.categorias.val=null})})]),key:"0"}:void 0]),1032,["modelValue","options","disable"]),P(X,{spaced:"",inset:"",vertical:"",dark:""}),P(K,{class:"col",modelValue:g.value.categorias.val,"onUpdate:modelValue":l[7]||(l[7]=r=>g.value.categorias.val=r),options:de.value,label:"CATEGORIA",filled:"","option-label":"name",disable:!g.value.familias.val},ee({_:2},[g.value.categorias.val?{name:"append",fn:q(()=>[P(O,{round:"",dense:"",flat:"",icon:"close",onClick:l[6]||(l[6]=r=>g.value.categorias.val=null)})]),key:"0"}:void 0]),1032,["modelValue","options","disable"]),P(X,{spaced:"",inset:"",vertical:"",dark:""})]),_:1})]),_:1}),P(X,{spaced:"",inset:"",vertical:"",dark:""}),P(Te,{rows:D.value,columns:G.value.columns},null,8,["rows","columns"]),P(ie,{modelValue:p.value.state,"onUpdate:modelValue":l[10]||(l[10]=r=>p.value.state=r),persistent:""},{default:q(()=>[P(te,null,{default:q(()=>[P(j,null,{default:q(()=>[_("div",null,[P(X,{spaced:"",inset:"",vertical:"",dark:""}),l[17]||(l[17]=_("div",{class:"text-center text-bold"},"Precios",-1)),_("div",Je,[P(Re,{options:V.value.opts,type:"checkbox",modelValue:V.value.val,"onUpdate:modelValue":l[8]||(l[8]=r=>V.value.val=r),inline:""},null,8,["options","modelValue"])])])]),_:1}),P(j,{class:"row items-center"},{default:q(()=>[P(Ie,{icon:"picture_as_pdf",color:"white","text-color":"red"}),l[18]||(l[18]=_("div",{class:"q-ml-sm"},"En que Formato deseas las etiquetas?",-1))]),_:1}),P(j,null,{default:q(()=>[P(K,{modelValue:p.value.val,"onUpdate:modelValue":l[9]||(l[9]=r=>p.value.val=r),options:p.value.opts,label:"Etiquetas",filled:""},null,8,["modelValue","options"])]),_:1}),P(se,{align:"right"},{default:q(()=>[ke(P(O,{flat:"",label:"Cancel",color:"negative"},null,512),[[Ye]]),P(O,{flat:"",label:"Generar",color:"positive",onClick:pe,disable:p.value.val==null},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),P(ie,{modelValue:R.value.state,"onUpdate:modelValue":l[13]||(l[13]=r=>R.value.state=r)},{default:q(()=>[P(te,{class:"my-card"},{default:q(()=>[P(j,null,{default:q(()=>[_("div",Be,[l[19]||(l[19]=_("div",{class:"q-pb-sm"},null,-1)),P(Me,{modelValue:R.value.date,"onUpdate:modelValue":l[11]||(l[11]=r=>R.value.date=r),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),P(j,null,{default:q(()=>[P(se,{align:"right"},{default:q(()=>[P(O,{flat:"",icon:"close",color:"negative",onClick:l[12]||(l[12]=r=>R.value.state=!R.value.state)}),P(O,{flat:"",icon:"check",color:"positive",onClick:ve})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{kt as default};
