import React from 'react';
import './CVPreview.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CVPreview = ({ data }) => {
  const downloadPDF = () => {
    // Select the CV container
    const cvElement = document.querySelector('.cv-preview');
    
    html2canvas(cvElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      // Calculate the dimensions of the PDF based on the image dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate the position and scaling
      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const ratio = Math.min(widthRatio, heightRatio);
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      pdf.addImage(imgData, 'PNG', 0, 0, imgScaledWidth, imgScaledHeight);
      pdf.save('CV.pdf');
    });
  };

  return (
    <div className="cv-preview">
      {/* Profile Image */}
      {data.profileImage && (
        <img src={data.profileImage} alt="Profile" className="profile-image" />
      )}
      <h1>{data.name}</h1>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>

      <h2>Education</h2>
      <p>{data.degree} from {data.institution} ({data.year})</p>

      <h2>Experience</h2>
      {data.experience && data.experience.map((exp, index) => (
        <p key={index}>{exp.jobTitle} at {exp.company} ({exp.duration})</p>
      ))}

      <h2>Skills</h2>
      {data.skills && data.skills.map((skill, index) => (
        <span key={index} className="skill-tag">{skill.name}</span>
      ))}

      {/* Download Button */}
      <button onClick={downloadPDF} className="download-btn">
        Download PDF
      </button>
    </div>
  );
};

export default CVPreview;
