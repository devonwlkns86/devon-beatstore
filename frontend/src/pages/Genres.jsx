// src/pages/Genres.jsx
import React from "react";
import { Link } from "react-router-dom";
import { genres } from "../data/genres";

export default function Genres() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Genres</h1>
      <ul>
        {genres.map((g) => (
          <li key={g.id}>
            <Link to={`/genres/${g.id}`}>
              {g.name}
            </Link>{" "}
            — {g.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
