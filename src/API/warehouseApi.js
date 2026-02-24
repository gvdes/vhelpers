import { assist } from "src/boot/axios";

export default{
  index(){
    return assist.get(`/warehouses`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
