// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function Blog() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Blog</h1>
      <p style={{ opacity: 0.8, marginBottom: 16 }}>Updates, tips, and behind-the-scenes.</p>

      <div style={{ display: "grid", gap: 16 }}>
        {posts.map((p) => (
          <article key={p.id} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
            <h2 style={{ margin: "0 0 4px 0" }}>
              <Link to={`/blog/${p.id}`}>{p.title}</Link>
            </h2>
            <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>
              {new Date(p.date).toLocaleDateString()}
            </div>
            <p style={{ margin: 0 }}>{p.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
