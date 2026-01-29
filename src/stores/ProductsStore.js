
import { defineStore } from 'pinia'

export const useProductStore = defineStore('layout', {
  state: () => ({
    title: null,
    categories: [],
    providers: [],
    reference: ['NUEVO', 'OFERTA'],
    makers: [],
    unitsMeasure: [],
    productRe: ['SI', 'NO'],
    attributes: [],
    states: [],

  }),

  getters: {
    // doubleCount (state) {
    //   return state.counter * 2
    // }

  },

  actions: {
    setTitle(data) { this.title = data },
    setCategories(data) { this.categories = data },
    setProviders(data) { this.providers = data },
    setMakers(data) { this.makers = data },
    setUnits(data) { this.unitsMeasure = data },
    setAttributes(data) { this.attributes = data },
    setStates(data) { this.states = data },

    createOrUpdateCategory(payload) {
      let inx = this.categories.findIndex(e => e.id == payload.id)
      if (inx >= 0) {
        this.categories.splice(inx, 1, payload);
      } else {
        this.categories.push(payload)
      }
    },
  }
})
