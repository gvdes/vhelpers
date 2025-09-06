import { assist } from "src/boot/axios";

export default{
  index(data){
    return assist.post(`/cashs/index`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  getCash(data){
    return assist.post(`/cashs/getCash`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  openCash(data){
    return assist.post(`/cashs/openCash`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  getPaidMethods(){
    return assist.get(`/cashs/getPaidMethods`).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  addSale(data){
    return assist.post(`/cashs/addSale`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  addSaleStandar(data){
    return assist.post(`/cashs/addSaleStandar`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  getDependiente(data){
    return assist.post(`/cashs/getDependiente`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  closeCash(data){
    return assist.post(`/cashs/closeCash`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addWitrawal(data){
    return assist.post(`/cashs/addWitrawal`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getWithdrawals(data){
    return assist.post(`/cashs/getWithdrawals`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reprintWithdrawal(data){
    return assist.post(`/cashs/reprintWithdrawal`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reprintSale(data){
    return assist.post(`/cashs/reprintSale`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addIngress(data){
    return assist.post(`/cashs/addIngress`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getIngress(data){
    return assist.post(`/cashs/getIngress`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reprintIngress(data){
    return assist.post(`/cashs/reprintIngress`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addAdvances(data){
    return assist.post(`/cashs/addAdvances`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getSales(data){
    return assist.post(`/cashs/getSales`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getOrderCash(data) {
    return assist.post(`/cashs/getOrderCash`, data).then(done => done.data).catch(fail => { return { fail } });
  }
}
