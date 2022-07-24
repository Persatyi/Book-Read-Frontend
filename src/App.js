import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { token, setToken, setIsAuth } from "redux/auth";

import Loader, { TYPES as LOADER_TYPES } from "components/Loader";
// import Header from "components/Header";
// import Register from "pages/Register";
// import Login from "pages/Login";
// import Home from "pages/Home";
// import Library from "pages/Library";
// import Training from "pages/Training";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";
import QueryErrorHandler from "components/QueryErrorHandler";

const Register = lazy(() => import("pages/Register"));
const Login = lazy(() => import("pages/Login"));
const Home = lazy(() => import("pages/Home"));
const Training = lazy(() => import("pages/Training"));
const Library = lazy(() => import("pages/Library"));
const Header = lazy(() => import("components/Header"));

function App() {
  const dispatch = useDispatch();
  const currentToken = useSelector(token);

  useEffect(() => {
    if (!currentToken) return;
    dispatch(setToken(currentToken));
    dispatch(setIsAuth(true));
  }, [currentToken, dispatch]);

  return (
    <>
      <Suspense fallback={<Loader type={LOADER_TYPES.FULLSCREEN} />}>
        <Header />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/library" element={<Library />} />
            <Route path="/training" element={<Training />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <QueryErrorHandler />
      </Suspense>
    </>
  );
}

export default App;
