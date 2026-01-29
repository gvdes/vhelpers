import { assist } from "src/boot/axios";

export default {
  getAreas() {
    return assist.get(`/users/getAreas`).then(done => done.data).catch(fail => { return { fail } });
  },
  getUserWorkpoints() {
    return assist.get(`/users/getUserWorkpoints`).then(done => done.data).catch(fail => { return { fail } });
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
  },
  addUsser(data) {
    return assist.post(`/users/addUsser`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  modifyUser(data) {
    return assist.post(`/users/modifyUser`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  resetpass(data) {
    return assist.post(`/users/resetpass`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeWorkpoint(data) {
    return assist.post(`/users/changeWorkpoint`,data).then(done => done.data).catch(fail => { return { fail } });
  },
}
