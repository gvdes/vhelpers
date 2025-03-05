import{i as F,r as P,z as A,A as q,B,v as I,j as R,k as V,l as j,C as D,D as S,p as Q,E as k}from"./index.799ea64d.js";import{b as O}from"./use-quasar.efa320bd.js";var M=F({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(a,{slots:C,emit:f}){const E=j(),s=P(null);let u=0;const i=[];function d(e){const r=typeof e=="boolean"?e:a.noErrorFocus!==!0,l=++u,x=(t,o)=>{f(`validation${t===!0?"Success":"Error"}`,o)},h=t=>{const o=t.validate();return typeof o.then=="function"?o.then(n=>({valid:n,comp:t}),n=>({valid:!1,comp:t,err:n})):Promise.resolve({valid:o,comp:t})};return(a.greedy===!0?Promise.all(i.map(h)).then(t=>t.filter(o=>o.valid!==!0)):i.reduce((t,o)=>t.then(()=>h(o).then(n=>{if(n.valid===!1)return Promise.reject(n)})),Promise.resolve()).catch(t=>[t])).then(t=>{if(t===void 0||t.length===0)return l===u&&x(!0),!0;if(l===u){const{comp:o,err:n}=t[0];if(n!==void 0&&console.error(n),x(!1,o),r===!0){const p=t.find(({comp:g})=>typeof g.focus=="function"&&D(g.$)===!1);p!==void 0&&p.comp.focus()}}return!1})}function v(){u++,i.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function m(e){e!==void 0&&S(e);const r=u+1;d().then(l=>{r===u&&l===!0&&(a.onSubmit!==void 0?f("submit",e):e!==void 0&&e.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function b(e){e!==void 0&&S(e),f("reset"),Q(()=>{v(),a.autofocus===!0&&a.noResetFocus!==!0&&c()})}function c(){O(()=>{if(s.value===null)return;const e=s.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||s.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||s.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(s.value.querySelectorAll("[tabindex]"),r=>r.tabIndex!==-1);e!=null&&e.focus({preventScroll:!0})})}A(k,{bindComponent(e){i.push(e)},unbindComponent(e){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}});let y=!1;return q(()=>{y=!0}),B(()=>{y===!0&&a.autofocus===!0&&c()}),I(()=>{a.autofocus===!0&&c()}),Object.assign(E.proxy,{validate:d,resetValidation:v,submit:m,reset:b,focus:c,getValidationComponents:()=>i}),()=>R("form",{class:"q-form",ref:s,onSubmit:m,onReset:b},V(C.default))}});export{M as Q};
