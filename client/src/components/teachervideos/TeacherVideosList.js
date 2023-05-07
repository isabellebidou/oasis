import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Video from "./VideoComponent";
import UploadTeacherVideo from './UploadTeacherVideo';
import { withRouter } from 'react-router-dom';

import { fetchTeacherVideos } from "../../actions";
import axios from "axios";




function TeacherVideoList({ auth,videos, fetchTeacherVideos}) {

  useEffect(() => {
    fetchTeacherVideos();
  }, []);


  const [visibility, setVisibility] = useState("hidden");
  const [editMode, setEditMode] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);

  
  
  const handleEditButtonToggleText = () => {
    return editMode ? 'Disable edit' : 'Enable edit';
  }
  const toggleEditMode = () => {
    setEditMode(!editMode)
    setVisibility(visibility === 'visible' ? 'hidden' : 'visible');
    fetchTeacherVideos();
  }
  const deletePics = async () => {

    try {
      await axios.delete("/api/user_videos/delete", {
        data: { idsToDelete: selectedVideos }
      })
        .then(function (response) {
          // handle success
          setSelectedVideos([])
          fetchTeacherVideos();

        }).catch(function (error) {
          // handle error
          error(error)
        })
        .finally(function () {
          // always executed
        });
    } catch (error) {
      error(error)
    }

  }
  const handleSelected = (e) => {
    if (selectedVideos.includes(e.target.value)) {
      //remove item
      // find index
      var myIndex = selectedVideos.indexOf(e.target.value);
      var myArray = [...selectedVideos];
      myArray.splice(myIndex, 1);
      setSelectedVideos(myArray);
    } else {
      // add item
      setSelectedVideos([...selectedVideos, e.target.value]);
    }
  }

  return (
    <section>
      <fieldset id="myvideos">
        <legend><h2>Videos</h2></legend>
        
        <div className="grid-container" >
          {videos.length > 0 &&
            videos.map((video) => {
            
              return (
                <div  key={video._id + '_container'} >
                  <div className="item photoThumbnail">

                  <Video
                      id={video._id}
                      src={video.videoUrl}
                      alt={video.step + " video "+video.videoPath}
                      step={video.step}
                      dateSent={video.dateSent}

                    />

                    <input type={'checkbox'} value={video._id} style={{ visibility }} onChange={handleSelected}></input>
                    <p className="item">
                      {video.step} video sent on: {new Date(video.dateSent).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })
          }

        </div>

        <UploadTeacherVideo />
        {videos.length >= 1  && auth.type === 'admin' &&
          <>
            <button id="editeyes" className="editeyes" onClick={toggleEditMode}>{handleEditButtonToggleText()}</button>
            <button id="deleteeyes" className="deleteeyes" onClick={deletePics} style={{ visibility }} >Delete Selected</button>
          </>
        }
      </fieldset>
    </section>
  );
}

function mapStateToProps({auth, videos }) {

  

  return { auth, videos };
}
export default withRouter(connect(mapStateToProps, { fetchTeacherVideos })(TeacherVideoList));
