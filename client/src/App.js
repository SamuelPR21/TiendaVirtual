import React from 'react';
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Productos from './components/Productos/Productos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:categoria" element={<Productos />} />
      </Routes>
    </Router>
  );
}

export default App;
