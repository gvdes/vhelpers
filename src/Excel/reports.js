import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
import { useVDBStore } from 'stores/VDB';
const VDB = useVDBStore()

const catalogo = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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
  await downloadExcel(workbook, data.key);
};

const conStock = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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

  await downloadExcel(workbook, data.key);


}
const conStockUbicados = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      // "locations":e.locations.map(e => e.path).join('/'),
      "UGeneral": e.bodega?.map(e => e.path).join('/'),
      "UExhibicion": e.ventas?.map(e => e.path).join('/'),

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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const conStockSinUbicar = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      // "locations":e.locations.map(e => e.path).join('/'),
      "UGeneral": e.bodega?.map(e => e.path).join('/'),
      "UExhibicion": e.ventas?.map(e => e.path).join('/'),
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const sinStock = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const sinStockUbicados = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      // "locations":e.locations.map(e => e.path).join('/'),
      "UGeneral": e.bodega?.map(e => e.path).join('/'),
      "UExhibicion": e.ventas?.map(e => e.path).join('/'),
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const sinMaximos = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const generalVsExhibicion = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const generalVsCedis = async (data, sid) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "StockSucursal": e.stocks.find(e => e.id == sid).pivot.stock,
      "CEDIS": e.stocks.find(e => e.id == 1).pivot.stock,
      "TEXCOCO": e.stocks.find(e => e.id == 2).pivot.stock,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const conMaximos = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const negativos = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Fin de Temporada": e.stocks[0].pivot.fdt,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const cedisStock = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "CEDIS": e.stocks.find(e => e.id == 1).pivot.stock,
      "TEXCOCO": e.stocks.find(e => e.id == 2).pivot.stock,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      "locations": e.locations.map(e => e.path).join('/')
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}
const conStockSinContar = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);

  let datExport = data.value.map(e => {
    return {
      "Código": e.id,
      "Modelo": e.code,
      "Descripción": e.description,
      "Proveedor": e.providers.name,
      "Fabricante": e.makers ? e.makers.name : '',
      "Status": e.status.name,
      "Sección": e.category.familia.seccion.name,
      "Familia": e.category.familia.name,
      "Categoría": e.category.name,
      "Piezas x caja": e.pieces,
      "Stock": e.stocks[0].pivot.stock,
      "General": e.stocks[0].pivot.gen,
      "Exhibición": e.stocks[0].pivot.exh,
      "Maximo": e.stocks[0].pivot.max,
      "Minimo": e.stocks[0].pivot.min,
      // "locations":e.locations.map(e => e.path).join('/'),
      "UGeneral": e.bodega?.map(e => e.path).join('/'),
      "UExhibicion": e.ventas?.map(e => e.path).join('/'),
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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}

const preorders = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);
  let datExport = [];

  data.value.forEach(order => {
    order.products.forEach(p => {
      datExport.push({
        "Creado por": order.created_by.names,
        "Fecha": dayjs(order.created_at).format('YYYY-MM-DD H:mm:ss'),
        "Preventa": order.id,
        "Nombre": order.name,
        "Modelo": p.code,
        "Descripción": p.description,
        "Sección": p.category?.familia?.seccion?.name ?? "",
        "Familia": p.category?.familia?.name ?? "",
        "Categoría": p.category?.name ?? "",
        "Piezas x caja": p.pieces,
        "Surtido": p.pivot?.supply_by?.name ?? "",
        "Unidades": p.pivot?.amount ?? "",
        "Cantidad": p.pivot?.units ?? "",
        "Precio": p.pivot?.price ?? "",
        "Total": p.pivot?.total ?? "",
        "stockSuc": p.stocks?.find(e => e.id == VDB.session.store.id_va)?.pivot.stock ?? 0,
        "stockCed": p.stocks?.find(e => e.id == 1)?.pivot.stock ?? 0,
        "stockTex": p.stocks?.find(e => e.id == 2)?.pivot.stock ?? 0,
      })
    });
  });

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
    rows: rows
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

  await downloadExcel(workbook, data.key);
}

const importAspel = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.key);
  let datExport = [];
  data.ticketSuc.products.forEach(p => {
    datExport.push({
      "Clave": data.claveDoc,
      "Cliente": data.nclient,
      "Fecha de elaboración":dayjs().format('DD/MM/YYYY') ,
      "Su pedido": '',
      "Clave del artículo": p.ARTLFA,
      "Cantidad": p.CANLFA ,
      "Precio": Number(Number(p.PRELFA) / 1.16).toFixed(6) ,
      "Desc. 1": '',
      "Desc. 2": '',
      "Desc. 3": '',
      "Clave de vendedor": '',
      "Comisión": '',
      "Clave de esquema de impuestos": '',
      "Impuesto 1": '',
      "Impuesto 2": '',
      "Impuesto 3": '',
      "Impuesto 4": '',
      "Impuesto 5": '',
      "Impuesto 6": '',
      "Impuesto 7": '',
      "Impuesto 8": '',
      "Método de pago": data.mtdpag,
      "Forma de Pago SAT": data.payments[0].sat ,
      "Uso CFDI": data.cfdi.alias ,
      "Clave SAT": p.sat.clave ,
      "Unidad SAT": p.sat.unidad ,
      "Observaciones":'' ,
      "Observaciones de partida": '',
      "Fecha de entrega": '' ,
      "Fecha de vencimiento": '',
    })
  });

  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `ImportAspel`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows: rows
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

  await downloadExcel(workbook, data.claveDoc);
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

export default { catalogo, conStock, conStockUbicados, conStockSinUbicar, sinStock, sinStockUbicados, sinMaximos, generalVsExhibicion, generalVsCedis, conMaximos, negativos, cedisStock, conStockSinContar, preorders, importAspel };
