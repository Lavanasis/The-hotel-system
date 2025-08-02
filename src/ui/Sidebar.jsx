import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
const StyledSiderbar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: --color-grey-0;
  padding: 3.2rem 2rem;
  grid-row: 1 /-1;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
`;

export default function Sidebar() {
  return (
    <StyledSiderbar>
      <Logo />
      <Title>THE WILD OASIS</Title>
      <MainNav />
    </StyledSiderbar>
  );
}
