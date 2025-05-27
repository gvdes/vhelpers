import { assist } from "src/boot/axios";

export default{
  index(data){
    return assist.post(`/cashs/index`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  getCash(data){
    return assist.post(`/cashs/getCash`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
  openCash(data){
    return assist.post(`/cashs/openCash`,data).then( done=> done.data ).catch( fail => { return {fail}} );
  },
}
