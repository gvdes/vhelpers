import { assist } from "src/boot/axios";

export default{
  autocomplete(data){
    return assist.post(`/Products`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getMassive(data){ return assist.post('/product/getMassive',data); },
}
