import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ user, children }) => {
  const navigate = useNavigate();

  if (user) {
    return children;
  } else {
    navigate("/auth/login");
  }
};

export default ProtectRoute;
