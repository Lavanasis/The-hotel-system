import React from "react";
import AddCabinForm from "./AddCabinForm";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../../ui/Modal";
const StyledButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 5px;
  font-size: 1.4rem;
  font-weight: 600;
  background-color: var(--color-grey-400);
  color: black;
`;
export default function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      {!isOpenModal && (
        <StyledButton onClick={() => setIsOpenModal(true)}>
          Add new cabin
        </StyledButton>
      )}
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <AddCabinForm Cancel={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
