import { assist } from "src/boot/axios";

export default{

  newForm(data){
    return assist.post(`/deposits/forms`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getFormStore(data,params){
    return assist.post(`/deposits/getFormsStore/${data}`,params).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getForm(data){
    return assist.post(`/deposits/getForms`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  changeStatus(data){
    return assist.post(`/deposits/changeStatus`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  changeTicket(data){
    return assist.post(`/deposits/changeTicket`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },

  // getStores(){
  //   return assist.get(`/sal/getStores`).then( done=>done.data ).catch( fail => { return {fail}} );
  // }
}
