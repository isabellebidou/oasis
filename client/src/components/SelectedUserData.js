import React, { useEffect, useState } from 'react';
import store from "./store";
import fieldsArray from "./userData/formFields";

function SelectedUserData() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {


    if (store.getState().selectedUser) {
      const userId = store.getState().selectedUser;
      const userData = await fetch(`/api/selected_user/${userId}`);
      const items = await userData.json();
      console.log(items)
      setItems(items);
    }
  };

  return (
    <section>
      <p>{JSON.stringify(items)}</p>

    </section>
  );
}

export default SelectedUserData