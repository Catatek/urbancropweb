import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchCardsAction } from "../../store/actions/payment";
import {
  updateProfile,
  fetchFarm,
  updateFarm,
  verifyEmail
} from "../../store/actions/auth";
import { Title, Label, Column, Text } from "../../theme";
import { Layout, Modal } from "../../shared-components";
import AddCardForm from "./AddCardForm";
import Name from "../../assets/name.png";
import Email from "../../assets/email.png";
import Phone from "../../assets/phone.png";
import Logout from "../../assets/logout.png";
// import Address from "../../assets/address.png";
import Payouts from "../../assets/payouts.png";
import Notifications from "../../assets/notifications.png";
import Business from "../../assets/businessIcon.png";
import BusinessAddress from "../../assets/businessAddressIcon.png";
import Payments from "../../assets/payments.png";
import Setting from "./Setting";
import { authSelector } from "../../store/selectors/auth";
import NameForm from "./NameForm";
import EmailForm from "./EmailForm";
import MobileForm from "./MobileForm";
import Avatar from "../../shared-components/Avatar";
import FarmMobileForm from "./FarmMobileForm";
import FarmEmailForm from "./FarmEmailForm";

const Div = styled.div`
  width: 55%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  @media (max-width: 920px) {
    width: 90%;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 55%;
  grid-gap: 0 50px;
  margin: 1em auto 0 auto;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: 920px) {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    grid-gap: 25px;
    margin-bottom: 2em;
  }
`;

const StyledColumn = styled(Column)`
  margin-bottom: 2em;
  @media (max-width: 920px) {
    margin: 0 auto;
    width: 90%;
  }
`;

const StyledNameCard = styled.div`
  width: 100%;
  height: 114px;
  border-radius: 4px;
  border: solid 1px #e3e3e3;
  display: flex;
  align-items: center;
  margin: 1em 0 2em 0;
`;

function NameCard({ firstName, lastName, email, avatar }) {
  return (
    <StyledNameCard>
      <Avatar
        margin="0 2em 0 1em"
        large
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
      />
      <Column>
        <Text margin="0" smalltitle>{`${firstName} ${lastName}`}</Text>
        <Text margin="0" style={{ color: "#9b9b9b", fontSize: 16 }}>
          {email}
        </Text>
      </Column>
    </StyledNameCard>
  );
}

class Profile extends Component {
  state = {
    isOpen: false,
    type: "",
    title: ""
  };

  componentDidMount() {
    const { fetchCardsAction } = this.props;
    fetchCardsAction();
    this.handleFetchFarm();
  }

  componentDidUpdate(prevProps) {
    const { farmId } = this.props;
    if (prevProps.farmId !== farmId) {
      this.handleFetchFarm();
    }
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  displayValue = value => {
    if (value.length > 16) {
      return value.slice(0, 16) + "...";
    } else {
      return value;
    }
  };

  handleLogout = () => {
    this.props.history.push("/");
    localStorage.clear();
  };

  toggleModal = (type, title) => {
    this.setState({ isOpen: !this.state.isOpen, type, title });
  };

  handleFetchFarm = async () => {
    let farmId = this.props.farmId;
    if (farmId) {
      this.props.fetchFarm(farmId);
    }
  };

  render() {
    const {
      email,
      firstName,
      lastName,
      avatar,
      mobile,
      updateProfile,
      history,
      farmName,
      farmEmail,
      farmAddress,
      farmMobile,
      farmId,
      addrLine1,
      addrLine2,
      city,
      state,
      country,
      zipCode,
      updateFarm,
      verifyEmail
    } = this.props;

    const { isOpen, type, title } = this.state;
    const values = [
      {
        text: "Name",
        form: "nameform",
        title: "Edit Name",
        type: "name",
        icon: Name,
        value: `${firstName} ${lastName}`
      },
      {
        text: "Email",
        form: "emailform",
        title: "Edit Email",
        type: "email",
        icon: Email,
        value: `${email}`
      },
      {
        text: "Phone",
        form: "mobileform",
        title: "Edit Phone",
        type: "phone",
        icon: Phone,
        value: `${mobile}`
      },
      // {
      //   text: 'Address',
      //   navigation: 'Address',
      //   type: 'address',
      //   icon: Address,
      //   value: '605 Timber Ridge Dr.',
      // },

      {
        text: "Farm Name",
        navigation: "FarmDetails",
        form: "notavailable",
        type: "notavailable",
        title: "Please contact your market to change your farm's name!",
        icon: Business,
        value: `${farmName}`
      },
      {
        text: "Farm Email",
        navigation: "FarmDetails",
        type: "farmemail",
        form: "emailfarmform",
        title: "Edit Farm Email",
        icon: Email,
        value: `${farmEmail}`
      },
      {
        text: "Farm Phone",
        navigation: "FarmDetails",
        type: "phone",
        form: "mobilefarmform",
        title: "Edit Farm Phone",
        icon: Phone,
        value: `${farmMobile}`
      },
      {
        text: "Farm Address",
        navigation: "FarmAddress",
        form: "notavailable",
        type: "notavailable",
        title: "Please contact your market to change your farm's address!",
        icon: BusinessAddress,
        value: `${farmAddress}`
      },

      {
        text: "Payment Methods",
        form: "addcard",
        route: "/profile/payments",
        title: "Add Card",
        type: "payments",
        icon: Payments
      },
      {
        text: "Payout Methods",
        navigation: "Payout",
        form: "addcard",
        route: "/profile/payouts",
        type: "payout",
        icon: Payouts
      },
      {
        text: "Product Updates",
        type: "updates",
        icon: Notifications
      },
      {
        text: "Logout",
        navigation: "Logout",
        type: "logout",
        icon: Logout
      }
    ];

    const profileOptions = values.slice(0, 3);
    const farmOptions = values.slice(3, 7);
    const settingsOptions = values.slice(7, 13);
    const role = localStorage.getItem("role") || "consumer";

    return (
      <Layout title="Profile">
        <Div>
          <Title>Profile</Title>
        </Div>
        <Div>
          <NameCard
            avatar={avatar}
            firstName={firstName}
            lastName={lastName}
            email={email}
          />
        </Div>
        <Grid>
          <StyledColumn>
            <Label extrasmall>Profile</Label>
            {profileOptions.map((key, index) => {
              return (
                <Setting
                  key={index}
                  text={key.text}
                  icon={key.icon}
                  link={key.navigation}
                  type={key.type}
                  toggleModal={this.toggleModal}
                  value={key.value}
                  displayValue={this.displayValue}
                  form={key.form}
                  title={key.title}
                />
              );
            })}
            {role === "farmer" && (
              <React.Fragment>
                <Label extrasmall style={{ marginTop: "2em" }}>
                  Farm
                </Label>
                {farmOptions.map((key, index) => {
                  return (
                    <Setting
                      key={index}
                      text={key.text}
                      icon={key.icon}
                      link={key.navigation}
                      type={key.type}
                      toggleModal={this.toggleModal}
                      value={key.value}
                      displayValue={this.displayValue}
                      form={key.form}
                      title={key.title}
                    />
                  );
                })}
              </React.Fragment>
            )}
          </StyledColumn>
          <StyledColumn>
            <Label extrasmall>Settings</Label>
            {settingsOptions.map((key, index) => {
              return (
                <Setting
                  key={index}
                  text={key.text}
                  icon={key.icon}
                  link={key.navigation}
                  type={key.type}
                  toggleModal={this.toggleModal}
                  value={key.value}
                  handleLogout={this.handleLogout}
                  displayValue={this.displayValue}
                  form={key.form}
                  title={key.title}
                  history={history}
                  role={role}
                  email={email}
                />
              );
            })}
          </StyledColumn>
        </Grid>
        <Modal title={title} show={isOpen} toggleModal={this.toggleModal}>
          {type === "addcard" && <AddCardForm />}
          {type === "nameform" && (
            <NameForm
              updateProfile={updateProfile}
              firstName={firstName}
              lastName={lastName}
              email={email}
              mobile={mobile}
              toggleModal={this.toggleModal}
            />
          )}
          {type === "emailform" && (
            <EmailForm
              updateProfile={updateProfile}
              firstName={firstName}
              lastName={lastName}
              email={email}
              mobile={mobile}
              toggleModal={this.toggleModal}
              verifyEmail={verifyEmail}
            />
          )}
          {type === "mobileform" && (
            <MobileForm
              updateProfile={updateProfile}
              firstName={firstName}
              lastName={lastName}
              email={email}
              mobile={mobile}
              toggleModal={this.toggleModal}
            />
          )}
          {type === "mobilefarmform" && (
            <FarmMobileForm
              updateFarm={updateFarm}
              farmName={farmName}
              addrLine1={addrLine1}
              addrLine2={addrLine2}
              city={city}
              state={state}
              country={country}
              zipCode={zipCode}
              email={farmEmail}
              mobile={farmMobile}
              farmId={farmId}
              toggleModal={this.toggleModal}
            />
          )}
          {type === "emailfarmform" && (
            <FarmEmailForm
              updateFarm={updateFarm}
              farmName={farmName}
              addrLine1={addrLine1}
              addrLine2={addrLine2}
              state={state}
              country={country}
              city={city}
              zipCode={zipCode}
              email={farmEmail}
              mobile={farmMobile}
              farmId={farmId}
              toggleModal={this.toggleModal}
            />
          )}
          {type === "notavailable" && null}
        </Modal>
      </Layout>
    );
  }
}

export default connect(
  authSelector,
  { fetchCardsAction, updateProfile, fetchFarm, updateFarm, verifyEmail }
)(Profile);
