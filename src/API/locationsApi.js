import { assist } from "src/boot/axios";

export default{
  index(idstore){
    return assist.get(`/locations/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductSections(data){
    return assist.post(`/locations/obtProductSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtSections(data){
    return assist.post(`/locations/obtSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
