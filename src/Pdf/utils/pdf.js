import { jsPDF } from "jspdf";
import {
  MontserratMedium,
  MontserratSemiBold,
  MontserratBold
} from "/src/Pdf/utils/pdfFonts";

export function createPdf() {
  const doc = new jsPDF();

  doc.addFileToVFS("Montserrat-Medium.ttf", MontserratMedium);
  doc.addFont("Montserrat-Medium.ttf", "Montserrat", "medium");

  doc.addFileToVFS("Montserrat-SemiBold.ttf", MontserratSemiBold);
  doc.addFont("Montserrat-SemiBold.ttf", "Montserrat", "semibold");

  doc.addFileToVFS("Montserrat-Bold.ttf", MontserratBold);
  doc.addFont("Montserrat-Bold.ttf", "Montserrat", "bold");

  doc.setFont("Montserrat", "medium");

  return doc;
}
