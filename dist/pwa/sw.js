if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let d={};const b=e=>a(e,f),r={module:{uri:f},exports:d,require:b};s[f]=Promise.all(i.map((e=>r[e]||b(e)))).then((e=>(c(...e),d)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.94259041.js",revision:"452c1e8c50498f23a48560dafc197bb2"},{url:"assets/assistApi.1e6ecf0d.js",revision:"f9467d4fabce02660b18327b4a7fbf83"},{url:"assets/auth.2e25d13d.js",revision:"b37aa428cf9235ffe606a78218076dce"},{url:"assets/AuthLayout.5e21ef55.js",revision:"33cfbbee036c417f35121b08e212d958"},{url:"assets/auto.179dfba0.js",revision:"8dec64287fbff2d4bba427afac8e133b"},{url:"assets/axios.ae0a941c.js",revision:"a1d6a1ba1cd4f706317ad8344eb571d0"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/cardStores.5f4d2a93.js",revision:"adf1cb5eb18fd27146e8b55966724df6"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.8ccbae95.js",revision:"94a484308bc488861ef37891e22f1a53"},{url:"assets/ClosePopup.302ee10d.js",revision:"e24fa6fa9e9a04983949c431125206ca"},{url:"assets/CompareLayout.ab24ea46.js",revision:"86a505c4ee8fbff798e6268e6bc714f9"},{url:"assets/Confirm.33abbd7b.js",revision:"465a51e22e0b87393236c2904ec59491"},{url:"assets/date.f97782fd.js",revision:"b2b719672ad1203d2c3dd87d2c5ad13b"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/deposits.78a1b50d.js",revision:"e31a340c97a5d554f36fa902400fe732"},{url:"assets/Deposits.c6fa621e.js",revision:"7a63548dcb5ec28cca5b0b27133a82bc"},{url:"assets/ErrorNotFound.06b995a6.js",revision:"5d2053dd590f2c1170a6c95561b109c4"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/Form.368eaf09.js",revision:"b2b97526914c7b1687c27fa991430dbf"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/index.69521ace.js",revision:"d41b10fd5fb391aafd256b1842543b92"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/Index.eacf82b5.js",revision:"cf2b3d61217e4882ad4c8a99b55763b4"},{url:"assets/index.es.e4228254.js",revision:"a25b3c30b5ad87a853923dde0cb0ec57"},{url:"assets/IvaLayout.b2e4e028.js",revision:"750e6724de52583507c3e14b3e71d479"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.78279b0c.js",revision:"23edda03a72d349929803b1ba660e28e"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.b108e7b5.js",revision:"4b79f4bb2965a02685bb20d44454aa9b"},{url:"assets/LauncherLayout.be29252b.js",revision:"80fe302cdf19739e44b742dd1da482b7"},{url:"assets/ModifyLayout.8d9a2c9a.js",revision:"1411ef8241862ddd2e20cf7ab21e33bf"},{url:"assets/OpenLayout.2c18b098.js",revision:"256a200893d0ac2e4bb70dbcfe3dfc33"},{url:"assets/OpneBoxesLYT.e375c69c.js",revision:"6489a3ea0f9280dc4ee888abde53e2d9"},{url:"assets/PagosTarjetas.e953de23.js",revision:"3476e3ad0e04eda433246bbb28003493"},{url:"assets/position-engine.52822e4b.js",revision:"2c5bafa5e505a0c341116a1923212de8"},{url:"assets/ProductsAutocomplete.048535a6.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/ProductsAutocomplete.fc5bbbed.js",revision:"72a75ee8eb21241e162109c5168fc758"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.161f63ae.js",revision:"774c6b4b1ba59636e5971b87f4d66107"},{url:"assets/QCardActions.c923ee13.js",revision:"28fc224c868edcd715817be05b84aa77"},{url:"assets/QCheckbox.d17ac287.js",revision:"acebf17170cecc1ad09241b62ce37dc9"},{url:"assets/QDate.ac9811b9.js",revision:"7f43760e7cf60f686906318d5dc105e7"},{url:"assets/QDialog.eb93db52.js",revision:"0b0bb5c5d4e44864fb59080395263b5b"},{url:"assets/QForm.337bcf33.js",revision:"5afa0bbb7fe59a2ea0f5dd1941eede64"},{url:"assets/QHeader.ad3d9f83.js",revision:"6f599c4d0082e951dfeffdb7b54f7b9e"},{url:"assets/QInput.fe5dc355.js",revision:"b4b6098afd0b4229bde522952952c97b"},{url:"assets/QLayout.e453c444.js",revision:"13c96f5ed7b5834215bdeb17de9c1041"},{url:"assets/QLinearProgress.65bed123.js",revision:"c138334082fbc8eb0273eca31a45ba29"},{url:"assets/QList.ac6c0f68.js",revision:"baa108be0affc53d2ee2245ce76072c0"},{url:"assets/QPage.5ecc0964.js",revision:"a5236320f265bd7cb4368679adba362f"},{url:"assets/QResizeObserver.9996e5bb.js",revision:"a5c0dbc4e0c90c98177d9addbab956d6"},{url:"assets/QRouteTab.99426f1d.js",revision:"4cebcf366fb0865670432c8490499632"},{url:"assets/QSelect.8df49e52.js",revision:"6197469efad75be6669c36d7889f9648"},{url:"assets/QSeparator.2df9944c.js",revision:"6fba1afbfaba0f9d0da7b7ce0dec2057"},{url:"assets/QSpinnerFacebook.0679e44d.js",revision:"d3fad5abfaeb3bf66f2e5c9391e0d2fd"},{url:"assets/QTable.f2c28d11.js",revision:"3a4f71f34809b17a8c8b2e02272af323"},{url:"assets/QTabs.b896b222.js",revision:"9df24c3dd2a787083b957d65a1e1c8e1"},{url:"assets/QToolbar.7e6ad7a9.js",revision:"d29d1e308df4123d069241b177984e94"},{url:"assets/QTooltip.88023862.js",revision:"2186af0684f509eeba570460490bcebf"},{url:"assets/QTr.e4696a85.js",revision:"b6b9dfe180dcc6e469f95840b4b93dd7"},{url:"assets/QUploader.88ed2f4e.js",revision:"254e13e96adf6a65c547509c4f56a37f"},{url:"assets/rtl.b51694b1.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.71d9c0c7.js",revision:"ccc12f8f7ac55ed6357954ff1b023943"},{url:"assets/SaleStore.9dbd45cf.js",revision:"85eca7c18610fd76cde1754c6f4c9c98"},{url:"assets/Setter1.0fd64a39.js",revision:"58115d1900f358f76d8088832c876537"},{url:"assets/socket.8658b04d.js",revision:"ebf3bb2b8fab1e5d47985a56583df79b"},{url:"assets/TarjetaLayout.2dace09b.js",revision:"9eca81335cc31c619091dfdaf6fa2698"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.78ef8d40.js",revision:"12c77aa36be6c4dc5f049ed795097d02"},{url:"assets/transferApi.e032d869.js",revision:"6d6d46e65ba6a00d44cfd4616c1d5434"},{url:"assets/Transfers.b3e73c33.js",revision:"3d6a15f329257fd3d6298f17a9087aee"},{url:"assets/uid.42677368.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.3e80e314.js",revision:"73d75b9b9b979edbaea9225a3e2f53ab"},{url:"assets/use-quasar.66a4eee9.js",revision:"57a1aef34469169af123b7c204568f7b"},{url:"assets/UserToolbar.896d8852.js",revision:"9d5f19abf6d10d9f6277219d6486c697"},{url:"assets/ValeLYT.6e35f5cd.js",revision:"39d4bbd5daf758490cea42039b58d41b"},{url:"assets/Validate.7616b95a.js",revision:"aff4aa3136d9f34dc80070318a7666ac"},{url:"assets/ValidationDepLYT.64010936.js",revision:"eb817237e0a6e1fd333c72c460323766"},{url:"assets/VDB.fcb44d97.js",revision:"55fdb3eff1659b7fb752211b08611e06"},{url:"assets/viewTransfer.21fb69cf.js",revision:"a5bb9a724d96e2cd32f6d52143d0634c"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"d255a8ec39aa9868b971b2adeec9cb2d"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"d9dacaf0202d5667d0f3a196a138bf23"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
