import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar';
import udb from 'src/API/udb.json';

export const useVDBStore = defineStore('vdb', {
  state: () => ({
    session:null,
    users:udb,
    series:[1,2,3,4,5,6,7,8,9],
    modules:[],
    stores:[],
  }),

  getters: {
    findByNick (state) { // se usa para el inicio de sesion
      return (nick) => state.users.find( u => u.credentials.nick==nick );
    },
    // authsCashiers (state) {
    //   return state.modules.filter((m) => m.id <= 4)
    // },
    // authsSeller (state) {
    //   return state.modules.filter((m) => m.id == 4)
    // },
    // authsFloor (state) {
    //   return state.modules.filter((m) => m.id == 4 || m.id == 5 || m.id == 6)
    // },
    // authsAux (state) {
    //   return state.modules.filter((m) => m.id <= 16)
    // },
    // authsWarehouseman (state) {s
    //   return state.modules.filter((m) => m.id == 13 || m.id == 5|| m.id == 11  )
    // },
    // authGen(state){
    //   return state.modules.filter((m) => m.id <= 18)
    // },
    // autAud(state){
    //   return state.modules.filter((m) => m.id <= 20)
    // },
    // autRoot(state){
    //   return state.modules.filter((m) => m.id <= 1000)
    // },
    // authAdm(state){
    //   return state.modules.filter((m) => m.id >= 50 && m.id < 100)
    // },
    // authdir(state){
    //   return state.modules.filter((m) => m.id == 100)
    // },
    // authrrhh(state){
    //   return state.modules.filter((m) => m.id == 17)
    // }
  },

  actions: {
    setSession (data) {
      this.session = data;
      LocalStorage.set("auth", data);
     },
     setModules(data) {
      this.modules = data
     },
      setStores(data) {
      this.stores = data
     },
    sessionDestroy () { this.session = null; LocalStorage.remove("auth"); }
  }
})
