import React from "react";
import { NavLink, Link } from "react-router-dom";

const linkBase =
  "px-3 py-2 rounded-md text-sm font-medium transition";
const linkIdle =
  "text-white/80 hover:text-white hover:bg-white/10";
const linkActive =
  "text-black bg-yellow-400 hover:bg-yellow-300";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-white font-semibold tracking-wide">
          devon-beatstore
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Catalog
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkIdle}`
            }
          >
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
