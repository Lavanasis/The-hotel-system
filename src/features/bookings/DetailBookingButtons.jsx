import React from "react";
import useCheckOut from "../../features/check-in-out/useCheckOut"
import { useState } from "react";
import ConfirmDialog from "../../ui/ConfirmDialog";
import useDeleteBooking from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export default function DetailBookingButtons({ booking }) {
  const { DeleteHandler, isDeleting } = useDeleteBooking();
  const { CheckOutHandler, isUpdating } = useCheckOut();
  const navigate = useNavigate();
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    type: null, // 'delete' 或 'checkout'
  });
  
  const ConfirmActionHandler = async () => {
    try {
      if (dialogConfig.type === "delete") {
        await DeleteHandler(booking);
      } else if (dialogConfig.type === "checkout") {
        await CheckOutHandler(booking);
      }
    } finally {
      setDialogConfig({ isOpen: false, type: null });
    }
  };
  return (
    // 通用按钮区域
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "1rem",
        marginTop: "2rem",
      }}
    >
      {/* 删除按钮 */}
      <button
        style={{
          backgroundColor: "var(--color-red-100)",
          color: "var(--color-grey-900)",
        }}
        onClick={() =>
          setDialogConfig({
            isOpen: true,
            type: "delete",
          })
        }
      >
        Delete Booking
      </button>

      {/* Check in 按钮 */}
      {booking.bookingStatus === "unconfirmed" && (
        <button
          style={{
            backgroundColor: "var(--color-green-100)",
            color: "var(--color-grey-900)",
          }}
          onClick={() => navigate(`/checkin/${booking.documentId}`)}
        >
          Check in
        </button>
      )}

      {/* Check out 按钮 */}
      {booking.bookingStatus === "checked in" && (
        <button
          style={{
            backgroundColor: "var(--color-yellow-100)",
            color: "var(--color-grey-900)",
          }}
          onClick={() =>
            setDialogConfig({
              isOpen: true,
              type: "checkout",
            })
          }
        >
          Check Out
        </button>
      )}

      {dialogConfig.isOpen && (
        <ConfirmDialog
          message={
            dialogConfig.type === "delete"
              ? "确定要删除该预订吗？"
              : "确定要退房吗？"
          }
          onClose={() => setDialogConfig({ isOpen: false, type: null })}
          onConfirm={() => ConfirmActionHandler()}
          isLoading={dialogConfig.type === "delete" ? isDeleting : isUpdating}
        />
      )}
    </div>
  );
}

DetailBookingButtons.propTypes = {
  booking: PropTypes.object.isRequired,
};
