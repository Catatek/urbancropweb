import React, { Component } from "react";
import { Formik } from "formik";
import styled from "styled-components";
import { connect } from "react-redux";
import { userLogin } from "../../store/actions/auth";
import { Title, Text, Button } from "../../theme";
import TextField from "@material-ui/core/TextField";

const Wrapper = styled.div`
  width: 440px;
  height: 480px;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0 rgba(152, 152, 152, 0.2);
  background-color: #ffffff;
`;

const Form = styled.form`
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const StyledTextInput = styled(TextField)({
  width: "100%",
  borderColor: "red"
});

class LoginForm extends Component {
  render() {
    return (
      <Wrapper>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={values => {
            this.props
              .userLogin({ email: values.email, password: values.password })
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
                Sign in
              </Button>
              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                  justifyContent: "center"
                }}
              >
                <Text>Don't have an account? Sign up</Text>
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
  { userLogin }
)(LoginForm);
