if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let f={};const b=e=>a(e,d),r={module:{uri:d},exports:f,require:b};s[d]=Promise.all(i.map((e=>r[e]||b(e)))).then((e=>(c(...e),f)))}}define(["./workbox-4765ab6a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.8de8b498.js",revision:"129de131a9eab04b6eaf65b2f72e04ca"},{url:"assets/assistApi.8fb86d69.js",revision:"bb1ad514a70ad83d32c24ddbb2f8b89d"},{url:"assets/AsssitLYT.7363b19d.js",revision:"7ba99f2275e1f73d1fe255cfaed4edc9"},{url:"assets/auth.4573d629.js",revision:"f74bbaafc2633152e93d3fc7a122795d"},{url:"assets/AuthLayout.5dacc615.js",revision:"7e31d3e15d6da6827d87c22661d77882"},{url:"assets/auto.76d37a58.js",revision:"8f8497e868977db4e91f187f95f60867"},{url:"assets/axios.9ab26c22.js",revision:"4dd7367588de9fbe8eedf7026c5eadaf"},{url:"assets/axios.ba7b1b0e.js",revision:"e7535974f17b4c354feec59c2f1a1568"},{url:"assets/browser.a927a609.js",revision:"c999fdd00cdbc025d62492e020e346c4"},{url:"assets/budgetsLYT.8c5d1d49.js",revision:"0cf406ba3d5f14cf43403e38f3c7f784"},{url:"assets/budgetsLYT.efb692fa.css",revision:"183a420b3338c6461b2ac26eae17ef71"},{url:"assets/cardStores.ba6425ab.js",revision:"ac7e16b947a407d8b7bbd811d3d66af7"},{url:"assets/ChangePricesLYT.d3f926ec.js",revision:"f0e71b2fac021cfb0d8e9feac6af8532"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.61a78659.js",revision:"f9bbf7ca08f85a63e8981bf558261631"},{url:"assets/ClosePopup.4819653f.js",revision:"03616f484228303d8789b2d109c236e8"},{url:"assets/compareApi.0293d6bf.js",revision:"0a4374b6fda4c9297b5789d1aa9510ce"},{url:"assets/CompareLayout.d34ba723.js",revision:"5fd5436c19ee682304ce9227ffed5683"},{url:"assets/Confirm.32814c92.js",revision:"ee1d8d6b60f89410f11bf51dd2490e1a"},{url:"assets/date.28483564.js",revision:"ff61ffaafe2e77c2248ff0017527cdb5"},{url:"assets/dayjs.min.cbcf888d.js",revision:"ff5e1d857b6b10ccb1fddee45f619cda"},{url:"assets/deposits.b4da84b3.js",revision:"35305592832f549b23151c61ccdd5347"},{url:"assets/Deposits.c1d10849.js",revision:"6d04ec4d8daca365a76fc4e2c1f29ff5"},{url:"assets/ErrorNotFound.d7ae686d.js",revision:"8e426aa9ff6fbc2c1135c9b8a1fc2add"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.041709e1.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.808443ae.ttf",revision:"15d54d142da2f2d6f2e90ed1d55121af"},{url:"assets/fa-brands-400.d7236a19.woff2",revision:"cbcf42b2e9228a8f5bad42717d8a88db"},{url:"assets/fa-regular-400.54cf6086.ttf",revision:"262525e2081311609d1fdab966c82bfc"},{url:"assets/fa-regular-400.e3456d12.woff2",revision:"89672701a5874b80be27649e0494e354"},{url:"assets/fa-solid-900.aa759986.woff2",revision:"4a6591ab5460ae5cbff1ecbd6e52193a"},{url:"assets/fa-solid-900.d2f05935.ttf",revision:"269f971cec0d5dc864fe9ae080b19e23"},{url:"assets/fa-v4compatibility.0ce9033c.woff2",revision:"a772da7bff216cd36214bc44165bba3e"},{url:"assets/fa-v4compatibility.30f6abf6.ttf",revision:"4ed293ceaca9b5b2d9cd74a477963fae"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.4a4dbc62.woff2",revision:"a4160421d2605545f69a4cd6cd642902"},{url:"assets/Form.02d5e896.js",revision:"11103b4a8d0f0c1c8eaeda016ee270af"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/Index.0a670037.js",revision:"21378187d427da85814cb6c321986c16"},{url:"assets/index.70a36b3d.js",revision:"96bc2752862fda6d6360b6aadb17c330"},{url:"assets/index.799ea64d.js",revision:"498a7f6fbbfd3127e6bddbc4a3782012"},{url:"assets/index.a1c0e317.css",revision:"a607e7e78fc678620db9c1b64e55f858"},{url:"assets/index.es.a8f23a84.js",revision:"bce2e1c312e116896b64917979acd44e"},{url:"assets/IvaLayout.93ad6a7f.js",revision:"3af2b92c6a3b82dadf3fa09373eb25da"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.99074d8d.js",revision:"16fcc6c4123314419be145d921f1d292"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuaabVmUiAw.6abe435f.woff",revision:"2d29775851b8463053deb35b21b5d5c8"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWub2bVmUiAw.2655782c.woff",revision:"be27354f07345fafe8dfc84117bbafd4"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbFmUiAw.b396c4b4.woff",revision:"c8cea161abfb039c97a11c26dff2f546"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmUiAw.c46b1797.woff",revision:"585ad11be98f8f044923a71898ddfde6"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjalmUiAw.21d7671f.woff",revision:"2cadc82e8484ccac69caddc849f603be"},{url:"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtalmUiAw.1a33b99d.woff",revision:"51c41b1c2668c088c7cce3fa116396e1"},{url:"assets/LabelsLayout.dfaad9b7.js",revision:"9bafafd92b612974b1ad050acbdd60d1"},{url:"assets/LauncherLayout.04883780.js",revision:"98537119765ef045021a5dd8eb100429"},{url:"assets/ModifyLayout.6e1b68dc.js",revision:"edb43ef36d034aeffb27397b897f5179"},{url:"assets/OpenLayout.929ce185.js",revision:"bc1ed8b8838e4e068e1bcf352692696b"},{url:"assets/OpneBoxesLYT.0667895a.js",revision:"bbd008c597e0111523beaf901972f5bf"},{url:"assets/PagosTarjetas.5e4d993c.js",revision:"772d1b4efe7736004eac981043f4da2c"},{url:"assets/position-engine.2ec3e418.js",revision:"8a3eca193b7a307132bedfb5500946bf"},{url:"assets/ProductsAutocomplete.78ec7c9f.js",revision:"a42ffd0eb71bb2a2b0356b0aa76f0634"},{url:"assets/ProductsAutocomplete.vue_vue_type_style_index_0_scoped_true_lang.78da52d9.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/purify.es.aa2c5989.js",revision:"3a22eb093790ad8b9ddea6cf821c3aeb"},{url:"assets/QBadge.4b9328c4.js",revision:"3788d8a940f57db023e8c113b53eaa1d"},{url:"assets/QCardActions.78604d5b.js",revision:"e9d0ac8ab11748136ad84d562158c486"},{url:"assets/QCheckbox.1d552df2.js",revision:"5dd4e7f80c88cd932b15448a4a4247a6"},{url:"assets/QDate.a8aa6f49.js",revision:"6ec80be0f017edb72a8b7381a8203f1e"},{url:"assets/QDialog.037698d8.js",revision:"72905ede62370f614c5303a3a0a89219"},{url:"assets/QFooter.376499f7.js",revision:"855402ae4aa4960d55ba601051da8543"},{url:"assets/QForm.38e4f0a7.js",revision:"7e4939b186020c0c67ab5728a3f8ed42"},{url:"assets/QHeader.07a50f68.js",revision:"bdf4256cf51353b845d7f4fdcd537f97"},{url:"assets/QInput.2357a9d3.js",revision:"9bd8b943e14a6bbc50cb62252b90f206"},{url:"assets/QLayout.c9bb255d.js",revision:"982ab27f3fa5eb3d91f69f20be40317a"},{url:"assets/QLinearProgress.44f71d21.js",revision:"5dc0f15c8c572432eb66d4aa5c0b3485"},{url:"assets/QList.cb0e0954.js",revision:"c66722713d8c63216f3051cd585f5639"},{url:"assets/QOptionGroup.4fb7e788.js",revision:"6f491802b0520890fba592a144f923a3"},{url:"assets/QPage.ee291f3e.js",revision:"a7276ebea6d303872edbef7f1f76bc2f"},{url:"assets/QPopupEdit.6bf9680a.js",revision:"5eedd1c20c717ef10a1437436dfe33de"},{url:"assets/QRadio.5cc0c831.js",revision:"e9a5a6071b802a30e7d6e69c5c4ea8a7"},{url:"assets/QResizeObserver.d6ed544e.js",revision:"985b3568da0af5e06b0b095c58bf8a8e"},{url:"assets/QRouteTab.449a630d.js",revision:"b9d0ae6eb2a3e2db507cc831f6b1bf36"},{url:"assets/QSelect.ce47e387.js",revision:"a71bb4a2ded32ba6b580d5b7d62121e9"},{url:"assets/QSeparator.d8af992b.js",revision:"e86cbe918bf7112a13ea32e11c4faaa2"},{url:"assets/QSpace.29517642.js",revision:"bbdf382482c9085aeadf81f32912b20c"},{url:"assets/QSpinnerFacebook.26349d03.js",revision:"f913139c5f9cb2f63045a34131ea8cd8"},{url:"assets/QTable.d96e7e6d.js",revision:"be1b61f2a51e8533321c4c66fbfae494"},{url:"assets/QTabs.585a2ad3.js",revision:"ae03635ba2f0eb1b6a0df972f74a50a8"},{url:"assets/QToolbar.0bad1564.js",revision:"552be9768d0704e523254e3b563479d7"},{url:"assets/QTooltip.2cdf4972.js",revision:"de6b82d571336d61a07b9a029723b906"},{url:"assets/QTr.47f3fbbe.js",revision:"284f071bf7c00545d07f12714411803b"},{url:"assets/QUploader.4185789c.js",revision:"a11483c4b3781732ceb8fc7cd6fdc66e"},{url:"assets/reportStock.d2265da4.js",revision:"c7b482faa4581d9be644103e8efc1a87"},{url:"assets/RequisitionLYT.3367b45d.js",revision:"30ae6dba249341b5eaf0e4e09981d7d4"},{url:"assets/RequisitionLYT.cb268e49.css",revision:"9ba2b242d607913e02c5805ec26f791a"},{url:"assets/rtl.276c3f1b.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.bed0a8ea.js",revision:"af171da73ef9bf33bac37849c5e2448c"},{url:"assets/SaleStore.e79ba01c.js",revision:"5a95b85c68ddc871937fdd6755760826"},{url:"assets/Setter1.c725d9f9.js",revision:"cd04b88fe54c78c906256cdf8262cfac"},{url:"assets/socket.e8679fa2.js",revision:"ed94169631fbe8dbf8644622cf678f8d"},{url:"assets/TarjetaLayout.cab573b5.js",revision:"3a3b19c13faf3e24b31554aca6694dfa"},{url:"assets/TckVerifyLYT.c5dc3015.js",revision:"706b041fcd64d84873c3a81d7d81f81f"},{url:"assets/touch.9135741d.js",revision:"88ce3843cbd234458fc111496fd90393"},{url:"assets/TouchPan.e643c904.js",revision:"366af4b5cb6427aa72112ea15b445aaf"},{url:"assets/transferApi.38962fba.js",revision:"ee549d0754b9c071e9fc209e0c6883f7"},{url:"assets/Transfers.0bc91e18.js",revision:"ca2dba7d6c57611a5feae3ad966862cd"},{url:"assets/uid.937d8ee7.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-key-composition.e86631ca.js",revision:"18cbc28b41117fc93bf4d4f666f6b4f4"},{url:"assets/use-quasar.efa320bd.js",revision:"8c9a54b8ebfac40283b74245baf6b47f"},{url:"assets/use-render-cache.3aae9b27.js",revision:"38cc2d5d6134dee46cbc1c43bd1add15"},{url:"assets/UserToolbar.8a6b1e74.js",revision:"2e2dd0e4fd75cbd658f30432ed3558e9"},{url:"assets/ValeLYT.85b94303.js",revision:"42f3304c0baeed3b59661faf9111173f"},{url:"assets/Validate.94bb8901.js",revision:"082d4c9ac7ec88efd743129cd71313a1"},{url:"assets/ValidationDepLYT.6e316902.js",revision:"1812bba240cbe805e5839eabe22440bc"},{url:"assets/VDB.629335f4.js",revision:"4110306e62af554863c257fc991e635d"},{url:"assets/viewTransfer.8e5caeee.js",revision:"3273185843bc5f81f0fb7c118b531e3f"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"d255a8ec39aa9868b971b2adeec9cb2d"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"95066fc1fda9ba5cbdd4312eadc3037f"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
