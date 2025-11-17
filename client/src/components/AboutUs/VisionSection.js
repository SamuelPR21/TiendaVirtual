import React from "react";
import VideoSection from "./VideoSection";
import visionVideo from "./Videos/Vision.mp4"; 
export default function VisionSection() {
  return (
    <VideoSection
      title="Nuestra Visión"
      text="Posicionarnos como referente nacional en excelencia cárnica, innovando en procesos de producción y distribución mientras mantenemos estándares de calidad premium."
      videoSrc={visionVideo}

    />
  );
}
