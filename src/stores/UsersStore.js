import { defineStore } from 'pinia'

export const UserStore = defineStore('users', {
  state: () => ({
    title: null,
    showBtns: false,
  }),

  getters: {

  },

  actions: {
    setTitle(data){
      this.title = data
    },
  }
})
