import { assist } from "src/boot/axios";

export default{
  getPrints(idstore){
    return assist.get(`/cashier/getPrinters/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  PrintAttention(data){
    return assist.post(`/prints/PrintAttention`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getColab(idstore){
    return assist.get(`/cashier/getDependients/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
