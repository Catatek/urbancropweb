import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import { Button, Text } from "../../theme";
import { VERIFY_EMAIL } from "../../store/types/auth";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
`;

export default function EmailForm({
  firstName,
  lastName,
  email,
  mobile,
  updateProfile,
  toggleModal,
  verifyEmail
}) {
  return (
    <div>
      <Formik
        initialValues={{ email }}
        onSubmit={(values, { setErrors }) => {
          let data = {
            firstName,
            lastName,
            mobile,
            email: values.email
          };
          verifyEmail(values.email)
            .then(action => {
              if (action.type === VERIFY_EMAIL.SUCCESS) {
                updateProfile(data).then(action => {
                  toggleModal();
                });
              } else {
                setErrors({
                  email: "Account with this email already exists."
                });
              }
            })
            .catch(() => {
              setErrors({
                email: "Account with this email already exists."
              });
            });
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
            <TextField
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              name="email"
              error={touched.email && errors.email}
            />
            {errors && touched.email && <Text error>{errors.email}</Text>}
            <Button type="submit" active margin="1em 0 0 0" checkout>
              Save
            </Button>
          </Form>
        )}
      />
    </div>
  );
}
