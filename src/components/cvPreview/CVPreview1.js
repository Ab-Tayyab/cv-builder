import React from "react";
import "./CVPreview1.css";
import DownloadPDF from "../downloadPDF";

const CVPreview1 = ({ data }) => {

  return (
    <div>
      <div className="cv-preview">
        <div className="pr1-about">
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
                className="pr1-profile-image"
              />
            )}
          </div>
        </div>
        <div className="pr1-summary">
          <p>{data.summary}</p>
        </div>
        <div className="pr1-experience">
          <h2>Experience</h2>
          {data.experience &&
            data.experience.map((exp, index) => (
              <div className="pr1-exp-container" key={index}>
                <div className="pr1-exp-child1">
                  <h1>{exp.duration}</h1>
                </div>
                <div className="pr1-exp-child2">
                  <h1>{exp.jobTitle}</h1>
                  <h4>{exp.company}</h4>
                  <p>{exp.jobsummary}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="pr1-project">
          <h2>Projects</h2>
          {data.experience &&
            data.project.map((pro, index) => (
              <div className="pr1-pro-container" key={index}>
                <div className="pr1-pro-child1">
                  <h1>{pro.projectName}</h1>
                </div>
                <div className="pr1-pro-child2">
                  <h4>{pro.projectTools}</h4>
                  <p>{pro.projectSummary}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="pr1-skills">
          <h2>Skills</h2>
          <ul>
            {data.skills &&
              data.skills.map((skill, index) => (
                <li key={index} className="pr1-skill-tag">
                  {skill.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="pr1-education">
          <h2>Education</h2>
          <div className="pr1-edu-container">
            <div className="pr1-edu-child1">
              <h1>{data.year}</h1>
            </div>
            <div className="pr1-edu-child2">
              <h1>{data.degree}</h1>
              <h4>{data.institution}</h4>
            </div>
          </div>
        </div>
      </div>
      <DownloadPDF selector=".cv-preview" filename="CV" buttonText="Download CV as PDF" />
    </div>
  );
};

export default CVPreview1;

