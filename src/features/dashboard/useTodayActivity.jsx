import { useGetStaysTodayActivityQuery } from '../../services/BookingApi';

export default function useTodayActivity() {
  const { data, isLoading } = useGetStaysTodayActivityQuery();
  const activities = data?.data ? [...data.data] : [];
  return { activities, isLoading };
}
