import { assist } from "src/boot/axios";

export default {
  getOrder(data, uid) {
    return assist.get(`/preorders/getOrder/${data}`, { params: uid }).then(done => done.data).catch(fail => { return { fail } });
  },
  getRules() {
    return assist.get(`/preorders/getRules`).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderVerify(data, uid) {
    return assist.get(`/preorders/getOrderVerify/${data}`, { params: uid }).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderAdd(data, oid) {
    return assist.get(`/preorders/getOrderAdd/${data}`, { params: oid }).then(done => done.data).catch(fail => { return { fail } });
  },
  getSettings(sid) {
    return assist.get(`/preorders/getSettings/${sid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrders(data) {
    return assist.post(`/preorders/getOrders`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  editProduct(data) {
    return assist.post(`/preorders/editProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addProduct(data) {
    return assist.post(`/preorders/addProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  deleteProduct(data) {
    return assist.post(`/preorders/deleteProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateProductPrices(data) {
    return assist.post(`/preorders/updateProductPrices`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getClient(data) {
    return assist.post(`/preorders/getClient`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeClientOrder(data) {
    return assist.post(`/preorders/changeClientOrder`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextState(data) {
    return assist.post(`/preorders/nextState`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextStateFinish(data) {
    return assist.post(`/preorders/nextStateFinish`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextStepCheck(data) {
    return assist.post(`/preorders/nextStepCheck`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderCash(data) {
    return assist.post(`/preorders/getOrderCash`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  create(data) {
    return assist.post(`/preorders/create`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  orderCatalog(data) {
    return assist.post(`/preorders/orderCatalog`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeStatusCash(data) {
    return assist.post(`/preorders/changeStatusCash`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeConfig(data) {
    return assist.post(`/preorders/changeConfig`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderPrv(data) {
    return assist.post(`/preorders/getOrderPrv`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextStepPrv(data) {
    return assist.post(`/preorders/nextStepPrv`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  reimpresionClientTicket(data) {
    return assist.post(`/preorders/reimpresionClientTicket`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  reimpresion(data) {
    return assist.post(`/preorders/reimpresion`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrdersDownload(data) {
    return assist.post(`/preorders/getOrdersDownload`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addMassiveProducts(data) {
    return assist.post(`/preorders/addMassiveProducts`, data).then(done => done.data).catch(fail => { return { fail } });
  },
}
