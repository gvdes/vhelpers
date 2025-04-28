import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    title: 'Pedidos Insumos',
    showCreateButton: true,
    showOrders:true
  }),
  actions: {
    setTitle(newTitle) {
      this.title = newTitle;
    },
    setShowCreateButton(show) {
      this.showCreateButton = show;
    },
    setShowOrders(show) {
      this.showOrders = show;
    }
  }
});
