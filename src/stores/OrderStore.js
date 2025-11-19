import { defineStore } from 'pinia'

export const useOrderStore = defineStore('layout', {
  state: () => ({
    title:null,
    orders:[],
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2
  //   }
  // },

  actions: {
    setTitle (data) { this.title=data },
    setOrders (data) { this.orders=data },
  }
})
