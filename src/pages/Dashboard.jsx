import { useState, useEffect } from 'react';
import Heading from '../styles/Heading';
import styled from 'styled-components';
import DashboardLayOut from '../features/dashboard/DashboardLayout';
import TableOperations from '../ui/TableOperations';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lastParam = searchParams.get('last');
  const mapLastToFilter = {
    7: 'Last 7 days',
    30: 'Last 30 days',
    90: 'Last 90 days',
  };
  const initialFilter = mapLastToFilter[lastParam] || 'Last 7 days';

  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  // 选项对应的天数,如果不使用 useMemo，每次组件渲染时都会重新创建一个新的对象引用。
  const filterToDays = useMemo(
    () => ({
      'Last 7 days': 7,
      'Last 30 days': 30,
      'Last 90 days': 90,
    }),
    [],
  );

  // 当 selectedFilter 变化时，同步更新 URL 查询参数
  useEffect(() => {
    if (filterToDays[selectedFilter]) {
      setSearchParams({ last: filterToDays[selectedFilter].toString() });
    }
  }, [selectedFilter, setSearchParams, filterToDays]);

  return (
    <div>
      <Header>
        <Heading>DASHBOARD</Heading>
        <TableOperations
          operations={[
            {
              key: 'filter',
              initial: selectedFilter,
              options: ['Last 7 days', 'Last 30 days', 'Last 90 days'],
              onSelect: val => setSelectedFilter(val),
            },
          ]}
        />
      </Header>

      <DashboardLayOut />
    </div>
  );
}
