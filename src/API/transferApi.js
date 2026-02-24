import { assist } from "src/boot/axios";

export default {
  addingTransfer(data) {
    return assist.post(`/warehouses/transfers/addingTransfer`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getTransfer(data) {
    return assist.get(`/warehouses/transfers/getTransfer/${data}`).then(done => done.data).catch(fail => { return { fail } });
  },
  getTransfers(data) {
    return assist.post(`/warehouses/transfers/getTransfers`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  deleteTransfer(data) {
    return assist.post(`/warehouses/transfers/deleteTransfer`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addProduct(data) {
    return assist.post(`/warehouses/transfers/addProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addProductMasive(data) {
    return assist.post(`/warehouses/transfer/addProductMasive`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  editProduct(data) {
    return assist.post(`/warehouses/transfers/editProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  removeProduct(data) {
    return assist.post(`warehouses/transfers/removeProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  endTransfer(data) {
    return assist.post(`warehouses/transfers/endTransfer`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  transferPreventa(data) {
    return assist.post(`/warehouses/transfer/transferPreventa`, data).then(done => done.data).catch(fail => { return { fail } });
  },
}
