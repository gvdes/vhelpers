
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import dayjs from 'dayjs';
import QRCode from 'qrcode';
// import 'jspdf-qrcode'


const largeLabel = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/Navidad6(2).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
      const labelsPerColumn = 3; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(30);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 61, y + 15); // se agrega codigo corto

        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 10, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 70, y + 57, 20, 20) // ajusta la posición y tamaño
        })
        let ypri = y + 39
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 30, ypri + i * yprincrement + 5);// alias de el precio
            doc.setFontSize(28);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 34, ypri + i * yprincrement + 20);// valor de el precio
          } else {
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 23, ypri + i * yprincrement);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 45, ypri + i * yprincrement);// valor de el precio
          }
        })
        //CONTINUA CODIGO
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 10, y + 12); // codigo de el producto
        doc.text(product.large, x + 18, y + 74); // largo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.pieces} PZS`, x + 18, y + 69); // piezas por caja
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 19, y + 77); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const xtralargeLabel = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/Navidad6(2).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 205; // Ancho de cada etiqueta
      const labelHeight = 125; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 1; // Número de etiquetas por fila
      const labelsPerColumn = 2; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(70);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 120, y + 112); // se agrega codigo corto

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 18, y + 31); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 39
        let yprincrement = 12
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 140, y + 40, 45, 45) // ajusta la posición y tamaño
        })
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 60, ypri + i * yprincrement + 10);// alias de el precio
            doc.setFontSize(50);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 64, ypri + i * yprincrement + 35);// valor de el precio
          } else {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 60, ypri + i * yprincrement + 15);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 93, ypri + i * yprincrement + 15);// valor de el precio
          }
        })
        //CONTINUA CODIGO
        doc.setFontSize(45);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 18, y + 23); // codigo de el producto
        doc.text(product.large, x + 35, y + 112); // largo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.pieces} PZS`, x + 185, y + 23, { align: 'right' }); // piezas por caja
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 38, y + 114); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const mediumLabel = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/Navidad9(1).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 65; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 3; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 37, y + 77); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 37, y + 53, 18, 18) // ajusta la posición y tamaño
        })
        let ypri = y + 40
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 13, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(26);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 13, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 10, ypri + i * yprincrement);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 30, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 25, y + 20); // codigo de el producto
        doc.text(product.large, x + 18, y + 77); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 20, y + 73); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 79); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const smallLabel = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/NaviSan(1).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 67; // Ancho de cada etiqueta
      const labelHeight = 63; // Alto de cada etiqueta
      const spacingX = 0; // Espaciado horizontal entre etiquetas
      const spacingY = 3; // Espaciado vertical entre etiquetas
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 4; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        // doc.setTextColor(255, 51, 97);
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }

        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        //   // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        //   // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 23, y + 37); // se agrega codigo corto

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(product.label.substring(0, 25), x + 15, y + 43); // descripcion de el producto
        doc.setFontSize(10);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 46, y + 30, 10, 10) // ajusta la posición y tamaño
        })
        let ypri = y + 36
        let yprincrement = 12
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 23, ypri + i * yprincrement + 12);// alias de el precio
            doc.setFontSize(14);
            doc.text(`$ ${Number(e.pivot.price).toFixed(0)}`, x + 27, ypri + i * yprincrement + 17);// valor de el precio
          } else {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + i * yprincrement + 10, ypri + 12);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(0)}`, x + i * yprincrement + 10, ypri + 16);// valor de el precio
          }
        })
        //   //CONTINUA CODIGO
        doc.setFontSize(6);
        doc.setFont('helvetica', 'bold');
        doc.text(`(${product.code})`, x + 28, y + 40); // codigo de el producto
        doc.text(product.large, x + 40, y + 55); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 40, y + 57); // piezas por caja
        //   doc.setFontSize(6)
        //   doc.setFont('helvetica', 'normal');
        //   doc.text(product.locations ?  product.locations.map(location =>location.path).join('/') : '' , x + 19, y + 77); //ubicacion de exhibicion de el producto

      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const verticalLabelNavidad = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/NavidadVer(2).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 48; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 4; // Número de etiquetas por fila
      const labelsPerColumn = 4; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 20, y + 80); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 15; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 22); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 20, y + 53, 10, 10) // ajusta la posición y tamaño
        })
        let ypri = y + 35
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 5, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(26);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 10, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 5, ypri + i * yprincrement);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 20, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 24, y + 17, { align: 'center' }); // codigo de el producto
        doc.text(product.large, x + 20, y + 68); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 20, y + 73); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 81); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const toyBoys = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/Ninio.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 65; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 3; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 15, y + 10); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 3, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, {
          errorCorrectionLevel: 'H', color: {
            dark: '#000000',  // color de los puntos del QR
            light: '#00000000' // fondo transparente (usa rgba o hex con alfa)
          }
        }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 20, y + 58, 15, 15) // ajusta la posición y tamaño
        })
        let ypri = y + 40
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 5, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 5, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 2, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 19, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 45, y + 40); // codigo de el producto
        doc.text(product.large, x + 45, y + 52); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 45, y + 46); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 84); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const toyGirls = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/Ninia.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 65; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 3; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 15, y + 20); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 50, y + 36, 12, 12) // ajusta la posición y tamaño
        })
        let ypri = y + 40
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 15, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 15, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 15, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 32, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 62, y + 70, { align: 'right' }); // codigo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(product.large, x + 15, y + 65); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 15, y + 70); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 84); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const xlargenina = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/xlargeninia.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 205; // Ancho de cada etiqueta
      const labelHeight = 125; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 1; // Número de etiquetas por fila
      const labelsPerColumn = 2; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(70);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 120, y + 112); // se agrega codigo corto

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 18, y + 31); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 140, y + 40, 45, 45) // ajusta la posición y tamaño
        })
        let ypri = y + 39
        let yprincrement = 12
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 60, ypri + i * yprincrement + 10);// alias de el precio
            doc.setFontSize(50);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 64, ypri + i * yprincrement + 35);// valor de el precio
          } else {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 60, ypri + i * yprincrement + 15);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 93, ypri + i * yprincrement + 15);// valor de el precio
          }
        })
        //CONTINUA CODIGO
        doc.setFontSize(45);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 18, y + 23); // codigo de el producto
        doc.text(product.large, x + 35, y + 112); // largo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.pieces} PZS`, x + 185, y + 23, { align: 'right' }); // piezas por caja
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 38, y + 114); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const xlargenino = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/xlargeninio.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 205; // Ancho de cada etiqueta
      const labelHeight = 125; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 1; // Número de etiquetas por fila
      const labelsPerColumn = 2; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(70);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 120, y + 112); // se agrega codigo corto

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 18, y + 31); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 140, y + 40, 45, 45) // ajusta la posición y tamaño
        })
        let ypri = y + 39
        let yprincrement = 12
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 60, ypri + i * yprincrement + 10);// alias de el precio
            doc.setFontSize(50);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 64, ypri + i * yprincrement + 35);// valor de el precio
          } else {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 60, ypri + i * yprincrement + 15);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 93, ypri + i * yprincrement + 15);// valor de el precio
          }
        })
        //CONTINUA CODIGO
        doc.setFontSize(45);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 18, y + 23); // codigo de el producto
        doc.text(product.large, x + 35, y + 112); // largo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.pieces} PZS`, x + 185, y + 23, { align: 'right' }); // piezas por caja
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 38, y + 114); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const Hlargenino = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/Ninio.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 60; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
      const labelsPerColumn = 4; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 5, y + 10); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 15); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, {
          errorCorrectionLevel: 'H', color: {
            dark: '#000000',  // color de los puntos del QR
            light: '#00000000' // fondo transparente (usa rgba o hex con alfa)
          }
        }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 80, y + 30, 16, 16) // ajusta la posición y tamaño
        })

        let ypri = y + 25
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 15, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 15, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 15, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 32, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 70, y + 25); // codigo de el producto
        doc.text(product.large, x + 45, y + 52); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 70, y + 30); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 84); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const Hlargenina = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/Ninia.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 60; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
      const labelsPerColumn = 4; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 5, y + 20); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, {
          errorCorrectionLevel: 'H',
        }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 80, y + 13, 16, 16) // ajusta la posición y tamaño
        })
        let ypri = y + 32
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 20, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 20, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 20, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 37, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 70, y + 32); // codigo de el producto
        doc.text(product.large, x + 45, y + 52); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 70, y + 37); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 84); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const xlargeExhnino = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Mochila/ExhNINO.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 205; // Ancho de cada etiqueta
      const labelHeight = 125; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 1; // Número de etiquetas por fila
      const labelsPerColumn = 2; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(55);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 100, y + 27, { align: 'center' }); // se agrega codigo corto

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 100, y + 50, { align: 'center' }); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 163, y + 35, 30, 30) // ajusta la posición y tamaño
        })
        let ypri = y + 50
        let yprincrement = 12
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 60, ypri + i * yprincrement + 10);// alias de el precio
            doc.setFontSize(50);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 64, ypri + i * yprincrement + 35);// valor de el precio
          } else {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 60, ypri + i * yprincrement + 15);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 93, ypri + i * yprincrement + 15);// valor de el precio
          }
        })
        //CONTINUA CODIGO
        doc.setFontSize(45);
        doc.setFont('helvetica', 'bold');
        // doc.text(`${product.code}`, x + 18, y + 31); // codigo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.code}`, x + 100, y + 40, { align: 'center' }); // codigo de el producto
        doc.setFontSize(20)
        doc.setFont('helvetica', 'normal');
        doc.text(product.large, x + 100, y + 110, { align: 'center' }); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 100, y + 100, { align: 'center' }); // piezas por caja
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 38, y + 114); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const xlargeExhnina = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Mochila/ExhNINA.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 205; // Ancho de cada etiqueta
      const labelHeight = 125; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 1; // Número de etiquetas por fila
      const labelsPerColumn = 2; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(50);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.code, x + 100, y + 27, { align: 'center' }); // se agrega codigo corto

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 100, y + 50, { align: 'center' }); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 152, y + 55, 30, 30) // ajusta la posición y tamaño
        })
        let ypri = y + 50
        let yprincrement = 12
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 67, ypri + i * yprincrement + 10);// alias de el precio
            doc.setFontSize(50);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 69, ypri + i * yprincrement + 35);// valor de el precio
          } else {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 67, ypri + i * yprincrement + 15);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 98, ypri + i * yprincrement + 15);// valor de el precio
          }
        })
        //CONTINUA CODIGO
        doc.setFontSize(45);
        doc.setFont('helvetica', 'bold');
        // doc.text(`${product.code}`, x + 18, y + 31); // codigo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.code}`, x + 100, y + 40, { align: 'center' }); // codigo de el producto
        doc.setFontSize(20)
        doc.setFont('helvetica', 'normal');
        doc.text(product.large, x + 100, y + 110, { align: 'center' }); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 100, y + 100, { align: 'center' }); // piezas por caja
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 38, y + 114); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const HorizontalLabel = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      // const image = "/icons/Navidad/NavidadVer(2.).png";
      // const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 31; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
      const labelsPerColumn = 7; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.rect(x, y, labelWidth, labelHeight)//agrega rectangulo buey
        // doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 1, y + 7, { align: 'left' }); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 40; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 1, y + 15, { align: 'left' }); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, {
          errorCorrectionLevel: 'H', color: {
            dark: '#000000',  // color de los puntos del QR
            light: '#00000000' // fondo transparente (usa rgba o hex con alfa)
          }
        }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 40, y + 17, 15, 15) // ajusta la posición y tamaño
        })
        let ypri = y + 5
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(17);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 62, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(26);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 63, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(15);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 62, ypri + i * yprincrement);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 78, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 1, y + 11, { align: 'left' }); // codigo de el producto
        doc.text(product.large, x + 1, y + 30); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 1, y + 25); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 30); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const HorizontalLabelwarehouse = (data, nick, name) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      // const image = "/icons/Navidad/NavidadVer(2.).png";
      // const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 31; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
      const labelsPerColumn = 7; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.rect(x, y, labelWidth, labelHeight)//agrega rectangulo buey
        doc.setFontSize(40);
        doc.setFont('helvetica', 'bold');
        doc.text(product.code, x + 1, y + 12, { align: 'left' }); // se agrega codigo corto
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 40; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 1, y + 20, { align: 'left' }); // Dibuja el texto dividido en la etiqueta
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, {
          errorCorrectionLevel: 'H', color: {
            dark: '#000000',
            light: '#00000000'
          }
        }, (err, url) => {
          if (err) throw err
          doc.addImage(url, 'PNG', x + 75, y + 3, 25, 25) // ajusta la posición y tamaño
        })
        doc.setFontSize(12);
        doc.setFontSize(20);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.variants?.map(e => `(${e.barcode})`).join('')}`, x + 1, y + 30);

        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 30); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const VerticalLabel = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      console.log(data)
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 60; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
      const labelsPerColumn = 4; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {

        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        // doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen

        //se va a agregar tambien el qr brou
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 75, y + 20, 25, 25) // ajusta la posición y tamaño
        })
        doc.rect(x, y, labelWidth, labelHeight)//agrega rectangulo buey

        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(30);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 2, y + 10); // se agrega codigo corto

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 2, y + 15); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 25
        let yprincrement = 7
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 25, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 25, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 25, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 42, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 55, y + 58, { align: 'left' }); // codigo de el producto
        doc.text(product.large, x, y + 58); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 1, y + 52); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 84); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const locationsWarehouse = (data, nick) => {
  return new Promise((resolve, reject) => {
    try {
      const locations = data
      const expandedProducts = [];
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 200; // Ancho de cada etiqueta
      const labelHeight = 31; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 1; // Número de etiquetas por fila
      const labelsPerColumn = 7; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      locations.forEach((location, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.rect(x, y, labelWidth, labelHeight)//agrega rectangulo buey
        const qrText = JSON.stringify(location.id) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, {
          errorCorrectionLevel: 'H', color: {
            dark: '#000000',
            light: '#00000000'
          }
        }, (err, url) => {
          if (err) throw err
          doc.setFontSize(8)
          doc.text(`${location.path}`, x + 15, y + 28); // piezas por caja
          doc.addImage(url, 'PNG', x + 10, y + 1, 26, 26) // ajusta la posición y tamaño
          doc.text(`${location.path}`, x + 170, y + 28); // piezas por caja
          doc.addImage(url, 'PNG', x + 165, y + 1, 26, 26) // ajusta la posición y tamaño
        })
        doc.setFontSize(60)
        doc.text(`${location.alias}`, x + 55, y + 20); // piezas por caja
        doc.text(`${location.alias}`, x + 110, y + 20); // piezas por caja
        doc.setFontSize(8)

        doc.text(`${location.id}`, x + 55, y + 28); // piezas por caja
        doc.text(`${location.id}`, x + 110, y + 28); // piezas por caja

      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const Paquetes = (data, nick, name, prices) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Mochila/STAR12_1.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 205; // Ancho de cada etiqueta
      const labelHeight = 125; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 1; // Número de etiquetas por fila
      const labelsPerColumn = 2; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(70);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 100, y + 30, { align: 'center' }); // se agrega codigo corto

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 100, y + 52, { align: 'center' }); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          doc.addImage(url, 'PNG', x + 27, y + 62, 30, 30) // ajusta la posición y tamaño
        })
        let ypri = y + 50
        let yprincrement = 12
        product.usedPrices
          .filter(item => prices.val.includes(item.id))             // los que están en prices.val
          .filter(e => e.alias === "OFERTA" || e.id === 1 || e.id === 4) // solo OFERTA, 1 y 4
          .sort((a, b) => b.id - a.id) // ordenar por id descendente
          .forEach((e, i) => {
            if (e.alias === "OFERTA") {
              doc.setFontSize(35);
              doc.setFont('helvetica', 'bold');
              doc.text('Unico Precio', x + 60, ypri + i * yprincrement + 10); // alias del precio
              doc.setFontSize(50);
              doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 64, ypri + i * yprincrement + 35); // valor del precio
            } else if (e.alias === "CAJ") {
              // Mostrar "A PARTIR" en una línea y "DE 12" en otra
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(25); // tamaño más chico para que sea como párrafos
              doc.text("A PARTIR", x + 60, ypri + i * yprincrement + 18);
              doc.setFontSize(30); // tamaño más chico para que sea como párrafos
              doc.text("DE 12", x + 60, ypri + i * yprincrement + 26);
              doc.setFontSize(40); // tamaño más chico para que sea como párrafos
              // Precio al mismo tamaño de letra que los párrafos
              doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 115, ypri + i * yprincrement + 22);
            } else {
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(35);
              doc.text(e.alias, x + 60, ypri + i * yprincrement + 30);
              doc.setFontSize(40);
              doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 115, ypri + i * yprincrement + 30);
            }
          });
        //CONTINUA CODIGO
        doc.setFontSize(50);
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.code}`, x + 100, y + 45, { align: 'center' }); // codigo de el producto

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(20);
        doc.text(`${product.pieces} PZS`, x + 100, y + 105, { align: 'center' }); // piezas por caja
        doc.setFont('helvetica', 'bold');
        doc.text(product.large, x + 100, y + 112, { align: 'center' }); // largo de el producto
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 38, y + 114); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const VerticalLabelCalc = (data, nick, name, prices) => {
  console.log(prices)
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      console.log(data)
      const SCALE = 0.60;

      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      // const marginX = 5; // Margen izquierdo
      // const marginY = 10; // Margen superior
      // const labelWidth = 100; // Ancho de cada etiqueta
      // const labelHeight = 60; // Alto de cada etiqueta
      const marginX = 5 * SCALE;
      const marginY = 10 * SCALE;

      const labelWidth = 100 * SCALE;
      const labelHeight = 60 * SCALE;
      // const spacingX = 5; // Espaciado horizontal entre etiquetas
      // const spacingY = 5; // Espaciado vertical entre etiquetas
      const spacingX = 5 * SCALE;
      const spacingY = 5 * SCALE;
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 7; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        // doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen

        //se va a agregar tambien el qr brou
        const qrText = JSON.stringify(product.historic_prices?.length == 1 ? { modelo: product.id, idChange: product.historic_prices[0].id } : { modelo: product.id, idChange: null }) // o JSON.stringify({modelo: product.code, version: 'v1'})
        QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) throw err

          // doc.addImage(url, 'PNG', x + 75, y + 20, 25, 25) // ajusta la posición y tamaño
          doc.addImage(url, 'PNG', x + 75 * SCALE, y + 20 * SCALE, 25 * SCALE, 25 * SCALE);
        })
        doc.rect(x, y, labelWidth, labelHeight)//agrega rectangulo buey

        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        // doc.setFontSize(30);
        doc.setFontSize(30 * SCALE);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 2, y + 10 * SCALE); // se agrega codigo corto

        // doc.setFontSize(12);
        doc.setFontSize(12 * SCALE);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 2, y + 15 * SCALE); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        // doc.setFontSize(12);
        doc.setFontSize(12 * SCALE);
        let ypri = y + 25 * SCALE
        let yprincrement = 7 * SCALE
        product.usedPrices.filter(item => prices.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            // doc.setFontSize(12);
            doc.setFontSize(12 * SCALE);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 25 * SCALE, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 25 * SCALE, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            // doc.setFontSize(18);
            doc.setFontSize(18 * SCALE);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 25 * SCALE, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 42 * SCALE, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        // doc.setFontSize(16);
        doc.setFontSize(16 * SCALE);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 55 * SCALE, y + 58 * SCALE, { align: 'left' }); // codigo de el producto
        doc.text(product.large, x, y + 58 * SCALE); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 1, y + 52 * SCALE); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 84 * SCALE); //ubicacion de exhibicion de el producto
      });
      doc.save(`${nick} etiquetas ${name}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const barcode = (text) => {
  const qrData = text;
  const qrOptions = {
    margin: 0,
    width: 1,
    height: 1
  }
  const canvas = document.createElement('canvas');
  QRCode.toCanvas(canvas, qrData, qrOptions);
  return canvas.toDataURL("image/png");
}

export default { largeLabel, xtralargeLabel, mediumLabel, smallLabel, verticalLabelNavidad, toyBoys, toyGirls, xlargenina, xlargenino, Hlargenino, Hlargenina, xlargeExhnino, xlargeExhnina, HorizontalLabel, VerticalLabel, Paquetes, HorizontalLabelwarehouse, locationsWarehouse, VerticalLabelCalc };
