import { assist } from "src/boot/axios";

export default{
  getProduct(id){
    return assist.get(`/Products/getProduct/${id}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  autocomplete(data) {
    return assist.post(`/Products/autoComplete`, data).then(done => done).catch(fail => { return { fail } });
  }
}
