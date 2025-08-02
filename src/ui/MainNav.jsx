import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  HiOutlineCalculator,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
} from 'react-icons/hi2';
const StyledNav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0rem 0rem;

  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  border-radius: 0.5rem;
  color: var(--color-grey-600);
  font-weight: 500;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-900);
  }

  &.active {
    background-color: var(--color-grey-400);
    color: var(--color-grey-900);
    font-weight: 900;
  }
`;

export default function MainNav() {
  return (
    <StyledNav>
      <li>
        <StyledNavLink to="/dashboard">
          <HiOutlineHome />
          <span>Home</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/bookings">
          <HiOutlineCalculator />
          <span>Bookings</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/cabins">
          <HiOutlineHomeModern />
          <span>Cabins</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/setting">
          <HiOutlineCog6Tooth />
          <span>Settings</span>
        </StyledNavLink>
      </li>
    </StyledNav>
  );
}
