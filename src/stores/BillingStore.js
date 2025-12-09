import { defineStore } from 'pinia'

export const useBillingStore = defineStore('layout', {
  state: () => ({
    showToolbar:false
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2
  //   }
  // },

  actions: {
    setShowToolbar(data){
      this.showToolbar = data
    }
  }
})
