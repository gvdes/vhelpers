import { defineStore } from 'pinia'

export const useBillingStore = defineStore('layout', {
  state: () => ({
    showToolbar:false,
    stores:[],
    billing:[],
    cfdi:[]
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2
  //   }
  // },

  actions: {
    setShowToolbar(data){
      this.showToolbar = data
    },
    setStores(data){
      this.stores = data
    },
    setcfdi(data){
      this.cfdi = data
    }
  }
})
