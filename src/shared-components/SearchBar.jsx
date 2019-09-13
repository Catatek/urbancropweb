import React from "react";
import styled from "styled-components";
import search from "../assets/search.svg";

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 0px;
  background-color: rgba(0, 0, 0, 0);
  outline: 0;
  font-family: "proxima-nova";
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.13;
  letter-spacing: normal;
  color: #000;
`;

const Div = styled.div`
  padding-left: 0.5em;
  display: flex;
  align-items: center;
  width: 280px;
  height: 36px;
  border-radius: 8px;
  border: 0px;
  background-color: rgba(142, 142, 147, 0.12);
  @media (max-width: 780px) {
    width: 100%;
  }
`;

const StyledIcon = styled.img`
  margin: 0 10px;
  width: 14px;
  height: 14px;
`;

export function SearchBar({ handleChange, query, placeholder }) {
  return (
    <Div>
      <StyledIcon src={search} />
      <Input
        onChange={e => handleChange(e.target.value)}
        placeholder={placeholder}
        value={query}
        name="query"
        autoComplete="off"
      />
    </Div>
  );
}
