import React from "react";
import "./ModalRecetas.css";

const ModalReceta = ({ receta, onClose }) => {
  if (!receta) return null;

  const parseInstructions = (text) => {
    if (!text) return [];

    // Divide en partes tipo: Introducción + pasos numerados
    const partes = text.split(/\n(?=\d+\))/);
    if (partes.length <= 1) return text;

    const [intro, ...rest] = partes;

    const steps = rest
      .join("\n")
      .split(/\s(?=\d+\)\s)/)
      .map((s) => s.replace(/^\d+\)\s*/, ""))
      .filter(Boolean);

    return { intro, steps };
  };

  const parsed = parseInstructions(receta.instructions);

  return (
    <div className="modalR-overlay" onClick={onClose}>
      <div className="modalR-container" onClick={(e) => e.stopPropagation()}>
        <button className="modalR-close" onClick={onClose}>✕</button>

        <img className="modalR-img" src={receta.image_url} alt={receta.name} />

        <h2 className="modalR-title">{receta.name}</h2>

        <div className="modalR-content">
          {typeof parsed === "string" ? (
            <p className="modalR-intro">{parsed}</p>
          ) : (
            <>
              <p className="modalR-intro">{parsed.intro}</p>
              <ol className="modalR-list">
                {parsed.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalReceta;
