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

export default function FarmMobileForm({
  farmName,
  addrLine1,
  addrLine2,
  city,
  state,
  country,
  zipCode,
  email,
  mobile,
  updateFarm,
  toggleModal,
  farmId
}) {
  return (
    <div>
      <Formik
        initialValues={{ mobile }}
        onSubmit={values => {
          let data = {
            farmName,
            addrLine1,
            addrLine2,
            city,
            state,
            country,
            zipCode,
            mobile: values.mobile,
            email
          };
          updateFarm(farmId, data).then(() => {
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
