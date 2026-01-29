import { defineStore } from 'pinia'
import { useVDBStore } from 'stores/VDB';
const VDB = useVDBStore()

export const WpStore = defineStore('stores', {
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
