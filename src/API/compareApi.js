import { assist } from "src/boot/axios";

export default{
  getData(sid,seccion){
    return assist.post(`/compare/getProducts/${sid}`,seccion).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  secciones(){
    return assist.get(`/compare`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getProductReport(){
    return assist.get(`/compare/getProducts`).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
