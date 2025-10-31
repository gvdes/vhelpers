import { assist } from "src/boot/axios";

export default{
  getData(sid,data){
    return assist.post(`/compare/getChangePrices/${sid}`, data).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
