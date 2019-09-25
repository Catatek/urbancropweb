import React, { Component } from "react";
import { Formik } from "formik";
import styled from "styled-components";
import { connect } from "react-redux";
import { userSignup } from "../../store/actions/auth";
import { Title, Text, Button } from "../../theme";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

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

const StyledTextInput = styled(TextField)({
  width: "100%",
  borderColor: "red"
});

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
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors
          }) => (
            <Form onSubmit={handleSubmit}>
              <Title margin="1em 0 0 0">Create account</Title>
              <Text>Join the community today</Text>
              <TextField
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                name="firstName"
              />

              <TextField
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                name="lastName"
              />

              <InputMask
                mask="999-999-9999"
                value={values.mobile}
                onChange={handleChange}
              >
                {() => (
                  <TextField
                    label="Phone Number"
                    value={values.mobile}
                    margin="normal"
                    name="mobile"
                  />
                )}
              </InputMask>
              <TextField
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                name="email"
                autoCapitalize="none"
              />

              <TextField
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                name="password"
                type="password"
              />
              <Button signin type="submit">
                Create account
              </Button>
              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                  justifyContent: "center",
                  marginBottom: "16px"
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
