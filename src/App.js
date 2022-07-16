import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "components/Header";
import Register from "pages/Register";
import Login from "pages/Login";
import Info from "pages/Info";
import LibraryPage from "pages/LibraryPage";
import Training from "pages/Training";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Info />} />
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
