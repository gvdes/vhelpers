import{c as d,j,r as o,p as $,v as I,k as u,_ as Q,l as E,Z as H}from"./index.a84a4054.js";import{a as g}from"./axios.30672b3a.js";const L={ratio:[String,Number]};function M(e,i){return d(()=>{const a=Number(e.ratio||(i!==void 0?i.value:void 0));return isNaN(a)!==!0&&a>0?{paddingBottom:`${100/a}%`}:null})}const O=16/9;var D=j({name:"QImg",props:{...L,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:O},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:i,emit:a}){const S=o(e.initialRatio),y=M(e,S);let n=null,f=!1;const l=[o(null),o(h())],r=o(0),s=o(!1),c=o(!1),w=d(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),C=d(()=>({width:e.width,height:e.height})),k=d(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),z=d(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));$(()=>_(),b);function _(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function h(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function b(t){n!==null&&(clearTimeout(n),n=null),c.value=!1,t===null?(s.value=!1,l[r.value^1].value=h()):s.value=!0,l[r.value].value=t}function F({target:t}){f!==!0&&(n!==null&&(clearTimeout(n),n=null),S.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,q(t,1))}function q(t,m){f===!0||m===1e3||(t.complete===!0?N(t):n=setTimeout(()=>{n=null,q(t,m+1)},50))}function N(t){f!==!0&&(r.value=r.value^1,l[r.value].value=null,s.value=!1,c.value=!1,a("load",t.currentSrc||t.src))}function B(t){n!==null&&(clearTimeout(n),n=null),s.value=!1,c.value=!0,l[r.value].value=null,l[r.value^1].value=h(),a("error",t)}function T(t){const m=l[t].value,v={key:"img_"+t,class:k.value,style:z.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...m};return r.value===t?(v.class+=" q-img__image--waiting",Object.assign(v,{onLoad:F,onError:B})):v.class+=" q-img__image--loaded",u("div",{class:"q-img__container absolute-full",key:"img"+t},u("img",v))}function R(){return s.value!==!0?u("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},E(i[c.value===!0?"error":"default"])):u("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},i.loading!==void 0?i.loading():e.noSpinner===!0?void 0:[u(H,{color:e.spinnerColor,size:e.spinnerSize})])}return b(_()),I(()=>{f=!0,n!==null&&(clearTimeout(n),n=null)}),()=>{const t=[];return y.value!==null&&t.push(u("div",{key:"filler",style:y.value})),c.value!==!0&&(l[0].value!==null&&t.push(T(0)),l[1].value!==null&&t.push(T(1))),t.push(u(Q,{name:"q-transition--fade"},R)),u("div",{class:w.value,style:C.value,role:"img","aria-label":e.alt},t)}}}),U={newForm(e){return g.post("/deposits/forms",e).then(i=>i.data).catch(i=>({fail:i}))},getFormStore(e,i){return g.post(`/deposits/getFormsStore/${e}`,i).then(a=>a.data).catch(a=>({fail:a}))},getForm(e){return g.post("/deposits/getForms",e).then(i=>i.data).catch(i=>({fail:i}))},changeStatus(e){return g.post("/deposits/changeStatus",e).then(i=>i.data).catch(i=>({fail:i}))},changeTicket(e){return g.post("/deposits/changeTicket",e).then(i=>i.data).catch(i=>({fail:i}))}};export{D as Q,U as d};
