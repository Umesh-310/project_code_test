import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../store/authSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser(dispatch, navigate);
  }, [dispatch, navigate]);

  return <>Logout</>;
};

export default LogoutPage;
