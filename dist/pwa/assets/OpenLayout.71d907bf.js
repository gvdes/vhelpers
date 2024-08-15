import{Q as ie}from"./position-engine.4e619d22.js";import{r as w,c as U,m as _e,Z as fe,O as ge,Y as we,k as g,_ as xe,q as Se,v as Ue,y as ke,aS as ze,M as Ve,aJ as Ce,V as de,aT as Ee,U as be,Q as le,j as Qe,aI as je,o as J,a as Be,w as F,e as s,i as I,a3 as ce,g as G,h as K,f as De}from"./index.d7b667be.js";import{Q as Re,a as Ne}from"./axios.2d191f70.js";import{_ as Le,Q as Ae}from"./UserToolbar.b109f36b.js";import{u as Me,e as Pe,Q as Oe,a as Te,b as V,c as $e}from"./QLayout.d2ced07e.js";import{h as pe,Q as Z}from"./QSelect.708e904d.js";import{Q as O}from"./QInput.45fa24c5.js";import{Q as Ie}from"./QCircularProgress.accdefb3.js";import{Q as He}from"./QForm.ba15fcc4.js";import{Q as Ye}from"./QPage.874ef403.js";import{u as We}from"./VDB.e4265b22.js";import{a as ve}from"./axios.a46fb519.js";import{u as Xe}from"./use-quasar.864a9d66.js";import"./QDialog.263dc681.js";import"./QItem.af5906a8.js";function W(d,f,a,b){const p=[];return d.forEach(q=>{b(q)===!0?p.push(q):f.push({failedPropValidation:a,file:q})}),p}function ee(d){d&&d.dataTransfer&&(d.dataTransfer.dropEffect="copy"),ge(d)}const Je={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},Ge=["rejected"];function Ke({editable:d,dnd:f,getFileInput:a,addFilesToQueue:b}){const{props:p,emit:q,proxy:C}=_e(),e=w(null),A=U(()=>p.accept!==void 0?p.accept.split(",").map(u=>(u=u.trim(),u==="*"?"*/":(u.endsWith("/*")&&(u=u.slice(0,u.length-1)),u.toUpperCase()))):null),E=U(()=>parseInt(p.maxFiles,10)),B=U(()=>parseInt(p.maxTotalSize,10));function D(u){if(d.value)if(u!==Object(u)&&(u={target:null}),u.target!==null&&u.target.matches('input[type="file"]')===!0)u.clientX===0&&u.clientY===0&&fe(u);else{const h=a();h&&h!==u.target&&h.click(u)}}function j(u){d.value&&u&&b(null,u)}function t(u,h,k,M){let i=Array.from(h||u.target.files);const x=[],Q=()=>{x.length>0&&q("rejected",x)};if(p.accept!==void 0&&A.value.indexOf("*/")===-1&&(i=W(i,x,"accept",_=>A.value.some(y=>_.type.toUpperCase().startsWith(y)||_.name.toUpperCase().endsWith(y))),i.length===0))return Q();if(p.maxFileSize!==void 0){const _=parseInt(p.maxFileSize,10);if(i=W(i,x,"max-file-size",y=>y.size<=_),i.length===0)return Q()}if(p.multiple!==!0&&i.length>0&&(i=[i[0]]),i.forEach(_=>{_.__key=_.webkitRelativePath+_.lastModified+_.name+_.size}),M===!0){const _=k.map(y=>y.__key);i=W(i,x,"duplicate",y=>_.includes(y.__key)===!1)}if(i.length===0)return Q();if(p.maxTotalSize!==void 0){let _=M===!0?k.reduce((y,P)=>y+P.size,0):0;if(i=W(i,x,"max-total-size",y=>(_+=y.size,_<=B.value)),i.length===0)return Q()}if(typeof p.filter=="function"){const _=p.filter(i);i=W(i,x,"filter",y=>_.includes(y))}if(p.maxFiles!==void 0){let _=M===!0?k.length:0;if(i=W(i,x,"max-files",()=>(_++,_<=E.value)),i.length===0)return Q()}if(Q(),i.length>0)return i}function n(u){ee(u),f.value!==!0&&(f.value=!0)}function o(u){ge(u),(u.relatedTarget!==null||we.is.safari!==!0?u.relatedTarget!==e.value:document.elementsFromPoint(u.clientX,u.clientY).includes(e.value)===!1)===!0&&(f.value=!1)}function r(u){ee(u);const h=u.dataTransfer.files;h.length>0&&b(null,h),f.value=!1}function c(u){if(f.value===!0)return g("div",{ref:e,class:`q-${u}__dnd absolute-full`,onDragenter:ee,onDragover:ee,onDragleave:o,onDrop:r})}return Object.assign(C,{pickFiles:D,addFiles:j}),{pickFiles:D,addFiles:j,onDragover:n,onDragleave:o,processFiles:t,getDndNode:c,maxFilesNumber:E,maxTotalSizeNumber:B}}function me(d){return(d*100).toFixed(2)+"%"}const Ze={...Me,...Je,label:String,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,noThumbnails:Boolean,autoUpload:Boolean,hideUploadBtn:Boolean,disable:Boolean,readonly:Boolean},he=[...Ge,"start","finish","added","removed"];function ea(d){const f=_e(),{props:a,slots:b,emit:p,proxy:q}=f,{$q:C}=q,e=Pe(a,C);function A(l,m,S){if(l.__status=m,m==="idle"){l.__uploaded=0,l.__progress=0,l.__sizeLabel=pe(l.size),l.__progressLabel="0.00%";return}if(m==="failed"){q.$forceUpdate();return}l.__uploaded=m==="uploaded"?l.size:S,l.__progress=m==="uploaded"?1:Math.min(.9999,l.__uploaded/l.size),l.__progressLabel=me(l.__progress),q.$forceUpdate()}const E=U(()=>a.disable!==!0&&a.readonly!==!0),B=w(!1),D=w(null),j=w(null),t={files:w([]),queuedFiles:w([]),uploadedFiles:w([]),uploadedSize:w(0),updateFileStatus:A,isAlive:()=>xe(f)===!1},{pickFiles:n,addFiles:o,onDragover:r,onDragleave:c,processFiles:u,getDndNode:h,maxFilesNumber:k,maxTotalSizeNumber:M}=Ke({editable:E,dnd:B,getFileInput:oe,addFilesToQueue:ne});Object.assign(t,d({props:a,slots:b,emit:p,helpers:t})),t.isBusy===void 0&&(t.isBusy=w(!1));const i=w(0),x=U(()=>i.value===0?0:t.uploadedSize.value/i.value),Q=U(()=>me(x.value)),_=U(()=>pe(i.value)),y=U(()=>E.value===!0&&t.isUploading.value!==!0&&(a.multiple===!0||t.queuedFiles.value.length===0)&&(a.maxFiles===void 0||t.files.value.length<k.value)&&(a.maxTotalSize===void 0||i.value<M.value)),P=U(()=>E.value===!0&&t.isBusy.value!==!0&&t.isUploading.value!==!0&&t.queuedFiles.value.length>0);Se(Ee,re);const v=U(()=>"q-uploader column no-wrap"+(e.value===!0?" q-uploader--dark q-dark":"")+(a.bordered===!0?" q-uploader--bordered":"")+(a.square===!0?" q-uploader--square no-border-radius":"")+(a.flat===!0?" q-uploader--flat no-shadow":"")+(a.disable===!0?" disabled q-uploader--disable":"")+(B.value===!0?" q-uploader--dnd":"")),T=U(()=>"q-uploader__header"+(a.color!==void 0?` bg-${a.color}`:"")+(a.textColor!==void 0?` text-${a.textColor}`:""));Ue(t.isUploading,(l,m)=>{m===!1&&l===!0?p("start"):m===!0&&l===!1&&p("finish")});function H(){a.disable===!1&&(t.abort(),t.uploadedSize.value=0,i.value=0,ue(),t.files.value=[],t.queuedFiles.value=[],t.uploadedFiles.value=[])}function Y(){a.disable===!1&&ae(["uploaded"],()=>{t.uploadedFiles.value=[]})}function R(){ae(["idle","failed"],({size:l})=>{i.value-=l,t.queuedFiles.value=[]})}function ae(l,m){if(a.disable===!0)return;const S={files:[],size:0},N=t.files.value.filter(z=>l.indexOf(z.__status)===-1?!0:(S.size+=z.size,S.files.push(z),z.__img!==void 0&&window.URL.revokeObjectURL(z.__img.src),!1));S.files.length>0&&(t.files.value=N,m(S),p("removed",S.files))}function te(l){a.disable||(l.__status==="uploaded"?t.uploadedFiles.value=t.uploadedFiles.value.filter(m=>m.__key!==l.__key):l.__status==="uploading"?l.__abort():i.value-=l.size,t.files.value=t.files.value.filter(m=>m.__key!==l.__key?!0:(m.__img!==void 0&&window.URL.revokeObjectURL(m.__img.src),!1)),t.queuedFiles.value=t.queuedFiles.value.filter(m=>m.__key!==l.__key),p("removed",[l]))}function ue(){t.files.value.forEach(l=>{l.__img!==void 0&&window.URL.revokeObjectURL(l.__img.src)})}function oe(){return j.value||D.value.getElementsByClassName("q-uploader__input")[0]}function ne(l,m){const S=u(l,m,t.files.value,!0),N=oe();N!=null&&(N.value=""),S!==void 0&&(S.forEach(z=>{if(t.updateFileStatus(z,"idle"),i.value+=z.size,a.noThumbnails!==!0&&z.type.toUpperCase().startsWith("IMAGE")){const se=new Image;se.src=window.URL.createObjectURL(z),z.__img=se}}),t.files.value=t.files.value.concat(S),t.queuedFiles.value=t.queuedFiles.value.concat(S),p("added",S),a.autoUpload===!0&&t.upload())}function ye(){P.value===!0&&t.upload()}function X(l,m,S){if(l===!0){const N={type:"a",key:m,icon:C.iconSet.uploader[m],flat:!0,dense:!0};let z;return m==="add"?(N.onClick=n,z=re):N.onClick=S,g(le,N,z)}}function re(){return g("input",{ref:j,class:"q-uploader__input overflow-hidden absolute-full",tabindex:-1,type:"file",title:"",accept:a.accept,multiple:a.multiple===!0?"multiple":void 0,capture:a.capture,onMousedown:fe,onClick:n,onChange:ne})}function Fe(){return b.header!==void 0?b.header($):[g("div",{class:"q-uploader__header-content column"},[g("div",{class:"flex flex-center no-wrap q-gutter-xs"},[X(t.queuedFiles.value.length>0,"removeQueue",R),X(t.uploadedFiles.value.length>0,"removeUploaded",Y),t.isUploading.value===!0?g(de,{class:"q-uploader__spinner"}):null,g("div",{class:"col column justify-center"},[a.label!==void 0?g("div",{class:"q-uploader__title"},[a.label]):null,g("div",{class:"q-uploader__subtitle"},[_.value+" / "+Q.value])]),X(y.value,"add"),X(a.hideUploadBtn===!1&&P.value===!0,"upload",t.upload),X(t.isUploading.value,"clear",t.abort)])])]}function qe(){return b.list!==void 0?b.list($):t.files.value.map(l=>g("div",{key:l.__key,class:"q-uploader__file relative-position"+(a.noThumbnails!==!0&&l.__img!==void 0?" q-uploader__file--img":"")+(l.__status==="failed"?" q-uploader__file--failed":l.__status==="uploaded"?" q-uploader__file--uploaded":""),style:a.noThumbnails!==!0&&l.__img!==void 0?{backgroundImage:'url("'+l.__img.src+'")'}:null},[g("div",{class:"q-uploader__file-header row flex-center no-wrap"},[l.__status==="failed"?g(be,{class:"q-uploader__file-status",name:C.iconSet.type.negative,color:"negative"}):null,g("div",{class:"q-uploader__file-header-content col"},[g("div",{class:"q-uploader__title"},[l.name]),g("div",{class:"q-uploader__subtitle row items-center no-wrap"},[l.__sizeLabel+" / "+l.__progressLabel])]),l.__status==="uploading"?g(Ie,{value:l.__progress,min:0,max:1,indeterminate:l.__progress===0}):g(le,{round:!0,dense:!0,flat:!0,icon:C.iconSet.uploader[l.__status==="uploaded"?"done":"clear"],onClick:()=>{te(l)}})])]))}ke(()=>{t.isUploading.value===!0&&t.abort(),t.files.value.length>0&&ue()});const $={};for(const l in t)ze(t[l])===!0?Ve($,l,()=>t[l].value):$[l]=t[l];return Object.assign($,{upload:ye,reset:H,removeUploadedFiles:Y,removeQueuedFiles:R,removeFile:te,pickFiles:n,addFiles:o}),Ce($,{canAddFiles:()=>y.value,canUpload:()=>P.value,uploadSizeLabel:()=>_.value,uploadProgressLabel:()=>Q.value}),Object.assign(q,$),()=>{const l=[g("div",{class:T.value},Fe()),g("div",{class:"q-uploader__list scroll"},qe()),h("uploader")];t.isBusy.value===!0&&l.push(g("div",{class:"q-uploader__overlay absolute-full flex flex-center"},[g(de)]));const m={ref:D,class:v.value};return y.value===!0&&Object.assign(m,{onDragover:r,onDragleave:c}),g("div",m,l)}}const aa=()=>!0;function la(d){const f={};return d.forEach(a=>{f[a]=aa}),f}const ta=la(he);var ua=({name:d,props:f,emits:a,injectPlugin:b})=>Qe({name:d,props:{...Ze,...f},emits:je(a)===!0?{...ta,...a}:[...he,...a],setup(){return ea(b)}});function L(d){return typeof d=="function"?d:()=>d}const oa={url:[Function,String],method:{type:[Function,String],default:"POST"},fieldName:{type:[Function,String],default:()=>d=>d.name},headers:[Function,Array],formFields:[Function,Array],withCredentials:[Function,Boolean],sendRaw:[Function,Boolean],batch:[Function,Boolean],factory:Function},na=["factoryFailed","uploaded","failed","uploading"];function ra({props:d,emit:f,helpers:a}){const b=w([]),p=w([]),q=w(0),C=U(()=>({url:L(d.url),method:L(d.method),headers:L(d.headers),formFields:L(d.formFields),fieldName:L(d.fieldName),withCredentials:L(d.withCredentials),sendRaw:L(d.sendRaw),batch:L(d.batch)})),e=U(()=>q.value>0),A=U(()=>p.value.length>0);let E;function B(){b.value.forEach(n=>{n.abort()}),p.value.length>0&&(E=!0)}function D(){const n=a.queuedFiles.value.slice(0);a.queuedFiles.value=[],C.value.batch(n)?j(n):n.forEach(o=>{j([o])})}function j(n){if(q.value++,typeof d.factory!="function"){t(n,{});return}const o=d.factory(n);if(!o)f("factoryFailed",new Error("QUploader: factory() does not return properly"),n),q.value--;else if(typeof o.catch=="function"&&typeof o.then=="function"){p.value.push(o);const r=c=>{a.isAlive()===!0&&(p.value=p.value.filter(u=>u!==o),p.value.length===0&&(E=!1),a.queuedFiles.value=a.queuedFiles.value.concat(n),n.forEach(u=>{a.updateFileStatus(u,"failed")}),f("factoryFailed",c,n),q.value--)};o.then(c=>{E===!0?r(new Error("Aborted")):a.isAlive()===!0&&(p.value=p.value.filter(u=>u!==o),t(n,c))}).catch(r)}else t(n,o||{})}function t(n,o){const r=new FormData,c=new XMLHttpRequest,u=(v,T)=>o[v]!==void 0?L(o[v])(T):C.value[v](T),h=u("url",n);if(!h){console.error("q-uploader: invalid or no URL specified"),q.value--;return}const k=u("formFields",n);k!==void 0&&k.forEach(v=>{r.append(v.name,v.value)});let M=0,i=0,x=0,Q=0,_;c.upload.addEventListener("progress",v=>{if(_===!0)return;const T=Math.min(Q,v.loaded);a.uploadedSize.value+=T-x,x=T;let H=x-i;for(let Y=M;H>0&&Y<n.length;Y++){const R=n[Y];if(H>R.size)H-=R.size,M++,i+=R.size,a.updateFileStatus(R,"uploading",R.size);else{a.updateFileStatus(R,"uploading",H);return}}},!1),c.onreadystatechange=()=>{c.readyState<4||(c.status&&c.status<400?(a.uploadedFiles.value=a.uploadedFiles.value.concat(n),n.forEach(v=>{a.updateFileStatus(v,"uploaded")}),f("uploaded",{files:n,xhr:c})):(_=!0,a.uploadedSize.value-=x,a.queuedFiles.value=a.queuedFiles.value.concat(n),n.forEach(v=>{a.updateFileStatus(v,"failed")}),f("failed",{files:n,xhr:c})),q.value--,b.value=b.value.filter(v=>v!==c))},c.open(u("method",n),h),u("withCredentials",n)===!0&&(c.withCredentials=!0);const y=u("headers",n);y!==void 0&&y.forEach(v=>{c.setRequestHeader(v.name,v.value)});const P=u("sendRaw",n);n.forEach(v=>{a.updateFileStatus(v,"uploading",0),P!==!0&&r.append(u("fieldName",v),v,v.name),v.xhr=c,v.__abort=()=>{c.abort()},Q+=v.size}),f("uploading",{files:n,xhr:c}),b.value.push(c),P===!0?c.send(new Blob(n)):c.send(r)}return{isUploading:e,isBusy:A,abort:B,upload:D}}var sa={name:"QUploader",props:oa,emits:na,injectPlugin:ra},ia=ua(sa);const da=I("span",{class:"text-h6"},"Apertura de Cajas",-1),ca={class:"flex justify-center"},pa=I("div",{class:"text-h4 text-center"},"APERTURA DE CAJA",-1),va=I("div",{class:"text-subtitle2 text-center"},"Movimientos en cajas despues de el corte",-1),ma={key:0},_a={key:1},fa={key:2},ga={key:0},ba={class:"col flex justify-center"},Ba={__name:"OpenLayout",setup(d){const f=We(),a=Xe(),b=w(null),p=[{id:1,label:"Descuadre"},{id:2,label:"Mal Devolucion"},{id:3,label:"Retirada Mal"}],q=[{id:1,label:"Eliminar"},{id:2,label:"Modificar"}],C=w({val:null,opts:null}),e=w({_store:null,cash:null,_created_by:null,_cashier:null,_type:{id:0,label:"Ninguno"},unsquare:null,mismatch_reason:null,current_cut:null,ticket:null,refund_ticket:null,refund_reason:null,withdrawal_number:null,movement_type_id:{id:0,label:"Ninguno"},reason_modify:null,withdrawal_mount:null}),A=U(()=>e.value._type.id==1&&e.value.cash&&e.value._cashier&&e.value.unsquare&&e.value.mismatch_reason&&e.value.current_cut||e.value._type.id==2&&e.value.cash&&e.value._cashier&&e.value.ticket&&e.value.refund_reason&&e.value.current_cut?!1:!(e.value._type.id==3&&e.value.cash&&e.value._cashier&&e.value.current_cut&&e.value.withdrawal_number&&e.value.movement_type_id.id!=0&&e.value.reason_modify)),E=async()=>{let n=f.session.store.id;console.log(n),ve.get(`/cashier/getStaff/${n}`).then(o=>{console.log(o.data),C.value.opts=o.data})},B=()=>{b.value.upload()},D=async()=>{let n=e.value._cashier.id,o=e.value._type.id,r=e.value.movement_type_id.id!=0?e.value.movement_type_id.id:null;e.value.movement_type_id=r,e.value._type=o,e.value._cashier=n,e.value._store=f.session.store.id,e.value._created_by=f.session.id;let c=new Date;const u=`${c.getFullYear()}_${c.getMonth()+1}_${c.getDate()}_${c.getHours()}${c.getMinutes()}${c.getSeconds()}`;let h="/corte"+u+"_"+e.value._store+"_"+e.value._created_by+".jpg";e.value.current_cut=h,B(),console.log(e.value),ve.post("/cashier/Opening",e.value).then(k=>{console.log(k.data),a.notify({type:"positive",message:k.data,position:"center"}),e.value.cash=null,e.value._cashier=null,e.value._type={id:0,label:"Ninguno"},e.value.unsquare=null,e.value.mismatch_reason=null,e.value.current_cut=null,e.value.ticket=null,e.value.refund_ticket=null,e.value.refund_reason=null,e.value.withdrawal_number=null,e.value.movement_type_id={id:0,label:"Ninguno"},e.value.reason_modify=null,e.value.withdrawal_mount=null}).catch(k=>{console.log(k.data),a.notify({type:"negative",message:k.data,position:"center"})})},j=()=>{e.value.current_cut=!0},t=n=>{console.log(n);const o=new FormData;o.append("files",n[0]);let r=new Date;const c=`${r.getFullYear()}_${r.getMonth()+1}_${r.getDate()}_${r.getHours()}${r.getMinutes()}${r.getSeconds()}`;let u="corte"+c+"_"+e.value._store+"_"+e.value._created_by;return console.log(u),o.append("__key",u+".jpg"),console.log(o),Ne.post("http://192.168.10.61:1619/Assist/public/api/cashier/AddFile",o).then(h=>{console.log(h.data),b.value.reset(),a.notify({type:"positive",message:"Imagen se subio con exito :"+h.data,position:"center"})}).catch(h=>{console.error("Error al subir archivos:",h),a.notify({type:"negative",message:"(I)Error al subir archivo:"+response.data,position:"center"})}),"http://192.168.10.61:1619/Assist/public/api/cashier/AddFile"};return E(),(n,o)=>(J(),Be(Oe,{view:"hHh Lpr fFf"},{default:F(()=>[s(Ae,{class:"transparent text-dark",bordered:""},{default:F(()=>[s(Le),s(ie),s(Re,{class:"justify-between"},{default:F(()=>[I("div",null,[ce("Helpers "),s(be,{name:"navigate_next",color:"primary"}),ce(),da])]),_:1})]),_:1}),s(ie,{spaced:"",inset:"",vertical:"",dark:""}),s($e,null,{default:F(()=>[s(Ye,null,{default:F(()=>[I("div",ca,[s(He,{class:"q-gutter-md",onSubmit:D},{default:F(()=>[s(Te,{class:"my-card",square:"",bordere:""},{default:F(()=>[s(V,null,{default:F(()=>[pa,va]),_:1}),s(V,null,{default:F(()=>[s(Z,{modelValue:e.value.cash,"onUpdate:modelValue":o[0]||(o[0]=r=>e.value.cash=r),options:[1,2,3,4,5,6,7,8,9],label:"Caja",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),s(V,null,{default:F(()=>[s(Z,{modelValue:e.value._cashier,"onUpdate:modelValue":o[1]||(o[1]=r=>e.value._cashier=r),options:C.value.opts,label:"Cajero","option-label":"complete_name",outlined:"",dense:""},null,8,["modelValue","options"])]),_:1}),s(V,null,{default:F(()=>[s(Z,{modelValue:e.value._type,"onUpdate:modelValue":o[2]||(o[2]=r=>e.value._type=r),options:p,label:"Motivo",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),e.value._type.label=="Descuadre"?(J(),G("div",ma,[s(V,null,{default:F(()=>[s(O,{modelValue:e.value.unsquare,"onUpdate:modelValue":o[3]||(o[3]=r=>e.value.unsquare=r),type:"Number",label:"Monto de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),s(V,null,{default:F(()=>[s(O,{modelValue:e.value.mismatch_reason,"onUpdate:modelValue":o[4]||(o[4]=r=>e.value.mismatch_reason=r),type:"text",label:"Motivo de descuadre",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):K("",!0),e.value._type.label=="Mal Devolucion"?(J(),G("div",_a,[s(V,null,{default:F(()=>[s(O,{modelValue:e.value.ticket,"onUpdate:modelValue":o[5]||(o[5]=r=>e.value.ticket=r),type:"text",label:"Cual es el numero de ticket original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),s(V,null,{default:F(()=>[s(O,{modelValue:e.value.refund_ticket,"onUpdate:modelValue":o[6]||(o[6]=r=>e.value.refund_ticket=r),type:"text",label:"Cual es el numero de devolucion original",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),s(V,null,{default:F(()=>[s(O,{modelValue:e.value.refund_reason,"onUpdate:modelValue":o[7]||(o[7]=r=>e.value.refund_reason=r),type:"text",label:"Especifica por que se creara una devolucion nueva",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):K("",!0),e.value._type.label=="Retirada Mal"?(J(),G("div",fa,[s(V,null,{default:F(()=>[s(O,{modelValue:e.value.withdrawal_number,"onUpdate:modelValue":o[8]||(o[8]=r=>e.value.withdrawal_number=r),type:"Number",label:"Numero de retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),s(V,null,{default:F(()=>[s(Z,{modelValue:e.value.movement_type_id,"onUpdate:modelValue":o[9]||(o[9]=r=>e.value.movement_type_id=r),options:q,label:"Que se la hara?",outlined:"",dense:""},null,8,["modelValue"])]),_:1}),e.value.movement_type_id.label=="Modificar"?(J(),G("div",ga,[s(V,null,{default:F(()=>[s(O,{modelValue:e.value.withdrawal_mount,"onUpdate:modelValue":o[10]||(o[10]=r=>e.value.withdrawal_mount=r),type:"Number",label:"Monto a modificar",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):K("",!0),s(V,null,{default:F(()=>[s(O,{modelValue:e.value.reason_modify,"onUpdate:modelValue":o[11]||(o[11]=r=>e.value.reason_modify=r),type:"text",label:"Especifica por que el cambio de la retirada",outlined:"",dense:""},null,8,["modelValue"])]),_:1})])):K("",!0),s(V,null,{default:F(()=>[I("div",ba,[s(ia,{"hide-upload-btn":!0,ref_key:"uploaderRef",ref:b,url:t,color:"primary",label:"Corte Actual",onAdded:j},null,512)])]),_:1})]),_:1}),I("div",null,[s(le,{label:"Enviar",type:"submit",color:"primary",class:"full-width",disable:De(A)},null,8,["disable"])])]),_:1})])]),_:1})]),_:1})]),_:1}))}};export{Ba as default};