import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import { Button } from "../../theme";
import InputMask from "react-input-mask";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
`;

export default function MobileForm({
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
        initialValues={{ mobile }}
        onSubmit={values => {
          let data = {
            firstName,
            lastName,
            mobile: values.mobile,
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

            <Button type="submit" active margin="1em 0 0 0" checkout>
              Save
            </Button>
          </Form>
        )}
      />
    </div>
  );
}
