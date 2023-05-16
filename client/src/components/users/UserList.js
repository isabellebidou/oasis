import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";
import { withRouter } from "react-router-dom";
import store from "../store";
import { selectUser } from "../../actions";




class UserList extends Component {

  componentDidMount() {
    this.props.fetchUsers();

  }

  handleClick = (userId) => {
    store.dispatch(selectUser(userId));
    this.props.history.push({
      pathname: '/users/dashboard'
    });
  };
  //{JSON.stringify(user)}
  renderUsers() {
    return this.props.users.map(user => {
      return (


        <div key={user._id} className=" " onClick={() => this.handleClick(user._id)}>

          <p className="itemp photoThumbnail">

            type: {user.type} <br />email: {user.email}<br />
            membership end: {new Date(user.hasMembership).toLocaleDateString()}<br />

            user id: {user._id}
            <h2>Feedbacks booked</h2>
            <ul>
              {user.feedbacks.map((feedback) => (
                <li key={feedback._id}>
                  <span>Expectations: {feedback.expectations}</span> <br />
                  <span>date booked: {new Date(feedback.dateSent).toLocaleDateString()}</span> <br />
                  {!feedback.dateCompleted &&
                    <span className="flag">New Feedback booked! </span>
                  }
                  {feedback.dateCompleted &&
                    <span>date Completed: {new Date(feedback.dateCompleted).toLocaleDateString()}</span>
                  }

                  {/* Render other properties as needed */}
                </li>
              ))}
            </ul>
          </p>
        </div>


      );


    });

  }


  render() {
    return (
      <div className="page">
        <fieldset>
          <legend><h2> Users Dashboard </h2></legend>

          <div className="grid-container">{this.renderUsers()}</div>
        </fieldset>

      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}


export default withRouter(connect(mapStateToProps, { fetchUsers })(UserList));