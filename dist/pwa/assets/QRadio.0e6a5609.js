import{i as j,a9 as B,aa as R,r as z,c as n,j as t,Y as D,U as P,k as Q,l as T,aK as f,D as b}from"./index.ee411de5.js";import{d as V,c as $}from"./use-quasar.772555ff.js";import{o as F,c as K}from"./QCheckbox.0b33e665.js";import{a as M,h as A}from"./use-key-composition.b5343cc0.js";const L=()=>t("svg",{key:"svg",class:"q-radio__bg absolute non-selectable",viewBox:"0 0 24 24"},[t("path",{d:"M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"}),t("path",{class:"q-radio__check",d:"M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"})]);var Y=j({name:"QRadio",props:{...V,...B,...M,modelValue:{required:!0},val:{required:!0},label:String,leftLabel:Boolean,checkedIcon:String,uncheckedIcon:String,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},emits:["update:modelValue"],setup(e,{slots:i,emit:m}){const{proxy:s}=T(),k=$(e,s.$q),h=R(e,F),u=z(null),{refocusTargetEl:c,refocusTarget:g}=K(e,u),o=n(()=>f(e.modelValue)===f(e.val)),q=n(()=>"q-radio cursor-pointer no-outline row inline no-wrap items-center"+(e.disable===!0?" disabled":"")+(k.value===!0?" q-radio--dark":"")+(e.dense===!0?" q-radio--dense":"")+(e.leftLabel===!0?" reverse":"")),_=n(()=>{const a=e.color!==void 0&&(e.keepColor===!0||o.value===!0)?` text-${e.color}`:"";return`q-radio__inner relative-position q-radio__inner--${o.value===!0?"truthy":"falsy"}${a}`}),d=n(()=>(o.value===!0?e.checkedIcon:e.uncheckedIcon)||null),y=n(()=>e.disable===!0?-1:e.tabindex||0),S=n(()=>{const a={type:"radio"};return e.name!==void 0&&Object.assign(a,{".checked":o.value===!0,"^checked":o.value===!0?"checked":void 0,name:e.name,value:e.val}),a}),x=A(S);function l(a){a!==void 0&&(b(a),g(a)),e.disable!==!0&&o.value!==!0&&m("update:modelValue",e.val,a)}function C(a){(a.keyCode===13||a.keyCode===32)&&b(a)}function I(a){(a.keyCode===13||a.keyCode===32)&&l(a)}Object.assign(s,{set:l});const w=L();return()=>{const a=d.value!==null?[t("div",{key:"icon",class:"q-radio__icon-container absolute-full flex flex-center no-wrap"},[t(D,{class:"q-radio__icon",name:d.value})])]:[w];e.disable!==!0&&x(a,"unshift"," q-radio__native q-ma-none q-pa-none");const r=[t("div",{class:_.value,style:h.value,"aria-hidden":"true"},a)];c.value!==null&&r.push(c.value);const v=e.label!==void 0?P(i.default,[e.label]):Q(i.default);return v!==void 0&&r.push(t("div",{class:"q-radio__label q-anchor--skip"},v)),t("div",{ref:u,class:q.value,tabindex:y.value,role:"radio","aria-label":e.label,"aria-checked":o.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:l,onKeydown:C,onKeyup:I},r)}}});export{Y as Q};
