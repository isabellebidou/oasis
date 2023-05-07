

import React, { useEffect, useState } from 'react';
import store from "../store";
import { selectUser } from "../../actions";


function PendingFeedbackList() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {


    const userData = await fetch(`/api/feedbacks/pending`);
    const items = await userData.json();
    setItems(items);

  };
  const handleClick = (userId) => {
    store.dispatch(selectUser(userId));
    this.props.history.push({
      pathname: '/users/dashboard'
    });
  };

  return (
    <section>
      <div className="grid-container">
        {
          items.map(feedback => {
            return (

              <div key={feedback._id} className=" " onClick={() => handleClick(feedback.user._id)}>

                <p className="itemp photoThumbnail">
                  {feedback.comment},
                  <br />

                  sent: {new Date(feedback.dateSent).toLocaleDateString()}
                  <br />
                  {feedback.user._id}
                </p>

              </div>

            );

          })
        }
      </div>
    </section>
  );
}

export default PendingFeedbackList