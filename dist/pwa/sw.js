if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let d={};const r=e=>a(e,f),b={module:{uri:f},exports:d,require:r};s[f]=Promise.all(i.map((e=>b[e]||r(e)))).then((e=>(c(...e),d)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/AppFullscreen.363e7e4e.js",revision:"bb3f9240477fb46b74cafad853888a1a"},{url:"assets/assistApi.1e6ecf0d.js",revision:"f9467d4fabce02660b18327b4a7fbf83"},{url:"assets/auth.2dee59fe.js",revision:"758d43c0cec097322cc8eee016ad85fd"},{url:"assets/AuthLayout.fc3601e7.js",revision:"97a543fcbbb6bfe3c0c15b42272352c7"},{url:"assets/axios.ae0a941c.js",revision:"a1d6a1ba1cd4f706317ad8344eb571d0"},{url:"assets/axios.f1f32898.js",revision:"392f441216aed13247304efbbe6d51f1"},{url:"assets/browser.94c942de.js",revision:"6680740c031b2e8463a7478576d23697"},{url:"assets/cardStores.58c327c5.js",revision:"70d28997add002ab16171d67d75730c6"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.e594e568.js",revision:"61bbb6d296e2c32c3b3af45938445ea7"},{url:"assets/CompareLayout.4f1d3571.js",revision:"20e33f7f217c4893783c7231141babb8"},{url:"assets/date.ccff467a.js",revision:"7b20a15d17797fecb61ad09e8e8aa8a0"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/Deposits.634ef295.js",revision:"542ddc0f356f0b82015db18df7f4e162"},{url:"assets/ErrorNotFound.94c60320.js",revision:"aa6f0ffe773d1e04bda91b50312a60af"},{url:"assets/exceljs.min.9e24d01d.js",revision:"cb40677d4a9c917aae9326d190259989"},{url:"assets/export-file.dc78ba05.js",revision:"458d607ecdb7aeda263d87e05f3eb699"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/Index.0882290f.js",revision:"9dbe0548d2b4cd912331c5c97e6172c1"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/index.369716fd.js",revision:"259cc5687e65bd04125b28e1cee6cec5"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/index.es.dbd19ec8.js",revision:"9b1556b665d4ae28bc649987d2c417c2"},{url:"assets/IvaLayout.483b3164.js",revision:"53520f825af463cbf9dbaf4d735bfde0"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/jspdf.plugin.autotable.589602f5.js",revision:"c4100fd1b75dc46dd7932c3f5a6d1673"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LabelsLayout.dcea7254.js",revision:"0906e48354aa84113dbed9f61414a374"},{url:"assets/LauncherLayout.62d572c8.js",revision:"bab2fa9749ff0629b4caa647ab02664c"},{url:"assets/ModifyLayout.f250fac6.js",revision:"11e49a26009c4dc636d83959445bea81"},{url:"assets/OpenLayout.67a5266a.js",revision:"60f79d16c1eaed5766910d14117c2658"},{url:"assets/PagosTarjetas.5e2f7c52.js",revision:"0bee874ac27270d4216de14e83e23808"},{url:"assets/ProductsAutocomplete.048535a6.css",revision:"bd61f8912cc31a3aae8c6f75ffdca9fa"},{url:"assets/ProductsAutocomplete.8286535d.js",revision:"d8d5a6faa8878c7aa5343a03d8b4ffd4"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.f72e859d.js",revision:"6d70a9879a2b0b27b15734cdc79f3d4e"},{url:"assets/QCard.c13ab44c.js",revision:"62112b565cd58a1f04f3402c02610623"},{url:"assets/QCardActions.2bd99c11.js",revision:"bb4285af8a0958297b6915a9fb89dd19"},{url:"assets/QCheckbox.f3f82b2a.js",revision:"e62ee9d3e157fc1d017b99ba0ed42db5"},{url:"assets/QDate.4941f27d.js",revision:"66808c9086c3c870fa1b5a458a5fd158"},{url:"assets/QDialog.66c5b5fe.js",revision:"aa520ab5eea33cddced7b7f665a560fd"},{url:"assets/QForm.84f8e3cb.js",revision:"4c0fe8eac5b0f8cfa2f7e6aceb6d3f36"},{url:"assets/QInput.33460271.js",revision:"29990ae8bfa2e892b83c0091056530b3"},{url:"assets/QLayout.464b3311.js",revision:"51c6e77013dd5e428e2f2c6bfe4ffb84"},{url:"assets/QLinearProgress.c07397e6.js",revision:"076962366c8a2c5e9a003b106c88aeee"},{url:"assets/QList.8329febc.js",revision:"d3477b677c28d3d7019dbef453dfa68c"},{url:"assets/QPage.0b282506.js",revision:"86be0f15d63f09e525beda085aa40f70"},{url:"assets/QResizeObserver.6e80ed71.js",revision:"01aad9c9ee1c49e15f927a1fa70cdef7"},{url:"assets/QSelect.f95d6453.js",revision:"482065c44e7d1f9a6ae803838f34abf9"},{url:"assets/QSeparator.897331b8.js",revision:"fc033f0357a77b6b6f9b63b7a95d8d95"},{url:"assets/QSpinnerFacebook.806e7712.js",revision:"80dbefc66dea85bbd0d3fc0618d65d6f"},{url:"assets/QTable.052320bb.js",revision:"de4fa809f17ae69952f3e6656e6bdd0e"},{url:"assets/QToolbar.9facd0cd.js",revision:"6610464e9046c61e6408ee4dd5b64dae"},{url:"assets/QTooltip.77e3431b.js",revision:"78c448da282b17981262ea3fc8e23bfb"},{url:"assets/SaleLayout.202bf197.js",revision:"74d95e9b5a57fe3029501d692b756d6d"},{url:"assets/SaleStore.409bd62e.js",revision:"dac8fa4b66654433f216928657ccf8d5"},{url:"assets/Setter1.47c65337.js",revision:"6fed5fe63c1adf59b144cb3dbc1b8281"},{url:"assets/TarjetaLayout.4dd25296.js",revision:"e72a49cafcf740e5495bd8f23b8de02b"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/TouchPan.6ca63ae2.js",revision:"f107a4023a2ef8ed82c78b91390da536"},{url:"assets/transferApi.355b732a.js",revision:"fad0e099057e322a73ec2cd5a494f7b8"},{url:"assets/Transfers.1ddd911c.js",revision:"6403ba8d472a62a34499d3a315d2cac1"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-key-composition.b6a88028.js",revision:"fc7d8112873864a898503f98ba5720d1"},{url:"assets/use-quasar.47417024.js",revision:"64f83d2f3510c3a43c985d126bd3242e"},{url:"assets/UserToolbar.e067d683.js",revision:"e24e007887e26df034bedc52aae9565f"},{url:"assets/ValeLYT.46891309.js",revision:"8749ac882be47d098e5f485153a7b1e4"},{url:"assets/VDB.63b3c919.js",revision:"af2685454e590f6c0780952293a0b857"},{url:"assets/viewTransfer.18143877.js",revision:"156a2c28dad8ce256499e14477952706"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/Juguete/Ninia.png",revision:"8d48336a996ac756d8a8a9f5a24fd63d"},{url:"icons/Juguete/Ninia1.png",revision:"a87b399b049dea215c09784d96f77a6e"},{url:"icons/Juguete/Ninio.png",revision:"ebfaed7782ba11667482fe06d5634a0e"},{url:"icons/Juguete/xlargenina.png",revision:"8e2e45ef635de7381692e221023e9d99"},{url:"icons/Juguete/xlargenino.png",revision:"76dc09a087fe8cb105ae40e01230b2b0"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/Navidad/Navidad6.png",revision:"78bc03b12d92eb9b1517d3b07fffed82"},{url:"icons/Navidad/Navidad6(1).png",revision:"13b0635e53e08019b30e7bacdd010a3e"},{url:"icons/Navidad/Navidad6(2).png",revision:"8a6e8e8fed887b3427532d03b2be7637"},{url:"icons/Navidad/Navidad9(1).png",revision:"5f9d80d80d078979e8b683fe49c3b18d"},{url:"icons/Navidad/Navidad9(2).png",revision:"e92f350285ce555f110a50e418060b07"},{url:"icons/Navidad/NavidadVer(1).png",revision:"2929b587cbfc568407bbf42c3e65cc0f"},{url:"icons/Navidad/NavidadVer(2).png",revision:"cd4061729d1f275984d5173b286d519f"},{url:"icons/Navidad/NaviSan(1).png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/Navidad/santaclaus.png",revision:"82bb3fb9e06c5be66d762c80164dbe24"},{url:"icons/navidaddiafestivo.png",revision:"afd0daffe69bdca31b388de82109ff20"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"0a06deb34af1659d388e766e6f338722"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
