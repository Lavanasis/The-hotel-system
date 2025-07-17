import React, { useState } from "react";
import styled from "styled-components";
import Heading from "../styles/Heading";
import { useGetBookingsQuery } from "../services/BookingApi";
import TableOperations from "../ui/TableOperations";
import BookingTable from "../features/bookings/BookingTable";
import Pagination from "../ui/Pagination";
import { useSearchParams } from "react-router-dom";
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Bookings() {
  const { data, error, isLoading } = useGetBookingsQuery();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Sort by Start Date");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 10; // 每页显示的booking数量

  if (isLoading) return <div>isLoading...</div>;
  if (error) throw new Error(error.error || "Something went wrong");

  let bookings = [...data.data];
  
  // Filter
  if (selectedFilter === "Checked in") {
    bookings = bookings.filter(
      (booking) => booking.bookingStatus === "checked in"
    );
  } else if (selectedFilter === "Checked out") {
    bookings = bookings.filter(
      (booking) => booking.bookingStatus === "checked out"
    );
  } else if (selectedFilter === "Unconfirmed") {
    bookings = bookings.filter(
      (booking) => booking.bookingStatus === "unconfirmed"
    );
  }

  // Sort
  if (sortOption === "Sort by Amount(Low to High)") {
    bookings.sort((a, b) => a.totalPrice - b.totalPrice);
  } else if (sortOption === "Sort by Amount(High to Low)") {
    bookings.sort((a, b) => b.totalPrice - a.totalPrice);
  } else if (sortOption === "Sort by Start Date") {
    bookings.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  //切分每页显示的booking
  const paginatedBookings = bookings.slice(
    (currentPage - 1) * pageSize, // 起始索引
    currentPage * pageSize // 终止索引（不含）
  );

  return (
    <div>
      <Header>
        <Heading>All BOOKINGS</Heading>
        <TableOperations
          operations={[
            {
              key: "filter",
              initial: "All",
              options: ["All", "Checked in", "Checked out", "Unconfirmed"],
              onSelect: (val) => {
                setSelectedFilter(val); 
                searchParams.set("page", 1);
                setSearchParams(searchParams);
              },
            },
            {
              key: "sort",
              initial: "Sort by Amount(Low to High)",
              options: [
                "Sort by Amount(Low to High)",
                "Sort by Amount(High to Low)",
                "Sort by Start Date",
              ],
              onSelect: (val) => {
                setSortOption(val);
                searchParams.set("page", 1);
                setSearchParams(searchParams);
              },
            },
          ]}
        />
      </Header>
      <BookingTable bookings={paginatedBookings} />
      <Pagination
        count={bookings.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => {
          searchParams.set("page", page);
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
}
