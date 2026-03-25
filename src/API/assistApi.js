import { assist } from "src/boot/axios";
import axios from "axios";
// import { useVDBStore } from 'stores/VDB';
// const VDB = useVDBStore();
// const host = VDB.session.store.ip_address;
// // const store = axios.create({ baseURL: `http://${host}/storetools/public/api` })
// const store = axios.create({ baseURL: `http://192.168.10.160:1619/storetools/public/api` })


export default {
  index() {
    return assist.get(`/sales/getSale`).then(done => done.data).catch(fail => { return { fail } });
  },
  getReport() {
    return assist.get(`/getResourses`).then(done => done.data).catch(fail => { return { fail } });
  },
  getSales(data) {
    return assist.post(`/sales/getSale`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  GetReportVhelp(data) {
    return assist.get(`/sales/GetReportVhelp/${data}`).then(done => done.data).catch(fail => { return { fail } });
  },
  getOpenCash(data) {
    return assist.post(`/sales/getOpenCash`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateReceipt(data) {
    return assist.post(`/sales/updateReceipt`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  ModifyReceipt(data) {
    return assist.post(`/sales/ModifyReceipt`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  ModifyExpense(data) {
    return assist.post(`/sales/ModifyExpense`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  ModifyReceiptCard(data) {
    return assist.post(`/sales/ModifyReceiptCard`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addCommentCard(data) {
    return assist.post(`/sales/addCommentCard`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addCommentMismatch(data) {
    return assist.post(`/sales/addCommentMismatch`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  OpenBoxes(host, data) {
    const store = axios.create({ baseURL: `http://${host}/storetools/public/api` })
    // const store = axios.create({ baseURL: `http://192.168.10.160:1619/storetools/public/api` })
    return store.post(`/reports/OpenBoxes`, data).then(done => done.data).catch(fail => { return { fail } });
  },
}
