import{a as e}from"./axios.76bdd693.js";var n={index(t){return e.get(`/transfer/getTransfers/${t}`).then(r=>r.data).catch(r=>({fail:r}))},getDate(t){return e.post("/transfer/getTransfersDate",t).then(r=>r.data).catch(r=>({fail:r}))},addTransfer(t){return e.post("/transfer/addTransfer",t).then(r=>r.data).catch(r=>({fail:r}))},getTransfer(t){return e.get(`/transfer/getTransfer/${t}`).then(r=>r.data).catch(r=>({fail:r}))},addProduct(t){return e.post("/transfer/addProduct",t).then(r=>r.data).catch(r=>({fail:r}))},addProductMasive(t){return e.post("/transfer/addProductMasive",t).then(r=>r.data).catch(r=>({fail:r}))},editProduct(t){return e.post("/transfer/editProduct",t).then(r=>r.data).catch(r=>({fail:r}))},removeProduct(t){return e.post("/transfer/removeProduct",t).then(r=>r.data).catch(r=>({fail:r}))},endTransfer(t){return e.post("/transfer/endTransfer",t).then(r=>r.data).catch(r=>({fail:r}))},transferPreventa(t){return e.post("/transfer/transferPreventa",t).then(r=>r.data).catch(r=>({fail:r}))}};export{n as t};
