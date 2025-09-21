// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function Blog() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="app-shell">
      <h1>Blog</h1>
      <div className="card">
        <ul className="list">
          {sorted.map((p) => (
            <li key={p.id} className="item">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <Link to={`/blog/${p.slug}`} style={{ fontWeight: 700 }}>{p.title}</Link>
                  <div className="small">{p.date} — {p.excerpt}</div>
                </div>
                <Link to={`/blog/${p.slug}`} className="btn">Read</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
