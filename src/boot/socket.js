import { boot } from 'quasar/wrappers'
import { io } from "socket.io-client";

// const URLSocket = 'http://localhost:7171/';
const URLSocket = 'http://192.168.10.189:4444';
// const URLSocket = 'http://localhost:4141';
// const URLSocket = 'http://192.168.10.238:4141';
// const URLSocket = 'http://192.168.10.160:4141';


const $sktRestock = io(`${URLSocket}/resurtidos`,{autoConnect:false});
const $sktOrders = io(`${URLSocket}/preventa`,{autoConnect:false});
const $sktCounters = io(`${URLSocket}/counters`,{autoConnect:false});



export { $sktRestock, $sktOrders, $sktCounters }
