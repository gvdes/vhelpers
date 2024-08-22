import{a}from"./axios.eb866e6a.js";var e={index(){return a.get("/sales/getSale").then(t=>t.data).catch(t=>({fail:t}))}};export{e as A};
