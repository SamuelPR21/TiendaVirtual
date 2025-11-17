import React from "react";
import VideoSection from "./VideoSection";
import missionVideo from "./Videos/Mision.mp4"; // path correcto

export default function MissionSection() {
  return (
    <VideoSection
      title="Nuestra Misión"
      text="Proveer proteínas animales de origen ético y trazabilidad certificada, combinando tradición artesanal con tecnología de vanguardia."
      videoSrc={missionVideo}
    />
  );
}
