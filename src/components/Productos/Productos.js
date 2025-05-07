import React from 'react';
import { useParams } from 'react-router-dom';
import Titulo from '../Home/Titulo/Titulo';
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
    { id: 1, nombre: 'CarneMolida', precio: '$15.000/kg', imagen: imagenesRes['CarneMolida'] },
    { id: 2, nombre: 'CostillaRes', precio: '$18.000/kg', imagen: imagenesRes['CostillaRes'] },
    { id: 3, nombre: 'Picana', precio: '$22.000/kg', imagen: imagenesRes['Picaña'] },
    { id: 4, nombre: 'PuntaDeAnca', precio: '$25.000/kg', imagen: imagenesRes['PuntaAnca'] },
    { id: 5, nombre: 'Ribeye', precio: '$30.000/kg', imagen: imagenesRes['Ribeye'] },
    { id: 6, nombre: 'Tomahawk', precio: '$27.000/kg', imagen: imagenesRes['Tomahawk'] },
  ],
  pollo: [
    { id: 1, nombre: 'Pechuga de pollo', precio: '$12.000/kg', imagen: imagenesPollo['Pechugas'] },
    { id: 2, nombre: 'Muslo de pollo', precio: '$10.000/kg', imagen: imagenesPollo['Muslos'] },
    { id: 3, nombre: 'Alas de pollo', precio: '$8.000/kg', imagen: imagenesPollo['Alas'] },
    { id: 4, nombre: 'Pollo de Campo', precio: '$8.000/kg', imagen: imagenesPollo['PolloCompleto'] },
    { id: 5, nombre: 'Menudencias', precio: '$8.000/kg', imagen: imagenesPollo['Menudencias'] },
    { id: 6, nombre: 'Pernil de Pollo', precio: '$8.000/kg', imagen: imagenesPollo['PernilPollo'] },
  ],
  cerdo: [
    { id: 1, nombre: 'Costillas de cerdo', precio: '$20.000/kg', imagen: imagenesCerdo['CostillasCerdo']  },
    { id: 2, nombre: 'Lomo de cerdo', precio: '$18.000/kg', imagen: imagenesCerdo['LomoCerdo']  },
    { id: 3, nombre: 'Chuletas de cerdo', precio: '$22.000/kg', imagen: imagenesCerdo['ChuletasCerdo'] },
    { id: 4, nombre: 'Panceta', precio: '$22.000/kg', imagen: imagenesCerdo['Panceta'] },
    { id: 5, nombre: 'Pierna de Cerdo', precio: '$22.000/kg', imagen: imagenesCerdo['PiernaCerdo'] },
    { id: 6, nombre: 'Solomillo', precio: '$22.000/kg', imagen: imagenesCerdo['Solomillo'] },
  ],
  pescado: [
    { id: 1, nombre: 'Salmón', precio: '$40.000/kg', imagen: imagenesPescado['Salmon'] },
    { id: 2, nombre: 'Trucha', precio: '$35.000/kg', imagen: imagenesPescado['Trucha'] },
    { id: 3, nombre: 'Atún', precio: '$50.000/kg', imagen: imagenesPescado['Atun'] },
    { id: 4, nombre: 'Bocachico', precio: '$50.000/kg', imagen: imagenesPescado['Bocachico'] },
    { id: 5, nombre: 'Mojarra', precio: '$50.000/kg', imagen: imagenesPescado['Mojarra'] },
    { id: 6, nombre: 'Bagre', precio: '$50.000/kg', imagen: imagenesPescado['Bagre'] },
  ],
};

export default function Productos() {
  const { categoria } = useParams();
  // para filtrar productos según la categoría seleccionada
  const productosCategoria = productos[categoria] || [];

  return (
    <div>
        <Titulo /> {}
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
                    <p className="subtitle is-6">{producto.precio}</p>
                    <button 
                      className="button is-primary is-fullwidth mt-3"
                      onClick={() => alert(`"${producto.nombre}" agregado al carrito`)}
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
    </div>
  );
}
