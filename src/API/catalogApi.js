import { assist } from "src/boot/axios";

export default{
  index(){
    return assist.get(`/catalog`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getPrinters(sid){
    return assist.get(`/catalog/${sid}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getFamilys(root){
    return assist.get(`/catalog/familys/${root}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getFamilysProducts(data){
    return assist.post(`/catalog/family-products`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
