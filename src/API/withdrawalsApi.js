import { assist } from "src/boot/axios";

export default{

  getStoreWithdrawals(data){
    return assist.get(`/withdrawalStore/${data}`).then( done=>done.data ).catch( fail => { return {fail}} );
  }

}
