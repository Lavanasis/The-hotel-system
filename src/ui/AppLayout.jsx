import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
const Main = styled.main`
  padding: 2rem 3rem 6.4rem;
  background-color: var(--color-grey-100);
  overflow: scroll;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const StyleContent = styled.div`
  min-width: 60rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />
      <Main>
        <StyleContent>
          <Outlet />
        </StyleContent>
      </Main>
    </StyledAppLayout>
  );
}
