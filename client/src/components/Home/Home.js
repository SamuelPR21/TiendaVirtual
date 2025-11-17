import React from "react";
import Titulo from "./Titulo/Titulo";
import Promociones from "../Home/Promociones/Promociones";
import Despiece from "../Home/Despiece/Despiece";
import Footer from "../Home/Footer/Footer";
import RegisterComponent from "./Suscribirse/RegisterHome";
import "./Home.css";

export default function Home() {
  return (
    <main className="home-layout">

      <section className="home-section">
        <Titulo />
      </section>

      <section className="home-section section-promos">
        <Promociones />
      </section>

      <section className="home-section section-despiece">
        <Despiece />
      </section>

        <section className="home-section section-despiece" id="register-section">
            <RegisterComponent id="register-section" />
        </section>

      <section className="home-footer-wrapper">
        <Footer />
      </section>

    </main>
  );
}
