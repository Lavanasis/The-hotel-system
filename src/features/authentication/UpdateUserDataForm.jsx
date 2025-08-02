import { useState, useRef, useEffect } from 'react';
import {
  FormContainer,
  Form,
  Label,
  Input,
  Button,
  ButtonGroup,
  FileInputWrapper,
  FileLabel,
  StyledFileInput,
} from '../../styles/FormStyles';
import { toast } from 'react-hot-toast';
import {
  useChangePasswordMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
  useGetUserQuery,
} from '../../services/UserApi';
import styled from 'styled-components';

const FormItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

function UpdateUserDataForm() {
  const fileInputRef = useRef(null);
  const userId = localStorage.getItem('userId');

  const [uploadImage] = useUploadImageMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const { data: userData, isSuccess } = useGetUserQuery(userId);

  const [formData, setFormData] = useState({
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    avatar: localStorage.getItem('avatar') || 'https://i.pravatar.cc/300',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (isSuccess && userData) {
      const newAvatarUrl = userData.avatar?.url
        ? `http://localhost:1337${userData.avatar.url}`
        : formData.avatar;

      setFormData(prev => ({
        ...prev,
        username: userData.username,
        email: userData.email,
        avatar: newAvatarUrl,
      }));

      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('avatar', newAvatarUrl);
      window.dispatchEvent(new Event('user-updated'));
    }
  }, [isSuccess, userData, formData.avatar]);

  const ImageChangeHandler = e => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  function ChangeHandler(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function SubmitHandler(e) {
    e.preventDefault();

    const { username, email, currentPassword, newPassword, confirmPassword } = formData;

    try {
      const updateData = { username, email };
      if (avatar instanceof File) {
        const formDataImage = new FormData();
        formDataImage.append('files', avatar);
        const imageRes = await uploadImage(formDataImage).unwrap();
        updateData.avatar = imageRes[0].id;
      }

      // 如果不修改密码，直接更新资料并结束
      if (!(currentPassword || newPassword || confirmPassword)) {
        await updateUser({
          id: userId,
          body: updateData,
        }).unwrap();
        toast.success('资料更新成功！');
        return;
      }

      // 校验密码相关
      if (!currentPassword) {
        toast.error('请输入当前密码！');
        return;
      }
      if (newPassword.length < 6) {
        toast.error('新密码至少6位！');
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error('新密码与确认密码不一致！');
        return;
      }

      // 更新资料 + 修改密码
      await updateUser({
        id: userId,
        body: updateData,
      }).unwrap();

      await changePassword({
        currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      }).unwrap();

      toast.success('密码修改成功！');
    } catch (err) {
      toast.error('操作失败，请检查填入信息是否正确');
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={SubmitHandler}>
        <FormItem>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={ChangeHandler}
            disabled={isUpdating}
          />
        </FormItem>

        <FormItem>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={ChangeHandler}
            disabled={isUpdating}
          />
        </FormItem>

        <FormItem>
          <Label htmlFor="avatar">Avatar</Label>
          <FileInputWrapper>
            <FileLabel>
              {avatar?.name
                ? avatar.name
                : formData.avatar
                  ? formData.avatar.split('/').pop() // 只取最后的文件名
                  : 'No image'}
              <button type="button" onClick={() => fileInputRef.current?.click()}>
                Add Image
              </button>
            </FileLabel>
            <StyledFileInput
              ref={fileInputRef}
              type="file"
              id="avatar"
              accept="image/*"
              onChange={ImageChangeHandler}
            />
          </FileInputWrapper>
        </FormItem>

        <FormItem>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={ChangeHandler}
            disabled={isChangingPassword}
          />
        </FormItem>

        <FormItem>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={ChangeHandler}
            disabled={isChangingPassword}
          />
        </FormItem>

        <FormItem>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={ChangeHandler}
            disabled={isChangingPassword}
          />
        </FormItem>

        <ButtonGroup>
          <Button type="submit" disabled={isUpdating || isChangingPassword}>
            {isUpdating || isChangingPassword ? 'Updating...' : 'Update Account'}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}

export default UpdateUserDataForm;
