if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(a[d])return;let f={};const b=e=>s(e,d),r={module:{uri:d},exports:f,require:b};a[d]=Promise.all(i.map((e=>r[e]||b(e)))).then((e=>(c(...e),f)))}}define(["./workbox-4765ab6a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.7ef88a48.js",revision:"7ba56972040cb92fa65cd7e45f0853a7"},{url:"assets/assistApi.8fb86d69.js",revision:"bb1ad514a70ad83d32c24ddbb2f8b89d"},{url:"assets/AsssitLYT.b3b2d5c5.js",revision:"ecaf2c6689b45e6f097e1e22e5a729ac"},{url:"assets/auth.19677646.js",revision:"da91147d8ddc484a809a6e387b852880"},{url:"assets/AuthLayout.659068f3.js",revision:"99c585b329ad9767903dacbddbc9437d"},{url:"assets/auto.1e87ad9e.js",revision:"5a1cfe725b17694418fe1f36d57269f2"},{url:"assets/axios.9ab26c22.js",revision:"4dd7367588de9fbe8eedf7026c5eadaf"},{url:"assets/axios.ba7b1b0e.js",revision:"e7535974f17b4c354feec59c2f1a1568"},{url:"assets/browser.a927a609.js",revision:"c999fdd00cdbc025d62492e020e346c4"},{url:"assets/budgetsLYT.775b5e78.js",revision:"9b5579a3eb86ebee54fafa229c81ac87"},{url:"assets/budgetsLYT.efb692fa.css",revision:"183a420b3338c6461b2ac26eae17ef71"},{url:"assets/cardStores.b8f0ea5d.js",revision:"9d8226917a45483ea4fe44b42e1f6220"},{url:"assets/ChangePricesLYT.2ef01af3.js",revision:"25cd71a381e9943a3ffcb17ea9a94027"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.442e7861.js",revision:"d393666afdc876c77ee95d79a1a07696"},{url:"assets/ClosePopup.53fed414.js",revision:"70e508f76a9554071ad0c8b9367617ee"},{url:"assets/compareApi.0293d6bf.js",revision:"0a4374b6fda4c9297b5789d1aa9510ce"},{url:"assets/CompareLayout.b2286173.js",revision:"abb642f8972d433c4c691bb601cd8437"},{url:"assets/Confirm.ad48f35d.js",revision:"0fc0f76698173d00cb08515626fb8a02"},{url:"assets/date.29be7359.js",revision:"c99282062e78306a991aa8dae13a6835"},{url:"assets/dayjs.min.cbcf888d.js",revision:"ff5e1d857b6b10ccb1fddee45f619cda"},{url:"assets/Deposits.68eaff26.js",revision:"3ebe9b2fa8bb704790d81469b438a7ba"},{url:"assets/deposits.a684a59b.js",revision:"a2bb3c53ee2e5fbcfc6866acc10933b2"},{url:"assets/ErrorNotFound.cbab2384.js",revision:"1feb82cdd8293d3555363a8ab97e1416"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.041709e1.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.808443ae.ttf",revision:"15d54d142da2f2d6f2e90ed1d55121af"},{url:"assets/fa-brands-400.d7236a19.woff2",revision:"cbcf42b2e9228a8f5bad42717d8a88db"},{url:"assets/fa-regular-400.54cf6086.ttf",revision:"262525e2081311609d1fdab966c82bfc"},{url:"assets/fa-regular-400.e3456d12.woff2",revision:"89672701a5874b80be27649e0494e354"},{url:"assets/fa-solid-900.aa759986.woff2",revision:"4a6591ab5460ae5cbff1ecbd6e52193a"},{url:"assets/fa-solid-900.d2f05935.ttf",revision:"269f971cec0d5dc864fe9ae080b19e23"},{url:"assets/fa-v4compatibility.0ce9033c.woff2",revision:"a772da7bff216cd36214bc44165bba3e"},{url:"assets/fa-v4compatibility.30f6abf6.ttf",revision:"4ed293ceaca9b5b2d9cd74a477963fae"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.4a4dbc62.woff2",revision:"a4160421d2605545f69a4cd6cd642902"},{url:"assets/Form.3e5cdc2b.js",revision:"afd94f7ab2e6fe8f9a1cecf0b7a03c63"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.70a36b3d.js",revision:"96bc2752862fda6d6360b6aadb17c330"},{url:"assets/Index.806be477.js",revision:"cbd9514e5f19df305fd1dd9c53738a59"},{url:"assets/index.9b2bd158.js",revision:"da03ca55b3a88822aa6d82f6ac663484"},{url:"assets/index.a1c0e317.css",revision:"a607e7e78fc678620db9c1b64e55f858"},{url:"assets/index.es.db8c04fa.js",revision:"158902549d417006d6c2b285db3d9539"},{url:"assets/IvaLayout.888d2a58.js",revision:"79a3c5af1edaaecd18beb689aa53eb58"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.a94145b3.js",revision:"571335fc87247800b91b77ba6747fd53"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuaabVmUiAw.6abe435f.woff",revision:"2d29775851b8463053deb35b21b5d5c8"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWub2bVmUiAw.2655782c.woff",revision:"be27354f07345fafe8dfc84117bbafd4"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbFmUiAw.b396c4b4.woff",revision:"c8cea161abfb039c97a11c26dff2f546"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmUiAw.c46b1797.woff",revision:"585ad11be98f8f044923a71898ddfde6"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjalmUiAw.21d7671f.woff",revision:"2cadc82e8484ccac69caddc849f603be"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtalmUiAw.1a33b99d.woff",revision:"51c41b1c2668c088c7cce3fa116396e1"},{url:"assets/LabelsLayout.cd88a830.js",revision:"958fa84d4a435204151c6c92f8c14955"},{url:"assets/LauncherLayout.cf1ade8d.js",revision:"5aa4a9bcda196509a53a3063cd989427"},{url:"assets/ModifyLayout.7180a12d.js",revision:"b24a2dea0bce676213a9e185c0ef6830"},{url:"assets/OpenLayout.dd57abbf.js",revision:"77655dd6d5dc8e9c4615cd5f8388a804"},{url:"assets/OpneBoxesLYT.677af770.js",revision:"65fa7a59d695197b241e65e5b8e35df6"},{url:"assets/PagosTarjetas.59c2b0b5.js",revision:"17f12fe8faa115db59bb32accb5f88bd"},{url:"assets/position-engine.9259fb0a.js",revision:"c9d4453630a03056f6dadcd09ab138e2"},{url:"assets/ProductsAutocomplete.a46beacd.js",revision:"e5a384f2c7bef85b198cff47bf86f7bb"},{url:"assets/ProductsAutocomplete.vue_vue_type_style_index_0_scoped_true_lang.78da52d9.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/purify.es.aa2c5989.js",revision:"3a22eb093790ad8b9ddea6cf821c3aeb"},{url:"assets/QBadge.990809c4.js",revision:"9a5bf5bfaa96e810aba34acbb49f551f"},{url:"assets/QCardActions.813baea1.js",revision:"25ef70b46042b930b40824ed1aebcf45"},{url:"assets/QCheckbox.4b924605.js",revision:"918fd045ecbe9c61d866f972a3f2aacf"},{url:"assets/QDate.9c1b624c.js",revision:"c1ad6a9b2095090e021cc636c5caa4a0"},{url:"assets/QDialog.400166cf.js",revision:"55c6cafae15b465fea989c56dca5a0b5"},{url:"assets/QFooter.ab7b91ea.js",revision:"9b98aa5820a3e386aba44722a5c69314"},{url:"assets/QForm.3924edfb.js",revision:"44f6159daa06ca92ca9e1dd657312d92"},{url:"assets/QHeader.e2fdd3c2.js",revision:"30fd66ad2fa2a428c626fe260873418d"},{url:"assets/QInput.4e606c6d.js",revision:"75a5107df960387e01be12a89881e3f5"},{url:"assets/QLayout.c4ebff5c.js",revision:"5fbea2a4fae719967f30f7af1aa5ea40"},{url:"assets/QLinearProgress.d8af1738.js",revision:"2b18ece5266bec2b733e6391ed4eadca"},{url:"assets/QList.2572fcd7.js",revision:"39a564e537326226aca57a314883dcc7"},{url:"assets/QOptionGroup.dd6350e4.js",revision:"4fbc043bd437e243fa9e9cb35ab46c5f"},{url:"assets/QPage.93dba654.js",revision:"4631a97fd6ef0dd11a97a301a4928290"},{url:"assets/QPopupEdit.c7415d40.js",revision:"db26fa0dae9bc07e0d457d53009d0ccd"},{url:"assets/QRadio.ad705686.js",revision:"a7e20b3d64443f494c4b0bf62d6d4088"},{url:"assets/QResizeObserver.a70582f3.js",revision:"b65152184d4a6716a97e207c6f581138"},{url:"assets/QRouteTab.0455282c.js",revision:"e221e6fc93164e52502400af8e69246a"},{url:"assets/QSelect.606a2a6a.js",revision:"e724b7ab335367d1fecb2d467b89bc01"},{url:"assets/QSeparator.2cab315d.js",revision:"baa4eed5c06a9093cfe342d9c85240e6"},{url:"assets/QSpace.7d203e36.js",revision:"895dc421a957f2bed969f9fe8c7d2afb"},{url:"assets/QSpinnerFacebook.571633a6.js",revision:"6cedaa4a8bea8b5746eba901dc85e3b8"},{url:"assets/QTable.b454e729.js",revision:"3f2a7107416e9fdf62010fc793e3da93"},{url:"assets/QTabs.310752ea.js",revision:"9560251c499de0e0f45d219339442c14"},{url:"assets/QToolbar.d1f34a8c.js",revision:"8e31254b5c91b372b79a8761f2cdbeca"},{url:"assets/QTooltip.82d3e8a3.js",revision:"0a42652512febe02c3ffc82f18affbb1"},{url:"assets/QTr.8aa26b4f.js",revision:"174138f52bb59f6225b2bd13507ae928"},{url:"assets/QUploader.96c14a89.js",revision:"5bec48ffba60c4742325937ef7ff853a"},{url:"assets/reportStock.fe8a202b.js",revision:"968ebe7892aa7e6db05741120cf2aa29"},{url:"assets/RequisitionLYT.cb268e49.css",revision:"9ba2b242d607913e02c5805ec26f791a"},{url:"assets/RequisitionLYT.e02a3a79.js",revision:"8aa471814270762c05e022e694928d41"},{url:"assets/rtl.276c3f1b.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.96c534bb.js",revision:"c46a897c05d9b7c0c8a6f16a0cd2831b"},{url:"assets/SaleStore.108fa141.js",revision:"1c5f51f29f8d3a66c976f86a5869ba66"},{url:"assets/Setter1.43a8161d.js",revision:"a2188a8e43f44f9e1eaa6974bfe7f929"},{url:"assets/socket.e8679fa2.js",revision:"ed94169631fbe8dbf8644622cf678f8d"},{url:"assets/TarjetaLayout.0f5c9820.js",revision:"0225f75c8b76c81bce40931a3ff95251"},{url:"assets/TckVerifyLYT.950f0bcd.js",revision:"8ea21f2daaabaa2613bd63f2fedaf2d7"},{url:"assets/touch.9135741d.js",revision:"88ce3843cbd234458fc111496fd90393"},{url:"assets/TouchPan.daaa27f0.js",revision:"653f07a7398c7abf550270be96f6b8c3"},{url:"assets/transferApi.38962fba.js",revision:"ee549d0754b9c071e9fc209e0c6883f7"},{url:"assets/Transfers.c046c837.js",revision:"caaac6bbadc72b107bb94fe78d17090b"},{url:"assets/uid.937d8ee7.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-key-composition.8e257cf7.js",revision:"9a2cb1c7a133cb59fea663e3315cf352"},{url:"assets/use-quasar.80347805.js",revision:"a43d655cb5afc86377cd6a4546483b0e"},{url:"assets/use-render-cache.3aae9b27.js",revision:"38cc2d5d6134dee46cbc1c43bd1add15"},{url:"assets/UserToolbar.a20c1fce.js",revision:"b6349dc7fb6a45d19ef20980aa1a117a"},{url:"assets/ValeLYT.693b0f82.js",revision:"cff42e16dcb262bcef8ce10e2e9deef5"},{url:"assets/Validate.52c88504.js",revision:"696e6a6ee32386d563844da3c5bdcf18"},{url:"assets/ValidationDepLYT.f5925c50.js",revision:"06e1ad83720443e34a7bbece51880d94"},{url:"assets/VDB.17268dea.js",revision:"cff8632b3a736a533f51a069e8b270a1"},{url:"assets/viewTransfer.03b1f5b1.js",revision:"3d4701daf18cb1eb15c705923137a5d8"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"d255a8ec39aa9868b971b2adeec9cb2d"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"618c400356a695e7604eec06406cc4c1"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
