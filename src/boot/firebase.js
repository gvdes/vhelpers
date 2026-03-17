// import { boot } from 'quasar/wrappers'
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage} from 'firebase/messaging'
// const firebaseConfig = {
//   apiKey: "AIzaSyAYG45-tckIslCQTM6U9DZGOoZPVIqqXwM",
//   authDomain: "notificationsdeposits.firebaseapp.com",
//   projectId: "notificationsdeposits",
//   storageBucket: "notificationsdeposits.appspot.com",
//   messagingSenderId: "216447915873",
//   appId: "1:216447915873:web:895bf0e5bded30c7e11720"
// };

// const app = initializeApp(firebaseConfig)
// const messaging = getMessaging(app)

// export async function requestPermission () {
//   const permission = await Notification.requestPermission()
//   if (permission === 'granted') {
//     const token = await getToken(messaging, {
//       vapidKey: 'BKOl59dEU3phWwes2-ks5CjiEg7phkdu7jTogZvieApMU7hY0mzx9aR7c9s69aBkGiMC3xETSmWrFyP-msM0mGo'
//     })
//     console.log('✅ Token FCM:', token)
//     return token
//   } else {
//     console.warn('🚫 Permiso de notificaciones denegado')
//   }
// }

// // Escucha mensajes en primer plano (app abierta)
// onMessage(messaging, async (payload) => {
//   console.log('📩 Notificación recibida (foreground):', payload)

//   // Aseguramos permisos
//   if (Notification.permission === 'default') {
//     await Notification.requestPermission()
//   }

//   // Si el permiso fue otorgado, mostramos la notificación
//   if (Notification.permission === 'granted') {
//     new Notification(payload.notification.title, {
//       body: payload.notification.body,
//       icon: '/icons/favicon-96x96.png' // puedes poner otro icono
//     })
//   } else {
//     console.warn('🔕 Permiso de notificación no concedido')
//   }
// })
