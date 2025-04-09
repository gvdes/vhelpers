import{a_ as F,r as k,c as y,x as J,o as p,g as w,a as S,w as r,e as c,Q as v,a$ as K,a3 as V,b0 as R,f as j,i as n,a4 as d,h as D,Y as E,aW as W}from"./index.a84a4054.js";import{Q as Y}from"./QInput.72fca508.js";import{a as x,b as B,Q as G}from"./QSelect.1b95f875.js";import{v as I}from"./axios.30672b3a.js";import{u as H}from"./use-quasar.95fbdb12.js";import{u as L}from"./VDB.540e6c37.js";/* empty css                                                                         */var Q={autocomplete(i){return I.post("/product",i)},getMassive(i){return I.post("/product/getMassive",i)}};const X={class:"QuickRegular row items-center"},Z={class:"row items-center justify-between no-wrap QuickRegular"},ee={class:"col"},te={class:"text-grey-4 q-pl-md"},ae={class:"text--2 text-grey-5"},oe={class:"text--3"},le={key:0,class:"text--3 text-amber-13"},se={__name:"ProductsAutocomplete",props:{limit:{default:30,type:Number},_category:{default:null,type:Boolean},_status:{default:null,type:Boolean},_location:{default:null,type:Boolean},_celler:{default:null,type:Boolean},check_stock:{default:null,type:Boolean},with_locations:{default:null,type:Boolean},with_image:{default:null,type:Boolean},with_prices:{default:null,type:Boolean},with_stock:{default:null,type:Boolean},checkState:{default:!0,type:Boolean},workpointStatus:{default:null,type:[Array,String]},wkpToVal:{default:null,type:Number},blockStates:{type:Array,default:()=>[4,5,6]}},emits:["input","similarcodes","agregar"],setup(i,{emit:f}){const l=i,C=H(),T=L(),e=k({target:"",iptsearch:{processing:!1,type:"number",icon:"fas fa-font"},options:void 0,read_barcode:!0}),m=k(null),g=y(()=>({autocomplete:e.value.target,_category:l._category,_status:l._status,_location:l._location,with_locations:l.with_locations,with_stock:l.with_stock,check_stock:l.check_stock,with_prices:l.with_prices,_celler:l._celler,limit:l.limit,_workpoint_status:l.workpointStatus,_workpoint:T.session.store.id_viz})),N=y(()=>t=>l.checkState?l.blockStates.some(o=>o==t.state.id):!1);J(()=>{e.value.read_barcode=JSON.parse(localStorage.getItem("barcodereader"));let t=JSON.parse(localStorage.getItem("typeiptsearch"));t&&(e.value.iptsearch.type=t.type,e.value.iptsearch.icon=t.icon)});const h=()=>{e.value.read_barcode=!e.value.read_barcode,e.value.target="",localStorage.setItem("barcodereader",e.value.read_barcode)},$=(t,o,a)=>{console.log(g.value),t.trim().length>1&&(e.value.target=t.toUpperCase().trim(),console.log(e.value.target),Q.autocomplete(g.value).then(u=>{console.log(u);let M=u.data.map(s=>{if(l.checkState)if(l.wkpToVal){let _=s.stocks.find(U=>U._workpoint==l.wkpToVal);s.stateToVal=_?{own:_,state:_.status}:{own:null,state:s.status}}else s.stateToVal={own:!0,state:s.status};else s.stateToVal={own:!0,state:s.status};return s});o(()=>{e.value.options=M},s=>{s.setOptionIndex(-1),s.moveOptionSelection(1,!0)})}).catch(u=>{console.log(u)}))},P=()=>{switch(e.value.iptsearch.type){case"text":e.value.iptsearch.type="number",e.value.iptsearch.icon="fas fa-font";break;case"number":e.value.iptsearch.type="text",e.value.iptsearch.icon="fas fa-hashtag";break}localStorage.setItem("typeiptsearch",JSON.stringify(e.value.iptsearch))},b=t=>{e.value.target="",f("input",t)},q=t=>{e.value.target="",f("similarcodes",t)},z=()=>{e.value.target.trim().toUpperCase(),e.value.target.length&&(e.value.iptsearch.processing=!0,Q.autocomplete(g.value).then(t=>{let o=t.data;switch(o.length){case 0:let a=e.value.target;C.notify({message:`Sin resultados para <b>${a}</b>`,color:"negative",icon:"fas fa-times",html:!0,timeout:1e3,position:"center"}),O();break;case 1:console.log("Perfecto, aqui esta tu producto"),b(o[0]);break;default:console.log(o),q(o);break}e.value.target="",e.value.iptsearch.processing=!1}).catch(t=>{console.log(t)}))},O=()=>{console.log("putFocus ejecutada!!"),m.value.focus()},A=t=>{f("agregar",t)};return(t,o)=>(p(),w("div",X,[e.value.read_barcode?(p(),S(Y,{key:0,ref_key:"iptatc",ref:m,loading:e.value.iptsearch.processing,disable:e.value.iptsearch.processing,modelValue:e.value.target,"onUpdate:modelValue":o[1]||(o[1]=a=>e.value.target=a),dense:"",filled:"",color:"blue-13",class:"text-uppercase col",onKeypress:K(z,["enter"]),autocomplete:"off",autofocus:""},{prepend:r(()=>[c(v,{dense:"",flat:"",color:e.value.read_barcode?"light-blue-13":"blue-13",icon:e.value.read_barcode?"far fa-keyboard":"fas fa-barcode",onClick:o[0]||(o[0]=a=>h())},null,8,["color","icon"])]),_:1},8,["loading","disable","modelValue","onKeypress"])):(p(),S(G,{key:1,dense:"",filled:"",color:"blue-13",class:"text-uppercase col",ref_key:"iptatc",ref:m,"use-input":"","hide-dropdown-icon":"","option-value":"id","option-label":"id","hide-selected":"",behavior:"menu",modelValue:e.value.target,"onUpdate:modelValue":o[3]||(o[3]=a=>e.value.target=a),"input-debounce":400,autofocus:"",options:e.value.options,type:e.value.iptsearch.type,onFilter:$,onInput:b,"popup-content-class":"bg-darkl1"},{"no-option":r(()=>[c(x,null,{default:r(()=>[c(B,{class:"text-grey QuickRegular"},{default:r(()=>[V("Nada por aqui...")]),_:1})]),_:1})]),prepend:r(()=>[c(v,{dense:"",flat:"",color:e.value.read_barcode?"light-blue-13":"blue-13",icon:e.value.read_barcode?"far fa-keyboard":"fas fa-barcode",onClick:o[2]||(o[2]=a=>h())},null,8,["color","icon"]),c(v,{type:"button",dense:"",size:"sm",flat:"",onClick:P,icon:e.value.iptsearch.icon,color:"grey-6"},null,8,["icon"])]),option:r(a=>[c(x,R(a.itemProps,{onClick:u=>A(a.opt),disable:j(N)(a.opt.stateToVal)}),{default:r(()=>[c(B,null,{default:r(()=>[n("div",Z,[n("div",ee,[n("div",null,[V(d(a.opt.code)+" ",1),n("span",te,d(a.opt.name),1)]),n("div",ae,d(a.opt.description),1),n("div",oe,d(a.opt.stateToVal.state.name),1),a.opt.stateToVal.own?D("",!0):(p(),w("div",le,"Producto en conflicto con status "))]),c(E,{name:"fas fa-circle",class:W(["q-pl-md",`bullet-${a.opt.stateToVal.state.id}`]),size:"10px"},null,8,["class"])])]),_:2},1024)]),_:2},1040,["onClick","disable"])]),_:1},8,["modelValue","options","type"]))]))}};var fe=F(se,[["__scopeId","data-v-1af073d1"]]);export{fe as P,Q as d};
