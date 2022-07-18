import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { token, setToken } from "redux/auth";

import Header from "components/Header";
import Register from "pages/Register";
import Login from "pages/Login";
import Home from "pages/Home";
import Library from "pages/Library";
import Training from "pages/Training";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";

function App() {
  const currentToken = useSelector(token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToken(currentToken));
  }, [currentToken, dispatch]);

  return (
    <>
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
    </>
  );
}

export default App;
