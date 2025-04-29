import React, { useEffect, useRef } from 'react';
import 'glider-js/glider.min.css';
import '../Carrusel/Carrusel.css';
import Glider from 'glider-js';
import imagne from '../Titulo/Portada.jpeg';

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
            <img src={imagne} alt="Imagen 1" />
          </div>
          <div>
            <img src={imagne} alt="Imagen 2" />
           </div>
          
           <div>
             <img src={imagne} alt="Imagen 3" />
            </div>
        </div>
        <button id="glider-prev" className="glider-prev">«</button>
        <button id="glider-next" className="glider-next">»</button>
        <div id="dots"></div>
      </div>
    </section>
  );
}
