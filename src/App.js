import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "components/Header";

import Info from "pages/Info";
import LibraryPage from "pages/LibraryPage";
import Training from "pages/Training";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </>
  );
}

export default App;
