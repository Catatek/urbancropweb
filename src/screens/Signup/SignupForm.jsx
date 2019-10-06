import React, { Component } from "react";
import { Formik } from "formik";
import styled from "styled-components";
import { connect } from "react-redux";
import { userSignup } from "../../store/actions/auth";
import { Title, Text, Button } from "../../theme";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import * as yup from "yup";

const Wrapper = styled.div`
  width: 440px;
  height: auto;
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

class SignupForm extends Component {
  render() {
    const { userSignup, history } = this.props;
    return (
      <Wrapper>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
            role: "consumer"
          }}
          onSubmit={values => {
            userSignup(values).then(action => {
              localStorage.setItem("authorization", action.authToken);
              localStorage.setItem("role", "consumer");
              history.push("/markets");
            });
          }}
          validationSchema={yup.object().shape({
            firstName: yup.string().required("First Name is required"),
            lastName: yup.string().required("Last Name is required"),
            email: yup
              .string()
              .email()
              .required("Email is required"),
            mobile: yup.string().required("Mobile is required"),
            password: yup
              .string()
              .min(6, "Password must be at least 6 digits")
              .required("Password is required")
          })}
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched
          }) => (
            <Form onSubmit={handleSubmit}>
              <Title margin="1em 0 0 0">Create account</Title>
              <Text>Join the community today</Text>
              <TextField
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                name="firstName"
                error={touched.firstName && errors.firstName}
              />

              <TextField
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                name="lastName"
                error={touched.lastName && errors.lastName}
              />

              <InputMask
                mask="999-999-9999"
                value={values.mobile}
                onChange={handleChange}
                error={touched.mobile && errors.mobile}
              >
                {() => (
                  <TextField
                    label="Phone Number"
                    value={values.mobile}
                    margin="dense"
                    name="mobile"
                    error={touched.mobile && errors.mobile}
                  />
                )}
              </InputMask>
              <TextField
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                name="email"
                autoCapitalize="none"
                error={touched.email && errors.email}
              />

              <TextField
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                name="password"
                type="password"
                error={touched.password && errors.password}
              />
              <Button signin type="submit">
                Create account
              </Button>
              <div
                style={{
                  display: "flex",
                  marginTop: "6px",
                  justifyContent: "center",
                  marginBottom: "8px"
                }}
              >
                <Link to="/login">
                  <Text orange>Already have an account? Login</Text>
                </Link>
              </div>
            </Form>
          )}
        />
      </Wrapper>
    );
  }
}
export default connect(
  null,
  { userSignup }
)(SignupForm);
