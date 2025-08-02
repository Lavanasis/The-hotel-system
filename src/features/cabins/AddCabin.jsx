import AddCabinForm from './AddCabinForm';
import styled from 'styled-components';
import Modal from '../../ui/Modal';
import { useOpen } from '../../hooks/useOpen';
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
  const { isOpen, open, close } = useOpen();
  return (
    <div>
      {!isOpen && <StyledButton onClick={open}>Add new cabin</StyledButton>}
      {isOpen && (
        <Modal onClose={close}>
          <AddCabinForm Cancel={close} />
        </Modal>
      )}
    </div>
  );
}
