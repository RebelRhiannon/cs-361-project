// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import NavBar from './NavBar';
import Home from './Pages/Home';
import About from './Pages/About';

function App() {
  return (
    <Router>
      <div>
        {/* The NavBar will be visible on all pages */}
        <NavBar />

        {/* Define routes for Home and About pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use element prop to render components */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
