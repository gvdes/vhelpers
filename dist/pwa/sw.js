if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let f={};const b=e=>a(e,d),r={module:{uri:d},exports:f,require:b};s[d]=Promise.all(i.map((e=>r[e]||b(e)))).then((e=>(c(...e),f)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.5008573b.js",revision:"1c6f3696dd87f2588f54aaad4ff18aa1"},{url:"assets/assistApi.1e6ecf0d.js",revision:"f9467d4fabce02660b18327b4a7fbf83"},{url:"assets/auth.1b9c6315.js",revision:"961fa2bdc681850e902fc11b69ffb35a"},{url:"assets/AuthLayout.0e0e3306.js",revision:"bdc2dd516fc3759e8068f5e53b488ce9"},{url:"assets/auto.e55b5ccc.js",revision:"a32dbeae9c55d4b307791d91ea6c07d4"},{url:"assets/axios.ae0a941c.js",revision:"a1d6a1ba1cd4f706317ad8344eb571d0"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/cardStores.9bf1affe.js",revision:"113358f0f0e115a62f93dce4a124c570"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.ccda0c8b.js",revision:"9d65b7e4e1e9cbdce932e072203f1bb9"},{url:"assets/ClosePopup.f233918e.js",revision:"4ce57512e939378ea631cf371f95e1cc"},{url:"assets/CompareLayout.1a3a149d.js",revision:"469a5687edf8afc304d384dae6ff2d01"},{url:"assets/Confirm.c14dd5a8.js",revision:"a63523271b8ae5e21dc934d2301e704a"},{url:"assets/date.ed5cb745.js",revision:"1babe43fd5930e802e9f8112f528b52a"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/deposits.90032eaf.js",revision:"ec408f80b95b0d08f984ebdf3026b55e"},{url:"assets/Deposits.f4e4d9ea.js",revision:"02e4f830e3461de81a9f9347d887d8b3"},{url:"assets/ErrorNotFound.a0a47a86.js",revision:"22221a5d7042662f8a1163682b8bf32a"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/Form.edb02b4d.js",revision:"8e0ebd1bea3257fcc0592ef78b5672c5"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/Index.2994bbbd.js",revision:"f75fb233fde24cd7bbcacdfcb4d4ba1b"},{url:"assets/index.642169bd.js",revision:"ddfec9c9490f4edcb54d2abe59834968"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/index.es.8567a876.js",revision:"662df1cc9f4a3be55a55811cb4f7c9fb"},{url:"assets/IvaLayout.b8445b79.js",revision:"71a66f058b5145d61f82d662962965df"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.1b92bfa6.js",revision:"b45dbc147706b3b3a5571b31c856554a"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.9a5c1f03.js",revision:"7213532d202ad744c1572c092bd71586"},{url:"assets/LauncherLayout.44f6ed8f.js",revision:"9c9a340364ded18d0b7e32f61a6374d3"},{url:"assets/ModifyLayout.1dab0153.js",revision:"b2ae2d83aece31398e0135e415cb5bda"},{url:"assets/OpenLayout.12b76d74.js",revision:"38d3c3c6b15cd4132569d2567b9b17e1"},{url:"assets/OpneBoxesLYT.2d650a56.js",revision:"361d0b79b2e494aa9e20f8a8e5f842e2"},{url:"assets/PagosTarjetas.e83879d1.js",revision:"c52791d15e98108d31aef27fa66c8224"},{url:"assets/position-engine.4c297445.js",revision:"f0c922ef951e417dd3260fa774cea9d2"},{url:"assets/ProductsAutocomplete.048535a6.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/ProductsAutocomplete.cd1c2bff.js",revision:"2375a5ca92f7f73a06f3ca1411cd28d1"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.d99d56b0.js",revision:"33ca3cfd1bd9babb5446cde1b765c6bb"},{url:"assets/QCardActions.9bfde284.js",revision:"493350e6a7aa3809c56ebea687fe06af"},{url:"assets/QCheckbox.c07578de.js",revision:"d36c75296f4dd0970b5de526dbfd8404"},{url:"assets/QDate.28682f21.js",revision:"7c94d76d4e9ed98edd1d9f3a3e36ab61"},{url:"assets/QDialog.7eee9b20.js",revision:"fd4f8811ecbcba77dd880241b7531795"},{url:"assets/QForm.39ee7b49.js",revision:"b96115c9451906cb792f5cd3ad6abd57"},{url:"assets/QHeader.8bbd71fd.js",revision:"4a29b14a16f4053bf5c85f6e695d4e02"},{url:"assets/QInput.22795150.js",revision:"afeb1542a86855bc8f9bab091d618e6b"},{url:"assets/QLayout.7a11c833.js",revision:"3dd2938d8113e096575f68fa8b9b05b3"},{url:"assets/QLinearProgress.96bfa47f.js",revision:"3d0d9028541bc059f0877841b0ee7b73"},{url:"assets/QList.fad28bc4.js",revision:"afe8331fb479dec4d76c47895d1a7f53"},{url:"assets/QPage.30688d7f.js",revision:"7eedfc621cd100e410d2b621e9b873f3"},{url:"assets/QResizeObserver.8b8b3f3c.js",revision:"6b8b968fe03f68721fc237d0b511bb35"},{url:"assets/QRouteTab.0c723e0f.js",revision:"6385bdc2aaaff03f7cc057bb14663be0"},{url:"assets/QSelect.2a8720f3.js",revision:"f9921ef46b66748dbff8f52a22a752e6"},{url:"assets/QSeparator.0da96d64.js",revision:"bba75759ba0dfbe7c4dbb0cb16ddb962"},{url:"assets/QSpinnerFacebook.20ea27db.js",revision:"fd72c3cb7c373233d57988100839f48b"},{url:"assets/QTable.a541453e.js",revision:"35a9ec4af744f32959042d266679affb"},{url:"assets/QTabs.a6da0222.js",revision:"6b73321678857af460a32dc2d7b9ada8"},{url:"assets/QToolbar.5c8546e5.js",revision:"dd61a999c9e92b4360b269427409c2da"},{url:"assets/QTooltip.4a78fb50.js",revision:"6eec3910d7478f9c0314956f8d1836b4"},{url:"assets/QTr.364c62ed.js",revision:"a45d8b11485dec6fae28d73406a23fe4"},{url:"assets/QUploader.7b130a97.js",revision:"1f91725415dc4d97b3d0a57ae1f1e164"},{url:"assets/RequisitionLYT.16d2f613.js",revision:"d4029ba3f978f376efd94eb89ffc5e6b"},{url:"assets/rtl.b51694b1.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.5b730924.js",revision:"f8243f6ab901edb40718e143ea997956"},{url:"assets/SaleStore.c8e85b05.js",revision:"3bae6880193ee5b5e7b9e27b5041c45e"},{url:"assets/Setter1.4b419d40.js",revision:"0ea8f49a682007b7229040a667295447"},{url:"assets/socket.8658b04d.js",revision:"ebf3bb2b8fab1e5d47985a56583df79b"},{url:"assets/TarjetaLayout.14534ee3.js",revision:"18e5ef7e5692adfbd1f7aee9f20e2cff"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.2d50d7df.js",revision:"8405f1e63b6ea9a5a3cffa48a613d711"},{url:"assets/transferApi.e032d869.js",revision:"6d6d46e65ba6a00d44cfd4616c1d5434"},{url:"assets/Transfers.9f130229.js",revision:"679bb8d601647ea9cd6946fa22792cd1"},{url:"assets/uid.42677368.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.126922b2.js",revision:"37d932eb4e18b60ad578c78a33dcc89e"},{url:"assets/use-quasar.a74b8772.js",revision:"e5f379ae3ed0f755538f5fbf0e6df2c6"},{url:"assets/UserToolbar.0ac6fbac.js",revision:"ac3068ac8f227dc832a0b5bbd0b8f3d9"},{url:"assets/ValeLYT.b9ab26bc.js",revision:"d8c06f53cd6d7e098c02e78c50fbed74"},{url:"assets/Validate.43cc66d1.js",revision:"eabee4c685f07a48db4ec0756cefc649"},{url:"assets/ValidationDepLYT.76898e65.js",revision:"98569758264810a733cc7a6199a2377b"},{url:"assets/VDB.912a3d45.js",revision:"4482133de71ca23ae2dadc6b597257a2"},{url:"assets/viewTransfer.351f191c.js",revision:"8fd7b28c0e08cb4acc7b45570b1f19cc"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"d255a8ec39aa9868b971b2adeec9cb2d"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"e684717a69d8ee6ae4294a47e9d7d5f1"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
