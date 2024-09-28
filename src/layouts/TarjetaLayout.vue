<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Consulta de Pagos</span>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="justify-end">

          <q-btn color="primary" icon="event" @click="date = !date" flat round />

        </div>
        <q-separator spaced inset vertical dark />

        <div v-if="fpas.state">

          <q-table class="my-sticky-header-table" title="Fromas de Pago" :rows="fpas.body" row-key="name"
            :filter="fpas.filter" separator="cell" @row-click="mostck" :columns="table">

            <template v-slot:top-right>
              <div class="row">
                <div class="col"> <q-input borderless dense debounce="300" v-model="fpas.filter" placeholder="Search">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input></div>

                <q-separator spaced inset vertical dark />
                <div class="col"> <q-btn color="primary" icon="archive" dense no-caps flat round @click="exportTable" />
                </div>
              </div>

            </template>

          </q-table>

        </div>
        <q-dialog v-model="load" persistent>
          <div v-if="load">
            <q-spinner-facebook color="primary" size="7.5em" />
            <q-tooltip :offset="[0, 8]">Cargando Informacion</q-tooltip>
          </div>
        </q-dialog>

        <q-dialog v-model="otckopt.state" persistent>
          <q-card style="width: 700px; max-width: 70vw;">
            <q-card-section class="row justify-between">
              <div class="text-h4">Ticket : {{ otckopt.body.TICKET }}</div>
              <div class="text-subtitle2">{{ otckopt.body.TERMINAL }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-h5">{{ otckopt.body.CNOFAC }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-h5 text-center">{{ otckopt.body.CLIENTE }}</div>
              <div class="text-h5 text-center">{{ otckopt.body.FECHA }}</div>
            </q-card-section>
            <q-card-section>
              <q-list bordered>
                <q-item>
                  <q-item-section>EFECTIVO</q-item-section>
                  <q-item-section>TARJETA</q-item-section>
                  <q-item-section>TRANSFERENCIA</q-item-section>
                  <q-item-section>VALE</q-item-section>
                  <q-item-section>CREDITO</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>{{ otckopt.body.EFECTIVO }}</q-item-section>
                  <q-item-section>{{ otckopt.body.TARJETAS }}</q-item-section>
                  <q-item-section>{{ otckopt.body.TRANSFERENCIAS }}</q-item-section>
                  <q-item-section>{{ otckopt.body.VALES }}</q-item-section>
                  <q-item-section>{{ otckopt.body.CREDITOS }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat color="negative" v-close-popup icon="close" />
              <q-btn flat color="primary" icon="print" @click="impresoras.state = !impresoras.state" />
              <q-btn flat color="primary" icon="picture_as_pdf"  @click="pdfFormat.state = !pdfExport.state" />

            </q-card-actions>
          </q-card>
        </q-dialog>



        <q-dialog v-model="impresoras.state">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6 text-center">Impresora</div>
            </q-card-section>
            <q-card-section>
              <q-form @submit="imptck" class="q-gutter-md">
                <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body"
                  label="Impresora" filled autofocus style="width: 200px" />
                <div>
                  <q-btn label="Enviar" type="submit" color="primary" style="width: 200px"
                    :disable="impresoras.val === null || imp" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="date">
          <q-card class="my-card">
            <q-card-section>
              <div class="q-pa-md">
                <div class="q-pb-sm">
                  <!-- Desde: {{ fechas.from }} : Hasta {{ fechas.to }} -->
                </div>
                <q-date v-model="fechas" range minimal />
              </div>
            </q-card-section>
            <q-card-section>
              <q-card-actions align="right">
                <q-btn flat icon="close" color="negative" @click="date = !date" />
                <q-btn flat icon="check" color="positive" @click="buscas" />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-dialog>


        <q-dialog v-model="pdfFormat.state" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar  icon="picture_as_pdf" color="primary" text-color="white" />
              <span class="text-bold text-h6">Selecciona el Formato 😊</span>
            </q-card-section>
            <q-card-section>
              <q-select v-model="pdfFormat.val" :options="pdfFormat.opts" label="Formatos" filled />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="negative" v-close-popup />
              <q-btn flat label="Seleccionar" color="positive" @click="pdfExport" :disable="!pdfFormat.val" />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import {exportFile ,useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";


const VDB = useVDBStore();
const $q = useQuasar();

const table =[
  {name:'terminal', label:'TERMINAL',align:'center' , field: row => row.TERMINAL},
  {name:'ticket', label:'TICKET' ,align:'center', field: row => row.TICKET},
  {name:'cliente', label:'CLIENTE' ,align:'center', field: row => row.CLIENTE},
  {name:'fecha', label:'FECHA' ,align:'center', field: row => row.FECHA},
  {name:'hora', label:'HORA' ,align:'center', field: row => row.HORA},
  {name:'efectivo', label:'EFECTIVO' ,align:'center', field: row => row.EFECTIVO},
  {name:'tarjetas', label:'TARJETAS' ,align:'center', field: row => row.TARJETAS},
  {name:'transferencias', label:'TRANSFERENCIAS' ,align:'center', field: row => row.TRANSFERENCIAS},
  {name:'creditos', label:'CREDITOS' ,align:'center', field: row => row.CREDITOS},
  {name:'vales', label:'VALES' ,align:'center', field: row => row.VALES},

]

const cash = ref({
  val: null,
  body: null
});

const impresoras = ref({
  state: false,
  val: null,
  body: null
})

const fpas = ref({
  val: null,
  filter: null,
  state: false,
  body: null
})
const load = ref(false);

const otckopt = ref({
  state: false,
  body: null
});

const imp = ref(false);

const date = ref(false);

const fechas = ref(null);

const pdfFormat = ref({
  state:false,
  val:null,
  opts:[
    {id:1,label:'Factura'},
    {id:2,label:'Ticket'}
  ]
})
const imptck = () => {
  let split = otckopt.value.body.TICKET.split('-')
  let impdat = {
    type: "Reimpresion",
    serie: split[0],
    folio: split[1],
    print: impresoras.value.val.ip_address
  }
  imp.value = true;
  let host = VDB.session.store.ip;
  let url = `http://${host}/access/public/modify/newmod`;
  axios.post(url, impdat)
    .then(r => {
      console.log(r)
      imp.value = false
      impresoras.value.val = null;
      impresoras.value.state = false
    })
    .catch(r => r);
}

const index = async () => {
  console.log("Recibiendo Datos :)")
  load.value = true
  let host = VDB.session.store.ip;
  let riwo = `http://${host}/access/public/reports/getCash`;
  axios.get(riwo)
    .then(r => {
      cash.value.body = r.data.terminales
      fpas.value.body = r.data.formaspagos
      console.log(r.data);
      // impresoras.value.body = r.data.impresoras
      fpas.value.state = true;
      load.value = false
      console.log("ya lo recibi que no te enganen :)")
      impre()
      // console.log("Impresoras listas :)")

    })
    .catch(r => console.log(r))
}

const impre = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  // console.log(host);
  // let impr = `http://${host}/access/public/modify/getPrinter`;
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      impresoras.value.body = resp.data
      console.log("Impresoras listas :)")
    }

  } catch (err) {
    console.log(err);
    $q.notify({
      message: 'No se pudiron obtener las impresoras',
      type: 'negative',
      position: 'center',
      icon: 'error'
    })
  }
}

const wrapCsvValue = (val, formatFn, row) => {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  if (/^\d{1,2}-\d{4}$/.test(formatted)) {
    formatted = `'${formatted}`
  }
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const exportTable = () => {
  // naive encoding to csv format
  const content = [table.map(col => wrapCsvValue(col.label))].concat(
    fpas.value.body.map(row => table.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'reporteCobros.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }else{
    $q.notify({
      message: 'Descarga Completa :)',
      color: 'positive',
      icon: 'check',
      position:'center'
    })
  }
}

const buscas = () => {
  console.log(fechas.value);
  let filtro = {
    filt: fechas.value
  }
  console.log("Recibiendo Datos :)")
  load.value = true
  let host = VDB.session.store.ip;
  let riwo = `http://${host}/access/public/reports/filter`;
  axios.post(riwo, filtro)
    .then(r => {
      fpas.value.body = r.data.formaspagos
      fpas.value.state = true;
      load.value = false
      date.value = false
      console.log("ya lo recibi que no te enganen :)")
    })
    .catch(r => console.log(r))
}

const mostck = (a, row) => {
  console.log('aqui se podra reimprimir');
  console.log(row.TICKET)
  otckopt.value.state = true
  otckopt.value.body = row
}

const pdfExport = () => {
  $q.loading.show({message:'Importando Ticket'})
  let host = VDB.session.store.ip;
  let ticket = otckopt.value.body.TICKET
  const dat  = `http://${host}/access/public/modify/getTicket/${ticket}`;
  axios.get(dat)
  .then(r => {
    if(pdfFormat.value.val.id == 1){
    pdfFactura(r.data)
    .then(r => {
      $q.notify({
        message:`El ticket ${ticket} se descargo correctamente`,
        type:`positive`,
        position:`center`,
      })
      pdfFormat.value.state = false
      pdfFormat.value.val = null

      $q.loading.hide()
    })
    .catch(f => {
      $q.notify({
        message:`El ticket ${ticket} no se descargo correctamente`,
        type:`negative`,
        position:`center`,
      })
    })
  }else if(pdfFormat.value.val.id == 2){
    pdfTicket(r.data)
    .then(r => {
      $q.notify({
        message:`El ticket ${ticket} se descargo correctamente`,
        type:`positive`,
        position:`center`,
      })
      pdfFormat.value.state = false
      pdfFormat.value.val = null

      $q.loading.hide()
    })
    .catch(f => {
      $q.notify({
        message:`El ticket ${ticket} no se descargo correctamente`,
        type:`negative`,
        position:`center`,
      })
    })
  }
  })
  .catch(f =>
    console.log(f)
  )

}

const calcularEspacio = (products, pagos) => {
    let spaced = 70;
    products.forEach((e) => {
        spaced += 7;
    });
    spaced += 10;
    pagos.forEach((p) => {
        spaced += 4;
    });
    spaced += 41
    return spaced;
}

const pdfTicket = (ticket) => {
  return new Promise((resolve, reject) => {
    try {
  let products = ticket.products
  let pagos = ticket.payments

  let spaced = calcularEspacio(products, pagos);
  console.log(ticket.products[0].ARTICULO)
  const doc = new jsPDF({format: [80, spaced]
  });
  spaced = 62
  doc.setFontSize(8)
  doc.text("----------------------------------------------------------------------------",2,10)
  doc.text(ticket.empresa.CTT1TPV,2,13)
  doc.text(ticket.empresa.CTT2TPV,2,16)
  doc.text(ticket.empresa.CTT3TPV,2,19)
  doc.text(ticket.empresa.CTT4TPV,2,22)
  doc.text(ticket.empresa.CTT5TPV,2,25)
  doc.text(ticket.header.TERMINAL,2,34)
  doc.text(`Nº ${ticket.header.TICKET}`,2,37)
  doc.text(`FECHA ${ticket.header.FECHA}`,20,37)
  doc.text(ticket.header.HORA,50,37)
  doc.text(`Forma de Pago: ${ticket.header.PAGOPRINCIPAL}`,2,40)
  doc.text(ticket.header.NOMBRECLIENTE,2,43)
  doc.text(ticket.header.DOMICILIO,2,46)
  doc.text(ticket.header.POBALCION + ticket.header.CODIGOPOSTAL,2,49)
  doc.text(ticket.header.PROVINCIA,2,52)
  // doc.text("",2,55)
  doc.text("_________________________________________________",2,58)
  doc.text("ARTICULO",2,61)
  doc.text("UD.",25,61)
  doc.text("PRECIO",40,61)
  doc.text("TOTAL",57,61)
  doc.text("_________________________________________________",2,62)
  let cantidadtotal = 0
  products.forEach((e) => {
    doc.setFontSize(6)
    spaced += 3;
    doc.text(e.ARTICULO + '   ' + e.DESCRIPCION.substring(0, 47),2,spaced)
    spaced += 4;
    doc.text( Number(e.CANTIDAD).toFixed(2),25,spaced)
    doc.text(Number(e.PRECIO).toFixed(2),40,spaced)
    doc.text(Number(e.TOTAL).toFixed(2),57,spaced)
    cantidadtotal += Number(e.CANTIDAD)
  })
  spaced += 10;
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text("TOTAL",54,spaced,'right')
  doc.text(`$ ${Number(ticket.header.TOTAL).toFixed(2)}`,56,spaced,'left')
  doc.setFont('helvetica','normal')
  pagos.forEach((p) => {
    spaced += 4
    doc.text(p.CONCEPTOPAGO,54,spaced,'right')
    doc.text(`$ ${Number(p.IMPORTE).toFixed(2)}`,56,spaced,'left')
  })
  spaced += 5
  doc.text(`N Articulos: ${cantidadtotal}`,2,spaced)//total cantidad
  spaced += 5
  doc.setFontSize(6)
  doc.text(`Le Atendio: ${ticket.header.DEPENDIENTE}`,2,spaced)
  spaced += 5
  doc.setFontSize(8)
  doc.text('---------------------------------Grupo-Vizcarra----------------------------',2,spaced)
  spaced += 5
  doc.text(ticket.empresa.PTT1TPV,2,spaced)
  spaced += 3
  doc.text(ticket.empresa.PTT2TPV,2,spaced)
  spaced += 3
  doc.text(ticket.empresa.PTT3TPV,2,spaced)
  spaced += 3
  doc.text(ticket.empresa.PTT4TPV,2,spaced)
  spaced += 3
  doc.text(ticket.empresa.PTT5TPV,2,spaced)
  spaced += 3
  doc.text(ticket.empresa.PTT6TPV,2,spaced)
  spaced += 3
  doc.text(ticket.empresa.PTT7TPV,2,spaced)
  spaced += 3
  doc.text(ticket.empresa.PTT8TPV,2,spaced)
  doc.save(`Ticket ${ticket.header.TICKET}`)
  resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const pdfFactura = (ticket) => {
  return new Promise((resolve, reject) => {
    try {
  let products = ticket.products
  let pagos = ticket.payments
  const doc = new jsPDF();
  let chunks = [];
  const arreglo = products.map(producto => Object.values(producto));
  const paginas = Math.ceil(arreglo.length / 20);
  for (var i = 0; i < arreglo.length; i += 20) {
    chunks.push(arreglo.slice(i, i + 20));
  }
  console.log(chunks);
  for (let i = 0; i < 1; i++) {


    chunks.forEach(function (chunk, index) {
      if (index > 0) {
        doc.addPage();
      }

      let totcan = 0;
      let total  = 0
      for (let i = 0; i < chunk.length; i++) {
        chunk[i][1] = chunk[i][1].replace(/\n/g, " ");//descripcion
        chunk[i][2] = parseFloat(chunk[i][2]);//cantidad
        chunk[i][3] = Number(chunk[i][3]).toFixed(2);//precio
        chunk[i][4] = Number(chunk[i][4]).toFixed(2);//total
        totcan += parseFloat(chunk[i][2]);
        total += parseFloat(chunk[i][4]);

      }

      doc.setFontSize(25)
      doc.setFont('helvetica', 'bold')
      doc.text("GRUPO VIZCARRA", 105, 10, "center");
      doc.setFontSize(8)
      doc.text('Hora Ticket:', 10, 10, 'left')
      doc.text(ticket.header.HORA, 10, 15, 'left');//HORA DE EL TICKET
      doc.setFontSize(12)
      doc.text(`${ticket.header.NOMBRECLIENTE} ${ticket.header.CLIENTE}`, 10, 25, 'left')//NOMBRE DE CLEINTE
      doc.text(`SUCURSAL ${ticket.empresa.DESTPV}`, 120, 25, 'left')// NOMBRE DE LA EMPRESA
      doc.setFontSize(8)
      doc.text(ticket.header.DOMICILIO, 10, 30, 'left')//DOMICILIO DE EL CLIENTE
      doc.text(ticket.header.CODIGOPOSTAL, 10, 35, 'left')// CODIGO POSTAL DE EL CLIENTE
      doc.text(ticket.header.POBALCION + ticket.header.PROVINCIA, 10, 40, 'left')//DELEGACION DE EL CLIENT4E

      doc.text(ticket.empresa.CTT3TPV, 120, 30, 'left')//DOMICILIO DE LA EMPRESA
      // doc.text('06090', 120, 35, 'left')// CODIGO POSTAL DE  LA EMPRESA
      // doc.text('DELEG, CUAUHTEMOC CDMX       CENTRO', 120, 40, 'left')//DELEGACION DE LA EMPRESA
      doc.text('LLI1210184G8', 120, 45, 'left')//RFC DE LA EMPRESA
      doc.rect(120, 51, 80, 5);
      doc.text('DOCUMENTO', 121, 55, 'left')
      doc.text('FACTURA', 121, 60, 'left')
      doc.text('NUMERO', 143, 55, 'left')
      doc.text(ticket.header.TICKET, 143, 60, 'left')//factura
      doc.text('PAGINA', 165, 55, 'left')
      doc.text(`${index + 1} de ${paginas}`, 165, 60, 'left')
      doc.text('FECHA', 185, 55, 'left')
      const fecha = ticket.header.FECHA
      doc.text(fecha, 185, 60, 'left')
      autoTable(doc, {
        startX: 10,
        startY: 65,
        theme: 'grid',
        styles: { cellPadding: 1, fontSize: 8, halign: 'center' },
        head: [['CREADOR DOC', 'ALMACEN', 'AGENTE', 'FORMA DE PAGO']],
        body: [
          ['APP','GEN', ticket.header.DEPENDIENTE, pagos[0].CONCEPTOPAGO],//forma de pago primero
        ],
      })

      autoTable(doc, {
        startX: 10,
        startY: 80,
        theme: 'striped',
        styles: { cellPadding: .6, fontSize: 8, halign: 'left' },
        head: [['ARTICULO', 'DESCRIPCION','CANTIDAD', 'PRECIO', 'TOTAL']],
        body: chunk,
        columnStyles: {
          0: { fontStyle: 'bold', halign: 'left' },
          1: { fontStyle: 'bold', halign: 'left' },
          2: { halign: 'center' },
          3: { halign: 'center' },
          4: { halign: 'center' },
        },

      })

      doc.setFontSize(11)
      doc.text('TOTAL UNIDADES:', 60, 200, 'left')
      doc.text(Number(totcan).toFixed(2), 100, 200, 'left')
      doc.setFont('helvetica', 'bold')
      doc.text('TOTAL:',140, 200, 'left')
      doc.text(`$ ${Number(total).toFixed(2)}`, 160, 200, 'left')//TOTAL TICKET
      doc.setFontSize(8)
      doc.text('Debo(emos) y pagare(mos) incondicionalmente por este pagare a la order de GRUPO VIZCARRA, en la ciudad de Mexico,', 5, 210, 'left')
      doc.text('la cantidad de el valor recibido a mi(nuestra) entera satisfaccion', 5, 215, 'left')
      doc.text('Este pagare forma parte de una serie numerica del 1 al y 9 y todos estos estan sujetos a la condicion, de que al no pagarse cualquiera de ellos a su', 5, 220, 'left')
      doc.text('vencimiento sean exigibles todos los que le sigan en numero, ademas de los ya vencidosm desde la fecha de su vencimiento de el presente documento', 5, 225, 'left')
      doc.text('hasta el dia de su liquidacion, causaran intereses moratorios al tipo del % mensual en esta ciudad justamente con el principal', 5, 230, 'left')
      doc.setFontSize(15)
      doc.text('______________', 31, 248, 'center')
      doc.text('AUTORIZO', 20, 254, 'left')
      doc.text('______________', 85, 248, 'center')
      doc.text('CHOFER', 75, 254, 'left')
      doc.text('______________', 140, 248, 'center')
      doc.text('RECIBIO', 130, 254, 'left')
      doc.text('______________', 168, 248, 'left')
      doc.text('FECHA Y HORA', 168, 254, 'left')
      doc.setFontSize(9)
      doc.text('UNA VEZ ENTREGADA LA MERCANCIA EN LA FLETERA O DOMICILIO QUE INDIQUE EL CLIENTE ', 5, 260, 'left')
      doc.text('LLUVIA LIGHT SA DE CV NO ES RESPONSABLE POR PEDIDAS TOTALES, PARCIALES ', 5, 265, 'left')
      doc.text('O CUALQUIER TIPO DE DANO EN LA MERCANCIA DE ESTE DOCUMENTO ', 5, 270, 'left')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text('NO SE ACEPTAN CAMBIOS NI DEVOLUCIONES', 5, 275, 'left')
      doc.setFontSize(25)
      doc.setFont('helvetica', 'bold')
      doc.text("GRUPO VIZCARRA", 105, 10, "center");
    })
  }
  doc.save(`Factura ${ticket.header.TICKET}`)
  resolve();
    } catch (error) {
      reject(error);
    }
  });
}

if(VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root' ){
  index()
}else{
  $q.notify({message:'No tienes acceso a esta pagina',type:'negative',position:'center'})
  $router.replace('/');

}

index();
// impre();
</script>
