import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import Footer from '../Home/Footer/Footer';
import './Recetas.css';
import { fetchRecipes } from '../../API/recipes';
import bannerImg from './Imgrecetas/banner.jpg';
import { useUser } from '../../context/UserContext';
import Suscribirse from "../Home/Suscribirse/Suscribirse"

const RecetasPage = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

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

      {/* Banner */}
      <section
        className="hero is-primary is-medium hero-banner"
        style={{ backgroundImage: `url(${bannerImg})` }}
      />

      <section className="section">

        <h2 className="title is-4 has-text-centered">Recetas Disponibles</h2>

        {/* 🔥 SI EL USUARIO NO ESTÁ AUTENTICADO */}
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

        {/* 🔥 Si NO hay usuario, dejamos de renderizar recetas */}
        {!user && <Footer />}
        {!user && <></>}
        {!user && null}
        {!user && (user ? null : <></>)}
        { !user && <></> }
        { !user && (user ? null : <></>) }
        { !user && (user ? null : null) }
        { !user && (user ? null : <></>) }

        { !user && null }

        {/* 🔥 Cortamos el render aquí */}
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
                        <figure className="image is-4by3">
                          <img
                            src={receta.image_url || 'https://via.placeholder.com/800x600?text=Receta'}
                            alt={receta.name}
                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Receta'; }}
                          />
                        </figure>
                        <p className="title is-5 has-text-centered">{receta.name}</p>
                      </div>

                      <div className="flip-card-back">
                        <div className="content">
                          <p className="title is-6">{receta.name}</p>

                          {(() => {
                            const desc = receta.instructions || '';
                            const partes = desc.split(/\n(?=\d+\))/);
                            if (partes.length <= 1) return <p style={{ whiteSpace: 'pre-wrap' }}>{desc}</p>;

                            const [intro, ...rest] = partes;
                            return (
                              <>
                                {intro && <p style={{ marginBottom: '0.5rem' }}>{intro}</p>}
                                <ol style={{ paddingLeft: '1.25rem', margin: 0, textAlign: 'left' }}>
                                  {rest
                                    .join('\n')
                                    .split(/\s(?=\d+\)\s)/)
                                    .map(s => s.replace(/^\d+\)\s*/, ''))
                                    .filter(Boolean)
                                    .map((step, i) => (
                                      <li key={i} style={{ marginBottom: '.35rem' }}>{step}</li>
                                    ))}
                                </ol>
                              </>
                            );
                          })()}

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default RecetasPage;