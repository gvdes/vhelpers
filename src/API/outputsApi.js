import { assist } from "src/boot/axios";

export default{

  index(){
    return assist.get(`/warehouses/output/getOutputs`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getDate(data){
    return assist.post(`/warehouses/output/getOutsDate`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addOuts(data){
    return assist.post(`/warehouses/output/addOutputs`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getOutput(data){
    return assist.get(`/warehouses/output/getOutput/${data}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addProduct(data){
    return assist.post(`/warehouses/output/addProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  editProduct(data){
    return assist.post(`/warehouses/output/editProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  removeProduct(data){
    return assist.post(`/warehouses/output/removeProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  endOutput(data){
    return assist.post(`/warehouses/output/endOutput`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  outputPreventa(data){
    return assist.post(`/warehouses/output/outputPreventa`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addProductMasive(data){
    return assist.post(`/warehouses/output/addProductMasive`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
