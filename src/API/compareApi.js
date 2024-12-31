import { vizapi } from "src/boot/axios";

export default{
  getData(sid,seccion){
    return vizapi.post(`/compare/getProducts/${sid}`,seccion).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  secciones(){
    return vizapi.get(`/compare`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getProductReport(){
    return vizapi.get(`/compare/getProducts`).then( done=>done.data ).catch( fail => { return {fail}} );
  }
}
