import { assist } from "src/boot/axios";

export default{

  index(data){
    return assist.get(`/requisition/${data}`).then( done=>done ).catch( fail => { return {fail}} );
  },
  getRequisitionsStore(data){
    return assist.get(`/requisition/getRequisitionsStore`).then( done=>done ).catch( fail => { return {fail}} );
  },
  getRequisition(store,req){
    return assist.get(`/requisition/${store}/${req}`).then( done=>done ).catch( fail => { return {fail}} );
  },
  printReq(store,req){
    return assist.get(`/requisition/${store}/${req}/print`).then( done=>done ).catch( fail => { return {fail}} );
  },
  change(store,req){
    return assist.get(`/requisition/${store}/${req}/change`).then( done=>done ).catch( fail => { return {fail}} );
  },
  createRequisition(data){
    return assist.post(`/requisition/createRequisition`,data).then( done=>done ).catch( fail => { return {fail}} );
  },
  finishRequisition(data){
    return assist.post(`/requisition/finishRequisition`,data).then( done=>done ).catch( fail => { return {fail}} );
  }
}
