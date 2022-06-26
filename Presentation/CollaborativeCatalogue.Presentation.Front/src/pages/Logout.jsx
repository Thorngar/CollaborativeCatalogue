import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import isConnectContext from "../services/isConnect.context";

const Logout = () => {
  const { logout } = authService;
  const { setIsConnect } = useContext(isConnectContext);
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    setIsConnect(false);
    navigate("/ConnectForm");
  });
  return <div />;
};

export default Logout;
