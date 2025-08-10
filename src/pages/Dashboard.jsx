import Heading from '../styles/Heading';
import styled from 'styled-components';
import DashboardLayOut from '../features/dashboard/DashboardLayout';
import TableOperations from '../ui/TableOperations';
import { useSearchParams } from 'react-router-dom';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastParam = searchParams.get('last');
  const filterToDays = {
    'Last 7 days': 7,
    'Last 30 days': 30,
    'Last 90 days': 90,
  };

  const dayToFilter = {
    7: 'Last 7 days',
    30: 'Last 30 days',
    90: 'Last 90 days',
  };

  const currentFilter = dayToFilter[lastParam] || 'Last 7 days';
  return (
    <div>
      <Header>
        <Heading>DASHBOARD</Heading>
        <TableOperations
          operations={[
            {
              key: 'filter',
              initial: currentFilter,
              options: ['Last 7 days', 'Last 30 days', 'Last 90 days'],
              onSelect: val => {
                const params = new URLSearchParams(searchParams);
                params.set('last', filterToDays[val].toString());
                setSearchParams(params);
              },
            },
          ]}
        />
      </Header>

      <DashboardLayOut />
    </div>
  );
}
