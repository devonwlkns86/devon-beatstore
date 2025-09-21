// src/pages/BlogPost.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="app-shell">
        <div className="card"><h2>Post not found</h2></div>
        <div style={{ marginTop: 12 }}><Link to="/blog" className="btn">Back to Blog</Link></div>
      </div>
    );
  }

  const paragraphs = post.content.split(/\n\s*\n/);

  return (
    <div className="app-shell">
      <div className="card" style={{ marginBottom: 16 }}>
        <h1>{post.title}</h1>
        <div className="small" style={{ marginBottom: 12 }}>{post.date}</div>
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <Link to="/blog" className="btn">← Back to Blog</Link>
    </div>
  );
}
