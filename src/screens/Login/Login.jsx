import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../store/actions/auth";
import LoginForm from "./LoginForm";

class Login extends Component {
  render() {
    return (
      <div>
        <LoginForm userLogin={this.props.userLogin} />
      </div>
    );
  }
}

export default connect(
  null,
  { userLogin }
)(Login);
