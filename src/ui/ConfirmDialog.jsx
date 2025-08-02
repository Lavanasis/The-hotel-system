import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ButtonGroup } from '../styles/FormStyles';
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: 7px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2);
  padding: 1.9rem;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  top: 1.2rem;
  right: 1.9rem;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-500);
  }
`;

const Message = styled.div`
  font-size: 1.2rem;
  text-align: left;
`;

export default function ConfirmDialog({ message, onClose, onConfirm, isLoading }) {
  const OverlayClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <Overlay onClick={OverlayClick}>
      <Dialog>
        <div>
          <CloseButton onClick={onClose}>
            <HiXMark />
          </CloseButton>
        </div>

        <Message>{message}</Message>

        <ButtonGroup>
          <button onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: 'var(--color-red-100)',
              color: 'var(--color-grey-900)',
            }}
            disabled={isLoading}
          >
            {isLoading ? '正在加载...' : 'Confirm'}
          </button>
        </ButtonGroup>
      </Dialog>
    </Overlay>,
    document.body,
  );
}

ConfirmDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
