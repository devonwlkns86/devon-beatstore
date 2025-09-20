// src/pages/BlogPost.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.id === slug);

  if (!post) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Post not found</h1>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <Link to="/blog">← Back to Blog</Link>
      <h1 style={{ marginTop: 12 }}>{post.title}</h1>
      <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 16 }}>
        {new Date(post.date).toLocaleDateString()}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      {post.tags?.length ? (
        <div style={{ marginTop: 16, fontSize: 14, opacity: 0.8 }}>
          Tags: {post.tags.map((t) => (
            <span key={t} style={{ marginRight: 8 }}>#{t}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
