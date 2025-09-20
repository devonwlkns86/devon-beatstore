// src/pages/Genre.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { genres } from "../data/genres";

export default function Genre() {
  const { genre } = useParams();
  const g = genres.find((x) => x.id === genre);

  if (!g) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Genre not found</h1>
        <Link to="/genres">← Back to Genres</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Link to="/genres">← Back to Genres</Link>
      <h1 style={{ marginTop: 12 }}>{g.name}</h1>
      <p style={{ opacity: 0.8 }}>{g.description}</p>

      {/* Later: list tracks for this genre */}
      <div style={{ marginTop: 12, fontStyle: "italic", opacity: 0.7 }}>
        Tracks for <strong>{g.name}</strong> will appear here.
      </div>
    </div>
  );
}
