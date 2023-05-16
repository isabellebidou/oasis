import React, { useEffect, useState } from 'react';
import store from "../store";
import Video from "./VideoComponent";
import UploadStudentVideo from './UploadStudentVideo';
import axios from "axios";
import { logError } from "../../utils/utils";



function SelectedStudentVideoList() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [videos, setVideos] = useState([]);
  const [visibility, setVisibility] = useState("hidden");
  const [editMode, setEditMode] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const userId = store.getState().selectedUser ? store.getState().selectedUser : null

  const fetchItems = async () => {
    if (store.getState().selectedUser) {
      const userId = store.getState().selectedUser;
      const videos = await fetch(`/api/user_video/${userId}`);
      const items = await videos.json();
      setVideos(items);
    }
  };



  const handleEditButtonToggleText = () => {
    return editMode ? 'Disable edit' : 'Enable edit';
  }
  const toggleEditMode = () => {
    setEditMode(!editMode)
    setVisibility(visibility === 'visible' ? 'hidden' : 'visible');

  }
  const deleteVideos = async () => {

    try {
      await axios.delete("/api/user_video/delete", {
        data: { idsToDelete: selectedVideos }
      })
        .then(function (response) {
          // handle success
          setSelectedVideos([])


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
      <fieldset>
        <legend><h2> User Videos</h2></legend>
        {userId &&
          <UploadStudentVideo
            userId={userId} />}

        <div className="grid-container">
          {videos.length > 0 &&
            videos.map((video) => {
              const date = new Date(video.dateSent).toLocaleDateString();
              // const name = userId+'-'+date+'-'+video.step;

              return (
                <div key={video._id + '_container'} >
                  <div className="item photoThumbnail">

                    <Video
                      id={video._id}
                      src={video.videoUrl}
                      alt={video.step + " video " + video.videoPath}
                      step={video.step}
                      dateSent={video.dateSent}

                    />

                    <input type={'checkbox'} value={video._id} style={{ visibility }} onChange={handleSelected}></input>
                    <p className="item">
                      {video.step} video sent on: {new Date(video.dateSent).toLocaleDateString()}<br />
                      video id:  {video._id}
                    </p>

                  </div>
                </div>
              );
            })
          }
        </div>
        {videos.length >= 1 &&
          <>
            <button id="editeyes" className="editeyes" onClick={toggleEditMode}>{handleEditButtonToggleText()}</button>
            <button id="deleteeyes" className="deleteeyes" onClick={deleteVideos} style={{ visibility }} >Delete Selected</button>
          </>
        }
      </fieldset>
    </section>
  );
}

export default SelectedStudentVideoList