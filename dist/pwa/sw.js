if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let d={};const r=e=>a(e,f),b={module:{uri:f},exports:d,require:r};s[f]=Promise.all(c.map((e=>b[e]||r(e)))).then((e=>(i(...e),d)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.c3bbe910.js",revision:"a1af4e4124a40083d62e3b147ddcfba7"},{url:"assets/assistApi.428bd712.js",revision:"a37a9d7963e3bf06cdf3d469c637ddfa"},{url:"assets/auth.df1ce9b8.js",revision:"6ccd7ffecb671b744253444038d146e2"},{url:"assets/AuthLayout.ca4f421c.js",revision:"b8036abd810a8dadd9b8050309699ac8"},{url:"assets/auto.7cb29034.js",revision:"2e718a57647fd467b9c921e22edcde9c"},{url:"assets/axios.eed4c97e.js",revision:"58a5ecb6ee1ea51f17954d47651c7ef9"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/cardStores.97d32b5f.js",revision:"2351802953533c374bd221a79dd246e4"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.9cf3ffff.js",revision:"1345a4b2f0b43fa4ce598517a824b303"},{url:"assets/ClosePopup.171f4986.js",revision:"52cb6ebd0b0409ba96cbc9ccd3f3413a"},{url:"assets/CompareLayout.99c6277d.js",revision:"2689d819bdc565584722a13ed73817dd"},{url:"assets/Confirm.f5cfd8b1.js",revision:"022661e0467fafb8ed913f71aa0e3d8e"},{url:"assets/date.5fd903b8.js",revision:"24f7d6a4ba4abe58d72d7ee78126309e"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/deposits.0eb6cd07.js",revision:"f83b059d857a71c08cdf059670b208a2"},{url:"assets/Deposits.16eacc61.js",revision:"68a2ea3ac90135d9d101e52cd56fd6e1"},{url:"assets/ErrorNotFound.e9a30d16.js",revision:"5dd7ba803f807068362a65f7e9654b49"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/Form.5a5a71cc.js",revision:"dc62638d1ff836e7c90bcfbe0182566f"},{url:"assets/format.2bc25e5f.js",revision:"cb243393091c9a798c6466f02c1c4f27"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/Index.2799229c.js",revision:"925ac47ab5c10f07e2b1db275cf58aab"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/index.d2a553ed.js",revision:"0020661223d9ecee7666244b8fba6eb2"},{url:"assets/index.es.1a1fbd6c.js",revision:"294b067300656604c9123bbe2d8966c7"},{url:"assets/IvaLayout.445e3671.js",revision:"a6f25fcff4011477fecef3e873a22cef"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.748356d1.js",revision:"15df1fbf186fa03e2cd6453b8d5e8410"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.593151b9.js",revision:"261d6964578c8d9f3f614f4294269a40"},{url:"assets/LauncherLayout.b89ad94a.js",revision:"d21bd9903688b4c2b374d0a04312868a"},{url:"assets/ModifyLayout.b018492d.js",revision:"fae05352fc1cb2d7fd70a3cc39d7e6d5"},{url:"assets/OpenLayout.55861c3f.js",revision:"6949277b1ea30326cfb530694e0b5d69"},{url:"assets/OpneBoxesLYT.7db9170c.js",revision:"b1d2fdd8831d8193eb45c0a85cb18322"},{url:"assets/PagosTarjetas.0326d637.js",revision:"c7dd825072080f6d39b74b14cfcaad3e"},{url:"assets/position-engine.8bc18375.js",revision:"2401dda6a3b5990f56f7533ed99dd907"},{url:"assets/ProductsAutocomplete.048535a6.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/ProductsAutocomplete.e9a061ce.js",revision:"d5f95fcc218adb725687c456d1239023"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.a524eaf6.js",revision:"858c60f7744225c7d7ead57869241e60"},{url:"assets/QCard.ad2a31d8.js",revision:"1b24d627ef9df6d8d2075985584d9c98"},{url:"assets/QCardActions.e734b15f.js",revision:"3b59cce3fe1003cab9cba64145588f95"},{url:"assets/QCheckbox.bc107605.js",revision:"2154511053963f343fbdce3a66686eca"},{url:"assets/QDate.6b529489.js",revision:"656ddd9596397275cc7c89ed2de35628"},{url:"assets/QDialog.1a2f4a9a.js",revision:"fe62c3514314151f90dde6a53ca7750b"},{url:"assets/QForm.4810f04a.js",revision:"4b1269d7d0b1266983bd90251ca55466"},{url:"assets/QHeader.efc338ad.js",revision:"9582783714ed0c40c9f5ccf9122a832b"},{url:"assets/QInput.805ec13a.js",revision:"f7e1304f13e4f817ef9a4a613ade8ac2"},{url:"assets/QLayout.46c914ba.js",revision:"f3792f874cd0b92c411d14dd951ba3ac"},{url:"assets/QLinearProgress.48a12111.js",revision:"5c2f1f9a23fcad0d803dd157187fa1b6"},{url:"assets/QList.c9c4c107.js",revision:"f615199e1638f1cbae1579ca2ac175d1"},{url:"assets/QPage.c72c6e22.js",revision:"d4029a1e85cbf7841cb8dca46abb1322"},{url:"assets/QResizeObserver.86bd2f7c.js",revision:"29589bab17da4619a886aaded25ac9c3"},{url:"assets/QRouteTab.7642171c.js",revision:"2d0e801231cbfff57f1038eaada0aa18"},{url:"assets/QSelect.b141be1a.js",revision:"b9033a879fb05c61ebee0c9d31c3974a"},{url:"assets/QSeparator.5eac6a8c.js",revision:"b3f2d12d1868cddbda5fde08ae59a490"},{url:"assets/QSpinnerFacebook.5b65fcf6.js",revision:"2afe69619d7912ebcff9ecfc4dbbccd3"},{url:"assets/QTable.ef2af850.js",revision:"9a2880c97912479ebbcb88298b79e08b"},{url:"assets/QTabs.161e5d35.js",revision:"2b7230e9ead0b5b81161576efed61fc1"},{url:"assets/QToolbar.4cede2c8.js",revision:"f8e35629d3f8df1370459c0592b9d595"},{url:"assets/QTooltip.6be5ec95.js",revision:"662954a12dfee4d3e79adeddceeaf62b"},{url:"assets/QTr.86797849.js",revision:"ae7aa4454e0df13836d9dc6251db4bbf"},{url:"assets/QUploader.7a26f6ee.js",revision:"a74371e09aec24f3d1d6d7c1c7020ecf"},{url:"assets/rtl.b51694b1.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.e70642f4.js",revision:"c36ec4816793a61c518e22ef0a7a09bf"},{url:"assets/SaleStore.77ad4cbe.js",revision:"0ce4a7cae31ee98da7bbc8986e5058fd"},{url:"assets/Setter1.45c57fe0.js",revision:"0869454c54477d72a93d6d303c2f35d1"},{url:"assets/socket.1159f1bc.js",revision:"f5dfcd9d2434a2fb3d5a55bb03a679de"},{url:"assets/TarjetaLayout.b0017a36.js",revision:"ed90d0e21aa696afa47c57b815f96ff7"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.5a9aa6ba.js",revision:"28af82b159ca288b72dc1a0c485727c1"},{url:"assets/transferApi.09b82a88.js",revision:"abc801d9ba6a785f5f052e1be6a200e6"},{url:"assets/Transfers.75a4d970.js",revision:"a03742ff4ac17c936349a1f6d2fb14c3"},{url:"assets/uid.42677368.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.be89f92d.js",revision:"f3085cf32e2d5dc50314466deab5fa0e"},{url:"assets/use-quasar.18afcf87.js",revision:"f2c95ed8aa5962ddfd581d1031f66e9a"},{url:"assets/UserToolbar.652faaa8.js",revision:"1a306de2b52716ece1a8e1be37affc7f"},{url:"assets/ValeLYT.dee41c56.js",revision:"a9f4938d60a5eb6767f148355bc54684"},{url:"assets/Validate.11b3e627.js",revision:"e3ccfa75924b1333ab49bbb672c84cd1"},{url:"assets/ValidationDepLYT.4c738896.js",revision:"7c7ef456edfd682dcfe2b3c878cf9b9c"},{url:"assets/VDB.a650b002.js",revision:"0fc00b2ab8c9cd8362a7b5bd0c61e02a"},{url:"assets/viewTransfer.65f0ce11.js",revision:"5cc01fb6c6796d044ba25f9645c718fc"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargenina.png",revision:"8e2e45ef635de7381692e221023e9d99"},{url:"icons/Juguete/xlargenino.png",revision:"76dc09a087fe8cb105ae40e01230b2b0"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"87daef40468529e7f6052f58fd247833"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
