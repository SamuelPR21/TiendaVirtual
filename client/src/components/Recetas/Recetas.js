import React from 'react';
import 'bulma/css/bulma.min.css';
import NavbarGeneral from '../Navbar/NavbarGeneral';
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


// Recetas
const recetasTop = [
  { titulo: 'Carne Asada al estilo mexicano', descripcion: 'Jugosa carne de res marinada con limón, ajo y especias, asada a la parrilla para resaltar su sabor', imagen: imagenes['receta1'] },
  { titulo: 'Estofado de Res', descripcion: 'Trozos de carne tierna cocidos lentamente con verduras, ideal para un almuerzo casero y reconfortante.', imagen: imagenes['receta2'] },
  { titulo: 'Lasaña de Carne', descripcion: 'Capas de pasta, carne molida y salsa bechamel horneadas hasta dorar, un clásico de la cocina italiana.', imagen: imagenes['receta3'] },
  { titulo: 'Tacos de Res al Pastor', descripcion: 'Carne de res marinada con achiote y piña, cocida al sartén y servida en tortillas para un toque callejero.', imagen: imagenes['receta4'] },
  { titulo: 'Costillas BBQ al horno', descripcion: 'Costillas suaves y jugosas, bañadas en salsa barbacoa y horneadas hasta quedar caramelizadas.', imagen: imagenes['receta5'] },
  { titulo: 'Cerdo en Salsa de Tamarindo', descripcion: 'Trozos de cerdo salteados y cubiertos con una salsa agridulce de tamarindo, ideal con arroz blanco.', imagen: imagenes['receta6'] },
  { titulo: 'Chuletas de cerdo empanizadas', descripcion: 'Chuletas crujientes por fuera y jugosas por dentro, empanizadas y doradas en sartén.', imagen: imagenes['receta7'] },
  { titulo: 'Arroz Frito con Cerdo (estilo oriental)', descripcion: 'Un salteado rápido de arroz con cerdo, huevo y vegetales al estilo asiático, perfecto como plato único.', imagen: imagenes['receta8'] },
  { titulo: 'Ceviche de Pescado Blanco', descripcion: 'Pescado fresco "cocido" en jugo de limón, mezclado con cebolla, cilantro y ají para un sabor vibrante.', imagen: imagenes['receta9'] },
  { titulo: 'Filete de Pescado Empanizado', descripcion: 'Filetes dorados y crujientes, ideales para acompañar con ensalada o papas.', imagen: imagenes['receta10'] },
];

const RecetasPage = () => {
  return (
    <div>
      <NavbarGeneral />

      <section
        className="hero is-primary is-medium hero-banner"
        style={{
          backgroundImage: `url(${imagenes['banner']})`, 
        }}
      >
      </section>

<section className="section">
  <h2 className="title is-4 has-text-centered">Top 10 Recetas</h2>
  <div className="columns is-multiline">
    {recetasTop.map((receta, index) => (
      <div key={index} className="column is-one-third">
        <div className="flip-card mx-auto"> {/* centramos con margen automático */}
          <div className="flip-card-inner">
            {/* Lado frontal */}
            <div className="flip-card-front">
              <figure className="image is-4by3">
                <img src={receta.imagen} alt={receta.titulo} />
              </figure>
              <p className="title is-5 has-text-centered">{receta.titulo}</p>
            </div>

            {/* Lado posterior */}
            <div className="flip-card-back">
              <div className="content">
                <p className="title is-6">{receta.titulo}</p>
                <p>{receta.descripcion}</p>
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