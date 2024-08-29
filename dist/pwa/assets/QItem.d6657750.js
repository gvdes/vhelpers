import{j as v,c as a,k as r,l as q,ac as w,ad as I,r as f,ab as E,O as Q,a7 as S,m as K}from"./index.ede7f7c0.js";import{u as R,e as j}from"./QLayout.847b8aa1.js";var D=v({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:n}){const l=a(()=>parseInt(e.lines,10)),u=a(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(l.value===1?" ellipsis":"")),c=a(()=>e.lines!==void 0&&l.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":l.value}:null);return()=>r("div",{style:c.value,class:u.value},q(n.default))}}),N=v({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:n}){const l=a(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>r("div",{class:l.value},q(n.default))}}),O=v({name:"QItem",props:{...R,...w,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:n,emit:l}){const{proxy:{$q:u}}=K(),c=j(e,u),{hasLink:m,linkAttrs:k,linkClass:_,linkTag:h,navigateOnClick:y}=I(),s=f(null),o=f(null),d=a(()=>e.clickable===!0||m.value===!0||e.tag==="label"),i=a(()=>e.disable!==!0&&d.value===!0),g=a(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(c.value===!0?" q-item--dark":"")+(m.value===!0&&e.active===null?_.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(i.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),B=a(()=>{if(e.insetLevel===void 0)return null;const t=u.lang.rtl===!0?"Right":"Left";return{["padding"+t]:16+e.insetLevel*56+"px"}});function x(t){i.value===!0&&(o.value!==null&&(t.qKeyEvent!==!0&&document.activeElement===s.value?o.value.focus():document.activeElement===o.value&&s.value.focus()),y(t))}function C(t){if(i.value===!0&&E(t,13)===!0){Q(t),t.qKeyEvent=!0;const b=new MouseEvent("click",t);b.qKeyEvent=!0,s.value.dispatchEvent(b)}l("keyup",t)}function L(){const t=S(n.default,[]);return i.value===!0&&t.unshift(r("div",{class:"q-focus-helper",tabindex:-1,ref:o})),t}return()=>{const t={ref:s,class:g.value,style:B.value,role:"listitem",onClick:x,onKeyup:C};return i.value===!0?(t.tabindex=e.tabindex||"0",Object.assign(t,k.value)):d.value===!0&&(t["aria-disabled"]="true"),r(h.value,t,L())}}});export{O as Q,N as a,D as b};
