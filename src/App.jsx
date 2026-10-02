import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BlogAgent from "./BlogAgent";
import Desk from "./Desk";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogAgent />} />
        <Route path="/desk" element={<Desk />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
