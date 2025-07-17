import styled from "styled-components";
import RegisterForm from "../features/authentication/RegisterForm";
import Logo from "../ui/Logo";
import Heading from "../styles/Heading";

const RegisterLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: var(--color-grey-50);
  padding: 5rem 5rem;
`;

function Register() {
  return (
    <RegisterLayout>
      <Logo />
      <Heading>Log in to your account</Heading>
      <RegisterForm />
    </RegisterLayout>
  );
}

export default Register;
