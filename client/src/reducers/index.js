import { combineReducers } from "redux";
//import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import feedbacksReducer from "./feedbacksReducer";
import userDataReducer from "./userDataReducer";
import usersReducer from "./usersReducer";
import selectUserReducer from "./selectUserReducer";
import videosReducer from "./videosReducer";
import cookieReducer from "./cookieReducer";
export default combineReducers({
    auth : authReducer,
   // form : reduxForm,
    feedbacks: feedbacksReducer,
    videos: videosReducer,
    userdata: userDataReducer,
    users: usersReducer,
    selectedUser:  selectUserReducer,
    cookie: cookieReducer

});