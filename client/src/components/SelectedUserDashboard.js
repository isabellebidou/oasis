import React from "react";
import SelectedUserFeedbackList from './feebacks/SelectedFeedbackList';
import SelectedUserUserData from './SelectedUserData';
import SelectedVideoList from './studentvideos/SelectedStudentVideoList';


class SelectedUserDashboard extends React.Component{



   render() {
    return(
        <div className="page">
            <SelectedUserFeedbackList />
            <SelectedUserUserData />
            <SelectedVideoList />
        </div>
    )

   }

}

export default SelectedUserDashboard;


