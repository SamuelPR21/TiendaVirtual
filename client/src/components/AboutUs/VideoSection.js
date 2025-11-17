import React, { useRef, useEffect, useState } from "react";

export default function VideoSection({ title, text, videoSrc, reverse }) {
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
      className={`aboutus-section aboutus-video ${visible ? "fade-in" : ""}`}
    >
      <div className="columns is-vcentered">
        <div className={`column ${reverse ? "order-2" : ""}`}>
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="aboutus-video-content"
          />
        </div>
        <div className="column">
          <h2 className="title is-2 has-text-white">{title}</h2>
          <p className="content has-text-light">{text}</p>
        </div>
      </div>
    </section>
  );
}
