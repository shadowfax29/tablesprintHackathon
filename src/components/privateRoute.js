import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = Cookies.get("currentUser") ? JSON.parse(Cookies.get("currentUser")) : null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return user ? children : null;
};

export default PrivateRoute;
