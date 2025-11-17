import React, { useEffect, useMemo, useState } from "react";
import "bulma/css/bulma.min.css";
import { useParams } from "react-router-dom";
import Footer from "../Home/Footer/Footer";
import "./Productos.css";
import {
  fetchProducts,
  fetchProductsByAnimal,
} from "../../API/products";

export default function Productos() {
  const { categoria } = useParams();

  const [items, setItems] = useState([]);    
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoriaNormalizada = useMemo(
    () => (categoria || "").toLowerCase(),
    [categoria]
  );

  const categoriaValida = useMemo(
    () => ["res", "pollo", "cerdo", "pescado"].includes(categoriaNormalizada),
    [categoriaNormalizada]
  );

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = categoriaValida
          ? await fetchProductsByAnimal(categoriaNormalizada)
          : await fetchProducts(); 

        if (!ignore) setItems(data || []);
      } catch (err) {
        if (!ignore) {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "Error cargando productos";
          setError(msg);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [categoriaNormalizada, categoriaValida]);

  // Modal
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

  const titulo = categoriaValida
    ? `Productos de ${categoriaNormalizada.charAt(0).toUpperCase() + categoriaNormalizada.slice(1)}`
    : "Todos los productos";

  return (
    <div>

      <br />
      <br />

      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">{titulo}</h1>

          {loading && (
            <p className="has-text-centered">Cargando productos...</p>
          )}

          {error && (
            <p className="has-text-centered has-text-danger">{error}</p>
          )}

          {!loading && !error && (
            <div className="columns is-multiline">
              {items.map((p) => {
                const id = p.id || p._id;
                const nombre = p.name;
                const precio = p.price_lb; 
                const descripcion = p.description;
                const img = p.image_url || ""; 

                return (
                  <div className="column is-one-third" key={id}>
                    <div className="card">
                      <div
                        className="card-image"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          abrirModal({ id, nombre, precio, descripcion, imagen: img })
                        }
                      >
                        <figure className="image is-4by3">
                          {img ? (
                            <img src={img} alt={nombre} />
                          ) : (
                            <div
                              className="has-text-centered"
                              style={{ padding: "2rem" }}
                            >
                              Sin imagen
                            </div>
                          )}
                        </figure>
                      </div>
                      <div className="card-content">
                        <p
                          className="title is-5"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            abrirModal({ id, nombre, precio, descripcion, imagen: img })
                          }
                        >
                          {nombre}
                        </p>
                        <p className="subtitle is-6">$ {precio} /Lb</p>
                        <button className="button is-primary">
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {mostrarModal && productoSeleccionado && (
        <div className="modal is-active">
          <div className="modal-background" onClick={cerrarModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{productoSeleccionado.nombre}</p>
              <button
                className="delete"
                aria-label="close"
                onClick={cerrarModal}
              ></button>
            </header>
            <section className="modal-card-body">
              <figure className="image is-4by3 mb-3">
                {productoSeleccionado.imagen ? (
                  <img
                    src={productoSeleccionado.imagen}
                    alt={productoSeleccionado.nombre}
                  />
                ) : (
                  <div
                    className="has-text-centered"
                    style={{ padding: "2rem" }}
                  >
                    Sin imagen
                  </div>
                )}
              </figure>
              <p>
                <strong>Precio:</strong> ${productoSeleccionado.precio} /Lb
              </p>
              <p>
                <strong>Descripción:</strong> {productoSeleccionado.descripcion}
              </p>
              <button
                className="button is-primary is-fullwidth mt-3"
                onClick={() => {
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