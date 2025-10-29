import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarGeneral from './components/Navbar/NavbarGeneral';
import Suscribirse from './components/Home/Suscribirse/Suscribirse';
import { useUser } from './context/UserContext';
import Home from './components/Home/Home';
import Productos from './components/Productos/Productos';
import PuntosVenta from './components/PuntosVenta/PuntosVenta';
import Recetas from './components/Recetas/Recetas';
import AboutUs from './components/AboutUs/AboutUs';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser(); // ⚠️ aún no lo usas, pero lo dejamos por si luego lo necesitas

  return (
    <Router>
      <div className="app-container">
        <NavbarGeneral onOpenLogin={() => setIsModalOpen(true)} />

        {isModalOpen && <Suscribirse onClose={() => setIsModalOpen(false)} />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos/:categoria" element={<Productos />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/PuntosVenta" element={<PuntosVenta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
