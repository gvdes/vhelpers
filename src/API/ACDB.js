import { ADB } from "src/boot/AccessDB"

export default{

  ticket(data){
    return ADB.get('/iva/prueba').then( done => done.data ).catch( fail => { console.log(fail); });
  }

}
