import React, { useEffect, useRef, useState } from "react";

export default function AboutHero() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className={`aboutus-section aboutus-hero ${visible ? "fade-in" : ""}`}
    >
      <div className="container">
        <h1 className="title is-1 has-text-white">Sobre Nosotros</h1>
        <p className="subtitle is-4 has-text-light">
          Somos la carnicería líder, combinando tradición, pasión y excelencia
          en cada corte. Nuestro compromiso es brindar productos premium con
          un servicio que supera expectativas.
        </p>
      </div>
    </section>
  );
}
