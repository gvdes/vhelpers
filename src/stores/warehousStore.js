import { defineStore } from 'pinia'

export const useWarehouse = defineStore('layout', {
  state: () => ({
    title:null
  }),

  getters: {
  },

  actions: {
    setTitle(data){
      this.title = data
    },
  }
})
