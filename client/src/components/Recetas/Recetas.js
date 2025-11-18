import React, { useEffect, useState } from 'react';
import Footer from '../Home/Footer/Footer';
import './Recetas.css';
import { fetchRecipes } from '../../API/recipes';
import { useUser } from '../../context/UserContext';
import Suscribirse from "../Home/Suscribirse/Suscribirse"
import ModalReceta from './ModalRecetas';
import recetasVideo from './Assets/recetasVideo.mp4';

const RecetasPage = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState(null);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let mounted = true;
    (async () => {
      try {
        const data = await fetchRecipes();
        if (mounted) setRecetas(Array.isArray(data) ? data : []);
      } catch (e) {
        setError('No se pudieron cargar las recetas. Verifica que el servidor esté activo.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [user]);

   return (
    <div>
      <section className="hero is-primary hero-banner video-banner">
        <video
          src={recetasVideo}
          autoPlay
          loop
          muted
          playsInline
          className="video-background"
        />
      </section>

      <section className="section">

        <h2 className="title is-4 has-text-centered">Recetas Disponibles</h2>

        {!user && (
          <div className="has-text-centered" style={{ marginTop: '2rem' }}>
            <p
              className="has-text-weight-semibold"
              style={{ color: '#8B0000', fontSize: '1.2rem', marginBottom: '1.5rem' }}
            >
              Para ver las recetas debes iniciar sesión.
            </p>

            <button
              className="button"
              style={{
                backgroundColor: '#7B001C',
                color: 'white',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
              }}
              onClick={() => setShowLoginModal(true)}
            >
              Iniciar Sesión
            </button>

            {showLoginModal && (
              <Suscribirse
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => setShowLoginModal(false)}
              />
            )}
          </div>
        )}
        {!user && <Footer />}
        {!user && <></>}
        {!user && null}
        {!user && (user ? null : <></>)}
        { !user && <></> }
        { !user && (user ? null : <></>) }
        { !user && (user ? null : null) }
        { !user && (user ? null : <></>) }

        { !user && null }

        {!user && <></>}
        {!user && <></>}
        {!user && null}

        {user && (
          <>
            {/* loading */}
            {loading && (
              <p className="has-text-centered">Cargando recetas…</p>
            )}

            {/* error */}
            {!loading && error && (
              <p className="has-text-centered has-text-danger">{error}</p>
            )}

            {/* sin recetas */}
            {!loading && !error && recetas.length === 0 && (
              <p className="has-text-centered">No hay recetas disponibles.</p>
            )}

            {/* tarjetas */}
            <div className="columns is-multiline">
              {recetas.map((receta, index) => (
                <div key={receta.id || receta._id || index} className="column is-one-third">
                  <div className="flip-card mx-auto">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <figure className="image is-4by3 receta-img-container">
                          <img
                            src={receta.image_url || 'https://via.placeholder.com/800x600?text=Receta'}
                            alt={receta.name}
                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Receta'; }}
                          />
                        </figure>
                        <p className="title is-5 has-text-centered receta-title">{receta.name}</p>
                      </div>
                      <div
                        className="flip-card-back"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "1rem"
                        }}
                      >
                        <button
                          className="button"
                          style={{
                            backgroundColor: "#7B001C",
                            color: "white",
                            borderRadius: "8px",
                            padding: "0.75rem 1.5rem",
                            fontWeight: "600",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSelectedReceta(receta);
                            setOpenModal(true);
                          }}
                        >
                          Ver más
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      {openModal && (
        <ModalReceta
          receta={selectedReceta}
          onClose={() => setOpenModal(false)}
        />
      )}

    </div>
  );
};

export default RecetasPage;