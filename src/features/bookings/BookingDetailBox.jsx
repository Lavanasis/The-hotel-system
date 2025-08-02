import styled from 'styled-components';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

import DataItem from '../../ui/DataItem';
import PropTypes from 'prop-types';
import { formatDateRange, formatedDate } from '../../utils/format';
const StyledBookingDetailBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 7px;
  overflow: hidden;
  margin: 1.5rem 0rem;
`;

const Header = styled.header`
  background-color: var(--color-grey-600);
  padding: 1.5rem 2rem;
  color: white;
  font-weight: 500;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.6rem 2rem;
  font-size: 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-grey-700);
  gap: 1.5rem;
  font-weight: 700;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);

  &.true {
    background-color: var(--color-green-100);
    color: var(--color-green-700);
  }

  &.false {
    background-color: var(--color-yellow-100);
    color: var(--color-yellow-700);
  }
`;

const Footer = styled.footer`
  padding: 0rem 2rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDetailBox({ booking }) {
  if (!booking) return null;
  return (
    <div>
      <StyledBookingDetailBox>
        <Header>
          <div>
            <HiOutlineHomeModern />
            <div>
              {booking.nightsNumber} nights in Cabin {booking.cabinID.name}
            </div>
          </div>
          <div>{formatDateRange(booking.startDate, booking.endDate)}</div>
        </Header>

        <Content>
          <Guest>
            <div>
              <span>Guest: {booking.guestID.fullName} </span>
              <span>{booking.guestsNumber > 1 ? `+${booking.guestsNumber} guests` : ''}</span>
            </div>
            <div>&bull; {booking.guestID.email}</div>
            <div>&bull; National ID {booking.guestID.nationalID}</div>
          </Guest>
          <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Observations">
            {booking.observations ? booking.observations : 'No observations'}
          </DataItem>

          <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
            {booking.hasBreakfast ? 'Yes' : 'No'}
          </DataItem>

          <Price className={booking.isPaid ? 'true' : 'false'}>
            <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
              {`$${booking.totalPrice}`}
              {booking.hasBreakfast &&
                ` ($${booking.cabinPrice} cabin + $${booking.extraPrice} breakfast)`}
            </DataItem>

            <p>{booking.isPaid ? 'Paid' : 'Will pay at property'}</p>
          </Price>
        </Content>

        <Footer>
          <p>Booked in {formatedDate(booking.createdAt)}</p>
        </Footer>
      </StyledBookingDetailBox>
    </div>
  );
}

BookingDetailBox.propTypes = {
  booking: PropTypes.object.isRequired,
};

export default BookingDetailBox;
