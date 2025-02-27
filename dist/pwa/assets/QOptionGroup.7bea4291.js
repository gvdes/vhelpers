import{Q as f}from"./QRadio.0a02b43c.js";import{u as h,a as y,b as C,Q as x}from"./QCheckbox.08cf0c53.js";import{j as s,c as i,k as n,Y as I,m as Q}from"./index.6553c4a3.js";import{c as q,d as V}from"./use-quasar.2618ef58.js";var z=s({name:"QToggle",props:{...h,icon:String,iconColor:String},emits:y,setup(e){function l(a,t){const r=i(()=>(a.value===!0?e.checkedIcon:t.value===!0?e.indeterminateIcon:e.uncheckedIcon)||e.icon),c=i(()=>a.value===!0?e.iconColor:null);return()=>[n("div",{class:"q-toggle__track"}),n("div",{class:"q-toggle__thumb absolute flex flex-center no-wrap"},r.value!==void 0?[n(I,{name:r.value,color:c.value})]:void 0)]}return C("toggle",l)}});const m={radio:f,checkbox:x,toggle:z},B=Object.keys(m);var D=s({name:"QOptionGroup",props:{...q,modelValue:{required:!0},options:{type:Array,validator:e=>e.every(l=>"value"in l&&"label"in l)},name:String,type:{default:"radio",validator:e=>B.includes(e)},color:String,keepColor:Boolean,dense:Boolean,size:String,leftLabel:Boolean,inline:Boolean,disable:Boolean},emits:["update:modelValue"],setup(e,{emit:l,slots:a}){const{proxy:{$q:t}}=Q(),r=Array.isArray(e.modelValue);e.type==="radio"?r===!0&&console.error("q-option-group: model should not be array"):r===!1&&console.error("q-option-group: model should be array in your case");const c=V(e,t),v=i(()=>m[e.type]),b=i(()=>"q-option-group q-gutter-x-sm"+(e.inline===!0?" q-option-group--inline":"")),g=i(()=>{const o={role:"group"};return e.type==="radio"&&(o.role="radiogroup",e.disable===!0&&(o["aria-disabled"]="true")),o});function k(o){l("update:modelValue",o)}return()=>n("div",{class:b.value,...g.value},e.options.map((o,u)=>{const d=a["label-"+u]!==void 0?()=>a["label-"+u](o):a.label!==void 0?()=>a.label(o):void 0;return n("div",[n(v.value,{modelValue:e.modelValue,val:o.value,name:o.name===void 0?e.name:o.name,disable:e.disable||o.disable,label:d===void 0?o.label:null,leftLabel:o.leftLabel===void 0?e.leftLabel:o.leftLabel,color:o.color===void 0?e.color:o.color,checkedIcon:o.checkedIcon,uncheckedIcon:o.uncheckedIcon,dark:o.dark||c.value,size:o.size===void 0?e.size:o.size,dense:e.dense,keepColor:o.keepColor===void 0?e.keepColor:o.keepColor,"onUpdate:modelValue":k},d)])}))}});export{D as Q};
