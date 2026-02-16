import { assistOrd } from "src/boot/axios";

export default{
  getProduct(id){
    return assistOrd.get(`/Products/getProduct/${id}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  autocomplete(data) {
    return assistOrd.post(`/Products/autoComplete`, data).then(done => done).catch(fail => { return { fail } });
  },
  searchExact (data) {
    return assistOrd.post(`/Products/search-exact`, data).then(done => done).catch(fail => { return { fail } });
  },
  index () {
    return assistOrd.get(`/Products/index`).then(done => done.data).catch(fail => { return { fail } });
  },
  searchCode (data) {
    return assistOrd.get(`/Products/searchCode/${data}`).then(done => done.data).catch(fail => { return { fail } });
  },
  searchBarcode (data) {
    return assistOrd.get(`/Products/searchBarcode/${data}`).then(done => done.data).catch(fail => { return { fail } });
  },
  generateBarcode (data) {
    return assistOrd.post(`/Products/genBarcode`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  checkCodesBatch (data) {
    return assistOrd.post(`/Products/checkCodesBatch`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  highProducts (data) {
    return assistOrd.post(`/Products/highProducts`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  lookupProducts (data) {
    return assistOrd.post(`/Products/lookupProducts`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  highPrices (data) {
    return assistOrd.post(`/Products/highPrices`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  checkLabel(data) {
    return assistOrd.post(`/Products/checkLabels`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  setMin(data) {
    return assistOrd.post(`/Products/setMin`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  setMax(data) {
    return assistOrd.post(`/Products/setMax`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  setMassisveMinMax(data) {
    return assistOrd.post(`/Products/setMassisveMinMax`,data).then(done => done.data).catch(fail => { return { fail } });
  },
  autoCompleteProduct(data) {
    return assistOrd.post(`/Products/autoCompleteProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  exactSearch(data) {
    return assistOrd.post(`/Products/exactSearch`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  scanSearch(data) {
    return assistOrd.post(`/Products/scanSearch`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  getReportProvider(data) {
    return assistOrd.post(`/Products/getReportProvider`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateImgProduct(data) {
    return assistOrd.post(`/Products/updateImgProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  massiveUpdateImg(data) {
    return assistOrd.post(`/Products/massiveUpdateImg`, data).then(done => done.data).catch(fail => { return { fail } });
  },
  updateStatusProduct(data){
    return assistOrd.post(`/Products/updateStatusProduct`, data).then(done => done.data).catch(fail => { return { fail } });
  }
}
