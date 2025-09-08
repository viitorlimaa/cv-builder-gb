import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Exporta o conteúdo de um elemento HTML em PDF
 * @param elementId - ID do elemento que será transformado em PDF
 * @param fileName - Nome do arquivo PDF
 */
export const exportToPDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Elemento não encontrado:", elementId);
    return;
  }

  try {
    // Captura o elemento como canvas
    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(fileName);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
  }
};
