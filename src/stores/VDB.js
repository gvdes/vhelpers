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
    findByNick(state) {
      return (nick) => state.users.find(u => u.credentials.nick == nick);
    },
    permission: (state) => {
      return (moduleId) => {
        const mod = state.modules.find(m => m.id === moduleId)
        return mod?.pivot._permission == 2 ? true : false
      }
    },

    // canEdit: (state) => {
    //   return (moduleId) => {
    //     const mod = state.modules.find(m => m.id === moduleId)
    //     return mod?.permission === 1
    //   }
    // },
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
    sessionDestroy() { this.session = null; LocalStorage.clear() }
  }
})
