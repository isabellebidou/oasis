import queryString from 'query-string';
import { useState, useEffect } from 'react';
import axios from "axios";
import { logError } from "../utils/utils";

const FeedbackCompletion = () => {
  const { offerId, expectations, videoId } = queryString.parse(window.location.search);
  const [feedbackId, setFeedbackId] = useState("");
  useEffect(() => {
    postFeed(offerId, expectations,videoId );
  }, []);
  const postFeed = async (offerId, expectations, videoId) => {
    console.log(videoId)
    try {
      axios.post("/api/feedback", { expectations, offerId, videoId})
        .then(function (response) {
          // handle success
          setFeedbackId(response.data._id)
        }).catch(function (error) {
          // handle error
          logError(error);
        })
        .finally(function () {
          // always executed
        });
    } catch (error) {
      console.log(error)
    }
  };

  // Use the offerId and expectations to update the database or display on the page

  return (
    <div className='page'>
      <h1>Thank you for booking a feedback! 🎉</h1>
      <p className='itemp'>Offer Id: {offerId}</p>
      <p className='itemp'>Expectations: {expectations}</p>
      
    </div>
  );
};

export default FeedbackCompletion;

