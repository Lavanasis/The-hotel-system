import styled from 'styled-components';
const StyledLogo = styled.img`
  height: 9.6rem;
  width: auto;
  display: block;
  margin: 0 auto;
`;
export default function Logo() {
  return <StyledLogo src="/logo.png" alt="logo" />;
}
