import { assist } from "src/boot/axios";

export default {
  index() {
    return assist.get(`/warehouses/refunds/getRefunds`).then(done => done.data).catch(fail => { return { fail } });
  },
  getRefundDirerences(sid) {
    return assist.get(`/warehouses/refunds/getRefundDirerences/${sid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  addRefund(data) {
    return assist.post(`/warehouses/refunds/addRefund`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  getRefund(rid) {
    return assist.get(`/warehouses/refunds/getRefund/${rid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  getRefundto(rid) {
    return assist.get(`/warehouses/refunds/getRefundto/${rid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  addProduct(data) {
    return assist.post(`/warehouses/refunds/addProduct`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  editProduct(data) {
    return assist.post(`/warehouses/refunds/editProduct`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  editProductReceipt(data) {
    return assist.post(`/warehouses/refunds/editProductReceipt`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  deleteProduct(data) {
    return assist.post(`/warehouses/refunds/deleteProduct`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  endRefund(data) {
    return assist.post(`/warehouses/refunds/endRefund`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  nexState(data) {
    return assist.post(`/warehouses/refunds/nexState`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  nexStateValid(data) {
    return assist.post(`/warehouses/refunds/nexStateValid`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  nexStateUpdate(data) {
    return assist.post(`/warehouses/refunds/nexStateUpdate`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  finallyRefund(data) {
    return assist.post(`/warehouses/refunds/finallyRefund`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  finishUpdate(data) {
    return assist.post(`/warehouses/refunds/finishUpdate`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  correction(data) {
    return assist.post(`/warehouses/refunds/correction`,data).then(done => done.data).catch(fail => { return { fail } });
  },
}
