
import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  width: 270px;
  height: 40px;
  margin: 0;
`;

export const Button = styled.button`
  all: unset;
  width: 100%;
  height: 100%;
  padding: 0rem 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  white-space: nowrap;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  z-index: 1000;
  margin: 0;
`;

export const DropdownItem = styled.li`
  padding: 0.6rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;
