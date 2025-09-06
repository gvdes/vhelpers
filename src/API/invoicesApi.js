import { assist } from "src/boot/axios";

export default{
  index(){
    return assist.get(`/invoices/index`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getInvoice(inv){
    return assist.get(`/invoices/getInvoice/${inv}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addInvoice(data){
    return assist.post(`/invoices/addInvoice`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addProduct(data){
    return assist.post(`/invoices/addProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  editProduct(data){
    return assist.post(`/invoices/editProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteProduct(data){
    return assist.post(`/invoices/deleteProduct`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  changestate(data){
    return assist.post(`/invoices/changestate`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addInvoiceFS(data){
    return assist.post(`/invoices/addInvoiceFS`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addTransferFS(data){
    return assist.post(`/invoices/addTransferFS`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  endTransferFS(data){
    return assist.post(`/invoices/endTransferFS`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addEntryFS(data){
    return assist.post(`/invoices/addEntryFS`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
