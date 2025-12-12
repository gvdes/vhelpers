import { assist } from "src/boot/axios";

export default{
  readCostancy(data){
    return assist.post(`/billing/readConstancy`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  index(data){
    return assist.get(`/billing`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  validTicket(data){
    return assist.post(`/billing/validTicket`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  sendBilling(data){
    return assist.post(`/billing/sendBilling`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  getBillings(data){
    return assist.post(`/billing/getBillings`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  getBilling(data){
    return assist.post(`/billing/getBilling`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  getFolio(data){
    return assist.post(`/billing/getFolio`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  nextState(data){
    return assist.post(`/billing/nextState`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  finishState(data){
    return assist.post(`/billing/finishState`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
}
