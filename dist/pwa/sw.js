if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,f)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let b={};const r=e=>a(e,i),d={module:{uri:i},exports:b,require:r};s[i]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(f(...e),b)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/auth.bbf86a06.js",revision:"6bef10d9a8dcfc0098650b850b42bec1"},{url:"assets/AuthLayout.738ea9a5.js",revision:"b652a0de1f48c742678d19d1c638f333"},{url:"assets/axios.c0b5b9b1.js",revision:"45f62f9dc0bf11a973b7d7045323898c"},{url:"assets/axios.ca027570.js",revision:"61ceb5a247adc718062324658f3db790"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.6405761e.js",revision:"e8b5fb4ec7a9729714364217eebef463"},{url:"assets/dayjs.min.25545ff6.js",revision:"5584e1adedf6efee7cab7f47cb2af34e"},{url:"assets/ErrorNotFound.522c187f.js",revision:"90fd87a700d12c5a5cc0bd71dd9706ab"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/html2canvas.esm.0eae2bf4.js",revision:"57e52999e4fe32560f4d4f7cb3c65b94"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/index.29976989.js",revision:"7d8311fcb1075797af363a1e755d17d5"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/index.es.4e0081e8.js",revision:"474385efa5705f2e73e007ff64ec6604"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/IvaLayout.fc6844df.js",revision:"a28c68c785ac142a7d33eeaaaeac4844"},{url:"assets/jspdf.plugin.autotable.3ad432b0.js",revision:"3fae3385f610af2ee3fbb124bac83b44"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LauncherLayout.8ed83ddd.js",revision:"db9a98e3751fa887c3e7fd65fd43741f"},{url:"assets/ModifyLayout.2eb1eb0f.js",revision:"de04a20a6cfe3d087c1afcb28d5ea445"},{url:"assets/OpenLayout.9745bb39.js",revision:"50bdb8769cf005fe3c7dd455b0d5dab3"},{url:"assets/PagosTarjetas.d1134cc1.js",revision:"2257ffbab42a445c9b8fbde8e7986019"},{url:"assets/position-engine.806fd8a8.js",revision:"a4e7f2fcf64e87925e73a7b1fe097409"},{url:"assets/purify.es.204ee570.js",revision:"66b196301034a985d4b946629a16773a"},{url:"assets/QBadge.c7815e83.js",revision:"98f48689ceda2e79cb8c384a00185e85"},{url:"assets/QCheckbox.89e608d0.js",revision:"e78bcfc28e7dc2c613bdb2f90161f2c4"},{url:"assets/QDialog.cfb983b6.js",revision:"a9aaa8af814f2576bf87bf0d654e60df"},{url:"assets/QForm.a228e37f.js",revision:"ff61744121fce29c615c5da213fd1d0b"},{url:"assets/QInput.30190d3b.js",revision:"6b4fb0717eaa2561f49b610d16eb483c"},{url:"assets/QItem.c9d2b024.js",revision:"07f2b865c5135107a500b7a93cadfd30"},{url:"assets/QLayout.da052c12.js",revision:"30c523a3c3f208a1f0fb43d411351b2e"},{url:"assets/QLinearProgress.a6e2baec.js",revision:"de0760e2bce2fbc20dfd56deceb7501c"},{url:"assets/QList.9fa2b159.js",revision:"33d0fa4ab7487cab5e179b5b61c6ce45"},{url:"assets/QPage.236f1c8f.js",revision:"b185b06cff0dbbc74f360d7019dc65f1"},{url:"assets/QSelect.fab2c98e.js",revision:"e1eb564a83d093da0fea43946e47e35b"},{url:"assets/QSpinnerFacebook.d165ad08.js",revision:"1b388555b3d9eff115b3b7ed959ce035"},{url:"assets/QTable.5e06e689.js",revision:"9ea296939cc99d8bdf6edd187abcc724"},{url:"assets/QTooltip.5999dc27.js",revision:"3011b042e5e5b28ddb28b44bac66f120"},{url:"assets/SaleLayout.f5c5d1e8.js",revision:"d7dcc24570fc0161266dbb309c61e069"},{url:"assets/SaleStore.0d8189e4.js",revision:"e30c6f2aa51aea38269651664beef373"},{url:"assets/Setter1.14163203.js",revision:"a6d19bf49186abd247a5fee703660258"},{url:"assets/TarjetaLayout.caafcde6.js",revision:"f9c0b856b1f83eb6609766cc98ba12cc"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/use-cache.b0833c75.js",revision:"d45f61c33f10a0a891dd5ee39a64ecaf"},{url:"assets/use-quasar.7cc38451.js",revision:"45b8d9fe9f60f88245a7d82f8ca1e19e"},{url:"assets/UserToolbar.b1051b39.js",revision:"d5b026702f3723b2f7c6a4bf49340044"},{url:"assets/ValeLYT.0b888d71.js",revision:"1e9b69076d76cc2c0dab79673a94fc79"},{url:"assets/VDB.4bfbfae9.js",revision:"dc47c9cedba42616c45afb2f3c368635"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"adf0c172c4349208d28fed0febc3459e"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
