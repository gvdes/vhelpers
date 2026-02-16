import { assistOrd } from "src/boot/axios";

export default{
  autocomplete(data){ return assistOrd.post('/product',data); },
  getMassive(data){ return assistOrd.post('/product/getMassive',data); },
}
