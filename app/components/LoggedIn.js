import React, { Component } from "react";
import { connect } from "react-redux";

class LoggedIn extends Component {
  render() {
    return (
      <div>
        <h2>Logged in as {this.props.user.username}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(LoggedIn);
