import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar';
import { assist, assistOrd } from "src/boot/axios";
import { useVDBStore } from 'stores/VDB'


// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  const VDB = useVDBStore();

  // router.beforeEach((to, from, next) => {
  //   // console.log("Validando autenticacion...");4
  //   let auth = LocalStorage.getItem("auth");
  //   if (auth) {
  //     // console.log("ya hay autenticacion");
  //     let token = LocalStorage.getItem("auth").token
  //     assist.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  //     VDB.setSession(auth);
  //     // console.log(to.path);
  //     if (to.path != '/auth') { next(); } else { next('/launcher'); }
  //   } else {
  //     // console.log("Porfavor inicie sesion");
  //     to.path == "/auth" ? next() : next('/auth');
  //   }
  // })

  router.beforeEach((to, from, next) => {
    let auth = LocalStorage.getItem("auth");
    if (to.meta.requiresAuth === false) {
      return next();
    }
    if (auth) {
      let token = auth.token;
      assist.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      assistOrd.defaults.headers.common['Authorization'] = 'Bearer ' + token;

      VDB.setSession(auth);

      if (to.path !== '/auth') {
        next();
      } else {
        next('/launcher');
      }
    } else {
      to.path === '/auth' ? next() : next('/auth');
    }
  });

})
