if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,f)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let o={};const r=e=>a(e,i),n={module:{uri:i},exports:o,require:r};s[i]=Promise.all(c.map((e=>n[e]||r(e)))).then((e=>(f(...e),o)))}}define(["./workbox-17c5f633"],(function(e){"use strict";e.setCacheNameDetails({prefix:"vhelpers"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/_commonjsHelpers.88e99c8f.js",revision:"a6469467c44b15c9cd4b998680788b26"},{url:"assets/auth.3224b8df.js",revision:"8be179d10589de36097c0957535cad29"},{url:"assets/AuthLayout.434a0697.js",revision:"28da48d797d637cdbc3c6366c96840ff"},{url:"assets/axios.47906acf.js",revision:"ece6da0251cfbbe13924fec38870525b"},{url:"assets/ChocolatesBold.27257b6d.otf",revision:"1288c66af47faec9b3e386d18a2878d4"},{url:"assets/ChocolatesExtraBold.de7afbdc.otf",revision:"5cc11bff91d8ec6f4d36a6d2b85f3adb"},{url:"assets/ChocolatesExtraLight.1bed87eb.otf",revision:"1a33248eaa7c458248470c6f6881505e"},{url:"assets/ChocolatesLight.d902d4f4.otf",revision:"67e92212a3e645e4d37ffb531422b5ae"},{url:"assets/ChocolatesMedium.fc56cc91.otf",revision:"7f9be627902046584d39415b45ac90fe"},{url:"assets/ChocolatesRegular.264b1442.otf",revision:"6654d460065b7385f798b63ca67a46e6"},{url:"assets/ChocolatesSemiBold.932ecc5f.otf",revision:"1bd1e5cfa167843258e36ffaac96b5aa"},{url:"assets/CiclicosLayout.b4c6e293.js",revision:"dfa5f5e7d3d9e352d793fe9ae91c5283"},{url:"assets/ErrorNotFound.08688a18.js",revision:"71a3642df76fe6e4d904f647f164cba3"},{url:"assets/fa-brands-400.2ef6fdde.ttf",revision:"94227daa6303fd42918ce3af431ef7e8"},{url:"assets/fa-brands-400.f4617423.woff2",revision:"83a42241ada98e0f959353ca0c3ee027"},{url:"assets/fa-regular-400.12dea17b.ttf",revision:"47fa5e12e9fc4e8325a6e1a0735b38f6"},{url:"assets/fa-regular-400.7ba24c41.woff2",revision:"3f505ed834ca9466cf7efc2806b86604"},{url:"assets/fa-solid-900.67a880b4.ttf",revision:"e8132d053030afa547e23b5163ef8301"},{url:"assets/fa-solid-900.e2c5cf54.woff2",revision:"44f8148f80e6c3d60fa6425b0cbb862a"},{url:"assets/fa-v4compatibility.7c377405.woff2",revision:"60cd2d66cb03cd2521862a12f970dbe9"},{url:"assets/fa-v4compatibility.8d9500e8.ttf",revision:"91fc9b0078b939bddcde338550684848"},{url:"assets/fastclick.8a4a8267.js",revision:"40efabedb876d409f1732920a78f9ae0"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.83be7b2f.woff2",revision:"393b5d8b3fd798486652801f3ee8c6ea"},{url:"assets/index.135abfce.css",revision:"dc1a640c42eeb0afb79ef700baa1fa58"},{url:"assets/index.15ed693a.js",revision:"9b8c1cd361ef3b7a767b8363399a140e"},{url:"assets/index.6ece48f5.js",revision:"5eafb354372b61fdf583d618968112c5"},{url:"assets/IvaLayout.d2d23368.js",revision:"bc521dfd2db55f1c976f53be9c6f2d72"},{url:"assets/IvaLayout.dda841f2.css",revision:"b254c72934e8316f329d3ba2e32c04a5"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LauncherLayout.ea5a331b.js",revision:"f576cc522200e226372cc8a032f4b903"},{url:"assets/ModifyLayout.ca57347f.js",revision:"6207c5d1ef34a98447ad417108d2868e"},{url:"assets/QDialog.61d5aba8.js",revision:"a9ed99bc2e212e05735e2a748409455b"},{url:"assets/QForm.5eaf4723.js",revision:"b97aa8f9590d862ca416bd1300f1d379"},{url:"assets/QInput.fbea826e.js",revision:"9125151bfe8e73614820c655aaa0e1e6"},{url:"assets/QLayout.a843e4a9.js",revision:"0f6b21636aa8194c0eb771e3b378272a"},{url:"assets/QSelect.184a5c63.js",revision:"cb368f4dbde12083f1671c9a891b2279"},{url:"assets/QTable.3fedd4a0.js",revision:"707e8be2eeeb2eac34f28011a34d4609"},{url:"assets/Setter1.11fb57b9.js",revision:"b1b4343e3ffbacfc641b0f86476653bd"},{url:"assets/TarjetaLayout.8e1944f3.js",revision:"e96dede107ec74508f1e76b07ca60559"},{url:"assets/touch.70a9dd44.js",revision:"f9cd7355694b15b01548ffe718cdba2b"},{url:"assets/use-key-composition.416b3ac9.js",revision:"92ba0524dacc8e2695b1b32a73eed37b"},{url:"assets/use-quasar.f229bbe2.js",revision:"a9eed7719d9cf60b73d50ec98bef7919"},{url:"assets/UserToolbar.f4560c7c.js",revision:"0c075c2291e0a54be923c375cf5b3645"},{url:"assets/VDB.80d2551f.js",revision:"b15b1271630596eae93f5e25fad5fb0f"},{url:"favicon.ico",revision:"75b1d9ec943519394eaf3bf0afe3005c"},{url:"icons/apple-icon-120x120.png",revision:"4576ab80b2a84c21370caf003812f824"},{url:"icons/apple-icon-152x152.png",revision:"0bfc53a2481ea8f4febcb3f81a0ac511"},{url:"icons/apple-icon-167x167.png",revision:"77376efbd33b4fe81f52422bb4c406ba"},{url:"icons/apple-icon-180x180.png",revision:"68e1a1eeab22fbca4e4b59c9101fb8da"},{url:"icons/apple-launch-1125x2436.png",revision:"70f5586a0a1ae427d654f4029d42fdcb"},{url:"icons/apple-launch-1170x2532.png",revision:"4aaab1136a4f0b7a38763311a5fe3382"},{url:"icons/apple-launch-1242x2208.png",revision:"d24569144b80777ccb4c08f96d66e633"},{url:"icons/apple-launch-1242x2688.png",revision:"486eb6c2bd56026260d3df6d6c854735"},{url:"icons/apple-launch-1284x2778.png",revision:"194b6a076c843df9ca6bd0f212c7df1b"},{url:"icons/apple-launch-1536x2048.png",revision:"0f5affab4c9f9ff2b5098817f599a453"},{url:"icons/apple-launch-1620x2160.png",revision:"17537cb0d5716ebb021c7a4a4662ae77"},{url:"icons/apple-launch-1668x2224.png",revision:"38f88aa265f377fac8bb4e94a32981e3"},{url:"icons/apple-launch-1668x2388.png",revision:"dae5d93be8ed2328cefb791ba02743d2"},{url:"icons/apple-launch-2048x2732.png",revision:"3581777468fc414cf47a8c5973701b31"},{url:"icons/apple-launch-750x1334.png",revision:"365a9d69e50642733c9a19b53751d44c"},{url:"icons/apple-launch-828x1792.png",revision:"0b67ed14c438009934730d463e539f71"},{url:"icons/favicon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/favicon-16x16.png",revision:"019eac8de440a1581dfad711ec1a42d8"},{url:"icons/favicon-32x32.png",revision:"cd7e29fff4e160886f68f2260feefe3f"},{url:"icons/favicon-96x96.png",revision:"8038011048f8d0f07f7349c22eec5a3b"},{url:"icons/icon-128x128.png",revision:"acdface08055e6d3da7cd96feac4b44a"},{url:"icons/icon-192x192.png",revision:"a30191ac1b55641a1be555a180d753db"},{url:"icons/icon-256x256.png",revision:"b99ea08e66f6375d5dcc5afc1de4c4c1"},{url:"icons/icon-384x384.png",revision:"6fa6b1e25b7b7008cd0f4498dad7c93b"},{url:"icons/icon-512x512.png",revision:"bb902c0f0170ee776002199575f5cabf"},{url:"icons/ms-icon-144x144.png",revision:"34318be0ba8b78c9fb4fa6e7d0a48a14"},{url:"icons/safari-pinned-tab.svg",revision:"0c0c197eedf1a9022aece4ae83c8de58"},{url:"index.html",revision:"83c701a420f5beb9755e7979dfa4f843"},{url:"manifest.json",revision:"fab72fe87fab5aa171ec0186b9e63b76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
