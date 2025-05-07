import { assist } from "src/boot/axios";

export default{

  index(data){
    return assist.get(`/transfer/getTransfers/${data}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getDate(data){
    return assist.post(`/transfer/getTransfersDate`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addTransfer(data){
    return assist.post(`/transfer/addTransfer`,data).then( done=>done.data ).catch( fail => { return {error:fail}} );
  },
  getTransfer(data){
    return assist.get(`/transfer/getTransfer/${data}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addProduct(data){
    return assist.post(`/transfer/addProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addProductMasive(data){
    return assist.post(`/transfer/addProductMasive`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  editProduct(data){
    return assist.post(`/transfer/editProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  removeProduct(data){
    return assist.post(`/transfer/removeProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  endTransfer(data){
    return assist.post(`/transfer/endTransfer`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  transferPreventa(data){
    return assist.post(`/transfer/transferPreventa`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
