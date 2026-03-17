import { assist } from "src/boot/axios";

export default {
  index(zone) {
    return assist.post(`/operations/index`, zone).then(done => done.data).catch(fail => { return { fail } });
  },
  getSalesMonth(data) {
    return assist.post(`/operations/getSalesMonth`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getCashStatus(data) {
    return assist.post(`/operations/getCashStatus`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getStatusInventory(data) {
    return assist.post(`/operations/getStatusInventory`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getStatusPerson(data) {
    return assist.post(`/operations/getStatusPerson`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getSatisfactionClient(data) {
    return assist.post(`/operations/getSatisfactionClient`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  statusAdm(data) {
    return assist.post(`/operations/statusAdm`, data).then(done => done.data).catch(fail => { return { fail } });
  },
}
