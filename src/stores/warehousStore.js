import { defineStore } from 'pinia'

export const useWarehouse = defineStore('layout', {
  state: () => ({
    title:null,
    showReportLocations:false,
    showReportMinMax:false,
    showOptions:false,
    stores:[],
    warehouses:[],
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
    setshowOptions(data){
      this.showOptions = data
    },
    setshowReportLocations(data){
      this.showReportLocations = data
    },
    setWarehouse(data){
      this.warehouses = data
    },
    setStore(data){
      this.stores=data
    }
  }
})
