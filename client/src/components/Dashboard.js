import React from "react";

import FeedbackList from './feebacks/FeedbackList';

import StudentVideosList from './studentvideos/StudentVideosList';
import TeacherVideosList from './teachervideos/TeacherVideosList';

import Buttons from './Buttons';
import StarReview from './StarReview';
//import Landing from './Landing';





const Dashboard = () => {
    return (
        <div className="page">
            <StarReview />
            <Buttons />
       
            <FeedbackList />
  
            <StudentVideosList />
            




        </div>
    )

}

export default Dashboard;