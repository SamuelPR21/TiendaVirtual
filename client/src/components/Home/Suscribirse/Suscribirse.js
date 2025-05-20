import React from "react";
import "../Suscribirse/Suscribirse.css";

export default function Suscribirse({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>

      <div className="modal-card">s
        <header className="modal-card-head">
          <h5 className="title is-4">Obten 30% de Descuento</h5>
        </header>

        <form onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Ej: Uribe Paraco"
                  autoFocus
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="email"
                  placeholder="Ej: petro@guerrillero.com"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Teléfono</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="tel"
                  placeholder="Ej: +57 123 524 4856"
                  pattern="[+0-9\s]{9,15}"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Dirección</label>
              <div className="control">
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Ej: Av. Principal 123"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Preferencias de productos</label>
              <div className="control">
                <div className="buttons are-small">
                  <button type="button" className="button is-primary has-background-danger">Cerdo</button>
                  <button type="button" className="button is-primary has-background-danger" >Pollo</button>
                  <button type="button" className="button is-primary has-background-danger">Res</button>
                  <button type="button" className="button is-primary has-background-danger">Pescado</button>
                </div>
              </div>
            </div>
          </section>

          <footer className="modal-card-foot">
            <button type="submit" className="button" onClick={onClose}>
              Suscribirse
            </button>
            <button type="button" className="button" onClick={onClose}>
              Cancelar
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}