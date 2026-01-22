import { assist } from "src/boot/axios";

export default{
  trySignin(data){
    return assist.post(`/users/trySignin`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  chagePassword(data){
    return assist.post(`/users/chagePassword`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  changeStore(data){
    return assist.post(`/users/changeStore`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  getResources(data){
    return assist.get(`/users/getResources/${data}`).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  changeAvatar(data){
    return assist.post(`/users/changeAvatar`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  }
}
