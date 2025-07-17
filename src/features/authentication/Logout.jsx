import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { HiLogout } from "react-icons/hi";

export default function Logout() {
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const LogoutHandler = async () => {
    setIsLoading(true); // 
    try {
      localStorage.removeItem("jwtToken");
      toast.success("已登出");
      navigate("/login");
    } finally {
      setIsLoading(false); // 
      setIsOpenConfirmDialog(false); 
    }
  };

  return (
    <div>
      <button
        className="icon-button"
        onClick={() => setIsOpenConfirmDialog(true)}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : <HiLogout />}
      </button>
      {isOpenConfirmDialog && (
        <ConfirmDialog
          message="确定要登出？"
          onClose={() => setIsOpenConfirmDialog(false)}
          onConfirm={LogoutHandler}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
