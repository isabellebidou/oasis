import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { fetchUserVideos } from "../actions";
import { fetchUserData } from "../actions";
import { Link } from "react-router-dom";
//import Payments from "./Payments";


class Buttons extends Component {
  componentDidMount() {
    this.props.fetchUserVideos();
    this.props.fetchUserData();

  }


  renderButton() {
   // const enoughCredits = this.props.auth && this.props.auth.credits >= 80?  true :false;


if (this.props.videos.length < 2) {
      return (
        <div className="">
            <a href="#videos" className="">
          <button className="actionbook ">upload videos</button>
        </a>
          
        </div>
      )}

     else if (this.props.videos.length >= 2){
      return (<div className="">
        
        <Link to="/feedbacks/new" className="">
            <button className="actionbook" >new feedback</button>
          </Link>
      </div>)
    }

  }



  render() {
    return (
      <div>
        

        {this.renderButton()}
      </div>
    );
  }
}

function mapStateToProps({ videos, userdata, auth }) {
  return { videos, userdata, auth };
}

export default connect(mapStateToProps, { fetchUserVideos, fetchUserData })(Buttons);