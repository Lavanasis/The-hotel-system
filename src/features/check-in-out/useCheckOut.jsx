import { useUpdateBookingMutation } from '../../services/BookingApi';
import toast from 'react-hot-toast';

export default function useCheckOut() {
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();

  const CheckOutHandler = async booking => {
    try {
      await updateBooking({
        documentId: booking.documentId,
        bookingStatus: 'checked out',
      });
      toast.success('退房成功！');
    } catch (err) {
      toast.error(`退房失败：${err?.message || '未知错误'}`);
    }
  };

  return { CheckOutHandler, isUpdating };
}
