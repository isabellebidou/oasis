import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Payment from "../Payment";
import { logError } from "../../utils/utils";

const MembershipNew = () => {

  const [expectations, setExpectations] = useState('');
  const [membershipOffers, setOffers] = useState([]);
  const [offerId, setOfferId] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      const membershipData = await fetch(`/api/membership/`);
      const items = await membershipData.json();
      setOffers(items);
      setOfferId(items.length > 0 ? items[0]._id : '');
    };
    fetchOffers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    // 1) payment  /api/create-payment-intent

    try {
      axios.post("/api/membership", {  expectations, offerId})
      .then(function (response) {
        // handle success
        setExpectations('')
        setOfferId(membershipOffers.length > 0 ? membershipOffers[0]._id : '');

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
          {membershipOffers.map(membershipOffer => {
            return (
              <option key={membershipOffer._id} value={membershipOffer._id}>{membershipOffer.name} at {membershipOffer.price} $</option>
            );
          })}
        </select>

        <br />
        <label key={14} htmlFor="expectations">what is your motivation?</label>
        <input
          name="expectations"
          key={124}
          type="text"
          value={expectations} 
          onChange={(e) => {
            setExpectations(e.target.value)
          }}
        />

        <Link to="/" className="leftbutton">
        <button >{" cancel "}</button>
        </Link>
      </form>
      <Payment 
      expectations={expectations}
      offerId={offerId}
      />
    </div>

  );

}

export default MembershipNew;