import React from "react";
import portada from "../Home/imagen2.png";

export default function Titulo(){

    return(
        <>
            <section class="hero is-large is-info">
                <div class="hero-body">
                    <p class="title">Carniceria</p>
                    <p class="subtitle">Calidad y Buen Precio</p>

                    <figure class="image is-128x128">
                        <img src={portada} />
                    </figure>
                </div>
            </section>
        </>
    )
}
