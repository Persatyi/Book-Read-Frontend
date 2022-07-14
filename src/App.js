// import { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Container from "components/Container";
import Header from "components/Header";

import Info from "pages/Info";
import Library from "pages/Library";
import Training from "pages/Training";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="/library" element={<Library />} />
        <Route path="/training" element={<Training />} />
      </Routes>
    </Container>
  );
}

export default App;
