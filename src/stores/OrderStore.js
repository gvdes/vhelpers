
import { defineStore } from 'pinia'
import { useVDBStore } from 'stores/VDB';
const VDB = useVDBStore()
const getRoom = (rol) => {
  switch (rol) {
    case 1:
    case 2:
    case 6:
      return 'admins';

    case 8:
      return 'sales';

    case 4:
    case 24:
    case 28:
      return 'supply';

    default:
      return 'sales';
  }
}

export const useOrderStore = defineStore('layout', {

  state: () => ({
    title: null,
    orders: [],
    units: {
      opts: [],
      val: null
    },
    printers: {
      opts: [],
      val: null
    },
    users:[],
    rules: [],
    process:[],
    showLyt: true,
    showEvent:false,
  }),

  getters: {
    socket_user(state) {
      const creds = VDB.session.credentials;
      const store = VDB.session.store;

      if (!creds || !creds.staff) return null;

      return {
        profile: {
          me: {
            id: creds.staff.id_va,
            nick: creds.nick,
            picture: '',
            names: creds.staff.complete_name,
            surname_pat: '',
            surname_mat: '',
            change_password: false,
            _rol: creds._rol
          },
          workpoint: store
        },
        workpoint: store,
        room: getRoom(creds._rol)
      }
    }
  },

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
    setshowLyt(data) {
      this.showLyt = data
    },
    setPrinters(data) {
      this.printers.opts = data
    },
    setRules(data) {
      this.rules = data
    },
    setUnits(data) {
      this.units.opts = data;
      this.units.val = data.find(e => e.id == 1)
    },
    setUsers(data){
      this.users = data
    },
    setProcess(data){
      this.process = data
    },
    setShowEvent(data){
      this.showEvent = data
    }
  }
}
)
