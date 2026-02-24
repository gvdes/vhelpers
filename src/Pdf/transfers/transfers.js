import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import dayjs from 'dayjs';


const tranfer_warehouse = async (data) => {
    const doc = new jsPDF({ format: 'letter' });
    let chunks = [];
    const arreglo = data.bodie.map(producto => Object.values([producto.code, producto.description, producto.pivot.amount]));
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
        let totcan = 0;
        for (let i = 0; i < chunk.length; i++) {
          chunk[i][0] = chunk[i][0];
          chunk[i][1] = chunk[i][1];
          chunk[i][2] = parseFloat(chunk[i][2]);
          totcan += parseFloat(chunk[i][2]);
        }
        doc.setFontSize(25)
        doc.setFont('helvetica', 'bold')
        doc.text('GRUPO VIZCARRA', 105, 10, "center");
        doc.setFontSize(8)
        doc.setFontSize(12)
        doc.text(copias, 185, 10, 'left');
        doc.text('LLUVIA LIGTH SA DE CV', 10, 25, 'left')
        doc.setFontSize(8)
        doc.text(data.created_by.name, 10, 30, 'left')
        doc.text(data.notes, 10, 35, 'left')
        doc.text('DELEG, CUAUHTEMOC CDMX', 10, 40, 'left')
        doc.text('DOCUMENTO', 10, 55, 'left')
        doc.text('TRASPASO', 10, 60, 'left')
        doc.text('NUMERO', 32, 55, 'left')
        doc.text(String(data.id), 32, 60, 'left')
        doc.text('PAGINA', 54, 55, 'left')
        doc.text(`${index + 1} de ${paginas}`, 54, 60, 'left')
        doc.text('FECHA', 76, 55, 'left')
        const fecha = dayjs(data.created_at).format("YYYY-MM-DD")
        doc.text(fecha, 76, 60, 'left')
        autoTable(doc, {
          startX: 10,
          startY: 65,
          theme: 'plain',
          styles: { cellPadding: 1, fontSize: 12, halign: 'center' },
          head: [['Almacen de Origen', 'Almacen de Destino']],
          body: [
            [`(${data.origin.alias}) ${data.origin.name}`, `(${data.destiny.alias}) ${data.destiny.name}`],
          ],
        })

        autoTable(doc, {
          startX: 10,
          startY: 80,
          theme: 'striped',
          styles: { cellPadding: .6, fontSize: 8, halign: 'center' },
          head: [['ARTICULO', 'DESCRIPCION', 'CANTIDAD']],
          body: chunk,
          columnStyles: {
            0: { fontStyle: 'bold', halign: 'left' },
            1: { fontStyle: 'bold', halign: 'left' },
            4: { halign: 'center' },
          },

        })
        doc.setFontSize(11)
        doc.text('TOTAL UNIDDADES:', 150, 200, 'left')
        doc.text(totcan.toString(), 190, 200, 'left')
        doc.text('Firma Almacen Origen', 12, 224)
        doc.text('Firma Almacen Destino', 82, 224)
        doc.text('Firma Chofer', 152, 224)
        doc.rect(10, 220, 60, 40);
        doc.rect(80, 220, 60, 40);
        doc.rect(150, 220, 60, 40);
      })
    }
    doc.save(`Traspaso${data.id}`)
}

export default { tranfer_warehouse };
