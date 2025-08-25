import { useState } from 'react';
import { FormContainer, FormRow, Label, Input, Button } from '../../styles/LoginFormStyles';
import { useLoginMutation } from '../../services/UserApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from '../../styles/FormStyles';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const SubmitHandler = async e => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('请输入邮箱和密码！');
      return;
    }
    try {
      const response = await login({ identifier: email, password }).unwrap();
      setEmail('');
      setPassword('');
      localStorage.setItem('jwtToken', response.jwt);
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('email', response.user.email);
      localStorage.setItem('userId', response.user.id);
      toast.success('登陆成功！');
      navigate('/dashboard');
    } catch (err) {
      toast.error('登录失败，请确定已注册并检查账号密码');
    }
  };

  return (
    <FormContainer onSubmit={SubmitHandler}>
      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <ButtonGroup>
        <Button type="submit" disabled={isLoading}>
          {!isLoading ? 'Log in' : 'Loading...'}
        </Button>
        <Button
          type="button"
          style={{ backgroundColor: 'var(--color-grey-200)' }}
          onClick={() => {
            navigate('/register');
          }}
        >
          Sign up
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
}

export default LoginForm;
