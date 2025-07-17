import React from 'react'
//用于展示今日需要入住和退房的客人
import styled from 'styled-components';
import Heading from '../../styles/Heading';
import useTodayActivity from './useTodayActivity';
import TodayItem from './TodayItem';
const StyledTodayActivity = styled.div`
  grid-area: todayactivity;
  height: 100%;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem;
  gap: 0.5rem;
  & > *:first-child {
    margin-bottom: 1.2rem;
  }
`;
const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  margin:0;
  padding:0;
`;

export default function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  return (
    <StyledTodayActivity>
      <Heading as="h2">Today</Heading>
      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.documentId} />
            ))}
          </TodayList>
        ) : "No activity today"
      ) : "isLoading..."}
    </StyledTodayActivity>
  );
}
