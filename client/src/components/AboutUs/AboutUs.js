import React from "react";
import AboutHero from "./AboutHero";
import MissionSection from "./MissionSection";
import VisionSection from "./VisionSection";
import TeamSection from "./TeamSection";
import Footer from "../Home/Footer/Footer";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="aboutus-container">
      <AboutHero />
      <MissionSection />
      <VisionSection />
      <TeamSection />
      <Footer />
    </div>
  );
}
