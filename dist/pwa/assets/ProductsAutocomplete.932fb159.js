import{a$ as J,r as k,c as y,v as R,o as p,g as w,a as S,w as r,e as c,Q as _,b0 as j,a4 as V,b1 as D,f as n,a5 as d,h as K,Y as E,aX as X}from"./index.b74b1f02.js";import{Q as Y}from"./QInput.91b244d2.js";import{a as x,b as B,Q as G}from"./QSelect.b35db3ac.js";import{v as I}from"./axios.ba7b1b0e.js";import{u as H}from"./use-quasar.dab623e9.js";import{u as L}from"./VDB.b35d8b80.js";/* empty css                                                                         */var Q={autocomplete(i){return I.post("/product",i)},getMassive(i){return I.post("/product/getMassive",i)}};const W={class:"QuickRegular row items-center"},Z={class:"row items-center justify-between no-wrap QuickRegular"},ee={class:"col"},te={class:"text-grey-4 q-pl-md"},ae={class:"text--2 text-grey-5"},oe={class:"text--3"},le={key:0,class:"text--3 text-amber-13"},se={__name:"ProductsAutocomplete",props:{limit:{default:30,type:Number},_category:{default:null,type:Boolean},_status:{default:null,type:Boolean},_location:{default:null,type:Boolean},_celler:{default:null,type:Boolean},check_stock:{default:null,type:Boolean},with_locations:{default:null,type:Boolean},with_image:{default:null,type:Boolean},with_prices:{default:null,type:Boolean},with_stock:{default:null,type:Boolean},checkState:{default:!0,type:Boolean},workpointStatus:{default:null,type:[Array,String]},wkpToVal:{default:null,type:Number},blockStates:{type:Array,default:()=>[4,5,6]}},emits:["input","similarcodes","agregar"],setup(i,{emit:C}){const T=H(),N=L(),l=i,m=C,e=k({target:"",iptsearch:{processing:!1,type:"number",icon:"fas fa-font"},options:void 0,read_barcode:!0}),f=k(null),g=y(()=>({autocomplete:e.value.target,_category:l._category,_status:l._status,_location:l._location,with_locations:l.with_locations,with_stock:l.with_stock,check_stock:l.check_stock,with_prices:l.with_prices,_celler:l._celler,limit:l.limit,_workpoint_status:l.workpointStatus,_workpoint:N.session.store.id_viz})),$=y(()=>t=>l.checkState?l.blockStates.some(a=>a==t.state.id):!1);R(()=>{e.value.read_barcode=JSON.parse(localStorage.getItem("barcodereader"));let t=JSON.parse(localStorage.getItem("typeiptsearch"));t&&(e.value.iptsearch.type=t.type,e.value.iptsearch.icon=t.icon)});const b=()=>{e.value.read_barcode=!e.value.read_barcode,e.value.target="",localStorage.setItem("barcodereader",e.value.read_barcode)},P=(t,a,o)=>{console.log(g.value),t.trim().length>1&&(e.value.target=t.toUpperCase().trim(),console.log(e.value.target),Q.autocomplete(g.value).then(u=>{console.log(u);let U=u.data.map(s=>{if(l.checkState)if(l.wkpToVal){let v=s.stocks.find(F=>F._workpoint==l.wkpToVal);s.stateToVal=v?{own:v,state:v.status}:{own:null,state:s.status}}else s.stateToVal={own:!0,state:s.status};else s.stateToVal={own:!0,state:s.status};return s});a(()=>{e.value.options=U},s=>{s.setOptionIndex(-1),s.moveOptionSelection(1,!0)})}).catch(u=>{console.log(u)}))},q=()=>{switch(e.value.iptsearch.type){case"text":e.value.iptsearch.type="number",e.value.iptsearch.icon="fas fa-font";break;case"number":e.value.iptsearch.type="text",e.value.iptsearch.icon="fas fa-hashtag";break}localStorage.setItem("typeiptsearch",JSON.stringify(e.value.iptsearch))},h=t=>{e.value.target="",m("input",t)},z=t=>{e.value.target="",m("similarcodes",t)},O=()=>{e.value.target.trim().toUpperCase(),e.value.target.length&&(e.value.iptsearch.processing=!0,Q.autocomplete(g.value).then(t=>{let a=t.data;switch(a.length){case 0:let o=e.value.target;T.notify({message:`Sin resultados para <b>${o}</b>`,color:"negative",icon:"fas fa-times",html:!0,timeout:1e3,position:"center"}),A();break;case 1:console.log("Perfecto, aqui esta tu producto"),h(a[0]);break;default:console.log(a),z(a);break}e.value.target="",e.value.iptsearch.processing=!1}).catch(t=>{console.log(t)}))},A=()=>{console.log("putFocus ejecutada!!"),f.value.focus()},M=t=>{m("agregar",t)};return(t,a)=>(p(),w("div",W,[e.value.read_barcode?(p(),S(Y,{key:0,ref_key:"iptatc",ref:f,loading:e.value.iptsearch.processing,disable:e.value.iptsearch.processing,modelValue:e.value.target,"onUpdate:modelValue":a[1]||(a[1]=o=>e.value.target=o),dense:"",filled:"",color:"blue-13",class:"text-uppercase col",onKeypress:j(O,["enter"]),autocomplete:"off",autofocus:""},{prepend:r(()=>[c(_,{dense:"",flat:"",color:e.value.read_barcode?"light-blue-13":"blue-13",icon:e.value.read_barcode?"far fa-keyboard":"fas fa-barcode",onClick:a[0]||(a[0]=o=>b())},null,8,["color","icon"])]),_:1},8,["loading","disable","modelValue"])):(p(),S(G,{key:1,dense:"",filled:"",color:"blue-13",class:"text-uppercase col",ref_key:"iptatc",ref:f,"use-input":"","hide-dropdown-icon":"","option-value":"id","option-label":"id","hide-selected":"",behavior:"menu",modelValue:e.value.target,"onUpdate:modelValue":a[3]||(a[3]=o=>e.value.target=o),"input-debounce":400,autofocus:"",options:e.value.options,type:e.value.iptsearch.type,onFilter:P,onInput:h,"popup-content-class":"bg-darkl1"},{"no-option":r(()=>[c(x,null,{default:r(()=>[c(B,{class:"text-grey QuickRegular"},{default:r(()=>a[4]||(a[4]=[V("Nada por aqui...")])),_:1})]),_:1})]),prepend:r(()=>[c(_,{dense:"",flat:"",color:e.value.read_barcode?"light-blue-13":"blue-13",icon:e.value.read_barcode?"far fa-keyboard":"fas fa-barcode",onClick:a[2]||(a[2]=o=>b())},null,8,["color","icon"]),c(_,{type:"button",dense:"",size:"sm",flat:"",onClick:q,icon:e.value.iptsearch.icon,color:"grey-6"},null,8,["icon"])]),option:r(o=>[c(x,D(o.itemProps,{onClick:u=>M(o.opt),disable:$.value(o.opt.stateToVal)}),{default:r(()=>[c(B,null,{default:r(()=>[n("div",Z,[n("div",ee,[n("div",null,[V(d(o.opt.code)+" ",1),n("span",te,d(o.opt.name),1)]),n("div",ae,d(o.opt.description),1),n("div",oe,d(o.opt.stateToVal.state.name),1),o.opt.stateToVal.own?K("",!0):(p(),w("div",le,"Producto en conflicto con status "))]),c(E,{name:"fas fa-circle",class:X(["q-pl-md",`bullet-${o.opt.stateToVal.state.id}`]),size:"10px"},null,8,["class"])])]),_:2},1024)]),_:2},1040,["onClick","disable"])]),_:1},8,["modelValue","options","type"]))]))}};var me=J(se,[["__scopeId","data-v-ed04509a"]]);export{me as P,Q as d};
