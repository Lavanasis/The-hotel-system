import styled from "styled-components";
import { useRecentStays } from "./useRecentStays"
import { useRecentBookings } from "./useRecentBooking";
import Stats from "./Stats";
import { useGetCabinsQuery } from "../../services/cabinApi";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";

const StyledDashboardLayout = styled.div`
  gap: 1.5rem;
  font-size: 1.2rem;
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
  margin-top: 1.5rem;
  display: grid;
  grid-template-areas:
    "stats stats"
    "todayactivity durationchart"
    "saleschart saleschart";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  column-gap: 1.2rem;
  align-items: center;
  background-color: var(--color-grey-50);

  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 1rem;
  text-align: center;
  margin: 0;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { data, error, isLoading3 } = useGetCabinsQuery();
  const cabins = data?.data ? [...data.data] : [];

  if (isLoading1 || isLoading2 || isLoading3) return "isLoading...";
    if (error) throw new Error(error.error || "Something went wrong");

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
