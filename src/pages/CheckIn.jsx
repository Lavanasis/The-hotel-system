import React from "react";
import Heading from "../styles/Heading";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookingsQuery } from "../services/BookingApi";
import styled from "styled-components";
import { HiArrowLeft } from "react-icons/hi";
import BookingDetailBox from "../features/bookings/BookingDetailBox";
import { useState } from "react";

import ConfirmDialog from "../ui/ConfirmDialog"
import useCheckIn from "../features/check-in-out/useCheckIn";
import Checkboxes from "../features/check-in-out/CheckBoxes";
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



export default function CheckIn() {
  const { documentId } = useParams();
  const { data, isLoading, error } = useGetBookingsQuery();

  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const navigate = useNavigate();
  const booking = data?.data?.find((b) => String(b.documentId) === documentId); // 确保类型一致

  const {CheckInHandler,isUpdating} = useCheckIn();
  if (isLoading) return <div>加载中...</div>;
    if (error) throw new Error(error.error || "Something went wrong");
  return (
    <div>
      <Header>
        <Heading
          style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <span>CHECK IN #{booking.id}</span>
        </Heading>
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate(-1)}
        >
          <HiArrowLeft />
          <span>Back</span>
        </button>
      </Header>
      <BookingDetailBox booking={booking} />
      <Checkboxes booking={booking} />

      <div style={{ position: "relative" }}>
        <button
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: "var(--color-green-700)",
            color:"white"
          }}
          onClick={() => setIsOpenConfirmDialog(true)}
          disabled={!booking.isPaid}
        >
          Check in
        </button>
      </div>

      {isOpenConfirmDialog && (
        <ConfirmDialog
          message="确定要入住吗？"
          onClose={() => setIsOpenConfirmDialog(false)}
          onConfirm={async () => {
            await CheckInHandler(booking);
            setIsOpenConfirmDialog(false);
          }}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
}
