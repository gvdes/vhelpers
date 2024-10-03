import { assist } from "src/boot/axios";

export default{

  newForm(data){
    return assist.post(`/deposits/forms`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getFormStore(data){
    return assist.get(`/deposits/getFormsStore/${data}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },

  // getStores(){
  //   return assist.get(`/sal/getStores`).then( done=>done.data ).catch( fail => { return {fail}} );
  // }
}
