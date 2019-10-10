import React, { Component } from "react";
import styled, { css } from "styled-components";
import { Text } from "../theme/index";
import { connect } from "react-redux";

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
  ${props =>
    props.square &&
    css`
      width: 150px;
      height: 150px;
      border-radius: 8px;
      @media (max-width: 780px) {
        margin-right: 1em;
        width: 200px;
        height: 200px;
      }
    `}
`;

const StyledText = styled(Text)`
  font-size: ${props =>
    props.large ? "18px" : props.square ? "28px" : "13px"};
  font-weight: 600;
  color: #fff;
`;

class Avatar extends Component {
  getInitials = () => {
    let name = "";
    const {
      type,
      farmerFirstName,
      farmerLastName,
      firstName,
      lastName
    } = this.props;
    if (type === "farmer") {
      name = `${farmerFirstName} ${farmerLastName}`;
    } else {
      name = `${firstName} ${lastName}`;
    }
    let initials = name.match(/\b\w/g) || [];

    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
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
    const { avatar, handleClick, large, margin, type, square } = this.props;
    const display = this.handleAvatar(type);

    return (
      <div>
        <Circle
          margin={margin}
          large={large}
          onClick={handleClick}
          background={display}
          square={square}
        >
          {!avatar && (
            <StyledText square={square} large={large}>
              {initials}
            </StyledText>
          )}
        </Circle>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Avatar);
