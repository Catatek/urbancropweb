import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchCardsAction } from "../../store/actions/payment";
import { updateProfile } from "../../store/actions/auth";
import Navigation from "../../shared-components/Navigation";
import { Title, Label, Column, Text } from "../../theme";
import { HeroImage, Modal } from "../../shared-components";
import AddCardForm from "./AddCardForm";
import Name from "../../assets/name.png";
import Email from "../../assets/email.png";
import Phone from "../../assets/phone.png";
import Logout from "../../assets/logout.png";
import Address from "../../assets/address.png";
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
  grid-gap: 50px;
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

function NameCard({ firstName, lastName, email }) {
  return (
    <StyledNameCard>
      <Avatar margin="0 2em 0 1em" large />
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

  render() {
    const {
      avatar,
      email,
      firstName,
      lastName,
      mobile,
      updateProfile,
      history
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

      // {
      //   text: 'Farm Name',
      //   navigation: 'FarmDetails',
      //   type: 'favorites',
      //   icon: Business,
      //   value: `${farmName}`,
      // },
      // {
      //   text: 'Farm Email',
      //   navigation: 'FarmDetails',
      //   type: 'payout',
      //   icon: Email,
      //   value: `${farmEmail}`,
      // },
      // {
      //   text: 'Farm Phone',
      //   navigation: 'FarmDetails',
      //   type: 'notifications',
      //   icon: Phone,
      //   value: `${farmMobile}`,
      // },
      // {
      //   text: 'Farm Address',
      //   navigation: 'FarmAddress',
      //   type: 'payments',
      //   icon: BusinessAddress,
      //   value: `${farmAddress}`,
      // },

      {
        text: "Payment Methods",
        form: "addcard",
        route: "/profile/payments",
        title: "Add Card",
        type: "payments",
        icon: Payments
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
    const settingsOptions = values.slice(3, 6);

    return (
      <div>
        <Navigation />
        <HeroImage title="Profile" />
        <Div>
          <Title>Profile</Title>
        </Div>
        <Div>
          <NameCard firstName={firstName} lastName={lastName} email={email} />
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
        </Modal>
      </div>
    );
  }
}

export default connect(
  authSelector,
  { fetchCardsAction, updateProfile }
)(Profile);
