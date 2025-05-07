import React from "react";
import Modal from "./Modal";
import "./Promociones.css"; 
import carneMolida from "./Img/CarneMolida.jpg";
import Lomo from "./Img/Lomo.jpg"
import Bondolia from "./Img/Bondolia.jpg"
import Crepinettes from "./Img/Crepinetes.jpg"
import Salmon from "./Img/Salmon.jpg"
import Pernil from "./Img/Pernil.jpg"


export default function Promociones() {
    return (
        <section className="section">
            <div className="container">
                <h2 className="title has-text-centered mb-6 is-size-1 has-text-weight-bold">Promociones Especiales</h2>
                
                
                <div className="columns is-centered promo-scroll-container">
                    <div className="column is-5">
                        <Modal 
                            imagen={carneMolida} 
                            titulo="Carne Molida" 
                            descripcion="¡Versátil y sabrosa! Ideal para tus recetas favoritas." 
                            validoHasta="Válido hasta el 12 de mayo"
                        />
                        <Modal 
                            imagen={Lomo} 
                            titulo="Lomo Fino en Medallones" 
                            descripcion="Corte premium, jugoso y listo para impresionar." 
                            validoHasta="Válido hasta el 12 de mayo"
                        />
                        <Modal 
                            imagen={Bondolia} 
                            titulo="Bondolia de Cerdo" 
                            descripcion="Delicado sabor y perfecta para asar o estofar." 
                            validoHasta="Válido hasta el 12 de mayo"
                        />
                    </div>
                    
                    <div className="column is-5">
                        <Modal 
                            imagen={Crepinettes} 
                            titulo="Crépinettes" 
                            descripcion="Una delicia gourmet rellena, lista para sorprender." 
                            validoHasta="Válido hasta el 12 de mayo"
                        />
                        <Modal 
                            imagen={Salmon} 
                            titulo="Salmón" 
                            descripcion="Fresco, rico en omega-3 y perfecto para la parrilla." 
                            validoHasta="Válido hasta el 12 de mayo"
                        />
                        <Modal 
                            imagen={Pernil} 
                            titulo="Pernil de Pollo" 
                            descripcion="Jugoso, económico y siempre delicioso." 
                            validoHasta="Válido hasta el 12 de mayo"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}