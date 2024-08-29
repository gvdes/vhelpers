import { vizapi } from "src/boot/axios";

export default{
  // autocompleteGET(data){ return vizapi.get('/product/autocomplete',data); }, // para eliminar si todo sale bien!!
  autocomplete(data){ return vizapi.post('/product',data); },
  getMassive(data){ return vizapi.post('/product/getMassive',data); },
  // listStates(){
  //     return vizapi.get('/product/getStatus').then(success=>{
  //         return success.data.status;
  //     }).catch(fail=>{ console.log(fail); });
  // },
//   updateState(data){ return vizapi.post('/product/updateStatus',data); },
//   freshState(data){
//       return vizapi.post('/product/updateStatus',data)
//           .then( done => done.data )
//           .catch( fail => { return {error:fail} });
//   },
//   listPoducts(data){ return vizapi.post('product',data); },
//   categories(data){
//       return vizapi.post('/product/catalog',data).then(success=>{
//           return success.data.categories;
//       }).catch(fail=>{ console.log(fail); });
//   },
//   get(data){ return vizapi.post('/product',data).then(success=>{
//       return success.data;
//   }).catch(fail=>{console.log(fail);}); }
}
