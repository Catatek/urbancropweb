import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import { Button } from "../../theme";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
`;

export default function NameForm({
  firstName,
  lastName,
  email,
  mobile,
  updateProfile,
  toggleModal
}) {
  return (
    <div>
      <Formik
        initialValues={{ firstName, lastName }}
        onSubmit={values => {
          let data = {
            firstName: values.firstName,
            lastName: values.lastName,
            mobile,
            email
          };
          updateProfile(data).then(action => {
            toggleModal();
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
            <Button type="submit" active margin="1em 0 0 0" checkout>
              Save
            </Button>
          </Form>
        )}
      />
    </div>
  );
}
