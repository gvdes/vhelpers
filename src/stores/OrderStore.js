import { defineStore } from 'pinia'

export const useOrderStore = defineStore('layout', {
  state: () => ({
    title: null,
    orders: [],
  }),

  // getters: {
  //   doubleCount (state) {
  //     return state.counter * 2
  //   }
  // },

  actions: {
    setTitle(data) { this.title = data },
    setOrders(data) { this.orders = data },
    addOrUpdate(data) {
      let idx = this.orders.findIndex(o => o.id == data.order.id);
      console.log(idx);
      if (idx < 0) {
        console.log(
          'se va a agregar brou'
        )
        this.orders.push(data.order);
        // return "a";
      } else {
        console.log('se va a modificar brou ')
        if (data.newstate) {
          this.orders[idx]._status = data.newstate.id;
          this.orders[idx].status = data.newstate;
        }
      }
    },
  }
})
