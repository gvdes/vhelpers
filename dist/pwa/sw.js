if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(s[d])return;let f={};const b=e=>a(e,d),r={module:{uri:d},exports:f,require:b};s[d]=Promise.all(c.map((e=>r[e]||b(e)))).then((e=>(i(...e),f)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.fa0c9b4e.js",revision:"8b86ba3b0cfc5a507dcc0dbb3769a239"},{url:"assets/assistApi.995b1d4e.js",revision:"f9fec1e97dfe7a53eb2c241f36e35f84"},{url:"assets/AsssitLYT.c6cb3f6c.js",revision:"0003e5d766dac22e2ecd3de25fe5b45f"},{url:"assets/auth.4a577a62.js",revision:"7085b42d4895b20050e193e390d8c78c"},{url:"assets/AuthLayout.cb0442f3.js",revision:"7d4aaf80e4adb735132a286ee8450026"},{url:"assets/auto.19a8fbb9.js",revision:"0e12bbbf6ca4191c2e5c798c14c880da"},{url:"assets/axios.ed74c1ba.js",revision:"a1d6a1ba1cd4f706317ad8344eb571d0"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/budgetsLYT.0cb6bdbf.js",revision:"e952eda97c35d17d5ba23bd5d4ee8c82"},{url:"assets/budgetsLYT.efb692fa.css",revision:"183a420b3338c6461b2ac26eae17ef71"},{url:"assets/cardStores.48b1fab7.js",revision:"5c8a5cba8bd6e60c8db2aa31732bef16"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.4dd49ace.js",revision:"1e046ca42720c865db2d6bfa6e628569"},{url:"assets/ClosePopup.26d707f2.js",revision:"a79baec2adaeb48e33cd90fdcdc331d0"},{url:"assets/compareApi.367e6163.js",revision:"af83a564bf720820d921e747f9f6afea"},{url:"assets/CompareLayout.1629f0e2.js",revision:"14d90f8466edeb1c83d79a021bdab1fb"},{url:"assets/Confirm.bfcf1f36.js",revision:"2bafb02e246935a8fe29325f67bc37dd"},{url:"assets/date.cda72c49.js",revision:"8eff43119bc963f15eb137942b5a1e37"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/deposits.19ad4486.js",revision:"e57bd9379b919aa7ddc3c6477da179a0"},{url:"assets/Deposits.e3a561aa.js",revision:"f71b8701399fbb862aa199ae17b3dd2d"},{url:"assets/ErrorNotFound.87e87ca9.js",revision:"1d5fe887cd251c991879fbbd5b9735cc"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/Form.dfaa64d8.js",revision:"a7655cdd4d539bf42a8789f7b613ee14"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/Index.0d8853cd.js",revision:"72b8505f23e289d5b2784aa4ee734c4e"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/index.663ce22a.js",revision:"5d1403d6ed145b589c216032b9fc04dd"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/index.es.dc086818.js",revision:"a66c58422477e0ddfb31dacb6788e01e"},{url:"assets/IvaLayout.68cc987c.js",revision:"17b2609f6100f3f93305704be0d26c49"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.f129075f.js",revision:"5b46f38fbc0344eb11b465e1152ee2a6"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.212d8a87.js",revision:"92695b7d6e62cdb6aa636824fe910c37"},{url:"assets/LauncherLayout.06d616bc.js",revision:"596d7713e0c0ec5dddccc5d07893e7dd"},{url:"assets/ModifyLayout.12834265.js",revision:"a677eecb27c94d4f8ba2ce1cb18e778c"},{url:"assets/OpenLayout.6133fe19.js",revision:"2e9573a7c799d17f631a1701c712ae0d"},{url:"assets/OpneBoxesLYT.d14481f3.js",revision:"7fa5bc716a26ddec74a915ea28d95929"},{url:"assets/PagosTarjetas.6b512ed9.js",revision:"7077e15777292c466fc2ea413ba65398"},{url:"assets/position-engine.df312566.js",revision:"67d0127fde392b3c117dff058164559c"},{url:"assets/ProductsAutocomplete.41eca392.css",revision:"0091456fb576d5014a1e307963b327d4"},{url:"assets/ProductsAutocomplete.960cbe79.js",revision:"5dc014e31498ce6c68d95c485996f5e7"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.9abfd2dc.js",revision:"6e2a0fce689e965ae75bb710ab1e4500"},{url:"assets/QCardActions.cf0aa8de.js",revision:"14bbe8cc35cfe27a96445e8bfffe80f2"},{url:"assets/QCheckbox.e5309686.js",revision:"d8cb1a10ce221f597be6501772d2856b"},{url:"assets/QDate.13ca71fd.js",revision:"ed5b68f7f11f8649df739fe3303640e2"},{url:"assets/QDialog.5c7384ba.js",revision:"faeabb693cc629ebb822717ec61dab84"},{url:"assets/QForm.82bf9d89.js",revision:"a5280d5885c627aa612e793ea2e9e399"},{url:"assets/QHeader.84cf460d.js",revision:"0f1705ec6fc0ae08adb57b1104fd50a8"},{url:"assets/QInput.2b18c811.js",revision:"160f9d0df11bd1754882922a5c534409"},{url:"assets/QLayout.2d61af8d.js",revision:"a0dc16810a3fe8a562ed9aac3fe3142e"},{url:"assets/QLinearProgress.1d61b61c.js",revision:"ac34df6d23da8fa2e8bf939f918df43e"},{url:"assets/QList.a8c6f217.js",revision:"16d0ab38a5913c1a33346e56c2cd155b"},{url:"assets/QPage.351ae26f.js",revision:"76be01c28655fa22a4b7e2273718ab8e"},{url:"assets/QPopupEdit.32d12167.js",revision:"c31d7723391d5db27301966b6d4330e0"},{url:"assets/QRadio.f987de31.js",revision:"3dc7d118fa90a190d6f6b9daec3c3065"},{url:"assets/QResizeObserver.a65148a4.js",revision:"004048ac3ce09e85e14e50b3d568a3b8"},{url:"assets/QRouteTab.c7484836.js",revision:"a5e7e61abf9bcc0fd0bfe72e15c9a38a"},{url:"assets/QSelect.6de103eb.js",revision:"04cf2ceaecdde4cdb10e3ec46955a2b9"},{url:"assets/QSeparator.5bc55db9.js",revision:"f76dfcd01353004b8d9e5a1573e5a69a"},{url:"assets/QSpace.10df2621.js",revision:"a8fde24a754be763e5aaaa40acf9ab27"},{url:"assets/QSpinnerFacebook.dae1357e.js",revision:"d2cd97536284176b627af9448d07fbb2"},{url:"assets/QTable.9a7dbb66.js",revision:"9c0217b1edb1f0fd4378100be98daf50"},{url:"assets/QTabs.e4bf701c.js",revision:"d403efea5ca51ab34f15c0503ba9f234"},{url:"assets/QToolbar.0dd31642.js",revision:"f2164b26db1b86ba3e23135f271c04a7"},{url:"assets/QTooltip.de2317db.js",revision:"518595b0a916cf412763cf57ea4547e5"},{url:"assets/QTr.2224bd1b.js",revision:"adcf5cd48429709e250420d03b2d983c"},{url:"assets/QUploader.8fca841b.js",revision:"0fdc9bb7fcb1bb46a08a8017c365ed91"},{url:"assets/reportStock.a135cc70.js",revision:"a217a5ffd749f2a8ea5936fa93e5275f"},{url:"assets/RequisitionLYT.ade6d789.js",revision:"af19997830c230a6d47f707d60496c9d"},{url:"assets/RequisitionLYT.cb268e49.css",revision:"9ba2b242d607913e02c5805ec26f791a"},{url:"assets/rtl.b51694b1.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.7e1ad646.js",revision:"335380bbfbab272ec0bb61e5b9ad4223"},{url:"assets/SaleStore.4eac763b.js",revision:"92df32802cf9e8262cc57a68b7cb1a31"},{url:"assets/Setter1.c7b6c43c.js",revision:"1a103a626bcc9a6d593a5c3a382eb72b"},{url:"assets/socket.bffa0769.js",revision:"ebf3bb2b8fab1e5d47985a56583df79b"},{url:"assets/TarjetaLayout.e4c03f23.js",revision:"deb0a703e23ccd0446a73997c843cf82"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.47570fc1.js",revision:"a3de03cf60db20589da0b1f76510b22c"},{url:"assets/transferApi.85a02f0c.js",revision:"0732bd306c14614efa7968b7f53456bf"},{url:"assets/Transfers.f9f0a537.js",revision:"61970e02936d158ded1df082b96799aa"},{url:"assets/uid.42677368.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.d19d1ff7.js",revision:"2bef40a87be4c50f262bdf26f4f9fda4"},{url:"assets/use-quasar.19d5a5c9.js",revision:"8575226f041140d75f2455ffab1ae1ab"},{url:"assets/UserToolbar.db1d79cb.js",revision:"86ee50fd02bd18f7f05db4074bc407bb"},{url:"assets/ValeLYT.1f76d1dc.js",revision:"3c8cdadad5bf12f29ceb5f1dc9b0dc51"},{url:"assets/Validate.5b7657d8.js",revision:"4d91504df88b33a731204fb7a1b57bcc"},{url:"assets/ValidationDepLYT.7c4c42ef.js",revision:"29631a859de28f7a16f8a54bfbf4bc2a"},{url:"assets/VDB.4a7edbf3.js",revision:"c7ecfbf0d2bdc2a2d32418b45eae4037"},{url:"assets/viewTransfer.69eccf3f.js",revision:"575a55564eeae21f9b2bf2fc866d3f64"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"3bfe63b7b9e4fc45666518808ee165a4"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.PNG",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"d2bed7db58d367ea6e88f9767763e789"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
