import React, { useEffect, useRef } from 'react';
import 'glider-js/glider.min.css';
import '../Carrusel/Carrusel.css';
import Glider from 'glider-js';
import res from '../Carrusel/res.jpeg'
import cerdo from '../Carrusel/cerdo.jpeg';
import pollo from '../Carrusel/pollo.jpeg';
import pescado from '../Carrusel/pescado.jpeg';


export default function Carrusel() {
  const gliderRef = useRef(null);

  useEffect(() => {
    new Glider(gliderRef.current, {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      dots: '#dots',
      arrows: {
        prev: '#glider-prev',
        next: '#glider-next'
      }
    });
  }, []);

  return (
    <section className="section">
      <div className="glider-container">
        <div className="glider" ref={gliderRef}>
          <div>
            <img src={res} alt="Imagen 1" />
          </div>
          <div>
            <img src={cerdo} alt="Imagen 2" />
          </div>
          <div>
             <img src={pescado} alt="Imagen 3" />
            </div>
          
        </div>
        <button id="glider-prev" className="glider-prev">«</button>
        <button id="glider-next" className="glider-next">»</button>
        <div id="dots"></div>
      </div>
    </section>
  );
}
