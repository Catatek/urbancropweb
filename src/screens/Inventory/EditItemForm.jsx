import React, { Component } from "react";
import { Text, Button, Label, Row, Column } from "../../theme";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik, FieldArray, Field } from "formik";
import * as yup from "yup";
import styled, { css } from "styled-components";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { AWSConfig, s3 } from "../../awsConfig";
import { showMessage } from "../../redux_util";
import { Map, List } from "immutable";
import { categoriesFilterData } from "../../fixtures/categorieData";
import NumberFormat from "react-number-format";
import InputAdornment from "@material-ui/core/InputAdornment";
import { getItem } from "../../store/selectors/data";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  fetchItem,
  updateFarmItem,
  removeItemById
} from "../../store/actions/data";
import { UPDATE_FARM_ITEM, DELETE_ITEM_BY_ID } from "../../store/types/data";

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
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const StyledView = styled.div`
  width: 100px;
  height: 100px;
  margin: 12px 12px 12px 0px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

const DeleteIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  position: absolute;
  right: -4px;
  top: -4px;
`;

const ImageRow = styled(Row)`
  flex-wrap: wrap;
  width: 90%;
  margin: 16px 0;
  height: auto;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  object-fit: cover;
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
  width: 100px;
  height: 100px;
  cursor: pointer;
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
  @media (max-width: 920px) {
    max-width: 350px;
  }
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

const StyledPriceRow = styled(Row)`
  width: 100%;
  max-width: 450px;
  justify-content: space-between;
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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      decimalScale={2}
      fixedDecimalScale={true}
      thousandSeparator
      prefix="$"
    />
  );
}

class EditItemForm extends Component {
  state = {
    files: Map()
  };

  async componentDidMount() {
    const { fetchItem, itemId } = this.props;

    fetchItem(itemId).then(() => {
      this.setState({ isFetchingItem: false });
    });
  }

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
        Key: `items/${currentFile.filename}`,
        Body: currentFile.picture,
        ACL: "public-read",
        ContentType: filetype
      };
      return s3
        .upload(params)
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
          console.log(data);

          if (data.Location) {
            push(data.Location);
            this.setState({ loading: false });
            console.log("Avatar Updated");
          }
        });
    };
    reader.readAsArrayBuffer(values.uploadData);
  };

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  handleDeleteItem = () => {
    const { removeItemById, item, history, showMessage } = this.props;
    const farmId = item.getIn(["farm", "farmId"], "");
    const itemName = item.getIn(["item", "itemName"], "");
    const itemId = item.getIn(["item", "itemId"], "");
    removeItemById(itemId, farmId).then(action => {
      if (action.type === DELETE_ITEM_BY_ID.SUCCESS) {
        showMessage("item", {
          type: "MESSAGE",
          message: ["Success", `You successfully deleted ${itemName}!`]
        });
        history.goBack();
      } else {
        console.log("Error");
      }
    });
  };

  deleteImage = (index, remove) => {
    remove(index);
  };

  render() {
    const { item, updateFarmItem, history, showMessage } = this.props;
    let form;
    const editValues = {
      itemName: item.getIn(["item", "itemName"], ""),
      cost: this.formatPrice(item.getIn(["item", "cost"], "").toString()),
      quantity: item.getIn(["item", "quantity"], ""),
      unit: item.getIn(["item", "unit"], ""),
      category: item.getIn(["item", "category"], ""),
      attributes: item.getIn(["item", "attributes"], List()),
      images: item.getIn(["item", "images"], List()).toArray(),
      description: item.getIn(["item", "description"], "")
    };

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
          enableReinitialize
          ref={node => (form = node)}
          initialValues={editValues}
          validationSchema={yup.object().shape({
            itemName: yup.string().required("You must name your product!"),
            cost: yup.string().required("You must price your product!"),
            quantity: yup.number().moreThan(0, "You must specify an amount!"),
            unit: yup.string().required("You must specify a unit!"),
            category: yup.string().required("You must specify a category!"),
            images: yup.array().min(1, "You must add atleast 1 image!")
          })}
          onSubmit={(values, { setErrors }) => {
            const itemId = item.getIn(["item", "itemId"], "");
            const itemName = item.getIn(["item", "itemName"], "");
            let formattedNumber = values.cost.replace(".", "");
            let data = {
              itemName: values.itemName,
              cost: parseInt(formattedNumber),
              quantity: values.quantity,
              unit: values.unit,
              category: values.category,
              attributes: values.attributes,
              images: values.images,
              description: values.description
            };
            if (values.images.length !== 0) {
              updateFarmItem(data, itemId).then(action => {
                if (action.type === UPDATE_FARM_ITEM.SUCCESS) {
                  showMessage("items", {
                    type: "MESSAGE",
                    message: [
                      "Success",
                      `You successfully updated ${itemName}!`
                    ]
                  });
                  history.goBack();
                } else {
                  console.log("Error");
                }
              });
            } else {
              this.setState({ formSubmitted: true });
            }
          }}
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue,
            isValid
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
                    <Row
                      style={{
                        flexWrap: "wrap",
                        height: "auto",
                        alignItems: "center"
                      }}
                    >
                      {values.images &&
                        values.images.map((image, index) => {
                          return (
                            <StyledView
                              key={index}
                              onClick={() =>
                                this.deleteImage(index, arrayHelpers.remove)
                              }
                            >
                              <DeleteIcon>
                                <IoIosClose color="#fff" size="22" />
                              </DeleteIcon>
                              <StyledImage src={image} />
                            </StyledView>
                          );
                        })}
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
              {touched.images && errors.images && (
                <Text error>{errors.images}</Text>
              )}
              <Label extrasmall style={{ marginTop: "2em" }}>
                Pricing
              </Label>
              <StyledPriceRow>
                <StyledTextInput
                  small
                  label="Cost"
                  margin="normal"
                  value={values.cost}
                  onChange={handleChange("cost")}
                  name="cost"
                  error={touched.cost && errors.cost}
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                />

                <StyledTextInput
                  id="standard-select-currency"
                  select
                  small
                  label="Unit"
                  value={values.unit}
                  onChange={handleChange("unit")}
                  margin="normal"
                  error={touched.unit && errors.unit}
                >
                  {units.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </StyledTextInput>

                <StyledTextInput
                  small
                  label="Quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  type="number"
                  name="quantity"
                  error={touched.quantity && errors.quantity}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {`${values.unit}`}
                      </InputAdornment>
                    )
                  }}
                />
              </StyledPriceRow>
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
              {touched.category && errors.category && (
                <Text error>{errors.category}</Text>
              )}
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
                multiline
                rows="6"
                label="Product description"
                margin="normal"
                value={values.description}
                helperText="Add a catchy product description!"
                onChange={handleChange("description")}
              />
              <Row style={{ marginTop: "2em" }}>
                <Button
                  checkout
                  active={isValid}
                  disabled={!isValid}
                  type="submit"
                  style={{ marginRight: "1em" }}
                >
                  Save product
                </Button>
                <Button delete type="button" onClick={this.handleDeleteItem}>
                  Delete product
                </Button>
              </Row>
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

export default connect(
  createStructuredSelector({
    item: state => getItem(state)
  }),
  { fetchItem, updateFarmItem, removeItemById, showMessage }
)(EditItemForm);
