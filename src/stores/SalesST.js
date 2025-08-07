import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    stores:[],
    today:null,
    lastday:null,
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    setStores (data) {
      this.stores = data
    },
    setToday(data){this.today = data},
    setLastday(data){this.lastday = data},

  }
})
