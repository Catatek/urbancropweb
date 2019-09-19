import React, { Component } from "react";
import styled from "styled-components";
import { Text } from "../theme/index";
import { connect } from "react-redux";
import { authSelector } from "../store/selectors/auth";

const Circle = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  margin: 1em 0;
  justify-content: center;
  align-items: center;
  background: ${props => props.background};
  background-size: cover;
  margin-right: 2.25em;
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
`;

const StyledText = styled(Text)`
  font-size: 0.75em;
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
    let name = `${this.props.firstName} ${this.props.lastName}`;
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

  render() {
    const initials = this.getInitials();
    const { avatar } = this.props;
    console.log(avatar);

    return (
      <div>
        <Circle
          onClick={this.handleClick}
          tabIndex="-1"
          onBlur={this.handleBlur}
          background={avatar ? `url('${avatar}')` : "#fbc513"}
        >
          {!avatar && <StyledText>{initials}</StyledText>}
        </Circle>

        {this.props.render(this.state.displayDropdown)}
      </div>
    );
  }
}

export default connect(
  authSelector,
  {}
)(Avatar);
