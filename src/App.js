import React, { useState } from "react";
import CVForm from "./components/cvForm/CVForm";
import CVPreview from "./components/cvPreview/CVPreview1";
import './components/cvPreview/CVPreview1.css'
import CVPreview2 from "./components/cvPreview/CVPreview2";
import ShowComponent from "./components/showComponent";

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
      {!showPreview ? (
        <CVForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          <ShowComponent data={cvData} />
          <button className="back-btn" onClick={handleBackToForm}>
            Back to Form
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
