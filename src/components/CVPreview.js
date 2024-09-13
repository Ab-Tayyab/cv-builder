import React from "react";
import "./CVPreview.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CVPreview = ({ data }) => {
  const downloadPDF = () => {
    // Select the CV container
    const cvElement = document.querySelector(".cv-preview");

    html2canvas(cvElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
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

      pdf.addImage(imgData, "PNG", 0, 0, imgScaledWidth, imgScaledHeight);
      pdf.save("CV.pdf");
    });
  };

  return (
    <div className="cv-preview">
      <div className="cv-about">
        <div>
          <h1>{data.name}</h1>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
        </div>
        <div>
          {data.profileImage && (
            <img
              src={data.profileImage}
              alt="Profile"
              className="profile-image"
            />
          )}
        </div>
      </div>
      <div className="cv-summary">
        <p>Summary</p>
      </div>
      <div className="cv-experience">
        <h2>Experience</h2>
        {data.experience &&
          data.experience.map((exp, index) => (
            <div className="exp-container">
              <div className="exp-child1">
                <h1>{exp.duration}</h1>
              </div>
              <div className="exp-child2">
                <h2>{exp.jobTitle}</h2>
                <h4>{exp.company}</h4>
                <p>Summary</p>
              </div>
              {/* <p key={index}>
                {exp.jobTitle} at {exp.company} ({exp.duration})
              </p> */}
            </div>
          ))}
      </div>
      <div className="cv-skills">
        <h2>Skills</h2>
        {data.skills &&
          data.skills.map((skill, index) => (
            <li key={index} className="skill-tag">
              {skill.name}
            </li>
          ))}
      </div>
      <div className="cv-education">
        <h2>Education</h2>
        <div className="edu-container">
          <div className="edu-child1">
            <h1>{data.year}</h1>
          </div>
          <div className="edu-child2">
            <h2>{data.degree}</h2>
            <h3>{data.institution}</h3>
          </div>
        </div>
        {/* <p>
          {data.degree} from {data.institution} ({data.year})
        </p> */}
      </div>

      <button onClick={downloadPDF} className="download-btn">
        Download PDF
      </button>
    </div>
  );
};

export default CVPreview;
