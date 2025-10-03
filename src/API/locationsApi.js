import { assist } from "src/boot/axios";

export default{
  index(idstore){
    return assist.get(`/locations/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getInit(idstore){
    return assist.get(`/locations/getInit/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductSections(data){
    return assist.post(`/locations/obtProductSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProduct(data){
    return assist.post(`/locations/obtProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductCategories(data){
    return assist.post(`/locations/obtProductCategories`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtSections(data){
    return assist.post(`/locations/obtSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  insertSection(data){
    return assist.post(`/locations/insertSection`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addLocations(data){
    return assist.post(`/locations/addLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteSection(data){
    return assist.post(`/locations/deleteSection`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteSectionProducts(data){
    return assist.post(`/locations/deleteSectionProducts`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteCategoriesLocations(data){
    return assist.post(`/locations/deleteCategoriesLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addMassiveLocation(data){
    return assist.post(`/locations/addMassiveLocation`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteMassiveLocation(data){
    return assist.post(`/locations/deleteMassiveLocation`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
