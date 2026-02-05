import { assist } from "src/boot/axios";

export default{
  getProduct(id){
    return assist.get(`/Products/getProduct/${id}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  autocomplete(data) {
    return assist.post(`/Products/autoComplete`, data).then(done => done).catch(fail => { return { fail } });
  },
  searchExact (data) {
    return assist.post(`/Products/search-exact`, data).then(done => done).catch(fail => { return { fail } });
  },
  index () {
    return assist.get(`/Products/index`).then(done => done.data).catch(fail => { return { fail } });
  },
  searchCode (data) {
    return assist.get(`/Products/searchCode/${data}`).then(done => done.data).catch(fail => { return { fail } });
  },
  searchBarcode (data) {
    return assist.get(`/Products/searchBarcode/${data}`).then(done => done.data).catch(fail => { return { fail } });
  },
  generateBarcode (data) {
    return assist.post(`/Products/genBarcode`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  checkCodesBatch (data) {
    return assist.post(`/Products/checkCodesBatch`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  highProducts (data) {
    return assist.post(`/Products/highProducts`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  lookupProducts (data) {
    return assist.post(`/Products/lookupProducts`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  highPrices (data) {
    return assist.post(`/Products/highPrices`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  checkLabel(data) {
    return assist.post(`/Products/checkLabels`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  setMin(data) {
    return assist.post(`/Products/setMin`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  setMax(data) {
    return assist.post(`/Products/setMax`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  setMassisveMinMax(data) {
    return assist.post(`/Products/setMassisveMinMax`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  autoCompleteProduct(data) {
    return assist.post(`/Products/autoCompleteProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  exactSearch(data) {
    return assist.post(`/Products/exactSearch`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  scanSearch(data) {
    return assist.post(`/Products/scanSearch`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getReportProvider(data) {
    return assist.post(`/Products/getReportProvider`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateImgProduct(data) {
    return assist.post(`/Products/updateImgProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  massiveUpdateImg(data) {
    return assist.post(`/Products/massiveUpdateImg`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateStatusProduct(data){
    return assist.post(`/Products/updateStatusProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  addCategory(data){
    return assist.post(`/Products/addCategory`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  searchProd(data){
    return assist.post(`/Products/searchProd`, data).then(done => done.data).catch(fail => { return { fail } });
  }
}
