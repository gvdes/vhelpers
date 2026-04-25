import { assist } from "src/boot/axios";

export default {
  getDevices(data) {
    return assist.post(`/assist/getDevices`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  ping(id) {
    return assist.get(`/assist/ping/${id}`).then(done => done.data).catch(fail => { return { fail } });
  },
  getRegisDevice(id) {
    return assist.post(`/assist/getRegisDevice/${id}`).then(done => done.data).catch(fail => { return { fail } });
  },
  changeDate(id) {
    return assist.post(`/assist/changeDate/${id}`).then(done => done.data).catch(fail => { return { fail } });
  },
  deleteAttendance(id) {
    return assist.post(`/assist/deleteAttendance/${id}`).then(done => done.data).catch(fail => { return { fail } });
  },
  Resourcesform(data) {
    return assist.post(`/assist/Resourcesform`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  addForm(data) {
    return assist.post(`/assist/addForm`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  changeStatus(data) {
    return assist.post(`/assist/changeStatus`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  getJustifications(data) {
    return assist.post(`/assist/getJustifications`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  getReport(data) {
    return assist.post(`/assist/getReport`,data).then(done => done.data).catch(fail => { return { fail } });
  },
}
