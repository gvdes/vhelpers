import { assist } from "src/boot/axios";

export default{
  index(idstore){
    return assist.get(`/cashier/getStaff/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  opening(data){
    return assist.post(`/cashier/Opening`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getPrinters(idstore){
    return assist.get(`/cashier/getPrinters/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getCutsBoxes(sid){
    return assist.get(`/cashier/getCutsBoxes/${sid}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getCurrenCut(data){
    return assist.post(`/cashier/getCurrenCut`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
