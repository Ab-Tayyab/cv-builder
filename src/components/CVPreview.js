import React from "react";
import "./CVPreview.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CVPreview = ({ data }) => {

  if (!data) {
    return <p>No data available. Please fill out the form.</p>;
  }
  const downloadPDF = () => {
    const cvElement = document.querySelector(".cv-preview");
    const downloadButton = document.querySelector(".download-btn");

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
          <p>{data.summary}</p>
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
                  <h1>{exp.jobTitle}</h1>
                  <h4>{exp.company}</h4>
                  <p>{exp.jobsummary}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="cv-project">
          <h2>Projects</h2>
          {data.experience &&
            data.project.map((pro, index) => (
              <div className="pro-container">
                <div className="pro-child1">
                  <h1>{pro.projectName}</h1>
                </div>
                <div className="pro-child2">
                  <h4>{pro.projectTools}</h4>
                  <p>{pro.projectSummary}</p>
                </div>
              </div>
            ))}
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
        </div>
        <div className="cv-education">
          <h2>Education</h2>
          <div className="edu-container">
            <div className="edu-child1">
              <h1>{data.year}</h1>
            </div>
            <div className="edu-child2">
              <h1>{data.degree}</h1>
              <h4>{data.institution}</h4>
            </div>
          </div>
        </div>
      </div>
      <button onClick={downloadPDF} className="download-btn">
        Download PDF
      </button>
    </div>
  );
};

export default CVPreview;

// import React from "react";
// import "./CVPreview.css";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const CVPreview = () => {
//   const downloadPDF = () => {
//     const cvElement = document.querySelector(".cv-preview");
//     const downloadButton = document.querySelector(".download-btn");

  
//     downloadButton.style.display = "none";

//     html2canvas(cvElement).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;

//       const widthRatio = pdfWidth / imgWidth;
//       const heightRatio = pdfHeight / imgHeight;
//       const ratio = Math.min(widthRatio, heightRatio);
//       const imgScaledWidth = imgWidth * ratio;
//       const imgScaledHeight = imgHeight * ratio;

//       pdf.addImage(imgData, "PNG", 0, 0, imgScaledWidth, imgScaledHeight);
//       pdf.save("CV.pdf");

      
//       downloadButton.style.display = "block";
//     });
//   };

//   return (
//     <div>
//       <div className="cv-preview">
//         <div className="cv-about">
//           <div>
//             <h1>Abdullah</h1>
//             <p>Email: AbdullahTayyab894@gmail.com</p>
//             <p>Phone: 03085630574</p>
//             <p>LinkedIn: https://linkedin/abdulah--tayyab</p>
//           </div>
//           <div>
//             <img alt="image" />
//           </div>
//         </div>
//         <div className="cv-summary">
//           <p>
//             Frontend React JS Developer skilled in creating user-friendly web
//             application with responsive designs. Proficient in frontend
//             development, UX/UI design, and also familiar with backend
//             technologies like Node JS, Express JS and MongoDB. Continuously
//             learning and expanding skill set. Confident in contributing to teams
//             and delivering high-quality web applications
//           </p>
//         </div>
//         <div className="cv-experience">
//           <h2>Experience</h2>
//           <div className="exp-container">
//             <div className="exp-child1">
//               <h1>2018</h1>
//             </div>
//             <div className="exp-child2">
//               <h1>Mern Stack</h1>
//               <h4>Zapta</h4>
//               <p>
//                 Create an Ecommerce Site using React-JS, Redux & Bootstrap and
//                 also create backend using Node JS with Express-JS and MongoDB
//               </p>
//             </div>
//           </div>
//           <div className="exp-container">
//             <div className="exp-child1">
//               <h1>2018</h1>
//             </div>
//             <div className="exp-child2">
//               <h1>Mern Stack</h1>
//               <h4>Zapta</h4>
//               <p>
//                 My experience at Gamica Cloud has allowed me to develop my
//                 skills as a React-JS developer and to work on a variety of
//                 exciting projects which is mentioned in project section.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="cv-project">
//           <h2>Projects</h2>
//           <div className="pro-container">
//             <div className="pro-child1">
//               <h1>To Do App</h1>
//             </div>
//             <div className="pro-child2">
//               <h4>Tools : HTML, CSS, Javascript, React</h4>
//               <p>
//                 Developed an e-commerce website using React JS with a backend
//                 built with Node.js, Express.js, and MongoDB
//               </p>
//             </div>
//           </div>
//           <div className="pro-container">
//             <div className="pro-child1">
//               <h1>Portfolio App</h1>
//             </div>
//             <div className="pro-child2">
//               <h4>Tools : HTML, CSS, Javascript, React</h4>
//               <p>
//                 Built an expense tracker & to do list application using React JS
//                 that allows users to track their expenses and manage their time.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="cv-skills">
//           <h2>Skills</h2>
//           <ul>
//             <li className="skill-tag">JS</li>
//             <li className="skill-tag">CSS</li>
//             <li className="skill-tag">HTML</li>
//             <li className="skill-tag">React</li>
//             <li className="skill-tag">MUI</li>
//             <li className="skill-tag">Bootstrap</li>
//             <li className="skill-tag">Npm libraries</li>
//           </ul>
//         </div>
//         <div className="cv-education">
//           <h2>Education</h2>
//           <div className="edu-container">
//             <div className="edu-child1">
//               <h1>2018-2022</h1>
//             </div>
//             <div className="edu-child2">
//               <h1>BS-IT</h1>
//               <h4>GCUF</h4>
//             </div>
//           </div>
//         </div>
//       </div>
//       <button onClick={downloadPDF} className="download-btn">
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default CVPreview;
