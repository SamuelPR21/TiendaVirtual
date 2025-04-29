import React from "react";
import Titulo from "./Titulo/Titulo"
import Carrusel from "../Home/Carrusel/Carrusel";
import Promociones from "../Home/Promociones/Promociones";

export default function Home() {

    return(
        <>
            <Titulo/>
            <Carrusel/>
            <Promociones/>
        </>
    )
}