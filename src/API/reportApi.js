import { vizapi } from "src/boot/axios";
import { assist } from "src/boot/axios";

export default{
  index(){
    return vizapi.get(`/reports`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getReport(data){
    return vizapi.post(`/reports/getReport`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  init(){
    return assist.get(`/reports`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtReport(data){
    return assist.post(`/reports/obtReport`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reportWarehouses(data){
    return assist.post(`/reports/reportWarehouses`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
