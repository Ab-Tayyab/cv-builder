import React from "react";
import "./CVPreview2.css";
import DownloadPDF from "../downloadPDF";

const CVPreview2 = ({ data }) => {
  return (
    <div>
      <div className="cv-preview">
        <div className="pr2-about">
          <h1>{data.name}</h1>
          <div>
            <p>Email: {data.email}</p>
            <p>Phone: {data.phone}</p>
            <p>LinkedIn: {data.linkedin}</p>
          </div>
        </div>
        <div className="pr2-summary">
          <h1>Summary</h1>
          <p>{data.summary}</p>
        </div>
        <div className="pr2-experience">
          <h1>Experience</h1>
          {data.experience &&
            data.experience.map((exp, index) => (
              <div className="pr2-exp-container">
                <div >
                  <p>
                    {exp.jobTitle} at {exp.company}
                  </p>
                  <p>{exp.duration}</p>
                </div>
                <p>{exp.jobsummary}</p>
              </div>
            ))}
        </div>
        <div className="pr2-project">
          <h1>Projects</h1>
          {data.experience &&
            data.project.map((pro, index) => (
              <div key={index} className="pr2-pro-container">
                <h2>{pro.projectName}</h2>
                <h3>
                  Tools: <span>{pro.projectTools}</span>
                </h3>
                <p>{pro.projectSummary}</p>
              </div>
            ))}
        </div>
        <div className="pr2-skills">
          <h1>Skills</h1>
          <ul>
            {data.skills &&
              data.skills.map((skill, index) => (
                <li key={index} className="pr2-skill-tag">
                  {skill.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="pr2-education">
          <h1>Education</h1>
          <div>
            <p>
              {data.degree} at {data.institution}
            </p>
            <p>{data.year}</p>
          </div>
        </div>
      </div>
      <DownloadPDF
        selector=".cv-preview"
        filename="CV"
        buttonText="Download CV as PDF"
      />
    </div>
  );
};

export default CVPreview2;
