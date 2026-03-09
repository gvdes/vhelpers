import { assist } from "src/boot/axios";

export default {
  index() {
    return assist.get(`/warehouses`).then(done => done.data).catch(fail => { return { fail } });
  },
  setMin(data) {
    return assist.post(`/warehouses/setMin`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  setMax(data) {
    return assist.post(`/warehouses/setMax`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  setMassisveMinMax(data) {
    return assist.post(`/warehouses/setMassisveMinMax`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateStatusProduct(data){
    return assist.post(`/warehouses/updateStatusProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  }
}
