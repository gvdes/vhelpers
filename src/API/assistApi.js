import { assist } from "src/boot/axios";

export default{

  index(){
    return assist.get(`/sales/getSale`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  // getStores(){
  //   return assist.get(`/sal/getStores`).then( done=>done.data ).catch( fail => { return {fail}} );
  // }
}
