import { assistOrd } from "src/boot/axios";

export default{
  index(data){
    return assistOrd.post(`/locations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getInit(idstore){
    return assistOrd.get(`/locations/getInit/${idstore}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductSections(data){
    return assistOrd.post(`/locations/obtProductSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProduct(data){
    return assistOrd.post(`/locations/obtProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtProductCategories(data){
    return assistOrd.post(`/locations/obtProductCategories`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  obtSections(data){
    return assistOrd.post(`/locations/obtSections`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  insertSection(data){
    return assistOrd.post(`/locations/insertSection`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addLocations(data){
    return assistOrd.post(`/locations/addLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteSection(data){
    return assistOrd.post(`/locations/deleteSection`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteSectionProducts(data){
    return assistOrd.post(`/locations/deleteSectionProducts`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteCategoriesLocations(data){
    return assistOrd.post(`/locations/deleteCategoriesLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addMassiveLocation(data){
    return assistOrd.post(`/locations/addMassiveLocation`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteMassiveLocation(data){
    return assistOrd.post(`/locations/deleteMassiveLocation`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reportLocations(data){
    return assistOrd.post(`/locations/reportLocations`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  reportMinMax(data){
    return assistOrd.post(`/locations/reportMinMax`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
