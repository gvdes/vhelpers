import{u as ue,aE as ce,r as k,c as ve,o as h,a as V,w as a,h as j,e as t,Q as f,a0 as pe,f as n,a5 as d,a4 as r,Y as H,g as fe,a1 as me,a2 as ge,a3 as L,b3 as we,a7 as _e}from"./index.ad93775a.js";import{Q as xe}from"./QToolbar.80ed4e2e.js";import{Q as S}from"./QSeparator.6b89e4f2.js";import{Q as ye}from"./QHeader.f08b1aec.js";import{a as P,b as u}from"./QSelect.5b7237bc.js";import{Q as A}from"./QList.ef2ca34f.js";import{u as be,Q as D,a as C}from"./use-quasar.0b385c2f.js";import{Q as W}from"./QCardActions.5642de55.js";import{Q as R}from"./QDialog.84084cfd.js";import{Q as ke}from"./QFooter.3b6e8da0.js";import{Q as he}from"./QPage.8994904c.js";import{u as Pe}from"./VDB.3e486cc6.js";import"./jspdf.plugin.autotable.61723d92.js";import{t as Q}from"./transferApi.38962fba.js";import{E as J}from"./exceljs.min.9e24d01d.js";import"./browser.a927a609.js";import{P as Ce,d as Qe}from"./ProductsAutocomplete.91043d58.js";import"./QResizeObserver.cf4e2aed.js";import"./use-key-composition.f55f5f94.js";import"./uid.937d8ee7.js";import"./position-engine.96014762.js";import"./rtl.276c3f1b.js";import"./_commonjsHelpers.88e99c8f.js";import"./axios.ba7b1b0e.js";import"./axios.9ab26c22.js";import"./QInput.778f889d.js";/* empty css                                                                         */const Ee={class:"row items-center"},Fe={class:"col"},Ve={class:"col"},Ie={class:"text-h6"},Te={class:"text-center text-bold"},Be={class:"text-center text-bold row"},Se={class:"col"},Ae={class:"col"},De={class:"text-center text-h4"},Ne={class:"text-center text-h6 text-grey-14"},Re={class:"text-center"},$e={class:"q-pa-xs"},qe={class:"row"},Ge={class:"col column q-py-md"},mt={__name:"viewTransfer",setup(Me){const $=ue(),E=ce(),N=Pe(),i=be(),m=k(null),s=k({val:null,state:!1}),c=k([]),w=k({state:!1,wndGetRows:[],wndNoDataFound:[],wndTotal:[],wndGetAdded:[],_supply_by:0,message:"",messageRepeat:"",wndNotExist:[],repeat:[]}),g=k({state:!1,encontrados:[],faltantes:[],products:null}),q=k(null),G=k(null),Y=ve(()=>{var l;return((l=c.value)==null?void 0:l.filter(e=>{var o;return e.product==((o=s.value.val)==null?void 0:o.product)}).length)>0}),K=async()=>{const l=E.params.oid,e=await Q.getTransfer(l);e.fail?console.log(e):(m.value=e,c.value=e.bodie,console.log(m.value))},X=l=>{console.log(l)},Z=l=>{let e=c.value.findIndex(o=>o.product==l.code);console.log(e),e>=0?i.notify({message:"El Producto ya esta agregado",type:"negative",position:"center"}):(s.value.val={product:l.code,description:l.description,amount:1},s.value.state=!0,console.log(l))},ee=async()=>{i.loading.show({message:"Insertando Producto"}),console.log(s.value.val),s.value.val._transfer=E.params.oid;const l=await Q.addProduct(s.value.val);l.fail?console.log(l):(console.log(l),c.value.push(s.value.val),s.value={val:null,state:!1},i.loading.hide())},te=async()=>{i.loading.show({message:"Editando Producto"}),console.log(s.value.val),s.value.val._transfer=E.params.oid;const l=await Q.editProduct(s.value.val);if(l.fail)console.log(l);else{console.log(l);let e=c.value.findIndex(o=>o.product==s.value.val.product);e>=0&&(c.value[e].amount=s.value.val.amount,i.notify({type:"positive",position:"center"}),s.value={val:null,state:!1},i.loading.hide())}},ae=async()=>{i.loading.show({message:"Eliminando Producto"}),console.log(s.value.val),s.value.val._transfer=E.params.oid;const l=await Q.removeProduct(s.value.val);if(l.fail)console.log(l);else{console.log(l);let e=c.value.findIndex(o=>o.product==s.value.val.product);e>=0&&(c.value.splice(e,1),i.notify({type:"positive",position:"center"}),s.value={val:null,state:!1},i.loading.hide())}},le=l=>{s.value.state=!0,s.value.val=l},M=()=>{s.value={val:null,state:!1}},oe=async()=>{i.loading.show({message:"Terminando Traspaso"});let l={user:N.session.name,traspaso:m.value,products:c.value};const e=await Q.endTransfer(l);e.fail?console.log(e):(i.notify({message:e,position:"center",type:"positive"}),console.log(e),i.loading.hide(),$.push("/transfers"))},se=()=>{q.value.click()},ne=async()=>{let l=document.getElementById("inputFile").files[0],e=new J.Workbook,o=[],_={};e.xlsx.load(l).then(z=>{let I=e.worksheets[0],y=I.getColumn("A");I.getColumn("B"),y.eachCell({includeEmpty:!0},function(p,x){let F=p.value,T=I.getCell(`B${x}`),B=parseFloat(T.value);_[F]?_[F]+=B:_[F]=B});let v=Object.keys(_).map(p=>({codigo:p,cantidad:_[p]}));if(v.forEach(p=>o.push(p.codigo)),o.length){let p={codes:o,_workpoint:N.session.store.id_viz};i.loading.show({message:"Procesando archivo, espera.."}),Qe.getMassive(p).then(x=>{let F=x.data;F.fails.notFound.map(b=>w.value.wndNotExist.push(b)),F.fails.repeat.map(b=>w.value.repeat.push(b));let T=x.data.products;w.value.wndGetRows=T.length,w.value.state=!w.value.state,console.log(T);let B=T.map(b=>{let O=v.find(de=>de.codigo===b.code);return{product:b.code,description:b.description,amount:O?O.cantidad:0,_transfer:E.params.oid}});U(B),i.loading.hide()}).catch(x=>{console.log(x),i.notify({message:"Hay un problema con obtener los datos :/.",icon:"fas fa-grin-beam-sweat",color:"negative"})})}else i.notify({message:"Vaya!! Al parecer este archivo esta vacio.",icon:"fas fa-grin-beam-sweat",color:"negative"})})},re=()=>{G.value.click()},ie=async()=>{let l=document.getElementById("inputFilePreventa").files[0],e=new J.Workbook,o=[];e.xlsx.load(l).then(async _=>{let I=e.worksheets[0].getColumn("A");if(i.loading.show({message:"Procesando archivo, espera.."}),I.eachCell({includeEmpty:!0},function(y,v){y.value&&o.push(y.value)}),o.length){let y={codes:o,_workpoint:N.session.store.id_viz};console.log(y);const v=await Q.transferPreventa(y);if(v.fail)alert(v);else{g.value.encontrados=v.Encontrados,g.value.faltantes=v.Faltantes,g.value.products=v.products.length,g.value.state=!g.value.state,v.products.forEach(x=>x._transfer=E.params.oid);let p=v.products;console.log(p),U(p),i.loading.hide()}}else i.notify({message:"Vaya!! Al parecer este archivo esta vacio.",icon:"fas fa-grin-beam-sweat",color:"negative"})})},U=async l=>{const e=await Q.addProductMasive(l);e.fail?console.log(e):(console.log(e),l.map(o=>{c.value.push(o)}),i.loading.hide())};return K(),(l,e)=>m.value?(h(),V(he,{key:0,padding:""},{default:a(()=>[t(ye,{reveal:"",bordered:"",class:"bg-white text-black"},{default:a(()=>[t(xe,{class:"justify-between"},{default:a(()=>[t(f,{color:"primary",icon:"arrow_back",flat:"",onClick:e[0]||(e[0]=o=>pe($).push("/transfers")),round:""}),n("div",null,d(m.value.store.name),1),n("div",Ee,[n("div",Fe,d(m.value.origin.name),1),e[7]||(e[7]=r()),t(H,{name:"arrow_forward",class:"col"}),n("div",Ve,d(m.value.destiny.name),1)]),n("div",null,d(m.value.created_by),1),n("div",null,[e[8]||(e[8]=r("Traspaso ")),t(H,{name:"navigate_next",color:"primary"}),e[9]||(e[9]=r()),n("span",Ie,d(m.value.code_fs),1)])]),_:1}),t(S),n("div",Te,d(m.value.notes),1),t(S),n("div",Be,[n("div",Se,[t(f,{color:"primary",icon:"publish",label:"Importar Excel",flat:"",onClick:se})]),n("div",Ae,[t(f,{color:"primary",icon:"apps",label:"Preventas",flat:"",onClick:re})]),n("input",{type:"file",ref_key:"inputFile",ref:q,id:"inputFile",onInput:ne,hidden:"",accept:".xlsx,.xls"},null,544),n("input",{type:"file",ref_key:"inputFilePreventa",ref:G,id:"inputFilePreventa",onInput:ie,hidden:"",accept:".xlsx,.xls"},null,544)])]),_:1}),t(S,{spaced:"",inset:"",vertical:"",dark:""}),t(A,{bordered:""},{default:a(()=>[t(P,null,{default:a(()=>[t(u,null,{default:a(()=>e[10]||(e[10]=[r(" Producto ")])),_:1}),t(u,null,{default:a(()=>e[11]||(e[11]=[r(" Descripcion ")])),_:1}),t(u,{class:"text-center"},{default:a(()=>e[12]||(e[12]=[r(" Cantidad ")])),_:1})]),_:1})]),_:1}),(h(!0),fe(ge,null,me(c.value,(o,_)=>(h(),V(A,{bordered:"",key:_},{default:a(()=>[L((h(),V(P,{clickable:"",onClick:z=>le(o)},{default:a(()=>[t(u,null,{default:a(()=>[r(d(o.product),1)]),_:2},1024),t(u,null,{default:a(()=>[r(d(o.description),1)]),_:2},1024),t(u,{class:"text-center"},{default:a(()=>[r(d(o.amount),1)]),_:2},1024)]),_:2},1032,["onClick"])),[[_e]]),t(S)]),_:2},1024))),128)),t(R,{modelValue:s.value.state,"onUpdate:modelValue":e[4]||(e[4]=o=>s.value.state=o),persistent:"",position:"bottom"},{default:a(()=>[t(D,{style:{width:"300","max-width":"40vw"}},{default:a(()=>[t(C,null,{default:a(()=>[n("div",De,d(s.value.val.product),1),n("div",Ne,d(s.value.val.description),1)]),_:1}),t(C,null,{default:a(()=>[n("div",Re,[n("div",$e,[e[13]||(e[13]=n("div",{class:"text-bold text-h6"},"Cantidad:",-1)),n("div",qe,[t(f,{flat:"",color:"negative",icon:"remove",class:"text-h5 col",onClick:e[1]||(e[1]=o=>s.value.val.amount>1?s.value.val.amount--:"")}),n("div",Ge,[L(n("input",{type:"number",min:"1","onUpdate:modelValue":e[2]||(e[2]=o=>s.value.val.amount=o),class:"text-center exo",style:{width:"100px","font-size":"3em",margin:"auto auto",border:"none"}},null,512),[[we,s.value.val.amount]])]),t(f,{flat:"",color:"positive",icon:"add",class:"text-h5 col",onClick:e[3]||(e[3]=o=>s.value.val.amount++)})])])])]),_:1}),Y.value?(h(),V(W,{key:1,align:"center"},{default:a(()=>[t(f,{flat:"",icon:"close",color:"red-10",onClick:M}),t(f,{flat:"",label:"Eliminar",color:"negative",onClick:ae}),t(f,{flat:"",label:"Editar",color:"blue-10",onClick:te})]),_:1})):(h(),V(W,{key:0,align:"center"},{default:a(()=>[t(f,{flat:"",label:"Cancelar",color:"negative",onClick:M}),t(f,{flat:"",label:"Agregar",color:"positive",onClick:ee})]),_:1}))]),_:1})]),_:1},8,["modelValue"]),t(R,{modelValue:w.value.state,"onUpdate:modelValue":e[5]||(e[5]=o=>w.value.state=o)},{default:a(()=>[t(D,null,{default:a(()=>[t(C,{class:"row text-bold text-overline text-center"},{default:a(()=>e[14]||(e[14]=[r(" Resultados de la importacion :O ")])),_:1}),t(C,null,{default:a(()=>[t(A,{bordered:""},{default:a(()=>[t(P,null,{default:a(()=>[t(u,null,{default:a(()=>e[15]||(e[15]=[r("Productos Encontrados")])),_:1}),t(u,null,{default:a(()=>[r(d(w.value.wndGetRows),1)]),_:1})]),_:1}),t(P,null,{default:a(()=>[t(u,null,{default:a(()=>e[16]||(e[16]=[r("Productos Sin Datos")])),_:1}),t(u,null,{default:a(()=>[r(d(w.value.wndNotExist),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(R,{modelValue:g.value.state,"onUpdate:modelValue":e[6]||(e[6]=o=>g.value.state=o)},{default:a(()=>[t(D,null,{default:a(()=>[t(C,{class:"row text-bold text-overline text-center"},{default:a(()=>e[17]||(e[17]=[r(" Resultados de la importacion :O ")])),_:1}),t(C,null,{default:a(()=>[t(A,{bordered:""},{default:a(()=>[t(P,null,{default:a(()=>[t(u,null,{default:a(()=>e[18]||(e[18]=[r("Pedidos Encontrados")])),_:1}),t(u,null,{default:a(()=>[r(d(g.value.encontrados),1)]),_:1})]),_:1}),t(P,null,{default:a(()=>[t(u,null,{default:a(()=>e[19]||(e[19]=[r("Pedidos Sin Encontrar")])),_:1}),t(u,null,{default:a(()=>[r(d(g.value.faltantes),1)]),_:1})]),_:1}),t(P,null,{default:a(()=>[t(u,null,{default:a(()=>e[20]||(e[20]=[r("Productos Encontrados")])),_:1}),t(u,null,{default:a(()=>[r(d(g.value.products),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(ke,{reveal:"",elevated:"",bordered:"",class:"bg-white"},{default:a(()=>[t(D,{class:"q-mb-md",flat:"",bordered:"",dense:""},{default:a(()=>[t(C,{class:"row"},{default:a(()=>[t(Ce,{class:"col",checkState:!1,onInput:X,onAgregar:Z}),c.value.length>0?(h(),V(f,{key:0,color:"primary",flat:"",icon:"east",onClick:oe,round:""})):j("",!0)]),_:1})]),_:1})]),_:1})]),_:1})):j("",!0)}};export{mt as default};
