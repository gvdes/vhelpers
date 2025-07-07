import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar';
import udb from 'src/API/udb.json';

export const useVDBStore = defineStore('vdb', {
  state: () => ({
    session: null,
    users: udb,
    series: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    modules: [],
    modulesLoaded: false, // <-- flag
    stores: [],
  }),

  getters: {
    findByNick(state) { // se usa para el inicio de sesion
      return (nick) => state.users.find(u => u.credentials.nick == nick);
    },
  },

  actions: {
    setSession(data) {
      this.session = data;
      LocalStorage.set("auth", data);
    },
    setModules(data) {
      LocalStorage.set('modules', data);
      this.modules = data;
    },
    setStores(data) {
      this.stores = data
    },
    async loadModules() {
      const savedModules = LocalStorage.getItem('modules') || [];
      this.modules = savedModules;
      this.modulesLoaded = true;
    },
    sessionDestroy() { this.session = null; LocalStorage.remove("auth"); LocalStorage.remove('modules') }
  }
})
