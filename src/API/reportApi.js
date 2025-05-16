import { vizapi } from "src/boot/axios";

export default{
  index(){
    return vizapi.get(`/reports`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getReport(data){
    return vizapi.post(`/reports/getReport`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
