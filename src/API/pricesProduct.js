import { vizapi } from "src/boot/axios";

export default{
  getData(sid){
    return vizapi.get(`/compare/getChangePrices/${sid}`).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
