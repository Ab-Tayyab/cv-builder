import React, { useState } from "react";
import CVForm from "./components/CVForm";
import CVPreview from "./components/CVPreview";
import "./components/CVPreview.css";

const App = () => {
  const [cvData, setCvData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (data) => {
    setCvData(data);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  return (
    <div className="app">
      <h1>CV Maker</h1>
      {/* <CVPreview /> */}
      {!showPreview ? (
        <CVForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          <CVPreview data={cvData} />
          <button className="back-button" onClick={handleBackToForm}>
            Back to Form
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
