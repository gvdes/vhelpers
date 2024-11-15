import { vizapi } from "src/boot/axios";

export default{
  getSeccion(){
    return vizapi.get(`/resources/getSeccion`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getProductsCompare(sid,data){
    return vizapi.post(`/resources/getProductReport/${sid}`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  create(data){
    return vizapi.post(`/resources/create`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  preview(data){
    return vizapi.post(`/resources/preview`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },

}
