import{Q as A}from"./QSeparator.9b22600b.js";import{r as Y,c as B,o as Pe,a as Se,w as _,e as z,i as G,a3 as te,Y as ze,Q as X,b1 as Z,f as K,a5 as ye,a2 as $e}from"./index.6553c4a3.js";import{Q as Ce}from"./QToolbar.b4a2aaab.js";import{Q as Ee}from"./QHeader.e3c4603e.js";import{Q as U}from"./QSelect.1376d70e.js";import{u as we,Q as ae,a as j}from"./use-quasar.2618ef58.js";import{Q as Ne}from"./QTable.276907f1.js";import{Q as He}from"./QOptionGroup.7bea4291.js";import{Q as Ie}from"./QCardActions.b485e075.js";import{Q as Le}from"./QDialog.03672914.js";import{Q as We}from"./QPage.fecb4179.js";import{Q as ke,a as qe}from"./QLayout.b7211c56.js";import{C as _e}from"./ClosePopup.d20223ef.js";import{u as Te}from"./VDB.a74ead22.js";import{_ as Re}from"./UserToolbar.38961c8d.js";import{v as Qe}from"./axios.30672b3a.js";import{E as O}from"./jspdf.plugin.autotable.a433bb4f.js";import{E as Me}from"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import"./QResizeObserver.718ce7c7.js";import"./use-key-composition.a57e001a.js";import"./uid.42677368.js";import"./position-engine.3f787d31.js";import"./rtl.b51694b1.js";import"./QList.a86a105f.js";import"./QLinearProgress.35050ded.js";import"./QCheckbox.08cf0c53.js";import"./QRadio.0a02b43c.js";import"./axios.f1f32898.js";import"./_commonjsHelpers.88e99c8f.js";var Oe={getData(ee){return Qe.get(`/compare/getChangePrices/${ee}`).then(W=>W.data).catch(W=>({fail:W}))}};const Ve=G("span",{class:"text-h6"},"Cambios de precio",-1),Ae={class:"row"},Ye=G("div",{class:"text-center text-bold"},"Precios",-1),Xe={class:"q-pa-md"},Ge=G("div",{class:"q-ml-sm"},"En que Formato deseas las etiquetas?",-1),zt={__name:"ChangePricesLYT",setup(ee){const W=Te(),C=we(),V=Y([]),J=Y([]),oe=Y([{name:"stock_exh",label:"EXHIBICION",field:i=>{var n,c,r;return((r=(c=(n=i.stocks)==null?void 0:n.find(u=>u.pivot))==null?void 0:c.pivot)==null?void 0:r.exh)||0},align:"center"},{name:"stock_gen",label:"GENERAL",field:i=>{var n,c,r;return((r=(c=(n=i.stocks)==null?void 0:n.find(u=>u.pivot))==null?void 0:c.pivot)==null?void 0:r.gen)||0},align:"center"}]),b=Y({seccion:{val:null,opts:[]},familias:{val:null,opts:[]},categorias:{val:null,opts:[]}}),D=Y({columns:[{name:"code",label:"CODIGO",field:i=>i.code,align:"left"},{name:"barcode",label:"CB",field:i=>i.barcode,align:"left"},{name:"description",label:"DESCRIPCION",field:i=>i.description,align:"left"},{name:"section",label:"SECCION",field:i=>i.categories.familia.seccion.name,align:"left"},{name:"family",label:"FAMILIA",field:i=>i.categories.familia.name,align:"left"},{name:"category",label:"CATEGORIA",field:i=>i.categories.name,align:"left"},{name:"locations",label:"UBICACION",field:i=>{var n;return(n=i.locations)==null?void 0:n.map(c=>c.path).join("/")},align:"center"},...J.value,...oe.value]}),g=Y({state:!1,val:null,opts:[{id:1,label:"Navidad Extra Grande"},{id:2,label:"Navidad Grande"},{id:3,label:"Navidad Mediano"},{id:4,label:"Navidad Pequeno"},{id:5,label:"Navidad Vertical"},{id:6,label:"Juguete Ni\xF1o"},{id:7,label:"Juguete Ni\xF1a"},{id:8,label:"Juguete Extra Ni\xF1a"},{id:9,label:"Juguete Extra Ni\xF1o"},{id:10,label:"Juguete Horizontal Ni\xF1o"},{id:11,label:"Juguete Horizontal Ni\xF1a"}]}),T=Y({val:[0,1,2,4],opts:[{label:"Menudeo",value:1},{label:"Mayoreo",value:2},{label:"Docena",value:3},{label:"Caja",value:4}]}),R=B(()=>{var i,n,c,r,u,x,F,e,k,q,E,w,f,P,N,H,p,Q,S,a,s,M,h;return((n=(i=b.value)==null?void 0:i.seccion)==null?void 0:n.val)&&!((u=(r=(c=b.value)==null?void 0:c.seccion)==null?void 0:r.familia)!=null&&u.val)?V.value.filter($=>{var y,t,o;return((o=(t=(y=$.categories)==null?void 0:y.familia)==null?void 0:t.seccion)==null?void 0:o.id)===b.value.seccion.val.id}):((F=(x=b.value)==null?void 0:x.seccion)==null?void 0:F.val)&&((q=(k=(e=b.value)==null?void 0:e.seccion)==null?void 0:k.familia)==null?void 0:q.val)&&!((P=(f=(w=(E=b.value)==null?void 0:E.seccion)==null?void 0:w.familia)==null?void 0:f.categorias)!=null&&P.val)?V.value.filter($=>{var y,t,o;return((o=(t=(y=$.categories)==null?void 0:y.familia)==null?void 0:t.seccion)==null?void 0:o.id)===b.value.seccion.val.id}):((H=(N=b.value)==null?void 0:N.seccion)==null?void 0:H.val)&&((S=(Q=(p=b.value)==null?void 0:p.seccion)==null?void 0:Q.familia)==null?void 0:S.val)&&((h=(M=(s=(a=b.value)==null?void 0:a.seccion)==null?void 0:s.familia)==null?void 0:M.categorias)==null?void 0:h.val)?V.value.filter($=>{var y,t,o;return((o=(t=(y=$.categories)==null?void 0:y.familia)==null?void 0:t.seccion)==null?void 0:o.id)===b.value.seccion.val.id}):V.value}),le=B(()=>{var i,n;return(n=(i=b.value)==null?void 0:i.seccion)!=null&&n.val?b.value.familias.opts.filter(c=>{var r,u;return c.root==((u=(r=b.value)==null?void 0:r.seccion)==null?void 0:u.val.id)}):b.value.familias.opts}),se=B(()=>{var i,n;return(n=(i=b.value)==null?void 0:i.familias)!=null&&n.val?b.value.categorias.opts.filter(c=>{var r,u;return c.root==((u=(r=b.value)==null?void 0:r.familias)==null?void 0:u.val.id)}):b.value.categorias.opts}),ie=async()=>{C.loading.show({message:"Obteniendo Informacion"});let i=W.session.store.id_viz;const n=await Oe.getData(i);if(n.fail)console.log(n);else{if(console.log(n),V.value=n,V.value.forEach(c=>{let r=ce(c.prices);c._copies=1,c.type=r.type,c.usedPrices=r.prices;const u=c.categories.familia.seccion;u&&!b.value.seccion.opts.map(e=>e.id).includes(u.id)&&b.value.seccion.opts.push(u);const x=c.categories.familia;x&&!b.value.familias.opts.map(e=>e.id).includes(x.id)&&b.value.familias.opts.push(x);const F=c.categories;F&&!b.value.categorias.opts.map(e=>e.id).includes(F.id)&&b.value.categorias.opts.push(F)}),V.value.length>0){const c=V.value[0];c.prices&&c.prices.forEach(r=>{J.value.push({name:`price_${r.id}`,label:r.name,field:u=>{var x,F;return((F=(x=u.prices.find(e=>e.id===r.id))==null?void 0:x.pivot)==null?void 0:F.price)||0},align:"center"})}),D.value.columns=[...D.value.columns,...J.value]}C.loading.hide()}},ne=async()=>{const i=new Me.Workbook,n=i.addWorksheet("Comparativo");n.addRow(D.value.columns.map(F=>F.label)),R.value.forEach(F=>{n.addRow(D.value.columns.map(e=>typeof e.field=="function"?e.field(F):F[e.field]||"-"))}),n.columns.forEach(F=>{let e=0;F.eachCell({includeEmpty:!0},k=>{const q=k.value?k.value.toString().length:10;q>e&&(e=q)}),F.width=e<10?10:e});const c=await i.xlsx.writeBuffer(),r=new Blob([c],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),u=URL.createObjectURL(r),x=document.createElement("a");x.href=u,x.download="Cambio_Precios.xlsx",document.body.appendChild(x),x.click(),document.body.removeChild(x)},ce=(i,n)=>{let c=[...i];const r=c.find(x=>x.pivot._type==4),u=c.find(x=>x.pivot._type==1);if(r.pivot.price==u.pivot.price){let x={id:0,alias:"OFERTA",name:"Oferta",pivot:{price:c[0].pivot.price},used:!0};return console.log("oferta"),{type:"off",prices:[x]}}else return console.log("estandar"),{type:"std",prices:c}},re=()=>{C.loading.show({message:"Generando Etiquetas"}),g.value.val.id==1?ue(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==2?de(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==3?ve(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==4?ge(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==5?me(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==6?pe(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==7?he(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==8?fe(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==9?be(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==10?xe(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")}):g.value.val.id==11&&Fe(R.value).then(i=>{C.notify({message:"Se Descargo las etiquetas Correctamente",type:"positive",position:"center"}),g.value.state=!1,g.value.val=null,C.loading.hide()}).catch(i=>{alert("Hubo un error al descargar las etiquetas")})},de=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Navidad/Navidad6(2).png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=100,P=85,N=5,H=5,p=2,S=p*3;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(30),e.setFont("helvetica","bold"),e.text(a.name,t+61,o+77),e.setFontSize(14),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+10,o+25),e.setFontSize(12);let d=o+39,v=7;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(22),e.setFont("helvetica","bold"),e.text("Unico Precio",t+30,d+m*v+5),e.setFontSize(28),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+34,d+m*v+20)):(e.setFontSize(22),e.setFont("helvetica","bold"),e.text(l.alias,t+23,d+m*v),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+45,d+m*v))}),e.setFontSize(16),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+10,o+12),e.text(a.large,t+18,o+74),e.setFont("helvetica","normal"),e.text(`${a.pieces} PZS`,t+70,o+12),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+19,o+77)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),ue=i=>new Promise((n,c)=>{try{const r=i;console.log(r);const u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Navidad/Navidad6(2).png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=205,P=125,N=5,H=5,p=1,S=p*2;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(70),e.setFont("helvetica","bold"),e.text(a.name,t+120,o+112),e.setFontSize(20),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+18,o+31),e.setFontSize(12);let d=o+39,v=12;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(35),e.setFont("helvetica","bold"),e.text("Unico Precio",t+60,d+m*v+10),e.setFontSize(50),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+64,d+m*v+35)):(e.setFontSize(35),e.setFont("helvetica","bold"),e.text(l.alias,t+60,d+m*v+15),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+93,d+m*v+15))}),e.setFontSize(45),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+18,o+23),e.text(a.large,t+35,o+112),e.setFont("helvetica","normal"),e.text(`${a.pieces} PZS`,t+185,o+23,{align:"right"}),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+38,o+114)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),ve=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Navidad/Navidad9(1).png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=65,P=85,N=5,H=5,p=3,S=p*3;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+37,o+77),e.setFontSize(10),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+5,o+25),e.setFontSize(12);let d=o+40,v=7;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(18),e.setFont("helvetica","bold"),e.text("Unico Precio",t+13,d+m*v),e.setFontSize(26),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+13,d+m*v+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(l.alias,t+10,d+m*v),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+30,d+m*v))}),e.setFontSize(12),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+25,o+20),e.text(a.large,t+18,o+77),e.text(`${a.pieces} PZS`,t+20,o+73),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+18,o+79)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),ge=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Navidad/NaviSan(1).png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=67,P=63,N=0,H=3,p=3,S=p*4;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(18),e.setFont("helvetica","bold"),e.text(a.name,t+23,o+37),e.setFontSize(8),e.setFont("helvetica","normal"),e.text(a.label.substring(0,25),t+15,o+43),e.setFontSize(10);let I=o+36,L=12;a.usedPrices.filter(d=>T.value.val.includes(d.id)).forEach((d,v)=>{d.alias=="OFERTA"?(e.setFontSize(10),e.setFont("helvetica","bold"),e.text("Unico Precio",t+23,I+v*L+12),e.setFontSize(14),e.text(`$ ${Number(d.pivot.price).toFixed(0)}`,t+27,I+v*L+17)):(e.setFontSize(10),e.setFont("helvetica","bold"),e.text(d.alias,t+v*L+10,I+12),e.text(`$ ${Number(d.pivot.price).toFixed(0)}`,t+v*L+10,I+16))}),e.setFontSize(6),e.setFont("helvetica","bold"),e.text(`(${a.code})`,t+28,o+40),e.text(a.large,t+40,o+55),e.text(`${a.pieces} PZS`,t+40,o+57)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),me=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Navidad/NavidadVer(2).png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=48,P=85,N=5,H=5,p=4,S=p*4;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+20,o+80),e.setFontSize(10),e.setFont("helvetica","normal");const I=f-15,L=e.splitTextToSize(a.label,I);e.text(L,t+5,o+22),e.setFontSize(12);let d=o+35,v=7;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(18),e.setFont("helvetica","bold"),e.text("Unico Precio",t+5,d+m*v),e.setFontSize(26),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+10,d+m*v+15)):(e.setFontSize(16),e.setFont("helvetica","bold"),e.text(l.alias,t+5,d+m*v),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+20,d+m*v))}),e.setFontSize(12),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+24,o+17,{align:"center"}),e.text(a.large,t+20,o+68),e.text(`${a.pieces} PZS`,t+20,o+73),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+18,o+81)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),pe=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Juguete/Ninio.png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=65,P=85,N=5,H=5,p=3,S=p*3;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+15,o+10),e.setFontSize(10),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+3,o+25),e.setFontSize(12);let d=o+40,v=7;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",t+5,d+m*v),e.setFontSize(20),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+5,d+m*v+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(l.alias,t+2,d+m*v),e.text(`$${Number(l.pivot.price).toFixed(0)}`,t+19,d+m*v))}),e.setFontSize(10),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+45,o+40),e.text(a.large,t+45,o+52),e.text(`${a.pieces} PZS`,t+45,o+46),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+18,o+84)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),he=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Juguete/Ninia.png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=65,P=85,N=5,H=5,p=3,S=p*3;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+15,o+20),e.setFontSize(10),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+5,o+25),e.setFontSize(12);let d=o+40,v=7;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",t+15,d+m*v),e.setFontSize(20),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+15,d+m*v+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(l.alias,t+15,d+m*v),e.text(`$${Number(l.pivot.price).toFixed(0)}`,t+32,d+m*v))}),e.setFontSize(13),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+62,o+70,{align:"right"}),e.setFont("helvetica","normal"),e.text(a.large,t+15,o+65),e.text(`${a.pieces} PZS`,t+15,o+70),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+18,o+84)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),fe=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Juguete/xlargeninia.png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=205,P=125,N=5,H=5,p=1,S=p*2;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(70),e.setFont("helvetica","bold"),e.text(a.name,t+120,o+112),e.setFontSize(20),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+18,o+31),e.setFontSize(12);let d=o+39,v=12;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(35),e.setFont("helvetica","bold"),e.text("Unico Precio",t+60,d+m*v+10),e.setFontSize(50),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+64,d+m*v+35)):(e.setFontSize(35),e.setFont("helvetica","bold"),e.text(l.alias,t+60,d+m*v+15),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+93,d+m*v+15))}),e.setFontSize(45),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+18,o+23),e.text(a.large,t+35,o+112),e.setFont("helvetica","normal"),e.text(`${a.pieces} PZS`,t+185,o+23,{align:"right"}),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+38,o+114)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),be=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Juguete/xlargeninio.png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=205,P=125,N=5,H=5,p=1,S=p*2;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(70),e.setFont("helvetica","bold"),e.text(a.name,t+120,o+112),e.setFontSize(20),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+18,o+31),e.setFontSize(12);let d=o+39,v=12;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(35),e.setFont("helvetica","bold"),e.text("Unico Precio",t+60,d+m*v+10),e.setFontSize(50),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+64,d+m*v+35)):(e.setFontSize(35),e.setFont("helvetica","bold"),e.text(l.alias,t+60,d+m*v+15),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+93,d+m*v+15))}),e.setFontSize(45),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+18,o+23),e.text(a.large,t+35,o+112),e.setFont("helvetica","normal"),e.text(`${a.pieces} PZS`,t+185,o+23,{align:"right"}),e.setFontSize(6),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+38,o+114)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),xe=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Juguete/Ninio.png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=100,P=60,N=5,H=5,p=2,S=p*4;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+5,o+10),e.setFontSize(10),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+5,o+15),e.setFontSize(12);let d=o+25,v=7;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",t+15,d+m*v),e.setFontSize(20),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+15,d+m*v+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(l.alias,t+15,d+m*v),e.text(`$${Number(l.pivot.price).toFixed(0)}`,t+32,d+m*v))}),e.setFontSize(13),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+70,o+25),e.text(a.large,t+45,o+52),e.text(`${a.pieces} PZS`,t+70,o+30),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+18,o+84)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}}),Fe=i=>new Promise((n,c)=>{try{const r=i,u=[];r.forEach(a=>{for(let s=0;s<a._copies;s++)u.push(a)});const x="/icons/Juguete/Ninia.png",F="PNG",e=new O({format:"letter"}),k=e.internal.pageSize.getWidth(),q=e.internal.pageSize.getHeight(),E=5,w=10,f=100,P=60,N=5,H=5,p=2,S=p*4;u.forEach((a,s)=>{const M=Math.floor(s/S),h=s%S,$=Math.floor(h/p),y=h%p,t=E+y*(f+N),o=w+$*(P+H);s>0&&h===0&&e.addPage(),e.addImage(x,F,t,o,f,P),e.setFontSize(22),e.setFont("helvetica","bold"),e.text(a.name,t+5,o+20),e.setFontSize(10),e.setFont("helvetica","normal");const I=f-20,L=e.splitTextToSize(a.label,I);e.text(L,t+5,o+25),e.setFontSize(12);let d=o+32,v=7;a.usedPrices.filter(l=>T.value.val.includes(l.id)).forEach((l,m)=>{l.alias=="OFERTA"?(e.setFontSize(12),e.setFont("helvetica","bold"),e.text("Unico Precio",t+20,d+m*v),e.setFontSize(20),e.text(`$ ${Number(l.pivot.price).toFixed(2)}`,t+20,d+m*v+15)):(e.setFontSize(18),e.setFont("helvetica","bold"),e.text(l.alias,t+20,d+m*v),e.text(`$${Number(l.pivot.price).toFixed(0)}`,t+37,d+m*v))}),e.setFontSize(13),e.setFont("helvetica","bold"),e.text(`${a.code}`,t+70,o+32),e.text(a.large,t+45,o+52),e.text(`${a.pieces} PZS`,t+70,o+37),e.setFontSize(4),e.setFont("helvetica","normal"),e.text(a.locations?a.locations.map(l=>l.path).join("/"):"",t+18,o+84)}),e.save(`${W.session.credentials.nick} etiquetas ${g.value.val.label}`),n()}catch(r){c(r)}});return ie(),(i,n)=>(Pe(),Se(ke,{view:"hHh Lpr fFf"},{default:_(()=>[z(Ee,{class:"transparent text-dark",bordered:""},{default:_(()=>[z(Re),z(A),z(Ce,{class:"justify-between"},{default:_(()=>[G("div",null,[te("Helpers "),z(ze,{name:"navigate_next",color:"primary"}),te(),Ve]),G("div",Ae,[z(X,{class:"col",flat:"",color:"primary",icon:"download",rounded:"",title:"Importar Excel",onClick:ne}),z(A,{spaced:"",inset:"",vertical:"",dark:""}),z(X,{class:"col",flat:"",color:"primary",icon:"label",rounded:"",title:"Crear Etiquetas",onClick:n[0]||(n[0]=c=>g.value.state=!g.value.state)})])]),_:1})]),_:1}),z(qe,null,{default:_(()=>[z(We,{padding:""},{default:_(()=>[z(ae,{class:"my-card"},{default:_(()=>[z(j,{class:"row"},{default:_(()=>[z(U,{class:"col",modelValue:b.value.seccion.val,"onUpdate:modelValue":n[2]||(n[2]=c=>b.value.seccion.val=c),options:b.value.seccion.opts,label:"SECCION",filled:"","option-label":"name"},Z({_:2},[b.value.seccion.val?{name:"append",fn:_(()=>[z(X,{round:"",dense:"",flat:"",icon:"close",onClick:n[1]||(n[1]=c=>{b.value.seccion.val=null,b.value.familias.val=null,b.value.categorias.val=null})})]),key:"0"}:void 0]),1032,["modelValue","options"]),z(A,{spaced:"",inset:"",vertical:"",dark:""}),z(U,{class:"col",modelValue:b.value.familias.val,"onUpdate:modelValue":n[4]||(n[4]=c=>b.value.familias.val=c),options:K(le),label:"FAMILIA",filled:"","option-label":"name",disable:!b.value.seccion.val},Z({_:2},[b.value.familias.val?{name:"append",fn:_(()=>[z(X,{round:"",dense:"",flat:"",icon:"close",onClick:n[3]||(n[3]=c=>{b.value.familias.val=null,b.value.categorias.val=null})})]),key:"0"}:void 0]),1032,["modelValue","options","disable"]),z(A,{spaced:"",inset:"",vertical:"",dark:""}),z(U,{class:"col",modelValue:b.value.categorias.val,"onUpdate:modelValue":n[6]||(n[6]=c=>b.value.categorias.val=c),options:K(se),label:"CATEGORIA",filled:"","option-label":"name",disable:!b.value.familias.val},Z({_:2},[b.value.categorias.val?{name:"append",fn:_(()=>[z(X,{round:"",dense:"",flat:"",icon:"close",onClick:n[5]||(n[5]=c=>b.value.categorias.val=null)})]),key:"0"}:void 0]),1032,["modelValue","options","disable"]),z(A,{spaced:"",inset:"",vertical:"",dark:""})]),_:1})]),_:1}),z(A,{spaced:"",inset:"",vertical:"",dark:""}),z(Ne,{rows:K(R),columns:D.value.columns},null,8,["rows","columns"]),z(Le,{modelValue:g.value.state,"onUpdate:modelValue":n[9]||(n[9]=c=>g.value.state=c),persistent:""},{default:_(()=>[z(ae,null,{default:_(()=>[z(j,null,{default:_(()=>[G("div",null,[z(A,{spaced:"",inset:"",vertical:"",dark:""}),Ye,G("div",Xe,[z(He,{options:T.value.opts,type:"checkbox",modelValue:T.value.val,"onUpdate:modelValue":n[7]||(n[7]=c=>T.value.val=c),inline:""},null,8,["options","modelValue"])])])]),_:1}),z(j,{class:"row items-center"},{default:_(()=>[z(ye,{icon:"picture_as_pdf",color:"white","text-color":"red"}),Ge]),_:1}),z(j,null,{default:_(()=>[z(U,{modelValue:g.value.val,"onUpdate:modelValue":n[8]||(n[8]=c=>g.value.val=c),options:g.value.opts,label:"Etiquetas",filled:""},null,8,["modelValue","options"])]),_:1}),z(Ie,{align:"right"},{default:_(()=>[$e(z(X,{flat:"",label:"Cancel",color:"negative"},null,512),[[_e]]),z(X,{flat:"",label:"Generar",color:"positive",onClick:re,disable:g.value.val==null},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{zt as default};
