import { vizapi } from "src/boot/axios";

export default{
  getOrder(data,uid){
    return vizapi.get(`/preorders/getOrder/${data}`,{params: uid}).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getOrderVerify(data,uid){
    return vizapi.get(`/preorders/getOrderVerify/${data}`,{params: uid}).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
