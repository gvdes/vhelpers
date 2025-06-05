import { assist } from "src/boot/axios";

export default{
  index(){
    return assist.get(`/sales/getSale`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getReport(){
    return assist.get(`/getResourses`).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
