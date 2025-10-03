import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { useQuasar, LocalStorage, Notify } from 'quasar'
import { useRoute, useRouter } from "vue-router";
const $router = useRouter()


//conexion vizapi
const vizapi = axios.create({ baseURL: 'http://192.168.10.189/vizapi/public/LVH' });
// const vizapi = axios.create({ baseURL: 'http://192.168.10.160:1619/vizapi/public/LVH' });
// const vizapi = axios.create({ baseURL: 'http://192.168.1.80:1619/vizapi/public/LVH' });

//conexion Assist
// const assist = axios.create({ baseURL: 'http://192.168.10.61:1619/Assist/public/api' });
// const assist = axios.create({ baseURL: 'http://192.168.10.160:1920/Assist/public/api' });
const assist = axios.create({ baseURL: 'http://192.168.10.238:2902/Assist/public/api'});
const vizmedia = `https://mersbock.s3.us-east-2.amazonaws.com/vhelpers`;

// assist.interceptors.response.use(
//   response => response,
//   error => {
//     console.log(error);
//     if (error.response && error.response.status === 401) {
//       if (error.response.data === "Token expired.") {
//         LocalStorage.remove('auth')
//         Notify.create({ message: 'Tu sesion Expiro favor de ingresar de nuevo', type: 'negative', position: 'bottom' })
//         $router.push('/auth')
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = vizapi
  app.config.globalProperties.$assist = assist
})

export { vizapi, assist, vizmedia }
