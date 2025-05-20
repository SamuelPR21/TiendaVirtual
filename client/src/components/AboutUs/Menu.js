import React from "react";

const menuItems = [
  { key: 'vision', label: 'Visión' },
  { key: 'mision', label: 'Misión' },
  { key: 'equipo', label: 'Equipo' },
  { key: 'valores', label: 'Valores' }
];

export default function Menu({ selectedOption, onSelect }) {
  return(
    <aside className="menu">
      <p className="menu-label">Acerca de Nosotros</p>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.key}>
            <a 
              className={selectedOption === item.key ? 'is-active' : ''}
              onClick={() => onSelect(item.key)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}