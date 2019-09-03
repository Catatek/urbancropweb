import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../store/actions/auth";
import LoginForm from "./LoginForm";
import { Formik } from "formik";
import { USER_LOGIN } from "../../store/types/auth";

class Login extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={values => {
            this.props
              .userLogin({ email: values.email, password: values.password })
              .then(action => {
                if (action.type === USER_LOGIN.SUCCESS) {
                  localStorage.setItem("authorization", action.authToken);
                }
              });
          }}
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
              />
              <input
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
              />
              <button type="submit">Hi</button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { userLogin }
)(Login);
