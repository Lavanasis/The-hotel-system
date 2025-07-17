import React from 'react'
import styled from "styled-components";
import PropTypes from "prop-types";
const StyledTag = styled.span`
  width: fit-content;
  border-radius: 100px;
  font-size: 1rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid var(--color-${(props) => props.type}-300);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  user-select: none;
  white-space: nowrap;
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;
function Tag({ status }) {
  let type = "gray";
  let text = "Unconfirmed";

  if (status === "checked in") {
    type = "green";
    text = "Checked in";
  } else if (status === "checked out") {
    type = "red";
    text = "Checked out";
  }

  return <StyledTag type={type}>{text}</StyledTag>;
}

Tag.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Tag;
