import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const StyledStats = styled.div`
  grid-area: stats;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.2rem;
`;
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings.length; //预订的个数

  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0); //总销售额=所有预订的总价格

  // 3.
  const checkins = confirmedStays.length; //住宿个数

  // 4.
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.nightsNumber, 0) / (numDays * cabinCount); //入住率：总入住夜数除以所有可用的夜数总和

  return (
    <StyledStats>
      <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={`$` + sales} />
      <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </StyledStats>
  );
}

Stats.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      totalPrice: PropTypes.number.isRequired,
    }),
  ).isRequired,
  confirmedStays: PropTypes.arrayOf(
    PropTypes.shape({
      nightsNumber: PropTypes.number.isRequired,
    }),
  ).isRequired,
  numDays: PropTypes.number.isRequired,
  cabinCount: PropTypes.number.isRequired,
};

export default Stats;
