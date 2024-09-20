import React, { useState } from "react";
import CVPreview1 from "./cvPreview/CVPreview1";
import CVPreview2 from "./cvPreview/CVPreview2";
import img1 from "../asset/s1.png";
import img2 from "../asset/s2.png";
import "./showComponent.css";

function ShowComponent({ data }) {
  const [showComponent1, setShowComponent1] = useState(true);

  return (
    <div className="show-component-container">
      <div className="image-toggle-container">
        <img
          src={img1}
          className={`toggle-image ${showComponent1 ? "active" : ""}`}
          onClick={() => setShowComponent1(true)}
          alt="Toggle to CVPreview1"
        />
        <label>Format 1</label>

        <img
          src={img2}
          className={`toggle-image ${!showComponent1 ? "active" : ""}`}
          onClick={() => setShowComponent1(false)}
          alt="Toggle to CVPreview2"
        />
        <label>Format 2</label>
      </div>

      <div className="cv-preview-container">
        {showComponent1 ? <CVPreview1 data={data} /> : <CVPreview2 data={data} />}
      </div>
    </div>
  );
}

export default ShowComponent;
