// src/pages/Genres.jsx
import React from "react";
import { Link } from "react-router-dom";
import { genres } from "../data/genres";

export default function Genres() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Genres</h1>
      <div style={{ display: "grid", gap: 12 }}>
        {genres.map((g) => (
          <div key={g.id} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
            <h2 style={{ margin: "0 0 6px 0" }}>
              <Link to={`/genres/${g.id}`}>{g.name}</Link>
            </h2>
            <p style={{ margin: 0, opacity: 0.8 }}>{g.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
