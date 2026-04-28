import { defineStore } from 'pinia'
import Justification from 'src/pages/Assist/justification.vue'

export const AssistStore = defineStore('users', {
  state: () => ({
    title: null,
    showBtns: false,
    showSanctBtns: false,
    users:[],
    justificationTypes:[],
    Justifications:[],
    payments:[],
    states:[]
  }),

  getters: {

  },

  actions: {
    setTitle(data){
      this.title = data
    },
    setShowBtns(data){
      this.showBtns = data
    },
    setshowSanctBtns(data){
      this.showSanctBtns = data
    },
    setUsers(data){
      this.users = data
    },
    setJustifications(data){
      this.Justifications = data
    },
    setTypeJST(data){
      this.justificationTypes = data
    },
    setPayments(data){
      this.payments = data
    },
    setStates(data){
      this.states = data
    },
    addJustification(data){
      this.Justifications.push(data)
    },
    updateJustification(data){
      let inx = this.Justifications.findIndex(e => e.id == data.id);
      if(inx >= 0){
        this.Justifications.splice(inx,1,data)
      }
    },
  }
})
