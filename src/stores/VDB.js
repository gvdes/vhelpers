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
      // { id:2, name:"Devoluciones", alias:"DEV", desc:"Realice devoluciones totales o parciales de un ticket", path:"devoluciones" }
    ]
  }),

  getters: {
    findByNick (state) {
      return (nick) => state.users.find( u => u.credentials.nick==nick );
    },
  },

  actions: {
    setSession (data) { this.session = data; },
    sessionDestroy () { this.session = null; LocalStorage.remove("auth"); }
  }
})
