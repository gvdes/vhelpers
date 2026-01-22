import { assist } from "src/boot/axios";

export default {
  getAreas() {
    return assist.get(`/users/getAreas`).then(done => done.data).catch(fail => { return { fail } });
  },
  addArea(data) {
    return assist.post(`/users/addArea`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addRol(data) {
    return assist.post(`/users/addRol`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  modifyRol(data) {
    return assist.post(`/users/modifyRol`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getUsers() {
    return assist.get(`/users/getUsers`).then(done => done.data).catch(fail => { return { fail } });
  }
}
