import jsPDF from 'jspdf'


const proceedings = async (data) => {

  const doc = new jsPDF();
  // Título
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ACTA ADMINISTRATIVA", 105, 15, { align: "center" });
  doc.setFont("helvetica", "normal");
  // Logo y marca de agua
  doc.addImage('icons/tipelog.png', 'PNG', 3, 3, 40, 20);
  doc.setGState(new doc.GState({ opacity: 0.2 }));
  doc.addImage('icons/tipelog.png', "PNG", 20, 100, 170, 100, "", "FAST");
  doc.setGState(new doc.GState({ opacity: 1 }));

  let y = 30; // Define la posición inicial de y
  doc.setFontSize(10);
  let header = `En la Ciudad de México, siendo las ${data.hora} horas del día ${data.fecha}, ` +
    `se levanta la presente acta administrativa en las instalaciones de la sucursal ${data.user.store.name}, ` +
    `a el (la) C. ${data.user.complete_name} quien ocupa el puesto de ${data.user.rol.name}, ` +
    `derivado de los siguientes hechos a continuación relatados:`;
  doc.text(header, 10, y, { maxWidth: 180 });
  y += doc.splitTextToSize(header, 180).length * 4;
  // Motivo del acta
  y += 5;
  doc.setFontSize(9);
  doc.text(data.notes.reason, 10, y, { maxWidth: 180 });
  y += doc.splitTextToSize(data.notes.reason, 180).length * 4;

  // Defensa del colaborador
  y += 5;
  doc.setFontSize(10);
  doc.text("En este momento se le da la palabra a el (la) colaborador (a) para que manifieste lo que a su derecho convenga:", 10, y);

  y += 5;
  doc.text("__________________________________________________________________________________________", 10, y);
  y += 5;
  doc.text("__________________________________________________________________________________________", 10, y);
  y += 5;
  doc.text("__________________________________________________________________________________________", 10, y);
  y += 5;
  doc.text("__________________________________________________________________________________________", 10, y);

  // Respuesta del compañero
  y += 10;
  doc.setFontSize(10);
  doc.text("Asimismo se le solicita a los participantes en la elaboración de esta acta administrativa si desean agregar algo:", 10, y);

  y += 5;
  doc.text("__________________________________________________________________________________________", 10, y);
  y += 5;
  doc.text("__________________________________________________________________________________________", 10, y);
  y += 5;
  doc.text("__________________________________________________________________________________________", 10, y);
  y += 5;
  doc.text("__________________________________________________________________________________________", 10, y);

  // Conclusión (Ahora se ajusta dinámicamente)
  y += 10;
  doc.setFontSize(10);
  doc.text("Derivado de lo anterior se concluye que:", 10, y);
  y += 10;
  doc.setFontSize(9);
  doc.text(data.notes.conclusion, 10, y, { maxWidth: 180 });
  y += doc.splitTextToSize(data.notes.conclusion, 180).length * 4;

  // Firma
  y += 5;
  doc.setFontSize(10);
  doc.text("Firman de mutuo acuerdo los testigos y el (la) colaborador (a) dando así por terminada la actual acta administrativa,", 10, y);
  y += 5;
  doc.text("ratificando cada una de sus partes y la participación de el (la) colaborador (a) señalado (a).", 10, y);

  // Firmas con líneas encima
  y += 15;
  doc.line(10, y, 50, y);
  doc.line(60, y, 100, y);
  doc.line(110, y, 150, y);

  y += 5;
  doc.text("COLABORADOR (A)", 10, y);
  doc.text("JEFE INMEDIATO", 60, y);
  doc.text("RECURSOS HUMANOS", 110, y);

  y += 15;
  doc.line(10, y, 50, y);
  doc.line(60, y, 100, y);
  doc.line(110, y, 150, y);

  y += 5;
  doc.text("GERENCIA GENERAL", 10, y);
  doc.text("TESTIGO 1", 60, y);
  doc.text("TESTIGO 2", 110, y);

  // Guardar el PDF
  doc.save(`acta_administrativa_${data.user.nick}.pdf`);
}


export default { proceedings }
