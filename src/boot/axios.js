import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage } from 'quasar'

const ipAssist = 'http://192.168.10.160:1920'

// const ipAssist = 'http://192.168.10.238:2902'ESTEYANO

// const ipAssist = 'http://192.168.10.189:1920'

// const ipAssist = 'https://vhelpers.grupovizcarra.mx/assist'

// const assist = axios.create({ baseURL: `${ipAssist}/assist/public/api` });
// const assist = axios.create({ baseURL: `${ipAssist}` });
const assist = axios.create({ baseURL: `${ipAssist}/Assist/public/api` });
// const assist = axios.create({ baseURL: `${ipAssist}/api/api/` });


const vizmedia = `https://mersbock.s3.us-east-2.amazonaws.com/vhelpers`;

// export default boot(({ router }) => {
//   // Interceptor de assist
//   assist.interceptors.response.use(
//     response => response,
//     error => {
//       if (!error.response) {
//         console.error('Servidor no disponible o network error:', error.message)
//         alert('El servidor no está disponible. Verifica tu conexión o intenta más tarde.')
//         return Promise.reject(error)
//       }
//       if (error.response && error.response.status === 401) {
//         if (error.response.data === "Token expired.") {
//           LocalStorage.clear('auth')
//           alert('Tu sesión expiró, favor de ingresar de nuevo')
//           router.push('/auth')
//         } else if (error.response.data.error === "Acceso denegado") {
//           LocalStorage.clear('auth')
//           alert('Ya no puedes ingresar a la aplicacion');
//           router.push('/auth')
//         }
//       } else if (error.response && error.response.status === 403) {
//         if (error.response.data.error === "Acceso denegado: IP no permitida") {
//           LocalStorage.clear('auth')
//           alert('Te estas conectando fuera de tu VPN')
//           router.push('/auth')
//         }
//       }
//       return Promise.reject(error)
//     }
//   )
// })
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
      if (status === 401 || status === 403) {

        if (!redirecting) {
          redirecting = true
          LocalStorage.remove('auth')
          let msg = 'Tu sesión finalizó, vuelve a iniciar sesión'

          if (data?.error === 'Acceso denegado') {
            msg = 'Tu usuario ya no tiene acceso a la aplicación'
          }

          if (data?.error === 'Acceso denegado: IP no permitida') {
            msg = 'Te estás conectando fuera de tu VPN'
          }
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
