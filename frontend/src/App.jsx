// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./state/playerContext";
import { CartProvider } from "./state/cartContext";
import NP from "./components/NP";
import Header from "./components/Header";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Genres from "./pages/Genres";
import Genre from "./pages/Genre";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AudioTest from "./pages/AudioTest";
import Cart from "./pages/Cart";

function NotFound() {
  return (
    <div className="app-shell">
      <h2>404 — Not Found</h2>
      <p>That page doesn’t exist.</p>
    </div>
  );
}

export default function App() {
  const shellStyle = { minHeight: "100vh", paddingTop: 60, paddingBottom: 80, boxSizing: "border-box" };

  return (
    <PlayerProvider>
      <CartProvider>
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
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <NP />
        </BrowserRouter>
      </CartProvider>
    </PlayerProvider>
  );
}
