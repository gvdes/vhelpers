if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let d={};const r=e=>a(e,f),b={module:{uri:f},exports:d,require:r};s[f]=Promise.all(i.map((e=>b[e]||r(e)))).then((e=>(c(...e),d)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.8196785f.js",revision:"b2f6d1c479de853cc4453a841f2437c0"},{url:"assets/assistApi.5aba79bc.js",revision:"34e6022927832dcff8f0b87f63c71205"},{url:"assets/AsssitLYT.5d276038.js",revision:"268693aa788798eb41b450d0e0e472c6"},{url:"assets/auth.b06dedf3.js",revision:"ce54f517f982287ff9c924bd547cf133"},{url:"assets/AuthLayout.e738986d.js",revision:"d07145a3de04b8de04a6f45eeb1bba8f"},{url:"assets/auto.85b6e621.js",revision:"4d1708b3224e2a43341b340331da2827"},{url:"assets/axios.ae0a941c.js",revision:"a1d6a1ba1cd4f706317ad8344eb571d0"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/budgetsLYT.66147844.js",revision:"edb6a1d11acd671e46647150ad5f8a18"},{url:"assets/budgetsLYT.efb692fa.css",revision:"183a420b3338c6461b2ac26eae17ef71"},{url:"assets/cardStores.26818fa6.js",revision:"ce3357fbb23fed50a9ab57f2b2468559"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.c9c303d2.js",revision:"6f8a0b74995b06b7ae2d837bc3ae2663"},{url:"assets/ClosePopup.8282aad3.js",revision:"e4cb0e528fa1853cddd66a4a3e489421"},{url:"assets/CompareLayout.5bd77d9e.js",revision:"84fbab670ff559304eb96529a3f45a92"},{url:"assets/Confirm.fa2bbdbd.js",revision:"24b49fb6855337dc3f650f03e52818ad"},{url:"assets/date.a6795bf2.js",revision:"d73c033568561594bb2b9bb5abb2da8c"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/Deposits.ecbd5dcf.js",revision:"f95bb08d72108408e1233032d6815549"},{url:"assets/deposits.fc443d81.js",revision:"61c7f85defe3cfd5fa98dfa5f13e6024"},{url:"assets/ErrorNotFound.4a52fa19.js",revision:"c36a4a6eb04655ffc3c3d83e6ff25c12"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/Form.8365b6f4.js",revision:"c087864928e7946550d65bb47ceeeda0"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/Index.76c0c220.js",revision:"2dd91286fddbde3b756ba972a9f80b10"},{url:"assets/index.d2426e7d.js",revision:"9bf7e52ad0f84a1ffd5eff193d5df021"},{url:"assets/index.es.10fc5573.js",revision:"af00b9d39bbade97b461bb7f6cf0ca54"},{url:"assets/IvaLayout.c0a952e6.js",revision:"2f2c39dfc4a3db4b8ba64ba50d0a0644"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.86a6a055.js",revision:"d354128891b7e886300ef5cd00114291"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.a85949ac.js",revision:"9f1d7e9cc21f2d4875377757db32678e"},{url:"assets/LauncherLayout.6879984e.js",revision:"d5d2d84619cbe50c40388bf2296a2543"},{url:"assets/ModifyLayout.62bc8950.js",revision:"b9911c0dfa04f070221f32b328907a2c"},{url:"assets/OpenLayout.068f3556.js",revision:"88ad6cdccf773944e24fa2b7112f484a"},{url:"assets/OpneBoxesLYT.a437d526.js",revision:"57ffa3192f05328743d44102a343bf57"},{url:"assets/PagosTarjetas.455c96f7.js",revision:"a24538eaf8c0bc8e8ead046ce2219481"},{url:"assets/position-engine.c031e069.js",revision:"0e6acf90f9ed313031938312755d49d8"},{url:"assets/ProductsAutocomplete.048535a6.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/ProductsAutocomplete.79dc9675.js",revision:"803868e9a7e9fd4644aa5c3dd2ca3139"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.97a1e255.js",revision:"99f711209758e172f41a06ec95ce25c1"},{url:"assets/QCardActions.3f1b4f70.js",revision:"ccea2eac23981b162d6ea959a3630585"},{url:"assets/QCheckbox.8d494462.js",revision:"5056c339fe9ba09f4f57f82ce23309eb"},{url:"assets/QDate.b476685d.js",revision:"09a276b470ca69616f4a1bf7ce3df4e6"},{url:"assets/QDialog.20226f55.js",revision:"46e641d30f70a7e3af6630c8d9249fbc"},{url:"assets/QForm.40fa0d6b.js",revision:"37c33a307689656406f4dac3448ba873"},{url:"assets/QHeader.4c136a14.js",revision:"0742b45c635ae73a1d60f85feba76bbb"},{url:"assets/QInput.9bca1a7d.js",revision:"c4df5b7b8e68da134dfb76d77e607fdc"},{url:"assets/QLayout.571410a7.js",revision:"646f23bb23593879191b5841bfa49459"},{url:"assets/QLinearProgress.aeb45896.js",revision:"b1c62254724d3c7ffdb36c996108be37"},{url:"assets/QList.5a0cfa89.js",revision:"52e5cc6168066e430143203868603e7c"},{url:"assets/QPage.63ec8184.js",revision:"bee5cf2462f5c3f31fff14cb95a10bd0"},{url:"assets/QPopupEdit.02c819e2.js",revision:"c27c959660a23c8b61a4935228e3da8b"},{url:"assets/QRadio.0b79fe30.js",revision:"7026d9c0e0af70ff66edd2648e84644f"},{url:"assets/QResizeObserver.54c76791.js",revision:"6825f00ea701ea04b9c3f8cddbb40e1c"},{url:"assets/QRouteTab.96df6fdc.js",revision:"91984bda7a271d67f1c5dd5eeed888a6"},{url:"assets/QSelect.d29b5391.js",revision:"084f2557c8a23ea827d114e3c8b8df4a"},{url:"assets/QSeparator.c068ffbb.js",revision:"c6f4a478ade5883ccea6d7ece56fc74e"},{url:"assets/QSpace.bb3817dc.js",revision:"624b7e746f235c7a312e8764636cf17c"},{url:"assets/QSpinnerFacebook.cf460482.js",revision:"92a1a1f1e0f3bc43c09db927945b654e"},{url:"assets/QTable.bd0646f2.js",revision:"4f85ecf9b0ef67c18e781b41775d7996"},{url:"assets/QTabs.dde610f7.js",revision:"5652967f9d37da1d6a618f07a68664b2"},{url:"assets/QToolbar.576ff950.js",revision:"456c0b07847feac569cc49af4d02512e"},{url:"assets/QTooltip.4cd7f86b.js",revision:"893f188c420d2b991dcb9eeb7c3c7fe0"},{url:"assets/QTr.1486ba3e.js",revision:"763fc99941e985cabc2ddad95c3eed62"},{url:"assets/QUploader.130b3be5.js",revision:"1688f45d18787988d6e8e7d920fd2613"},{url:"assets/RequisitionLYT.33c19d0b.js",revision:"8490a44737f60bf9554c09062e309291"},{url:"assets/RequisitionLYT.cb268e49.css",revision:"9ba2b242d607913e02c5805ec26f791a"},{url:"assets/rtl.b51694b1.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.20be1605.js",revision:"8b1474fcfa7eaaea2e5032c3ef2fb7c9"},{url:"assets/SaleStore.807b263e.js",revision:"968d57558fc0af1837d8fa199d32ccf3"},{url:"assets/Setter1.50f67332.js",revision:"c8a4eb4dfbb22df1b55d520a8a51c62b"},{url:"assets/socket.8658b04d.js",revision:"ebf3bb2b8fab1e5d47985a56583df79b"},{url:"assets/TarjetaLayout.0b806a3b.js",revision:"acf95448b097cca7377a70bcae575c17"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.e94c9aac.js",revision:"773a1e58d7740b7ec8ff83f5ac314dd4"},{url:"assets/transferApi.e032d869.js",revision:"6d6d46e65ba6a00d44cfd4616c1d5434"},{url:"assets/Transfers.9304c7f1.js",revision:"8cf8d0a82494795c132346501c8156ae"},{url:"assets/uid.42677368.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.99996295.js",revision:"9add72d8cb875b45b66e866828e5fc00"},{url:"assets/use-quasar.282298c4.js",revision:"03e0cee65e17099b40fc58975228d479"},{url:"assets/UserToolbar.aff0382d.js",revision:"4bd89d0a08eed284667e65585b8173a3"},{url:"assets/ValeLYT.7ae876bd.js",revision:"3ec2408016ed91b2ee7a72b7db2f6626"},{url:"assets/Validate.509f7698.js",revision:"a51449f5df48a140b5ab2396e6c30767"},{url:"assets/ValidationDepLYT.c97adfe1.js",revision:"e5ca44ea2dba979fc8ced295efcebc36"},{url:"assets/VDB.df551aae.js",revision:"d32fffeb78b84ec333aa2a016b7d51a9"},{url:"assets/viewTransfer.aa775dcb.js",revision:"58311d72930b8b4977f458c1ba21b387"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"d255a8ec39aa9868b971b2adeec9cb2d"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"351afac0ef9ca608573846de3b8ef5dd"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
