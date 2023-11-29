import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar';
import udb from 'src/API/udb.json';

export const useVDBStore = defineStore('vdb', {
  state: () => ({
    session:null,
    users:udb,
    series:[1,2,3,4,5,6,7,8,9],
    modules:[
      { id:1, name:"IVA", alias:"IVA", desc:"Agregue iva a tickets cobrados", path:"iva" },
      { id:2, name:"Ciclicos", alias:"CIC", desc:"Visor de Inventarios Ciclicos", path:"ciclicos" },
      { id:3, name:"Tickets", alias:"MOD", desc:"Moviemientos para  Tickets", path:"modificaciones"},
      { id:4, name:"Pagos", alias:"PAG", desc:"Consulta de pagos", path:"pagos"},
      { id:5, name:"Ventas", alias:"REP", desc:"ConsultaVentas", path:"sales"}
    ]
  }),

  getters: {
    findByNick (state) { // se usa para el inicio de sesion
      return (nick) => state.users.find( u => u.credentials.nick==nick );
    },
    authsCashiers (state) {
      return state.modules.filter((m) => m.id <= 2)
    },
    authsAux (state) {
      return state.modules.filter((m) => m.id <= 4)
    }
  },

  actions: {
    setSession (data) { this.session = data; },
    sessionDestroy () { this.session = null; LocalStorage.remove("auth"); }
  }
})
