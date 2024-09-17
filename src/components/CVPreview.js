import React from "react";
import "./CVPreview.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// const CVPreview = ({ data }) => {
const CVPreview = ({ data }) => {
  const downloadPDF = () => {
    const cvElement = document.querySelector(".cv-preview");
    const downloadButton = document.querySelector(".download-btn");

    // Hide the download button
    downloadButton.style.display = "none";

    html2canvas(cvElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const ratio = Math.min(widthRatio, heightRatio);
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, imgScaledWidth, imgScaledHeight);
      pdf.save("CV.pdf");

      // Show the download button again
      downloadButton.style.display = "block";
    });
  };

  return (
    <div>
      <div className="cv-preview">
        <div className="cv-about">
          <div>
            <h1>{data.name}</h1>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
            <p>LinkedIn: {data.linkedin}</p>
            {/* <h1>Abdullah</h1>
            <p>Email: AbdullahTayyab894@gmail.com</p>
            <p>Phone: 03085630574</p> */}
          </div>
          <div>
            {data.profileImage && (
              <img
                src={data.profileImage}
                alt="Profile"
                className="profile-image"
              />
            )}
            {/* <img alt="image" /> */}
          </div>
        </div>
        <div className="cv-summary">
          <p>{data.summary}</p>
        </div>
        <div className="cv-experience">
          <h2>Experience</h2>
          {data.experience &&
            data.experience.map((exp, index) => (
              <div className="exp-container">
                <div className="exp-child1">
                  <h1>From: {exp.duration1}</h1>
                  <h1>To: {exp.duration2}</h1>
                </div>
                <div className="exp-child2">
                  <h1>{exp.jobTitle}</h1>
                  <h4>{exp.company}</h4>
                  <p>{exp.jobsummary}</p>
                </div>
              </div>
            ))}
          {/* <div className="exp-container">
            <div className="exp-child1">
              <h1>2018</h1>
            </div>
            <div className="exp-child2">
              <h1>Mern Stack</h1>
              <h4>Zapta</h4>
              <p>Summary</p>
            </div>
          </div> */}
        </div>
        <div className="cv-skills">
          <h2>Skills</h2>
          <ul>
            {data.skills &&
              data.skills.map((skill, index) => (
                <li key={index} className="skill-tag">
                  {skill.name}
                </li>
              ))}
          </ul>
          {/* <ul>
            <li className="skill-tag">JS</li>
            <li className="skill-tag">CSS</li>
            <li className="skill-tag">HTML</li>
            <li className="skill-tag">React</li>
            <li className="skill-tag">MUI</li>
            <li className="skill-tag">Bootstrap</li>
            <li className="skill-tag">Npm libraries</li>
          </ul> */}
        </div>
        <div className="cv-education">
          <h2>Education</h2>
          <div className="edu-container">
            <div className="edu-child1">
              <h1>From: {data.year1}</h1>
              <h1>To: {data.year2}</h1>
            </div>
            <div className="edu-child2">
              <h1>{data.degree}</h1>
              <h4>{data.institution}</h4>
            </div>
          </div>
          {/* <div className="edu-container">
            <div className="edu-child1">
              <h1>2018-2022</h1>
            </div>
            <div className="edu-child2">
              <h1>BS-IT</h1>
              <h4>GCUF</h4>
            </div>
          </div>
          <div className="edu-container">
            <div className="edu-child1">
              <h1>2018-2022</h1>
            </div>
            <div className="edu-child2">
              <h1>BS-IT</h1>
              <h4>GCUF</h4>
            </div>
          </div> */}
        </div>
      </div>
      <button onClick={downloadPDF} className="download-btn">
        Download PDF
      </button>
    </div>
  );
};

export default CVPreview;
