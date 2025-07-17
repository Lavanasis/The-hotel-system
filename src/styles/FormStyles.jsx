import styled from "styled-components";

export const FormContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  background-color: var(--color-grey-0);
`;

export const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const FileInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledFileInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

export const FileLabel = styled.div`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  font-size: 1.4rem;
  background: var(--color-grey-0);
  flex: 1;
  color: var(--color-grey-700);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  font-weight: 600;
  color: var(--color-grey-700);
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  font-size: 1.4rem;
`;

export const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  font-size: 1.4rem;
  resize: vertical;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

export const Button = styled.button`
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 5px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;

  &.submit {
    background-color: var(--color-grey-400);
    color: var(--color-grey-900);
  }

  &.cancel {
    background-color: var(--color-grey-200);
    color: var(--color-grey-700);
  }
`;
