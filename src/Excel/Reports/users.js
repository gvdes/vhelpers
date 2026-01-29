import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
import { vizmedia } from "boot/axios"
import { useVDBStore } from 'stores/VDB';
const VDB = useVDBStore()

const areas = async (data) => {
  console.log(data)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Areas');

  worksheet.columns = [
    { header: 'Área', key: 'area', width: 20 },
    { header: 'Rol', key: 'rol', width: 20 },
    { header: 'Tipo Rol', key: 'type', width: 20 },
    { header: 'Deep', key: 'deep', width: 8 },
    { header: 'Módulo Padre', key: 'parent', width: 25 },
    { header: 'Módulo Hijo', key: 'child', width: 25 }
  ]
  worksheet.getRow(1).font = { bold: true }
  data.forEach(area => {
    area.roles.forEach(role => {
      if (!role.modules || role.modules.length === 0) {
        worksheet.addRow({
          area: area.name,
          rol: role.name,
          type: role.type?.name ?? '',
          deep: role.deep,
          parent: '',
          child: ''
        })
        return
      }

      // Indexar módulos padre
      const parents = {}
      role.modules.forEach(m => {
        if (m.deep === 0) parents[m.id] = m.name
      })

      role.modules.forEach(module => {
        if (module.deep === 0) {
          // Padre solo
          worksheet.addRow({
            area: area.name,
            rol: role.name,
            type: role.type?.name ?? '',
            deep: role.deep,
            parent: module.name,
            child: ''
          })
        } else {
          // Hijo con su padre
          worksheet.addRow({
            area: area.name,
            rol: role.name,
            type: role.type?.name ?? '',
            deep: role.deep,
            parent: parents[module.root] ?? '',
            child: module.name
          })
        }
      })
    })
  })

  worksheet.eachRow((row) => {
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
      cell.alignment = { vertical: 'middle' }
    })
  })

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
  await downloadExcel(workbook, 'Areas');
};

const users = async (data) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Usuarios')
  const datExport = data.value.map(e => {
    const a = e.media?.find(m => m._type === 1)
    return {
      row: {
        Nombre: `${e.name} ${e.surnames}`,
        Nick: e.nick,
        Sucursal: e.store?.name || '',
        Estado: e.state?.name || '',
        Area: e.rol?.area?.name || '',
        Puesto: e.rol?.name || '',
        idChecador: e.rc_id || '',
        Empresa: e.enterprise?.name || '',
        Creado: dayjs(e.created_at).format('YYYY-MM-DD H:m:s') || '',
        Actualizado: dayjs(e.updated_at).format('YYYY-MM-DD H:m:s') || '',
        Foto: a ? 'Avatar' : ''
      },
      avatar: a ? `${vizmedia}/users/${a._user}/${a.id}/${a.path}` : null
    }
  })
  const columns = Object.keys(datExport[0].row).map(key => ({
    name: key,
    filterButton: true
  }))

  const rows = datExport.map(d => Object.values(d.row))
  worksheet.addTable({
    name: 'Usuarios',
    ref: 'A1',
    headerRow: true,
    style: { showRowStripes: true },
    columns,
    rows
  })
  const fotoColIndex = columns.findIndex(c => c.name === 'Foto') + 1
  datExport.forEach((u, index) => {
    if (!u.avatar) return
    const cell = worksheet.getRow(index + 2).getCell(fotoColIndex)
    cell.value = {
      text: 'Avatar',
      hyperlink: u.avatar,
      tooltip: 'Clic Para ver la foto de el usuario'
    }
    cell.font = {
      color: { argb: 'FF0000FF' },
      underline: true
    }
  })
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

  await downloadExcel(workbook, 'Usuarios')
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

export default { areas, users };
