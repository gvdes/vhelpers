import { defineStore } from 'pinia'

export const clientStore = defineStore('clients', {
  state: () => ({
    clients:[],
    workpoints:[],
    title:null,
    showOption:false,
    creditsSuc:[],
    valWorkpoint:null,
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    setClient(data){
      this.clients = data
    },
    setTitle(data){
      this.title = data
    },
    setWorkpoint(data){
      this.workpoints = data
    },
    setShowOption(data){
      this.showOption = data
    },
    setCreditSuc(data){
      this.creditsSuc = data
    },
    setValWorkpoint(data){
      this.valWorkpoint = data
    }
  }
})
