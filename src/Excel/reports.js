import ExcelJS from 'exceljs';
import dayjs from 'dayjs';


const catalogo = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  await downloadExcel(workbook,data.key);
};

const conStock = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);


}
const conStockUbicados = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const conStockSinUbicar = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const sinStock = async (data) =>  {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const sinStockUbicados = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const sinMaximos = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const generalVsExhibicion = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const generalVsCedis = async (data,sid) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "SOTANO":e.stocks.find(e => e.id == sid).pivot.stock,
      "CEDIS":e.stocks.find(e => e.id == 1).pivot.stock,
      "TEXCOCO":e.stocks.find(e => e.id == 2).pivot.stock,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const conMaximos = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const negativos = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "Stock":e.stocks[0].pivot.stock,
      "General":e.stocks[0].pivot.gen,
      "Exhibición":e.stocks[0].pivot.exh,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}
const cedisStock = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código":e.id,
      "Modelo":e.code,
      "Descripción":e.description,
      "Proveedor":e.provider.name,
      "Fabricante":e.maker ? e.maker.name : '',
      "Status": e.status.name,
      "Sección":e.category.familia.seccion.name,
      "Familia":e.category.familia.name,
      "Categoría":e.category.name,
      "Piezas x caja":e.pieces,
      "CEDIS":e.stocks.find(e => e.id == 1).pivot.stock,
      "TEXCOCO":e.stocks.find(e => e.id == 2).pivot.stock,
      "Maximo":e.stocks[0].pivot.max,
      "Minimo":e.stocks[0].pivot.min,
      "locations":e.locations.map(e => e.path).join('/')
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `${data.key}`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows:rows
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });

  await downloadExcel(workbook,data.key);
}

const downloadExcel = async (workbook, name) => {
  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error('Error al escribir el buffer:', err);
  }
};

export default { catalogo, conStock, conStockUbicados, conStockSinUbicar, sinStock, sinStockUbicados, sinMaximos, generalVsExhibicion, generalVsCedis , conMaximos , negativos, cedisStock };
