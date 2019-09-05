import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 280px;
  height: 36px;
  border-radius: 8px;
  border: 0px;
  background-color: rgba(142, 142, 147, 0.12);
  flex-direction: row;
  padding-left: 0.5em;
  outline: 0;
  align-items: center;
`;

// const StyledIcon = styled(Ionicons)`
//   margin: 0 10px;
// `;

export function SearchBar({ handleChange, query }) {
  console.log(query, "search");

  return (
    <Input
      onChange={e => handleChange(e.target.value)}
      placeholder="Search"
      value={query}
      name="query"
    />
  );
}
