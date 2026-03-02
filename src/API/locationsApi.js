import { assist } from "src/boot/axios";

export default{
  index(data){
    return assist.post(`/warehouses/locations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getInit(idstore){
    return assist.get(`/warehouses/locations/getInit/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductSections(data){
    return assist.post(`/warehouses/locations/obtProductSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProduct(data){
    return assist.post(`/warehouses/locations/obtProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductCategories(data){
    return assist.post(`/warehouses/locations/obtProductCategories`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtSections(data){
    return assist.post(`/warehouses/locations/obtSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  insertSection(data){
    return assist.post(`/warehouses/locations/insertSection`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addLocations(data){
    return assist.post(`/warehouses/locations/addLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteSection(data){
    return assist.post(`/warehouses/locations/deleteSection`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteSectionProducts(data){
    return assist.post(`/warehouses/locations/deleteSectionProducts`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteCategoriesLocations(data){
    return assist.post(`/warehouses/locations/deleteCategoriesLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addMassiveLocation(data){
    return assist.post(`/warehouses/locations/addMassiveLocation`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteMassiveLocation(data){
    return assist.post(`/warehouses/locations/deleteMassiveLocation`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reportLocations(data){
    return assist.post(`/warehouses/locations/reportLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reportMinMax(data){
    return assist.post(`/warehouses/locations/reportMinMax`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
