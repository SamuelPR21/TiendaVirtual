import React, { useState } from "react";
import Menu from "./Menu";
import ContentSection from "./ContentSection";
import Footer from "../Home/Footer/Footer";
import NavbarGeral from "../Navbar/NavbarGeneral";
import "./AboutUs.css"; 

export default function AboutUs() {
  const [selectedOption, setSelectedOption] = useState('vision');

  return(
    <div className="aboutus-container">
      <section className="hero is-danger">
        <div className="hero-body hero-body-custom">
          <div className="container">
            <NavbarGeral />
            <div className="title-container">
              <h1 className="title has-text-centered">Carnicería Los Prados</h1>
              <p className="subtitle has-text-centered subtitle-spacing">Calidad y Buen Precio</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section content-section">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <Menu 
                selectedOption={selectedOption}
                onSelect={setSelectedOption}
              />
            </div>
            
            <div className="column">
              <ContentSection selectedOption={selectedOption} />
            </div>
          </div>
        </div>
      </section>

      <Footer className="footer-container" />
    </div>
  )
}