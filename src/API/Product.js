import { assistOrd } from "src/boot/axios";

export default{
  autocomplete(data){ return assist.post('/product',data); },
  getMassive(data){ return assist.post('/product/getMassive',data); },
}
