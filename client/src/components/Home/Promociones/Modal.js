import React from "react";


export default function Modal(props){

    return(
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={props.imagen} alt="Imagen de Producto"/>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-4">{props.titulo}</p>
                    <p className="subtitle is-6">@CarcineriaCol</p>
                </div>
            </div>
            <div className="content">
                {props.descripcion}
                <br/>
                    <div className="has-text-weight-bold mt-2 has-text-brown">Válido hasta: 
                      <time>
                        {props.validoHasta}
                      </time>
                    </div>
            </div>
          </div>
        </div>
    )
}