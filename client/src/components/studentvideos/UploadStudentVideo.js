
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {  logError } from "../../utils/utils";

import axios from "axios";
const steps = ["maya","shimmy", "arabic", "corkscrew turn", "propellor turn", "egyptian", "hip bumps", "arbic hip twist 1/2", "turkish shimmy 1/2", "single, double bumps", "bodywave", "arabic shimmy with arms and turns", "sahra turn", "triple egyptian", "egyptian sevillana", "wrap around turn", "triangle step", "chico", "meduza", "reshamka spin", "push forward and back", "double back", "strong arm 1", "strong arm 2","strong arm 3","spins", "arabic double spin"]
//https://www.youtube.com/watch?v=McF22__Jz_I&t=372s&ab_channel=V%E1%BB%89%C4%90%E1%BA%B7ng
//https://codesandbox.io/s/comment-product-yelj6?file=/package.json
function UploadVideo({ auth }) {
    const [video, setVideo] = useState('');
    const [visibility, setVisibility] = useState("hidden");
    const [selectedStep, setStep] = useState("");
   
  useEffect(() => {
  }, [auth]);


   const handleVideo= (e) => {
    setVideo(e.target.files[0]);
    
  }
  const handleStepSelect = (e) => {
    setStep(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("testImage", video);
    formData.append("step", selectedStep);
    try {
      await axios({
        method: "post",
        url: "/api/video_upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        // handle success
        setVideo('');
        setStep("");
        handleClose();

      }).catch(function (error) {
        // handle error
        logError(error);
      })
        .finally(function () {
          // always executed
        });
    } catch (error) {
      logError(error)
    }
  }



  const toggleVisibility = () => {
    setVisibility(visibility === 'visible' ? 'hidden' : 'visible');
    const toggleUploadDiv = document.getElementById('toggleRightUploadDiv');
    if (toggleUploadDiv) {
      toggleUploadDiv.style.visibility = toggleUploadDiv.style.visibility === 'visible' ? 'hidden' : 'visible';
    }
  }
  const handleClose = () => {
    setVisibility('hidden');
    const toggleUploadDiv = document.getElementById('toggleRightUploadDiv');
    if (toggleUploadDiv) {
      toggleUploadDiv.style.visibility = 'visible';
    }
  }




  const renderStarReviewDiv = () => {
    return (
      <div className="StarRating" style={{ visibility }} >
        <div className="popup">
          <div className="content">
            <div className="product">
            </div>
            <div>
              <span style={{ visibility }} className="closePopupWindow" onClick={handleClose}>x</span>
              <h1>Upload video</h1>
              <label htmlFor="step">Step:</label>
            <select id="step" name="step" value={selectedStep} onChange={handleStepSelect}>
              <option value="">Select a step</option>
              {steps.map((step) => (
                <option key={step+'_key'} value={step}>
                  {step}
                </option>
              ))}
            </select>
              <input type="file" name="video" id="video" onChange={handleVideo} />


            </div>
            
            <button id="reviewbutton"   className={` ${!video && "disabled"} ` } onClick={handleSubmit}disabled={!selectedStep}>Submit</button>
          </div>
        </div>

      </div>
    )
  }

  return (
    <>
      {renderStarReviewDiv()}
      <button id="toggleRightUploadDiv" className="actionupload" onClick={toggleVisibility}>upload video</button>
    </>

  );
};

function mapStateToProps({ auth }) {

  return { auth };
}
export default connect(mapStateToProps, {})(UploadVideo);
//taxeem
