import { assist } from "src/boot/axios";

export default{
  addQuiz(data){
    return assist.post(`/quizResponse/addQuiz`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
  getStats(data){
    return assist.post(`/quiz/getStats`,data).then( done=>done.data ).catch( fail => { return {fail}} );
  },
}
