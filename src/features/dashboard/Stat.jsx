import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledStat = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: auto 1fr;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 0.5rem 1rem;
  align-items: end;
  justify-items: center;
`;

const Icon = styled.div`
  grid-row: 1 /-1;
  background-color: aliceblue;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-${props => props.color}-100);
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-${props => props.color}-700);
  }
`;

const Title = styled.div`
  font-size: 0.9rem;
  text-transform: uppercase;
  color: var(--color-grey-500);
`;

const Value = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1;
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

Stat.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string.isRequired,
};
export default Stat;
