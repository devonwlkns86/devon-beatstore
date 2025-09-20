// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./state/playerContext";
import NP from "./components/NP";
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Genres from "./pages/Genres";
import Genre from "./pages/Genre";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AudioTest from "./pages/AudioTest";

function NotFound() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h2>404 — Not Found</h2>
      <p>That page doesn’t exist.</p>
    </div>
  );
}

export default function App() {
  const shellStyle = {
    minHeight: "100vh",
    // Leave room for sticky header (approx 50–60px) + NP bar (~68px)
    paddingTop: 60,
    paddingBottom: 80,
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  };

  return (
    <PlayerProvider>
      <BrowserRouter>
        <Header />

        <div style={shellStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/:id" element={<Genre />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/audio-test" element={<AudioTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Global Now Playing Bar */}
        <NP />
      </BrowserRouter>
    </PlayerProvider>
  );
}
