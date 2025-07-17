// Cabins.jsx
import React, { useState } from "react";
import Heading from "../styles/Heading";
import CabinTable from "../features/cabins/CabinTable";
import { useGetCabinsQuery } from "../services/cabinApi";
import AddCabin from "../features/cabins/AddCabin";
import styled from "styled-components";
import TableOperations from "../ui/TableOperations";
import { useSearchParams } from "react-router-dom";
import Pagination from "../ui/Pagination";
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Cabins() {
  const { data, error, isLoading } = useGetCabinsQuery();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Sort by Name(A-Z)");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 10; // 每页显示的booking数量
  if (isLoading) return <div>加载中...</div>;
    if (error) throw new Error(error.error || "Something went wrong");

  let cabins = [...data.data];

  //Filter
  if (selectedFilter === "With Discount") {
    cabins = cabins.filter((cabin) => cabin.discount);
  } else if (selectedFilter === "No Discount") {
    cabins = cabins.filter((cabin) => !cabin.discount);
  }

  //Sort
  if (sortOption === "Sort by Name(A-Z)") {
    cabins.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "Sort by Name(Z-A)") {
    cabins.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "Sort by Price(High to Low)") {
    cabins.sort((a, b) => b.regularPrice - a.regularPrice);
  } else if (sortOption === "Sort by Price(Low to High)") {
    cabins.sort((a, b) => a.regularPrice - b.regularPrice);
  }

  const paginatedCabins = cabins.slice(
    (currentPage - 1) * pageSize, // 
    currentPage * pageSize // 
  );
  return (
    <div>
      <Header>
        <Heading>All CABINS</Heading>
        <TableOperations
          operations={[
            {
              key: "filter",
              initial: "All",
              options: ["All", "With Discount", "No Discount"],
              onSelect: (val) => setSelectedFilter(val),
            },
            {
              key: "sort",
              initial: "Sort by Name(A-Z)",
              options: [
                "Sort by Name(A-Z)",
                "Sort by Name(Z-A)",
                "Sort by Price(High to Low)",
                "Sort by Price(Low to High)",
              ],
              onSelect: (val) => setSortOption(val),
            },
          ]}
        />
      </Header>
      <CabinTable cabins={paginatedCabins} />
      <Pagination
        count={cabins.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page) => {
          searchParams.set("page", page);
          setSearchParams(searchParams);
        }}
      />
      <AddCabin />
    </div>
  );
}

export default Cabins;
