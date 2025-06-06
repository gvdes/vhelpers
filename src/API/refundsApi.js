import { assist } from "src/boot/axios";

export default {
  index(sid) {
    return assist.get(`/refunds/getRefunds/${sid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  getRefundDirerences(sid) {
    return assist.get(`/refunds/getRefundDirerences/${sid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  addRefund(data) {
    return assist.post(`/refunds/addRefund`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  getRefund(sid,rid) {
    return assist.get(`/refunds/getRefund/${sid}/${rid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  getRefundto(sid,rid) {
    return assist.get(`/refunds/getRefundto/${sid}/${rid}`).then(done => done.data).catch(fail => { return { fail } });
  },
  addProduct(data) {
    return assist.post(`/refunds/addProduct`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  editProduct(data) {
    return assist.post(`/refunds/editProduct`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  editProductReceipt(data) {
    return assist.post(`/refunds/editProductReceipt`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  deleteProduct(data) {
    return assist.post(`/refunds/deleteProduct`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  endRefund(data) {
    return assist.post(`/refunds/endRefund`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  nexState(data) {
    return assist.post(`/refunds/nexState`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  finallyRefund(data) {
    return assist.post(`/refunds/finallyRefund`,data).then(done => done.data).catch(fail => { return { fail } });
  },
}
