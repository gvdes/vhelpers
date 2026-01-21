import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
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

export default { areas };
