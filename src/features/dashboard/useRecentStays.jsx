import { useSearchParams } from 'react-router-dom';
import { subDays } from 'date-fns';
import { useGetStaysAfterDateQuery } from '../../services/BookingApi';
import { useMemo } from 'react';
export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get('last') ? +searchParams.get('last') : 7;
  const queryDate = useMemo(() => {
    return subDays(new Date(), numDays).toISOString();
  }, [numDays]);

  const { data, isLoading } = useGetStaysAfterDateQuery(queryDate);

  const stays = data?.data ? [...data.data] : [];

  const confirmedStays = stays.filter(
    stay => stay.bookingStatus === 'checked in' || stay.bookingStatus === 'checked out',
  );

  return { confirmedStays, isLoading, numDays };
}
