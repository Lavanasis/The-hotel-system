import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiEye,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDialog from "../../ui/ConfirmDialog";
const StyledMoreButton = styled.button`
  all: unset;
  position: relative;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  box-shadow: none;
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-100);
    box-shadow: none;
  }
`;
const DetailButton = styled.button`
  all: unset;
  /* box-sizing: border-box;  */
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.6rem;
  font-size: 1.2rem;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-300);
    box-shadow: none;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export const ShowDetailMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 10rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-900);
  border-radius: 5px;
  list-style: none;
  padding: 0;
  z-index: 1000;
  margin: 0;
  overflow: hidden;
`;

export default function More({ booking }) {
  const [showDetail, setShowDetail] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const {CheckOutHandler, isUpdating} = useCheckOut();
  const { DeleteHandler, isDeleting } = useDeleteBooking();

  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    type: null, // 'delete' 或 'checkout'
  });
  const ShowDetailHandler = () => {
    setShowDetail((prev) => !prev);
  };
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

  
  // 监听点击外部关闭
  useEffect(() => {
    const ClickOutsideHandler = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDetail(false);
      }
    };
    if (showDetail) {
      document.addEventListener("mousedown", ClickOutsideHandler);
    }
    return () => {
      document.removeEventListener("mousedown", ClickOutsideHandler);
    };
  }, [showDetail]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <StyledMoreButton onClick={ShowDetailHandler}>
        <HiDotsVertical />
      </StyledMoreButton>

      {showDetail && (
        <ShowDetailMenu>
          {/* see detail */}
          <DetailButton
            onClick={() => navigate(`/bookings/${booking.documentId}`)}
          >
            <HiEye /> See detail
          </DetailButton>

          {/* 删除booking */}

          <DetailButton
            onClick={() =>
              setDialogConfig({
                isOpen: true,
                type: "delete",
              })
            }
          >
            <HiTrash />
            Delete
          </DetailButton>

          {/* check in */}
          {booking.bookingStatus === "unconfirmed" && (
            <DetailButton
              onClick={() => navigate(`/checkin/${booking.documentId}`)}
            >
              <HiArrowDownOnSquare /> Check in
            </DetailButton>
          )}

          {/* //check out */}
          {booking.bookingStatus === "checked in" && (
            <DetailButton
              onClick={() =>
                setDialogConfig({
                  isOpen: true,
                  type: "checkout",
                })
              }
            >
              <HiArrowUpOnSquare /> Check Out
            </DetailButton>
          )}
        </ShowDetailMenu>
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

More.propTypes = {
  booking: PropTypes.shape({
    documentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    bookingStatus: PropTypes.oneOf(["unconfirmed", "checked in", "checked out"])
      .isRequired,
  }).isRequired,
};
