import{Q as U}from"./QSeparator.4c3df87b.js";import{r as h,o as Q,a as me,w as r,e as l,f as c,a4 as T,Y as K,Q as x,g as j,h as q,a5 as I,a3 as J,a6 as ce}from"./index.ee411de5.js";import{Q as pe}from"./QToolbar.4b5eb18f.js";import{Q as fe}from"./QHeader.feabcb05.js";import{Q as _e}from"./QInput.bbf81730.js";import{Q as Te}from"./QTable.0d8943eb.js";import{Q as Ee}from"./QSpinnerFacebook.bc1ae5af.js";import{Q as ve}from"./QTooltip.1093f687.js";import{Q as F}from"./QDialog.3a28a0ad.js";import{u as ge,Q as D,a as y}from"./use-quasar.772555ff.js";import{a as Z,b as O,Q as Y}from"./QSelect.f84dc228.js";import{Q as Ce}from"./QList.aeab4735.js";import{Q as $}from"./QCardActions.674c9557.js";import{Q as xe}from"./QForm.536ac0a5.js";import{Q as be}from"./QDate.23c2e31b.js";import{Q as Ae}from"./QPage.dd71aa4a.js";import{Q as Ie,a as ye}from"./QLayout.5be6e713.js";import{C as W}from"./ClosePopup.edf0e745.js";import{u as Oe}from"./VDB.4d945a6a.js";import{_ as he}from"./UserToolbar.bb94b620.js";import{a as P}from"./axios.9ab26c22.js";import{e as Se}from"./export-file.041709e1.js";import{E as X,a as k}from"./jspdf.plugin.autotable.809c91ba.js";import{E as Ne}from"./exceljs.min.9e24d01d.js";import{a as Re}from"./axios.ba7b1b0e.js";import"./QResizeObserver.3a322cf2.js";import"./use-key-composition.b5343cc0.js";import"./uid.937d8ee7.js";import"./QLinearProgress.781e6dae.js";import"./QCheckbox.0b33e665.js";import"./position-engine.bf034c4f.js";import"./rtl.276c3f1b.js";import"./use-render-cache.3aae9b27.js";import"./date.bc06c327.js";import"./_commonjsHelpers.88e99c8f.js";const Fe={class:"justify-end"},Pe={key:0},Le={class:"row"},De={class:"col"},Ve={class:"col"},we={key:0},Ue={class:"text-h4"},Qe={class:"text-subtitle2"},$e={class:"text-h5"},Me={class:"text-h5 text-center"},He={class:"text-h5 text-center"},ze={class:"q-pa-md"},yt={__name:"TarjetaLayout",setup(Be){const b=Oe(),f=ge(),V=[{name:"terminal",label:"TERMINAL",align:"center",field:t=>t.TERMINAL},{name:"ticket",label:"TICKET",align:"center",field:t=>t.TICKET},{name:"cliente",label:"CLIENTE",align:"center",field:t=>t.CLIENTE},{name:"fecha",label:"FECHA",align:"center",field:t=>t.FECHA},{name:"hora",label:"HORA",align:"center",field:t=>t.HORA},{name:"efectivo",label:"EFECTIVO",align:"center",field:t=>t.EFECTIVO},{name:"tarjetas",label:"TARJETAS",align:"center",field:t=>t.TARJETAS},{name:"transferencias",label:"TRANSFERENCIAS",align:"center",field:t=>t.TRANSFERENCIAS},{name:"creditos",label:"CREDITOS",align:"center",field:t=>t.CREDITOS},{name:"vales",label:"VALES",align:"center",field:t=>t.VALES}],ee=h({val:null,body:null}),E=h({state:!1,val:null,body:null}),A=h({val:null,filter:null,state:!1,body:null}),S=h(!1),d=h({state:!1,body:null}),w=h(!1),N=h(!1),L=h(null),_=h({state:!1,val:null,opts:[{id:1,label:"Factura"},{id:2,label:"Ticket"}]}),te=()=>{let t=d.value.body.TICKET.split("-"),a={type:"Reimpresion",serie:t[0],folio:t[1],print:E.value.val.ip_address};w.value=!0;let s=`http://${b.session.store.ip}/access/public/modify/newmod`;P.post(s,a).then(u=>{console.log(u),w.value=!1,E.value.val=null,E.value.state=!1}).catch(u=>u)},M=async()=>{console.log("Recibiendo Datos :)"),S.value=!0;let a=`http://${b.session.store.ip}/access/public/reports/getCash`;P.get(a).then(o=>{ee.value.body=o.data.terminales,A.value.body=o.data.formaspagos,console.log(o.data),A.value.state=!0,S.value=!1,console.log("ya lo recibi que no te enganen :)"),ae()}).catch(o=>console.log(o))},ae=async()=>{let t=b.session.store.id;console.log(t);try{let a=await Re.get(`/cashier/getPrinters/${t}`);a.status==200&&(E.value.body=a.data,console.log("Impresoras listas :)"))}catch(a){console.log(a),f.notify({message:"No se pudiron obtener las impresoras",type:"negative",position:"center",icon:"error"})}},H=(t,a,o)=>{let s=a!==void 0?a(t,o):t;return s=s==null?"":String(s),s=s.split('"').join('""'),/^\d{1,2}-\d{4}$/.test(s)&&(s=`'${s}`),`"${s}"`},le=()=>{const t=[V.map(o=>H(o.label))].concat(A.value.body.map(o=>V.map(s=>H(typeof s.field=="function"?s.field(o):o[s.field===void 0?s.name:s.field],s.format,o)).join(","))).join(`\r
`);Se("reporteCobros.csv",t,"text/csv")!==!0?f.notify({message:"Browser denied file download...",color:"negative",icon:"warning"}):f.notify({message:"Descarga Completa :)",color:"positive",icon:"check",position:"center"})},oe=()=>{console.log(L.value);let t={filt:L.value};console.log("Recibiendo Datos :)"),S.value=!0;let o=`http://${b.session.store.ip}/access/public/reports/filter`;P.post(o,t).then(s=>{A.value.body=s.data.formaspagos,A.value.state=!0,S.value=!1,N.value=!1,console.log("ya lo recibi que no te enganen :)")}).catch(s=>console.log(s))},se=(t,a)=>{console.log("aqui se podra reimprimir"),console.log(a.TICKET),d.value.state=!0,d.value.body=a},z=()=>{f.loading.show({message:"Importando Ticket"});let t=b.session.store.ip,a=d.value.body.TICKET;const o=`http://${t}/access/public/modify/getTicket/${a}`;P.get(o).then(s=>{_.value.val.id==1?ie(s.data).then(u=>{f.notify({message:`El ticket ${a} se descargo correctamente`,type:"positive",position:"center"}),_.value.state=!1,_.value.val=null,f.loading.hide()}).catch(u=>{f.notify({message:`El ticket ${a} no se descargo correctamente`,type:"negative",position:"center"})}):_.value.val.id==2&&re(s.data).then(u=>{f.notify({message:`El ticket ${a} se descargo correctamente`,type:"positive",position:"center"}),_.value.state=!1,_.value.val=null,f.loading.hide()}).catch(u=>{f.notify({message:`El ticket ${a} no se descargo correctamente`,type:"negative",position:"center"})})}).catch(s=>console.log(s))},ne=(t,a)=>{let o=70;return t.forEach(s=>{o+=7}),o+=10,a.forEach(s=>{o+=4}),o+=41,o},re=t=>new Promise((a,o)=>{try{let s=t.products,u=t.payments,n=ne(s,u);console.log(t.products[0].ARTICULO);const e=new X({format:[80,n]});n=62,e.setFontSize(8),e.text("----------------------------------------------------------------------------",2,10),e.text(t.empresa.CTT1TPV,2,13),e.text(t.empresa.CTT2TPV,2,16),e.text(t.empresa.CTT3TPV,2,19),e.text(t.empresa.CTT4TPV,2,22),e.text(t.empresa.CTT5TPV,2,25),e.text(t.header.TERMINAL,2,34),e.text(`N\xBA ${t.header.TICKET}`,2,37),e.text(`FECHA ${t.header.FECHA}`,20,37),e.text(t.header.HORA,50,37),e.text(`Forma de Pago: ${t.header.PAGOPRINCIPAL}`,2,40),e.text(t.header.NOMBRECLIENTE,2,43),e.text(t.header.DOMICILIO,2,46),e.text(t.header.POBALCION+t.header.CODIGOPOSTAL,2,49),e.text(t.header.PROVINCIA,2,52),e.text("_________________________________________________",2,58),e.text("ARTICULO",2,61),e.text("UD.",25,61),e.text("PRECIO",40,61),e.text("TOTAL",57,61),e.text("_________________________________________________",2,62);let R=0;s.forEach(p=>{e.setFontSize(6),n+=3,e.text(p.ARTICULO+"   "+p.DESCRIPCION.substring(0,47),2,n),n+=4,e.text(Number(p.CANTIDAD).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),25,n),e.text(Number(p.PRECIO).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),40,n),e.text(Number(p.TOTAL).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),57,n),R+=Number(p.CANTIDAD)}),n+=10,e.setFontSize(8),e.setFont("helvetica","bold"),e.text("TOTAL",54,n,"right"),e.text(`$ ${Number(t.header.TOTAL).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,56,n,"left"),e.setFont("helvetica","normal"),u.forEach(p=>{n+=4,e.text(p.CONCEPTOPAGO,54,n,"right"),e.text(`$ ${Number(p.IMPORTE).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,56,n,"left")}),n+=5,e.text(`N Articulos: ${R}`,2,n),n+=5,e.setFontSize(6),e.text(`Le Atendio: ${t.header.DEPENDIENTE}`,2,n),n+=5,e.setFontSize(8),e.text("---------------------------------Grupo-Vizcarra----------------------------",2,n),n+=5,e.text(t.empresa.PTT1TPV,2,n),n+=3,e.text(t.empresa.PTT2TPV,2,n),n+=3,e.text(t.empresa.PTT3TPV,2,n),n+=3,e.text(t.empresa.PTT4TPV,2,n),n+=3,e.text(t.empresa.PTT5TPV,2,n),n+=3,e.text(t.empresa.PTT6TPV,2,n),n+=3,e.text(t.empresa.PTT7TPV,2,n),n+=3,e.text(t.empresa.PTT8TPV,2,n),e.save(`Ticket ${t.header.TICKET}`),a()}catch(s){o(s)}}),ie=t=>new Promise((a,o)=>{try{let u=t.products,n=t.payments;const e=new X;let R=[];const p=u.map(g=>Object.values(g)),i=Math.ceil(p.length/20);for(var s=0;s<p.length;s+=20)R.push(p.slice(s,s+20));console.log(R);for(let g=0;g<1;g++)R.forEach(function(m,C){C>0&&e.addPage();let B=0,G=0;for(let v=0;v<m.length;v++)m[v][1]=m[v][1].replace(/\n/g," "),m[v][2]=parseFloat(m[v][2]),m[v][3]=Number(m[v][3]).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),m[v][4]=Number(m[v][4]).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),B+=parseFloat(m[v][2]),G+=parseFloat(m[v][4].replace(/,/g,""));e.setFontSize(25),e.setFont("helvetica","bold"),e.text("GRUPO VIZCARRA",105,10,"center"),e.setFontSize(8),e.text("Hora Ticket:",10,10,"left"),e.text(t.header.HORA,10,15,"left"),e.setFontSize(12),e.text(`${t.header.NOMBRECLIENTE} ${t.header.CLIENTE}`,10,25,"left"),e.text(`SUCURSAL ${t.empresa.DESTPV}`,120,25,"left"),e.setFontSize(8),e.text(t.header.DOMICILIO,10,30,"left"),e.text(t.header.CODIGOPOSTAL,10,35,"left"),e.text(t.header.POBALCION+t.header.PROVINCIA,10,40,"left"),e.text(t.empresa.CTT3TPV,120,30,"left"),e.text("LLI1210184G8",120,45,"left"),e.rect(120,51,80,5),e.text("DOCUMENTO",121,55,"left"),e.text("FACTURA",121,60,"left"),e.text("NUMERO",143,55,"left"),e.text(t.header.TICKET,143,60,"left"),e.text("PAGINA",165,55,"left"),e.text(`${C+1} de ${i}`,165,60,"left"),e.text("FECHA",185,55,"left");const ue=t.header.FECHA;e.text(ue,185,60,"left"),k(e,{startX:10,startY:65,theme:"grid",styles:{cellPadding:1,fontSize:8,halign:"center"},head:[["CREADOR DOC","ALMACEN","AGENTE","FORMA DE PAGO"]],body:[["APP","GEN",t.header.DEPENDIENTE,n[0].CONCEPTOPAGO]]}),k(e,{alternateRowStyles:{fillColor:[192,192,192]},startX:10,startY:80,theme:"striped",styles:{cellPadding:.6,fontSize:8,halign:"left"},head:[["ARTICULO","DESCRIPCION","CANTIDAD","PRECIO","TOTAL"]],body:m,columnStyles:{0:{fontStyle:"bold",halign:"left"},1:{fontStyle:"bold",halign:"left"},2:{halign:"center"},3:{halign:"center"},4:{halign:"center"}}}),e.setFontSize(11),e.text("TOTAL UNIDADES:",60,200,"left"),e.text(Number(B).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),100,200,"left"),e.setFont("helvetica","bold"),e.text("TOTAL:",140,200,"left"),e.text(`$ ${Number(G).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,160,200,"left"),e.setFontSize(8),e.text("Debo(emos) y pagare(mos) incondicionalmente por este pagare a la order de GRUPO VIZCARRA, en la ciudad de Mexico,",5,210,"left"),e.text("la cantidad de el valor recibido a mi(nuestra) entera satisfaccion",5,215,"left"),e.text("Este pagare forma parte de una serie numerica del 1 al y 9 y todos estos estan sujetos a la condicion, de que al no pagarse cualquiera de ellos a su",5,220,"left"),e.text("vencimiento sean exigibles todos los que le sigan en numero, ademas de los ya vencidosm desde la fecha de su vencimiento de el presente documento",5,225,"left"),e.text("hasta el dia de su liquidacion, causaran intereses moratorios al tipo del % mensual en esta ciudad justamente con el principal",5,230,"left"),e.setFontSize(15),e.text("______________",31,248,"center"),e.text("AUTORIZO",20,254,"left"),e.text("______________",85,248,"center"),e.text("CHOFER",75,254,"left"),e.text("______________",140,248,"center"),e.text("RECIBIO",130,254,"left"),e.text("______________",168,248,"left"),e.text("FECHA Y HORA",168,254,"left"),e.setFontSize(9),e.text("UNA VEZ ENTREGADA LA MERCANCIA EN LA FLETERA O DOMICILIO QUE INDIQUE EL CLIENTE ",5,260,"left"),e.text("LLUVIA LIGHT SA DE CV NO ES RESPONSABLE POR PEDIDAS TOTALES, PARCIALES ",5,265,"left"),e.text("O CUALQUIER TIPO DE DANO EN LA MERCANCIA DE ESTE DOCUMENTO ",5,270,"left"),e.setFont("helvetica","bold"),e.setFontSize(12),e.text("NO SE ACEPTAN CAMBIOS NI DEVOLUCIONES",5,275,"left"),e.setFontSize(25),e.setFont("helvetica","bold"),e.text("GRUPO VIZCARRA",105,10,"center")});e.save(`Factura ${t.header.TICKET}`),a()}catch(u){o(u)}}),de=async()=>{f.loading.show({message:"Importando Ticket"});let t=b.session.store.ip,a=d.value.body.TICKET;const o=`http://${t}/access/public/modify/getTicket/${a}`;P.get(o).then(s=>{const u=new Ne.Workbook,n=u.addWorksheet("Comparativo");n.addRow([s.data.empresa.DESTPV]).eachCell(i=>i.font={bold:!0}),n.addRow(),n.addRow(["Ticket","Fecha","Cliente","Alm.","Est.","For. pag.","Total"]).eachCell(i=>i.font={bold:!0});let e=s.data.header;n.addRow([e.TICKET,e.FECHA,`${e.CLIENTE}-${e.NOMBRECLIENTE}`,"GEN","Cobra",s.data.payments[0].CONCEPTOPAGO,Number(e.TOTAL)]),n.addRow(),n.addRow(["","C\xF3digo","Descripci\xF3n","Doc. Origen","Cantidad","P.Unidad","Total"]).eachCell(i=>i.font={bold:!0}),s.data.products.forEach(i=>{n.addRow(["",i.ARTICULO,i.DESCRIPCION,"",Number(i.CANTIDAD),Number(i.PRECIO),Number(i.TOTAL)])}),n.columns.forEach(i=>{let g=0;i.eachCell({includeEmpty:!0},m=>{const C=m.value?m.value.toString().length:10;C>g&&(g=C)}),i.width=g<10?10:g}),(async()=>{const i=await u.xlsx.writeBuffer(),g=new Blob([i],{type:"application/octet-stream"}),m=URL.createObjectURL(g),C=document.createElement("a");C.href=m,C.download=`Ticket${s.data.header.TICKET}.xlsx`,document.body.appendChild(C),C.click(),document.body.removeChild(C)})(),f.loading.hide(),console.log(s)}).catch(s=>{console.log(s)})};return b.session.rol=="aux"||b.session.rol=="gen"||b.session.rol=="aud"||b.session.rol=="root"?M():(f.notify({message:"No tienes acceso a esta pagina",type:"negative",position:"center"}),$router.replace("/")),M(),(t,a)=>(Q(),me(Ie,{view:"hHh Lpr fFf"},{default:r(()=>[l(fe,{class:"transparent text-dark",bordered:""},{default:r(()=>[l(he),l(U),l(pe,{class:"justify-between"},{default:r(()=>[c("div",null,[a[13]||(a[13]=T("Helpers ")),l(K,{name:"navigate_next",color:"primary"}),a[14]||(a[14]=T()),a[15]||(a[15]=c("span",{class:"text-h6"},"Consulta de Pagos",-1))])]),_:1})]),_:1}),l(ye,null,{default:r(()=>[l(Ae,{padding:""},{default:r(()=>[c("div",Fe,[l(x,{color:"primary",icon:"event",onClick:a[0]||(a[0]=o=>N.value=!N.value),flat:"",round:""})]),l(U,{spaced:"",inset:"",vertical:"",dark:""}),A.value.state?(Q(),j("div",Pe,[l(Te,{class:"my-sticky-header-table",title:"Fromas de Pago",rows:A.value.body,"row-key":"name",filter:A.value.filter,separator:"cell",onRowClick:se,columns:V},{"top-right":r(()=>[c("div",Le,[c("div",De,[l(_e,{borderless:"",dense:"",debounce:"300",modelValue:A.value.filter,"onUpdate:modelValue":a[1]||(a[1]=o=>A.value.filter=o),placeholder:"Search"},{append:r(()=>[l(K,{name:"search"})]),_:1},8,["modelValue"])]),l(U,{spaced:"",inset:"",vertical:"",dark:""}),c("div",Ve,[l(x,{color:"primary",icon:"archive",dense:"","no-caps":"",flat:"",round:"",onClick:le})])])]),_:1},8,["rows","filter"])])):q("",!0),l(F,{modelValue:S.value,"onUpdate:modelValue":a[2]||(a[2]=o=>S.value=o),persistent:""},{default:r(()=>[S.value?(Q(),j("div",we,[l(Ee,{color:"primary",size:"7.5em"}),l(ve,{offset:[0,8]},{default:r(()=>a[16]||(a[16]=[T("Cargando Informacion")])),_:1})])):q("",!0)]),_:1},8,["modelValue"]),l(F,{modelValue:d.value.state,"onUpdate:modelValue":a[5]||(a[5]=o=>d.value.state=o),persistent:""},{default:r(()=>[l(D,{style:{width:"700px","max-width":"70vw"}},{default:r(()=>[l(y,{class:"row justify-between"},{default:r(()=>[c("div",Ue,"Ticket : "+I(d.value.body.TICKET),1),c("div",Qe,I(d.value.body.TERMINAL),1)]),_:1}),l(y,null,{default:r(()=>[c("div",$e,I(d.value.body.CNOFAC),1)]),_:1}),l(y,null,{default:r(()=>[c("div",Me,I(d.value.body.CLIENTE),1),c("div",He,I(d.value.body.FECHA),1)]),_:1}),l(y,null,{default:r(()=>[l(Ce,{bordered:""},{default:r(()=>[l(Z,null,{default:r(()=>[l(O,null,{default:r(()=>a[17]||(a[17]=[T("EFECTIVO")])),_:1}),l(O,null,{default:r(()=>a[18]||(a[18]=[T("TARJETA")])),_:1}),l(O,null,{default:r(()=>a[19]||(a[19]=[T("TRANSFERENCIA")])),_:1}),l(O,null,{default:r(()=>a[20]||(a[20]=[T("VALE")])),_:1}),l(O,null,{default:r(()=>a[21]||(a[21]=[T("CREDITO")])),_:1})]),_:1}),l(Z,null,{default:r(()=>[l(O,null,{default:r(()=>[T(I(d.value.body.EFECTIVO),1)]),_:1}),l(O,null,{default:r(()=>[T(I(d.value.body.TARJETAS),1)]),_:1}),l(O,null,{default:r(()=>[T(I(d.value.body.TRANSFERENCIAS),1)]),_:1}),l(O,null,{default:r(()=>[T(I(d.value.body.VALES),1)]),_:1}),l(O,null,{default:r(()=>[T(I(d.value.body.CREDITOS),1)]),_:1})]),_:1})]),_:1})]),_:1}),l($,{align:"center"},{default:r(()=>[J(l(x,{flat:"",color:"negative",icon:"close"},null,512),[[W]]),l(x,{flat:"",color:"primary",icon:"print",onClick:a[3]||(a[3]=o=>E.value.state=!E.value.state),title:"Imprimir"}),l(x,{flat:"",color:"primary",icon:"picture_as_pdf",onClick:a[4]||(a[4]=o=>_.value.state=!z.state),title:"exportar pdf"}),l(x,{flat:"",color:"primary",icon:"sim_card_download",onClick:de,title:"exportarexcel"})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(F,{modelValue:E.value.state,"onUpdate:modelValue":a[7]||(a[7]=o=>E.value.state=o)},{default:r(()=>[l(D,{class:"my-card"},{default:r(()=>[l(y,null,{default:r(()=>a[22]||(a[22]=[c("div",{class:"text-h6 text-center"},"Impresora",-1)])),_:1}),l(y,null,{default:r(()=>[l(xe,{onSubmit:te,class:"q-gutter-md"},{default:r(()=>[l(Y,{dense:"","option-label":"name",modelValue:E.value.val,"onUpdate:modelValue":a[6]||(a[6]=o=>E.value.val=o),options:E.value.body,label:"Impresora",filled:"",autofocus:"",style:{width:"200px"}},null,8,["modelValue","options"]),c("div",null,[l(x,{label:"Enviar",type:"submit",color:"primary",style:{width:"200px"},disable:E.value.val===null||w.value},null,8,["disable"])])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(F,{modelValue:N.value,"onUpdate:modelValue":a[10]||(a[10]=o=>N.value=o)},{default:r(()=>[l(D,{class:"my-card"},{default:r(()=>[l(y,null,{default:r(()=>[c("div",ze,[a[23]||(a[23]=c("div",{class:"q-pb-sm"},null,-1)),l(be,{modelValue:L.value,"onUpdate:modelValue":a[8]||(a[8]=o=>L.value=o),range:"",minimal:""},null,8,["modelValue"])])]),_:1}),l(y,null,{default:r(()=>[l($,{align:"right"},{default:r(()=>[l(x,{flat:"",icon:"close",color:"negative",onClick:a[9]||(a[9]=o=>N.value=!N.value)}),l(x,{flat:"",icon:"check",color:"positive",onClick:oe})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(F,{modelValue:_.value.state,"onUpdate:modelValue":a[12]||(a[12]=o=>_.value.state=o),persistent:""},{default:r(()=>[l(D,null,{default:r(()=>[l(y,{class:"row items-center"},{default:r(()=>[l(ce,{icon:"picture_as_pdf",color:"primary","text-color":"white"}),a[24]||(a[24]=c("span",{class:"text-bold text-h6"},"Selecciona el Formato \u{1F60A}",-1))]),_:1}),l(y,null,{default:r(()=>[l(Y,{modelValue:_.value.val,"onUpdate:modelValue":a[11]||(a[11]=o=>_.value.val=o),options:_.value.opts,label:"Formatos",filled:""},null,8,["modelValue","options"])]),_:1}),l($,{align:"right"},{default:r(()=>[J(l(x,{flat:"",label:"Cancel",color:"negative"},null,512),[[W]]),l(x,{flat:"",label:"Seleccionar",color:"positive",onClick:z,disable:!_.value.val},null,8,["disable"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1}))}};export{yt as default};
