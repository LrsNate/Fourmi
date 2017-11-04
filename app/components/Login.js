import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { loginAction } from "../actions/user";

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  _inputRef: null;

  handleLogin = () => {
    this.props.onLogin(this._inputRef.value);
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <input
          ref={ref => {
            this._inputRef = ref;
          }}
          type="text"
        />
        <button onClick={this.handleLogin}>Log In</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin(username) {
      dispatch(loginAction(username));
      dispatch(push("/loggedin"));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
