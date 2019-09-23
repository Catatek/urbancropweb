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
        initialValues={{ email }}
        onSubmit={values => {
          let data = {
            firstName,
            lastName,
            mobile,
            email: values.email
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
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              name="email"
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
