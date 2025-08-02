import { useDeleteBookingMutation } from '../../services/BookingApi';
import toast from 'react-hot-toast';
export default function useDeleteBooking() {
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation();
  const DeleteHandler = async booking => {
    try {
      await deleteBooking(booking.documentId);
      toast.success('删除成功！');
    } catch (err) {
      toast.error(`删除失败：${err?.message || '未知错误'}`);
    }
  };
  return { DeleteHandler, isDeleting };
}
