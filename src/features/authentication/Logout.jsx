import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../ui/ConfirmDialog';
import { HiLogout } from 'react-icons/hi';
import { useOpen } from '../../hooks/useOpen';
export default function Logout() {
  const { isOpen, open, close } = useOpen();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    setIsLoading(true); //
    try {
      localStorage.removeItem('jwtToken');
      toast.success('已登出');
      navigate('/login');
    } finally {
      setIsLoading(false);
      close();
    }
  };

  return (
    <div>
      <button className="icon-button" onClick={open} disabled={isLoading}>
        {isLoading ? 'Loading...' : <HiLogout />}
      </button>
      {isOpen && (
        <ConfirmDialog
          message="确定要登出？"
          onClose={close}
          onConfirm={LogoutHandler}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
