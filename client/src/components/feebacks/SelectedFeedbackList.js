import React, {useEffect, useState} from 'react';
import store from "../store";


function SelectedFeedbackList() {
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        if (store.getState().selectedUser) {
            const userId = store.getState().selectedUser;
            const userData =  await fetch(`/api/readings/${userId}`);
            const items = await userData.json();
        setItems(items);
          }
    };

    return(
        <section>
            <div className="grid-container">
            {
            items.map(reading => {
                return (
    
                    <div className="" key={reading._id}>
                    <div className="item photoThumbnail">
                      
                      <p className="item">
                      {reading.expectations} reading ordered on: {new Date(reading.dateSent).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                    
                );
    
            })
            }
            </div>
        </section>
    );
}

export default SelectedFeedbackList