import { assistOrd } from "src/boot/axios";

export default{
  autocomplete(data){
    return assistOrd.post(`/product`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getMassive(data){ return assistOrd.post('/product/getMassive',data); },
}
