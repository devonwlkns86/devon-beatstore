// src/components/Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Minimal, no-CSS header with active link styles.
 * Uses NavLink so the current page is clearly indicated.
 */
export default function Header() {
  const bar = {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#fff",
    borderBottom: "1px solid #ddd",
  };

  const wrap = {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "10px 12px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  };

  const link = {
    textDecoration: "none",
    color: "#111",
    padding: "6px 8px",
    borderRadius: 6,
    border: "1px solid transparent",
  };

  const active = {
    ...link,
    fontWeight: 700,
    textDecoration: "underline",
    borderColor: "#aaa",
    background: "#f7f7f7",
  };

  const navs = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/genres", label: "Genres" },
    { to: "/blog", label: "Blog" },
    { to: "/audio-test", label: "Audio Test" },
  ];

  return (
    <div style={bar}>
      <nav style={wrap} aria-label="Main">
        {navs.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            style={({ isActive }) => (isActive ? active : link)}
            end={n.to === "/"}
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
