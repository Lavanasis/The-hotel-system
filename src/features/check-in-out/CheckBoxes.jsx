import { useState } from 'react';
import styled from 'styled-components';
import { useGetSettingsQuery } from '../../services/SettingApi';
import PropTypes from 'prop-types';

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  background-color: var(--color-grey-50);
  font-size: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
  cursor: pointer;

  input {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
  }

  p {
    margin: 0;
  }
`;

export default function Checkboxes({ booking }) {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(true);
  const { data: setting } = useGetSettingsQuery();
  const breakfastPrice = setting?.breakfastPrice ?? '';
  if (!booking) return null;
  return (
    <div>
      <Checkbox htmlFor="addbreakfast">
        <input
          id="addbreakfast"
          type="checkbox"
          checked={addBreakfast}
          onChange={() => setAddBreakfast(c => !c)}
          disabled={booking.hasBreakfast}
        />
        <p>Want to add breakfast for ${breakfastPrice}?</p>
      </Checkbox>

      <Checkbox htmlFor="confirm">
        <input
          id="confirm"
          type="checkbox"
          checked={confirmPaid}
          onChange={() => setConfirmPaid(c => !c)}
          disabled={!booking.isPaid}
        />
        <p>
          I confirm that <strong>{booking.guestID.fullName}</strong> has paid the total amount of $
          {booking.totalPrice} (${booking.cabinPrice} cabin + ${breakfastPrice} breakfast).
        </p>
      </Checkbox>
    </div>
  );
}

Checkboxes.propTypes = {
  booking: PropTypes.shape({
    hasBreakfast: PropTypes.bool,
    isPaid: PropTypes.bool,
    guestID: PropTypes.shape({
      fullName: PropTypes.string,
    }),
    totalPrice: PropTypes.number,
    cabinPrice: PropTypes.number,
  }).isRequired,
};
