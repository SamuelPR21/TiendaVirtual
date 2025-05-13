import React from "react";
import Titulo from "./Titulo/Titulo"
import Carrusel from "../Home/Carrusel/Carrusel";
import Promociones from "../Home/Promociones/Promociones";
import Footer from "../Home/Footer/Footer"; 
import FloatingCart from "../Home/Carrito/FloatingCart";
import './Home.css';

export default function Home() {
    return(
        <main className="home-container">
            <FloatingCart/>
            <Titulo/>
            <Carrusel/>
            <Promociones/>
            <Footer/>
        </main>
    )
}