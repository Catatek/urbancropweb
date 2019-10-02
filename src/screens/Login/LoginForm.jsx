import React, { Component } from "react";
import { Formik } from "formik";
import styled from "styled-components";
import { connect } from "react-redux";
import { userLogin } from "../../store/actions/auth";
import { Title, Text, Button } from "../../theme";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { USER_LOGIN } from "../../store/types/auth";
import * as yup from "yup";

const Wrapper = styled.div`
  width: 440px;
  height: auto;
  padding-bottom: 3.5em;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(152, 152, 152, 0.2);
  background-color: #ffffff;
  @media (max-width: 780px) {
    width: 85%;
    height: auto;
    padding-bottom: 1em;
  }
`;

const Form = styled.form`
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 780px) {
    width: 85%;
  }
`;

class LoginForm extends Component {
  render() {
    const { userLogin, history, addToBasketState } = this.props;
    return (
      <Wrapper>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email()
              .required("Email is required"),
            password: yup.string().required("Password is required")
          })}
          onSubmit={(values, { setErrors }) => {
            userLogin({ email: values.email, password: values.password })
              .then(action => {
                localStorage.setItem("authorization", action.authToken);
                localStorage.setItem("role", action.role);
                if (addToBasketState.state) {
                  // history.push({
                  //   pathname: `/market/${addToBasketState.state.marketId}`,
                  //   state: {
                  //     addToBasketState: addToBasketState.state,
                  //     marketName: addToBasketState.state.marketName
                  //   }
                  // });
                  history.push("/");
                } else {
                  history.push("/");
                }
              })
              .catch(err =>
                setErrors({ loginErr: "Username or password is incorrect." })
              );
          }}
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched
          }) => (
            <Form onSubmit={handleSubmit}>
              <Title margin="1em 0 0 0">Welcome back!</Title>
              <Text>Sign in to continue</Text>
              <TextField
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                name="email"
                type="email"
                autoCapitalize="none"
                error={touched.email && errors.email}
              />
              <TextField
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                name="password"
                type="password"
                error={touched.password && errors.password}
              />
              {errors && <Text error>{errors.loginErr}</Text>}
              <Button signin type="submit">
                Sign in
              </Button>
              {/* <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                  justifyContent: "center"
                }}
              >
                <Link to="/signup">
                  <Text orange>Don't have an account? Sign up</Text>
                </Link>
              </div> */}
            </Form>
          )}
        />
      </Wrapper>
    );
  }
}
export default connect(
  null,
  { userLogin }
)(LoginForm);
