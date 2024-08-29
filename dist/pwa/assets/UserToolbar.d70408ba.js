import{f as L,a as N,b as E}from"./QLayout.847b8aa1.js";import{j as k,n as x,r as q,c as d,v as h,y as H,a7 as P,k as g,p as A,m as K,s as O,a8 as U,a9 as F,l as R,aa as I,ab as j,u as T,o as M,g as W,i as p,e as i,f as b,Q as _,a4 as C,w as y,a5 as G,a2 as J,a1 as X}from"./index.ede7f7c0.js";import{g as Y,c as Z,Q as ee}from"./QDialog.a422d261.js";import{u as te}from"./VDB.45cddf73.js";var pe=k({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:s,emit:o}){const{proxy:{$q:r}}=K(),a=A(O,x);if(a===x)return console.error("QHeader needs to be child of QLayout"),x;const f=q(parseInt(e.heightHint,10)),u=q(!0),n=d(()=>e.reveal===!0||a.view.value.indexOf("H")>-1||r.platform.is.ios&&a.isContainer.value===!0),v=d(()=>{if(e.modelValue!==!0)return 0;if(n.value===!0)return u.value===!0?f.value:0;const t=f.value-a.scroll.value.position;return t>0?t:0}),V=d(()=>e.modelValue!==!0||n.value===!0&&u.value!==!0),B=d(()=>e.modelValue===!0&&V.value===!0&&e.reveal===!0),D=d(()=>"q-header q-layout__section--marginal "+(n.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(V.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),z=d(()=>{const t=a.rows.value.top,c={};return t[0]==="l"&&a.left.space===!0&&(c[r.lang.rtl===!0?"right":"left"]=`${a.left.size}px`),t[2]==="r"&&a.right.space===!0&&(c[r.lang.rtl===!0?"left":"right"]=`${a.right.size}px`),c});function l(t,c){a.update("header",t,c)}function m(t,c){t.value!==c&&(t.value=c)}function $({height:t}){m(f,t),l("size",t)}function S(t){B.value===!0&&m(u,!0),o("focusin",t)}h(()=>e.modelValue,t=>{l("space",t),m(u,!0),a.animate()}),h(v,t=>{l("offset",t)}),h(()=>e.reveal,t=>{t===!1&&m(u,e.modelValue)}),h(u,t=>{a.animate(),o("reveal",t)}),h(a.scroll,t=>{e.reveal===!0&&m(u,t.direction==="up"||t.position<=e.revealOffset||t.position-t.inflectionPoint<100)});const w={};return a.instances.header=w,e.modelValue===!0&&l("size",f.value),l("space",e.modelValue),l("offset",v.value),H(()=>{a.instances.header===w&&(a.instances.header=void 0,l("size",0),l("offset",0),l("space",!1))}),()=>{const t=P(s.default,[]);return e.elevated===!0&&t.push(g("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(g(L,{debounce:0,onResize:$})),g("header",{class:D.value,style:z.value,onFocusin:S},t)}}}),ae=k({name:"QCardActions",props:{...U,vertical:Boolean},setup(e,{slots:s}){const o=F(e),r=d(()=>`q-card__actions ${o.value} q-card__actions--${e.vertical===!0?"vert column":"horiz row"}`);return()=>g("div",{class:r.value},R(s.default))}});function Q(e){if(e===!1)return 0;if(e===!0||e===void 0)return 1;const s=parseInt(e,10);return isNaN(s)?0:s}var se=I({name:"close-popup",beforeMount(e,{value:s}){const o={depth:Q(s),handler(r){o.depth!==0&&setTimeout(()=>{const a=Y(e);a!==void 0&&Z(a,r,o.depth)})},handlerKey(r){j(r,13)===!0&&o.handler(r)}};e.__qclosepopup=o,e.addEventListener("click",o.handler),e.addEventListener("keyup",o.handlerKey)},updated(e,{value:s,oldValue:o}){s!==o&&(e.__qclosepopup.depth=Q(s))},beforeUnmount(e){const s=e.__qclosepopup;e.removeEventListener("click",s.handler),e.removeEventListener("keyup",s.handlerKey),delete e.__qclosepopup}});const oe={class:"q-pa-sm transparent text-dark row items-center"},re={class:"col"},ne={class:"text-h6 text-pink"},le={class:"col text-center fs-inc1 text-primary fw-sbold"},ie={class:"col text-right"},ue=p("span",{class:"q-ml-sm"},"Estas por cerrar sesion",-1),me={__name:"UserToolbar",setup(e){const s=te(),o=s.session,r=T(),a=q({state:!1}),f=()=>{s.sessionDestroy(),r.replace("/auth")};return(u,n)=>(M(),W(X,null,[p("div",oe,[i(_,{color:"primary",icon:"home",flat:"",dense:"",class:"q-mr-sm",onClick:n[0]||(n[0]=v=>b(r).push("/"))}),p("div",re,[p("span",ne,C(b(o).credentials.nick),1)]),p("div",le,C(b(o).store.name),1),p("div",ie,[i(_,{color:"pink",icon:"logout","no-caps":"",flat:"",onClick:n[1]||(n[1]=v=>a.value.state=!0)})])]),i(ee,{modelValue:a.value.state,"onUpdate:modelValue":n[2]||(n[2]=v=>a.value.state=v),persistent:""},{default:y(()=>[i(N,null,{default:y(()=>[i(E,{class:"row items-center"},{default:y(()=>[i(G,{icon:"signal_wifi_off",color:"primary","text-color":"white"}),ue]),_:1}),i(ae,{align:"right"},{default:y(()=>[J(i(_,{flat:"",label:"Nope!",color:"primary"},null,512),[[se]]),i(_,{flat:"",label:"Simon!",color:"primary",onClick:f})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}};export{se as C,pe as Q,me as _,ae as a};
