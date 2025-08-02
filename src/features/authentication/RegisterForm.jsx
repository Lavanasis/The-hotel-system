import { useState } from 'react';
import { useRegisterMutation } from '../../services/RegisterApi';
import toast from 'react-hot-toast';
import { FormContainer, FormRow, Label, Input, Button } from '../../styles/LoginFormStyles';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const ChangeHandler = e => {
    const { name, value } = e.target; //获取输入框的name属性和用户输入的内容
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const SubmitHandler = async e => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username) {
      toast.error('请输入用户名！');
      return;
    } else if (!email) {
      toast.error('请输入邮箱！');
      return;
    } else if (!password) {
      toast.error('请输入密码！');
      return;
    }

    try {
      const { username, email, password } = formData;
      const res = await register({ username, email, password }).unwrap();
      toast.success('注册成功！');
      localStorage.setItem('jwtToken', res.jwt);
      navigate('/login');
    } catch (err) {
      toast.error('注册失败：' + (err?.data?.error?.message || '未知错误'));
    }
  };

  return (
    <FormContainer onSubmit={SubmitHandler}>
      <FormRow>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          autoComplete="username"
          value={formData.username}
          onChange={ChangeHandler}
          required
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={ChangeHandler}
          required
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={ChangeHandler}
          required
        />
      </FormRow>
      <Button type="submit" disabled={isLoading}>
        {!isLoading ? 'Sign up' : 'Loading...'}
      </Button>
    </FormContainer>
  );
}

export default RegisterForm;
