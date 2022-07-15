import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { isAuth } from "redux/auth/authSelectors";

const PrivateRoute = () => {
  const isLoggedIn = useSelector(isAuth);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default PrivateRoute;
