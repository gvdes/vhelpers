if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let f={};const r=e=>a(e,d),b={module:{uri:d},exports:f,require:r};s[d]=Promise.all(c.map((e=>b[e]||r(e)))).then((e=>(i(...e),f)))}}define(["./workbox-4765ab6a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.f1a628fc.js",revision:"4cde89f16bb58968cfc265cd61ce4a1b"},{url:"assets/assistApi.2e43d6ae.js",revision:"205d6d0926441f22b3981fc1d3bd8166"},{url:"assets/AsssitLYT.56dd4d8c.js",revision:"c39ac57046a055f252d458fe76d46d54"},{url:"assets/auth.1bcb5a38.js",revision:"351ab05e6879397448a3e2a6b0ab78ae"},{url:"assets/AuthLayout.4e4c1a1c.js",revision:"8af9a45623a9a78c6433300938c837e6"},{url:"assets/auto.ba62c17c.js",revision:"bf9ad4627164b2a84de02322408760f8"},{url:"assets/axios.9ab26c22.js",revision:"4dd7367588de9fbe8eedf7026c5eadaf"},{url:"assets/axios.ba7b1b0e.js",revision:"e7535974f17b4c354feec59c2f1a1568"},{url:"assets/BoxesReport.3f9ab995.js",revision:"76cd9870e68ad7be8f3b604af93dbe07"},{url:"assets/browser.a927a609.js",revision:"c999fdd00cdbc025d62492e020e346c4"},{url:"assets/budgetsLYT.95b0204c.js",revision:"daf7f4f3db540306886f955365124d8d"},{url:"assets/budgetsLYT.efb692fa.css",revision:"183a420b3338c6461b2ac26eae17ef71"},{url:"assets/cardStores.c2fd23e3.js",revision:"8dbc878ad976c0819d5e15ddfcfbe04b"},{url:"assets/ChangePricesLYT.3b388616.js",revision:"29b46dd6a56bee4b547fbb3aad70fa9d"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.68354232.js",revision:"63379de7caf9f0ffde2999063ebff3f8"},{url:"assets/ClosePopup.c7302fe0.js",revision:"d18735c2370eb6f9c25251e11a0adaa2"},{url:"assets/compareApi.0293d6bf.js",revision:"0a4374b6fda4c9297b5789d1aa9510ce"},{url:"assets/CompareLayout.9c7c27e9.js",revision:"5e3619aca0c8e5c0931f0402bc284bfc"},{url:"assets/Confirm.8b8611d0.js",revision:"89888e85bcfdaf27052fd3a17ccdbd35"},{url:"assets/date.c1d07a3c.js",revision:"c18bbd845c508bfce88c662aeb7eaf15"},{url:"assets/dayjs.min.cbcf888d.js",revision:"ff5e1d857b6b10ccb1fddee45f619cda"},{url:"assets/Deposits.08f41fde.js",revision:"60b3513d3e9f66c70d619d34983aba8a"},{url:"assets/deposits.f1a94675.js",revision:"ee78fd44749f76697aae54da9d8d5306"},{url:"assets/ErrorNotFound.04f51559.js",revision:"f1a469174163215f0ecb1251498ce5fd"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.041709e1.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.808443ae.ttf",revision:"15d54d142da2f2d6f2e90ed1d55121af"},{url:"assets/fa-brands-400.d7236a19.woff2",revision:"cbcf42b2e9228a8f5bad42717d8a88db"},{url:"assets/fa-regular-400.54cf6086.ttf",revision:"262525e2081311609d1fdab966c82bfc"},{url:"assets/fa-regular-400.e3456d12.woff2",revision:"89672701a5874b80be27649e0494e354"},{url:"assets/fa-solid-900.aa759986.woff2",revision:"4a6591ab5460ae5cbff1ecbd6e52193a"},{url:"assets/fa-solid-900.d2f05935.ttf",revision:"269f971cec0d5dc864fe9ae080b19e23"},{url:"assets/fa-v4compatibility.0ce9033c.woff2",revision:"a772da7bff216cd36214bc44165bba3e"},{url:"assets/fa-v4compatibility.30f6abf6.ttf",revision:"4ed293ceaca9b5b2d9cd74a477963fae"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.4a4dbc62.woff2",revision:"a4160421d2605545f69a4cd6cd642902"},{url:"assets/Form.a058074e.js",revision:"df1c6c8b8bd38432a76073a39059bf88"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/Index.31428235.js",revision:"cdaa08ce3f1c9177771fb38db73342f5"},{url:"assets/index.70a36b3d.js",revision:"96bc2752862fda6d6360b6aadb17c330"},{url:"assets/index.74cd2bea.js",revision:"ac0e5d56ced13149fd476ee31c9dfa21"},{url:"assets/index.a1c0e317.css",revision:"a607e7e78fc678620db9c1b64e55f858"},{url:"assets/index.es.b2fed44f.js",revision:"08f29b03471dccd0369e6e10bcaf6400"},{url:"assets/IvaLayout.87b4c484.js",revision:"29b170a14f7732d883e1ee741efdc0d4"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.1c46f523.js",revision:"5323e46aa283a32e6c9b27bbb610f825"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuaabVmUiAw.6abe435f.woff",revision:"2d29775851b8463053deb35b21b5d5c8"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWub2bVmUiAw.2655782c.woff",revision:"be27354f07345fafe8dfc84117bbafd4"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbFmUiAw.b396c4b4.woff",revision:"c8cea161abfb039c97a11c26dff2f546"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmUiAw.c46b1797.woff",revision:"585ad11be98f8f044923a71898ddfde6"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjalmUiAw.21d7671f.woff",revision:"2cadc82e8484ccac69caddc849f603be"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtalmUiAw.1a33b99d.woff",revision:"51c41b1c2668c088c7cce3fa116396e1"},{url:"assets/LabelsLayout.5d5a1268.js",revision:"815bbe86251e19abee53f9d2d6c7238f"},{url:"assets/LauncherLayout.83634686.js",revision:"2be0cb8837e8632cfb02ba48146bd416"},{url:"assets/ModifyLayout.f105fa67.js",revision:"9cde2abc5a3e662cbb613bde57f5fc10"},{url:"assets/OpenLayout.1ba3192d.js",revision:"bc258840e4ed27c4541e84fb7b9c4dd0"},{url:"assets/OpneBoxesLYT.3d732e45.js",revision:"a0ab203b630eca30355150f010678c01"},{url:"assets/PagosTarjetas.2af8b250.js",revision:"2fb13171843f3e58150ef9eeb125cdef"},{url:"assets/position-engine.f2c701a3.js",revision:"f0eb10ca23e60fdef371031e95070498"},{url:"assets/ProductsAutocomplete.dc28e0d0.js",revision:"67d50e02c659417f4893a9908f44edc1"},{url:"assets/ProductsAutocomplete.vue_vue_type_style_index_0_scoped_true_lang.78da52d9.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/purify.es.aa2c5989.js",revision:"3a22eb093790ad8b9ddea6cf821c3aeb"},{url:"assets/QBadge.22be4314.js",revision:"2c67b4a3c1da76c55b456394dda3a88b"},{url:"assets/QCardActions.0b8e751b.js",revision:"af8722a9850f09ff1265053700d31bf6"},{url:"assets/QCheckbox.36ef4309.js",revision:"e589b9e7a217ccced3d8ad3e8672be73"},{url:"assets/QDate.933d1512.js",revision:"984df5cee171d2189573a3f87bf25bce"},{url:"assets/QDialog.16979c31.js",revision:"a4a2a592d696e711c168e982aa6e5481"},{url:"assets/QFooter.502eb04a.js",revision:"8dc9fdaf639bf4c993dc133fabeddb50"},{url:"assets/QForm.bcc929b6.js",revision:"fb4c9ec705680dbdb445c6aad55059b2"},{url:"assets/QHeader.816dd97f.js",revision:"d60915e9d11951e5a19908ce88e15713"},{url:"assets/QInput.3aa97415.js",revision:"8adbfdf375340f638dc71faa98e1265d"},{url:"assets/QLayout.0a8cec8b.js",revision:"8511cbc58d01e9894ba079f0954f480d"},{url:"assets/QLinearProgress.586ee6b8.js",revision:"bbf28c4e410f034c377382c2ed8e714a"},{url:"assets/QList.49306a02.js",revision:"15a6115e2663d8e79ec169567939ea2f"},{url:"assets/QOptionGroup.24d6fa22.js",revision:"7f8664b78c20e3ae7900ac036479a7d9"},{url:"assets/QPage.4405a9a1.js",revision:"079744d5aadb816085ba061f7c6e5ee8"},{url:"assets/QPopupEdit.9d38a505.js",revision:"a227604980fbcd114bc5aa432ed68cf4"},{url:"assets/QRadio.e1e35d64.js",revision:"f021e93f9c8a3b627d81d0adc7a5821e"},{url:"assets/QResizeObserver.a80dfd93.js",revision:"7b0af6b7b3c0c51cca318c59886dedf1"},{url:"assets/QRouteTab.c71c9991.js",revision:"21c89c14e2931b1c0759ebbdcd3e4876"},{url:"assets/QSelect.62e4fd42.js",revision:"6f91ec488b69fc9f9154710d33368375"},{url:"assets/QSeparator.bb3bce20.js",revision:"089d2ba0b47901687f856bc7dfd1320c"},{url:"assets/QSlideTransition.9199797c.js",revision:"0b1e21ff8d7e494a4521c215f030b646"},{url:"assets/QSpace.37ddecd6.js",revision:"d31ddc9bfa13b2198dc60208f3829134"},{url:"assets/QSpinnerFacebook.cca4ad61.js",revision:"c6157544bd827d3f5a4ced70f6b15b92"},{url:"assets/QTable.b323091d.js",revision:"69c8b5f89bbba70b679cd35e4fd8b6a3"},{url:"assets/QTabs.273dfd2b.js",revision:"d81c6b410f862afa09ac525a6efd1017"},{url:"assets/QToolbar.4310fbe4.js",revision:"56c0b788e27fa4ad166101161570d02f"},{url:"assets/QTooltip.d9838da9.js",revision:"a1f482770c7ad7f26a8742f3bfd6b361"},{url:"assets/QTr.41195725.js",revision:"8c42b5ac608b2938cc88b5d454f6fe78"},{url:"assets/QUploader.d7f47f7e.js",revision:"f4f3b92bae1a748435b7a715ca328083"},{url:"assets/reportStock.a13ed4a0.js",revision:"7390910f9d25b34759700fc9ecdcc290"},{url:"assets/RequisitionLYT.17948d9b.js",revision:"a091e5d8ba40652740419ccdaa0aa299"},{url:"assets/RequisitionLYT.cb268e49.css",revision:"9ba2b242d607913e02c5805ec26f791a"},{url:"assets/rtl.276c3f1b.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.0ef2b55a.js",revision:"d670575bc6a7d2a2e1e50434c8b4883f"},{url:"assets/salesOffers.386b84f5.js",revision:"8ad0725089338e442c166d6090d15a22"},{url:"assets/SaleStore.8d3ee68a.js",revision:"f5a99c517262707d4c1c2d4d1a9dbb7a"},{url:"assets/Setter1.1f0d5479.js",revision:"d862b631eea77acc580f4543b8dd6ddb"},{url:"assets/socket.e8679fa2.js",revision:"ed94169631fbe8dbf8644622cf678f8d"},{url:"assets/TarjetaLayout.ac6692a9.js",revision:"268c8228caa191c651d703e2c186d2d6"},{url:"assets/TckVerifyLYT.bfd94eda.js",revision:"072cc0599af2962e0b42d5eaa78ba349"},{url:"assets/touch.9135741d.js",revision:"88ce3843cbd234458fc111496fd90393"},{url:"assets/TouchPan.5e0f8b45.js",revision:"be204d446625e55bfc743e6f2085202f"},{url:"assets/transferApi.38962fba.js",revision:"ee549d0754b9c071e9fc209e0c6883f7"},{url:"assets/Transfers.431bceca.js",revision:"0360dc47f15abfc151a2e1cd3f800a12"},{url:"assets/uid.937d8ee7.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-key-composition.7a6edf12.js",revision:"52814298c327327be087d6e34b80748e"},{url:"assets/use-quasar.2436c271.js",revision:"fd84d9a3ca7013f3a6055eaf1f84b365"},{url:"assets/use-render-cache.3aae9b27.js",revision:"38cc2d5d6134dee46cbc1c43bd1add15"},{url:"assets/UserToolbar.9dfb38f0.js",revision:"4cf45fbe9a76616890fb4527739a67a3"},{url:"assets/ValeLYT.5b1100c7.js",revision:"464ca2c5747fadbf40eca0ec6681c6d4"},{url:"assets/Validate.61b3c6f6.js",revision:"9c09fa6286651deb8a615c4297d28741"},{url:"assets/ValidationDepLYT.7ac920f7.js",revision:"3be4306ae7a0d77aea6aedcd73a8da51"},{url:"assets/VDB.6fbaf8fb.js",revision:"e160c6cbdb960b0d8733ce2bb4f7b68a"},{url:"assets/viewTransfer.f9350a2c.js",revision:"479bf0561ffa2779772691272f6eff34"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"d255a8ec39aa9868b971b2adeec9cb2d"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"4f02527029e320b0c02d83573457ea6d"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
