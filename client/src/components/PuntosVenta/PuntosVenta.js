import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Footer from '../Home/Footer/Footer';
import './PuntosVenta.css';


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
    lat: 4.710989, 
    lng: -74.072090,
    imagen: imagenesPuntos['Carniceria1'],
  },
  {
    nombre: 'Sucursal Centro',
    direccion: 'Cra 10 #20-30, Medellín',
    telefono: '302 765 4321',
    lat: 6.244203,
    lng: -75.581215,
    imagen: imagenesPuntos['Carniceria2'],
  },
  {
    nombre: 'Sucursal Sur',
    direccion: 'Av. 1ra #10-10, Cali',
    telefono: '300 111 2222',
    lat: 3.451647,
    lng: -76.531985,
    imagen: imagenesPuntos['Carniceria3'],
  },
];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 4.710989,
  lng: -74.072090,
};

function PuntosVenta() {
  const [mapRef, setMapRef] = useState(null);

  const onLoad = map => {
    setMapRef(map);
  };

  const handleVerEnMapa = (lat, lng) => {
    if (mapRef) {
      const target = { lat, lng };


      mapRef.panTo(target);

     
      setTimeout(() => {
        mapRef.setZoom(14); 
      }, 500); 
    }
  };

  return (
    <div className="main-container">
    <br/>
    <br/>
    <br/>
      <section className="section">
        <div className="container has-text-centered">
              <h1 className="title has-text-white">Puntos de Venta</h1>
              <h2 className="subtitle has-text-light">Encuentra nuestras sucursales cerca de ti</h2>
        </div>
        <div className="container">
          <div className="columns is-multiline is-centered">
            {puntos.map((punto, index) => (
              <div className="column is-4" key={index}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={punto.imagen} alt={punto.nombre} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <p className="title is-5">{punto.nombre}</p>
                    <div className="content">
                      <p><strong>Dirección:</strong> {punto.direccion}</p>
                      <p><strong>Teléfono:</strong> {punto.telefono}</p>
                    </div>
                  </div>
                  <footer className="card-footer">
                    <a href={`tel:${punto.telefono.replace(/\s/g, '')}`} 
                       className="card-footer-item button is-link is-light">
                      Llamar
                    </a>
                    <button onClick={() => handleVerEnMapa(punto.lat, punto.lng)} 
                            className="card-footer-item button is-info is-light">
                      Ver en mapa
                    </button>
                  </footer>
                </div>
              </div>
            ))}
          </div>

          <div className="section pt-0">
            <div className="box p-0">
              <LoadScript googleMapsApiKey="AIzaSyCV4XAfdYgw94lNJra617EP2VuY4fCIzZQ">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={defaultCenter}
                  zoom={6}
                  onLoad={onLoad}
                  options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                  }}
                >
                  {puntos.map((punto, index) => (
                    <Marker
                      key={index}
                      position={{ lat: punto.lat, lng: punto.lng }}
                      title={punto.nombre}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PuntosVenta;