import { defineStore } from 'pinia'
import { Notify } from 'quasar'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('favorites')) || []
  }),

  getters: {
    isFavorite: (state) => (path) =>
      state.items.some(f => f.path === path)
  },

  actions: {
    toggle(module) {
      const index = this.items.findIndex(f => f.path === module.path)
      if (index >= 0) {
        this.items.splice(index, 1)
        localStorage.setItem('favorites', JSON.stringify(this.items))
        return
      }
      if (this.items.length >= 5) {
        Notify.create({
          type: 'warning',
          message: 'Solo puedes tener 5 favoritos ⭐'
        })
        return
      }
      this.items.push({
        name: module.name,
        path: module.path,
        desc: module.desc
      })

      localStorage.setItem('favorites', JSON.stringify(this.items))
    }
  }
})
