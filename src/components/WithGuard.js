import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const WithGuard = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return children;
};

export default WithGuard;
