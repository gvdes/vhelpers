import { assist } from "src/boot/axios";

export default{
  getProduct(id){
    return assist.get(`/Products/getProduct/${id}`).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
