import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DownloadPDF = ({ selector, filename, buttonText }) => {
  const downloadPDF = () => {
    const element = document.querySelector(selector);
    const downloadButton = document.querySelector(".download-btn");

    if (!element) {
      console.error("Element not found for the provided selector");
      return;
    }

    downloadButton.style.display = "none"; // Hide download button during capture

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create PDF with A4 dimensions (210mm x 297mm)
      const pdf = new jsPDF({
        orientation: "portrait", // Use "landscape" for horizontal PDF
        unit: "mm",
        format: "a4", // A4 paper size
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate the ratio to fit the image within the A4 page
      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const ratio = Math.min(widthRatio, heightRatio);

      // Scale the image dimensions to fit the A4 page
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      // Center the image on the A4 page
      const xOffset = (pdfWidth - imgScaledWidth) / 2;
      const yOffset = (pdfHeight - imgScaledHeight) / 2;

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgScaledWidth, imgScaledHeight);
      pdf.save(`${filename}.pdf`);

      downloadButton.style.display = "block"; // Show button again after download
    });
  };

  return (
    <button onClick={downloadPDF} className="download-btn">
      {buttonText || "Download PDF"}
    </button>
  );
};

export default DownloadPDF;
