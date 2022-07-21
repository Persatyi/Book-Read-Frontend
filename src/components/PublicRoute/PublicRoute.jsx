import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { isAuth } from "redux/auth/authSelectors";

const PublicRoute = () => {
  const isLoggedIn = useSelector(isAuth);

  if (isLoggedIn) {
    return <Navigate to="/library" />;
  }
  return <Outlet />;
};

export default PublicRoute;
