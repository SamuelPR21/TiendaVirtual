import React, { useRef, useEffect, useState } from "react";
import TeamModal from "./TeamModal";
import equipo1 from "./Img/Equipo.jpeg";

const members = [
  { name: "Juan Pérez", role: "Carnicero Master", img: equipo1, bio: "Experto con 15 años en cortes finos." },
  { name: "María Gómez", role: "Cortes Premium", img: equipo1, bio: "Especialista en carnes de alta calidad." },
  { name: "Pepito Pérez", role: "Control de Calidad", img: equipo1, bio: "Garantiza la trazabilidad y frescura." },
  { name: "Ana Torres", role: "Administración", img: equipo1, bio: "Gestiona operaciones y logística." }
];

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`aboutus-section aboutus-team ${visible ? "fade-in" : ""}`}
    >
      <h2 className="title is-2 has-text-white has-text-centered mb-6">Nuestro Equipo</h2>
      <div className="columns is-multiline is-centered">
        {members.map((member, idx) => (
          <div className="column has-text-centered is-one-quarter" key={idx}>
            <figure className="image is-128x128 mx-auto">
              <img className="is-rounded" src={member.img} alt={member.name} />
            </figure>
            <h3 className="title is-5 mt-3 has-text-white">{member.name}</h3>
            <p className="subtitle is-6 has-text-grey-light">{member.role}</p>
            <button className="aboutus-button mt-2" onClick={() => setSelectedMember(member)}>Ver más</button>
          </div>
        ))}
      </div>

      {selectedMember && (
        <TeamModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </section>
  );
}
