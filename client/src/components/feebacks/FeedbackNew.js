import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FeedbackPayment from "../FeedbackPayment";
import { logError } from "../../utils/utils";

const FeedbackNew = () => {

  const [expectations, setExpectations] = useState('');
  const [offers, setOffers] = useState([]);
  const [offerId, setOfferId] = useState('');
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState('');


  useEffect(() => {
    const fetchOffers = async () => {
      const offerData = await fetch(`/api/offers/`);
      const items = await offerData.json();
      setOffers(items);
      setOfferId(items.length > 0 ? items[0]._id : '');
    };
    fetchOffers();
    const fetchVideos = async () => {
      const videoData = await fetch(`/api/user_videos/`);
      const items = await videoData.json();
      setVideos(items);
      setVideoId(items.length > 0 ? items[0]._id : '');
    };
    fetchVideos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    // 1) payment  /api/create-payment-intent

    try {
      axios.post("/api/feedbacks", {  expectations, offerId})
      .then(function (response) {
        // handle success
        setExpectations('')
        setOfferId(offers.length > 0 ? offers[0]._id : '');

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


  return (

    <div className="page">
      <form onSubmit={handleSubmit}>

        <select id="offerSelect" name="offerselect" value={offerId} onChange={(e) => {
          setOfferId(e.target.value);
        }}>
          {offers.map(offer => {
            return (
              <option key={offer._id} value={offer._id}>{offer.name} at {offer.price} $</option>
            );
          })}
        </select>
        <select id="videoSelect" name="videoselect" value={videoId} onChange={(e) => {
          setVideoId(e.target.value);
        }}>
          {videos.map(video => {
            return (
              <option key={video._id} value={video._id}>{video.step+'   id: '+video._id}</option>
            );
          })}
        </select>

        <br />
        <label key={14} htmlFor="expectations">question, comments?</label>
        <input
          name="expectations"
          key={124}
          type="text"
          value={expectations} 
          onChange={(e) => {
            setExpectations(e.target.value)
          }}
        />

        <Link to="/profile" className="leftbutton">
        <button >{" cancel "}</button>
        </Link>
      </form>
      <FeedbackPayment 
      expectations={expectations}
      offerId={offerId}
      videoId={videoId}
      />
    </div>

  );

}

export default FeedbackNew;