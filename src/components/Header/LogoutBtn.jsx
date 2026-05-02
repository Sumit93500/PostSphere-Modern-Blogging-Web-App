import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await authService.logout();
    dispatch(logout());
    window.location.reload(); 
  };

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;