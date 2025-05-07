import React from 'react';
import 'bulma/css/bulma.min.css';
import { useParams } from 'react-router-dom';
import Titulo from '../Home/Titulo/Titulo';
import Footer from '../Home/Footer/Footer';
import FloatingCart from "../Home/Carrito/FloatingCart";
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
    { id: 1, nombre: 'CarneMolida', precio: '15000', imagen: imagenesRes['CarneMolida'] },
    { id: 2, nombre: 'CostillaRes', precio: '18000', imagen: imagenesRes['CostillaRes'] },
    { id: 3, nombre: 'Picana', precio: '22000', imagen: imagenesRes['Picaña'] },
    { id: 4, nombre: 'PuntaDeAnca', precio: '25000', imagen: imagenesRes['PuntaAnca'] },
    { id: 5, nombre: 'Ribeye', precio: '30000', imagen: imagenesRes['Ribeye'] },
    { id: 6, nombre: 'Tomahawk', precio: '27000', imagen: imagenesRes['Tomahawk'] },
  ],
  pollo: [
    { id: 7, nombre: 'Pechuga de pollo', precio: '12000', imagen: imagenesPollo['Pechugas'] },
    { id: 8, nombre: 'Muslo de pollo', precio: '10000', imagen: imagenesPollo['Muslos'] },
    { id: 9, nombre: 'Alas de pollo', precio: '8000', imagen: imagenesPollo['Alas'] },
    { id: 10, nombre: 'Pollo de Campo', precio: '8000', imagen: imagenesPollo['PolloCompleto'] },
    { id: 11, nombre: 'Menudencias', precio: '8000', imagen: imagenesPollo['Menudencias'] },
    { id: 12, nombre: 'Pernil de Pollo', precio: '8000', imagen: imagenesPollo['PernilPollo'] },
  ],
  cerdo: [
    { id: 13, nombre: 'Costillas de cerdo', precio: '20000', imagen: imagenesCerdo['CostillasCerdo'] },
    { id: 14, nombre: 'Lomo de cerdo', precio: '18000', imagen: imagenesCerdo['LomoCerdo'] },
    { id: 15, nombre: 'Chuletas de cerdo', precio: '22000', imagen: imagenesCerdo['ChuletasCerdo'] },
    { id: 16, nombre: 'Panceta', precio: '22000', imagen: imagenesCerdo['Panceta'] },
    { id: 17, nombre: 'Pierna de Cerdo', precio: '22000', imagen: imagenesCerdo['PiernaCerdo'] },
    { id: 18, nombre: 'Solomillo', precio: '22000', imagen: imagenesCerdo['Solomillo'] },
  ],
  pescado: [
    { id: 19, nombre: 'Salmón', precio: '40000', imagen: imagenesPescado['Salmon'] },
    { id: 20, nombre: 'Trucha', precio: '35000', imagen: imagenesPescado['Trucha'] },
    { id: 21, nombre: 'Atún', precio: '50000', imagen: imagenesPescado['Atun'] },
    { id: 22, nombre: 'Bocachico', precio: '50000', imagen: imagenesPescado['Bocachico'] },
    { id: 23, nombre: 'Mojarra', precio: '50000', imagen: imagenesPescado['Mojarra'] },
    { id: 24, nombre: 'Bagre', precio: '50000', imagen: imagenesPescado['Bagre'] },
  ],
};

export default function Productos() {
  const { categoria } = useParams();
  const { addToCart } = useCart();
  // para filtrar productos según la categoría seleccionada
  const productosCategoria = productos[categoria] || [];

  return (
    <div>
      <FloatingCart />
      <Titulo /> { }
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">{`Productos de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`}</h1>
          <div className="columns is-multiline">
            {productosCategoria.map((producto) => (
              <div className="column is-one-third" key={producto.id}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={producto.imagen} alt={producto.nombre} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <p className="title is-5">{producto.nombre}</p>
                    <p className="subtitle is-6">$ {producto.precio} /Kg</p>
                    <button
                      className="button is-primary is-fullwidth mt-3"
                      onClick={() => addToCart(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer /> { }
    </div>
  );
}
