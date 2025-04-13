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
      { id:5, name:"Pedidos", alias:"PDT", desc:"Pedidos Automaticos por Familia", path:"requisition" },
      { id:6, name:"Cambios Precios", alias:"CPP", desc:"Cambios de precios de productos", path:"changePrices" },
      { id:7, name:"Tickets", alias:"MOD", desc:"Moviemientos para  Tickets", path:"modificaciones"},
      { id:8, name:"Pagos", alias:"PAG", desc:"Consulta de pagos", path:"pagos"},
      { id:9, name:"Apertura", alias:"APC", desc:"Apertura de cajas", path:"apertura"},
      { id:10, name:"Vales", alias:"VL", desc:"Creacion de Vales", path:"vale"},
      // { id:9, name:"Depositos", alias:"DPTS", desc:"Aprobacion de Depositos", path:"deposits/forms"},
      { id:11, name:"Traspasos", alias:"TRP", desc:"Traspasos entre almacenes", path:"transfers"},
      { id:12, name:"Comparativos", alias:"Com", desc:"Comparativos", path:"compare"},
      { id:13, name:"Verificacion de tickets", alias:"VTCK", desc:"Verificador de tickets", path:"checkout"},
      { id:14, name:"Presupuestos", alias:"PRS", desc:"Creador Presupuestos", path:"budgets"},
      { id:15, name:"Ventas", alias:"REP", desc:"ConsultaVentas", path:"sales"},
      // { id:16, name:"Asistencias", alias:"ASIS", desc:"Consulta de asistencias", path:"assist"}, se puede usar sin pdos
      { id:17, name:"Ofertas", alias:"OFT", desc:"Cobros de ofertas", path:"offers"},
      { id:50, name:"Tarjetas", alias:"TRJS", desc:"Consulta Tarjetas Sucursales", path:"cardStores"},
      // { id:51, name:"Depositos", alias:"DPTS", desc:"Aprovacion de Depositos", path:"deposits/confirm"},
      { id:52, name:"Revision de Cajas", alias:"RDC", desc:"Revision Cajas Abiertas", path:"openbox"},
      { id:53, name:"Reporte de Cajas", alias:"RPC", desc:"Reporte de cajas", path:"boxesreport"},
      { id:54, name:"Corte de Cajas", alias:"CDC", desc:"Cortes de Cajas", path:"cortBoxes"},
      { id:55, name:"Tickets", alias:"TPRT", desc:"Tickets Sucursales", path:"tcksPrit"},
      // { id:56, name:"Retiradas", alias:"RTRD", desc:"Gestion De Retiradas", path:"withdrawals"},

      // { id:99, name:"Reporte", alias:"RPT", desc:"Reporte Stock", path:"stocks"},
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
    authsFloor (state) {
      return state.modules.filter((m) => m.id == 4 || m.id == 5 || m.id == 6)
    },
    authsAux (state) {
      return state.modules.filter((m) => m.id <= 14)
    },
    authsWarehouseman (state) {
      return state.modules.filter((m) => m.id == 11 || m.id == 5  )
    },
    authGen(state){
      return state.modules.filter((m) => m.id <= 17)
    },
    autAud(state){
      return state.modules.filter((m) => m.id <= 17)
    },
    autRoot(state){
      return state.modules.filter((m) => m.id <= 1000)
    },
    authAdm(state){
      return state.modules.filter((m) => m.id >= 50 && m.id < 100)
    },
    authdir(state){
      return state.modules.filter((m) => m.id == 100)
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
