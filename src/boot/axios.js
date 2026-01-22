import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage } from 'quasar'

// const ipAssist = 'http://192.168.10.160:1920'
const ipAssist = 'http://192.168.1.86:1920'


// const ipAssist = 'http://192.168.10.238:2902'ESTEYANO

// const ipAssist = 'http://192.168.10.189:1920'

// const ipAssist = 'https://vhelpers.grupovizcarra.mx/assist'

// const assist = axios.create({ baseURL: `${ipAssist}/assist/public/api` });
// const assist = axios.create({ baseURL: `${ipAssist}` });
const assist = axios.create({ baseURL: `${ipAssist}/Assist/public/api` });
// const assist = axios.create({ baseURL: `${ipAssist}/api/api/` });


const vizmedia = `https://mersbock.s3.us-east-2.amazonaws.com/vhelpers`;

let redirecting = false
export default boot(({ router }) => {

  assist.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
        alert('El servidor no está disponible. Intenta más tarde.')
        return Promise.reject(error)
      }
      const { status, data } = error.response
      if (status == 401 || status === 403) {
        if (!redirecting) {
          redirecting = true
          localStorage.clear()
          let msg = data.error
          alert(msg)

          router.replace('/auth').finally(() => {
            redirecting = false
          })
        }
      }
      return Promise.reject(error)
    }
  )
})

export { assist, vizmedia }
