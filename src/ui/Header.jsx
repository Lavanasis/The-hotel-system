import { HiUserCircle } from 'react-icons/hi2'; // 更适合作为“查看个人信息”的 icon
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';
// 整体 Header 样式
const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  background-color: --color-grey-0;
  padding: 0.6rem 1.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  border-left: 1px solid var(--color-grey-100);
`;

// 用户信息块样式
const UserInfo = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--color-grey-700);
  padding: 0 2rem;
`;

// 头像样式
const Avatar = styled.img`
  margin: 0;
  padding: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;

export default function Header() {
  const navigate = useNavigate();

  // 用 state 管理 username 和 avatar
  const [userInfo, setUserInfo] = useState({
    username: localStorage.getItem('username'),
    avatar: localStorage.getItem('avatar') || 'https://i.pravatar.cc/300',
  });

  // 每次组件加载和 window.localStorage 变化时更新
  useEffect(() => {
    const handleStorageChange = () => {
      setUserInfo({
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar') || 'https://i.pravatar.cc/300',
      });
    };

    // 监听自定义事件（来自更新用户页面）
    window.addEventListener('user-updated', handleStorageChange);

    return () => {
      window.removeEventListener('user-updated', handleStorageChange);
    };
  }, []);

  return (
    <StyledHeader>
      <UserInfo>
        <Avatar src={userInfo.avatar} alt="用户头像" />
        <span>{userInfo.username}</span>
      </UserInfo>

      <button className="icon-button" onClick={() => navigate('/account')}>
        <HiUserCircle />
      </button>
      <DarkModeToggle />
      <Logout />
    </StyledHeader>
  );
}
