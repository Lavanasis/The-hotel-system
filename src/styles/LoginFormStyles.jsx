import styled from 'styled-components';

export const FormContainer = styled.form`
  min-width: 400px;
  padding: 2rem 2.5rem;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 1rem;
`;

export const Input = styled.input`
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1.8px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.25s ease;

  &:focus {
    outline: none;
    border-color: var(--color-grey-400); /* 蓝色焦点 */
  }

  &:disabled {
    background-color: #e5e7eb;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: var(--color-grey-400);
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: var(--color-grey-400);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
  }
`;
