import{a_ as F,r as y,c as k,t as J,o as p,g as w,a as S,w as r,e as c,Q as v,a$ as K,a3 as V,b0 as R,f as j,i as n,a4 as d,h as D,Y as E,aW as W}from"./index.e2be179b.js";import{Q as Y}from"./QInput.4c109b80.js";import{a as x,b as B,Q as G}from"./QSelect.e0670c57.js";import{v as I}from"./axios.eed4c97e.js";import{u as H}from"./use-quasar.ed44e3e9.js";import{u as L}from"./VDB.b8cb5f4c.js";var Q={autocomplete(u){return I.post("/product",u)},getMassive(u){return I.post("/product/getMassive",u)}};const X={class:"QuickRegular row items-center"},Z={class:"row items-center justify-between no-wrap QuickRegular"},ee={class:"col"},te={class:"text-grey-4 q-pl-md"},ae={class:"text--2 text-grey-5"},oe={class:"text--3"},le={key:0,class:"text--3 text-amber-13"},se={__name:"ProductsAutocomplete",props:{limit:{default:30,type:Number},_category:{default:null,type:Boolean},_status:{default:null,type:Boolean},_location:{default:null,type:Boolean},_celler:{default:null,type:Boolean},check_stock:{default:null,type:Boolean},with_locations:{default:null,type:Boolean},with_image:{default:null,type:Boolean},with_prices:{default:null,type:Boolean},with_stock:{default:null,type:Boolean},checkState:{default:!0,type:Boolean},workpointStatus:{default:null,type:[Array,String]},wkpToVal:{default:null,type:Number},blockStates:{type:Array,default:()=>[4,5,6]}},emits:["input","similarcodes","agregar"],setup(u,{emit:f}){const l=u,C=H(),T=L(),e=y({target:"",iptsearch:{processing:!1,type:"number",icon:"fas fa-font"},options:void 0,read_barcode:!0}),m=y(null),_=k(()=>({autocomplete:e.value.target,_category:l._category,_status:l._status,_location:l._location,with_locations:l.with_locations,with_stock:l.with_stock,check_stock:l.check_stock,with_prices:l.with_prices,_celler:l._celler,limit:l.limit,_workpoint_status:l.workpointStatus,_workpoint:T.session.store.id_viz})),N=k(()=>t=>l.checkState?l.blockStates.some(o=>o==t.state.id):!1);J(()=>{e.value.read_barcode=JSON.parse(localStorage.getItem("barcodereader"));let t=JSON.parse(localStorage.getItem("typeiptsearch"));t&&(e.value.iptsearch.type=t.type,e.value.iptsearch.icon=t.icon)});const h=()=>{e.value.read_barcode=!e.value.read_barcode,e.value.target="",localStorage.setItem("barcodereader",e.value.read_barcode)},P=(t,o,a)=>{console.log(_.value),t.trim().length>1&&(e.value.target=t.toUpperCase().trim(),console.log(e.value.target),Q.autocomplete(_.value).then(i=>{console.log(i);let M=i.data.map(s=>{if(l.checkState)if(l.wkpToVal){let g=s.stocks.find(U=>U._workpoint==l.wkpToVal);s.stateToVal=g?{own:g,state:g.status}:{own:null,state:s.status}}else s.stateToVal={own:!0,state:s.status};else s.stateToVal={own:!0,state:s.status};return s});o(()=>{e.value.options=M},s=>{s.setOptionIndex(-1),s.moveOptionSelection(1,!0)})}).catch(i=>{console.log(i)}))},$=()=>{switch(e.value.iptsearch.type){case"text":e.value.iptsearch.type="number",e.value.iptsearch.icon="fas fa-font";break;case"number":e.value.iptsearch.type="text",e.value.iptsearch.icon="fas fa-hashtag";break}localStorage.setItem("typeiptsearch",JSON.stringify(e.value.iptsearch))},b=t=>{e.value.target="",f("input",t)},q=t=>{e.value.target="",f("similarcodes",t)},z=()=>{e.value.target.trim().toUpperCase(),e.value.target.length&&(e.value.iptsearch.processing=!0,Q.autocomplete(_.value).then(t=>{let o=t.data;switch(o.length){case 0:let a=e.value.target;C.notify({message:`Sin resultados para <b>${a}</b>`,color:"negative",icon:"fas fa-times",html:!0,timeout:1e3,position:"center"}),A();break;case 1:console.log("Perfecto, aqui esta tu producto"),b(o[0]);break;default:console.log(o),q(o);break}e.value.target="",e.value.iptsearch.processing=!1}).catch(t=>{console.log(t)}))},A=()=>{console.log("putFocus ejecutada!!"),m.value.focus()},O=t=>{f("agregar",t)};return(t,o)=>(p(),w("div",X,[e.value.read_barcode?(p(),S(Y,{key:0,ref_key:"iptatc",ref:m,loading:e.value.iptsearch.processing,disable:e.value.iptsearch.processing,modelValue:e.value.target,"onUpdate:modelValue":o[1]||(o[1]=a=>e.value.target=a),dense:"",filled:"",color:"blue-13",class:"text-uppercase col",onKeypress:K(z,["enter"]),autocomplete:"off",autofocus:""},{prepend:r(()=>[c(v,{dense:"",flat:"",color:e.value.read_barcode?"light-blue-13":"blue-13",icon:e.value.read_barcode?"far fa-keyboard":"fas fa-barcode",onClick:o[0]||(o[0]=a=>h())},null,8,["color","icon"])]),_:1},8,["loading","disable","modelValue","onKeypress"])):(p(),S(G,{key:1,dense:"",filled:"",color:"blue-13",class:"text-uppercase col",ref_key:"iptatc",ref:m,"use-input":"","hide-dropdown-icon":"","option-value":"id","option-label":"id","hide-selected":"",behavior:"menu",modelValue:e.value.target,"onUpdate:modelValue":o[3]||(o[3]=a=>e.value.target=a),"input-debounce":400,autofocus:"",options:e.value.options,type:e.value.iptsearch.type,onFilter:P,onInput:b,"popup-content-class":"bg-darkl1"},{"no-option":r(()=>[c(x,null,{default:r(()=>[c(B,{class:"text-grey QuickRegular"},{default:r(()=>[V("Nada por aqui...")]),_:1})]),_:1})]),prepend:r(()=>[c(v,{dense:"",flat:"",color:e.value.read_barcode?"light-blue-13":"blue-13",icon:e.value.read_barcode?"far fa-keyboard":"fas fa-barcode",onClick:o[2]||(o[2]=a=>h())},null,8,["color","icon"]),c(v,{type:"button",dense:"",size:"sm",flat:"",onClick:$,icon:e.value.iptsearch.icon,color:"grey-6"},null,8,["icon"])]),option:r(a=>[c(x,R(a.itemProps,{onClick:i=>O(a.opt),disable:j(N)(a.opt.stateToVal)}),{default:r(()=>[c(B,null,{default:r(()=>[n("div",Z,[n("div",ee,[n("div",null,[V(d(a.opt.code)+" ",1),n("span",te,d(a.opt.name),1)]),n("div",ae,d(a.opt.description),1),n("div",oe,d(a.opt.stateToVal.state.name),1),a.opt.stateToVal.own?D("",!0):(p(),w("div",le,"Producto en conflicto con status "))]),c(E,{name:"fas fa-circle",class:W(["q-pl-md",`bullet-${a.opt.stateToVal.state.id}`]),size:"10px"},null,8,["class"])])]),_:2},1024)]),_:2},1040,["onClick","disable"])]),_:1},8,["modelValue","options","type"]))]))}};var de=F(se,[["__scopeId","data-v-ed04509a"]]);export{de as P,Q as d};