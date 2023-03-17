
const routes = [
  { path: '/', redirect: '/launcher' },
  {
    path:'/auth',
    component: ()=>import('layouts/AuthLayout.vue'),
  },
  {
    path: '/launcher',
    component:()=>import('layouts/LauncherLayout.vue')
  },
  {
    path: '/iva',
    component: () => import('layouts/IvaLayout.vue'),
  },
  {
    path:'/__set1',
    component: () => import('layouts/Setter1.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

/** Despliegue en produccion */
// scp -P6122 -r ./pwa lalo@192.168.10.15:/home/lalo/frontend/vhelpers
