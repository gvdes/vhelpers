import{v as e}from"./axios.76bdd693.js";var o={getData(t,a){return e.post(`/compare/getProducts/${t}`,a).then(r=>r.data).catch(r=>({fail:r}))},secciones(){return e.get("/compare").then(t=>t.data).catch(t=>({fail:t}))},getProductReport(){return e.get("/compare/getProducts").then(t=>t.data).catch(t=>({fail:t}))}};export{o as d};
