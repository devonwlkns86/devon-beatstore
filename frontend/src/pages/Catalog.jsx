// src/pages/Catalog.jsx
import React from "react";
import { tracks } from "../data/tracks";
import SongBar from "../components/SongBar";

export default function Catalog() {
  return (
    <div className="app-shell">
      <div className="card" style={{ marginBottom: 16 }}>
        <h1>Catalog</h1>
        <p className="muted">Your latest beats. Click Play to preview or add to cart.</p>
      </div>

      <div className="card">
        <ul className="list" style={{ marginTop: 0 }}>
          {tracks.map(t => (
            <li key={t.id} style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <SongBar track={t} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
