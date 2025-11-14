import { defineStore } from 'pinia'

export const catalogStore = defineStore('catalog', {
  state: () => ({
    title:null,
    order:null,
    orderState:false,
    requisitionState:false,
    requisition:null,
    printers:{
      val:null,
      opts:[]
    }
  }),

  getters: {

  },

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
    },



    setRequisitionState(data){
      this.requisitionState = data
      this.saveRequisition()
    },
    setRequisition(data) {
      this.requisition = data
      if (!this.requisition.products) this.requisition.products = []
      this.requisitionState = true
      this.saveRequisition()
    },
    saveRequisition() {
      localStorage.setItem('catalog_requisition', JSON.stringify(this.requisition))
    },
    loadRequisition() {
      const saved = localStorage.getItem('catalog_requisition')
      // console.log(saved)
      if (saved) {
        const parsed = JSON.parse(saved)
        this.requisition = parsed
        if (!this.requisition.products) this.requisition.products = []
        this.requisitionState = true
      }
    },
    pushProductRequisition(product) {
      this.requisition.products.push(product)
      this.saveRequisition()
    },
    updateProductRequisition(updatedProduct) {
      const index = this.requisition.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) this.requisition.products[index] = updatedProduct
      this.saveRequisition()
    },
    removeProductRequisition(productId) {
      this.requisition.products = this.requisition.products.filter(p => p.id !== productId)
      this.saveRequisition()
    },
    clearRequisition() {
      this.requisition = { products: [] }
      this.requisitionState = false
      localStorage.removeItem('catalog_requisition')
    },
  }

})
