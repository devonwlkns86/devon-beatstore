// src/state/cartContext.jsx
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart.items");
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("cart.items", JSON.stringify(items)); } catch { }
  }, [items]);

  function addItem(track, qty = 1, licenseId, price) {
    // licenseId/price are required for tiered pricing; fall back to track.price
    const chosenPrice = typeof price === "number" ? price : (track.price ?? 0);
    const chosenLicense = licenseId || "mp3";

    setItems(prev => {
      // Treat (track + license) as unique combo
      const idx = prev.findIndex(i => i.id === track.id && i.licenseId === chosenLicense);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: track.id,
          title: track.title,
          artist: track.artist,
          qty,
          price: chosenPrice,
          licenseId: chosenLicense,
        },
      ];
    });
  }

  function removeItem(id, licenseId) {
    setItems(prev => prev.filter(i => !(i.id === id && i.licenseId === licenseId)));
  }

  function setQty(id, licenseId, qty) {
    setItems(prev =>
      prev.map(i =>
        i.id === id && i.licenseId === licenseId
          ? { ...i, qty: Math.max(1, qty | 0) }
          : i
      )
    );
  }

  // Change the license (updates both licenseId and price)
  function setLicense(id, oldLicenseId, newLicenseId, newPrice) {
    setItems(prev =>
      prev.map(i =>
        i.id === id && i.licenseId === oldLicenseId
          ? { ...i, licenseId: newLicenseId, price: newPrice }
          : i
      )
    );
  }

  function clear() { setItems([]); }

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0);

  const value = useMemo(() => ({
    items, addItem, removeItem, setQty, setLicense, clear, count, subtotal
  }), [items, count, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
