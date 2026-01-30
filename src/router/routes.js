
const routes = [
  { path: '/', redirect: '/launcher', meta: { requiresAuth: true } },

  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/billing/form/:sid',
    name: 'bifomx',
    component: () => import('layouts/BillingFormLYT.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/launcher',
    component: () => import('layouts/LauncherLayout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/iva',
    component: () => import('layouts/IvaLayout.vue'),
    meta: { moduleId: 1, requiresAuth: true }
  },

  {
    path: '/modificaciones',
    component: () => import('layouts/ModifyLayout.vue'),
    meta: { moduleId: 7, requiresAuth: true }
  },
  {
    path: '/pagos',
    component: () => import('layouts/TarjetaLayout.vue'),
    meta: { moduleId: 8, requiresAuth: true }
  },
  {
    path: '/tarjetas',
    component: () => import('layouts/PagosTarjetas.vue'),
    meta: { moduleId: 3, requiresAuth: true }
  },
  {
    path: '/sales',
    component: () => import('layouts/SaleLayout.vue'),
    meta: { moduleId: 17, requiresAuth: true }
  },
  {
    path: '/apertura',
    component: () => import('layouts/OpenLayout.vue'),
    meta: { moduleId: 9, requiresAuth: true },
  },
  {
    path: '/vale',
    component: () => import('layouts/ValeLYT.vue'),
    meta: { moduleId: 10, requiresAuth: true }
  },
  // {
  //   path: '/stores',
  //   component: () => import('layouts/SaleStore.vue'),
  //   meta: { moduleId: 29 }
  // },
  {
    path: '/stores',
    meta: { moduleId: 29, requiresAuth: true },
    component: () => import('layouts/SaleStore.vue'),
    children: [
      { path: 'daily', name: 'rdy', component: () => import('pages/Report/Sales/daily.vue'), meta: { moduleId: 29, requiresAuth: true } },
      { path: 'month', name: 'rmn', component: () => import('pages/Report/Sales/month.vue'), meta: { moduleId: 29, requiresAuth: true } },
      { path: 'year', name: 'ryr', component: () => import('pages/Report/Sales/year.vue'), meta: { moduleId: 29, requiresAuth: true } },
    ],
  },
  {
    path: '/ciclicos',
    component: () => import('layouts/CiclicosLayout.vue'),
    meta: { moduleId: 2, requiresAuth: true },
    children: [
      { path: 'report', name: 'crpt', component: () => import('pages/Ciclicos/reports.vue'), meta: { moduleId: 2, requiresAuth: true } },
      { path: 'counted', name: 'cntd', component: () => import('pages/Ciclicos/counted.vue'), meta: { moduleId: 73, requiresAuth: true } },
      { path: 'counted/:cid', name: 'crte', component: () => import('pages/Ciclicos/viewCounted.vue'), meta: { moduleId: 73, requiresAuth: true } },

    ],
  },

  {
    path: '/cardStores',
    component: () => import('layouts/cardStores.vue'),
    meta: { moduleId: 21, requiresAuth: true }
  },
  {
    path: '/labels',
    component: () => import('layouts/LabelsLayout.vue'),
    meta: { moduleId: 4, requiresAuth: true },
    children: [
      { path: 'products', name: 'lprd', component: () => import('pages/Labels/products.vue'), meta: { moduleId: 4, requiresAuth: true } },
      { path: 'locations', name: 'llct', component: () => import('pages/Labels/locations.vue'), meta: { moduleId: 4, requiresAuth: true } },
    ],
  },
  {
    path: '/checkLabels',
    component: () => import('layouts/checkLavelsLYT.vue'),
    meta: { moduleId: 54, requiresAuth: true }
  },
  {
    path: '/compare',
    component: () => import('layouts/CompareLayout.vue'),
    meta: { moduleId: 13, requiresAuth: true }
  },
  {
    path: '/openbox',
    component: () => import('layouts/OpneBoxesLYT.vue'),
    meta: { moduleId: 22, requiresAuth: true }
  },
  {
    path: '/requisition',
    component: () => import('layouts/RequisitionLYT.vue'),
    meta: { moduleId: 5, requiresAuth: true }
  },
  // {
  //   path: '/assist',
  //   component: () => import('layouts/AsssitLYT.vue'),
  // },
  {
    path: '/catalog',
    component: () => import('layouts/Catalog.vue'),
    meta: { moduleId: 68, requiresAuth: true },
    children: [
      { path: '', name: 'sinx', component: () => import('pages/Catalog/index.vue'), meta: { moduleId: 68, requiresAuth: true } },
      { path: ':sid', name: 'sidca', component: () => import('pages/Catalog/viewCatalog.vue'), meta: { moduleId: 68, requiresAuth: true } },
      { path: ':sid/:fid', name: 'fidca', component: () => import('pages/Catalog/viewCatalogFamily.vue'), meta: { moduleId: 68, requiresAuth: true } },
    ],
  },
  {
    path: '/budgets',
    component: () => import('layouts/budgetsLYT.vue'),
    meta: { moduleId: 15, requiresAuth: true }
  },
  // {
  //   path: '/stocks',
  //   component: () => import('layouts/reportStock.vue'),
  // },
  {
    path: '/checkout',
    component: () => import('layouts/TckVerifyLYT.vue'),
    meta: { moduleId: 14, requiresAuth: true }
  },
  {
    path: '/products',
    component: () => import('layouts/getProduct.vue'),
    meta: { moduleId: 47, requiresAuth: true }
  },
  {
    path: '/changePrices',
    component: () => import('layouts/ChangePricesLYT.vue'),
    meta: { moduleId: 6, requiresAuth: true }
  },
  {
    path: '/boxesreport',
    component: () => import('layouts/BoxesReport.vue'),
    meta: { moduleId: 23, requiresAuth: true }
  },
  {
    path: '/offers',
    component: () => import('layouts/salesOffers.vue'),
    meta: { moduleId: 18, requiresAuth: true }
  },
  //   {
  //   path: '/ofertas',
  //   component: () => import('layouts/Offers.vue'),
  //   meta: { moduleId: 76, requiresAuth: true }
  // },
  {
    path: '/cortBoxes',
    component: () => import('layouts/cortBoxes.vue'),
    meta: { moduleId: 24, requiresAuth: true }
  },
  {
    path: '/tcksPrit',
    component: () => import('layouts/tcksPrint.vue'),
    meta: { moduleId: 25, requiresAuth: true }
  },
  {
    path: '/withdrawals',
    component: () => import('layouts/withdrawals.vue'),
    meta: { moduleId: 26, requiresAuth: true }
  },
  {
    path: '/advances',
    component: () => import('layouts/AdvancesLYT.vue'),
    meta: { moduleId: 27, requiresAuth: true }
  },
  {
    path: '/inputs',
    component: () => import('layouts/inputsLYT.vue'),
    meta: { moduleId: 28, requiresAuth: true }
  },
  {
    path: '/reports',
    component: () => import('layouts/reportsLYT.vue'),
    meta: { moduleId: 16, requiresAuth: true }
  },
  {
    path: '/audreports',
    component: () => import('layouts/reportsAudLYT.vue'),
    meta: { moduleId: 55, requiresAuth: true }
  },
  {
    path: '/openReport',
    component: () => import('layouts/reportOpenLYT.vue'),
    meta: { moduleId: 33, requiresAuth: true }
  },
  {
    path: '/file',
    component: () => import('layouts/FileAttentionLYT.vue'),
    meta: { moduleId: 48, requiresAuth: true }
  },
  {
    path: '/storeWithdrawals',
    component: () => import('layouts/WithdrawalStoreLYT.vue'),
    meta: { moduleId: 52, requiresAuth: true }
  },
  {
    path: '/refundsStore',
    component: () => import('layouts/RefundStoreLYT.vue'),
    meta: { moduleId: 56, requiresAuth: true }
  },
  {
    path: '/productSeason',
    component: () => import('layouts/productSeasonLYT.vue'),
    meta: { moduleId: 63, requiresAuth: true }
  },
  {
    path: '/Formclients',
    component: () => import('layouts/clientLYT.vue'),
    children: [
      { path: 'formClient', name: 'rcl', component: () => import('pages/clients/formCli.vue'), meta: { moduleId: 34, requiresAuth: true } },
      { path: 'addClient', name: 'acl', component: () => import('pages/clients/addCli.vue'), meta: { moduleId: 35, requiresAuth: true } },
    ],
  },
  {
    path: '/cashRegisters',
    component: () => import('layouts/CashRegistersLYT.vue'),
    meta: { moduleId: 30, requiresAuth: true },
    children: [
      { path: '', name: 'cin', component: () => import('pages/cashRegisters/Index.vue'), meta: { moduleId: 30, requiresAuth: true } },
      // { path: ':cid/automate', name: 'cidx', component: () => import('pages/cashRegisters/salesTpv.vue'),meta: { moduleId: 30 } },
      { path: ':cid/cash', name: 'cids', component: () => import('pages/cashRegisters/salesEstandar.vue'), meta: { moduleId: 30, requiresAuth: true } },
    ],
  },
  {
    path: '/report',
    component: () => import('layouts/indicatorsLYT.vue'),
    meta: { moduleId: 60, requiresAuth: true },
    children: [
      { path: 'warehouses', name: 'inw', component: () => import('pages/Report/Indicators/Warehouses.vue'), meta: { moduleId: 60, requiresAuth: true } },
      { path: 'productDown', name: 'psv', component: () => import('pages/Report/Indicators/productDown.vue'), meta: { moduleId: 67, requiresAuth: true } },

      // // { path: ':cid/automate', name: 'cidx', component: () => import('pages/cashRegisters/salesTpv.vue'),meta: { moduleId: 30 } },
      // { path: ':cid/cash', name: 'cids', component: () => import('pages/cashRegisters/salesEstandar.vue'), meta: { moduleId: 30 } },
    ],
  },


  {
    path: '/verifyOrder',
    component: () => import('layouts/verifyOrderLYT.vue'),
    meta: { moduleId: 31, requiresAuth: true },
    children: [
      { path: '', name: 'vor', component: () => import('pages/Orders/Index.vue'), meta: { moduleId: 31, requiresAuth: true } },
      { path: ':ord', name: 'ord', component: () => import('pages/Orders/orderVerify.vue'), meta: { moduleId: 31, requiresAuth: true } },
    ],
  },
  {
    path: '/distribute',
    component: () => import('layouts/distributeLYT.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/Distribute/dashboard.vue'), meta: { moduleId: 37, requiresAuth: true } },
      { path: 'compare', component: () => import('pages/Distribute/Compare.vue'), meta: { moduleId: 43, requiresAuth: true } },
      { path: 'dashboardStore', component: () => import('pages/Distribute/dashboardStore.vue'), meta: { moduleId: 42, requiresAuth: true } },
      { path: 'dashboardStore/:rid', component: () => import('pages/Distribute/viewNewRequisition.vue'), meta: { moduleId: 42, requiresAuth: true } },
      { path: 'report', component: () => import('pages/Distribute/report.vue'), meta: { moduleId: 44, requiresAuth: true } },
      { path: 'reportStore', component: () => import('pages/Distribute/reportStore.vue'), meta: { moduleId: 45, requiresAuth: true } },
      { path: 'automate', component: () => import('pages/Distribute/automate.vue'), meta: { moduleId: 46, requiresAuth: true } },
      { path: 'invoice', component: () => import('pages/Distribute/invoice.vue'), meta: { moduleId: 36, requiresAuth: true } },
      { path: 'invoice/:inv', component: () => import('pages/Distribute/viewInvoice.vue'), meta: { moduleId: 36, requiresAuth: true } },
      { path: 'supply', component: () => import('pages/Distribute/supply.vue'), meta: { moduleId: 38, requiresAuth: true } },
      // { path:'supply/:sup', component: () => import('pages/Distribute/viewSupply.vue'), meta: { moduleId: 5 } },
      { path: 'checkout', component: () => import('pages/Distribute/checkout.vue'), meta: { moduleId: 39, requiresAuth: true } },
      { path: 'checkout/:chk', component: () => import('pages/Distribute/viewCheckout.vue'), meta: { moduleId: 39, requiresAuth: true } },
      { path: 'driving', component: () => import('pages/Distribute/driving.vue'), meta: { moduleId: 41, requiresAuth: true } },
      { path: 'checkin', component: () => import('pages/Distribute/checkin.vue'), meta: { moduleId: 40, requiresAuth: true } },
      { path: 'checkin/:chk', component: () => import('pages/Distribute/viewCheckin.vue'), meta: { moduleId: 40, requiresAuth: true } },
    ],
  },
  {
    path: '/refunds',
    component: () => import('layouts/refundsLYT.vue'),
    meta: { moduleId: 19, requiresAuth: true },
    children: [
      { path: '', name: 'dvb', component: () => import('pages/Refunds/Index.vue'), meta: { moduleId: 19, requiresAuth: true } },
      { path: ':rid', name: 'rid', component: () => import('pages/Refunds/viewRefund.vue'), meta: { moduleId: 19, requiresAuth: true } },
      { path: 'verified/:rid', name: 'versrid', component: () => import('pages/Refunds/veriferRefund.vue'), meta: { moduleId: 19, requiresAuth: true } },
    ],
  },
  {
    path: '/modigyRefund',
    component: () => import('layouts/refundsLYT.vue'),
    meta: { moduleId: 32, requiresAuth: true },
    children: [
      { path: '', name: 'mre', component: () => import('pages/Refunds/Modify/Index.vue'), meta: { moduleId: 32, requiresAuth: true } },
      { path: ':rid', name: 'mrid', component: () => import('pages/Refunds/Modify/viewRefund.vue'), meta: { moduleId: 32, requiresAuth: true } },
    ],
  },
  {
    path: '/outputs',
    component: () => import('layouts/outputsLYT.vue'),
    meta: { moduleId: 20, requiresAuth: true },
    children: [
      { path: '', name: 'outs', component: () => import('pages/Outputs/Index.vue'), meta: { moduleId: 20, requiresAuth: true } },
      { path: ':oid', name: 'otusoid', component: () => import('pages/Outputs/viewOutputs.vue'), meta: { moduleId: 20, requiresAuth: true } },
    ],

  },
  {
    path: '/assortment',
    component: () => import('layouts/assortmetLYT.vue'),
    meta: { moduleId: 12, requiresAuth: true },
    children: [
      { path: ':oid', name: 'reqoid', component: () => import('pages/Requisition/viewRequisition.vue'), meta: { moduleId: 12, requiresAuth: true } },
    ],
  },
  {
    path: '/transfers',
    component: () => import('layouts/Transfers.vue'),
    meta: { moduleId: 11, requiresAuth: true },
    children: [
      { path: '', name: 'trns', component: () => import('pages/Tranfers/Index.vue'), meta: { moduleId: 11, requiresAuth: true } },
      { path: ':oid', name: 'trnsoid', component: () => import('pages/Tranfers/viewTransfer.vue'), meta: { moduleId: 11, requiresAuth: true } },
    ],
  },
  {
    path: '/products',
    component: () => import('layouts/ProductsLYT.vue'),
    meta: { moduleId: 49, requiresAuth: true },
    children: [
      { path: 'create', name: 'mngpr', component: () => import('pages/Products/higthProducts.vue'), meta: { moduleId: 49, requiresAuth: true } },
      { path: 'prices', name: 'pricespr', component: () => import('pages/Products/pricesProducts.vue'), meta: { moduleId: 50, requiresAuth: true } },
      { path: 'modify', name: 'modipr', component: () => import('pages/Products/ModifyProducts.vue'), meta: { moduleId: 51, requiresAuth: true } },
      { path: 'requisition', name: 'rmopr', component: () => import('pages/Products/RequisitionProducts.vue'), meta: { moduleId: 65, requiresAuth: true } },
      { path: 'picture', name: 'propic', component: () => import('pages/Products/PictureProducts.vue'), meta: { moduleId: 69, requiresAuth: true } },

    ],
  },
  {
    path: '/clients',
    component: () => import('layouts/LYTClients.vue'),
    meta: { moduleId: 57, requiresAuth: true },
    children: [
      { path: 'index', name: 'clinx', component: () => import('pages/clients/Index.vue'), meta: { moduleId: 57, requiresAuth: true } },
      { path: 'regisCredit', name: 'clrc', component: () => import('pages/clients/RegisCredit.vue'), meta: { moduleId: 58, requiresAuth: true } },
      { path: 'regisPayment', name: 'clprp', component: () => import('pages/clients/RegisPayment.vue'), meta: { moduleId: 59, requiresAuth: true } },
      // { path: 'wallet', name: 'clwl', component: () => import('pages/clients/RegisWallet.vue'), meta: { moduleId: 57 } },
    ],
  },
  {
    path: '/preorders',
    component: () => import('layouts/PreordersLYT.vue'),
    meta: { moduleId: 64, requiresAuth: true },
    children: [
      { path: 'index', name: 'inx', component: () => import('pages/Preorders/Index.vue'), meta: { moduleId: 64, requiresAuth: true } },
      { path: 'checkin', name: 'prvchk', component: () => import('pages/Preorders/Checkin.vue'), meta: { moduleId: 66, requiresAuth: true } },
      { path: 'settings', name: 'setpr', component: () => import('pages/Preorders/Config.vue'), meta: { moduleId: 70, requiresAuth: true } },
      { path: 'pedidos', name: 'preo', component: () => import('pages/Preorders/Preorders.vue'), meta: { moduleId: 71, requiresAuth: true } },
      { path: 'pedidos/:oid', name: 'prwid', component: () => import('pages/Preorders/Viewpreorders.vue'), meta: { moduleId: 71, requiresAuth: true } },
      { path: 'warehouse', name: 'prwha', component: () => import('pages/Preorders/Warehouse.vue'), meta: { moduleId: 72, requiresAuth: true } },

    ],
  },
  {
    path: '/warehouse',
    component: () => import('layouts/WarehouseLYT.vue'),
    meta: { moduleId: 61, requiresAuth: true },
    children: [
      {
        path: 'locations',
        name: 'wub',
        component: () => import('pages/warehouse/locations.vue'),
        children: [
          { path: 'sections', name: 'wsct', component: () => import('pages/warehouse/locations/locations.vue'), meta: { moduleId: 62, requiresAuth: true } },
          { path: 'products', name: 'wpt', component: () => import('pages/warehouse/locations/products.vue'), meta: { moduleId: 62, requiresAuth: true } },
          { path: 'massive', name: 'wmss', component: () => import('pages/warehouse/locations/massive.vue'), meta: { moduleId: 62, requiresAuth: true } },

        ],
        meta: { moduleId: 62 }
      },
      { path: 'minmax', name: 'wmm', component: () => import('pages/warehouse/minmax.vue'), meta: { moduleId: 61, requiresAuth: true } },
      // { path: 'labels', name: 'wet', component: () => import('pages/warehouse/labels.vue'), meta: { moduleId: 63 } },

    ],
  },
  {
    path: '/billing',
    component: () => import('layouts/LYTBilling.vue'),
    children: [
      // { path: 'form/:sid', name: 'bifomx', component: () => import('pages/Billing/Index.vue'), meta: { requiresAuth: false } },
      { path: 'billers', name: 'bil', component: () => import('pages/Billing/Billers.vue'), meta: { moduleId: 75, requiresAuth: true } }
    ],
  },
  // {
  //   path: '/deposits',
  //   component: () => import('layouts/Deposits.vue'),
  //   children: [
  //     { path: 'forms', name: 'fdp', component: () => import('pages/Deposits/Form.vue') },
  //     { path: 'verified', name: 'vrdp', component: () => import('pages/Deposits/Validate.vue') },
  //   ],
  // },
  // {
  //   path: '/deposits',
  //   component: () => import('layouts/ValidationDepLYT.vue'),
  //   children: [
  //     { path: 'confirm', name: 'cmf', component: () => import('pages/Deposits/Confirm.vue') },
  //     // { path:'verified', name: 'vrdp', component: () => import('pages/Deposits/Validate.vue') },
  //   ],
  // },
  // {
  //   path: '/__set1',
  //   component: () => import('layouts/Setter1.vue')
  // },

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
