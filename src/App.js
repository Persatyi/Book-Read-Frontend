// import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "components/Header";

import Info from "pages/Info";
import Library from "pages/Library";
import Training from "pages/Training";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/library" element={<Library />} />
        <Route path="/training" element={<Training />} />
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
