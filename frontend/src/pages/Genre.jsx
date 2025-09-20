// src/pages/Genre.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { genres } from "../data/genres";

export default function Genre() {
  const { id } = useParams();
  const genre = genres.find((g) => g.id === id);

  if (!genre) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Genre not found</h2>
        <Link to="/genres">Back to Genres</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{genre.name}</h1>
      <p>{genre.description}</p>

      <h2>Tracks</h2>
      <ul>
        {genre.tracks.map((t) => (
          <li key={t.id}>
            {t.title} — {t.artist}
          </li>
        ))}
      </ul>

      <Link to="/genres">← Back to Genres</Link>
    </div>
  );
}
