import React from 'react';
import 'bulma/css/bulma.min.css';
import Titulo from '../Home/Titulo/Titulo';
import Footer from '../Home/Footer/Footer';
import './Recetas.css';

const importarImagenes = (contexto) => {
  const imagenes = {};
  contexto.keys().forEach((nombre) => {
    const key = nombre.replace('./', '').replace(/\.(png|jpe?g|svg)$/, '');
    imagenes[key] = contexto(nombre);
  });
  return imagenes;
};

const imagenes = importarImagenes(require.context('./Imgrecetas', false, /\.(png|jpe?g|svg)$/));

// Galería
const galeria = [
  imagenes['receta11'],
  imagenes['receta12'],
  imagenes['|receta13'],
  imagenes['receta14'],
  imagenes['receta15'],
  imagenes['receta1'],
  imagenes['receta2'],
  imagenes['receta3'],
  imagenes['receta4'],
  imagenes['receta5'],
  imagenes['receta11'],
  imagenes['receta12'],
  imagenes['|receta13'],
  imagenes['receta14'],
  imagenes['receta15'],
];

// Recetas
const recetasTop = [
  { titulo: 'Pizza Margarita', descripcion: 'Pizza con mozzarella y albahaca.', imagen: imagenes['receta1'] },
  { titulo: 'Arepas Rellenas', descripcion: 'Plato tradicional colombiano.', imagen: imagenes['receta2'] },
  { titulo: 'Tacos Mexicanos', descripcion: 'Tortilla con carne y vegetales.', imagen: imagenes['receta3'] },
  { titulo: 'Sushi Variado', descripcion: 'Rollos japoneses con pescado.', imagen: imagenes['receta4'] },
  { titulo: 'Lasaña', descripcion: 'Capas de pasta con carne y queso.', imagen: imagenes['receta5'] },
  { titulo: 'Hamburguesa Clásica', descripcion: 'Carne, pan, lechuga y tomate.', imagen: imagenes['receta6'] },
  { titulo: 'Ensalada César', descripcion: 'Ensalada fresca con pollo.', imagen: imagenes['receta7'] },
  { titulo: 'Ceviche Peruano', descripcion: 'Pescado cocido en limón.', imagen: imagenes['receta8'] },
  { titulo: 'Churros con Chocolate', descripcion: 'Postre frito con azúcar.', imagen: imagenes['receta9'] },
  { titulo: 'Panqueques', descripcion: 'Dulces con miel o frutas.', imagen: imagenes['receta10'] },
];

const RecetasPage = () => {
  return (
    <div>
      <Titulo />

      {/* Banner con imagen de fondo */}
      <section
        className="hero is-primary is-medium hero-banner"
        style={{
          backgroundImage: `url(${imagenes['banner']})`, 
        }}
      >
      </section>

      {/* Galería horizontal */}
      <section className="section">
        <h2 className="title is-4">Galería de imágenes</h2>
        <div className="horizontal-gallery">
          {galeria.map((img, index) => (
            <div key={index} className="column is-narrow">
              <figure className="image is-128x128">
                <img src={img} alt={`Imagen ${index + 1}`} />
              </figure>
            </div>
          ))}
        </div>
      </section>

      {/* Top 10 Recetas con tarjetas que se voltean */}
      <section className="section">
        <h2 className="title is-4">Top 10 Recetas</h2>
        <div className="columns is-multiline">
          {recetasTop.map((receta, index) => (
            <div key={index} className="column is-4">
<div key={index} className="column is-4">
  <div className="flip-card">
    <div className="flip-card-inner">
      {/* Lado frontal de la tarjeta */}
      <div className="flip-card-front">
        <figure className="image is-4by3">
          <img src={receta.imagen} alt={receta.titulo} />
        </figure>
        <p className="title is-5 has-text-centered">{receta.titulo}</p>
      </div>

      {/* Lado posterior de la tarjeta */}
      <div className="flip-card-back">
        <div className="content">
          <p className="title is-6">{receta.titulo}</p>
          <p>{receta.descripcion}</p>
        </div>
      </div>
    </div>
  </div>
</div>
            </div>

          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RecetasPage;