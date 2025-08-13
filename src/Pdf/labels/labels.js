
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
        doc.text(product.name, x + 61, y + 77); // se agrega codigo corto

        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 10, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
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
        doc.text(`${product.pieces} PZS`, x + 70, y + 12); // piezas por caja
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

const verticalLabel = (data, nick, name, prices) => {
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
        doc.text(product.name, x + 100, y + 27, { align: 'center' }); // se agrega codigo corto

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 100, y + 50, { align: 'center' }); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
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
      const labelsPerColumn = 9; // Número de etiquetas por columna
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
      // const qrText = JSON.stringify(data.historic_prices.length == 1 ? data.historic_prices[0] : null) // o JSON.stringify({modelo: product.code, version: 'v1'})

      // QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
      //   if (err) throw err

      //   doc.addImage(url, 'PNG', x + 80, y + 16, 15, 15) // ajusta la posición y tamaño
      // })
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
        // const qrText = JSON.stringify(product.historic_prices.length == 1 ? {modelo: product.id, idChange: product.historic_prices[0].id} : null) // o JSON.stringify({modelo: product.code, version: 'v1'})

        // QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, (err, url) => {
        //   if (err) throw err

        //   doc.addImage(url, 'PNG', x + 75, y + 20, 20, 20) // ajusta la posición y tamaño
        // })
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

const plainMedium = (pdf, count, products, nick, zip) => {
  console.log("ESTE ES EL FORMATO!!!");
  let width = pdf.internal.pageSize.getWidth() / 2.15;
  let height = pdf.internal.pageSize.getHeight() / 4.3;
  let countX = 1;
  let countY = 1;
  let counterCodeShort = 0;
  let counterCodeShortX = 0;
  let productXY = 8;
  let newProducts = [];
  products.map((item) => {
    for (let i = 0; i < item.copies; i++) {
      newProducts.push(item);
    }
    return newProducts;
  });
  products = newProducts;
  for (let i = 0; i < products.length; i++) {
    if (i % 2 == 0) {
      pdf.setFontSize(12);
      pdf.setFont("Montserrat-Semi");
      pdf.rect(20, 20, width, height * countY);
      pdf.text(
        "Vizuru",
        (width / 1.75),
        (32 + (countY == 1 ? 0 : counterCodeShort)),
        null,
        null,
        "center"
      ); //18.3 12.5 6.75
      pdf.setFont("Montserrat-Bold");
      pdf.setFontSize(33);
      this.useIpack
        ? pdf.text(
          products[i].name,
          width / 10,
          70 + (countY == 1 ? 0 : counterCodeShort),
          null,
          null,
          "left"
        )
        : pdf.text(
          products[i].name,
          (width / 1.75),
          (70 + (countY == 1 ? 0 : counterCodeShort)), null, null, "center");
      pdf.setFontSize(10);
      pdf.setFont("Montserrat");
      let splitter = pdf.splitTextToSize(products[i].label, 270);
      pdf.text(
        splitter,
        width / 10,
        88 + (countY == 1 ? 0 : counterCodeShort),
        null,
        null,
        "left"
      );
      let aux = 0;
      if (products[i].type == "off") {
        pdf.setFont("Montserrat-Semi");
        pdf.setFontSize(12);
        // pdf.addImage(
        //   "pdf/img/banner.png",
        //   "PNG",
        //   width / 4.5,
        //   70 + (countY == 1 ? 0 : counterCodeShort) + aux,
        //   210,
        //   140
        // );
        let convert =
          products[i].prices[0].price +
          (products[i].prices[0].price * products[i].discount) / 100;
        convert =
          Math.floor(convert) == products[i].prices[0].price
            ? convert + 1
            : convert;
        // pdf.text(
        //   `De $${Math.floor(convert) + 1} a`,
        //   width / 2.2,
        //   123 + (countY == 1 ? 0 : counterCodeShort) + aux,
        //   null,
        //   null,
        //   "left"
        // );
        pdf.setFont("Montserrat-Bold");
        pdf.setFontSize(12);
        pdf.text(
          `PRECIO UNICO`,
          width / 2,
          110 + (countY == 1 ? 0 : counterCodeShort) + aux,
          null,
          null,
          "left"
        );
        pdf.setFontSize(35);
        pdf.text(
          `$${parseFloat(
            products[i].prices[0].price != 0
              ? products[i].prices[0].price
              : 1
          )}`,
          width / 2.2,
          155 + (countY == 1 ? 0 : counterCodeShort) + aux,
          null,
          null,
          "left"
        );
        pdf.setFontSize(20);
        // pdf.text(
        //   `-${products[i].discount}%`,
        //   width / 3.6,
        //   145 + (countY == 1 ? 0 : counterCodeShort) + aux,
        //   null,
        //   null,
        //   "left"
        // );
        pdf.setFontSize(30);
        pdf.setFont("Montserrat-Semi");
        aux += aux + 30;
      } else {
        switch (products[i].prices.length) {
          case 1:
            pdf.setFont("Montserrat");
            pdf.setFontSize(30);
            pdf.text(
              products[i].prices[0].alias,
              width / 3.8,
              140 + (countY == 1 ? 0 : counterCodeShort) + aux,
              null,
              null,
              "left"
            );
            pdf.setFontSize(30);
            pdf.setFont("Montserrat-Semi");
            pdf.text(
              `$${parseFloat(products[i].prices[0].price)}`,
              width / 1.8,
              140 + (countY == 1 ? 0 : counterCodeShort) + aux,
              null,
              null,
              "left"
            );
            aux += aux + 30;
            break;
          case 2:
            for (let y = 0; y < products[i].prices.length; y++) {
              pdf.setFont("Montserrat");
              pdf.setFontSize(20);
              pdf.text(
                products[i].prices[y].alias,
                width / 3,
                120 + (countY == 1 ? 0 : counterCodeShort) + aux,
                null,
                null,
                "left"
              );
              pdf.setFontSize(25);
              pdf.setFont("Montserrat-Semi");
              pdf.text(
                `$${parseFloat(products[i].prices[y].price)}`,
                width / 1.8,
                120 + (countY == 1 ? 0 : counterCodeShort) + aux,
                null,
                null,
                "left"
              );
              aux += aux + 30;
            }
            break;
          case 3:
            for (let y = 0; y < products[i].prices.length; y++) {
              pdf.setFont("Montserrat");
              pdf.setFontSize(18);
              pdf.text(
                products[i].prices[y].alias,
                width / 3,
                118 + (countY == 1 ? 0 : counterCodeShort) + aux,
                null,
                null,
                "left"
              );
              pdf.setFontSize(22);
              pdf.setFont("Montserrat-Semi");
              pdf.text(
                `$${parseFloat(products[i].prices[y].price)}`,
                width / 1.8,
                118 + (countY == 1 ? 0 : counterCodeShort) + aux,
                null,
                null,
                "left"
              );
              aux += 25;
            }
            break;
          case 4:
            for (let y = 0; y < products[i].prices.length; y++) {
              if (y == 1) {
                aux = 0;
              }
              if (y == 1 || y == 3) {
                pdf.setFont("Montserrat");
                pdf.setFontSize(15);
                pdf.text(
                  products[i].prices[y].alias,
                  width / 1.7,
                  130 + (countY == 1 ? 0 : counterCodeShort) + aux,
                  null,
                  null,
                  "left"
                );
                pdf.setFontSize(18);
                pdf.setFont("Montserrat-Semi");
                pdf.text(
                  `$${parseFloat(products[i].prices[y].price)}`,
                  width / 1.35,
                  130 + (countY == 1 ? 0 : counterCodeShort) + aux,
                  null,
                  null,
                  "left"
                );
                aux += aux + 30;
              } else if (y == 0 || y == 2) {
                pdf.setFont("Montserrat");
                pdf.setFontSize(15);
                pdf.text(
                  products[i].prices[y].alias,
                  width / 7,
                  130 + (countY == 1 ? 0 : counterCodeShort) + aux,
                  null,
                  null,
                  "left"
                );
                pdf.setFontSize(18);
                pdf.setFont("Montserrat-Semi");
                pdf.text(
                  `$${parseFloat(products[i].prices[y].price)}`,
                  width / 3.3,
                  130 + (countY == 1 ? 0 : counterCodeShort) + aux,
                  null,
                  null,
                  "left"
                );
              }
            }
            break;
        }
      }
      pdf.setFont("Montserrat");
      pdf.setFontSize(16);
      pdf.text(
        `${products[i].pieces}pz`,
        width / 4.5,
        195 + (countY == 1 ? 0 : counterCodeShort),
        null,
        null,
        "center"
      );
      pdf.setFont("Montserrat-Bold");
      pdf.text(
        products[i].large,
        width / 3,
        195 + (countY == 1 ? 0 : counterCodeShort),
        null,
        null,
        "left"
      );
      pdf.setFont("Montserrat-Semi");
      pdf.setFontSize(16);
      pdf.text(
        `${products[i].code}`,                        // text
        (width / 1.4),                                // X
        (195 + (countY == 1 ? 0 : counterCodeShort)), // Y
        null,
        null,
        "left"
      );
      this.useIpack
        ? pdf.addImage(
          this.convertTextToBase64Barcode(products[i].name),
          "PNG",
          width / 1.48,
          40 + (countY == 1 ? 0 : counterCodeShort),
          100,
          25
        )
        : "";
      // /*----------  SEGMENTO DE PRECIOS SOLO SI SON SELECCIONADOS TODOS  -----------*/
      countY++;
      counterCodeShort += 182 + (i < 3 ? 4 : 2);
    } else {
      pdf.setFont("Montserrat-Semi");
      pdf.setFontSize(12);
      pdf.rect(width + 20, 20, width, height * countX);
      pdf.text(
        "Vizuru",
        (width / 1.75) * 2.75,
        32 + (countX == 1 ? 0 : counterCodeShortX),
        null,
        null,
        "center"
      );
      pdf.setFont("Montserrat-Bold");
      pdf.setFontSize(33);
      this.useIpack
        ? pdf.text(
          products[i].name,
          width * 1.1,
          70 + (countX == 1 ? 0 : counterCodeShortX),
          null,
          null,
          "left"
        )
        : pdf.text(
          products[i].name,
          (width / 1.75) * 2.75,
          70 + (countX == 1 ? 0 : counterCodeShortX),
          null,
          null,
          "center"
        );
      pdf.setFontSize(10);
      pdf.setFont("Montserrat");
      let splitter = pdf.splitTextToSize(products[i].label, 270);
      pdf.text(
        splitter,
        width * 1.1,
        88 + (countX == 1 ? 0 : counterCodeShortX),
        null,
        null,
        "left"
      );
      let aux = 0;
      if (products[i].type == "off") {
        pdf.setFont("Montserrat-Semi");
        pdf.setFontSize(12);
        // pdf.setTextColor(255);
        // pdf.addImage(
        //   "pdf/img/banner.png",
        //   "PNG",
        //   width * 1.23,
        //   70 + (countX == 1 ? 0 : counterCodeShortX) + aux,
        //   210,
        //   140
        // );
        let convert =
          products[i].prices[0].price +
          (products[i].prices[0].price * products[i].discount) / 100;
        convert =
          Math.floor(convert) == products[i].prices[0].price
            ? convert + 1
            : convert;
        // pdf.text(
        //   `De $${Math.floor(convert) + 1} a`,
        //   width * 1.46,
        //   123 + (countX == 1 ? 0 : counterCodeShortX) + aux,
        //   null,
        //   null,
        //   "left"
        // );
        // pdf.setTextColor(0);
        pdf.setFont("Montserrat-Bold");
        pdf.setFontSize(12);
        pdf.text(
          `PRECIO UNICO`,
          width * 1.42,
          110 + (countX == 1 ? 0 : counterCodeShortX) + aux,
          null,
          null,
          "left"
        );
        pdf.setFontSize(35);
        pdf.text(
          `$${parseFloat(
            products[i].prices[0].price != 0
              ? products[i].prices[0].price
              : 1
          )}`,
          width * 1.48,
          160 + (countX == 1 ? 0 : counterCodeShortX) + aux,
          null,
          null,
          "left"
        );
        pdf.setFontSize(20);
        // pdf.text(
        //   `-${products[i].discount}%`,
        //   width * 1.28,
        //   145 + (countX == 1 ? 0 : counterCodeShortX) + aux,
        //   null,
        //   null,
        //   "left"
        // );
        // pdf.text(products[i].prices[0].alias, width / 3.8, 140 + (countY == 1 ? 0 : counterCodeShort) + aux, null, null, 'left');
        pdf.setFontSize(30);
        pdf.setFont("Montserrat-Semi");
        // pdf.text(`$${parseFloat(products[i].prices[0].price).toFixed(2)}`, width / 1.8, 140 + (countY == 1 ? 0 : counterCodeShort) + aux, null, null, 'left');
        aux += aux + 30;
      } else {
        switch (products[i].prices.length) {
          case 1:
            pdf.setFont("Montserrat");
            pdf.setFontSize(30);
            pdf.text(
              products[i].prices[0].alias,
              width * 1.26,
              140 + (countX == 1 ? 0 : counterCodeShortX) + aux,
              null,
              null,
              "left"
            );
            pdf.setFontSize(30);
            pdf.setFont("Montserrat-Semi");
            pdf.text(
              `$${parseFloat(products[i].prices[0].price)}`,
              width * 1.55,
              140 + (countX == 1 ? 0 : counterCodeShortX) + aux,
              null,
              null,
              "left"
            );
            aux += aux + 30;
            break;
          case 2:
            for (let y = 0; y < products[i].prices.length; y++) {
              pdf.setFont("Montserrat");
              pdf.setFontSize(20);
              pdf.text(
                products[i].prices[y].alias,
                width * 1.33,
                120 + (countX == 1 ? 0 : counterCodeShortX) + aux,
                null,
                null,
                "left"
              );
              pdf.setFontSize(25);
              pdf.setFont("Montserrat-Semi");
              pdf.text(
                `$${parseFloat(products[i].prices[y].price)}`,
                width * 1.55,
                120 + (countX == 1 ? 0 : counterCodeShortX) + aux,
                null,
                null,
                "left"
              );
              aux += aux + 30;
            }
            break;
          case 3:
            for (let y = 0; y < products[i].prices.length; y++) {
              pdf.setFont("Montserrat");
              pdf.setFontSize(18);
              pdf.text(
                products[i].prices[y].alias,
                width * 1.33,
                118 + (countX == 1 ? 0 : counterCodeShortX) + aux,
                null,
                null,
                "left"
              );
              pdf.setFontSize(22);
              pdf.setFont("Montserrat-Semi");
              pdf.text(
                `$${parseFloat(products[i].prices[y].price)}`,
                width * 1.55,
                118 + (countX == 1 ? 0 : counterCodeShortX) + aux,
                null,
                null,
                "left"
              );
              aux += 25;
            }
            break;
          case 4:
            for (let y = 0; y < products[i].prices.length; y++) {
              if (y == 1) {
                aux = 0;
              }
              if (y == 1 || y == 3) {
                pdf.setFont("Montserrat");
                pdf.setFontSize(15);
                pdf.text(
                  products[i].prices[y].alias,
                  width * 1.6,
                  130 + (countX == 1 ? 0 : counterCodeShortX) + aux,
                  null,
                  null,
                  "left"
                );
                pdf.setFontSize(18);
                pdf.setFont("Montserrat-Semi");
                pdf.text(
                  `$${parseFloat(products[i].prices[y].price)}`,
                  width * 1.75,
                  130 + (countX == 1 ? 0 : counterCodeShortX) + aux,
                  null,
                  null,
                  "left"
                );
                aux += aux + 30;
              } else if (y == 0 || y == 2) {
                pdf.setFont("Montserrat");
                pdf.setFontSize(15);
                pdf.text(
                  products[i].prices[y].alias,
                  width * 1.15,
                  130 + (countX == 1 ? 0 : counterCodeShortX) + aux,
                  null,
                  null,
                  "left"
                );
                pdf.setFontSize(18);
                pdf.setFont("Montserrat-Semi");
                pdf.text(
                  `$${parseFloat(products[i].prices[y].price)}`,
                  width * 1.3,
                  130 + (countX == 1 ? 0 : counterCodeShortX) + aux,
                  null,
                  null,
                  "left"
                );
              }
            }
            break;
        }
      }
      pdf.setFont("Montserrat");
      pdf.setFontSize(16);
      pdf.text(
        `${products[i].pieces}pz`,
        (width / 4) * 5,
        195 + (countX == 1 ? 0 : counterCodeShortX),
        null,
        null,
        "center"
      );
      pdf.setFont("Montserrat-Bold");
      pdf.text(
        products[i].large,
        (width / 3.7) * 5,
        195 + (countY == 1 ? 0 : counterCodeShortX),
        null,
        null,
        "left"
      );
      pdf.setFont("Montserrat-Semi");
      pdf.setFontSize(16);
      pdf.text(
        `${products[i].code}`,
        (width / 1.3) * 2.1,
        195 + (countX == 1 ? 0 : counterCodeShortX),
        null,
        null,
        "left"
      );
      this.useIpack
        ? pdf.addImage(
          this.convertTextToBase64Barcode(products[i].name),
          "PNG",
          (width / 1.12) * 1.88,
          40 + (countX == 1 ? 0 : counterCodeShortX),
          100,
          25
        )
        : "";
      if ((i + 1) % productXY == 0) {
        pdf.setFont("Montserrat");
        pdf.setFontSize(12);
        pdf.text(3, 10, `Se generó ${count} plantilla, creador: ${nick}`);
        products.length > productXY ? pdf.addPage() : "";
        count++;
        counterCodeShort = 0;
        counterCodeShortX = 0;
        countX = 1;
        countY = 1;
      } else {
        countX++;
        counterCodeShortX += 182 + (i < 3 ? 4 : 2);
      }
    }
    i % productXY == 0 ? zip++ : 1;
  }
  return zip;
}


export default { largeLabel, xtralargeLabel, mediumLabel, smallLabel, verticalLabel, toyBoys, toyGirls, xlargenina, xlargenino, Hlargenino, Hlargenina, xlargeExhnino, xlargeExhnina, HorizontalLabel, VerticalLabel };
