import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MarsPage from "./MarsPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

