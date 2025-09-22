// src/pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../state/CartContext";

export default function Cart() {
  const { items, setQty, removeItem, clear, subtotal } = useCart();

  return (
    <div className="app-shell">
      <div className="card" style={{ marginBottom: 16 }}>
        <h1>Cart</h1>
        <p className="muted">Simple cart for previews. Checkout coming later.</p>
      </div>

      <div className="card">
        {items.length === 0 ? (
          <>
            <p>Your cart is empty.</p>
            <Link to="/catalog" className="btn">Browse Catalog</Link>
          </>
        ) : (
          <>
            <ul className="list">
              {items.map((i) => (
                <li
                  className="item"
                  key={i.id}
                  style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, alignItems: "center" }}
                >
                  <div>
                    <div className="title" style={{ marginBottom: 4 }}>{i.title}</div>
                    <div className="small">by {i.artist}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <label className="small" htmlFor={`qty-${i.id}`}>Qty</label>
                    <input
                      id={`qty-${i.id}`}
                      type="number"
                      min="1"
                      value={i.qty}
                      onChange={(e) => setQty(i.id, Number(e.target.value))}
                      style={{
                        width: 60,
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: "1px solid var(--line)",
                        background: "var(--panel)"
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, justifySelf: "end" }}>
                    <div className="price">${(i.price * i.qty).toFixed(2)}</div>
                    <button className="btn ghost" onClick={() => removeItem(i.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <button className="btn ghost" onClick={clear}>Clear Cart</button>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="title">Subtotal: ${subtotal.toFixed(2)}</div>
                <button className="btn primary">Checkout (stub)</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
