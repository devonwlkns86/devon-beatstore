// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function Blog() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div style={{ padding: 20 }}>
      <h1>Blog</h1>
      <ul>
        {sorted.map((p) => (
          <li key={p.id} style={{ marginBottom: 12 }}>
            <div>
              <Link to={`/blog/${p.slug}`}>{p.title}</Link>
            </div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{p.date}</div>
            <div>{p.excerpt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
