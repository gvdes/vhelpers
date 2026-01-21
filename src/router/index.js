import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useVDBStore } from 'stores/VDB';
import { useQuasar } from 'quasar';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // const vdb = useVDBStore();
  Router.beforeEach(async (to, from, next) => {
    const vdb = useVDBStore();
    const $q = useQuasar()
    if (!vdb.modulesLoaded) {
      await vdb.loadModules();
    }

    const requiredModuleId = to.meta.moduleId;
    if (!requiredModuleId) {
      return next();
    }
    // console.log(vdb.modules)
    const hasAccess = vdb.modules.some(
      m => m.id === requiredModuleId
    );

    if (hasAccess) {
      return next();
    } else {
      // console.log(hasAccess)
      $q.notify({ message: 'No tienes permiso para entrar a la pagina', type: 'negative', position: 'center' })
      return next('/launcher');
    }
  });

  return Router
})
