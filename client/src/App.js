import React from 'react';
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Productos from './components/Productos/Productos';
import AboutUs from './components/AboutUs/AboutUs';
import './App.css';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos/:categoria" element={<Productos />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
