import styled from "styled-components";

import PropTypes from "prop-types";
import { useState } from "react";
import useCheckOut from "../check-in-out/useCheckOut";

import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../ui/ConfirmDialog"; 

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; 
  align-items: center;
  justify-items: space-between; 
  font-size: 1rem;
  font-weight: 500;
  padding:0.2rem 0;

`;

const StyledTag = styled.span`
  width: fit-content;
  border-radius: 100px;
  font-size: 1rem;
  padding: 0.5rem 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  user-select: none;
  white-space: nowrap;
`;


function TodayItem({ activity }) {
  const { documentId, bookingStatus, guestID, nightsNumber } = activity;
  
  const navigate = useNavigate();
  const [dialogConfig, setDialogConfig] = useState(false);
    const {CheckOutHandler, isUpdating} = useCheckOut();
  const ConfirmActionHandler = async () => {
    try {
        await CheckOutHandler(activity);
      
    } finally {
      setDialogConfig(false);
    }
  };

  return (
    <StyledTodayItem>
      {bookingStatus === "unconfirmed" && (
        <StyledTag
          style={{
            backgroundColor: "var(--color-green-100)",
            fontSize: "0.9rem",
          }}
        >
          Arriving
        </StyledTag>
      )}
      {bookingStatus === "checked in" && (
        <StyledTag
          style={{
            backgroundColor: "var(--color-blue-100)",
            fontSize: "0.9rem",
          }}
        >
          Departing
        </StyledTag>
      )}

      <div>{guestID.fullName}</div>
      <div>{nightsNumber} nights</div>

      {bookingStatus === "unconfirmed" && (
        <button
          style={{
            backgroundColor: "var(--color-green-100)",
            fontSize: "0.9rem",
            color: "var(--color-grey-900)",
          }}
          onClick={() => navigate(`/checkin/${documentId}`)}
        >
          Check in
        </button>
      )}

      {bookingStatus === "checked in" && (
        <button
          style={{
            backgroundColor: "var(--color-red-100)",
            fontSize: "0.9rem",
            color: "var(--color-grey-900)",
          }}
          onClick={() => setDialogConfig({ type: "checkout" })}
        >
          Check out
        </button>
      )}

      {dialogConfig && (
        <ConfirmDialog
          message={
            dialogConfig.type === "delete"
              ? "确定要删除该预订吗？"
              : "确定要退房吗？"
          }
          onClose={() => setDialogConfig(false)}
          onConfirm={ConfirmActionHandler}
          isLoading={isUpdating}
        />
      )}
    </StyledTodayItem>
  );
}


TodayItem.propTypes = {
  activity: PropTypes.shape({
    documentId: PropTypes.string.isRequired,
    bookingStatus: PropTypes.string.isRequired,
    guestID: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
    }).isRequired,
    nightsNumber: PropTypes.number.isRequired,
  }).isRequired,
};

export default TodayItem;
