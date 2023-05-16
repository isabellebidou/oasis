import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { fetchUserVideos } from "../actions";
import { Link } from "react-router-dom";
//import Payments from "./Payments";


class Buttons extends Component {
  componentDidMount() {
    this.props.fetchUserVideos();

  }


  renderButton() {



 if (this.props.videos.length >= 1){
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

export default connect(mapStateToProps, { fetchUserVideos })(Buttons);