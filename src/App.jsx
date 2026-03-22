import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<div style={{padding: '100px 20px', textAlign: 'center', minHeight: '100vh', background: '#0a0a0f', color: '#e8e8f0'}}><h1>Blog Coming Soon</h1><p>AI automation insights and case studies will be published here.</p><a href="/" style={{color: '#f5a623', textDecoration: 'none'}}>← Back to Home</a></div>} />
      </Routes>
    </Router>
  );
}

export default App;
