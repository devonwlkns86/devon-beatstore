// src/pages/BlogPost.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Post not found</h2>
        <Link to="/blog">Back to Blog</Link>
      </div>
    );
  }

  // Very simple paragraph rendering (no markdown lib yet)
  const paragraphs = post.content.split(/\n\s*\n/);

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 12 }}>{post.date}</div>

      {paragraphs.map((para, i) => (
        <p key={i} style={{ marginBottom: 12, whiteSpace: "pre-wrap" }}>
          {para}
        </p>
      ))}

      <div style={{ marginTop: 16 }}>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    </div>
  );
}
