// src/pages/Genre.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { genres } from "../data/genres";

export default function Genre() {
  const { id } = useParams();
  const genre = genres.find((g) => g.id === id);

  if (!genre) {
    return (
      <div className="app-shell">
        <div className="card"><h2>Genre not found</h2></div>
        <div style={{ marginTop: 12 }}><Link to="/genres" className="btn">Back to Genres</Link></div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="card" style={{ marginBottom: 16 }}>
        <h1>{genre.name}</h1>
        <p className="muted">{genre.description}</p>
      </div>

      <div className="card">
        <h2>Tracks</h2>
        <ul className="list">
          {genre.tracks.map((t) => (
            <li key={t.id} className="item">
              {t.title} — <span className="small">{t.artist}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/genres" className="btn">← Back to Genres</Link>
      </div>
    </div>
  );
}
