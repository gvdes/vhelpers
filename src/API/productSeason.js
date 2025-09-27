import { assist } from "src/boot/axios";

export default{
  index(id){
    return assist.get(`/Products/getWorkpoinProduct/${id}`).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
