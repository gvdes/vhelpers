import{j as E,r as P,A,B as q,x as B,k as I,l as R,m as V,C as j,D as S,s as D,E as Q,F as k}from"./index.083505a8.js";import{b as O}from"./use-quasar.5a3b08ce.js";var $=E({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(a,{slots:F,emit:f}){const C=V(),i=P(null);let u=0;const s=[];function d(e){const r=typeof e=="boolean"?e:a.noErrorFocus!==!0,l=++u,x=(t,o)=>{f("validation"+(t===!0?"Success":"Error"),o)},h=t=>{const o=t.validate();return typeof o.then=="function"?o.then(n=>({valid:n,comp:t}),n=>({valid:!1,comp:t,err:n})):Promise.resolve({valid:o,comp:t})};return(a.greedy===!0?Promise.all(s.map(h)).then(t=>t.filter(o=>o.valid!==!0)):s.reduce((t,o)=>t.then(()=>h(o).then(n=>{if(n.valid===!1)return Promise.reject(n)})),Promise.resolve()).catch(t=>[t])).then(t=>{if(t===void 0||t.length===0)return l===u&&x(!0),!0;if(l===u){const{comp:o,err:n}=t[0];if(n!==void 0&&console.error(n),x(!1,o),r===!0){const g=t.find(({comp:p})=>typeof p.focus=="function"&&j(p.$)===!1);g!==void 0&&g.comp.focus()}}return!1})}function v(){u++,s.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function m(e){e!==void 0&&S(e);const r=u+1;d().then(l=>{r===u&&l===!0&&(a.onSubmit!==void 0?f("submit",e):e!==void 0&&e.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function b(e){e!==void 0&&S(e),f("reset"),D(()=>{v(),a.autofocus===!0&&a.noResetFocus!==!0&&c()})}function c(){O(()=>{if(i.value===null)return;const e=i.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||i.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||i.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(i.value.querySelectorAll("[tabindex]"),r=>r.tabIndex>-1);e!=null&&e.focus({preventScroll:!0})})}Q(k,{bindComponent(e){s.push(e)},unbindComponent(e){const r=s.indexOf(e);r>-1&&s.splice(r,1)}});let y=!1;return A(()=>{y=!0}),q(()=>{y===!0&&a.autofocus===!0&&c()}),B(()=>{a.autofocus===!0&&c()}),Object.assign(C.proxy,{validate:d,resetValidation:v,submit:m,reset:b,focus:c,getValidationComponents:()=>s}),()=>I("form",{class:"q-form",ref:i,onSubmit:m,onReset:b},R(F.default))}});export{$ as Q};
