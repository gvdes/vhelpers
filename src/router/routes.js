
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
    meta: { moduleId: 1 }
  },
  {
    path: '/ciclicos',
    component: () => import('layouts/CiclicosLayout.vue'),
    meta: { moduleId: 2 }
  },
  {
    path: '/modificaciones',
    component: () => import('layouts/ModifyLayout.vue'),
    meta: { moduleId: 7 }
  },
  {
    path: '/pagos',
    component: () => import('layouts/TarjetaLayout.vue'),
    meta: { moduleId: 8 }
  },
  {
    path: '/tarjetas',
    component: () => import('layouts/PagosTarjetas.vue'),
    meta: { moduleId: 3 }
  },
  {
    path: '/sales',
    component: () => import('layouts/SaleLayout.vue'),
    meta: { moduleId: 17 }
  },
  {
    path: '/apertura',
    component: () => import('layouts/OpenLayout.vue'),
    meta: { moduleId: 9 },
  },
  {
    path: '/vale',
    component: () => import('layouts/ValeLYT.vue'),
    meta: { moduleId: 10 }
  },
  // {
  //   path: '/stores',
  //   component: () => import('layouts/SaleStore.vue'),
  //   meta: { moduleId: 29 }
  // },
  {
    path: '/stores',
    meta: { moduleId: 29 },
    component: () => import('layouts/SaleStore.vue'),
    children: [
      { path: 'daily', name: 'rdy', component: () => import('pages/Report/Sales/daily.vue'), meta: { moduleId: 29 } },
      { path: 'month', name: 'rmn', component: () => import('pages/Report/Sales/month.vue'), meta: { moduleId: 29 } },
      { path: 'year', name: 'ryr', component: () => import('pages/Report/Sales/year.vue'), meta: { moduleId: 29 } },
    ],
  },
  {
    path: '/cardStores',
    component: () => import('layouts/cardStores.vue'),
    meta: { moduleId: 21 }
  },
  {
    path: '/labels',
    component: () => import('layouts/LabelsLayout.vue'),
    meta: { moduleId: 4 },
    children: [
      { path: 'products', name: 'lprd', component: () => import('pages/Labels/products.vue'), meta: { moduleId: 4 } },
      { path: 'locations', name: 'llct', component: () => import('pages/Labels/locations.vue'), meta: { moduleId: 4 } },
    ],
  },
  {
    path: '/checkLabels',
    component: () => import('layouts/checkLavelsLYT.vue'),
    meta: { moduleId: 54 }
  },
  {
    path: '/compare',
    component: () => import('layouts/CompareLayout.vue'),
    meta: { moduleId: 13 }
  },
  {
    path: '/openbox',
    component: () => import('layouts/OpneBoxesLYT.vue'),
    meta: { moduleId: 22 }
  },
  {
    path: '/requisition',
    component: () => import('layouts/RequisitionLYT.vue'),
    meta: { moduleId: 5 }
  },
  // {
  //   path: '/assist',
  //   component: () => import('layouts/AsssitLYT.vue'),
  // },
  {
    path: '/catalog',
    component: () => import('layouts/Catalog.vue'),
    meta: { moduleId: 68 },
    children: [
      { path: '', name: 'sinx', component: () => import('pages/Catalog/index.vue'), meta: { moduleId: 68 } },
      { path: ':sid', name: 'sidca', component: () => import('pages/Catalog/viewCatalog.vue'), meta: { moduleId: 68 } },
      { path: ':sid/:fid', name: 'fidca', component: () => import('pages/Catalog/viewCatalogFamily.vue'), meta: { moduleId: 68 } },
    ],
  },
  {
    path: '/budgets',
    component: () => import('layouts/budgetsLYT.vue'),
    meta: { moduleId: 15 }
  },
  // {
  //   path: '/stocks',
  //   component: () => import('layouts/reportStock.vue'),
  // },
  {
    path: '/checkout',
    component: () => import('layouts/TckVerifyLYT.vue'),
    meta: { moduleId: 14 }
  },
  {
    path: '/products',
    component: () => import('layouts/getProduct.vue'),
    meta: { moduleId: 47 }
  },
  {
    path: '/changePrices',
    component: () => import('layouts/ChangePricesLYT.vue'),
    meta: { moduleId: 6 }
  },
  {
    path: '/boxesreport',
    component: () => import('layouts/BoxesReport.vue'),
    meta: { moduleId: 23 }
  },
  {
    path: '/offers',
    component: () => import('layouts/salesOffers.vue'),
    meta: { moduleId: 18 }
  },
  {
    path: '/cortBoxes',
    component: () => import('layouts/cortBoxes.vue'),
    meta: { moduleId: 24 }
  },
  {
    path: '/tcksPrit',
    component: () => import('layouts/tcksPrint.vue'),
    meta: { moduleId: 25 }
  },
  {
    path: '/withdrawals',
    component: () => import('layouts/withdrawals.vue'),
    meta: { moduleId: 26 }
  },
  {
    path: '/advances',
    component: () => import('layouts/AdvancesLYT.vue'),
    meta: { moduleId: 27 }
  },
  {
    path: '/inputs',
    component: () => import('layouts/inputsLYT.vue'),
    meta: { moduleId: 28 }
  },
  {
    path: '/reports',
    component: () => import('layouts/reportsLYT.vue'),
    meta: { moduleId: 16 }
  },
  {
    path: '/audreports',
    component: () => import('layouts/reportsAudLYT.vue'),
    meta: { moduleId: 55 }
  },
  {
    path: '/openReport',
    component: () => import('layouts/reportOpenLYT.vue'),
    meta: { moduleId: 33 }
  },
  {
    path: '/file',
    component: () => import('layouts/FileAttentionLYT.vue'),
    meta: { moduleId: 48 }
  },
  {
    path: '/storeWithdrawals',
    component: () => import('layouts/WithdrawalStoreLYT.vue'),
    meta: { moduleId: 52 }
  },
  {
    path: '/refundsStore',
    component: () => import('layouts/RefundStoreLYT.vue'),
    meta: { moduleId: 56 }
  },
  {
    path: '/productSeason',
    component: () => import('layouts/productSeasonLYT.vue'),
    meta: { moduleId: 63 }
  },
  {
    path: '/Formclients',
    component: () => import('layouts/clientLYT.vue'),
    children: [
      { path: 'formClient', name: 'rcl', component: () => import('pages/clients/formCli.vue'), meta: { moduleId: 34 } },
      { path: 'addClient', name: 'acl', component: () => import('pages/clients/addCli.vue'), meta: { moduleId: 35 } },
    ],
  },
  {
    path: '/cashRegisters',
    component: () => import('layouts/CashRegistersLYT.vue'),
    meta: { moduleId: 30 },
    children: [
      { path: '', name: 'cin', component: () => import('pages/cashRegisters/Index.vue'), meta: { moduleId: 30 } },
      // { path: ':cid/automate', name: 'cidx', component: () => import('pages/cashRegisters/salesTpv.vue'),meta: { moduleId: 30 } },
      { path: ':cid/cash', name: 'cids', component: () => import('pages/cashRegisters/salesEstandar.vue'), meta: { moduleId: 30 } },
    ],
  },
  {
    path: '/report',
    component: () => import('layouts/indicatorsLYT.vue'),
    meta: { moduleId: 60 },
    children: [
      { path: 'warehouses', name: 'inw', component: () => import('pages/Report/Indicators/Warehouses.vue'), meta: { moduleId: 60 } },
      { path: 'productDown', name: 'psv', component: () => import('pages/Report/Indicators/productDown.vue'), meta: { moduleId: 67 } },

      // // { path: ':cid/automate', name: 'cidx', component: () => import('pages/cashRegisters/salesTpv.vue'),meta: { moduleId: 30 } },
      // { path: ':cid/cash', name: 'cids', component: () => import('pages/cashRegisters/salesEstandar.vue'), meta: { moduleId: 30 } },
    ],
  },


  {
    path: '/verifyOrder',
    component: () => import('layouts/verifyOrderLYT.vue'),
    meta: { moduleId: 31 },
    children: [
      { path: '', name: 'vor', component: () => import('pages/Orders/Index.vue'), meta: { moduleId: 31 } },
      { path: ':ord', name: 'ord', component: () => import('pages/Orders/orderVerify.vue'), meta: { moduleId: 31 } },
    ],
  },
  {
    path: '/distribute',
    component: () => import('layouts/distributeLYT.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/Distribute/dashboard.vue'), meta: { moduleId: 37 } },
      { path: 'compare', component: () => import('pages/Distribute/Compare.vue'), meta: { moduleId: 43 } },
      { path: 'dashboardStore', component: () => import('pages/Distribute/dashboardStore.vue'), meta: { moduleId: 42 } },
      { path: 'dashboardStore/:rid', component: () => import('pages/Distribute/viewNewRequisition.vue'), meta: { moduleId: 42 } },
      { path: 'report', component: () => import('pages/Distribute/report.vue'), meta: { moduleId: 44 } },
      { path: 'reportStore', component: () => import('pages/Distribute/reportStore.vue'), meta: { moduleId: 45 } },
      { path: 'automate', component: () => import('pages/Distribute/automate.vue'), meta: { moduleId: 46 } },
      { path: 'invoice', component: () => import('pages/Distribute/invoice.vue'), meta: { moduleId: 36 } },
      { path: 'invoice/:inv', component: () => import('pages/Distribute/viewInvoice.vue'), meta: { moduleId: 36 } },
      { path: 'supply', component: () => import('pages/Distribute/supply.vue'), meta: { moduleId: 38 } },
      // { path:'supply/:sup', component: () => import('pages/Distribute/viewSupply.vue'), meta: { moduleId: 5 } },
      { path: 'checkout', component: () => import('pages/Distribute/checkout.vue'), meta: { moduleId: 39 } },
      { path: 'checkout/:chk', component: () => import('pages/Distribute/viewCheckout.vue'), meta: { moduleId: 39 } },
      { path: 'driving', component: () => import('pages/Distribute/driving.vue'), meta: { moduleId: 41 } },
      { path: 'checkin', component: () => import('pages/Distribute/checkin.vue'), meta: { moduleId: 40 } },
      { path: 'checkin/:chk', component: () => import('pages/Distribute/viewCheckin.vue'), meta: { moduleId: 40 } },
    ],
  },
  {
    path: '/refunds',
    component: () => import('layouts/refundsLYT.vue'),
    meta: { moduleId: 19 },
    children: [
      { path: '', name: 'dvb', component: () => import('pages/Refunds/Index.vue'), meta: { moduleId: 19 } },
      { path: ':rid', name: 'rid', component: () => import('pages/Refunds/viewRefund.vue'), meta: { moduleId: 19 } },
      { path: 'verified/:rid', name: 'versrid', component: () => import('pages/Refunds/veriferRefund.vue'), meta: { moduleId: 19 } },
    ],
  },
  {
    path: '/modigyRefund',
    component: () => import('layouts/refundsLYT.vue'),
    meta: { moduleId: 32 },
    children: [
      { path: '', name: 'mre', component: () => import('pages/Refunds/Modify/Index.vue'), meta: { moduleId: 32 } },
      { path: ':rid', name: 'mrid', component: () => import('pages/Refunds/Modify/viewRefund.vue'), meta: { moduleId: 32 } },
    ],
  },
  {
    path: '/outputs',
    component: () => import('layouts/outputsLYT.vue'),
    meta: { moduleId: 20 },
    children: [
      { path: '', name: 'outs', component: () => import('pages/Outputs/Index.vue'), meta: { moduleId: 20 } },
      { path: ':oid', name: 'otusoid', component: () => import('pages/Outputs/viewOutputs.vue'), meta: { moduleId: 20 } },
    ],

  },
  {
    path: '/assortment',
    component: () => import('layouts/assortmetLYT.vue'),
    meta: { moduleId: 12 },
    children: [
      { path: ':oid', name: 'reqoid', component: () => import('pages/Requisition/viewRequisition.vue'), meta: { moduleId: 12 } },
    ],
  },
  {
    path: '/transfers',
    component: () => import('layouts/Transfers.vue'),
    meta: { moduleId: 11 },
    children: [
      { path: '', name: 'trns', component: () => import('pages/Tranfers/Index.vue'), meta: { moduleId: 11 } },
      { path: ':oid', name: 'trnsoid', component: () => import('pages/Tranfers/viewTransfer.vue'), meta: { moduleId: 11 } },
    ],
  },
  {
    path: '/products',
    component: () => import('layouts/ProductsLYT.vue'),
    meta: { moduleId: 49 },
    children: [
      { path: 'create', name: 'mngpr', component: () => import('pages/Products/higthProducts.vue'), meta: { moduleId: 49 } },
      { path: 'prices', name: 'pricespr', component: () => import('pages/Products/pricesProducts.vue'), meta: { moduleId: 50 } },
      { path: 'modify', name: 'modipr', component: () => import('pages/Products/ModifyProducts.vue'), meta: { moduleId: 51 } },
      { path: 'requisition', name: 'rmopr', component: () => import('pages/Products/RequisitionProducts.vue'), meta: { moduleId: 65 } },
      { path: 'picture', name: 'propic', component: () => import('pages/Products/PictureProducts.vue'), meta: { moduleId: 69 } },

    ],
  },
  {
    path: '/clients',
    component: () => import('layouts/LYTClients.vue'),
    meta: { moduleId: 57 },
    children: [
      { path: 'index', name: 'clinx', component: () => import('pages/clients/Index.vue'), meta: { moduleId: 57 } },
      { path: 'regisCredit', name: 'clrc', component: () => import('pages/clients/RegisCredit.vue'), meta: { moduleId: 58 } },
      { path: 'regisPayment', name: 'clprp', component: () => import('pages/clients/RegisPayment.vue'), meta: { moduleId: 59 } },
      // { path: 'wallet', name: 'clwl', component: () => import('pages/clients/RegisWallet.vue'), meta: { moduleId: 57 } },
    ],
  },
  {
    path: '/preorders',
    component: () => import('layouts/PreordersLYT.vue'),
    meta: { moduleId: 64 },
    children: [
      { path: 'index', name: 'inx', component: () => import('pages/Preorders/Index.vue'), meta: { moduleId: 64 } },
      { path: 'checkin', name: 'prvchk', component: () => import('pages/Preorders/Checkin.vue'), meta: { moduleId: 66 } },
      { path: 'settings', name: 'setpr', component: () => import('pages/Preorders/Config.vue'), meta: { moduleId: 70 } },
      { path: 'pedidos', name: 'preo', component: () => import('pages/Preorders/Preorders.vue'), meta: { moduleId: 71 }},
      { path: 'pedidos/:oid', name: 'prwid', component: () => import('pages/Preorders/Viewpreorders.vue'), meta: { moduleId: 71 }},
      { path: 'warehouse', name: 'prwha', component: () => import('pages/Preorders/Warehouse.vue'), meta: { moduleId: 71 }},

    ],
  },
  {
    path: '/warehouse',
    component: () => import('layouts/WarehouseLYT.vue'),
    meta: { moduleId: 61 },
    children: [
      {
        path: 'locations',
        name: 'wub',
        component: () => import('pages/warehouse/locations.vue'),
        children: [
          { path: 'sections', name: 'wsct', component: () => import('pages/warehouse/locations/locations.vue'), meta: { moduleId: 61 } },
          { path: 'products', name: 'wpt', component: () => import('pages/warehouse/locations/products.vue'), meta: { moduleId: 61 } },
          { path: 'massive', name: 'wmss', component: () => import('pages/warehouse/locations/massive.vue'), meta: { moduleId: 61 } },

        ],
        meta: { moduleId: 62 }
      },
      { path: 'minmax', name: 'wmm', component: () => import('pages/warehouse/minmax.vue'), meta: { moduleId: 61 } },
      // { path: 'labels', name: 'wet', component: () => import('pages/warehouse/labels.vue'), meta: { moduleId: 63 } },

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
