import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { useParams } from 'react-router-dom';
import NavbarGeneral from '../Navbar/NavbarGeneral';
import Footer from '../Home/Footer/Footer';
import { useCart } from '../../context/CartContext';
import './Productos.css';

const importarImagenes = (contexto) => {
  const imagenes = {};
  contexto.keys().forEach((nombre) => {
    const key = nombre.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
    imagenes[key] = contexto(nombre);
  });
  return imagenes;
};

const imagenesRes = importarImagenes(require.context('./imgProductos/imgRes', false, /\.(png|jpe?g|svg)$/));
const imagenesPollo = importarImagenes(require.context('./imgProductos/imgPollo', false, /\.(png|jpe?g|svg)$/));
const imagenesCerdo = importarImagenes(require.context('./imgProductos/imgCerdo', false, /\.(png|jpe?g|svg)$/));
const imagenesPescado = importarImagenes(require.context('./imgProductos/imgPescado', false, /\.(png|jpe?g|svg)$/));

const productos = {
  res: [
    { id: 1, nombre: 'CarneMolida', precio: '15000', imagen: imagenesRes['CarneMolida'], descripcion: 'Carne molida de res, Ideal para preparar albóndigas, hamburguesas o salsas. 100% carne de res magra y fresca.' },
    { id: 2, nombre: 'CostillaRes', precio: '18000', imagen: imagenesRes['CostillaRes'], descripcion: 'Costilla de res,  Jugosa y con buen marmoleo, perfecta para asados o sopas tradicionales.' },
    { id: 3, nombre: 'Picana', precio: '22000', imagen: imagenesRes['Picaña'], descripcion: 'Picaña, Corte premium con gran sabor, excelente para parrillas y cortes a la brasa.' },
    { id: 4, nombre: 'PuntaDeAnca', precio: '25000', imagen: imagenesRes['PuntaAnca'], descripcion: 'Punta de Anca, Corte tierno y jugoso, especial para asar o preparar a la plancha.' },
    { id: 5, nombre: 'Ribeye', precio: '30000', imagen: imagenesRes['Ribeye'], descripcion: 'Ribeye, Corte gourmet con gran marmoleo, ideal para un asado jugoso y lleno de sabor.' },
    { id: 6, nombre: 'Tomahawk', precio: '27000', imagen: imagenesRes['Tomahawk'], descripcion: 'Tomahawk, Corte impresionante tipo gourmet, con hueso largo, ideal para sorprender en la parrilla.' },
  ],
  pollo: [
    { id: 7, nombre: 'Pechuga de pollo', precio: '12000', imagen: imagenesPollo['Pechugas'], descripcion: 'Pechuga de pollo, Corte magro y tierno, ideal para asar, cocinar al horno o preparar a la plancha.' },
    { id: 8, nombre: 'Muslo de pollo', precio: '10000', imagen: imagenesPollo['Muslos'], descripcion: 'Muslo de pollo, Corte jugoso y tierno, ideal para asar o preparar al horno.' },
    { id: 9, nombre: 'Alas de pollo', precio: '8000', imagen: imagenesPollo['Alas'], descripcion: 'Alas de pollo, Perfectas para asar o preparar al horno, ideales para picar.' },
    { id: 10, nombre: 'Pollo de Campo', precio: '8000', imagen: imagenesPollo['PolloCompleto'], descripcion: 'Pollo de campo, Pollo criado libremente, con un sabor y textura inigualables, ideal para asar o preparar al horno.' },
    { id: 11, nombre: 'Menudencias', precio: '8000', imagen: imagenesPollo['Menudencias'], descripcion: 'Menudencias de pollo, Incluye hígado, corazón y mollejas, ideales para preparar guisos o sopas.' },
    { id: 12, nombre: 'Pernil de Pollo', precio: '8000', imagen: imagenesPollo['PernilPollo'], descripcion: 'Pernil de pollo, Corte jugoso y tierno, ideal para asar o preparar al horno.' },
  ],
  cerdo: [
    { id: 13, nombre: 'Costillas de cerdo', precio: '20000', imagen: imagenesCerdo['CostillasCerdo'], descripcion: 'Costillas de cerdo, Jugosas y con buen sabor, perfectas para asar o preparar a la parrilla.' },
    { id: 14, nombre: 'Lomo de cerdo', precio: '18000', imagen: imagenesCerdo['LomoCerdo'], descripcion: 'Lomo de cerdo, Corte magro y tierno, ideal para asar o preparar al horno.' },
    { id: 15, nombre: 'Chuletas de cerdo', precio: '22000', imagen: imagenesCerdo['ChuletasCerdo'], descripcion: 'Chuletas de cerdo, Corte jugoso y tierno, ideal para asar o preparar a la parrilla.' },
    { id: 16, nombre: 'Panceta', precio: '22000', imagen: imagenesCerdo['Panceta'], descripcion: 'Panceta de cerdo, Corte con buen marmoleo, ideal para asar o preparar a la parrilla.' },
    { id: 17, nombre: 'Pierna de Cerdo', precio: '22000', imagen: imagenesCerdo['PiernaCerdo'], descripcion: 'Pierna de cerdo, Corte jugoso y tierno, ideal para asar o preparar al horno.' },
    { id: 18, nombre: 'Solomillo', precio: '22000', imagen: imagenesCerdo['Solomillo'], descripcion: 'Solomillo de cerdo, Corte premium con gran sabor, ideal para asar o preparar a la parrilla.' },
  ],
  pescado: [
    { id: 19, nombre: 'Salmón', precio: '40000', imagen: imagenesPescado['Salmon'], descripcion: 'Salmón, Pescado de agua fría, rico en omega-3, ideal para asar o preparar al horno.' },
    { id: 20, nombre: 'Trucha', precio: '35000', imagen: imagenesPescado['Trucha'], descripcion: 'Trucha, Pescado de agua dulce, ideal para asar o preparar al horno.' },
    { id: 21, nombre: 'Atún', precio: '50000', imagen: imagenesPescado['Atun'], descripcion: 'Atún, Pescado de agua fría, rico en omega-3, ideal para asar o preparar al horno.' },
    { id: 22, nombre: 'Bocachico', precio: '50000', imagen: imagenesPescado['Bocachico'], descripcion: 'Bocachico, Pescado de agua dulce, ideal para asar o preparar al horno.' },
    { id: 23, nombre: 'Mojarra', precio: '50000', imagen: imagenesPescado['Mojarra'], descripcion: 'Mojarra, Pescado de agua dulce, ideal para asar o preparar al horno.' },
    { id: 24, nombre: 'Bagre', precio: '50000', imagen: imagenesPescado['Bagre'], descripcion: 'Bagre, Pescado de agua dulce, ideal para asar o preparar al horno.' },
  ],
};

export default function Productos() {
  const { categoria } = useParams();
  const { addToCart } = useCart();
  const productosCategoria = productos[categoria] || [];

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setMostrarModal(false);
  };

  return (
    <div>
      <NavbarGeneral />

      <br />
      <br />

      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">{`Productos de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`}</h1>
          <div className="columns is-multiline">
            {productosCategoria.map((producto) => (
              <div className="column is-one-third" key={producto.id}>
                <div className="card">
                  <div
                    className="card-image"
                    style={{ cursor: 'pointer' }}
                    onClick={() => abrirModal(producto)}
                  >
                    <figure className="image is-4by3">
                      <img src={producto.imagen} alt={producto.nombre} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <p
                      className="title is-5"
                      style={{ cursor: 'pointer' }}
                      onClick={() => abrirModal(producto)}
                    >
                      {producto.nombre}
                    </p>
                    <p className="subtitle is-6">$ {producto.precio} /Kg</p>
                    <button
                      className="button is-primary"
                      onClick={() => addToCart(producto)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mostrarModal && productoSeleccionado && (
        <div className="modal is-active">
          <div className="modal-background" onClick={cerrarModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{productoSeleccionado.nombre}</p>
              <button className="delete" aria-label="close" onClick={cerrarModal}></button>
            </header>
            <section className="modal-card-body">
              <figure className="image is-4by3 mb-3">
                <img src={productoSeleccionado.imagen} alt={productoSeleccionado.nombre} />
              </figure>
              <p><strong>Precio:</strong> ${productoSeleccionado.precio} /Kg</p>
              <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>
                      <button
          className="button is-primary is-fullwidth mt-3"
          onClick={() => {
            addToCart(productoSeleccionado);
            cerrarModal();
          }}
        >
          Agregar al carrito
        </button>
            </section>
            
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
