// src/components/Header.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../state/cartContext";

export default function Header() {
  const { count } = useCart();
  const navs = [
    { to: "/", label: "Home", end: true },
    { to: "/catalog", label: "Catalog" },
    { to: "/genres", label: "Genres" },
    { to: "/blog", label: "Blog" },
    { to: "/audio-test", label: "Audio Test" },
  ];

  return (
    <header className="header">
      <nav className="header-inner" aria-label="Main" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {navs.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `navlink${isActive ? " active" : ""}`}>
              {n.label}
            </NavLink>
          ))}
        </div>
        <Link to="/cart" className="navlink" style={{ position: "relative" }}>
          Cart {count > 0 && <span className="badge">{count}</span>}
        </Link>
      </nav>
    </header>
  );
}


