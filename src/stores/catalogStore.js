import { defineStore } from 'pinia'

export const catalogStore = defineStore('catalog', {
  state: () => ({
    title:null,
    order:null,
    orderState:false,
    printers:{
      val:null,
      opts:[]
    }
  }),

  getters: {

  },

  // actions: {
  //   setTitle(data) {
  //     this.title = data
  //   },
  //   setOrder(data){
  //     this.order = (data)
  //   },
  //   setOrderState(data){
  //     this.orderState = data
  //   },
  //   pushProduct(product) {
  //     this.order.products.push(product)
  //   },
  //   updateProduct(updatedProduct) {
  //     const index = this.order.products.findIndex(p => p.id === updatedProduct.id)
  //     if (index !== -1) this.order.products[index] = updatedProduct
  //   },
  //   removeProduct(productId) {
  //     this.order.products = this.order.products.filter(p => p.id !== productId)
  //   },
  //   saveOrder() {
  //     localStorage.setItem('catalog_order', JSON.stringify(this.order))
  //   },
  //   loadOrder() {
  //     const saved = localStorage.getItem('catalog_order')
  //     if (saved) {
  //       const parsed = JSON.parse(saved)
  //       this.order = parsed
  //       this.orderState = true
  //     }
  //   },
  //   clearOrder() {
  //     this.order = { products: [] }
  //     this.orderState = false
  //     localStorage.removeItem('catalog_order')
  //   }
  // }
   actions: {
    setTitle(data) {
      this.title = data
    },
    setOrder(data) {
      this.order = data
      if (!this.order.products) this.order.products = []
      this.orderState = true
      this.saveOrder()
    },
    setOrderState(data) {
      this.orderState = data
      this.saveOrder()
    },
    pushProduct(product) {
      this.order.products.push(product)
      this.saveOrder()
    },
    updateProduct(updatedProduct) {
      const index = this.order.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) this.order.products[index] = updatedProduct
      this.saveOrder()
    },
    removeProduct(productId) {
      this.order.products = this.order.products.filter(p => p.id !== productId)
      this.saveOrder()
    },
    saveOrder() {
      localStorage.setItem('catalog_order', JSON.stringify(this.order))
    },
    loadOrder() {
      const saved = localStorage.getItem('catalog_order')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.order = parsed
        if (!this.order.products) this.order.products = []
        this.orderState = true
      }
    },
    setPrinters(data){
      this.printers.val = data
    },
    clearOrder() {
      this.order = { products: [] }
      this.orderState = false
      localStorage.removeItem('catalog_order')
    }
  }

})
