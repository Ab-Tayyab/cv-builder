import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./CVForm.css";

const CVForm = ({ onSubmit }) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      experience: [{ jobTitle: "", company: "", duration: "" }],
      skills: [{ name: "" }],
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

  // Local state to store the uploaded image
  const [image, setImage] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Convert image to base64
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (data) => {
    const formData = { ...data, profileImage: image }; // Add the image to the form data
    onSubmit(formData); // Pass the form data, including the image, to the parent component
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="cv-form">
      <label>Profile Picture:</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && (
        <div className="image-preview">
          <img
            src={image}
            alt="Profile Preview"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        </div>
      )}
      <h2>Personal Information</h2>
      <label>Name:</label>
      <input type="text" {...register("name")} />
      <label>Email:</label>
      <input type="email" {...register("email")} />
      <label>Phone:</label>
      <input type="tel" {...register("phone")} />

      <h2>Education</h2>
      <label>Degree:</label>
      <input type="text" {...register("degree")} />
      <label>Institution:</label>
      <input type="text" {...register("institution")} />
      <label>Year:</label>
      <input type="text" {...register("year")} />

      <h2>Experience</h2>
      {experienceFields.map((item, index) => (
        <div key={item.id}>
          <label>Job Title:</label>
          <input type="text" {...register(`experience.${index}.jobTitle`)} />
          <label>Company:</label>
          <input type="text" {...register(`experience.${index}.company`)} />
          <label>Duration:</label>
          <input type="text" {...register(`experience.${index}.duration`)} />
          <button
            type="button"
            onClick={() => removeExperience(index)}
            disabled={experienceFields.length === 1}
          >
            Remove Experience
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          addExperience({ jobTitle: "", company: "", duration: "" })
        }
      >
        Add Experience
      </button>

      <h2>Skills</h2>
      {skillFields.map((item, index) => (
        <div key={item.id}>
          <input type="text" {...register(`skills.${index}.name`)} />
          <button
            type="button"
            onClick={() => removeSkill(index)}
            disabled={skillFields.length === 1}
          >
            Remove Skill
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addSkill({ name: "" })}>
        Add Skill
      </button>
      <br />

      <button type="submit">Generate CV</button>
    </form>
  );
};

export default CVForm;
