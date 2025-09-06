import { vizapi } from "src/boot/axios";

export default {
  getOrder(data, uid) {
    return vizapi.get(`/preorders/getOrder/${data}`, { params: uid }).then(done => done.data).catch(fail => { return { fail } });
  },
  getRules() {
    return vizapi.get(`/preorders/getRules`).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderVerify(data, uid) {
    return vizapi.get(`/preorders/getOrderVerify/${data}`, { params: uid }).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderAdd(data, oid) {
    return vizapi.get(`/preorders/getOrderAdd/${data}`, { params: oid }).then(done => done.data).catch(fail => { return { fail } });
  },
  editProduct(data) {
    return vizapi.post(`/preorders/editProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addProduct(data) {
    return vizapi.post(`/preorders/addProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  deleteProduct(data) {
    return vizapi.post(`/preorders/deleteProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateProductPrices(data) {
    return vizapi.post(`/preorders/updateProductPrices`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getClient(data) {
    return vizapi.post(`/preorders/getClient`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeClientOrder(data) {
    return vizapi.post(`/preorders/changeClientOrder`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextState(data) {
    return vizapi.post(`/preorders/nextState`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  nextStateFinish(data) {
    return vizapi.post(`/preorders/nextStateFinish`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getOrderCash(data) {
    return vizapi.post(`/preorders/getOrderCash`, data).then(done => done.data).catch(fail => { return { fail } });
  }
}
