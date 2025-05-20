import React, { useState } from "react";
import Cerdo from "./ImagenesDespiece/cerdo.png";
import Pollo from "./ImagenesDespiece/pollo.png";
import Res from "./ImagenesDespiece/res.png";
import Pescado from "./ImagenesDespiece/pez.jpg";

export default function Despiece() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="section">
            <div className="container">
                <div className="notification is-dark">
                    <h1 className="title has-text-white">Despiece</h1>
                    <p className="subtitle">Descubre el despiece de nuestros productos</p>
                    
                    <div className="columns is-multiline">
                        {[Cerdo, Pescado, Pollo, Res].map((img, index) => (
                            <div key={index} className="column is-3">
                                <div className="card">
                                    <div className="card-content">
                                        <h3 className="title is-5 has-text-centered has-text-white">
                                            {['Cerdo', 'Pescado', 'Pollo', 'Res'][index]}
                                        </h3>
                                        <div className="card-image">
                                            <figure 
                                                className="image is-4by3 clickable" 
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <img src={img} alt={['Cerdo', 'Pescado', 'Pollo', 'Res'][index]} />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`modal ${selectedImage ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => setSelectedImage(null)}></div>
                
                <div className="modal-content">
                    <div className="columns is-centered">
                        <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop">
                            <div className="box p-4">
                                <figure className="image">
                                    <img 
                                        src={selectedImage} 
                                        alt="Vista ampliada" 
                                        className="is-fullwidth"
                                    />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button 
                    className="modal-close is-large" 
                    aria-label="close"
                    onClick={() => setSelectedImage(null)}
                ></button>
            </div>
        </section>
    )
}