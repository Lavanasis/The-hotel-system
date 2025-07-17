import { useUpdateBookingMutation } from "../../services/BookingApi";
import toast from "react-hot-toast";

export default function useCheckIn() {
  const [updateBooking, { isLoading: isUpdating }] = useUpdateBookingMutation();

  const CheckInHandler = async (booking) => {
    try {
      await updateBooking({
        documentId: booking.documentId,
        bookingStatus: "checked in",
      });
      toast.success("入住成功！");
      return true;
    } catch (err) {
      toast.error(`入住失败：${err?.message || "未知错误"}`);
      return false;
    }
  };

  return { CheckInHandler, isUpdating };
}
