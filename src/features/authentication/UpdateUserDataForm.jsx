import React, { useState, useRef } from "react";
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
} from "../../styles/FormStyles";
import { toast } from "react-hot-toast";
import {
  useChangePasswordMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
  useLazyGetUserQuery, // 新增懒查询hook
} from "../../services/UserApi";
import styled from "styled-components";

const FormItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

function UpdateUserDataForm() {
  const fileInputRef = useRef(null);

  const [uploadImage] = useUploadImageMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [triggerGetUser] = useLazyGetUserQuery(); // 触发查询最新用户信息

  
  const [formData, setFormData] = useState({
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    avatar: localStorage.getItem("avatar") || "https://i.pravatar.cc/300",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(null);

  const ImageChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  function ChangeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function SubmitHandler(e) {
    e.preventDefault();

    const { username, email, currentPassword, newPassword, confirmPassword } =
      formData;
    const userId = localStorage.getItem("userId");

    try {
      const updateData = { username, email };
      if (avatar instanceof File) {
        const formDataImage = new FormData();
        formDataImage.append("files", avatar);
        const imageRes = await uploadImage(formDataImage).unwrap();
        updateData.avatar = imageRes[0].id;
      }

      await updateUser({ id: userId, body: updateData }).unwrap();

      // 如果不修改密码，直接成功结束
      if (!(currentPassword || newPassword || confirmPassword)) {
        const userRes = await triggerGetUser(userId).unwrap();
        updateLocalStorageAndState(userRes);
        toast.success("资料更新成功！");
        return;
      }

      // 有修改密码需求，先校验密码
      if (!currentPassword) {
        toast.error("请输入当前密码！");
        return;
      }
      if (newPassword.length < 6) {
        toast.error("新密码至少6位！");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("新密码与确认密码不一致！");
        return;
      }

      // 先更新资料，再修改密码
      const userRes = await triggerGetUser(userId).unwrap();
      updateLocalStorageAndState(userRes);

      // 修改密码
      await changePassword({
        currentPassword,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      }).unwrap();
      toast.success("密码修改成功！");
    } catch (err) {
      toast.error("操作失败，请检查填入信息是否正确");
    }
  }

  function updateLocalStorageAndState(userRes) {
    localStorage.setItem("username", userRes.username);
    localStorage.setItem("email", userRes.email);
    const newAvatarUrl = userRes.avatar?.url
      ? `http://localhost:1337${userRes.avatar.url}`
      : formData.avatar;
    localStorage.setItem("avatar", newAvatarUrl);

    setFormData((prev) => ({
      ...prev,
      avatar: newAvatarUrl,
    }));
    setAvatar(null);
    window.dispatchEvent(new Event("user-updated"));
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
                  ? formData.avatar.split("/").pop() // 只取最后的文件名
                  : "No image"}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
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
            {isUpdating || isChangingPassword
              ? "Updating..."
              : "Update Account"}
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}

export default UpdateUserDataForm;
