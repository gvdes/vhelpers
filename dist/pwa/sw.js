if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let d={};const b=e=>a(e,f),r={module:{uri:f},exports:d,require:b};s[f]=Promise.all(i.map((e=>r[e]||b(e)))).then((e=>(c(...e),d)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.3dd54887.js",revision:"edb6a3a2a85da4bab6ddd95ef2680e3b"},{url:"assets/assistApi.5aba79bc.js",revision:"34e6022927832dcff8f0b87f63c71205"},{url:"assets/AsssitLYT.eda247b9.js",revision:"670e906b7e6dfea3f1a727da13933cf8"},{url:"assets/auth.048ce7af.js",revision:"beca982cd0eeb78cddfcf1e0ca7b8b2c"},{url:"assets/AuthLayout.1c9930d8.js",revision:"d5e9720082dfcd9f222743d786674dcd"},{url:"assets/auto.1ccf0a00.js",revision:"5a404e37908fd3aa9d3bed48e4b65346"},{url:"assets/axios.ae0a941c.js",revision:"a1d6a1ba1cd4f706317ad8344eb571d0"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/budgetsLYT.a9e968a0.js",revision:"da8b3b3c0eb7bbbc41a9f36e1f9ed44a"},{url:"assets/budgetsLYT.efb692fa.css",revision:"183a420b3338c6461b2ac26eae17ef71"},{url:"assets/cardStores.8f7da011.js",revision:"56048789124cdd65b8b109fd2a8fcc55"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.ae99a830.js",revision:"da2f44bcb4b889d1d4b99b01d2e4d0e4"},{url:"assets/ClosePopup.fe654bdc.js",revision:"dfa7124f6c7482c20562b2b88fc2cb2a"},{url:"assets/compareApi.fadaf615.js",revision:"9e656d206e9300ef36ba33a69651a3b0"},{url:"assets/CompareLayout.a5bb4412.js",revision:"d45bb0af82cc65538fe072dcad22c5b4"},{url:"assets/Confirm.0f30ea7c.js",revision:"6ae975ad3bc6cd7b5d2fb9a879cb5886"},{url:"assets/date.9315ba03.js",revision:"e2bfcc60a8ae4dad0b23ffc852dbd039"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/deposits.2838c7e5.js",revision:"c880e63a2fdebfcdf10690c4cd5743af"},{url:"assets/Deposits.63829e32.js",revision:"2fcf781f6e94c7f243d730b28f594f08"},{url:"assets/ErrorNotFound.1915c102.js",revision:"ab791537fa820a7d125b164828fbcb0c"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/Form.1c22e3a8.js",revision:"8f5899b39b7f2a5637e69b3200ba9578"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.083505a8.js",revision:"b430b80e7797eee1fe5eb81eee25ce80"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/Index.30ae1874.js",revision:"06aa37259923ed58b799a315aa257363"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/index.es.97102c3e.js",revision:"8a79591c4e30506f947f5195d08c979e"},{url:"assets/IvaLayout.9d7d1069.js",revision:"ee79f6f02f3c9c1dfb40f173a746778f"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.599a6685.js",revision:"f1997cece35592fecdd2e014f3f32ffc"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.687f90fc.js",revision:"908071c40fba4a6185b4c685f4f180fb"},{url:"assets/LauncherLayout.096c8028.js",revision:"80cbb6fc15474a5a5a0be0331185ae31"},{url:"assets/ModifyLayout.90bf4daf.js",revision:"84f4a7aa4a23ff509b3a06b3a49fd8f4"},{url:"assets/OpenLayout.97d11a3a.js",revision:"ec4cd99a8a3bbb007d8b8dc4ff8e5506"},{url:"assets/OpneBoxesLYT.c1d4cadf.js",revision:"97ab6ba6dd4c6e334c95c2d82ad5fee2"},{url:"assets/PagosTarjetas.d9adccd9.js",revision:"f9ce3d80dd476adad5e97d727ff5d4c9"},{url:"assets/position-engine.c69dd68f.js",revision:"e5eeff717c8d54763a6443eec6918449"},{url:"assets/ProductsAutocomplete.048535a6.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/ProductsAutocomplete.15554297.js",revision:"56c6569ad882b507c3840d6b295378c4"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.f22e415d.js",revision:"57aab48097c00443d860420e6135dd31"},{url:"assets/QCardActions.6bf4b9ff.js",revision:"7a62bb34b96de8aa51144a94ec89de3a"},{url:"assets/QCheckbox.b710db67.js",revision:"4911dbbdeb88681245e302078cf1613f"},{url:"assets/QDate.b94624e0.js",revision:"ea6236ffb3c2634edf39d91cf413b6ba"},{url:"assets/QDialog.29e3b502.js",revision:"836bf7b25ac0dcfa60b87c37ce2da76d"},{url:"assets/QForm.110d50e8.js",revision:"b246247c75eb6dfe0fe0332d57ffe7bf"},{url:"assets/QHeader.889a69b1.js",revision:"b15b576c56b5610abe416f54691a8ca8"},{url:"assets/QInput.5b0d7cb3.js",revision:"3482504dfdefa231dc7dceb9c0e51793"},{url:"assets/QLayout.a550be40.js",revision:"b2df9eaa839ac015127a936b8fcfa593"},{url:"assets/QLinearProgress.5969b81c.js",revision:"7bd5adeb8ba4684d17d61226f74fab02"},{url:"assets/QList.27027c3b.js",revision:"098a0c87f4e789a144b51892256d8202"},{url:"assets/QPage.3f87f044.js",revision:"669d7566da2213c0f8236295c910b3aa"},{url:"assets/QPopupEdit.92d56ba6.js",revision:"d3dd246d66bea8b6c98f87c09b9a2580"},{url:"assets/QRadio.23a9868c.js",revision:"d8a20f02e12ba289e2efa5e3e2cf2244"},{url:"assets/QResizeObserver.daffe02f.js",revision:"c405f250caaf0da879cdf550e8ca54c3"},{url:"assets/QRouteTab.e08321d0.js",revision:"ba30f90aa4f62cc34ff7b6fd77a16362"},{url:"assets/QSelect.1347ba34.js",revision:"dbb625a427ee96a75c9f82a5a02061ec"},{url:"assets/QSeparator.301b1bbd.js",revision:"a191d1a1a2a178ab60c16d4d6b109b75"},{url:"assets/QSpace.adbbabcc.js",revision:"225873ee0b65a57fc1de547f6cbac2f1"},{url:"assets/QSpinnerFacebook.a82d502e.js",revision:"133a5a33b1bb1a8f6133185da75e77c7"},{url:"assets/QTable.8accfb68.js",revision:"5029aa620d75a78d0d3fdab6e45a5c5e"},{url:"assets/QTabs.7ced73a7.js",revision:"d273cffafe85b7d9a071f1b702726b5b"},{url:"assets/QToolbar.86b34b92.js",revision:"e2bd05fca3e705c0d9fffe4ef1fcd8cf"},{url:"assets/QTooltip.a5e29e1d.js",revision:"16029939687d0ff4d7f0cd9d1a034bf0"},{url:"assets/QTr.a95ed556.js",revision:"412d8a66a999af2dd64aa8ff45f8bb0b"},{url:"assets/QUploader.cac0bcc5.js",revision:"9dd54adcd1315a6390e2a8e84152ce6e"},{url:"assets/reportStock.e7520adb.js",revision:"30d26805f1b8c635d9b7cb3989538f21"},{url:"assets/RequisitionLYT.3c6b6594.js",revision:"4661782f972034030ec3bb7e88145a58"},{url:"assets/RequisitionLYT.cb268e49.css",revision:"9ba2b242d607913e02c5805ec26f791a"},{url:"assets/rtl.b51694b1.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.0588037f.js",revision:"ae37a034dcf8020e5ab48d3f93272860"},{url:"assets/SaleStore.bdae0fa4.js",revision:"3487961b0c8bd1c1a7caf91b58373108"},{url:"assets/Setter1.3149a13e.js",revision:"d5010ff9ccf85674f17ed7ffab15047e"},{url:"assets/socket.8658b04d.js",revision:"ebf3bb2b8fab1e5d47985a56583df79b"},{url:"assets/TarjetaLayout.618801d4.js",revision:"8c6e07772523dddd47ab26a45f4215be"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.9f7126f3.js",revision:"6716302188f81a676c64c461cd09da6d"},{url:"assets/transferApi.e032d869.js",revision:"6d6d46e65ba6a00d44cfd4616c1d5434"},{url:"assets/Transfers.d483e593.js",revision:"5b71d277a23cf2b687a444e8215c6e69"},{url:"assets/uid.42677368.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.22915d08.js",revision:"f56835d7539fb8d43ee555194901f183"},{url:"assets/use-quasar.5a3b08ce.js",revision:"81e09baee0364aa424efea0f9e6a57f2"},{url:"assets/UserToolbar.1fe294e5.js",revision:"159f2931792f5cf343bd8be4cf75f88d"},{url:"assets/ValeLYT.16106951.js",revision:"f117f843b67f7443b647aba52c60f547"},{url:"assets/Validate.f87ca9ea.js",revision:"7745cb279bef8f3751bedf2c9acf7aec"},{url:"assets/ValidationDepLYT.65a90796.js",revision:"7ab71f12c5aa5c9f975cf63fbc7b55eb"},{url:"assets/VDB.2418dae0.js",revision:"1a3e62d7bb79b5c55f3bd4f88abc8f25"},{url:"assets/viewTransfer.5973452b.js",revision:"4fc1c6171a59287c2d00dd03e1e516e1"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"d255a8ec39aa9868b971b2adeec9cb2d"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"965a9031620241ca4fcaab1ec512e556"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
