import React from "react";
import Heading from "../styles/Heading";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookingsQuery } from "../services/BookingApi";
import styled from "styled-components";
import { HiArrowLeft } from "react-icons/hi";
import Tag from "../ui/Tag";
import BookingDetailBox from "../features/bookings/BookingDetailBox";

import DetailBookingButtons from "../features/bookings/DetailBookingButtons";
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default function DetailBooking() {

  const { documentId } = useParams();
  const { data, isLoading, error } = useGetBookingsQuery();
  const navigate = useNavigate();


  if (isLoading) return <div>加载中...</div>;
   if (error) throw new Error(error.error || "Something went wrong");
  const booking = data?.data?.find((b) => String(b.documentId) === documentId);

  return (
    <div>
      <Header>
        <Heading
          style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <span>BOOKING #{booking.id}</span>
          <Tag status={booking.bookingStatus} />
        </Heading>
        <button
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate("/bookings")}
        >
          <HiArrowLeft />
          <span>Back</span>
        </button>
      </Header>
      <BookingDetailBox booking={booking} />
      <DetailBookingButtons booking={booking}/>


    </div>
  );
}
