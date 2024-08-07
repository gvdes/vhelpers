
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
    path: '/ciclicos',
    component: () => import('layouts/CiclicosLayout.vue'),
  },
  {
    path: '/modificaciones',
    component: () => import('layouts/ModifyLayout.vue'),
  },
  {
    path: '/pagos',
    component: () => import('layouts/TarjetaLayout.vue'),
  },
  {
    path: '/tarjetas',
    component: () => import('layouts/PagosTarjetas.vue'),
  },
  {
    path: '/sales',
    component: () => import('layouts/SaleLayout.vue'),
  },
  {
    path: '/apertura',
    component: () => import('layouts/OpenLayout.vue'),
  },
  {
    path: '/vale',
    component: () => import('layouts/ValeLYT.vue'),
  },
  {
    path: '/stores',
    component: () => import('layouts/SaleStore.vue'),
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
