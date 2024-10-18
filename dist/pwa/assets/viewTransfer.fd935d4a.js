import{j as ge,G as te,r as b,O as he,c as F,p as q,v as _e,U as we,k as ae,n as ye,m as xe,H as be,o as B,a as z,w as t,h as re,u as ke,aD as Ce,e,Q as x,f as ie,i as u,a4 as v,a3 as i,Y as ue,g as Pe,a0 as Qe,a1 as Ve,a2 as de,b2 as Fe,a6 as Ee}from"./index.7b071212.js";import{Q as Ie}from"./QToolbar.0197d4aa.js";import{Q as L}from"./QSeparator.42e5f052.js";import{Q as Be}from"./QHeader.3a714634.js";import{a as S,b as f}from"./QSelect.8e8447fb.js";import{Q as M}from"./QList.a1077a8c.js";import{u as Se,Q as j,a as R}from"./use-quasar.f8bd681a.js";import{Q as ce}from"./QCardActions.1c329128.js";import{Q as le}from"./QDialog.70f0be3d.js";import{Q as Re}from"./QResizeObserver.7d1b613f.js";import{Q as Te}from"./QPage.bad46146.js";import{u as $e}from"./VDB.b93500f3.js";import"./jspdf.plugin.autotable.633714a9.js";import{t as T}from"./transferApi.e032d869.js";import{E as ve}from"./exceljs.min.9e24d01d.js";import"./browser.94c942de.js";import{P as qe,d as ze}from"./ProductsAutocomplete.ccfd600f.js";import"./use-key-composition.45c5bd4a.js";import"./uid.42677368.js";import"./position-engine.bddc6fa4.js";import"./rtl.b51694b1.js";import"./_commonjsHelpers.88e99c8f.js";import"./axios.ae0a941c.js";import"./axios.f1f32898.js";import"./QInput.7c14ca12.js";var Ae=ge({name:"QFooter",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(c,{slots:U,emit:k}){const{proxy:{$q:C}}=xe(),a=ye(be,te);if(a===te)return console.error("QFooter needs to be child of QLayout"),te;const d=b(parseInt(c.heightHint,10)),o=b(!0),p=b(he.value===!0||a.isContainer.value===!0?0:window.innerHeight),m=F(()=>c.reveal===!0||a.view.value.indexOf("F")>-1||C.platform.is.ios&&a.isContainer.value===!0),g=F(()=>a.isContainer.value===!0?a.containerHeight.value:p.value),A=F(()=>{if(c.modelValue!==!0)return 0;if(m.value===!0)return o.value===!0?d.value:0;const r=a.scroll.value.position+g.value+d.value-a.height.value;return r>0?r:0}),D=F(()=>c.modelValue!==!0||m.value===!0&&o.value!==!0),W=F(()=>c.modelValue===!0&&D.value===!0&&c.reveal===!0),J=F(()=>"q-footer q-layout__section--marginal "+(m.value===!0?"fixed":"absolute")+"-bottom"+(c.bordered===!0?" q-footer--bordered":"")+(D.value===!0?" q-footer--hidden":"")+(c.modelValue!==!0?" q-layout--prevent-focus"+(m.value!==!0?" hidden":""):"")),K=F(()=>{const r=a.rows.value.bottom,h={};return r[0]==="l"&&a.left.space===!0&&(h[C.lang.rtl===!0?"right":"left"]=`${a.left.size}px`),r[2]==="r"&&a.right.space===!0&&(h[C.lang.rtl===!0?"left":"right"]=`${a.right.size}px`),h});function _(r,h){a.update("footer",r,h)}function P(r,h){r.value!==h&&(r.value=h)}function Y({height:r}){P(d,r),_("size",r)}function X(){if(c.reveal!==!0)return;const{direction:r,position:h,inflectionPoint:ee}=a.scroll.value;P(o,r==="up"||h-ee<100||a.height.value-g.value-h-d.value<300)}function Z(r){W.value===!0&&P(o,!0),k("focusin",r)}q(()=>c.modelValue,r=>{_("space",r),P(o,!0),a.animate()}),q(A,r=>{_("offset",r)}),q(()=>c.reveal,r=>{r===!1&&P(o,c.modelValue)}),q(o,r=>{a.animate(),k("reveal",r)}),q([d,a.scroll,a.height],X),q(()=>C.screen.height,r=>{a.isContainer.value!==!0&&P(p,r)});const H={};return a.instances.footer=H,c.modelValue===!0&&_("size",d.value),_("space",c.modelValue),_("offset",A.value),_e(()=>{a.instances.footer===H&&(a.instances.footer=void 0,_("size",0),_("offset",0),_("space",!1))}),()=>{const r=we(U.default,[ae(Re,{debounce:0,onResize:Y})]);return c.elevated===!0&&r.push(ae("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),ae("footer",{class:J.value,style:K.value,onFocusin:Z},r)}}});const De={class:"row items-center"},He={class:"col"},Ne={class:"col"},Oe={class:"text-h6"},Ue={class:"text-center text-bold"},Ge={class:"text-center text-bold row"},Le={class:"col"},Me={class:"col"},je={class:"text-center text-h4"},We={class:"text-center text-h6 text-grey-14"},Je={class:"text-center"},Ke={class:"q-pa-xs"},Ye=u("div",{class:"text-bold text-h6"},"Cantidad:",-1),Xe={class:"row"},Ze={class:"col column q-py-md"},Pt={__name:"viewTransfer",setup(c){const U=ke(),k=Ce(),C=$e(),a=Se(),d=b(null),o=b({val:null,state:!1}),p=b([]),m=b({state:!1,wndGetRows:[],wndNoDataFound:[],wndTotal:[],wndGetAdded:[],_supply_by:0,message:"",messageRepeat:"",wndNotExist:[],repeat:[]}),g=b({state:!1,encontrados:[],faltantes:[],products:null}),A=b(null),D=b(null),W=F(()=>{var s;return((s=p.value)==null?void 0:s.filter(l=>{var n;return l.product==((n=o.value.val)==null?void 0:n.product)}).length)>0}),J=async()=>{const s=k.params.oid,l=await T.getTransfer(s);l.fail?console.log(l):(d.value=l,p.value=l.bodie,console.log(d.value))},K=s=>{console.log(s)},_=s=>{let l=p.value.findIndex(n=>n.product==s.code);console.log(l),l>=0?a.notify({message:"El Producto ya esta agregado",type:"negative",position:"center"}):(o.value.val={product:s.code,description:s.description,amount:1},o.value.state=!0,console.log(s))},P=async()=>{a.loading.show({message:"Insertando Producto"}),console.log(o.value.val),o.value.val._transfer=k.params.oid;const s=await T.addProduct(o.value.val);s.fail?console.log(s):(console.log(s),p.value.push(o.value.val),o.value={val:null,state:!1},a.loading.hide())},Y=async()=>{a.loading.show({message:"Editando Producto"}),console.log(o.value.val),o.value.val._transfer=k.params.oid;const s=await T.editProduct(o.value.val);if(s.fail)console.log(s);else{console.log(s);let l=p.value.findIndex(n=>n.product==o.value.val.product);l>=0&&(p.value[l].amount=o.value.val.amount,a.notify({type:"positive",position:"center"}),o.value={val:null,state:!1},a.loading.hide())}},X=async()=>{a.loading.show({message:"Eliminando Producto"}),console.log(o.value.val),o.value.val._transfer=k.params.oid;const s=await T.removeProduct(o.value.val);if(s.fail)console.log(s);else{console.log(s);let l=p.value.findIndex(n=>n.product==o.value.val.product);l>=0&&(p.value.splice(l,1),a.notify({type:"positive",position:"center"}),o.value={val:null,state:!1},a.loading.hide())}},Z=s=>{o.value.state=!0,o.value.val=s},H=()=>{o.value={val:null,state:!1}},r=async()=>{a.loading.show({message:"Terminando Traspaso"});let s={user:C.session.name,traspaso:d.value,products:p.value};const l=await T.endTransfer(s);l.fail?console.log(l):(a.notify({message:l,position:"center",type:"positive"}),console.log(l),a.loading.hide(),U.push("/transfers"))},h=()=>{A.value.click()},ee=async()=>{let s=document.getElementById("inputFile").files[0],l=new ve.Workbook,n=[],Q={};l.xlsx.load(s).then(se=>{let N=l.worksheets[0],E=N.getColumn("A");N.getColumn("B"),E.eachCell({includeEmpty:!0},function(y,V){let $=y.value,O=N.getCell(`B${V}`),G=parseFloat(O.value);Q[$]?Q[$]+=G:Q[$]=G});let w=Object.keys(Q).map(y=>({codigo:y,cantidad:Q[y]}));if(w.forEach(y=>n.push(y.codigo)),n.length){let y={codes:n,_workpoint:C.session.store.id_viz};a.loading.show({message:"Procesando archivo, espera.."}),ze.getMassive(y).then(V=>{let $=V.data;$.fails.notFound.map(I=>m.value.wndNotExist.push(I)),$.fails.repeat.map(I=>m.value.repeat.push(I));let O=V.data.products;m.value.wndGetRows=O.length,m.value.state=!m.value.state,console.log(O);let G=O.map(I=>{let ne=w.find(me=>me.codigo===I.code);return{product:I.code,description:I.description,amount:ne?ne.cantidad:0,_transfer:k.params.oid}});oe(G),a.loading.hide()}).catch(V=>{console.log(V),a.notify({message:"Hay un problema con obtener los datos :/.",icon:"fas fa-grin-beam-sweat",color:"negative"})})}else a.notify({message:"Vaya!! Al parecer este archivo esta vacio.",icon:"fas fa-grin-beam-sweat",color:"negative"})})},fe=()=>{D.value.click()},pe=async()=>{let s=document.getElementById("inputFilePreventa").files[0],l=new ve.Workbook,n=[];l.xlsx.load(s).then(async Q=>{let N=l.worksheets[0].getColumn("A");if(a.loading.show({message:"Procesando archivo, espera.."}),N.eachCell({includeEmpty:!0},function(E,w){E.value&&n.push(E.value)}),n.length){let E={codes:n,_workpoint:C.session.store.id_viz};console.log(E);const w=await T.transferPreventa(E);if(w.fail)alert(w);else{g.value.encontrados=w.encontrados,g.value.faltantes=w.Faltantes,g.value.products=w.products.length,g.value.state=!g.value.state,w.products.forEach(V=>V._transfer=k.params.oid);let y=w.products;console.log(y),oe(y),a.loading.hide()}}else a.notify({message:"Vaya!! Al parecer este archivo esta vacio.",icon:"fas fa-grin-beam-sweat",color:"negative"})})},oe=async s=>{const l=await T.addProductMasive(s);l.fail?console.log(l):(console.log(l),s.map(n=>{p.value.push(n)}),a.loading.hide())};return J(),(s,l)=>d.value?(B(),z(Te,{key:0,padding:""},{default:t(()=>[e(Be,{reveal:"",bordered:"",class:"bg-white text-black"},{default:t(()=>[e(Ie,{class:"justify-between"},{default:t(()=>[e(x,{color:"primary",icon:"arrow_back",flat:"",onClick:l[0]||(l[0]=n=>ie(U).push("/transfers")),round:""}),u("div",null,v(d.value.store.name),1),u("div",De,[u("div",He,v(d.value.origin.name),1),i(),e(ue,{name:"arrow_forward",class:"col"}),u("div",Ne,v(d.value.destiny.name),1)]),u("div",null,v(d.value.created_by),1),u("div",null,[i("Traspaso "),e(ue,{name:"navigate_next",color:"primary"}),i(),u("span",Oe,v(d.value.code_fs),1)])]),_:1}),e(L),u("div",Ue,v(d.value.notes),1),e(L),u("div",Ge,[u("div",Le,[e(x,{color:"primary",icon:"publish",label:"Importar Excel",flat:"",onClick:h})]),u("div",Me,[e(x,{color:"primary",icon:"apps",label:"Preventas",flat:"",onClick:fe})]),u("input",{type:"file",ref_key:"inputFile",ref:A,id:"inputFile",onInput:ee,hidden:"",accept:".xlsx,.xls"},null,544),u("input",{type:"file",ref_key:"inputFilePreventa",ref:D,id:"inputFilePreventa",onInput:pe,hidden:"",accept:".xlsx,.xls"},null,544)])]),_:1}),e(L,{spaced:"",inset:"",vertical:"",dark:""}),e(M,{bordered:""},{default:t(()=>[e(S,null,{default:t(()=>[e(f,null,{default:t(()=>[i(" Producto ")]),_:1}),e(f,null,{default:t(()=>[i(" Descripcion ")]),_:1}),e(f,{class:"text-center"},{default:t(()=>[i(" Cantidad ")]),_:1})]),_:1})]),_:1}),(B(!0),Pe(Ve,null,Qe(p.value,(n,Q)=>(B(),z(M,{bordered:"",key:Q},{default:t(()=>[de((B(),z(S,{clickable:"",onClick:se=>Z(n)},{default:t(()=>[e(f,null,{default:t(()=>[i(v(n.product),1)]),_:2},1024),e(f,null,{default:t(()=>[i(v(n.description),1)]),_:2},1024),e(f,{class:"text-center"},{default:t(()=>[i(v(n.amount),1)]),_:2},1024)]),_:2},1032,["onClick"])),[[Ee]]),e(L)]),_:2},1024))),128)),e(le,{modelValue:o.value.state,"onUpdate:modelValue":l[4]||(l[4]=n=>o.value.state=n),persistent:"",position:"bottom"},{default:t(()=>[e(j,{style:{width:"300","max-width":"40vw"}},{default:t(()=>[e(R,null,{default:t(()=>[u("div",je,v(o.value.val.product),1),u("div",We,v(o.value.val.description),1)]),_:1}),e(R,null,{default:t(()=>[u("div",Je,[u("div",Ke,[Ye,u("div",Xe,[e(x,{flat:"",color:"negative",icon:"remove",class:"text-h5 col",onClick:l[1]||(l[1]=n=>o.value.val.amount>1?o.value.val.amount--:"")}),u("div",Ze,[de(u("input",{type:"number",min:"1","onUpdate:modelValue":l[2]||(l[2]=n=>o.value.val.amount=n),class:"text-center exo",style:{width:"100px","font-size":"3em",margin:"auto auto",border:"none"}},null,512),[[Fe,o.value.val.amount]])]),e(x,{flat:"",color:"positive",icon:"add",class:"text-h5 col",onClick:l[3]||(l[3]=n=>o.value.val.amount++)})])])])]),_:1}),ie(W)?(B(),z(ce,{key:1,align:"center"},{default:t(()=>[e(x,{flat:"",icon:"close",color:"red-10",onClick:H}),e(x,{flat:"",label:"Eliminar",color:"negative",onClick:X}),e(x,{flat:"",label:"Editar",color:"blue-10",onClick:Y})]),_:1})):(B(),z(ce,{key:0,align:"center"},{default:t(()=>[e(x,{flat:"",label:"Cancelar",color:"negative",onClick:H}),e(x,{flat:"",label:"Agregar",color:"positive",onClick:P})]),_:1}))]),_:1})]),_:1},8,["modelValue"]),e(le,{modelValue:m.value.state,"onUpdate:modelValue":l[5]||(l[5]=n=>m.value.state=n)},{default:t(()=>[e(j,null,{default:t(()=>[e(R,{class:"row text-bold text-overline text-center"},{default:t(()=>[i(" Resultados de la importacion :O ")]),_:1}),e(R,null,{default:t(()=>[e(M,{bordered:""},{default:t(()=>[e(S,null,{default:t(()=>[e(f,null,{default:t(()=>[i("Productos Encontrados")]),_:1}),e(f,null,{default:t(()=>[i(v(m.value.wndGetRows),1)]),_:1})]),_:1}),e(S,null,{default:t(()=>[e(f,null,{default:t(()=>[i("Productos Sin Datos")]),_:1}),e(f,null,{default:t(()=>[i(v(m.value.wndNotExist),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(le,{modelValue:g.value.state,"onUpdate:modelValue":l[6]||(l[6]=n=>g.value.state=n)},{default:t(()=>[e(j,null,{default:t(()=>[e(R,{class:"row text-bold text-overline text-center"},{default:t(()=>[i(" Resultados de la importacion :O ")]),_:1}),e(R,null,{default:t(()=>[e(M,{bordered:""},{default:t(()=>[e(S,null,{default:t(()=>[e(f,null,{default:t(()=>[i("Pedidos Encontrados")]),_:1}),e(f,null,{default:t(()=>[i(v(g.value.encontrados),1)]),_:1})]),_:1}),e(S,null,{default:t(()=>[e(f,null,{default:t(()=>[i("Pedidos Sin Encontrar")]),_:1}),e(f,null,{default:t(()=>[i(v(g.value.faltantes),1)]),_:1})]),_:1}),e(S,null,{default:t(()=>[e(f,null,{default:t(()=>[i("Productos Sin Encontrar")]),_:1}),e(f,null,{default:t(()=>[i(v(g.value.products),1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(Ae,{reveal:"",elevated:"",bordered:"",class:"bg-white"},{default:t(()=>[e(j,{class:"q-mb-md",flat:"",bordered:"",dense:""},{default:t(()=>[e(R,{class:"row"},{default:t(()=>[e(qe,{class:"col",checkState:!1,onInput:K,onAgregar:_}),p.value.length>0?(B(),z(x,{key:0,color:"primary",flat:"",icon:"east",onClick:r,round:""})):re("",!0)]),_:1})]),_:1})]),_:1})]),_:1})):re("",!0)}};export{Pt as default};
