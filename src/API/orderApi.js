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
  getOrderCash(data) {
    return assist.post(`/preorders/getOrderCash`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  create(data) {
    return assist.post(`/preorders/create`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  orderCatalog(data) {
    return assist.post(`/preorders/orderCatalog`, data).then(done => done.data).catch(fail => { return { fail } });
  },
}
