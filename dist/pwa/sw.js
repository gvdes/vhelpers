if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let f={};const b=e=>a(e,d),r={module:{uri:d},exports:f,require:b};s[d]=Promise.all(c.map((e=>r[e]||b(e)))).then((e=>(i(...e),f)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.4343cdd9.js",revision:"ecb4c9973ed5d1e505684c63ab6cec22"},{url:"assets/assistApi.bd6c8942.js",revision:"85d2d07d025d32a1fe7a11069cde2ba7"},{url:"assets/auth.988c6f0f.js",revision:"a60e0e79119f6ccf519d32af73012524"},{url:"assets/AuthLayout.4d29f835.js",revision:"d57f51498b1d313b75135f52b0819049"},{url:"assets/auto.05bc31f6.js",revision:"7ca982b4bb66d28414a594bc4ee6ad91"},{url:"assets/axios.ed74c1ba.js",revision:"a1d6a1ba1cd4f706317ad8344eb571d0"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/cardStores.59fc4d65.js",revision:"9471f139e79140262e23fbd6e2123740"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.19a3b6d3.js",revision:"e9e1e2f0f06ce807b1107fc4207feebd"},{url:"assets/ClosePopup.901c1dac.js",revision:"5a24b7838c88f4723c71146e51fa8056"},{url:"assets/CompareLayout.aa46b0bf.js",revision:"b3dd0e1d870180f9161a1df2fa0cec23"},{url:"assets/Confirm.ac5a2275.js",revision:"ee8efd5182a5cc9f4930ba94d740b186"},{url:"assets/date.836bf7e2.js",revision:"d6a207822f449892bfd5c8045f641e0b"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/deposits.93b6ea83.js",revision:"3d0e29af7cab02afd285578619be8927"},{url:"assets/Deposits.dd050175.js",revision:"585762f8bc52399a11f9c5662cc71d5e"},{url:"assets/ErrorNotFound.1e3732e3.js",revision:"512620bdac80039001c86886dac5f871"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/Form.df770643.js",revision:"4293edda6a2a6718460bd51f5d57da64"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/index.26550a4d.js",revision:"1be3ae617b33dbd0969024e54a3fb2dc"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/Index.8d5676cb.js",revision:"5d82ddf1cb55d9fec0aa8fcfdb0f54d1"},{url:"assets/index.es.fda86697.js",revision:"34d457759a0c132213a610570081ed24"},{url:"assets/IvaLayout.479e6e27.js",revision:"c1f7c637a863b439d8c6b469183a69ba"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.53bd7341.js",revision:"433a113094c0a0dbe9df07b24236575a"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.570f4259.js",revision:"cc37059baf64ec5c2df8a0a190956de7"},{url:"assets/LauncherLayout.18452e57.js",revision:"5756f957c3e57ceb655eb758995cf829"},{url:"assets/ModifyLayout.6365cd95.js",revision:"f9e2a023657383766f1a6eea1a736d27"},{url:"assets/OpenLayout.99b5d814.js",revision:"ab9c43c98db2ad73e9c94d1b36c094b9"},{url:"assets/OpneBoxesLYT.699ca38f.js",revision:"23e6fcc1c25e3ac5422406b2dff96700"},{url:"assets/PagosTarjetas.ee1b25c5.js",revision:"b92fab2067de3fc78cced90b10c426ec"},{url:"assets/position-engine.958adadd.js",revision:"ab047915bb9bffc12d0720a98bacad13"},{url:"assets/ProductsAutocomplete.048535a6.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/ProductsAutocomplete.e72edbc1.js",revision:"da73dd5d0ccc8c1039782d9c86399f93"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.f2621c63.js",revision:"eac38fc0e840a6e3cbc5e4530de20545"},{url:"assets/QCard.ce4f8a75.js",revision:"b024e14cb329b39239644f5942a17d20"},{url:"assets/QCardActions.6ea0ce36.js",revision:"76b93b252d522ae5b1b246ed216d61e3"},{url:"assets/QCheckbox.263c528c.js",revision:"735a0daf1141375c3630ac0eb6b9cabd"},{url:"assets/QDate.9f19d362.js",revision:"3b61257d494e4bc0b7d0489e89f6b0d1"},{url:"assets/QDialog.4026425d.js",revision:"4588db5ced7493b2fecedc9a93b9d893"},{url:"assets/QForm.eb753e36.js",revision:"39855140f2f625d4bf3375a3b34bc8aa"},{url:"assets/QHeader.12c85c0b.js",revision:"6cde1a573dca99810080ddd55dbdabe7"},{url:"assets/QInput.207f5507.js",revision:"8d5fe8c8769e0aee0626ab151435ecb8"},{url:"assets/QLayout.5e42b9de.js",revision:"6c108ced1ffadadea8224677f705fc39"},{url:"assets/QLinearProgress.ef07720c.js",revision:"59b5c2a7ccd127b3d1862baceea7b970"},{url:"assets/QList.7a26e9ec.js",revision:"b308aa13770e686fb99821442e2ad59e"},{url:"assets/QPage.bef939ee.js",revision:"fcb16164867659ee8a442a16b9cd7f41"},{url:"assets/QResizeObserver.32e2a942.js",revision:"5ce3593e3c56580ef0cbfe5f05fbe2c9"},{url:"assets/QRouteTab.fa463f20.js",revision:"fe6b7d31f4f7eb67ccbed416ff149343"},{url:"assets/QSelect.416131d3.js",revision:"6a904c13b2ae41600e1e730189b8eff2"},{url:"assets/QSeparator.5ca5b4de.js",revision:"266519d50ce0504247bcd2cb676f09a1"},{url:"assets/QSpinnerFacebook.416ee464.js",revision:"6847b912d49da687a2296c338f76e026"},{url:"assets/QTable.5cfab030.js",revision:"ce8ee92ddaab95f6bcb3da8dca0bf249"},{url:"assets/QTabs.50882b24.js",revision:"523e9301bb7ac6bbc88abb0c748f9819"},{url:"assets/QToolbar.3bd2c58f.js",revision:"a08d1fe0016fc784be49d1021f32f9b9"},{url:"assets/QTooltip.a7e82078.js",revision:"4f30614ee192db3b25638170d8bf06bd"},{url:"assets/QTr.0b76eee9.js",revision:"37bd3ba0207b10f2638decfd5510c6ea"},{url:"assets/QUploader.b4ce939b.js",revision:"44cb40f763dc1d04d91b97447aac09e5"},{url:"assets/rtl.b51694b1.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.11f61dbe.js",revision:"b243b773afaf16633d9a6a94e253c9b2"},{url:"assets/SaleStore.6e2a44be.js",revision:"374a7cdc2d058a3dcc4f0566deec5106"},{url:"assets/Setter1.25fc293c.js",revision:"93e58cf470be8b87bfce4e2d2a4c9370"},{url:"assets/socket.8658b04d.js",revision:"ebf3bb2b8fab1e5d47985a56583df79b"},{url:"assets/TarjetaLayout.9487a183.js",revision:"cf159650a756dbf7edba117f036da769"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.d64cdf90.js",revision:"cdc0138d6799a04149d8f71c46da15c4"},{url:"assets/transferApi.1e1c8179.js",revision:"65515fdb6ae51da78bc2f201c5fd7c53"},{url:"assets/Transfers.2ac8f53c.js",revision:"ba3d3b6d24f28428a05b6b1ad64b8c11"},{url:"assets/uid.42677368.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.333c2371.js",revision:"aad7501b6488d2ea3195e6b71b0e20ce"},{url:"assets/use-quasar.26a3ce71.js",revision:"c1e988352ae71aad331b1ac5c07d39d2"},{url:"assets/UserToolbar.c03b1c1a.js",revision:"1f1862a40015f582e36938412222b615"},{url:"assets/ValeLYT.dbaddac1.js",revision:"98722081e7f0c8b4ecb7ebe85305d003"},{url:"assets/Validate.dac2f83b.js",revision:"1aca11243ad69d28b27d589b96d87b8b"},{url:"assets/ValidationDepLYT.4f3917c1.js",revision:"5864857ca0283ac19d648fdae8914682"},{url:"assets/VDB.ab11e314.js",revision:"a7c6f419a3285cadb44a216ec318e717"},{url:"assets/viewTransfer.e498c1f3.js",revision:"f340c1bc6f09309523f98cba4042b356"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"d255a8ec39aa9868b971b2adeec9cb2d"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"8345b3b3df011ac38ada052e1cd13c5a"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
