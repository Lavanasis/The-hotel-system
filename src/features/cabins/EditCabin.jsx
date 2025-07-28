import { useState } from "react";
import Modal from "../../ui/Modal";
import AddCabinForm from "./AddCabinForm";
import PropTypes from "prop-types";

export default function EditCabinForm({ cabin }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEditModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpen(false);

  return (
    <>
      <button onClick={openEditModal}>Edit</button>
      {isOpen && (
        <Modal onClose={closeEditModal}>
          <AddCabinForm Cancel={closeEditModal} editCabin={cabin} />
        </Modal>
      )}
    </>
  );
}

EditCabinForm.propTypes = {
  cabin: PropTypes.object.isRequired,
};
