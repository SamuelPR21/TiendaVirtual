import React from "react";
import Titulo from "./Titulo/Titulo"
import Carrusel from "../Home/Carrusel/Carrusel";
import Promociones from "../Home/Promociones/Promociones";
import Footer from "../Home/Footer/Footer"; 
import FloatingCart from "../Home/Carrito/FloatingCart";
import Despiece from "../Home/Despiece/Despiece";
import './Home.css';

export default function Home() {
    return(
        <main className="home-container">
            <FloatingCart/>
            <Titulo/>
            <Carrusel/>
            <Promociones/>
            <Despiece/>
            <Footer/>
        </main>
    )
}