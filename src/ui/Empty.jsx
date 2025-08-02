import PropTypes from 'prop-types';
import styled from 'styled-components';
const EmptyRow = styled.div`
  grid-column: 1 / -1; // 跨越所有列
  padding: 2rem;
  text-align: center;
  font-size: 1.6rem;
  color: var(--color-grey-600);
`;
export default function Empty({ datatype }) {
  return <EmptyRow>No {datatype}</EmptyRow>;
}
Empty.propTypes = {
  datatype: PropTypes.string.isRequired,
};
