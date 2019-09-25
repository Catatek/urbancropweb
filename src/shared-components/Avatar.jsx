import React, { Component } from "react";
import styled from "styled-components";
import { Text } from "../theme/index";
import { connect } from "react-redux";
import { authSelector } from "../store/selectors/auth";

const Circle = styled.div`
  width: ${props => (props.large ? "52px" : "32px")};
  height: ${props => (props.large ? "52px" : "32px")};
  display: flex;
  margin: 1em 0;
  justify-content: center;
  align-items: center;
  background: ${props => props.background};
  background-size: cover;
  margin-right: 2em;
  margin: ${props => props.margin};
  border-radius: 50%;
  opacity: 0.75;
  outline: none;
  transition: 250ms;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  @media (max-width: 780px) {
    margin-right: ${props => (props.large ? ".75em" : "0")};
  }
`;

const StyledText = styled(Text)`
  font-size: ${props => (props.large ? "18px" : "13px")};
  font-weight: 600;
  color: #fff;
`;

class Avatar extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { displayDropdown: false };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInitials = () => {
    let name = "";
    const { type, farmerFirstName, farmerLastName } = this.props;
    if (type === "farmer") {
      name = `${this.props.farmerFirstName} ${this.props.farmerLastName}`;
    } else {
      name = `${this.props.firstName} ${this.props.lastName}`;
    }
    let initials = name.match(/\b\w/g) || [];

    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  };

  handleClick = () => {
    this.setState({ displayDropdown: !this.state.displayDropdown });
    this._isMounted = true;
  };

  handleBlur = () => {
    setTimeout(() => {
      if (this._isMounted) {
        this.setState({
          displayDropdown: false
        });
      }
    }, 400);
  };

  handleAvatar = type => {
    const { avatar, farmerAvatar } = this.props;
    let avatarState = "";
    if (type === "farmer" && farmerAvatar) {
      avatarState = `url('${farmerAvatar}')`;
    } else if (type === "farmer" && !farmerAvatar) {
      avatarState = "#fbc513";
    } else if (avatar) {
      avatarState = `url('${avatar}')`;
    } else {
      avatarState = "#fbc513";
    }
    return avatarState;
  };

  render() {
    const initials = this.getInitials();
    const { avatar, handleClick, large, margin, type } = this.props;
    const display = this.handleAvatar(type);

    return (
      <div>
        <Circle
          margin={margin}
          large={large}
          onClick={handleClick}
          // tabIndex="-1"
          // onBlur={this.handleBlur}
          background={display}
        >
          {!avatar && <StyledText large={large}>{initials}</StyledText>}
        </Circle>

        {/* {this.props.render(this.state.displayDropdown)} */}
      </div>
    );
  }
}

export default connect(
  authSelector,
  {}
)(Avatar);
