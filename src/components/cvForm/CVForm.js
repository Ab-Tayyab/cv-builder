import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./CVForm.css";

const CVForm = ({ onSubmit, initialData }) => {
  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      summary: "",
      degree: "",
      institution: "",
      year: "",
      experience: [
        {
          jobTitle: "",
          company: "",
          duration: "",
          jobsummary: "",
        },
      ],
      skills: [{ name: "" }],
      project: [
        {
          projectName: "",
          projectTools: "",
          projectSummary: "",
        },
      ],
    },
  });

  const {
    fields: experienceFields,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: skillFields,
    append: addSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  const {
    fields: projectFields,
    append: addProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "project",
  });

  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const formValues = watch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextPage = () => setStep((prev) => prev + 1);
  const prevPage = () => setStep((prev) => prev - 1);

  const isStepValid = () => {
    if (step === 1) {
      return formValues.name && formValues.email && formValues.phone;
    } else if (step === 2) {
      return formValues.degree && formValues.institution && formValues.year;
    } else if (step === 3) {
      return formValues.experience.every(
        (exp) => exp.jobTitle && exp.company && exp.duration && exp.jobsummary
      );
    } else if (step === 4) {
      return formValues.skills.every((skill) => skill.name);
    } else if (step === 5) {
      return formValues.project.every(
        (pro) => pro.projectName && pro.projectTools && pro.projectSummary
      );
    }
    return true;
  };

  const onFormSubmit = (data) => {
    const formData = { ...data, profileImage: image };
    onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)} className="cv-form">
        {step === 1 && (
          <div className="cv-container">
            <h2>Personal Information</h2>
            <label>Profile Picture (Optional):</label>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cv-image"
            />
            {image && (
              <div className="image-preview">
                <img
                  src={image}
                  alt="Profile Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
            <br />
            <label>Name:</label>
            <br />
            <input type="text" {...register("name")} />
            <br />
            <label>Email:</label>
            <br />
            <input type="email" {...register("email")} />
            <br />
            <label>Phone:</label>
            <br />
            <input type="tel" {...register("phone")} />
            <br />
            <label>LinkedIn(Optional):</label>
            <br />
            <input type="link" {...register("linkedin")} />
            <br />
            <label>Summary:</label>
            <br />
            <textarea {...register("summary")} />
          </div>
        )}

        {step === 2 && (
          <div className="cv-container">
            <h2>Education</h2>
            <label>Degree:</label>
            <br />
            <input type="text" {...register("degree")} />
            <br />
            <label>Institution:</label>
            <br />
            <input type="text" {...register("institution")} />
            <br />
            <label>Year: (2020-2022)</label>
            <br />
            <input type="text" {...register("year")} />
          </div>
        )}

        {step === 3 && (
          <div className="cv-container">
            <h2>Experience</h2>
            {experienceFields.map((item, index) => (
              <div key={item.id}>
                <label>Job Title:</label>
                <br />
                <input
                  type="text"
                  {...register(`experience.${index}.jobTitle`)}
                />
                <br />
                <label>Company:</label>
                <br />
                <input
                  type="text"
                  {...register(`experience.${index}.company`)}
                />
                <br />
                <label>Year: (2020-2022)</label>
                <br />
                <input
                  type="text"
                  {...register(`experience.${index}.duration`)}
                />
                <br />
                <label>Summary:</label>
                <br />
                <textarea
                  {...register(`experience.${index}.jobsummary`)}
                />
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  disabled={experienceFields.length === 1}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addExperience({
                  jobTitle: "",
                  company: "",
                  duration: "",
                })
              }
              className="add-btn"
            >
              Add Experience
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="cv-container">
            <h2>Skills</h2>
            {skillFields.map((item, index) => (
              <div key={item.id}>
                <input type="text" {...register(`skills.${index}.name`)} />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  disabled={skillFields.length === 1}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSkill({ name: "" })}
              className="add-btn"
            >
              Add Skill
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="cv-container">
            <h2>Projects</h2>
            {projectFields.map((item, index) => (
              <div key={item.id}>
                <label>Project Name:</label>
                <br />
                <input
                  type="text"
                  {...register(`project.${index}.projectName`)}
                />
                <br />
                <label>Tools:</label>
                <br />
                <input
                  type="text"
                  {...register(`project.${index}.projectTools`)}
                />
                <br />
                <label>Description:</label>
                <br />
                <textarea
                  {...register(`project.${index}.projectSummary`)}
                />
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  disabled={projectFields.length === 1}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addProject({
                  projectName: "",
                  projectTools: "",
                  projectSummary: "",
                })
              }
              className="add-btn"
            >
              Add Project
            </button>
          </div>
        )}

        <div className="button-container">
          {step > 1 && (
            <button type="button" onClick={prevPage} className="prev-btn">
              Previous
            </button>
          )}
          {step < 5 && (
            <button
              type="button"
              onClick={nextPage}
              disabled={!isStepValid()}
              className="next-btn"
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button type="submit" disabled={!isStepValid()} className="gen-btn">
              Generate CV
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CVForm;
