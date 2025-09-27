import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

//conexion vizapi
// const vizapi = axios.create({ baseURL: 'http://192.168.10.189/vizapi/public/LVH' });
const vizapi = axios.create({ baseURL: 'http://192.168.10.160:1619/vizapi/public/LVH' });
// const vizapi = axios.create({ baseURL: 'http://192.168.1.80:1619/vizapi/public/LVH' });
// const vizapi = axios.create({ baseURL: 'http://192.168.12.114:1619/vizapi/public/LVH' });

//conexion Assist
// const assist = axios.create({ baseURL: 'http://192.168.10.61:1619/Assist/public/api' });
const assist = axios.create({ baseURL: 'http://192.168.10.160:1920/Assist/public/api'});
// const assist = axios.create({ baseURL: 'https://f8t8pzj4-1920.usw3.devtunnels.ms/Assist/public/api'});
// const assist = axios.create({ baseURL: 'http://192.168.1.80:1920/Assist/public/api'});
// const assist = axios.create({ baseURL: 'http://192.168.12.114:1920/Assist/public/api'});
// const assist = axios.create({ baseURL: 'http://192.168.10.238:2902/Assist/public/api'});
const vizmedia = `https://mersbock.s3.us-east-2.amazonaws.com/vhelpers`;



export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = vizapi
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$assist = assist
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { vizapi, assist, vizmedia }
