import { defineStore } from 'pinia'

export const useOperationStore = defineStore('layout', {
  state: () => ({
    title: null,
    tab: 'all',
    params:null,
    stores:[],
    zones:[],
  }),

  getters: {
    filterReport: (state) => {
      if (state.tab === 'global') return stores
      return state.filter(p => p._zone === state.tab)
    }
  },

  actions: {
    setTitle(data) {
      this.title = data
    },
    setTab(data) {
      this.tab = data
    },
    setStores(data){
      this.stores = data
    },
    setParams(data){
      this.params = data
    },
    setZones(data){
      this.zones = data
    }
  }
})
