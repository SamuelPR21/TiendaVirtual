import React from "react";

export default function TeamModal({ member, onClose }) {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{member.name}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <figure className="image is-256x256 mx-auto mb-4">
            <img className="is-rounded" src={member.img} alt={member.name} />
          </figure>
          <p className="subtitle is-6">{member.role}</p>
          <p>{member.bio}</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={onClose}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
}
