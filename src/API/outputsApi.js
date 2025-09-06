import { assist } from "src/boot/axios";

export default{

  index(data){
    return assist.get(`/output/getOutputs/${data}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getDate(data){
    return assist.post(`/output/getOutsDate`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addOuts(data){
    return assist.post(`/output/addOutputs`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getOutput(data){
    return assist.get(`/output/getOutput/${data}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addProduct(data){
    return assist.post(`/output/addProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  editProduct(data){
    return assist.post(`/output/editProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  removeProduct(data){
    return assist.post(`/output/removeProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  endOutput(data){
    return assist.post(`/output/endOutput`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  outputPreventa(data){
    return assist.post(`/output/outputPreventa`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addProductMasive(data){
    return assist.post(`/output/addProductMasive`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
