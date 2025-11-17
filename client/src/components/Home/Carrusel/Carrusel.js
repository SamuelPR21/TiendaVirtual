import React, { useEffect, useRef } from 'react';
import 'glider-js/glider.min.css';
import '../Carrusel/Carrusel.css';
import video1 from '../Carrusel/videosCarrusel/video1.mp4';
import video2 from '../Carrusel/videosCarrusel/video2.mp4';
import video3 from '../Carrusel/videosCarrusel/video3.mp4';
import video4 from '../Carrusel/videosCarrusel/video4.mp4';
import Glider from 'glider-js';

export default function Carrusel() {
  const gliderRef = useRef(null);
  const gliderInstanceRef = useRef(null);
  const videoRefs = useRef([]);
  const videos = [video1, video2, video3, video4];

  const handleVideoEnd = () => {
    if (gliderInstanceRef.current) {
      const nextIndex = (gliderInstanceRef.current.slide + 1) % videos.length;
      gliderInstanceRef.current.scrollItem(nextIndex);
    }
  };

  const playOnlyVisibleVideo = () => {
    if (!gliderInstanceRef.current) return;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      
      const isVisible = index === gliderInstanceRef.current.slide;
      if (isVisible) {
        video.play().catch(error => console.log('Autoplay error:', error));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  useEffect(() => {
    const glider = new Glider(gliderRef.current, {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      duration: 0.5,
      dots: '#dots',
      arrows: {
        prev: '#glider-prev',
        next: '#glider-next',
      },
    });

    gliderInstanceRef.current = glider;
    playOnlyVisibleVideo();

    const container = gliderRef.current;
    container.addEventListener('glider-slide-visible', playOnlyVisibleVideo);

    return () => {
      container.removeEventListener('glider-slide-visible', playOnlyVisibleVideo);
    };
  }, []);

  return (
    <section className="section">
      <div className="glider-container">
        <div className="glider" ref={gliderRef}>
          {videos.map((src, i) => (
            <div className="card" key={i}>
              <div className="card-image">
                <figure className="image is-9by16">
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                      if (el) {
                        el.onended = handleVideoEnd;
                        el.play().catch(error => console.log('Autoplay error:', error));
                      }
                    }}
                    src={src}
                    muted
                    autoPlay
                    playsInline
                    controls={false}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
                  />
                </figure>
              </div>
            </div>
          ))}
        </div>

        <button id="glider-prev" className="glider-prev">
          <span>❮</span>
        </button>

        <button id="glider-next" className="glider-next">
          <span>❯</span>
        </button>

        <div id="dots"></div>
      </div>
    </section>
  );
}