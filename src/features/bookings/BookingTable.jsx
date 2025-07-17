import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import More from "./More";
import {
  StyledTable,
} from "../../styles/TableStyles";
import Empty from "../../ui/Empty";
import Tag from "../../ui/Tag";
import { formatDateRange } from "../../utils/format";
const StyledTableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 0.3fr;
  column-gap: 1.2rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 1rem;
  text-align: center;
  margin: 0;
`;

const StyleTableContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 2fr 1fr 1fr 0.3fr;
  column-gap: 1.2rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-grey-600);
  padding: 0.5rem 1rem;
  text-align: center;
  margin: 0;
`;

const ChildrenText = styled.div`
  font-size: 0.75rem;
  color: var(--color-grey-400);
  margin-top: 2px;
`;

function BookingTable({ bookings }) {
  
  return (
    <StyledTable>
      <StyledTableHeader>
        <div>CABIN</div>
        <div>GUESTS</div>
        <div>DATES</div>
        <div>STATUS</div>
        <div>AMOUNT</div>
        <div></div>
      </StyledTableHeader>

      {Array.isArray(bookings) && bookings.length === 0 ? (
        <Empty datatype="bookings" />
      ) : (
        bookings.map((booking) => (
          <StyleTableContent key={booking.documentId}>
            <div>{booking.cabinID?.name || "Unknown Cabin"}</div>
            <div>
              <div>{booking.guestID?.fullName || "Unknown Guest"}</div>
              <ChildrenText>{booking.guestID?.email}</ChildrenText>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{formatDateRange(booking.startDate, booking.endDate)}</div>
              <ChildrenText>
               {booking.nightsNumber} nights
              </ChildrenText>
            </div>
            <div>
              <Tag status={booking.bookingStatus} />
            </div>
            <div>${booking.totalPrice}</div>
            <div>
              <More booking={booking} />
            </div>
          </StyleTableContent>
        ))
      )}
    </StyledTable>
  );
}

BookingTable.propTypes = {
  bookings: PropTypes.array.isRequired,
};

export default BookingTable;
