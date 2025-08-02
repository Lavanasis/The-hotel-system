import PropTypes from 'prop-types';
import { useDeleteCabinMutation } from '../../services/cabinApi';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../ui/ConfirmDialog';
import { useOpen } from '../../hooks/useOpen';
export default function DeleteCabin({ cabin }) {
  const [deleteCabin, { isLoading: isDeleting }] = useDeleteCabinMutation();
  const { isOpen, open, close } = useOpen();

  const DeleteHandler = async () => {
    try {
      await deleteCabin(cabin.documentId);
      toast.success('删除成功！');
    } catch (err) {
      toast.error(`删除失败：${err?.message || '未知错误'}`);
    }
  };

  return (
    <>
      <button onClick={open} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>

      {isOpen && (
        <ConfirmDialog
          message="确定要删除该房间吗？"
          onClose={close}
          onConfirm={DeleteHandler}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}

DeleteCabin.propTypes = {
  cabin: PropTypes.shape({
    documentId: PropTypes.string.isRequired,
  }).isRequired,
};
