if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,f)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let d={};const r=e=>a(e,i),b={module:{uri:i},exports:d,require:r};s[i]=Promise.all(c.map((e=>b[e]||r(e)))).then((e=>(f(...e),d)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.2c347463.js",revision:"353dd59618f0b0560157625d9c35e96e"},{url:"assets/assistApi.fe1fce89.js",revision:"0d20c1f2251eada7cbe95fb1f1f35d9f"},{url:"assets/auth.59fb16c0.js",revision:"097a49bea179cb4376880271224c4818"},{url:"assets/AuthLayout.67d30544.js",revision:"182a43cbdab9c68789b347fac4830ea9"},{url:"assets/auto.5b860606.js",revision:"0bbcf1350381f9899efd293479fffc72"},{url:"assets/axios.ea0e6755.js",revision:"58a5ecb6ee1ea51f17954d47651c7ef9"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/cardStores.1d14792a.js",revision:"c2da1ccdeb649cc8996d7c69af9a0458"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.a6fe86f1.js",revision:"cf1db0d2527eda823d3283a09a4501a6"},{url:"assets/ClosePopup.4b1fb8b5.js",revision:"b0103a75d9c8d11d25ff8a6ba23425e7"},{url:"assets/CompareLayout.4817b462.js",revision:"9c3697949cf2a5e3bc82cce3d26c05b9"},{url:"assets/Confirm.8d234fa3.js",revision:"ec43393470ab12f542eb774271651f92"},{url:"assets/date.a39cbabf.js",revision:"2cddbfe7f4a73a04f6806c593392d617"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/deposits.2875f07a.js",revision:"173c290acfe127baede97f4fbef0f198"},{url:"assets/Deposits.69e80f97.js",revision:"b8ab806342d8e9c917a069456d9b2bc8"},{url:"assets/ErrorNotFound.c548f6ad.js",revision:"f486b2cb4d62082866ad82b221c1a97f"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/Form.f0600c1d.js",revision:"018f2fe80e7a892fef4d5d610f5dcf98"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/index.78c9af65.js",revision:"306f9a78f461d4ea7d7b0de233baaf8f"},{url:"assets/Index.a5b0bacf.js",revision:"f2205b476e6cf92e0faaa59e70ace8ac"},{url:"assets/index.es.280d88b7.js",revision:"bcf2c1b0dde510db7dda7b420c0f7182"},{url:"assets/IvaLayout.8a3fdbc6.js",revision:"b0f677c92a341c7d704bc0f8500f6642"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.b5ca3a3b.js",revision:"caa297c8c0e217bad549527ba32e0e9d"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.d969dd41.js",revision:"b99375f83e0a4c42ecfc9141bed4e092"},{url:"assets/LauncherLayout.6adc2a40.js",revision:"36ba214d6b187258884b7feed3058380"},{url:"assets/ModifyLayout.c0c3f28d.js",revision:"4684f999f4b763697de3c8b2aec05112"},{url:"assets/OpenLayout.684c7ede.js",revision:"f2f43faf491743757f9d1d5414060e38"},{url:"assets/OpneBoxesLYT.e31ada2c.js",revision:"c7ed1aec3614b7412d4506f6c53b20dc"},{url:"assets/PagosTarjetas.a43a6a36.js",revision:"0e5852db09d57746599525a75971af90"},{url:"assets/position-engine.36ddec88.js",revision:"cb30157651a90619aa063c3cfe6896a7"},{url:"assets/ProductsAutocomplete.0779f6f0.js",revision:"b67d156b9943635110ad2412d1fe3c91"},{url:"assets/ProductsAutocomplete.41eca392.css",revision:"0091456fb576d5014a1e307963b327d4"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.7b2dd4f0.js",revision:"9c23f87ff6432c0226febd9052cfac2d"},{url:"assets/QCard.00befe6e.js",revision:"e4727e3432af527a8bdc7f4dc48dab64"},{url:"assets/QCardActions.9183c255.js",revision:"d72d16ed7092d147ffee8e198b6ab971"},{url:"assets/QCheckbox.471a4f04.js",revision:"bfdd0b53d145e56dd2fa0eb03e7da448"},{url:"assets/QDate.90d346c9.js",revision:"cfdb50e666eba872858c5260b93d5673"},{url:"assets/QDialog.04193f39.js",revision:"ef25e57d2ad70e139fa9a76b1feb4e3d"},{url:"assets/QForm.ae03ba86.js",revision:"b3d86ec0af117777f594c93edf06d079"},{url:"assets/QHeader.fd67922e.js",revision:"88c32ecc6593695e7e33a44b47924aa4"},{url:"assets/QInput.532d168d.js",revision:"2fdef2183538333b754133aabb424181"},{url:"assets/QLayout.874af7bb.js",revision:"d31b5a279dafc7dd781603044f10880a"},{url:"assets/QLinearProgress.97cba39c.js",revision:"4ce9993099d6f2ff4aad021308e1ec2f"},{url:"assets/QList.a1ee8ba7.js",revision:"04b5e2b6d0e44e9db0ae19dfb78136ed"},{url:"assets/QPage.f36d2c0a.js",revision:"e715589848dc032fe79bded8b1a6498f"},{url:"assets/QResizeObserver.523f73a7.js",revision:"618080597ca27440fc3522a24a783449"},{url:"assets/QRouteTab.467734cc.js",revision:"05e340e12cf25b16a6076932611c5813"},{url:"assets/QSelect.090b85b0.js",revision:"fbace5ad8dd015cfcb36c3d49c2de64f"},{url:"assets/QSeparator.0a735c2a.js",revision:"c45f572881ca78d9e6f02b368a450cea"},{url:"assets/QSpinnerFacebook.04fc5b99.js",revision:"11b2c9f6c31b76b229a7f6e502c3f463"},{url:"assets/QTable.f66efc88.js",revision:"54cf0fcae0520a3707f040d3c2db83f0"},{url:"assets/QTabs.35683aeb.js",revision:"a54d2616ec8003c6dce3f7d119f77e4f"},{url:"assets/QToolbar.b7a83534.js",revision:"c7c4ac1502a8723aff51a07fc8dcf08f"},{url:"assets/QTooltip.8c814baf.js",revision:"c9d464470da449491c5d210db645fb7f"},{url:"assets/QTr.105b98a5.js",revision:"7e96bf2937fbf177a39f70eec57f0ec0"},{url:"assets/QUploader.3fa3c872.js",revision:"c3f773abcd4ca490c75063b736aa0912"},{url:"assets/rtl.b51694b1.js",revision:"528db8ee9db59534c84c8fe3314e1c7c"},{url:"assets/SaleLayout.28dcbf90.js",revision:"d8998900a304e36a461978139fadbf6c"},{url:"assets/SaleStore.c9a9b166.js",revision:"7a9876d121173280bb34d8b19998bfed"},{url:"assets/Setter1.61e66f04.js",revision:"2ec841721c662f31d4b0e271edf2c3c7"},{url:"assets/socket.bffa0769.js",revision:"ebf3bb2b8fab1e5d47985a56583df79b"},{url:"assets/TarjetaLayout.cfe925ad.js",revision:"67c408f83154a2ecdd5677e7160fa832"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.082a20fd.js",revision:"3cb6a2a52e6e089e94046d1e320050ad"},{url:"assets/transferApi.edf5ea3f.js",revision:"d9f2c49c0bc7fae7da5cf4d58731aaaa"},{url:"assets/Transfers.2fbf292a.js",revision:"87d24e4adca11054d91ae6a61f211ab1"},{url:"assets/uid.42677368.js",revision:"01add560b365ffb4147667d832fc2267"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.2528ee81.js",revision:"00ccfe3a66ac6d403ca0e5639bc2a870"},{url:"assets/use-quasar.db208929.js",revision:"2f59d5bad160520883c4ff3505392073"},{url:"assets/UserToolbar.1d1d8679.js",revision:"37fe75fee031ada83de138df03377500"},{url:"assets/ValeLYT.fdb1d178.js",revision:"4bd64c83ae7f187ac1600e7ceaa68a18"},{url:"assets/Validate.eb130f75.js",revision:"db9bcad611250867203b575a8b10237e"},{url:"assets/ValidationDepLYT.c18a06bc.js",revision:"83cb14dfe20bc304e544b6eb495d1f9a"},{url:"assets/VDB.64d8c61a.js",revision:"f81cc345ff77021cc8e786b57cc9ff57"},{url:"assets/viewTransfer.035442b4.js",revision:"e2f9c9d25b5fce0b9905040152e98d83"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"firebase-messaging-sw.js",revision:"3bfe63b7b9e4fc45666518808ee165a4"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargeninia.png",revision:"d491739dd5dcb92d42756510cb221916"},{url:"icons/Juguete/xlargeninio.png",revision:"c0891e5817c1365086eac933ce9af118"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.PNG",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"4dc633464e00f7a0af838764f366b1b6"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
