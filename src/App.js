import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetTokens } from "redux/auth/sliceAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  token,
  setToken,
  isAuth,
  getRefreshToken,
  loggedOff,
} from "redux/auth";

import {
  useCurrentQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
} from "redux/api/bookAPI";

import Loader from "components/Loader";
// import Header from "components/Header";
// import Register from "pages/Register";
// import Login from "pages/Login";
// import Home from "pages/Home";
// import Library from "pages/Library";
// import Training from "pages/Training";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";

const Register = lazy(() => import("pages/Register"));
const Login = lazy(() => import("pages/Login"));
const Home = lazy(() => import("pages/Home"));
const Training = lazy(() => import("pages/Training"));
const Library = lazy(() => import("pages/Library"));
const Header = lazy(() => import("components/Header"));

function App() {
  const currentToken = useSelector(token);
  const refreshToken = useSelector(getRefreshToken);
  const auth = useSelector(isAuth);
  const dispatch = useDispatch();
  const { error } = useCurrentQuery(null, { skip: !auth });
  const [updateTokens] = useRefreshTokenMutation();

  useEffect(() => {
    dispatch(setToken(currentToken));
    console.log("set token");
  }, [currentToken, dispatch]);

  useEffect(() => {
    (async () => {
      console.log("check token");
      if (error) {
        console.log(error);
      }
      // console.log(error.message);
      if (error && error.data.message === "jwt expired") {
        console.log("jwt expired");
        try {
          const tokens = await updateTokens({ refreshToken }).unwrap();

          dispatch(resetTokens(tokens));
          console.log("reset tokens");
        } catch (error) {
          console.log("logout");
          dispatch(loggedOff());
        }
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // useEffect(() => {
  //   if (tokens) {
  //     dispatch(resetTokens(tokens));
  //     console.log("reset tokens");
  //   }
  // }, [dispatch, tokens]);

  // useEffect(() => {
  //   if (refreshError) {
  //     console.log("~ refreshError", refreshError);

  //   }
  // }, [refreshError]);

  return (
    <>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </>
  );
}

export default App;
