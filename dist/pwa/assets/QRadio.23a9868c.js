import{k as t,j as w,a8 as j,a9 as B,r as R,c as n,Y as z,U as D,l as P,m as Q,aJ as f,D as m}from"./index.083505a8.js";import{c as T,d as V}from"./use-quasar.5a3b08ce.js";import{o as $,c as F}from"./QCheckbox.b710db67.js";import{a as M,h as A}from"./use-key-composition.22915d08.js";const K=t("svg",{key:"svg",class:"q-radio__bg absolute non-selectable",viewBox:"0 0 24 24"},[t("path",{d:"M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"}),t("path",{class:"q-radio__check",d:"M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"})]);var N=w({name:"QRadio",props:{...T,...j,...M,modelValue:{required:!0},val:{required:!0},label:String,leftLabel:Boolean,checkedIcon:String,uncheckedIcon:String,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},emits:["update:modelValue"],setup(e,{slots:i,emit:b}){const{proxy:u}=Q(),k=V(e,u.$q),h=B(e,$),s=R(null),{refocusTargetEl:c,refocusTarget:q}=F(e,s),o=n(()=>f(e.modelValue)===f(e.val)),g=n(()=>"q-radio cursor-pointer no-outline row inline no-wrap items-center"+(e.disable===!0?" disabled":"")+(k.value===!0?" q-radio--dark":"")+(e.dense===!0?" q-radio--dense":"")+(e.leftLabel===!0?" reverse":"")),_=n(()=>{const a=e.color!==void 0&&(e.keepColor===!0||o.value===!0)?` text-${e.color}`:"";return`q-radio__inner relative-position q-radio__inner--${o.value===!0?"truthy":"falsy"}${a}`}),d=n(()=>(o.value===!0?e.checkedIcon:e.uncheckedIcon)||null),y=n(()=>e.disable===!0?-1:e.tabindex||0),S=n(()=>{const a={type:"radio"};return e.name!==void 0&&Object.assign(a,{".checked":o.value===!0,"^checked":o.value===!0?"checked":void 0,name:e.name,value:e.val}),a}),x=A(S);function l(a){a!==void 0&&(m(a),q(a)),e.disable!==!0&&o.value!==!0&&b("update:modelValue",e.val,a)}function C(a){(a.keyCode===13||a.keyCode===32)&&m(a)}function I(a){(a.keyCode===13||a.keyCode===32)&&l(a)}return Object.assign(u,{set:l}),()=>{const a=d.value!==null?[t("div",{key:"icon",class:"q-radio__icon-container absolute-full flex flex-center no-wrap"},[t(z,{class:"q-radio__icon",name:d.value})])]:[K];e.disable!==!0&&x(a,"unshift"," q-radio__native q-ma-none q-pa-none");const r=[t("div",{class:_.value,style:h.value,"aria-hidden":"true"},a)];c.value!==null&&r.push(c.value);const v=e.label!==void 0?D(i.default,[e.label]):P(i.default);return v!==void 0&&r.push(t("div",{class:"q-radio__label q-anchor--skip"},v)),t("div",{ref:s,class:g.value,tabindex:y.value,role:"radio","aria-label":e.label,"aria-checked":o.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:l,onKeydown:C,onKeyup:I},r)}}});export{N as Q};
