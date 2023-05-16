import React from "react";
import SelectedUserFeedbackList from './feebacks/SelectedFeedbackList';
import SelectedUserUserData from './SelectedUserData';
import SelectedUserVideoList from './studentvideos/SelectedStudentVideoList';


class SelectedUserDashboard extends React.Component{



   render() {
    return(
        <div className="page">
            <SelectedUserFeedbackList />
        
            <SelectedUserVideoList />
        </div>
    )

   }

}

export default SelectedUserDashboard;


