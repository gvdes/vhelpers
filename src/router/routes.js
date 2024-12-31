
const routes = [
  { path: '/', redirect: '/launcher' },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
  },
  {
    path: '/launcher',
    component: () => import('layouts/LauncherLayout.vue')
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
    path: '/cardStores',
    component: () => import('layouts/cardStores.vue'),
  },
  {
    path: '/labels',
    component: () => import('layouts/LabelsLayout.vue'),
  },
  {
    path: '/compare',
    component: () => import('layouts/CompareLayout.vue'),
  },
  {
    path: '/openbox',
    component: () => import('layouts/OpneBoxesLYT.vue'),
  },
  {
    path: '/requisition',
    component: () => import('layouts/RequisitionLYT.vue'),
  },
  {
    path: '/assist',
    component: () => import('layouts/AsssitLYT.vue'),
  },
  {
    path: '/budgets',
    component: () => import('layouts/budgetsLYT.vue'),
  },
  {
    path: '/stocks',
    component: () => import('layouts/reportStock.vue'),
  },
  {
    path: '/transfers',
    component: () => import('layouts/Transfers.vue'),
    children: [
      { path: '', name: 'trns', component: () => import('pages/Tranfers/Index.vue') },
      { path: ':oid', name: 'trnsoid', component: () => import('pages/Tranfers/viewTransfer.vue') },
    ],
  },
  {
    path: '/deposits',
    component: () => import('layouts/Deposits.vue'),
    children: [
      { path: 'forms', name: 'fdp', component: () => import('pages/Deposits/Form.vue') },
      { path: 'verified', name: 'vrdp', component: () => import('pages/Deposits/Validate.vue') },
    ],
  },
  {
    path: '/deposits',
    component: () => import('layouts/ValidationDepLYT.vue'),
    children: [
      { path: 'confirm', name: 'cmf', component: () => import('pages/Deposits/Confirm.vue') },
      // { path:'verified', name: 'vrdp', component: () => import('pages/Deposits/Validate.vue') },
    ],
  },
  {
    path: '/__set1',
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
