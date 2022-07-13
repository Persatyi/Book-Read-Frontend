import React from "react";
import { Route, Routes } from "react-router-dom";

import Container from "components/Container";
import Header from "components/Header";

import Info from "pages/Info";
import LibraryPage from "pages/LibraryPage";
import Training from "pages/Training";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </Container>
  );
}

export default App;
