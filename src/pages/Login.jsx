import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../styles/Heading';
const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: var(--color-grey-50);
  padding: 5rem 5rem;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading>Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
