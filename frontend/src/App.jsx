import { NavLink, Outlet } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  borderRadius: 12,
  textDecoration: "none",
  color: isActive ? "white" : "#111",
  background: isActive ? "#111" : "transparent",
  border: "1px solid #ddd",
  marginRight: 8
});

export default function App() {
  return (
    <div>
      <header style={{ position: "sticky", top: 0, background: "white", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 800 }}>Devon • Beatstore</div>
          <nav>
            <NavLink to="/" style={linkStyle} end>Home</NavLink>
            <NavLink to="/catalog" style={linkStyle}>Catalog</NavLink>
            <NavLink to="/about" style={linkStyle}>About</NavLink>
            <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto" }}>
        <Outlet />
      </main>

      <footer style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px", color: "#666", borderTop: "1px solid #eee" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <small>© {new Date().getFullYear()} Devon Wilkins — previews only.</small>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://youtube.com/@yourchannel" target="_blank" rel="noreferrer">YouTube</a>
            <a href="mailto:youremail@example.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
