import React from 'react';
import './PuntosVenta.css';
import NavbarGeneral from '../Navbar/NavbarGeneral';
import Footer from '../Home/Footer/Footer';

const importarImagenes = (contexto) => {
  const imagenes = {};
  contexto.keys().forEach((nombre) => {
    const key = nombre.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
    imagenes[key] = contexto(nombre);
  });
  return imagenes;
};

const imagenesPuntos = importarImagenes(require.context('./imgPuntos', false, /\.(png|jpe?g|svg)$/));


const puntos = [
  {
    nombre: 'Sucursal Norte',
    direccion: 'Calle 123 #45-67, Bogotá',
    telefono: '301 123 4567',
    imagen: imagenesPuntos['Carniceria1'],
  },
  {
    nombre: 'Sucursal Centro',
    direccion: 'Cra 10 #20-30, Medellín',
    telefono: '302 765 4321',
    imagen: imagenesPuntos['Carniceria2'],
  },
  {
    nombre: 'Sucursal Sur',
    direccion: 'Av. 1ra #10-10, Cali',
    telefono: '300 111 2222',
    imagen: imagenesPuntos['Carniceria3'],
  },
];

function PuntosVenta() {
  return (
    <div className="main-container">
      <NavbarGeneral />
    <section className="puntos-venta-container">
      <div className="content">
        <br />
        <br />
        <h1 className="title has-text-centered">Nuestros Puntos de Venta</h1>

        <div className="columns is-multiline">
          {puntos.map((punto, index) => (
            <div className="column is-one-third" key={index}>
              <div className="card punto-card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={punto.imagen} alt={punto.nombre} />
                  </figure>
                </div>
                <div className="card-content">
                  <p className="title is-5">{punto.nombre}</p>
                  <p><strong>Dirección:</strong> {punto.direccion}</p>
                  <p><strong>Teléfono:</strong> {punto.telefono}</p>
                </div>
                <footer className="card-footer">
                  <a href={`tel:${punto.telefono.replace(/\s/g, '')}`} className="card-footer-item button is-link is-light">
                    Llamar
                  </a>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(punto.direccion)}`} target="_blank" rel="noreferrer" className="card-footer-item button is-info is-light">
                    Ver en mapa
                  </a>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer className="footer" />
    </div>
  );
}

export default PuntosVenta;
