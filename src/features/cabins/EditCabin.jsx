import Modal from '../../ui/Modal';
import AddCabinForm from './AddCabinForm';
import PropTypes from 'prop-types';
import { useOpen } from '../../hooks/useOpen';

export default function EditCabinForm({ cabin }) {
  const { isOpen, open, close } = useOpen();

  return (
    <>
      <button onClick={open}>Edit</button>
      {isOpen && (
        <Modal onClose={close}>
          <AddCabinForm Cancel={close} editCabin={cabin} />
        </Modal>
      )}
    </>
  );
}

EditCabinForm.propTypes = {
  cabin: PropTypes.object.isRequired,
};
