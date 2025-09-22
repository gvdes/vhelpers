import { assist } from "src/boot/axios";

export default{
  index(){
    return assist.get(`/admincli`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getClient(sico){
   return  assist.get(`/admincli/getclient?q=${sico}`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getSolicitud(){
   return  assist.get(`/admincli/solicitudes`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getClientVac(){
   return  assist.get(`/admincli/getclient`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  create(data){
    return assist.post(`/admincli`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  addClient(data){
    return assist.post(`/admincli/addClient`,data).then( done=>done.data ).catch( fail =>  { return {fail}} );
  },
  ignoredClient(data){
    return assist.patch(`/admincli/ignoredClient`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  restoreClient(data){
    return assist.patch(`/admincli/Restore`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  deleteClient(data){
    return assist.patch(`/admincli/Restore`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  synclient(){
    return assist.get(`/admincli/syncClient`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getClients(){
    return assist.get(`/Client`).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getSalesC(data){
    return assist.post(`/Client/getSalesC`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },




}
