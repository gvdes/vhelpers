import { assist } from "src/boot/axios";

export default{
  getSeccion(sid,type){
    return assist.post(`/resources/getSeccion/${sid}`,type).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getCedis(){
    return assist.get(`/resources/getCedis`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getProductsCompare(sid,data){
    return assist.post(`/resources/getProductReport/${sid}`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getProductsCompareLocation(data){
    return assist.post(`/resources/getProductReportLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  create(data){
    return assist.post(`/resources/create`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  preview(data){
    return assist.post(`/resources/preview`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reportProductsCategories(data){
    return assist.post(`/resources/reportProductsCategories`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getAssortmentInsumos(data){
    return assist.post(`/resources/getAssortmentInsumos`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },

}
