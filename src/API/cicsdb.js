import { assist } from "src/boot/axios";

export default{
  index(data){
    return assist.post(`/warehouses/ciclicos`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  find(folio,store){
    return assist.get(`/warehouses/ciclicos/${folio}?store=${store}`).then( done=>done.data ).catch( fail => { return {fail}; } );
  },
  obtProductSections(data){
    return assist.post(`/warehouses/ciclicos/obtProductSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductSLocation(data){
    return assist.post(`/warehouses/ciclicos/obtProductSLocation`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addCyclecount(data){
    return assist.post(`/warehouses/ciclicos/addCyclecount`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getCyclecount(data){
    return assist.post(`/warehouses/ciclicos/getCyclecount`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  saveValue(data){
    return assist.post(`/warehouses/ciclicos/saveValue`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  nextStep(data){
    return assist.post(`/warehouses/ciclicos/nextStep`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  productCyclecount(data){
    return assist.post(`/warehouses/ciclicos/productCyclecount`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addMassiveProductCyclecount(data){
    return assist.post(`/warehouses/ciclicos/addMassiveProductCyclecount`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  presitionInventory(data){
   return assist.post(`/warehouses/ciclicos/presitionInventory`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
