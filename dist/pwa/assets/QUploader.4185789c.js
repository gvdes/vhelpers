import{a9 as me,i as ne,aa as ge,c as h,j as s,ac as _e,l as G,r as z,y as ie,D as se,$ as he,C as be,z as Fe,aT as ye,n as Se,t as qe,aU as xe,x as ke,aJ as ze,Z as le,Y as we,Q as re,aI as Ue}from"./index.799ea64d.js";import{g as Ce,i as ue}from"./QSelect.ce47e387.js";import{d as Be,c as Re}from"./use-quasar.efa320bd.js";const Pe={...me,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,rounded:Boolean,thickness:{type:Number,default:.2,validator:t=>t>=0&&t<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean},Y=50,de=2*Y,ce=de*Math.PI,Ee=Math.round(ce*1e3)/1e3;var je=ne({name:"QCircularProgress",props:{...Pe,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(t,{slots:f}){const{proxy:{$q:u}}=G(),r=ge(t),o=h(()=>{const g=(u.lang.rtl===!0?-1:1)*t.angle;return{transform:t.reverse!==(u.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-g}deg)`:`rotate3d(0, 0, 1, ${g-90}deg)`}}),m=h(()=>t.instantFeedback!==!0&&t.indeterminate!==!0?{transition:`stroke-dashoffset ${t.animationSpeed}ms ease 0s, stroke ${t.animationSpeed}ms ease`}:""),F=h(()=>de/(1-t.thickness/2)),w=h(()=>`${F.value/2} ${F.value/2} ${F.value} ${F.value}`),U=h(()=>Ce(t.value,t.min,t.max)),R=h(()=>t.max-t.min),x=h(()=>t.thickness/2*F.value),E=h(()=>{const g=(t.max-U.value)/R.value,e=t.rounded===!0&&U.value<t.max&&g<.25?x.value/2*(1-g/.25):0;return ce*g+e});function C({thickness:g,offset:e,color:p,cls:k,rounded:d}){return s("circle",{class:"q-circular-progress__"+k+(p!==void 0?` text-${p}`:""),style:m.value,fill:"transparent",stroke:"currentColor","stroke-width":g,"stroke-dasharray":Ee,"stroke-dashoffset":e,"stroke-linecap":d,cx:F.value,cy:F.value,r:Y})}return()=>{const g=[];t.centerColor!==void 0&&t.centerColor!=="transparent"&&g.push(s("circle",{class:`q-circular-progress__center text-${t.centerColor}`,fill:"currentColor",r:Y-x.value/2,cx:F.value,cy:F.value})),t.trackColor!==void 0&&t.trackColor!=="transparent"&&g.push(C({cls:"track",thickness:x.value,offset:0,color:t.trackColor})),g.push(C({cls:"circle",thickness:x.value,offset:E.value,color:t.color,rounded:t.rounded===!0?"round":void 0}));const e=[s("svg",{class:"q-circular-progress__svg",style:o.value,viewBox:w.value,"aria-hidden":"true"},g)];return t.showValue===!0&&e.push(s("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:t.fontSize}},f.default!==void 0?f.default():[s("div",U.value)])),s("div",{class:`q-circular-progress q-circular-progress--${t.indeterminate===!0?"in":""}determinate`,style:r.value,role:"progressbar","aria-valuemin":t.min,"aria-valuemax":t.max,"aria-valuenow":t.indeterminate===!0?void 0:U.value},_e(f.internal,e))}}});function Q(t,f,u,r){const o=[];return t.forEach(m=>{r(m)===!0?o.push(m):f.push({failedPropValidation:u,file:m})}),o}function H(t){t&&t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),se(t)}const Le={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},Ne=["rejected"];function $e({editable:t,dnd:f,getFileInput:u,addFilesToQueue:r}){const{props:o,emit:m,proxy:F}=G(),w=z(null),U=h(()=>o.accept!==void 0?o.accept.split(",").map(l=>(l=l.trim(),l==="*"?"*/":(l.endsWith("/*")&&(l=l.slice(0,l.length-1)),l.toUpperCase()))):null),R=h(()=>parseInt(o.maxFiles,10)),x=h(()=>parseInt(o.maxTotalSize,10));function E(l){if(t.value)if(l!==Object(l)&&(l={target:null}),l.target!==null&&l.target.matches('input[type="file"]')===!0)l.clientX===0&&l.clientY===0&&ie(l);else{const S=u();S&&S!==l.target&&S.click(l)}}function C(l){t.value&&l&&r(null,l)}function g(l,S,$,D){let i=Array.from(S||l.target.files);const _=[],B=()=>{_.length!==0&&m("rejected",_)};if(o.accept!==void 0&&U.value.indexOf("*/")===-1&&(i=Q(i,_,"accept",c=>U.value.some(b=>c.type.toUpperCase().startsWith(b)||c.name.toUpperCase().endsWith(b))),i.length===0))return B();if(o.maxFileSize!==void 0){const c=parseInt(o.maxFileSize,10);if(i=Q(i,_,"max-file-size",b=>b.size<=c),i.length===0)return B()}if(o.multiple!==!0&&i.length!==0&&(i=[i[0]]),i.forEach(c=>{c.__key=c.webkitRelativePath+c.lastModified+c.name+c.size}),D===!0){const c=$.map(b=>b.__key);i=Q(i,_,"duplicate",b=>c.includes(b.__key)===!1)}if(i.length===0)return B();if(o.maxTotalSize!==void 0){let c=D===!0?$.reduce((b,j)=>b+j.size,0):0;if(i=Q(i,_,"max-total-size",b=>(c+=b.size,c<=x.value)),i.length===0)return B()}if(typeof o.filter=="function"){const c=o.filter(i);i=Q(i,_,"filter",b=>c.includes(b))}if(o.maxFiles!==void 0){let c=D===!0?$.length:0;if(i=Q(i,_,"max-files",()=>(c++,c<=R.value)),i.length===0)return B()}if(B(),i.length!==0)return i}function e(l){H(l),f.value!==!0&&(f.value=!0)}function p(l){se(l),(l.relatedTarget!==null||he.is.safari!==!0?l.relatedTarget!==w.value:document.elementsFromPoint(l.clientX,l.clientY).includes(w.value)===!1)===!0&&(f.value=!1)}function k(l){H(l);const S=l.dataTransfer.files;S.length!==0&&r(null,S),f.value=!1}function d(l){if(f.value===!0)return s("div",{ref:w,class:`q-${l}__dnd absolute-full`,onDragenter:H,onDragover:H,onDragleave:p,onDrop:k})}return Object.assign(F,{pickFiles:E,addFiles:C}),{pickFiles:E,addFiles:C,onDragover:e,onDragleave:p,processFiles:g,getDndNode:d,maxFilesNumber:R,maxTotalSizeNumber:x}}function oe(t){return(t*100).toFixed(2)+"%"}const De={...Be,...Le,label:String,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,noThumbnails:Boolean,thumbnailFit:{type:String,default:"cover"},autoUpload:Boolean,hideUploadBtn:Boolean,disable:Boolean,readonly:Boolean},ve=[...Ne,"start","finish","added","removed"];function Oe(t,f){const u=G(),{props:r,slots:o,emit:m,proxy:F}=u,{$q:w}=F,U=Re(r,w);function R(a,v,y){if(a.__status=v,v==="idle"){a.__uploaded=0,a.__progress=0,a.__sizeLabel=ue(a.size),a.__progressLabel="0.00%";return}if(v==="failed"){F.$forceUpdate();return}a.__uploaded=v==="uploaded"?a.size:y,a.__progress=v==="uploaded"?1:Math.min(.9999,a.__uploaded/a.size),a.__progressLabel=oe(a.__progress),F.$forceUpdate()}const x=h(()=>r.disable!==!0&&r.readonly!==!0),E=z(!1),C=z(null),g=z(null),e={files:z([]),queuedFiles:z([]),uploadedFiles:z([]),uploadedSize:z(0),updateFileStatus:R,isAlive:()=>be(u)===!1},{pickFiles:p,addFiles:k,onDragover:d,onDragleave:l,processFiles:S,getDndNode:$,maxFilesNumber:D,maxTotalSizeNumber:i}=$e({editable:x,dnd:E,getFileInput:Z,addFilesToQueue:V});Object.assign(e,t({props:r,slots:o,emit:m,helpers:e,exposeApi:a=>{Object.assign(e,a)}})),e.isBusy===void 0&&(e.isBusy=z(!1));const _=z(0),B=h(()=>_.value===0?0:e.uploadedSize.value/_.value),c=h(()=>oe(B.value)),b=h(()=>ue(_.value)),j=h(()=>x.value===!0&&e.isUploading.value!==!0&&(r.multiple===!0||e.queuedFiles.value.length===0)&&(r.maxFiles===void 0||e.files.value.length<D.value)&&(r.maxTotalSize===void 0||_.value<i.value)),n=h(()=>x.value===!0&&e.isBusy.value!==!0&&e.isUploading.value!==!0&&e.queuedFiles.value.length!==0);Fe(ye,te);const O=h(()=>"q-uploader column no-wrap"+(U.value===!0?" q-uploader--dark q-dark":"")+(r.bordered===!0?" q-uploader--bordered":"")+(r.square===!0?" q-uploader--square no-border-radius":"")+(r.flat===!0?" q-uploader--flat no-shadow":"")+(r.disable===!0?" disabled q-uploader--disable":"")+(E.value===!0?" q-uploader--dnd":"")),T=h(()=>"q-uploader__header"+(r.color!==void 0?` bg-${r.color}`:"")+(r.textColor!==void 0?` text-${r.textColor}`:""));Se(e.isUploading,(a,v)=>{v===!1&&a===!0?m("start"):v===!0&&a===!1&&m("finish")});function I(){r.disable===!1&&(e.abort(),e.uploadedSize.value=0,_.value=0,K(),e.files.value=[],e.queuedFiles.value=[],e.uploadedFiles.value=[])}function P(){r.disable===!1&&J(["uploaded"],()=>{e.uploadedFiles.value=[]})}function W(){J(["idle","failed"],({size:a})=>{_.value-=a,e.queuedFiles.value=[]})}function J(a,v){if(r.disable===!0)return;const y={files:[],size:0},L=e.files.value.filter(q=>a.indexOf(q.__status)===-1?!0:(y.size+=q.size,y.files.push(q),q.__img!==void 0&&window.URL.revokeObjectURL(q.__img.src),!1));y.files.length!==0&&(e.files.value=L,v(y),m("removed",y.files))}function X(a){r.disable||(a.__status==="uploaded"?e.uploadedFiles.value=e.uploadedFiles.value.filter(v=>v.__key!==a.__key):a.__status==="uploading"?a.__abort():_.value-=a.size,e.files.value=e.files.value.filter(v=>v.__key!==a.__key?!0:(v.__img!==void 0&&window.URL.revokeObjectURL(v.__img.src),!1)),e.queuedFiles.value=e.queuedFiles.value.filter(v=>v.__key!==a.__key),m("removed",[a]))}function K(){e.files.value.forEach(a=>{a.__img!==void 0&&window.URL.revokeObjectURL(a.__img.src)})}function Z(){return g.value||C.value.getElementsByClassName("q-uploader__input")[0]}function V(a,v){const y=S(a,v,e.files.value,!0),L=Z();L!=null&&(L.value=""),y!==void 0&&(y.forEach(q=>{if(e.updateFileStatus(q,"idle"),_.value+=q.size,r.noThumbnails!==!0&&q.type.toUpperCase().startsWith("IMAGE")){const ae=new Image;ae.src=window.URL.createObjectURL(q),q.__img=ae}}),e.files.value=e.files.value.concat(y),e.queuedFiles.value=e.queuedFiles.value.concat(y),m("added",y),r.autoUpload===!0&&e.upload())}function ee(){n.value===!0&&e.upload()}function M(a,v,y){if(a===!0){const L={type:"a",key:v,icon:w.iconSet.uploader[v],flat:!0,dense:!0};let q;return v==="add"?(L.onClick=p,q=te):L.onClick=y,s(re,L,q)}}function te(){return s("input",{ref:g,class:"q-uploader__input overflow-hidden absolute-full",tabindex:-1,type:"file",title:"",accept:r.accept,multiple:r.multiple===!0?"multiple":void 0,capture:r.capture,onMousedown:ie,onClick:p,onChange:V})}function fe(){return o.header!==void 0?o.header(A):[s("div",{class:"q-uploader__header-content column"},[s("div",{class:"flex flex-center no-wrap q-gutter-xs"},[M(e.queuedFiles.value.length!==0,"removeQueue",W),M(e.uploadedFiles.value.length!==0,"removeUploaded",P),e.isUploading.value===!0?s(le,{class:"q-uploader__spinner"}):null,s("div",{class:"col column justify-center"},[r.label!==void 0?s("div",{class:"q-uploader__title"},[r.label]):null,s("div",{class:"q-uploader__subtitle"},[b.value+" / "+c.value])]),M(j.value,"add"),M(r.hideUploadBtn===!1&&n.value===!0,"upload",e.upload),M(e.isUploading.value,"clear",e.abort)])])]}function pe(){return o.list!==void 0?o.list(A):e.files.value.map(a=>s("div",{key:a.__key,class:"q-uploader__file relative-position"+(r.noThumbnails!==!0&&a.__img!==void 0?" q-uploader__file--img":"")+(a.__status==="failed"?" q-uploader__file--failed":a.__status==="uploaded"?" q-uploader__file--uploaded":""),style:r.noThumbnails!==!0&&a.__img!==void 0?{backgroundImage:'url("'+a.__img.src+'")',backgroundSize:r.thumbnailFit}:null},[s("div",{class:"q-uploader__file-header row flex-center no-wrap"},[a.__status==="failed"?s(we,{class:"q-uploader__file-status",name:w.iconSet.type.negative,color:"negative"}):null,s("div",{class:"q-uploader__file-header-content col"},[s("div",{class:"q-uploader__title"},[a.name]),s("div",{class:"q-uploader__subtitle row items-center no-wrap"},[a.__sizeLabel+" / "+a.__progressLabel])]),a.__status==="uploading"?s(je,{value:a.__progress,min:0,max:1,indeterminate:a.__progress===0}):s(re,{round:!0,dense:!0,flat:!0,icon:w.iconSet.uploader[a.__status==="uploaded"?"done":"clear"],onClick:()=>{X(a)}})])]))}qe(()=>{e.isUploading.value===!0&&e.abort(),e.files.value.length!==0&&K()});const A={};for(const a in e)xe(e[a])===!0?ke(A,a,()=>e[a].value):A[a]=e[a];return Object.assign(A,{upload:ee,reset:I,removeUploadedFiles:P,removeQueuedFiles:W,removeFile:X,pickFiles:p,addFiles:k}),ze(A,{canAddFiles:()=>j.value,canUpload:()=>n.value,uploadSizeLabel:()=>b.value,uploadProgressLabel:()=>c.value}),f({...e,upload:ee,reset:I,removeUploadedFiles:P,removeQueuedFiles:W,removeFile:X,pickFiles:p,addFiles:k,canAddFiles:j,canUpload:n,uploadSizeLabel:b,uploadProgressLabel:c}),()=>{const a=[s("div",{class:T.value},fe()),s("div",{class:"q-uploader__list scroll"},pe()),$("uploader")];e.isBusy.value===!0&&a.push(s("div",{class:"q-uploader__overlay absolute-full flex flex-center"},[s(le)]));const v={ref:C,class:O.value};return j.value===!0&&Object.assign(v,{onDragover:d,onDragleave:l}),s("div",v,a)}}const Te=()=>!0;function Ie(t){const f={};return t.forEach(u=>{f[u]=Te}),f}const Ae=Ie(ve);var Qe=({name:t,props:f,emits:u,injectPlugin:r})=>ne({name:t,props:{...De,...f},emits:Ue(u)===!0?{...Ae,...u}:[...ve,...u],setup(o,{expose:m}){return Oe(r,m)}});function N(t){return typeof t=="function"?t:()=>t}const Me="QUploader",We={url:[Function,String],method:{type:[Function,String],default:"POST"},fieldName:{type:[Function,String],default:()=>t=>t.name},headers:[Function,Array],formFields:[Function,Array],withCredentials:[Function,Boolean],sendRaw:[Function,Boolean],batch:[Function,Boolean],factory:Function},He=["factoryFailed","uploaded","failed","uploading"];function Xe({props:t,emit:f,helpers:u}){const r=z([]),o=z([]),m=z(0),F=h(()=>({url:N(t.url),method:N(t.method),headers:N(t.headers),formFields:N(t.formFields),fieldName:N(t.fieldName),withCredentials:N(t.withCredentials),sendRaw:N(t.sendRaw),batch:N(t.batch)})),w=h(()=>m.value>0),U=h(()=>o.value.length!==0);let R;function x(){r.value.forEach(e=>{e.abort()}),o.value.length!==0&&(R=!0)}function E(){const e=u.queuedFiles.value.slice(0);u.queuedFiles.value=[],F.value.batch(e)?C(e):e.forEach(p=>{C([p])})}function C(e){if(m.value++,typeof t.factory!="function"){g(e,{});return}const p=t.factory(e);if(!p)f("factoryFailed",new Error("QUploader: factory() does not return properly"),e),m.value--;else if(typeof p.catch=="function"&&typeof p.then=="function"){o.value.push(p);const k=d=>{u.isAlive()===!0&&(o.value=o.value.filter(l=>l!==p),o.value.length===0&&(R=!1),u.queuedFiles.value=u.queuedFiles.value.concat(e),e.forEach(l=>{u.updateFileStatus(l,"failed")}),f("factoryFailed",d,e),m.value--)};p.then(d=>{R===!0?k(new Error("Aborted")):u.isAlive()===!0&&(o.value=o.value.filter(l=>l!==p),g(e,d))}).catch(k)}else g(e,p||{})}function g(e,p){const k=new FormData,d=new XMLHttpRequest,l=(n,O)=>p[n]!==void 0?N(p[n])(O):F.value[n](O),S=l("url",e);if(!S){console.error("q-uploader: invalid or no URL specified"),m.value--;return}const $=l("formFields",e);$!==void 0&&$.forEach(n=>{k.append(n.name,n.value)});let D=0,i=0,_=0,B=0,c;d.upload.addEventListener("progress",n=>{if(c===!0)return;const O=Math.min(B,n.loaded);u.uploadedSize.value+=O-_,_=O;let T=_-i;for(let I=D;T>0&&I<e.length;I++){const P=e[I];if(T>P.size)T-=P.size,D++,i+=P.size,u.updateFileStatus(P,"uploading",P.size);else{u.updateFileStatus(P,"uploading",T);return}}},!1),d.onreadystatechange=()=>{d.readyState<4||(d.status&&d.status<400?(u.uploadedFiles.value=u.uploadedFiles.value.concat(e),e.forEach(n=>{u.updateFileStatus(n,"uploaded")}),f("uploaded",{files:e,xhr:d})):(c=!0,u.uploadedSize.value-=_,u.queuedFiles.value=u.queuedFiles.value.concat(e),e.forEach(n=>{u.updateFileStatus(n,"failed")}),f("failed",{files:e,xhr:d})),m.value--,r.value=r.value.filter(n=>n!==d))},d.open(l("method",e),S),l("withCredentials",e)===!0&&(d.withCredentials=!0);const b=l("headers",e);b!==void 0&&b.forEach(n=>{d.setRequestHeader(n.name,n.value)});const j=l("sendRaw",e);e.forEach(n=>{u.updateFileStatus(n,"uploading",0),j!==!0&&k.append(l("fieldName",n),n,n.name),n.xhr=d,n.__abort=()=>{d.abort()},B+=n.size}),f("uploading",{files:e,xhr:d}),r.value.push(d),j===!0?d.send(new Blob(e)):d.send(k)}return{isUploading:w,isBusy:U,abort:x,upload:E}}var Ye={name:Me,props:We,emits:He,injectPlugin:Xe},Ze=Qe(Ye);export{Ze as Q};
