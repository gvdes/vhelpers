import{j as o,c as d,k as n,l,m as i}from"./index.c9a25daf.js";import{c as u,d as c}from"./use-quasar.c1b12a28.js";var p=o({name:"QList",props:{...u,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:a}){const t=i(),s=c(e,t.proxy.$q),r=d(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(s.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>n(e.tag,{class:r.value},l(a.default))}});export{p as Q};
