import{Q as ce}from"./position-engine.bf148315.js";import{ar as Ue,j as ge,as as ze,c as x,k as v,au as Ce,m as oe,r as U,Z as _e,O as be,Y as we,_ as Ve,t as Be,v as Qe,y as je,aP as Re,M as Ee,aJ as Ne,V as ve,aS as Pe,U as he,Q as te,aI as Le,o as J,a as De,w as F,e as n,i as I,a3 as fe,g as G,h as K}from"./index.6340b596.js";import{Q as Me}from"./axios.5c626a66.js";import{_ as Ae,Q as Oe}from"./UserToolbar.145e22a8.js";import{u as Te,f as $e,Q as Ie,a as He,b as We,c as B,d as Xe}from"./QLayout.3cc03a68.js";import{d as Ye,h as me,Q as Z}from"./QSelect.d4143248.js";import{Q as O}from"./QInput.49e803f9.js";import{Q as Je}from"./QForm.d513b42b.js";import{u as Ge}from"./VDB.d906941c.js";import{a as Ke}from"./axios.4806dd9d.js";import{u as Ze}from"./use-quasar.c8621800.js";import"./QDialog.bfd009c7.js";import"./QItem.8933a4b2.js";const et={...Ue,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,rounded:Boolean,thickness:{type:Number,default:.2,validator:e=>e>=0&&e<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},le=50,ye=2*le,Fe=ye*Math.PI,tt=Math.round(Fe*1e3)/1e3;var at=ge({name:"QCircularProgress",props:{...et,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(e,{slots:f}){const{proxy:{$q:t}}=oe(),b=ze(e),r=x(()=>{const q=(t.lang.rtl===!0?-1:1)*e.angle;return{transform:e.reverse!==(t.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-q}deg)`:`rotate3d(0, 0, 1, ${q-90}deg)`}}),h=x(()=>e.instantFeedback!==!0&&e.indeterminate!==!0?{transition:`stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease`}:""),S=x(()=>ye/(1-e.thickness/2)),c=x(()=>`${S.value/2} ${S.value/2} ${S.value} ${S.value}`),s=x(()=>Ye(e.value,e.min,e.max)),i=x(()=>Fe*(1-(s.value-e.min)/(e.max-e.min))),R=x(()=>e.thickness/2*S.value);function E({thickness:q,offset:a,color:u,cls:k,rounded:Q}){return v("circle",{class:"q-circular-progress__"+k+(u!==void 0?` text-${u}`:""),style:h.value,fill:"transparent",stroke:"currentColor","stroke-width":q,"stroke-dasharray":tt,"stroke-dashoffset":a,"stroke-linecap":Q,cx:S.value,cy:S.value,r:le})}return()=>{const q=[];e.centerColor!==void 0&&e.centerColor!=="transparent"&&q.push(v("circle",{class:`q-circular-progress__center text-${e.centerColor}`,fill:"currentColor",r:le-R.value/2,cx:S.value,cy:S.value})),e.trackColor!==void 0&&e.trackColor!=="transparent"&&q.push(E({cls:"track",thickness:R.value,offset:0,color:e.trackColor})),q.push(E({cls:"circle",thickness:R.value,offset:i.value,color:e.color,rounded:e.rounded===!0?"round":void 0}));const a=[v("svg",{class:"q-circular-progress__svg",style:r.value,viewBox:c.value,"aria-hidden":"true"},q)];return e.showValue===!0&&a.push(v("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:e.fontSize}},f.default!==void 0?f.default():[v("div",s.value)])),v("div",{class:`q-circular-progress q-circular-progress--${e.indeterminate===!0?"in":""}determinate`,style:b.value,role:"progressbar","aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.indeterminate===!0?void 0:s.value},Ce(f.internal,a))}}});function X(e,f,t,b){const r=[];return e.forEach(h=>{b(h)===!0?r.push(h):f.push({failedPropValidation:t,file:h})}),r}function ee(e){e&&e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),be(e)}const lt={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},ot=["rejected"];function ut({editable:e,dnd:f,getFileInput:t,addFilesToQueue:b}){const{props:r,emit:h,proxy:S}=oe(),c=U(null),s=x(()=>r.accept!==void 0?r.accept.split(",").map(o=>(o=o.trim(),o==="*"?"*/":(o.endsWith("/*")&&(o=o.slice(0,o.length-1)),o.toUpperCase()))):null),i=x(()=>parseInt(r.maxFiles,10)),R=x(()=>parseInt(r.maxTotalSize,10));function E(o){if(e.value)if(o!==Object(o)&&(o={target:null}),o.target!==null&&o.target.matches('input[type="file"]')===!0)o.clientX===0&&o.clientY===0&&_e(o);else{const w=t();w&&w!==o.target&&w.click(o)}}function q(o){e.value&&o&&b(null,o)}function a(o,w,D,M){let d=Array.from(w||o.target.files);const z=[],j=()=>{z.length>0&&h("rejected",z)};if(r.accept!==void 0&&s.value.indexOf("*/")===-1&&(d=X(d,z,"accept",g=>s.value.some(y=>g.type.toUpperCase().startsWith(y)||g.name.toUpperCase().endsWith(y))),d.length===0))return j();if(r.maxFileSize!==void 0){const g=parseInt(r.maxFileSize,10);if(d=X(d,z,"max-file-size",y=>y.size<=g),d.length===0)return j()}if(r.multiple!==!0&&d.length>0&&(d=[d[0]]),d.forEach(g=>{g.__key=g.webkitRelativePath+g.lastModified+g.name+g.size}),M===!0){const g=D.map(y=>y.__key);d=X(d,z,"duplicate",y=>g.includes(y.__key)===!1)}if(d.length===0)return j();if(r.maxTotalSize!==void 0){let g=M===!0?D.reduce((y,A)=>y+A.size,0):0;if(d=X(d,z,"max-total-size",y=>(g+=y.size,g<=R.value)),d.length===0)return j()}if(typeof r.filter=="function"){const g=r.filter(d);d=X(d,z,"filter",y=>g.includes(y))}if(r.maxFiles!==void 0){let g=M===!0?D.length:0;if(d=X(d,z,"max-files",()=>(g++,g<=i.value)),d.length===0)return j()}if(j(),d.length>0)return d}function u(o){ee(o),f.value!==!0&&(f.value=!0)}function k(o){be(o),(o.relatedTarget!==null||we.is.safari!==!0?o.relatedTarget!==c.value:document.elementsFromPoint(o.clientX,o.clientY).includes(c.value)===!1)===!0&&(f.value=!1)}function Q(o){ee(o);const w=o.dataTransfer.files;w.length>0&&b(null,w),f.value=!1}function _(o){if(f.value===!0)return v("div",{ref:c,class:`q-${o}__dnd absolute-full`,onDragenter:ee,onDragover:ee,onDragleave:k,onDrop:Q})}return Object.assign(S,{pickFiles:E,addFiles:q}),{pickFiles:E,addFiles:q,onDragover:u,onDragleave:k,processFiles:a,getDndNode:_,maxFilesNumber:i,maxTotalSizeNumber:R}}function pe(e){return(e*100).toFixed(2)+"%"}const rt={...Te,...lt,label:String,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,noThumbnails:Boolean,autoUpload:Boolean,hideUploadBtn:Boolean,disable:Boolean,readonly:Boolean},xe=[...ot,"start","finish","added","removed"];function nt(e){const f=oe(),{props:t,slots:b,emit:r,proxy:h}=f,{$q:S}=h,c=$e(t,S);function s(l,p,C){if(l.__status=p,p==="idle"){l.__uploaded=0,l.__progress=0,l.__sizeLabel=me(l.size),l.__progressLabel="0.00%";return}if(p==="failed"){h.$forceUpdate();return}l.__uploaded=p==="uploaded"?l.size:C,l.__progress=p==="uploaded"?1:Math.min(.9999,l.__uploaded/l.size),l.__progressLabel=pe(l.__progress),h.$forceUpdate()}const i=x(()=>t.disable!==!0&&t.readonly!==!0),R=U(!1),E=U(null),q=U(null),a={files:U([]),queuedFiles:U([]),uploadedFiles:U([]),uploadedSize:U(0),updateFileStatus:s,isAlive:()=>Ve(f)===!1},{pickFiles:u,addFiles:k,onDragover:Q,onDragleave:_,processFiles:o,getDndNode:w,maxFilesNumber:D,maxTotalSizeNumber:M}=ut({editable:i,dnd:R,getFileInput:ne,addFilesToQueue:se});Object.assign(a,e({props:t,slots:b,emit:r,helpers:a})),a.isBusy===void 0&&(a.isBusy=U(!1));const d=U(0),z=x(()=>d.value===0?0:a.uploadedSize.value/d.value),j=x(()=>pe(z.value)),g=x(()=>me(d.value)),y=x(()=>i.value===!0&&a.isUploading.value!==!0&&(t.multiple===!0||a.queuedFiles.value.length===0)&&(t.maxFiles===void 0||a.files.value.length<D.value)&&(t.maxTotalSize===void 0||d.value<M.value)),A=x(()=>i.value===!0&&a.isBusy.value!==!0&&a.isUploading.value!==!0&&a.queuedFiles.value.length>0);Be(Pe,ie);const m=x(()=>"q-uploader column no-wrap"+(c.value===!0?" q-uploader--dark q-dark":"")+(t.bordered===!0?" q-uploader--bordered":"")+(t.square===!0?" q-uploader--square no-border-radius":"")+(t.flat===!0?" q-uploader--flat no-shadow":"")+(t.disable===!0?" disabled q-uploader--disable":"")+(R.value===!0?" q-uploader--dnd":"")),T=x(()=>"q-uploader__header"+(t.color!==void 0?` bg-${t.color}`:"")+(t.textColor!==void 0?` text-${t.textColor}`:""));Qe(a.isUploading,(l,p)=>{p===!1&&l===!0?r("start"):p===!0&&l===!1&&r("finish")});function H(){t.disable===!1&&(a.abort(),a.uploadedSize.value=0,d.value=0,re(),a.files.value=[],a.queuedFiles.value=[],a.uploadedFiles.value=[])}function W(){t.disable===!1&&ae(["uploaded"],()=>{a.uploadedFiles.value=[]})}function N(){ae(["idle","failed"],({size:l})=>{d.value-=l,a.queuedFiles.value=[]})}function ae(l,p){if(t.disable===!0)return;const C={files:[],size:0},P=a.files.value.filter(V=>l.indexOf(V.__status)===-1?!0:(C.size+=V.size,C.files.push(V),V.__img!==void 0&&window.URL.revokeObjectURL(V.__img.src),!1));C.files.length>0&&(a.files.value=P,p(C),r("removed",C.files))}function ue(l){t.disable||(l.__status==="uploaded"?a.uploadedFiles.value=a.uploadedFiles.value.filter(p=>p.__key!==l.__key):l.__status==="uploading"?l.__abort():d.value-=l.size,a.files.value=a.files.value.filter(p=>p.__key!==l.__key?!0:(p.__img!==void 0&&window.URL.revokeObjectURL(p.__img.src),!1)),a.queuedFiles.value=a.queuedFiles.value.filter(p=>p.__key!==l.__key),r("removed",[l]))}function re(){a.files.value.forEach(l=>{l.__img!==void 0&&window.URL.revokeObjectURL(l.__img.src)})}function ne(){return q.value||E.value.getElementsByClassName("q-uploader__input")[0]}function se(l,p){const C=o(l,p,a.files.value,!0),P=ne();P!=null&&(P.value=""),C!==void 0&&(C.forEach(V=>{if(a.updateFileStatus(V,"idle"),d.value+=V.size,t.noThumbnails!==!0&&V.type.toUpperCase().startsWith("IMAGE")){const de=new Image;de.src=window.URL.createObjectURL(V),V.__img=de}}),a.files.value=a.files.value.concat(C),a.queuedFiles.value=a.queuedFiles.value.concat(C),r("added",C),t.autoUpload===!0&&a.upload())}function Se(){A.value===!0&&a.upload()}function Y(l,p,C){if(l===!0){const P={type:"a",key:p,icon:S.iconSet.uploader[p],flat:!0,dense:!0};let V;return p==="add"?(P.onClick=u,V=ie):P.onClick=C,v(te,P,V)}}function ie(){return v("input",{ref:q,class:"q-uploader__input overflow-hidden absolute-full",tabindex:-1,type:"file",title:"",accept:t.accept,multiple:t.multiple===!0?"multiple":void 0,capture:t.capture,onMousedown:_e,onClick:u,onChange:se})}function ke(){return b.header!==void 0?b.header($):[v("div",{class:"q-uploader__header-content column"},[v("div",{class:"flex flex-center no-wrap q-gutter-xs"},[Y(a.queuedFiles.value.length>0,"removeQueue",N),Y(a.uploadedFiles.value.length>0,"removeUploaded",W),a.isUploading.value===!0?v(ve,{class:"q-uploader__spinner"}):null,v("div",{class:"col column justify-center"},[t.label!==void 0?v("div",{class:"q-uploader__title"},[t.label]):null,v("div",{class:"q-uploader__subtitle"},[g.value+" / "+j.value])]),Y(y.value,"add"),Y(t.hideUploadBtn===!1&&A.value===!0,"upload",a.upload),Y(a.isUploading.value,"clear",a.abort)])])]}function qe(){return b.list!==void 0?b.list($):a.files.value.map(l=>v("div",{key:l.__key,class:"q-uploader__file relative-position"+(t.noThumbnails!==!0&&l.__img!==void 0?" q-uploader__file--img":"")+(l.__status==="failed"?" q-uploader__file--failed":l.__status==="uploaded"?" q-uploader__file--uploaded":""),style:t.noThumbnails!==!0&&l.__img!==void 0?{backgroundImage:'url("'+l.__img.src+'")'}:null},[v("div",{class:"q-uploader__file-header row flex-center no-wrap"},[l.__status==="failed"?v(he,{class:"q-uploader__file-status",name:S.iconSet.type.negative,color:"negative"}):null,v("div",{class:"q-uploader__file-header-content col"},[v("div",{class:"q-uploader__title"},[l.name]),v("div",{class:"q-uploader__subtitle row items-center no-wrap"},[l.__sizeLabel+" / "+l.__progressLabel])]),l.__status==="uploading"?v(at,{value:l.__progress,min:0,max:1,indeterminate:l.__progress===0}):v(te,{round:!0,dense:!0,flat:!0,icon:S.iconSet.uploader[l.__status==="uploaded"?"done":"clear"],onClick:()=>{ue(l)}})])]))}je(()=>{a.isUploading.value===!0&&a.abort(),a.files.value.length>0&&re()});const $={};for(const l in a)Re(a[l])===!0?Ee($,l,()=>a[l].value):$[l]=a[l];return Object.assign($,{upload:Se,reset:H,removeUploadedFiles:W,removeQueuedFiles:N,removeFile:ue,pickFiles:u,addFiles:k}),Ne($,{canAddFiles:()=>y.value,canUpload:()=>A.value,uploadSizeLabel:()=>g.value,uploadProgressLabel:()=>j.value}),Object.assign(h,$),()=>{const l=[v("div",{class:T.value},ke()),v("div",{class:"q-uploader__list scroll"},qe()),w("uploader")];a.isBusy.value===!0&&l.push(v("div",{class:"q-uploader__overlay absolute-full flex flex-center"},[v(ve)]));const p={ref:E,class:m.value};return y.value===!0&&Object.assign(p,{onDragover:Q,onDragleave:_}),v("div",p,l)}}const st=()=>!0;function it(e){const f={};return e.forEach(t=>{f[t]=st}),f}const dt=it(xe);var ct=({name:e,props:f,emits:t,injectPlugin:b})=>ge({name:e,props:{...rt,...f},emits:Le(t)===!0?{...dt,...t}:[...xe,...t],setup(){return nt(b)}});function L(e){return typeof e=="function"?e:()=>e}const vt={url:[Function,String],method:{type:[Function,String],default:"POST"},fieldName:{type:[Function,String],default:()=>e=>e.name},headers:[Function,Array],formFields:[Function,Array],withCredentials:[Function,Boolean],sendRaw:[Function,Boolean],batch:[Function,Boolean],factory:Function},ft=["factoryFailed","uploaded","failed","uploading"];function mt({props:e,emit:f,helpers:t}){const b=U([]),r=U([]),h=U(0),S=x(()=>({url:L(e.url),method:L(e.method),headers:L(e.headers),formFields:L(e.formFields),fieldName:L(e.fieldName),withCredentials:L(e.withCredentials),sendRaw:L(e.sendRaw),batch:L(e.batch)})),c=x(()=>h.value>0),s=x(()=>r.value.length>0);let i;function R(){b.value.forEach(u=>{u.abort()}),r.value.length>0&&(i=!0)}function E(){const u=t.queuedFiles.value.slice(0);t.queuedFiles.value=[],S.value.batch(u)?q(u):u.forEach(k=>{q([k])})}function q(u){if(h.value++,typeof e.factory!="function"){a(u,{});return}const k=e.factory(u);if(!k)f("factoryFailed",new Error("QUploader: factory() does not return properly"),u),h.value--;else if(typeof k.catch=="function"&&typeof k.then=="function"){r.value.push(k);const Q=_=>{t.isAlive()===!0&&(r.value=r.value.filter(o=>o!==k),r.value.length===0&&(i=!1),t.queuedFiles.value=t.queuedFiles.value.concat(u),u.forEach(o=>{t.updateFileStatus(o,"failed")}),f("factoryFailed",_,u),h.value--)};k.then(_=>{i===!0?Q(new Error("Aborted")):t.isAlive()===!0&&(r.value=r.value.filter(o=>o!==k),a(u,_))}).catch(Q)}else a(u,k||{})}function a(u,k){const Q=new FormData,_=new XMLHttpRequest,o=(m,T)=>k[m]!==void 0?L(k[m])(T):S.value[m](T),w=o("url",u);if(!w){console.error("q-uploader: invalid or no URL specified"),h.value--;return}const D=o("formFields",u);D!==void 0&&D.forEach(m=>{Q.append(m.name,m.value)});let M=0,d=0,z=0,j=0,g;_.upload.addEventListener("progress",m=>{if(g===!0)return;const T=Math.min(j,m.loaded);t.uploadedSize.value+=T-z,z=T;let H=z-d;for(let W=M;H>0&&W<u.length;W++){const N=u[W];if(H>N.size)H-=N.size,M++,d+=N.size,t.updateFileStatus(N,"uploading",N.size);else{t.updateFileStatus(N,"uploading",H);return}}},!1),_.onreadystatechange=()=>{_.readyState<4||(_.status&&_.status<400?(t.uploadedFiles.value=t.uploadedFiles.value.concat(u),u.forEach(m=>{t.updateFileStatus(m,"uploaded")}),f("uploaded",{files:u,xhr:_})):(g=!0,t.uploadedSize.value-=z,t.queuedFiles.value=t.queuedFiles.value.concat(u),u.forEach(m=>{t.updateFileStatus(m,"failed")}),f("failed",{files:u,xhr:_})),h.value--,b.value=b.value.filter(m=>m!==_))},_.open(o("method",u),w),o("withCredentials",u)===!0&&(_.withCredentials=!0);const y=o("headers",u);y!==void 0&&y.forEach(m=>{_.setRequestHeader(m.name,m.value)});const A=o("sendRaw",u);u.forEach(m=>{t.updateFileStatus(m,"uploading",0),A!==!0&&Q.append(o("fieldName",m),m,m.name),m.xhr=_,m.__abort=()=>{_.abort()},j+=m.size}),f("uploading",{files:u,xhr:_}),b.value.push(_),A===!0?_.send(new Blob(u)):_.send(Q)}return{isUploading:c,isBusy:s,abort:R,upload:E}}var pt={name:"QUploader",props:vt,emits:ft,injectPlugin:mt},gt=ct(pt);const _t=I("span",{class:"text-h6"},"Apertura de Cajas",-1),bt={class:"flex justify-center"},ht=I("div",{class:"text-h4 text-center"},"APERTURA DE CAJA",-1),yt=I("div",{class:"text-subtitle2 text-center"},"Movimientos en cajas despues de el corte",-1),Ft={key:0},xt={key:1},St={key:2},kt={key:0},qt={class:"col flex justify-center"},Dt={__name:"OpenLayout",setup(e){const f=Ge();Ze(),U(null);const t=U(null),b=U({val:null,opts:null}),r=U(null),h=U(null);return(async()=>{let c=f.session.store.id;console.log(c),Ke.get(`/cashier/getStaff/${c}`).then(s=>{console.log(s.data),b.value.opts=s.data})})(),(c,s)=>(J(),De(Ie,{view:"hHh Lpr fFf"},{default:F(()=>[n(Oe,{class:"transparent text-dark",bordered:""},{default:F(()=>[n(Ae),n(ce),n(Me,{class:"justify-between"},{default:F(()=>[I("div",null,[fe("Helpers "),n(he,{name:"navigate_next",color:"primary"}),fe(),_t])]),_:1})]),_:1}),n(ce,{spaced:"",inset:"",vertical:"",dark:""}),n(Xe,null,{default:F(()=>[n(He,null,{default:F(()=>[I("div",bt,[n(Je,{class:"q-gutter-md"},{default:F(()=>[n(We,{class:"my-card",square:"",bordere:""},{default:F(()=>[n(B,null,{default:F(()=>[ht,yt]),_:1}),n(B,null,{default:F(()=>[n(Z,{modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=i=>t.value=i),options:[1,2,3,4,5,6,7,8,9],label:"Caja",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),n(B,null,{default:F(()=>[n(Z,{modelValue:b.value.val,"onUpdate:modelValue":s[1]||(s[1]=i=>b.value.val=i),options:b.value.opts,label:"Cajero","option-label":"complete_name",outlined:"",dense:""},null,8,["modelValue","options"])]),_:1}),n(B,null,{default:F(()=>[n(Z,{modelValue:r.value,"onUpdate:modelValue":s[2]||(s[2]=i=>r.value=i),options:["Desctuadre","Mal Devolucion","Retirada Mal"],label:"Motivo",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),r.value=="Desctuadre"?(J(),G("div",Ft,[n(B,null,{default:F(()=>[n(O,{modelValue:c.text,"onUpdate:modelValue":s[3]||(s[3]=i=>c.text=i),type:"Number",label:"Monto de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),n(B,null,{default:F(()=>[n(O,{modelValue:c.text,"onUpdate:modelValue":s[4]||(s[4]=i=>c.text=i),type:"text",label:"Motivo de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):K("",!0),r.value=="Mal Devolucion"?(J(),G("div",xt,[n(B,null,{default:F(()=>[n(O,{modelValue:c.text,"onUpdate:modelValue":s[5]||(s[5]=i=>c.text=i),type:"text",label:"Cual es el numero de ticket original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),n(B,null,{default:F(()=>[n(O,{modelValue:c.text,"onUpdate:modelValue":s[6]||(s[6]=i=>c.text=i),type:"text",label:"Cual es el numero de devolucion original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),n(B,null,{default:F(()=>[n(O,{modelValue:c.text,"onUpdate:modelValue":s[7]||(s[7]=i=>c.text=i),type:"text",label:"Especifica por que se creara una devolucion nueva",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):K("",!0),r.value=="Retirada Mal"?(J(),G("div",St,[n(B,null,{default:F(()=>[n(O,{modelValue:c.text,"onUpdate:modelValue":s[8]||(s[8]=i=>c.text=i),type:"Number",label:"Numero de retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),n(B,null,{default:F(()=>[n(Z,{modelValue:h.value,"onUpdate:modelValue":s[9]||(s[9]=i=>h.value=i),options:["Modificar","Eliminar"],label:"Que se la hara?",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),h.value=="Modificar"?(J(),G("div",kt,[n(B,null,{default:F(()=>[n(O,{modelValue:c.text,"onUpdate:modelValue":s[10]||(s[10]=i=>c.text=i),type:"Number",label:"Monto a modificar",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):K("",!0),n(B,null,{default:F(()=>[n(O,{modelValue:c.text,"onUpdate:modelValue":s[11]||(s[11]=i=>c.text=i),type:"text",label:"Especifica por que el cambio de la retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):K("",!0),n(B,null,{default:F(()=>[I("div",qt,[n(gt,{"hide-upload-btn":!0,ref:"uploaderRefprov",color:"primary",label:"Corte Actual"},null,512)])]),_:1})]),_:1}),I("div",null,[n(te,{label:"Submit",type:"submit",color:"primary"}),n(te,{label:"Reset",type:"reset",color:"primary",flat:"",class:"q-ml-sm"})])]),_:1})])]),_:1})]),_:1})]),_:1}))}};export{Dt as default};
