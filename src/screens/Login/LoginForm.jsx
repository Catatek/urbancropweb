import React, { Component } from "react";
import { Formik } from "formik";

import { connect } from "react-redux";
import { userLogin } from "../../store/actions/auth";

class LoginForm extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={values => {
            this.props
              .userLogin({ email: "farmer@test.com", password: "password" })
              .then(() => {
                console.log("HERE");
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
)(LoginForm);
