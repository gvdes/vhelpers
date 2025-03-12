import{Q as U}from"./QSeparator.ba51ae44.js";import{r as O,o as Q,a as ue,w as i,e as a,i as m,a3 as T,Y as K,Q as x,g as j,h as q,a4 as A,a2 as J,a5 as me}from"./index.64d07cb3.js";import{Q as pe}from"./QToolbar.b4f73ffe.js";import{Q as fe}from"./QHeader.9bc82976.js";import{Q as _e}from"./QInput.213f4be8.js";import{Q as Te}from"./QTable.bd7e3a51.js";import{Q as Ee}from"./QSpinnerFacebook.d0796fc6.js";import{Q as ve}from"./QTooltip.9c7facf4.js";import{Q as F}from"./QDialog.056effa8.js";import{u as ge,Q as D,a as I}from"./use-quasar.fb283d0b.js";import{a as Z,b as y,Q as Y}from"./QSelect.c45a9660.js";import{Q as Ce}from"./QList.fdccf39c.js";import{Q as $}from"./QCardActions.dd6c4c2d.js";import{Q as xe}from"./QForm.cf1e591e.js";import{Q as he}from"./QDate.2a88d916.js";import{Q as be}from"./QPage.6097ff99.js";import{Q as Ae,a as Ie}from"./QLayout.c5b40ead.js";import{C as W}from"./ClosePopup.a2a932ab.js";import{u as ye}from"./VDB.8e1161f2.js";import{_ as Oe}from"./UserToolbar.7233ef5d.js";import{a as P}from"./axios.f1f32898.js";import{e as Se}from"./export-file.dc78ba05.js";import{E as X,a as k}from"./jspdf.plugin.autotable.771eb461.js";import{E as Ne}from"./exceljs.min.9e24d01d.js";import{a as Re}from"./axios.30672b3a.js";import"./QResizeObserver.c65ae7ea.js";import"./use-key-composition.f67b4e43.js";import"./uid.42677368.js";import"./QLinearProgress.c4e5bb76.js";import"./QCheckbox.dd63c467.js";import"./position-engine.1f374269.js";import"./rtl.b51694b1.js";import"./use-cache.b0833c75.js";import"./date.48ff8f1b.js";import"./_commonjsHelpers.88e99c8f.js";const Fe=m("span",{class:"text-h6"},"Consulta de Pagos",-1),Pe={class:"justify-end"},Le={key:0},De={class:"row"},Ve={class:"col"},we={class:"col"},Ue={key:0},Qe={class:"text-h4"},$e={class:"text-subtitle2"},Me={class:"text-h5"},He={class:"text-h5 text-center"},ze={class:"text-h5 text-center"},Be=m("div",{class:"text-h6 text-center"},"Impresora",-1),Ge={class:"q-pa-md"},Ke=m("div",{class:"q-pb-sm"},null,-1),je=m("span",{class:"text-bold text-h6"},"Selecciona el Formato \u{1F60A}",-1),Nt={__name:"TarjetaLayout",setup(qe){const h=ye(),f=ge(),V=[{name:"terminal",label:"TERMINAL",align:"center",field:t=>t.TERMINAL},{name:"ticket",label:"TICKET",align:"center",field:t=>t.TICKET},{name:"cliente",label:"CLIENTE",align:"center",field:t=>t.CLIENTE},{name:"fecha",label:"FECHA",align:"center",field:t=>t.FECHA},{name:"hora",label:"HORA",align:"center",field:t=>t.HORA},{name:"efectivo",label:"EFECTIVO",align:"center",field:t=>t.EFECTIVO},{name:"tarjetas",label:"TARJETAS",align:"center",field:t=>t.TARJETAS},{name:"transferencias",label:"TRANSFERENCIAS",align:"center",field:t=>t.TRANSFERENCIAS},{name:"creditos",label:"CREDITOS",align:"center",field:t=>t.CREDITOS},{name:"vales",label:"VALES",align:"center",field:t=>t.VALES}],ee=O({val:null,body:null}),E=O({state:!1,val:null,body:null}),b=O({val:null,filter:null,state:!1,body:null}),S=O(!1),d=O({state:!1,body:null}),w=O(!1),N=O(!1),L=O(null),_=O({state:!1,val:null,opts:[{id:1,label:"Factura"},{id:2,label:"Ticket"}]}),te=()=>{let t=d.value.body.TICKET.split("-"),l={type:"Reimpresion",serie:t[0],folio:t[1],print:E.value.val.ip_address};w.value=!0;let s=`http://${h.session.store.ip}/access/public/modify/newmod`;P.post(s,l).then(c=>{console.log(c),w.value=!1,E.value.val=null,E.value.state=!1}).catch(c=>c)},M=async()=>{console.log("Recibiendo Datos :)"),S.value=!0;let l=`http://${h.session.store.ip}/access/public/reports/getCash`;P.get(l).then(o=>{ee.value.body=o.data.terminales,b.value.body=o.data.formaspagos,console.log(o.data),b.value.state=!0,S.value=!1,console.log("ya lo recibi que no te enganen :)"),ae()}).catch(o=>console.log(o))},ae=async()=>{let t=h.session.store.id;console.log(t);try{let l=await Re.get(`/cashier/getPrinters/${t}`);l.status==200&&(E.value.body=l.data,console.log("Impresoras listas :)"))}catch(l){console.log(l),f.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},H=(t,l,o)=>{let s=l!==void 0?l(t,o):t;return s=s==null?"":String(s),s=s.split('"').join('""'),/^\d{1,2}-\d{4}$/.test(s)&&(s=`'${s}`),`"${s}"`},le=()=>{const t=[V.map(o=>H(o.label))].concat(b.value.body.map(o=>V.map(s=>H(typeof s.field=="function"?s.field(o):o[s.field===void 0?s.name:s.field],s.format,o)).join(","))).join(`\r
`);Se("reporteCobros.csv",t,"text/csv")!==!0?f.notify({message:"Browser denied file download...",color:"negative",icon:"warning"}):f.notify({message:"Descarga Completa :)",color:"positive",icon:"check",position:"center"})},oe=()=>{console.log(L.value);let t={filt:L.value};console.log("Recibiendo Datos :)"),S.value=!0;let o=`http://${h.session.store.ip}/access/public/reports/filter`;P.post(o,t).then(s=>{b.value.body=s.data.formaspagos,b.value.state=!0,S.value=!1,N.value=!1,console.log("ya lo recibi que no te enganen :)")}).catch(s=>console.log(s))},se=(t,l)=>{console.log("aqui se podra reimprimir"),console.log(l.TICKET),d.value.state=!0,d.value.body=l},z=()=>{f.loading.show({message:"Importando Ticket"});let t=h.session.store.ip,l=d.value.body.TICKET;const o=`http://${t}/access/public/modify/getTicket/${l}`;P.get(o).then(s=>{_.value.val.id==1?re(s.data).then(c=>{f.notify({message:`El ticket ${l} se descargo correctamente`,type:"positive",position:"center"}),_.value.state=!1,_.value.val=null,f.loading.hide()}).catch(c=>{f.notify({message:`El ticket ${l} no se descargo correctamente`,type:"negative",position:"center"})}):_.value.val.id==2&&ie(s.data).then(c=>{f.notify({message:`El ticket ${l} se descargo correctamente`,type:"positive",position:"center"}),_.value.state=!1,_.value.val=null,f.loading.hide()}).catch(c=>{f.notify({message:`El ticket ${l} no se descargo correctamente`,type:"negative",position:"center"})})}).catch(s=>console.log(s))},ne=(t,l)=>{let o=70;return t.forEach(s=>{o+=7}),o+=10,l.forEach(s=>{o+=4}),o+=41,o},ie=t=>new Promise((l,o)=>{try{let s=t.products,c=t.payments,n=ne(s,c);console.log(t.products[0].ARTICULO);const e=new X({format:[80,n]});n=62,e.setFontSize(8),e.text("----------------------------------------------------------------------------",2,10),e.text(t.empresa.CTT1TPV,2,13),e.text(t.empresa.CTT2TPV,2,16),e.text(t.empresa.CTT3TPV,2,19),e.text(t.empresa.CTT4TPV,2,22),e.text(t.empresa.CTT5TPV,2,25),e.text(t.header.TERMINAL,2,34),e.text(`N\xBA ${t.header.TICKET}`,2,37),e.text(`FECHA ${t.header.FECHA}`,20,37),e.text(t.header.HORA,50,37),e.text(`Forma de Pago: ${t.header.PAGOPRINCIPAL}`,2,40),e.text(t.header.NOMBRECLIENTE,2,43),e.text(t.header.DOMICILIO,2,46),e.text(t.header.POBALCION+t.header.CODIGOPOSTAL,2,49),e.text(t.header.PROVINCIA,2,52),e.text("_________________________________________________",2,58),e.text("ARTICULO",2,61),e.text("UD.",25,61),e.text("PRECIO",40,61),e.text("TOTAL",57,61),e.text("_________________________________________________",2,62);let R=0;s.forEach(p=>{e.setFontSize(6),n+=3,e.text(p.ARTICULO+"   "+p.DESCRIPCION.substring(0,47),2,n),n+=4,e.text(Number(p.CANTIDAD).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),25,n),e.text(Number(p.PRECIO).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),40,n),e.text(Number(p.TOTAL).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),57,n),R+=Number(p.CANTIDAD)}),n+=10,e.setFontSize(8),e.setFont("helvetica","bold"),e.text("TOTAL",54,n,"right"),e.text(`$ ${Number(t.header.TOTAL).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,56,n,"left"),e.setFont("helvetica","normal"),c.forEach(p=>{n+=4,e.text(p.CONCEPTOPAGO,54,n,"right"),e.text(`$ ${Number(p.IMPORTE).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,56,n,"left")}),n+=5,e.text(`N Articulos: ${R}`,2,n),n+=5,e.setFontSize(6),e.text(`Le Atendio: ${t.header.DEPENDIENTE}`,2,n),n+=5,e.setFontSize(8),e.text("---------------------------------Grupo-Vizcarra----------------------------",2,n),n+=5,e.text(t.empresa.PTT1TPV,2,n),n+=3,e.text(t.empresa.PTT2TPV,2,n),n+=3,e.text(t.empresa.PTT3TPV,2,n),n+=3,e.text(t.empresa.PTT4TPV,2,n),n+=3,e.text(t.empresa.PTT5TPV,2,n),n+=3,e.text(t.empresa.PTT6TPV,2,n),n+=3,e.text(t.empresa.PTT7TPV,2,n),n+=3,e.text(t.empresa.PTT8TPV,2,n),e.save(`Ticket ${t.header.TICKET}`),l()}catch(s){o(s)}}),re=t=>new Promise((l,o)=>{try{let c=t.products,n=t.payments;const e=new X;let R=[];const p=c.map(g=>Object.values(g)),r=Math.ceil(p.length/20);for(var s=0;s<p.length;s+=20)R.push(p.slice(s,s+20));console.log(R);for(let g=0;g<1;g++)R.forEach(function(u,C){C>0&&e.addPage();let B=0,G=0;for(let v=0;v<u.length;v++)u[v][1]=u[v][1].replace(/\n/g," "),u[v][2]=parseFloat(u[v][2]),u[v][3]=Number(u[v][3]).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),u[v][4]=Number(u[v][4]).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),B+=parseFloat(u[v][2]),G+=parseFloat(u[v][4].replace(/,/g,""));e.setFontSize(25),e.setFont("helvetica","bold"),e.text("GRUPO VIZCARRA",105,10,"center"),e.setFontSize(8),e.text("Hora Ticket:",10,10,"left"),e.text(t.header.HORA,10,15,"left"),e.setFontSize(12),e.text(`${t.header.NOMBRECLIENTE} ${t.header.CLIENTE}`,10,25,"left"),e.text(`SUCURSAL ${t.empresa.DESTPV}`,120,25,"left"),e.setFontSize(8),e.text(t.header.DOMICILIO,10,30,"left"),e.text(t.header.CODIGOPOSTAL,10,35,"left"),e.text(t.header.POBALCION+t.header.PROVINCIA,10,40,"left"),e.text(t.empresa.CTT3TPV,120,30,"left"),e.text("LLI1210184G8",120,45,"left"),e.rect(120,51,80,5),e.text("DOCUMENTO",121,55,"left"),e.text("FACTURA",121,60,"left"),e.text("NUMERO",143,55,"left"),e.text(t.header.TICKET,143,60,"left"),e.text("PAGINA",165,55,"left"),e.text(`${C+1} de ${r}`,165,60,"left"),e.text("FECHA",185,55,"left");const ce=t.header.FECHA;e.text(ce,185,60,"left"),k(e,{startX:10,startY:65,theme:"grid",styles:{cellPadding:1,fontSize:8,halign:"center"},head:[["CREADOR DOC","ALMACEN","AGENTE","FORMA DE PAGO"]],body:[["APP","GEN",t.header.DEPENDIENTE,n[0].CONCEPTOPAGO]]}),k(e,{alternateRowStyles:{fillColor:[192,192,192]},startX:10,startY:80,theme:"striped",styles:{cellPadding:.6,fontSize:8,halign:"left"},head:[["ARTICULO","DESCRIPCION","CANTIDAD","PRECIO","TOTAL"]],body:u,columnStyles:{0:{fontStyle:"bold",halign:"left"},1:{fontStyle:"bold",halign:"left"},2:{halign:"center"},3:{halign:"center"},4:{halign:"center"}}}),e.setFontSize(11),e.text("TOTAL UNIDADES:",60,200,"left"),e.text(Number(B).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),100,200,"left"),e.setFont("helvetica","bold"),e.text("TOTAL:",140,200,"left"),e.text(`$ ${Number(G).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,160,200,"left"),e.setFontSize(8),e.text("Debo(emos) y pagare(mos) incondicionalmente por este pagare a la order de GRUPO VIZCARRA, en la ciudad de Mexico,",5,210,"left"),e.text("la cantidad de el valor recibido a mi(nuestra) entera satisfaccion",5,215,"left"),e.text("Este pagare forma parte de una serie numerica del 1 al y 9 y todos estos estan sujetos a la condicion, de que al no pagarse cualquiera de ellos a su",5,220,"left"),e.text("vencimiento sean exigibles todos los que le sigan en numero, ademas de los ya vencidosm desde la fecha de su vencimiento de el presente documento",5,225,"left"),e.text("hasta el dia de su liquidacion, causaran intereses moratorios al tipo del % mensual en esta ciudad justamente con el principal",5,230,"left"),e.setFontSize(15),e.text("______________",31,248,"center"),e.text("AUTORIZO",20,254,"left"),e.text("______________",85,248,"center"),e.text("CHOFER",75,254,"left"),e.text("______________",140,248,"center"),e.text("RECIBIO",130,254,"left"),e.text("______________",168,248,"left"),e.text("FECHA Y HORA",168,254,"left"),e.setFontSize(9),e.text("UNA VEZ ENTREGADA LA MERCANCIA EN LA FLETERA O DOMICILIO QUE INDIQUE EL CLIENTE ",5,260,"left"),e.text("LLUVIA LIGHT SA DE CV NO ES RESPONSABLE POR PEDIDAS TOTALES, PARCIALES ",5,265,"left"),e.text("O CUALQUIER TIPO DE DANO EN LA MERCANCIA DE ESTE DOCUMENTO ",5,270,"left"),e.setFont("helvetica","bold"),e.setFontSize(12),e.text("NO SE ACEPTAN CAMBIOS NI DEVOLUCIONES",5,275,"left"),e.setFontSize(25),e.setFont("helvetica","bold"),e.text("GRUPO VIZCARRA",105,10,"center")});e.save(`Factura ${t.header.TICKET}`),l()}catch(c){o(c)}}),de=async()=>{f.loading.show({message:"Importando Ticket"});let t=h.session.store.ip,l=d.value.body.TICKET;const o=`http://${t}/access/public/modify/getTicket/${l}`;P.get(o).then(s=>{const c=new Ne.Workbook,n=c.addWorksheet("Comparativo");n.addRow([s.data.empresa.DESTPV]).eachCell(r=>r.font={bold:!0}),n.addRow(),n.addRow(["Ticket","Fecha","Cliente","Alm.","Est.","For. pag.","Total"]).eachCell(r=>r.font={bold:!0});let e=s.data.header;n.addRow([e.TICKET,e.FECHA,`${e.CLIENTE}-${e.NOMBRECLIENTE}`,"GEN","Cobra",s.data.payments[0].CONCEPTOPAGO,Number(e.TOTAL)]),n.addRow(),n.addRow(["","C\xF3digo","Descripci\xF3n","Doc. Origen","Cantidad","P.Unidad","Total"]).eachCell(r=>r.font={bold:!0}),s.data.products.forEach(r=>{n.addRow(["",r.ARTICULO,r.DESCRIPCION,"",Number(r.CANTIDAD),Number(r.PRECIO),Number(r.TOTAL)])}),n.columns.forEach(r=>{let g=0;r.eachCell({includeEmpty:!0},u=>{const C=u.value?u.value.toString().length:10;C>g&&(g=C)}),r.width=g<10?10:g}),(async()=>{const r=await c.xlsx.writeBuffer(),g=new Blob([r],{type:"application/octet-stream"}),u=URL.createObjectURL(g),C=document.createElement("a");C.href=u,C.download=`Ticket${s.data.header.TICKET}.xlsx`,document.body.appendChild(C),C.click(),document.body.removeChild(C)})(),f.loading.hide(),console.log(s)}).catch(s=>{console.log(s)})};return h.session.rol=="aux"||h.session.rol=="gen"||h.session.rol=="aud"||h.session.rol=="root"?M():(f.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),M(),(t,l)=>(Q(),ue(Ae,{view:"hHh Lpr fFf"},{default:i(()=>[a(fe,{class:"transparent text-dark",bordered:""},{default:i(()=>[a(Oe),a(U),a(pe,{class:"justify-between"},{default:i(()=>[m("div",null,[T("Helpers "),a(K,{name:"navigate_next",color:"primary"}),T(),Fe])]),_:1})]),_:1}),a(Ie,null,{default:i(()=>[a(be,{padding:""},{default:i(()=>[m("div",Pe,[a(x,{color:"primary",icon:"event",onClick:l[0]||(l[0]=o=>N.value=!N.value),flat:"",round:""})]),a(U,{spaced:"",inset:"",vertical:"",dark:""}),b.value.state?(Q(),j("div",Le,[a(Te,{class:"my-sticky-header-table",title:"Fromas de Pago",rows:b.value.body,"row-key":"name",filter:b.value.filter,separator:"cell",onRowClick:se,columns:V},{"top-right":i(()=>[m("div",De,[m("div",Ve,[a(_e,{borderless:"",dense:"",debounce:"300",modelValue:b.value.filter,"onUpdate:modelValue":l[1]||(l[1]=o=>b.value.filter=o),placeholder:"Search"},{append:i(()=>[a(K,{name:"search"})]),_:1},8,["modelValue"])]),a(U,{spaced:"",inset:"",vertical:"",dark:""}),m("div",we,[a(x,{color:"primary",icon:"archive",dense:"","no-caps":"",flat:"",round:"",onClick:le})])])]),_:1},8,["rows","filter"])])):q("",!0),a(F,{modelValue:S.value,"onUpdate:modelValue":l[2]||(l[2]=o=>S.value=o),persistent:""},{default:i(()=>[S.value?(Q(),j("div",Ue,[a(Ee,{color:"primary",size:"7.5em"}),a(ve,{offset:[0,8]},{default:i(()=>[T("Cargando Informacion")]),_:1})])):q("",!0)]),_:1},8,["modelValue"]),a(F,{modelValue:d.value.state,"onUpdate:modelValue":l[5]||(l[5]=o=>d.value.state=o),persistent:""},{default:i(()=>[a(D,{style:{width:"700px","max-width":"70vw"}},{default:i(()=>[a(I,{class:"row justify-between"},{default:i(()=>[m("div",Qe,"Ticket : "+A(d.value.body.TICKET),1),m("div",$e,A(d.value.body.TERMINAL),1)]),_:1}),a(I,null,{default:i(()=>[m("div",Me,A(d.value.body.CNOFAC),1)]),_:1}),a(I,null,{default:i(()=>[m("div",He,A(d.value.body.CLIENTE),1),m("div",ze,A(d.value.body.FECHA),1)]),_:1}),a(I,null,{default:i(()=>[a(Ce,{bordered:""},{default:i(()=>[a(Z,null,{default:i(()=>[a(y,null,{default:i(()=>[T("EFECTIVO")]),_:1}),a(y,null,{default:i(()=>[T("TARJETA")]),_:1}),a(y,null,{default:i(()=>[T("TRANSFERENCIA")]),_:1}),a(y,null,{default:i(()=>[T("VALE")]),_:1}),a(y,null,{default:i(()=>[T("CREDITO")]),_:1})]),_:1}),a(Z,null,{default:i(()=>[a(y,null,{default:i(()=>[T(A(d.value.body.EFECTIVO),1)]),_:1}),a(y,null,{default:i(()=>[T(A(d.value.body.TARJETAS),1)]),_:1}),a(y,null,{default:i(()=>[T(A(d.value.body.TRANSFERENCIAS),1)]),_:1}),a(y,null,{default:i(()=>[T(A(d.value.body.VALES),1)]),_:1}),a(y,null,{default:i(()=>[T(A(d.value.body.CREDITOS),1)]),_:1})]),_:1})]),_:1})]),_:1}),a($,{align:"center"},{default:i(()=>[J(a(x,{flat:"",color:"negative",icon:"close"},null,512),[[W]]),a(x,{flat:"",color:"primary",icon:"print",onClick:l[3]||(l[3]=o=>E.value.state=!E.value.state),title:"Imprimir"}),a(x,{flat:"",color:"primary",icon:"picture_as_pdf",onClick:l[4]||(l[4]=o=>_.value.state=!z.state),title:"exportar pdf"}),a(x,{flat:"",color:"primary",icon:"sim_card_download",onClick:de,title:"exportarexcel"})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(F,{modelValue:E.value.state,"onUpdate:modelValue":l[7]||(l[7]=o=>E.value.state=o)},{default:i(()=>[a(D,{class:"my-card"},{default:i(()=>[a(I,null,{default:i(()=>[Be]),_:1}),a(I,null,{default:i(()=>[a(xe,{onSubmit:te,class:"q-gutter-md"},{default:i(()=>[a(Y,{dense:"","option-label":"name",modelValue:E.value.val,"onUpdate:modelValue":l[6]||(l[6]=o=>E.value.val=o),options:E.value.body,label:"Impresora",filled:"",autofocus:"",style:{width:"200px"}},null,8,["modelValue","options"]),m("div",null,[a(x,{label:"Enviar",type:"submit",color:"primary",style:{width:"200px"},disable:E.value.val===null||w.value},null,8,["disable"])])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(F,{modelValue:N.value,"onUpdate:modelValue":l[10]||(l[10]=o=>N.value=o)},{default:i(()=>[a(D,{class:"my-card"},{default:i(()=>[a(I,null,{default:i(()=>[m("div",Ge,[Ke,a(he,{modelValue:L.value,"onUpdate:modelValue":l[8]||(l[8]=o=>L.value=o),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),a(I,null,{default:i(()=>[a($,{align:"right"},{default:i(()=>[a(x,{flat:"",icon:"close",color:"negative",onClick:l[9]||(l[9]=o=>N.value=!N.value)}),a(x,{flat:"",icon:"check",color:"positive",onClick:oe})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(F,{modelValue:_.value.state,"onUpdate:modelValue":l[12]||(l[12]=o=>_.value.state=o),persistent:""},{default:i(()=>[a(D,null,{default:i(()=>[a(I,{class:"row items-center"},{default:i(()=>[a(me,{icon:"picture_as_pdf",color:"primary","text-color":"white"}),je]),_:1}),a(I,null,{default:i(()=>[a(Y,{modelValue:_.value.val,"onUpdate:modelValue":l[11]||(l[11]=o=>_.value.val=o),options:_.value.opts,label:"Formatos",filled:""},null,8,["modelValue","options"])]),_:1}),a($,{align:"right"},{default:i(()=>[J(a(x,{flat:"",label:"Cancel",color:"negative"},null,512),[[W]]),a(x,{flat:"",label:"Seleccionar",color:"positive",onClick:z,disable:!_.value.val},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{Nt as default};
