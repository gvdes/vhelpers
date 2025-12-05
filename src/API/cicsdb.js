import { assist } from "src/boot/axios";

export default{
  index(data){
    return assist.post(`/ciclicos`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  find(folio,store){
    return assist.get(`/ciclicos/${folio}?store=${store}`).then( done=>done.data ).catch( fail => { return {fail}; } );
  },
  obtProductSections(data){
    return assist.post(`/ciclicos/obtProductSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductSLocation(data){
    return assist.post(`/ciclicos/obtProductSLocation`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addCyclecount(data){
    return assist.post(`/ciclicos/addCyclecount`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getCyclecount(data){
    return assist.post(`/ciclicos/getCyclecount`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  saveValue(data){
    return assist.post(`/ciclicos/saveValue`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  nextStep(data){
    return assist.post(`/ciclicos/nextStep`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
