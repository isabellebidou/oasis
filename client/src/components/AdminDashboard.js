import React from "react";

import UserList from './users/UserList';
import PendingFeedbackList from './feebacks/PendingFeedbackList';


//import Landing from './Landing';




const Dashboard = () => {
    return(
        <div className="dashboard">
            <UserList />
            <PendingFeedbackList />

            

        </div>
    )

}

export default Dashboard;