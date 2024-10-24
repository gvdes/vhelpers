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
      { id:3, name:"Tarjetas", alias:"TRJ", desc:"Visor de Tarjetas", path:"tarjetas" },
      { id:4, name:"Etiquetas", alias:"ETQ", desc:"Creacion de etiquetas", path:"labels" },
      { id:5, name:"Tickets", alias:"MOD", desc:"Moviemientos para  Tickets", path:"modificaciones"},
      { id:6, name:"Pagos", alias:"PAG", desc:"Consulta de pagos", path:"pagos"},
      { id:7, name:"Apertura", alias:"APC", desc:"Apertura de cajas", path:"apertura"},
      { id:8, name:"Vales", alias:"VL", desc:"Creacion de Vales", path:"vale"},
      // { id:9, name:"Depositos", alias:"DPTS", desc:"Aprobacion de Depositos", path:"deposits/forms"},
      { id:9, name:"Traspasos", alias:"TRP", desc:"Traspasos entre almacenes", path:"transfers"},
      { id:10, name:"Comparativos", alias:"Com", desc:"Comparativos", path:"compare"},
      { id:11, name:"Ventas", alias:"REP", desc:"ConsultaVentas", path:"sales"},
      { id:50, name:"Tarjetas", alias:"TRJS", desc:"Consulta Tarjetas Sucursales", path:"cardStores"},
      // { id:51, name:"Depositos", alias:"DPTS", desc:"Aprovacion de Depositos", path:"deposits/confirm"},
      { id:52, name:"Revision de Cajas", alias:"RDC", desc:"Revision Cajas Abiertas", path:"openbox"},
      { id:100, name:"Ventas", alias:"VS", desc:"Ventas Sucursales", path:"stores"},
    ]
  }),

  getters: {
    findByNick (state) { // se usa para el inicio de sesion
      return (nick) => state.users.find( u => u.credentials.nick==nick );
    },
    authsCashiers (state) {
      return state.modules.filter((m) => m.id <= 4)
    },
    authsSeller (state) {
      return state.modules.filter((m) => m.id == 4)
    },
    authsAux (state) {
      return state.modules.filter((m) => m.id <= 10)
    },
    authGen(state){
      return state.modules.filter((m) => m.id <= 11)
    },
    autAud(state){
      return state.modules.filter((m) => m.id <= 11)
    },
    autRoot(state){
      return state.modules.filter((m) => m.id <= 1000)
    },
    authAdm(state){
      return state.modules.filter((m) => m.id >= 50 && m.id < 100)
    }
  },

  actions: {
    setSession (data) {
      this.session = data;
      LocalStorage.set("auth", data);
     },
    sessionDestroy () { this.session = null; LocalStorage.remove("auth"); }
  }
})
