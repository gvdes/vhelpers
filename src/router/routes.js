
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
    path: '/checkout',
    component: () => import('layouts/TckVerifyLYT.vue'),
  },
  {
    path: '/changePrices',
    component: () => import('layouts/ChangePricesLYT.vue'),
  },
  {
    path: '/boxesreport',
    component: () => import('layouts/BoxesReport.vue'),
  },
  {
    path: '/offers',
    component: () => import('layouts/salesOffers.vue'),
  },
  {
    path: '/cortBoxes',
    component: () => import('layouts/cortBoxes.vue'),
  },
  {
    path: '/tcksPrit',
    component: () => import('layouts/tcksPrint.vue'),
  },
  {
    path: '/withdrawals',
    component: () => import('layouts/withdrawals.vue'),
  },
  {
    path: '/advances',
    component: () => import('layouts/AdvancesLYT.vue'),
  },
  {
    path: '/inputs',
    component: () => import('layouts/inputsLYT.vue'),
  },
  {
    path: '/reports',
    component: () => import('layouts/reportsLYT.vue'),
  },
  {
    path: '/openReport',
    component: () => import('layouts/reportOpenLYT.vue'),
  },
  {
    path: '/clients',
    component: () => import('layouts/clientLYT.vue'),
    children: [
      { path: 'formClient', name: 'rcl', component: () => import('pages/clients/formCli.vue') },
      { path: 'addClient', name: 'acl', component: () => import('pages/clients/addCli.vue') },
    ],
  },
  {
    path: '/cashRegisters',
    component: () => import('layouts/CashRegistersLYT.vue'),
    children: [
      { path: '', name: 'cin', component: () => import('pages/cashRegisters/Index.vue') },
      { path: ':cid/automate', name: 'cidx', component: () => import('pages/cashRegisters/salesTpv.vue') },
      { path: ':cid/standar', name: 'cids', component: () => import('pages/cashRegisters/salesEstandar.vue') },
    ],
  },

  {
    path: '/verifyOrder',
    component: () => import('layouts/verifyOrderLYT.vue'),
    children: [
      { path: '', name: 'vor', component: () => import('pages/Orders/Index.vue') },
      { path: ':ord', name: 'ord', component: () => import('pages/Orders/orderVerify.vue') },
    ],
  },
  {
    path: '/refunds',
    component: () => import('layouts/refundsLYT.vue'),
    children: [
      { path: '', name: 'dvb', component: () => import('pages/Refunds/Index.vue') },
      { path: ':rid', name: 'rid', component: () => import('pages/Refunds/viewRefund.vue') },
      { path: 'verified/:rid', name: 'versrid', component: () => import('pages/Refunds/veriferRefund.vue') },
    ],
  },
  {
    path: '/modigyRefund',
    component: () => import('layouts/refundsLYT.vue'),
    children: [
      { path: '', name: 'mre', component: () => import('pages/Refunds/Modify/Index.vue') },
      { path: ':rid', name: 'mrid', component: () => import('pages/Refunds/Modify/viewRefund.vue') },
    ],
  },
  {
    path: '/outputs',
    component: () => import('layouts/outputsLYT.vue'),
    children: [
      { path: '', name: 'outs', component: () => import('pages/Outputs/Index.vue') },
      { path: ':oid', name: 'otusoid', component: () => import('pages/Outputs/viewOutputs.vue') },
    ],

  },
  {
    path: '/assortment',
    component: () => import('layouts/assortmetLYT.vue'),
    children: [
      { path: ':oid', name: 'reqoid', component: () => import('pages/Requisition/viewRequisition.vue') },
    ],
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
