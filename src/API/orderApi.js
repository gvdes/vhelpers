import { assistOrd } from "src/boot/axios";

export default {
  getOrder(data, uid) {
    return assistOrd.get(`/preorders/getOrder/${data}`, { params: uid }).then(done => done.data).catch(fail => { return { fail } });
  },
  getRules() {
    return assistOrd.get(`/preorders/getRules`).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderVerify(data, uid) {
    return assistOrd.get(`/preorders/getOrderVerify/${data}`, { params: uid }).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderAdd(data, oid) {
    return assistOrd.get(`/preorders/getOrderAdd/${data}`, { params: oid }).then(done => done.data).catch(fail => { return { fail } });
  },
  getSettings(sid) {
    return assistOrd.get(`/preorders/getSettings/${sid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrders(data) {
    return assistOrd.post(`/preorders/getOrders`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  editProduct(data) {
    return assistOrd.post(`/preorders/editProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addProduct(data) {
    return assistOrd.post(`/preorders/addProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  deleteProduct(data) {
    return assistOrd.post(`/preorders/deleteProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateProductPrices(data) {
    return assistOrd.post(`/preorders/updateProductPrices`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getClient(data) {
    return assistOrd.post(`/preorders/getClient`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeClientOrder(data) {
    return assistOrd.post(`/preorders/changeClientOrder`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextState(data) {
    return assistOrd.post(`/preorders/nextState`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextStateFinish(data) {
    return assistOrd.post(`/preorders/nextStateFinish`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextStepCheck(data) {
    return assistOrd.post(`/preorders/nextStepCheck`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderCash(data) {
    return assistOrd.post(`/preorders/getOrderCash`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  create(data) {
    return assistOrd.post(`/preorders/create`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  orderCatalog(data) {
    return assistOrd.post(`/preorders/orderCatalog`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeStatusCash(data) {
    return assistOrd.post(`/preorders/changeStatusCash`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeConfig(data) {
    return assistOrd.post(`/preorders/changeConfig`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderPrv(data) {
    return assistOrd.post(`/preorders/getOrderPrv`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextStepPrv(data) {
    return assistOrd.post(`/preorders/nextStepPrv`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  reimpresionClientTicket(data) {
    return assistOrd.post(`/preorders/reimpresionClientTicket`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  reimpresion(data) {
    return assistOrd.post(`/preorders/reimpresion`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrdersDownload(data) {
    return assistOrd.post(`/preorders/getOrdersDownload`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addMassiveProducts(data) {
    return assistOrd.post(`/preorders/addMassiveProducts`, data).then(done => done.data).catch(fail => { return { fail } });
  },
}
