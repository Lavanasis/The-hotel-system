import React from "react";
import { ButtonGroup } from "../styles/FormStyles";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import PropTypes from "prop-types";
const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-50);
  font-size: 1rem;
  margin-top:0.5rem;
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
  p {
    margin: 0;
  }
`;
export default function Pagination({
  count,
  currentPage,
  pageSize,
  onPageChange,
}) {


  const pageCount = Math.ceil(count / pageSize);

  if (pageCount <= 1) return null;

  const PrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const NextPage = () => {
    if (currentPage < pageCount) onPageChange(currentPage + 1);
  };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(start + pageSize - 1, count); //当前页最大可能显示的末尾索引 or 最终的数（在页面不够填满的情况下）

  return (
    <StyledPagination>
      <p>
        Showing {start} to {end} of {count} results
      </p>
      <ButtonGroup>
        <button style={{color:"var(--color-grey-600)"} }onClick={PrevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </button>
        <button onClick={NextPage} disabled={currentPage === pageCount}>
          <HiChevronRight />
          <span>Next</span>
        </button>
      </ButtonGroup>
    </StyledPagination>
  );
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};