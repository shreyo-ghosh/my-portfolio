import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import ChatBot from "./ChatBot";
import BlogAgent from "./BlogAgent";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/chatbot" className="nav-link">ChatBot</Link>
          <Link to="/blog-agent" className="nav-link">Blog Agent</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/blog-agent" element={<BlogAgent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
