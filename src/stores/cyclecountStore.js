import { defineStore } from 'pinia'
import { useVDBStore } from 'stores/VDB';
const VDB = useVDBStore()

export const cyclecountStore = defineStore('cyclecount', {
  state: () => ({
    title: null,
    showBtns: false,
    cyclecounts: [],
    users: [],
    sections: [],
    locations: [],
    lockedProducts: {},
    currentLockedProduct: null
  }),

  getters: {
    socket_user(state) {
      const creds = VDB.session.credentials;
      const store = VDB.session.store;
      if (!creds || !creds.staff) return null;
      return {
        profile: {
          me: {
            id: creds.staff.id_va,
            nick: creds.nick,
            picture: '',
            names: creds.staff.complete_name,
            surname_pat: '',
            surname_mat: '',
            change_password: false,
            _rol: creds._rol
          },
          workpoint: store
        },
        workpoint: store,
        // room: getRoom(creds._rol)
      }
    }
  },

  actions: {
    settitle(data) {
      this.title = data
    },
    setshowBtns(data) {
      this.showBtns = data
    },
    setCyclecount(data) {
      this.cyclecounts = data
    },
    addCyclecount(data) {
      this.cyclecounts.push(data)
    },
    setUsers(data) {
      this.users = data
    },
    setSections(data) {
      this.sections = data
    },
    setLocations(data) {
      this.locations = data
    },
    lock(productId, data) {
      this.lockedProducts[productId] = data
    },
    unlock(productId) {
      delete this.lockedProducts[productId]
    },
    updateLockedProduct(product) {
      this.currentLockedProduct = product
      delete this.lockedProducts[product.id]
    },
    updateCyclecounts(cyclecount){
      let inx = this.cyclecounts.findIndex(e => e.id == cyclecount.id)
      if(inx >= 0){
        this.cyclecounts[inx] = cyclecount
      }
    }
  }
})
