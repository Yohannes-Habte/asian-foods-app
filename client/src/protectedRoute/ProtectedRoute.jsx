import { useContext } from "react";
import { UserContext } from "../context/user/UserProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  } else if (user && user.is_admin === false) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
