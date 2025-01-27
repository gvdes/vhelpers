import{r as b,c as ce,o as k,a as V,w as t,h as j,u as ve,aD as pe,e,Q as f,f as H,i as r,a4 as d,a3 as n,Y as L,g as fe,a0 as me,a1 as ge,a2 as W,b2 as _e,a6 as he}from"./index.c9a25daf.js";import{Q as we}from"./QToolbar.0669ad8d.js";import{Q as S}from"./QSeparator.caf8801a.js";import{Q as xe}from"./QHeader.d8db2715.js";import{a as P,b as u}from"./QSelect.8737bb62.js";import{Q as A}from"./QList.36e1cd45.js";import{u as ye,Q as D,a as C}from"./use-quasar.c1b12a28.js";import{Q as J}from"./QCardActions.5b0f58ec.js";import{Q as R}from"./QDialog.3295e9dd.js";import{Q as be}from"./QFooter.7f3eed7c.js";import{Q as ke}from"./QPage.e4dd568a.js";import{u as Pe}from"./VDB.c2df9656.js";import"./jspdf.plugin.autotable.db445a70.js";import{t as Q}from"./transferApi.33e6e10a.js";import{E as Y}from"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import{P as Ce,d as Qe}from"./ProductsAutocomplete.fea1f0dd.js";import"./QResizeObserver.2c73a219.js";import"./use-key-composition.1a16e39f.js";import"./uid.42677368.js";import"./position-engine.30592618.js";import"./rtl.b51694b1.js";import"./_commonjsHelpers.88e99c8f.js";import"./axios.76bdd693.js";import"./axios.f1f32898.js";import"./QInput.7f96141a.js";/* empty css                                                                         */const Ee={class:"row items-center"},Fe={class:"col"},Ve={class:"col"},Ie={class:"text-h6"},Te={class:"text-center text-bold"},Be={class:"text-center text-bold row"},Se={class:"col"},Ae={class:"col"},De={class:"text-center text-h4"},Ne={class:"text-center text-h6 text-grey-14"},Re={class:"text-center"},$e={class:"q-pa-xs"},qe=r("div",{class:"text-bold text-h6"},"Cantidad:",-1),Ge={class:"row"},Me={class:"col column q-py-md"},gt={__name:"viewTransfer",setup(Ue){const $=ve(),E=pe(),N=Pe(),i=ye(),m=b(null),s=b({val:null,state:!1}),c=b([]),_=b({state:!1,wndGetRows:[],wndNoDataFound:[],wndTotal:[],wndGetAdded:[],_supply_by:0,message:"",messageRepeat:"",wndNotExist:[],repeat:[]}),g=b({state:!1,encontrados:[],faltantes:[],products:null}),q=b(null),G=b(null),K=ce(()=>{var l;return((l=c.value)==null?void 0:l.filter(a=>{var o;return a.product==((o=s.value.val)==null?void 0:o.product)}).length)>0}),X=async()=>{const l=E.params.oid,a=await Q.getTransfer(l);a.fail?console.log(a):(m.value=a,c.value=a.bodie,console.log(m.value))},Z=l=>{console.log(l)},ee=l=>{let a=c.value.findIndex(o=>o.product==l.code);console.log(a),a>=0?i.notify({message:"El Producto ya esta agregado",type:"negative",position:"center"}):(s.value.val={product:l.code,description:l.description,amount:1},s.value.state=!0,console.log(l))},te=async()=>{i.loading.show({message:"Insertando Producto"}),console.log(s.value.val),s.value.val._transfer=E.params.oid;const l=await Q.addProduct(s.value.val);l.fail?console.log(l):(console.log(l),c.value.push(s.value.val),s.value={val:null,state:!1},i.loading.hide())},ae=async()=>{i.loading.show({message:"Editando Producto"}),console.log(s.value.val),s.value.val._transfer=E.params.oid;const l=await Q.editProduct(s.value.val);if(l.fail)console.log(l);else{console.log(l);let a=c.value.findIndex(o=>o.product==s.value.val.product);a>=0&&(c.value[a].amount=s.value.val.amount,i.notify({type:"positive",position:"center"}),s.value={val:null,state:!1},i.loading.hide())}},le=async()=>{i.loading.show({message:"Eliminando Producto"}),console.log(s.value.val),s.value.val._transfer=E.params.oid;const l=await Q.removeProduct(s.value.val);if(l.fail)console.log(l);else{console.log(l);let a=c.value.findIndex(o=>o.product==s.value.val.product);a>=0&&(c.value.splice(a,1),i.notify({type:"positive",position:"center"}),s.value={val:null,state:!1},i.loading.hide())}},oe=l=>{s.value.state=!0,s.value.val=l},M=()=>{s.value={val:null,state:!1}},se=async()=>{i.loading.show({message:"Terminando Traspaso"});let l={user:N.session.name,traspaso:m.value,products:c.value};const a=await Q.endTransfer(l);a.fail?console.log(a):(i.notify({message:a,position:"center",type:"positive"}),console.log(a),i.loading.hide(),$.push("/transfers"))},ne=()=>{q.value.click()},re=async()=>{let l=document.getElementById("inputFile").files[0],a=new Y.Workbook,o=[],h={};a.xlsx.load(l).then(z=>{let I=a.worksheets[0],x=I.getColumn("A");I.getColumn("B"),x.eachCell({includeEmpty:!0},function(p,w){let F=p.value,T=I.getCell(`B${w}`),B=parseFloat(T.value);h[F]?h[F]+=B:h[F]=B});let v=Object.keys(h).map(p=>({codigo:p,cantidad:h[p]}));if(v.forEach(p=>o.push(p.codigo)),o.length){let p={codes:o,_workpoint:N.session.store.id_viz};i.loading.show({message:"Procesando archivo, espera.."}),Qe.getMassive(p).then(w=>{let F=w.data;F.fails.notFound.map(y=>_.value.wndNotExist.push(y)),F.fails.repeat.map(y=>_.value.repeat.push(y));let T=w.data.products;_.value.wndGetRows=T.length,_.value.state=!_.value.state,console.log(T);let B=T.map(y=>{let O=v.find(ue=>ue.codigo===y.code);return{product:y.code,description:y.description,amount:O?O.cantidad:0,_transfer:E.params.oid}});U(B),i.loading.hide()}).catch(w=>{console.log(w),i.notify({message:"Hay un problema con obtener los datos :/.",icon:"fas fa-grin-beam-sweat",color:"negative"})})}else i.notify({message:"Vaya!! Al parecer este archivo esta vacio.",icon:"fas fa-grin-beam-sweat",color:"negative"})})},ie=()=>{G.value.click()},de=async()=>{let l=document.getElementById("inputFilePreventa").files[0],a=new Y.Workbook,o=[];a.xlsx.load(l).then(async h=>{let I=a.worksheets[0].getColumn("A");if(i.loading.show({message:"Procesando archivo, espera.."}),I.eachCell({includeEmpty:!0},function(x,v){x.value&&o.push(x.value)}),o.length){let x={codes:o,_workpoint:N.session.store.id_viz};console.log(x);const v=await Q.transferPreventa(x);if(v.fail)alert(v);else{g.value.encontrados=v.Encontrados,g.value.faltantes=v.Faltantes,g.value.products=v.products.length,g.value.state=!g.value.state,v.products.forEach(w=>w._transfer=E.params.oid);let p=v.products;console.log(p),U(p),i.loading.hide()}}else i.notify({message:"Vaya!! Al parecer este archivo esta vacio.",icon:"fas fa-grin-beam-sweat",color:"negative"})})},U=async l=>{const a=await Q.addProductMasive(l);a.fail?console.log(a):(console.log(a),l.map(o=>{c.value.push(o)}),i.loading.hide())};return X(),(l,a)=>m.value?(k(),V(ke,{key:0,padding:""},{default:t(()=>[e(xe,{reveal:"",bordered:"",class:"bg-white text-black"},{default:t(()=>[e(we,{class:"justify-between"},{default:t(()=>[e(f,{color:"primary",icon:"arrow_back",flat:"",onClick:a[0]||(a[0]=o=>H($).push("/transfers")),round:""}),r("div",null,d(m.value.store.name),1),r("div",Ee,[r("div",Fe,d(m.value.origin.name),1),n(),e(L,{name:"arrow_forward",class:"col"}),r("div",Ve,d(m.value.destiny.name),1)]),r("div",null,d(m.value.created_by),1),r("div",null,[n("Traspaso "),e(L,{name:"navigate_next",color:"primary"}),n(),r("span",Ie,d(m.value.code_fs),1)])]),_:1}),e(S),r("div",Te,d(m.value.notes),1),e(S),r("div",Be,[r("div",Se,[e(f,{color:"primary",icon:"publish",label:"Importar Excel",flat:"",onClick:ne})]),r("div",Ae,[e(f,{color:"primary",icon:"apps",label:"Preventas",flat:"",onClick:ie})]),r("input",{type:"file",ref_key:"inputFile",ref:q,id:"inputFile",onInput:re,hidden:"",accept:".xlsx,.xls"},null,544),r("input",{type:"file",ref_key:"inputFilePreventa",ref:G,id:"inputFilePreventa",onInput:de,hidden:"",accept:".xlsx,.xls"},null,544)])]),_:1}),e(S,{spaced:"",inset:"",vertical:"",dark:""}),e(A,{bordered:""},{default:t(()=>[e(P,null,{default:t(()=>[e(u,null,{default:t(()=>[n(" Producto ")]),_:1}),e(u,null,{default:t(()=>[n(" Descripcion ")]),_:1}),e(u,{class:"text-center"},{default:t(()=>[n(" Cantidad ")]),_:1})]),_:1})]),_:1}),(k(!0),fe(ge,null,me(c.value,(o,h)=>(k(),V(A,{bordered:"",key:h},{default:t(()=>[W((k(),V(P,{clickable:"",onClick:z=>oe(o)},{default:t(()=>[e(u,null,{default:t(()=>[n(d(o.product),1)]),_:2},1024),e(u,null,{default:t(()=>[n(d(o.description),1)]),_:2},1024),e(u,{class:"text-center"},{default:t(()=>[n(d(o.amount),1)]),_:2},1024)]),_:2},1032,["onClick"])),[[he]]),e(S)]),_:2},1024))),128)),e(R,{modelValue:s.value.state,"onUpdate:modelValue":a[4]||(a[4]=o=>s.value.state=o),persistent:"",position:"bottom"},{default:t(()=>[e(D,{style:{width:"300","max-width":"40vw"}},{default:t(()=>[e(C,null,{default:t(()=>[r("div",De,d(s.value.val.product),1),r("div",Ne,d(s.value.val.description),1)]),_:1}),e(C,null,{default:t(()=>[r("div",Re,[r("div",$e,[qe,r("div",Ge,[e(f,{flat:"",color:"negative",icon:"remove",class:"text-h5 col",onClick:a[1]||(a[1]=o=>s.value.val.amount>1?s.value.val.amount--:"")}),r("div",Me,[W(r("input",{type:"number",min:"1","onUpdate:modelValue":a[2]||(a[2]=o=>s.value.val.amount=o),class:"text-center exo",style:{width:"100px","font-size":"3em",margin:"auto auto",border:"none"}},null,512),[[_e,s.value.val.amount]])]),e(f,{flat:"",color:"positive",icon:"add",class:"text-h5 col",onClick:a[3]||(a[3]=o=>s.value.val.amount++)})])])])]),_:1}),H(K)?(k(),V(J,{key:1,align:"center"},{default:t(()=>[e(f,{flat:"",icon:"close",color:"red-10",onClick:M}),e(f,{flat:"",label:"Eliminar",color:"negative",onClick:le}),e(f,{flat:"",label:"Editar",color:"blue-10",onClick:ae})]),_:1})):(k(),V(J,{key:0,align:"center"},{default:t(()=>[e(f,{flat:"",label:"Cancelar",color:"negative",onClick:M}),e(f,{flat:"",label:"Agregar",color:"positive",onClick:te})]),_:1}))]),_:1})]),_:1},8,["modelValue"]),e(R,{modelValue:_.value.state,"onUpdate:modelValue":a[5]||(a[5]=o=>_.value.state=o)},{default:t(()=>[e(D,null,{default:t(()=>[e(C,{class:"row text-bold text-overline text-center"},{default:t(()=>[n(" Resultados de la importacion :O ")]),_:1}),e(C,null,{default:t(()=>[e(A,{bordered:""},{default:t(()=>[e(P,null,{default:t(()=>[e(u,null,{default:t(()=>[n("Productos Encontrados")]),_:1}),e(u,null,{default:t(()=>[n(d(_.value.wndGetRows),1)]),_:1})]),_:1}),e(P,null,{default:t(()=>[e(u,null,{default:t(()=>[n("Productos Sin Datos")]),_:1}),e(u,null,{default:t(()=>[n(d(_.value.wndNotExist),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(R,{modelValue:g.value.state,"onUpdate:modelValue":a[6]||(a[6]=o=>g.value.state=o)},{default:t(()=>[e(D,null,{default:t(()=>[e(C,{class:"row text-bold text-overline text-center"},{default:t(()=>[n(" Resultados de la importacion :O ")]),_:1}),e(C,null,{default:t(()=>[e(A,{bordered:""},{default:t(()=>[e(P,null,{default:t(()=>[e(u,null,{default:t(()=>[n("Pedidos Encontrados")]),_:1}),e(u,null,{default:t(()=>[n(d(g.value.encontrados),1)]),_:1})]),_:1}),e(P,null,{default:t(()=>[e(u,null,{default:t(()=>[n("Pedidos Sin Encontrar")]),_:1}),e(u,null,{default:t(()=>[n(d(g.value.faltantes),1)]),_:1})]),_:1}),e(P,null,{default:t(()=>[e(u,null,{default:t(()=>[n("Productos Encontrados")]),_:1}),e(u,null,{default:t(()=>[n(d(g.value.products),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(be,{reveal:"",elevated:"",bordered:"",class:"bg-white"},{default:t(()=>[e(D,{class:"q-mb-md",flat:"",bordered:"",dense:""},{default:t(()=>[e(C,{class:"row"},{default:t(()=>[e(Ce,{class:"col",checkState:!1,onInput:Z,onAgregar:ee}),c.value.length>0?(k(),V(f,{key:0,color:"primary",flat:"",icon:"east",onClick:se,round:""})):j("",!0)]),_:1})]),_:1})]),_:1})]),_:1})):j("",!0)}};export{gt as default};
