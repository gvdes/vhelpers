import { assist } from "src/boot/axios";
import { vizapi } from "src/boot/axios";


export default{
  index(data){
    let burl = `/invoices/indexDashboard`;
    return assist.post(burl,data).then( done => done.data ).catch( fail => fail);
  },
  order(id){
    let burl = `/invoices/${id}`;
    return assist.get(burl).then( done => done ).catch( fail => fail.response);
  },
  partition(id){
    let burl = `/invoices/${id}/partitionFresh`;
    return assist.get(burl).then( done => done ).catch( fail => fail.response);
  },
  nextState(data){
    let burl = `/invoices/changestateRequisition`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  setDeliveryProduct(data){
    let burl = `/invoices/setdelivery`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  setReceiveProduct(data){
    let burl = `/invoices/setreceived`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  orderFresh(id){
    let burl = `/invoices/${id}/fresh`;
    return assist.get(burl).then( done => done ).catch( fail => fail.response);
  },
  partitionFresh(id){
    let burl = `/invoices/${id}/partitionFresh`;
    return assist.get(burl).then( done => done ).catch( fail => fail.response);
  },
  genInvoice(id){
    let burl = `/invoices/${id}/newinvoice`;
    return assist.get(burl).then( done => done ).catch( fail => fail.response);
  },
  genTransfer(id){
    let burl = `/invoices/${id}/newTransfer`;
    return assist.get(burl).then( done => done ).catch( fail => fail.response);
  },
  checkin(data){
    let burl = `/invoices/checkin`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  report(data){
    let burl = `/invoices/report/${data}`;
    return assist.get(burl).then( done => done ).catch( fail => fail.response);
  },
  massiveAction(data){
    let burl = `/invoices/massaction`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  printForSupply(data){
    let burl = "/invoices/print/forsupply";
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  // printKey(data){
  //   let burl = "/restock/print/key";
  //   return vizapi.post(burl,data).then( done => done ).catch( fail => fail.response);
  // },
  createAutomate(data){
    let burl = "/restock/create";
    return vizapi.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  // suc(){
  //   let burl = "/restock/suc";
  //   return vizapi.get(burl).then( done => done ).catch( fail => fail.response);
  // },
  getStoresAutomate(){
    let burl = "/invoices/getStoresAutomate";
    return assist.get(burl).then( done => done ).catch( fail => fail.response);
  },
  printForPartition(data){
    let burl = "/invoices/print/Partition";
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  nextStep(data){
    let burl = "/restock/nextStep";
    return vizapi.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  sendMessageDiff(data){
    let burl = "/invoices/sendMessageDiff";
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  correction(data){
    let burl = "/invoices/correction";
    return assist.post(burl,data).then( done => done ).catch( fail => fail.response);
  },
  getSupply(data){
    let burl = `restock/getSupply/${data}`;
    return assist.get(burl).then( done => done.data ).catch( fail => fail);
  },
  createParitions(data){
    let burl = `restock/createParitions`;
    return assist.post(burl,data).then( done => done.data ).catch( fail => fail);
  },
  saveSupply(data){
    let burl = `restock/saveSupply`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail);
  },
  nextStatePartition(data){
    let burl = `restock/changeStatus`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail);
  },
  getVerified(data){
    let burl = `restock/getVerified/${data}`;
    return assist.get(burl).then( done => done.data ).catch( fail => fail);
  },
  SaveVerified(data){
    let burl = `restock/saveVerified`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail);
  },
  SaveChofi(data){
    let burl = `restock/saveChofi`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail);
  },
  saveReceipt(data){
    let burl = `restock/saveReceipt`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail);
  },
  saveCheck(data){
    let burl = `restock/saveCheck`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail);
  },
  getStores(){
    let burl = `restock/getStores`;
    return assist.get(burl).then( done => done ).catch( fail => fail);
  },
  getData(data){
    let burl = `restock/getData`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail);
  },
  refresTransit(data){
    let burl = `restock/refresTransit`;
    return assist.post(burl,data).then( done => done ).catch( fail => fail);
  },
}
