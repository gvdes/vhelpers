import { defineStore } from 'pinia'

export const useWarehouse = defineStore('layout', {
  state: () => ({
    title:null,
    showReportLocations:false,
    showReportMinMax:false,
  }),

  getters: {
  },

  actions: {
    setTitle(data){
      this.title = data
    },
    setshowReportMinMax(data){
      this.showReportMinMax = data
    },
    setshowReportLocations(data){
      this.showReportLocations = data
    },
  }
})
