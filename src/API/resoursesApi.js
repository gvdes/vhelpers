import { vizapi } from "src/boot/axios";

export default{
  getSeccion(sid,type){
    return vizapi.post(`/resources/getSeccion/${sid}`,type).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getCedis(){
    return vizapi.get(`/resources/getCedis`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getProductsCompare(sid,data){
    return vizapi.post(`/resources/getProductReport/${sid}`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getProductsCompareLocation(data){
    return vizapi.post(`/resources/getProductReportLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  create(data){
    return vizapi.post(`/resources/create`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  preview(data){
    return vizapi.post(`/resources/preview`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reportProductsCategories(data){
    return vizapi.post(`/resources/reportProductsCategories`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  }

}
