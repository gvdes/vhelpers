import QRCode from 'qrcode';
import { jsPDF } from "jspdf";
import JsBarcode from 'jsbarcode';
import autoTable from 'jspdf-autotable'
// import AssitApi from 'src/api/AssistApi.js';
import dayjs from 'dayjs';




const invoiceFormat = async (invoice) => {
  // console.log(data.folio);
  console.log(invoice);
  const currentDate = new Date();
  // const qrData = `http://192.168.10.238:1308/#/checkin/${invoice.id}?key=${invoice.entry_key}`;
  // const qrData = `http://192.168.10.160:8000/#/distribute/checkin/${invoice.id}?key=${invoice.entry_key}`;
  const qrData = `http://192.168.10.189:2201/#/distribute/checkin/${invoice.id}?key=${invoice.entry_key}`;

  const almacenes = {
    1: 'GEN',//cedis
    2: 'STC',//texcoco
    16: 'BRA',//brasil
    21: 'PAN',//pantaco
    24: 'BOL'//bolivia
  };

  const almacen = almacenes[invoice?.requisition?.to?.id] || null;

  const qrOptions = {
    margin: 1,
    width: 1,
    height: 1
  }
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, qrData, qrOptions);
  const imgData = canvas.toDataURL('image/png');

  const barcodeCanvas = document.createElement('canvas'); // en navegador
  JsBarcode(barcodeCanvas, invoice.entry_key, {
    format: 'CODE128',
    displayValue: false,
    width: 2,
    height: 60,
    margin: 0
  });
  const barcodeImage = barcodeCanvas.toDataURL('image/png');

  const doc = new jsPDF();
  let chunks = [];
  const filterPro = invoice.products.filter(e => e.pivot.checkout == 1)
  const product = filterPro.map(e => {
    return {
      code: e.code,
      caja: e.pivot._supply_by == 3 ? e.pivot.toDelivered : 1,
      uxcaja: e.pivot.ipack,
      // cantidad: e.pivot.units,
      cantidad : e.pivot._supply_by == 3 ? (e.pivot.toDelivered * e.pivot.ipack) : e.pivot._supply_by == 2 ? (e.pivot.toDelivered * 12) : e.pivot.toDelivered,
      description: e.description,
    }
  })

  const arreglo = product.map(producto => Object.values(producto));
  const paginas = Math.ceil(arreglo.length / 20);
  for (var i = 0; i < arreglo.length; i += 20) {
    chunks.push(arreglo.slice(i, i + 20));
  }
  console.log(chunks);
  for (let i = 0; i < 2; i++) {
    let copias = 'ORIGINAL'
    if (i > 0) {
      copias = 'COPIA'
      doc.addPage();
    }
    chunks.forEach(function (chunk, index) {
      if (index > 0) {
        doc.addPage();
      }
      let sumaBullfa = 0;
      let totcan = 0;
      for (let i = 0; i < chunk.length; i++) {
        chunk[i][1] = chunk[i][1] == 0 ? 1 : parseFloat(chunk[i][1]);//codigo
        chunk[i][2] = parseFloat(chunk[i][2]);//cajas
        chunk[i][3] = parseFloat(chunk[i][3]);//piezasxcajas
        chunk[i][4] = chunk[i][4].replace(/\n/g, " ");//unidades
        sumaBullfa += parseFloat(chunk[i][1]); // Sumar al total la propiedad 'BULLFA' convertida a número
        totcan += parseFloat(chunk[i][3]);
      }
      for (let i = 0; i < chunk.length; i++) {
        // Sumar al total la propiedad 'BULLFA' convertida a número
      }
      doc.setFontSize(25)
      doc.setFont('helvetica', 'bold')
      doc.text("GRUPO VIZCARRA", 105, 10, "center");
      doc.setFontSize(8)
      doc.text('NUMERO PEDIDO:', 10, 10, 'left')
      doc.text(`${invoice._requisition.toString()} - ${invoice.requisition.notes}`, 10, 15, 'left');
      doc.setFontSize(12)
      doc.text(copias, 185, 10, 'left');
      doc.text(invoice.requisition.from.name, 10, 25, 'left')
      doc.text('LLUVIA LIGTH SA DE CV', 120, 25, 'left')
      doc.setFontSize(8)
      doc.text('CALLE AN PABLO 10 LOC G 10', 120, 30, 'left')
      doc.text('06090', 120, 35, 'left')
      doc.text('DELEG, CUAUHTEMOC CDMX       CENTRO', 120, 40, 'left')
      doc.text('LLI1210184G8', 120, 45, 'left')
      doc.text('HORA DE IMP:', 10, 50, 'left')
      doc.rect(45, 46, 15, 5);
      doc.text(dayjs(currentDate).format("HH:mm:ss"), 47, 50)
      doc.text('HR SALIDA M:', 61, 50, 'left')
      doc.rect(91, 46, 15, 5);
      doc.text('LLEGADA A SUCURSAL:', 10, 60, 'left')
      doc.rect(45, 56, 15, 5);
      doc.text('SALIDA SUCURSAL:', 61, 60, 'left')
      doc.rect(91, 56, 15, 5);
      doc.rect(120, 51, 80, 5);
      doc.text('DOCUMENTO', 121, 55, 'left')
      doc.text('FACTURA', 121, 60, 'left')
      doc.text('N.PARTICION', 143, 55, 'left')
      doc.text(invoice.id.toString(), 143, 60, 'left')
      doc.text('PAGINA', 165, 55, 'left')
      doc.text(`${index + 1} de ${paginas}`, 165, 60, 'left')
      doc.text('FECHA', 185, 55, 'left')
      const fecha = dayjs(invoice.created_at).format("YYYY-MM-DD")
      doc.text(fecha, 185, 60, 'left')
      autoTable(doc, {
        startX: 10,
        startY: 65,
        theme: 'plain',
        styles: { cellPadding: 1, fontSize: 8, halign: 'center' },
        head: [['CREADOR DOC', 'ALMACEN', 'AGENTE', 'FORMA DE PAGO']],
        body: [
          ['APP', almacen, invoice.verified.complete_name, 'C30'],//cambiar el verificador
        ],
      })

      autoTable(doc, {
        startX: 10,
        startY: 80,
        theme: 'striped',
        styles: { cellPadding: .6, fontSize: 8, halign: 'center' },
        head: [['ARTICULO', 'CAJAS', 'U.X CAJA', 'CANTIDAD', 'DESCRIPCION']],
        body: chunk,
        columnStyles: {
          0: { fontStyle: 'bold', halign: 'left' },
          1: { fontStyle: 'bold', halign: 'center' },
          4: { halign: 'left' },
        },

      })

      doc.setFontSize(11)
      doc.text('TOTAL CAJAS:', 10, 200, 'left')
      doc.text(sumaBullfa.toString(), 40, 200, 'left')
      doc.text('TOTAL UNIDADES:', 60, 200, 'left')
      doc.text(totcan.toString(), 100, 200, 'left')
      doc.setFontSize(8)
      doc.text('Debo(emos) y pagare(mos) incondicionalmente por este pagare a la order de GRUPO VIZCARRA, en la ciudad de Mexico,', 10, 210, 'left')
      doc.text('la cantidad de el valor recibido a mi(nuestra) entera satisfaccion', 10, 215, 'left')
      doc.text('Este pagare forma parte de una serie numerica del 1 al y 9 y todos estos estan sujetos a la condicion, de que al no pagarse cualquiera de ellos a su', 10, 220, 'left')
      doc.text('vencimiento sean exigibles todos los que le sigan en numero, ademas de los ya vencidosm desde la fecha de su vencimiento de el presente documento', 10, 225, 'left')
      doc.text('hasta el dia de su liquidacion, causaran intereses moratorios al tipo del % mensual en esta ciudad justamente con el principal', 10, 230, 'left')
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
      doc.text('UNA VEZ ENTREGADA LA MERCANCIA EN LA FLETERA O DOMICILIO QUE INDIQUE EL CLIENTE ', 10, 260, 'left')
      doc.text('LLUVIA LIGHT SA DE CV NO ES RESPONSABLE POR PEDIDAS TOTALES, PARCIALES ', 10, 265, 'left')
      doc.text('O CUALQUIER TIPO DE DANO EN LA MERCANCIA DE ESTE DOCUMENTO ', 10, 270, 'left')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text('NO SE ACEPTAN CAMBIOS NI DEVOLUCIONES', 10, 280, 'left')
      doc.setFontSize(25)
      doc.setFont('helvetica', 'bold')
      doc.text("GRUPO VIZCARRA", 105, 10, "center");
      doc.addImage(imgData, 'PNG', 95, 25, 20, 20);
      doc.addImage(barcodeImage, 'PNG', 130, 270, 75, 20);
    })
  }
  doc.save(`Factura ${invoice.id.toString()}`)

}


const transferFormat = async (invoice) => {
  console.log(invoice);
  const currentDate = new Date();
  // const qrData = `http://192.168.10.238:1308/#/checkin/${invoice.id}?key=${invoice.entry_key}`;
  // const qrData = `http://192.168.10.160:8000/#/distribute/checkin/${invoice.id}?key=${invoice.entry_key}`;
  const qrData = `http://192.168.10.189:2201/#/distribute/checkin/${invoice.id}?key=${invoice.entry_key}`;
  const almacenes = [
    { id: 1, alias: 'GEN', name: 'ALMACEN GENERAL' },
    { id: 2, alias: 'STC', name: 'ALMACEN TEXCOCO' },
    { id: 16, alias: 'BRA', name: 'ALMACEN BRASIL' },
    { id: 21, alias: 'PAN', name: 'ALMACEN PANTACO' },
    { id: 24, alias: 'BOL', name: 'ALMACEN BOLIVIA' },

  ]
  const almacenOr = almacenes.find(e => e.id == invoice?.requisition?.to?.id);
  const almacenDe = almacenes.find(e => e.id == invoice?.requisition?.from?.id);
  const qrOptions = {
    margin: 1,
    width: 1,
    height: 1
  }
  const canvas = document.createElement('canvas');
  await QRCode.toCanvas(canvas, qrData, qrOptions);
  const imgData = canvas.toDataURL('image/png');

  const barcodeCanvas = document.createElement('canvas'); // en navegador
  JsBarcode(barcodeCanvas, invoice.entry_key, {
    format: 'CODE128',
    displayValue: false,
    width: 2,
    height: 60,
    margin: 0
  });
  const barcodeImage = barcodeCanvas.toDataURL('image/png');



  const doc = new jsPDF();
  let chunks = [];
  const filterPro = invoice.products.filter(e => e.pivot.checkout == 1)
  const product = filterPro.map(e => {
    return {
      code: e.code,
      caja: e.pivot._supply_by == 3 ? e.pivot.toDelivered : 1,
      uxcaja: e.pivot.ipack,
      // cantidad: e.pivot.units,
      cantidad : e.pivot._supply_by == 3 ? (e.pivot.toDelivered * e.pivot.ipack) : e.pivot._supply_by == 2 ? (e.pivot.toDelivered * 12) : e.pivot.toDelivered,
      description: e.description,
    }
  })
  const arreglo = product.map(producto => Object.values(producto));
  const paginas = Math.ceil(arreglo.length / 20);
  for (var i = 0; i < arreglo.length; i += 20) {
    chunks.push(arreglo.slice(i, i + 20));
  }
  console.log(chunks);
  for (let i = 0; i < 2; i++) {
    let copias = 'ORIGINAL'
    if (i > 0) {
      copias = 'COPIA'
      doc.addPage();
    }
    chunks.forEach(function (chunk, index) {
      if (index > 0) {
        doc.addPage();
      }
      let sumaBullfa = 0;
      let totcan = 0;
      for (let i = 0; i < chunk.length; i++) {
        chunk[i][1] = chunk[i][1] == 0 ? 1 : parseFloat(chunk[i][1]);//codigo
        chunk[i][2] = parseFloat(chunk[i][2]);//cajas
        chunk[i][3] = parseFloat(chunk[i][3]);//piezasxcajas
        chunk[i][4] = chunk[i][4].replace(/\n/g, " ");//unidades
        sumaBullfa += parseFloat(chunk[i][1]); // Sumar al total la propiedad 'BULLFA' convertida a número
        totcan += parseFloat(chunk[i][3]);
      }
      for (let i = 0; i < chunk.length; i++) {
        // Sumar al total la propiedad 'BULLFA' convertida a número
      }
      doc.setFontSize(25)
      doc.setFont('helvetica', 'bold')
      doc.text('GRUPO VIZCARRA', 105, 10, "center");
      doc.setFontSize(8)
      doc.text('NUMERO PEDIDO:', 10, 10, 'left')
      // console.log(pedido);
      doc.text(`P-${invoice._requisition.toString()}`, 10, 15, 'left');
      doc.setFontSize(12)
      doc.text(copias, 185, 10, 'left');
      // doc.text(dat.data.heades.DENEMP, 10, 25, 'left')
      doc.text('LLUVIA LIGTH SA DE CV', 120, 25, 'left')
      doc.setFontSize(8)
      doc.text('CALLE AN PABLO 10 LOC G 10', 10, 30, 'left')
      doc.text(`06090`, 10, 35, 'left')
      doc.text('DELEG, CUAUHTEMOC CDMX', 10, 40, 'left')
      doc.text('DOCUMENTO', 10, 55, 'left')
      doc.text('TRASPASO', 10, 60, 'left')
      doc.text('PARTICION', 32, 55, 'left')
      doc.text(invoice.id.toString(), 32, 60, 'left')
      doc.text('PAGINA', 54, 55, 'left')
      doc.text(`${index + 1} de ${paginas}`, 54, 60, 'left')
      doc.text('FECHA', 76, 55, 'left')
      const fecha = dayjs(invoice.created_at).format("YYYY-MM-DD")
      doc.text(fecha, 76, 60, 'left')
      autoTable(doc, {
        startX: 10,
        startY: 65,
        theme: 'plain',
        styles: { cellPadding: 1, fontSize: 12, halign: 'center' },
        head: [['Almacen de Origen', 'Almacen de Destino']],
        body: [
          [`(${almacenOr.alias}) ${almacenOr.name}`, `(${almacenDe.alias}) ${almacenDe.name}`],
        ],
      })

      autoTable(doc, {
        startX: 10,
        startY: 80,
        theme: 'striped',
        styles: { cellPadding: .6, fontSize: 8, halign: 'center' },
        head: [['ARTICULO', 'CAJAS', 'U.X CAJA', 'CANTIDAD', 'DESCRIPCION']],
        body: chunk,
        columnStyles: {
          0: { fontStyle: 'bold', halign: 'left' },
          1: { fontStyle: 'bold', halign: 'center' },
          4: { halign: 'left' },
        },

      })

      doc.setFontSize(11)
      doc.text('TOTAL CAJAS:', 100, 200, 'left')
      doc.text(sumaBullfa.toString(), 130, 200, 'left')
      doc.text('TOTAL UNIDDADES:', 150, 200, 'left')
      doc.text(totcan.toString(), 190, 200, 'left')
      doc.text('Firma Almacen Origen', 12, 224)
      doc.text('Firma Almacen Destino', 82, 224)
      doc.text('Firma Chofer', 152, 224)


      doc.rect(5, 220, 55, 37);
      doc.rect(75, 220, 55, 37);
      doc.rect(140, 220, 55, 37);
      doc.addImage(imgData, 'PNG', 95, 25, 20, 20);
      doc.addImage(barcodeImage, 'PNG', 130, 270, 75, 20);
    })
  }
  doc.save(`Traspaso${invoice.id}`)

}

export default {
  invoiceFormat,
  transferFormat
}
