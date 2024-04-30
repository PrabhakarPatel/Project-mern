import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Savedrecipes from "./pages/saved-recipes.jsx";
import Auth from "./pages/auth.jsx";
import Createrecipes from "./pages/create-recipes.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipes" element={<Createrecipes />} />
          <Route path="/save-recipes" element={<Savedrecipes />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
