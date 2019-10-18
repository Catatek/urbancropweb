import React, { Component } from "react";
import { Title, Text, Button, Label, Row, Column } from "../../theme";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik, FieldArray, Field } from "formik";
import * as yup from "yup";
import styled, { css } from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { AWSConfig, s3 } from "../../awsConfig";
import { showMessage } from "../../redux_util";
import { Map } from "immutable";
import InputMask from "react-input-mask";
import { categoriesFilterData } from "../../fixtures/categorieData";

const Div = styled.div`
  width: 45%;
  margin: 1em auto;
  display: flex;
  align-items: center;
  max-width: 1300px;
  @media (max-width: 920px) {
    width: 90%;
    margin-top: 2em;
  }
`;

const Form = styled.form`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const StyledView = styled.div`
  width: 80px;
  height: 80px;
  margin: 12px 12px 12px 0px;
  align-items: center;
  justify-content: center;
`;

const ImageRow = styled(Row)`
  flex-wrap: wrap;
  width: 90%;
  margin: 16px 0;
  height: auto;
`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
`;

const AddImageInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const AddImageLabel = styled.label`
  width: 80px;
  height: 80px;
  background: transparent;
  border-radius: 4px;
  border: 1px solid #f75d19;
  border-width: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTextInput = styled(TextField)`
  max-width: 275px;
  ${props =>
    props.small &&
    css`
      width: 115px;
    `}
`;

const CategoryButton = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.backgroundcolor || "transparent"};
  border: ${props => props.bordercolor || "transparent"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 6px 0;
  margin-right: 12px;
  cursor: pointer;
`;

const StyledCategoryText = styled(Text)`
  color: ${props => props.textcolor || "#fff"};
  font-weight: 600;
  text-transform: capitalize;
  margin: 0;
`;

const StyledCategoryImage = styled.img`
  width: ${props => props.imagewidth};
  height: ${props => props.imageheight};
  margin-bottom: 6px;
`;

function Checkbox({ name, value }) {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <label className="container-checkbox">
          <input
            {...field}
            type="checkbox"
            checked={field.value.includes(value)}
            onChange={() => {
              const set = new Set(field.value);
              if (set.has(value)) {
                set.delete(value);
              } else {
                set.add(value);
              }
              field.onChange(field.name)(Array.from(set));
              form.setFieldTouched(field.name, true);
            }}
          />
          {value}
          <span className="checkmark" />
        </label>
      )}
    </Field>
  );
}

function Category({
  setFieldValue,
  values,
  activeIcon,
  icon,
  label,
  width,
  height
}) {
  return (
    <CategoryButton
      onClick={async () => {
        if (values === label) {
          setFieldValue("category", "");
        } else {
          setFieldValue("category", label);
        }
        await Promise.resolve();
      }}
      filters
      backgroundcolor={values === label ? "#fff" : "transparent"}
      bordercolor={
        values === label ? " 1px solid #f75d19" : "1px solid #a3a3a3"
      }
    >
      <StyledCategoryImage
        src={values === label ? activeIcon : icon}
        imagewidth={`${width * 1.25}px`}
        imageheight={`${height * 1.25}px`}
      />
      <StyledCategoryText textcolor={values === label ? "#f75d19" : "#A3A3A3"}>
        {label}
      </StyledCategoryText>
    </CategoryButton>
  );
}

class AddItemForm extends Component {
  state = {
    files: Map()
  };
  handleFileFormat = filename => {
    return "." + filename.split(".")[1];
  };

  handleUpload = (values, push) => {
    let reader = new FileReader();
    let filename =
      "test-username" + this.handleFileFormat(values.uploadData.name);
    let filetype = values.uploadData.type;
    let files = this.state.files;
    let currentFile = files.get(filename, {});
    reader.onload = () => {
      currentFile = {
        picture: reader.result,
        filename: filename,
        filetype: filetype,
        loading: true
      };
      files = this.state.files;
      this.setState({
        files: files.set(filename, currentFile),
        filename: filename,
        loading: true
      });
      console.log(this.state.files);
    };
    reader.onprogress = () => {
      files = this.state.files;
      this.setState({
        files: files.set(filename, currentFile)
      });
    };
    reader.onloadend = () => {
      console.log("done");
      const params = {
        Bucket: AWSConfig.bucket,
        Key: "items/" + currentFile.filename,
        Body: currentFile.picture,
        ACL: "public-read",
        ContentType: filetype
      };
      s3.upload(params)
        .on("httpUploadProgress", event => {
          let current =
            parseInt((event.loaded * 50) / event.total, 10) / 100 + 0.5;
          currentFile.progress = current;
          files = this.state.files;
          this.setState({
            files: files.set(filename, currentFile)
          });
        })
        .send((err, data) => {
          currentFile.progress = 1;
          currentFile.message = "Uploaded!";
          if (data.Location) {
            push(data.Location);
            this.setState({ loading: false });
            console.log("Avatar Updated");
          }
        });
    };
    reader.readAsArrayBuffer(values.uploadData);
  };

  render() {
    let form;
    const units = [
      { label: "pounds (lb)", value: "lb" },
      { label: "kilograms (kg)", value: "kg" },
      { label: "grams (g)", value: "g" },
      { label: "ounces (oz)", value: "oz" },
      { label: "pieces", value: "piece" },
      { label: "units", value: "unit" },
      { label: "milliliters (mL)", value: "mL" },
      { label: "liter (L)", value: "liter" }
    ];
    return (
      <Div>
        <Formik
          ref={node => (form = node)}
          initialValues={{
            itemName: "",
            cost: 0,
            quantity: "",
            unit: "",
            category: "",
            attributes: [],
            images: [],
            description: ""
          }}
          //   validationSchema={yup.object().shape({
          //     email: yup
          //       .string()
          //       .email()
          //       .required("Email is required"),
          //     password: yup.string().required("Password is required")
          //   })}
          onSubmit={(values, { setErrors }) => {
            console.log(values);
          }}
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue
          }) => (
            <Form onSubmit={handleSubmit}>
              <StyledTextInput
                label="Product name"
                value={values.itemName}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                name="itemName"
                error={touched.itemName && errors.itemName}
              />
              <Label extrasmall style={{ marginTop: "2em" }}>
                Add Pictures
              </Label>
              <ImageRow>
                <FieldArray
                  name="images"
                  render={arrayHelpers => (
                    <Row style={{ flexWrap: "wrap", height: "auto" }}>
                      {values.images &&
                        values.images.length > 0 &&
                        values.images.map((image, index) => (
                          <StyledView>
                            <StyledImage src={image} />
                          </StyledView>
                        ))}
                      {/* {loading && (
                        <StyledView>
                          <ActivityIndicator size="small" color="#f75d19" />
                        </StyledView>
                      )} */}
                      <AddImageLabel for="uploadData">
                        <AddImageInput
                          type="file"
                          onChange={event => {
                            form.state.values.uploadData =
                              event.target.files[0];
                            this.handleUpload(values, arrayHelpers.push);
                          }}
                          accept="image/*"
                          value=""
                          name="uploadData"
                          id="uploadData"
                        />
                        <IoIosAdd color="#f75d19" size="2em" />
                      </AddImageLabel>
                    </Row>
                  )}
                />
              </ImageRow>
              <Label extrasmall style={{ marginTop: "2em" }}>
                Pricing
              </Label>
              <Row width="100%" justifycontent="space-between">
                <InputMask
                  mask="$9.99"
                  value={values.mobile}
                  onChange={handleChange}
                  error={touched.mobile && errors.mobile}
                >
                  {() => (
                    <StyledTextInput
                      small
                      label="Cost"
                      margin="normal"
                      name="cost"
                      error={touched.cost && errors.cost}
                    />
                  )}
                </InputMask>

                <StyledTextInput
                  small
                  label="Quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  name="quantity"
                  error={touched.quantity && errors.quantity}
                />
                <StyledTextInput
                  id="standard-select-currency"
                  select
                  label="Unit"
                  value={values.unit}
                  onChange={handleChange("unit")}
                  helperText="Please select a unit"
                  margin="normal"
                >
                  {units.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledTextInput>
              </Row>
              <Label extrasmall style={{ marginTop: "2em" }}>
                Category
              </Label>

              <Row style={{ marginTop: 12, width: "100%" }}>
                {categoriesFilterData.slice(0, 4).map((key, index) => {
                  return (
                    <Category
                      type="filters"
                      key={index}
                      label={key.label}
                      activeIcon={key.activeIcon}
                      icon={key.icon}
                      setFieldValue={setFieldValue}
                      values={values.category}
                      width={key.width}
                      height={key.height}
                    />
                  );
                })}
              </Row>
              <Row style={{ width: "100%" }}>
                {categoriesFilterData.slice(4, 8).map((key, index) => {
                  return (
                    <Category
                      type="filters"
                      key={index}
                      label={key.label}
                      activeIcon={key.activeIcon}
                      icon={key.icon}
                      setFieldValue={setFieldValue}
                      values={values.category}
                      width={key.width}
                      height={key.height}
                    />
                  );
                })}
              </Row>

              <Label
                extrasmall
                style={{ marginTop: "2em", marginBottom: "1.5em" }}
              >
                Attributes
              </Label>
              <Column>
                <Checkbox name="attributes" value="Non GMO" />
                <Checkbox name="attributes" value="Organic" />
                <Checkbox name="attributes" value="Local" />
                <Checkbox name="attributes" value="No Pesticides" />
                <Checkbox name="attributes" value="Vegetarian" />
              </Column>
              <Label extrasmall style={{ marginTop: "2em" }}>
                Description
              </Label>
              <TextField
                id="standard-multiline-static"
                label="Multiline"
                multiline
                rows="4"
                label="Product description"
                margin="normal"
                values={values.description}
              />
              {/* <Button checkout type="submit">
                Sign in
              </Button> */}
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
      </Div>
    );
  }
}

export default AddItemForm;
