// src/pages/Genres.jsx
import React from "react";
import { Link } from "react-router-dom";
import { genres } from "../data/genres";

export default function Genres() {
  return (
    <div className="app-shell">
      <h1>Genres</h1>
      <ul className="list">
        {genres.map((g) => (
          <li key={g.id} className="item">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div>
                <Link to={`/genres/${g.id}`} style={{ fontWeight: 700 }}>{g.name}</Link>
                <div className="small">{g.description}</div>
              </div>
              <Link to={`/genres/${g.id}`} className="btn">Open</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
