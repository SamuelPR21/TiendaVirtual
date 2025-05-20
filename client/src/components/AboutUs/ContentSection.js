import React from "react";
import equipo1 from "./Img/Equipo.jpeg"; 

const contentMap = {
  vision: {
    title: "Nuestra Visión",
    content: "Posicionarnos como referente nacional en excelencia cárnica, innovando en procesos de producción y distribución mientras mantenemos nuestros estándares de calidad premium.",
    img: require("./Img/Vision.jpg")
  },
  mision: {
    title: "Misión Corporativa",
    content: "Proveer proteínas animales de origen ético y trazabilidad certificada, combinando tradición artesanal con tecnología de vanguardia para superar expectativas gastronómicas.",
    img: require("./Img/Mision.jpg")
  },
  equipo: {
    title: "Equipo Especializado",
    content: "Nuestro capital humano:",
    members: [
      { name: "Juan Pérez", role: "Carnicero Master", img: equipo1 },
      { name: "María Gómez", role: "Experta en Cortes Premium", img: equipo1 },
      { name: "Pepito Perez", role: "Gerente de Control de Calidad", img: equipo1 }
    ]
  },
  valores: {
    title: "Pilares Fundamentales",
    content: "1. Integridad en cada proceso\n2. Trazabilidad certificada\n3. Sostenibilidad operacional\n4. Innovación constante\n5. Relación cliente-proveedor win-win",
    img: require("./Img/Valores.jpg")
  }
};

export default function ContentSection({ selectedOption }) {
  const { title, content, img, members } = contentMap[selectedOption];

  return (
    <div className="box">
      <h2 className="title is-3  has-text-white">{title}</h2>
      
      {selectedOption === 'equipo' ? (
        <>
          <p className="content mb-6">{content}</p>
          <div className="columns is-centered">
            {members.map((member, index) => (
              <div className="column has-text-centered" key={index}>
                <figure className="image is-128x128 mx-auto">
                  <img 
                    className="is-rounded" 
                    src={member.img} 
                    alt={member.name}
                  />
                </figure>
                <h3 className="title is-5 mt-3">{member.name}</h3>
                <p className="subtitle is-6 has-text-grey">{member.role}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="columns is-vcentered">
          <div className="column is-two-thirds">
            <p className="content" style={{ whiteSpace: 'pre-line' }}>{content}</p>
          </div>
          <div className="column has-text-centered">
            <figure className="image is-4by3">
              <img 
                src={img} 
                alt={title} 
                className="is-rounded"
                style={{ borderRadius: '12px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}
              />
            </figure>
          </div>
        </div>
      )}
    </div>
  )
}