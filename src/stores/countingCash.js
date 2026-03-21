import { defineStore } from 'pinia'

export const useCounterStore = defineStore('layout', {
  state: () => ({
    title:null,
    tabs:{
      val:null,
      opts:[]
    },
    printers:[],
    date:null
  }),

  getters: {
  },

  actions: {
    setTitle(data){
      this.title = data
    },
    setTabVal(data){
      this.tabs.val = data
    },
    setTabOpts(data){
      this.tabs.opts = data
    },
    setDate(data){
      this.date = data
    },
    setPrinters(data){
      this.printers = data
    }
  }
})
