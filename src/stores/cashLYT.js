import { defineStore } from 'pinia'

export const useLayoutCash = defineStore('layout', {
  state: () => ({
    title: 'Cajas',
    cash:null,
    date: null,
    showtoolbar: false,
    dialogModule: null,
    rules:[],
    methods:[],
    providers:[],
    clients:[],
    promotion:[],
    init:false,
    modules: [
      { id: 1, name: 'Retiradas de Efectivo', description: 'Realiza Retiradas', icon: "payments" },
      // { id: 2, name: 'Ingresos', description: 'Ingresos de efectivo', icon: "transit_enterexit" },
      { id: 3, name: 'Reimpresiones de Tickets', description: 'Realiza Reimpresion', icon: "print" },
      // { id: 4, name: 'Rutilizar Documento', description: 'Reutilizar Documento', icon: "autorenew" },
      { id: 5, name: 'Cierre de Caja', description: 'Realiza Cierre', icon: "logout" },
      // { id: 6, name: 'Devoluciones', description: 'Devoluciones de tickets', icon: "money_off" },
      // { id: 7, name: 'Modificaciones', description: 'Modificaciones de ticket', icon: "edit_note" },
      // { id: 8, name: 'Consulta', description: 'Consulta de tickets', icon: "query_stats" },
      // { id: 9, name: 'Crear Vales', description: 'Vales', icon: "confirmation_number" },
    ]
  }),
  getters: {
    modulesCashier (state) {
      return state.modules.filter((m) => m.id <= 5)
    },
    modulesAdmin (state) {
      return state.modules.filter((m) => m.id <= 8)
    },
    modulesRoot (state) {
      return state.modules.filter((m) => m.id <= 9)
    },
  },

  actions: {
    setTitle(show) {
      this.title = show;
    },
    setCash(newTitle) {
      this.cash = newTitle;
    },
    setshowtoolbar(show) {
      this.showtoolbar = show;
    },
    setDate(show) {
      this.date = show;
    },
    openDialogModule(moduleId) {
      this.dialogModule = moduleId;
    },
    closeDialogModule() {
      this.dialogModule = null;
    },
    setRules(rules){
      this.rules = rules;
    },
    setMethods(methods){
      this.methods = methods;
    },
    setProviders(provider){
      this.providers = provider;
    },
    setClients(client){
      this.clients = client;
    },
    setPromotion(promotion){
      this.promotion = promotion;
    }
  }
})
