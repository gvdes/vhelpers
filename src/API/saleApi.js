import { assist } from "src/boot/axios";

export default {
  index(data) {
    let burl = `/sales/getMonthSale`;
    return assist.post(burl, data).then(done => done.data).catch(fail => fail);
  },

}
