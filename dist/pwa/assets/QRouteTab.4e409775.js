import{j as u,ac as n,ad as i,c,n as m}from"./index.e2be179b.js";import{u as b,a as l,b as T}from"./QTabs.2a71068c.js";var R=u({name:"QRouteTab",props:{...n,...b},emits:l,setup(e,{slots:t,emit:s}){const a=i({useDisableForRouterLinkProps:!1}),{renderTab:o,$tabs:r}=T(e,t,s,{exact:c(()=>e.exact),...a});return m(()=>`${e.name} | ${e.exact} | ${(a.resolvedLink.value||{}).href}`,()=>{r.verifyRouteModel()}),()=>o(a.linkTag.value,a.linkAttrs.value)}});export{R as Q};