import { defineStore } from 'pinia'

export const useProductStore = defineStore('layout', {
  state: () => ({
    title:null,
    categories:[],
    providers:[],
    reference:['NUEVO','OFERTA'],
    makers:[],
    unitsMeasure:[],
    productRe:['SI','NO'],
    MedidasPers:[],
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2
  //   }
  // },

  actions: {
    setTitle (data) { this.title=data },
    setCategories (data) { this.categories=data },
    setProviders (data) { this.providers=data },
    setMakers (data) { this.makers=data },
    setUnits (data) { this.unitsMeasure=data },
    setPersons (data) { this.MedidasPers=data },
  }
})
