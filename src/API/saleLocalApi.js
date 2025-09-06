import axios from "axios"; //para dirigirme bro
import { useVDBStore } from 'stores/VDB';
const VDB = useVDBStore();
const host = VDB.session.store.ip_address;
const store = axios.create({ baseURL: `http://${host}/storetools/public/api` })

export default {
  addSale(data) {
    return store.post(`/sales/addSale`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getWithdrawal(data) {
    return store.post(`/sales/getWithdrawals`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  printWitrawal(data) {
    return store.post(`/sales/printWitrawal`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  addWithdrawal(data) {
    return store.post(`/sales/addWithdrawal`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  reprintSale(data) {
    return store.post(`/sales/reprintSale`,data).then(done => done.data).catch(fail => { return { fail } });
  },



  // getStores(){
  //   return assist.get(`/sal/getStores`).then( done=>done.data ).catch( fail => { return {fail}} );
  // }
}
