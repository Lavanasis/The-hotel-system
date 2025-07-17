import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useGetBookingsAfterDateQuery } from "../../services/BookingApi"
import { useMemo } from "react";
export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") ? +searchParams.get("last") : 7; //从地址栏中获取参数last
  const queryDate = useMemo(() => {
    return subDays(new Date(), numDays).toISOString();
  }, [numDays]); //取请求的当天日期

  const { data, error, isLoading } = useGetBookingsAfterDateQuery(queryDate);

  const bookings = data?.data ? [...data.data] : [];


  return { bookings, error, isLoading, numDays};
}
