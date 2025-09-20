// src/App.jsx
// imports...
import AudioTest from "./pages/AudioTest";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PlayerProvider } from "./state/playerContext";
import NP from "./components/NP";

// Pages (assumes you already have these)
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

export default function App() {
  const shellStyle = {
    minHeight: "100vh",
    paddingBottom: 68, // keep content above the NP bar height
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  };
  const headerStyle = {
    padding: "10px 12px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    gap: "12px",
  };

  return (
    <PlayerProvider>
      <BrowserRouter>
        <div style={shellStyle}>
          {/* Temporary plain header links (un-styled) */}
          <div style={headerStyle}>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/audio-test" element={<AudioTest />} />
          </Routes>
        </div>

        {/* NOW PLAYING lives outside Routes so it shows on all pages */}
        <NP />
      </BrowserRouter>
    </PlayerProvider>
  );
}
