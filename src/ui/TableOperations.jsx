// src/ui/TableOperations.jsx
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DropdownSelect from "./DropdownSelect";

const OperationsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
`;

export default function TableOperations({ operations }) {
  return (
    <OperationsContainer>
      {operations.map(({ key, initial, options, onSelect }) => (
        <DropdownSelect
          key={key}
          initial={initial}
          options={options}
          onSelect={onSelect}
        />
      ))}
    </OperationsContainer>
  );
}

TableOperations.propTypes = {
  operations: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      initial: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      onSelect: PropTypes.func.isRequired,
    })
  ).isRequired,
};
