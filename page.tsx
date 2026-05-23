"use client";
import { useState } from "react";

const COLORS = {
  bg: "#0f0e0c",
  surface: "#1a1917",
  card: "#222120",
  border: "#2e2c2a",
  gold: "#c9a84c",
  text: "#f0ebe3",
  muted: "#7a7570",
  red: "#e05252",
  green: "#52b788",
};

const CATS = [
  { id: "speisen", label: "Speisen", icon: "🍽️", color: "#C84B11" },
  { id: "drinks", label: "Getränke", icon: "🍺", color: "#1252AA" },
  { id: "hot", label: "Heißgetränke", icon: "☕", color: "#6B3410" },
  { id: "desserts", label: "Desserts", icon: "🍰", color: "#8B1FA8" },
  { id: "specials", label: "Tagesspecial", icon: "⭐", color: "#9A7200" },
  { id: "spirits", label: "Spirituosen", icon: "🥃", color: "#1A7040" },
];

const MENU = {
  speisen: [
    { id: 101, name: "Caesar Salad", price: 8.90 },
    { id: 102, name: "Tomatensuppe", price: 5.50 },
    { id: 103, name: "Bruschetta", price: 6.50 },
    { id: 104, name: "Wiener Schnitzel", price: 18.50 },
    { id: 105, name: "Rinderfilet", price: 28.00 },
    { id: 106, name: "Lachs gegrillt", price: 19.00 },
    { id: 107, name: "Pasta Carbonara", price: 14.50 },
    { id: 108, name: "Burger Deluxe", price: 15.00 },
    { id: 109, name: "Veggie Bowl", price: 13.00 },
    { id: 110, name: "Zwiebelrostbraten", price: 22.00 },
    { id: 111, name: "Flammkuchen", price: 11.50 },
    { id: 112, name: "Currywurst+Pommes", price: 9.50 },
  ],
  drinks: [
    { id: 201, name: "Wasser still 0,5L", price: 2.50 },
    { id: 202, name: "Wasser sprudel 0,5L", price: 2.50 },
    { id: 203, name: "Cola 0,4L", price: 3.50 },
    { id: 204, name: "Fanta 0,4L", price: 3.50 },
    { id: 205, name: "Bier vom Fass 0,5L", price: 4.50 },
    { id: 206, name: "Weizen 0,5L", price: 4.80 },
    { id: 207, name: "Weißwein 0,2L", price: 5.50 },
    { id: 208, name: "Rotwein 0,2L", price: 5.50 },
    { id: 209, name: "Sekt 0,1L", price: 5.00 },
    { id: 210, name: "Apfelsaft 0,4L", price: 3.20 },
  ],
  hot: [
    { id: 301, name: "Espresso", price: 2.50 },
    { id: 302, name: "Cappuccino", price: 3.50 },
    { id: 303, name: "Latte Macchiato", price: 4.00 },
    { id: 304, name: "Tee", price: 2.80 },
    { id: 305, name: "Heiße Schokolade", price: 3.80 },
  ],
  desserts: [
    { id: 401, name: "Tiramisu", price: 6.50 },
    { id: 402, name: "Panna Cotta", price: 5.50 },
    { id: 403, name: "Käsekuchen", price: 4.50 },
    { id: 404, name: "Eis 3 Kugeln", price: 4.00 },
    { id: 405, name: "Waffel", price: 3.50 },
  ],
  specials: [
    { id: 501, name: "Tagessuppe", price: 4.50 },
    { id: 502, name: "Tagesgericht", price: 12.50 },
    { id: 503, name: "Chef's Special", price: 22.00 },
  ],
  spirits: [
    { id: 601, name: "Whisky 4cl", price: 6.50 },
    { id: 602, name: "Vodka 4cl", price: 5.50 },
    { id: 603, name: "Gin 4cl", price: 6.00 },
    { id: 604, name: "Rum 4cl", price: 5.50 },
    { id: 605, name: "Grappa 4cl", price: 5.00 },
  ],
};

export default function Kasse() {
  const [activeCat, setActiveCat] = useState("speisen");
  const [order, setOrder] = useState([]);
  const [paid, setPaid] = useState(false);

  const addItem = (item) => {
    setOrder((prev) => {
      const existing = prev.find((o) => o.id === item.id);
      if (existing) {
        return prev.map((o) => o.id === item.id ? { ...o, qty: o.qty + 1 } : o);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setOrder((prev) => {
      const existing = prev.find((o) => o.id === id);
      if (existing?.qty === 1) return prev.filter((o) => o.id !== id);
      return prev.map((o) => (o.id === id ? { ...o, qty: o.qty - 1 } : o));
    });
  };

  const total = order.reduce((sum, o) => sum + o.price * o.qty, 0);
  const cat = CATS.find((c) => c.id === activeCat);

  const handlePay = () => {
    setPaid(true);
    setTimeout(() => { setOrder([]); setPaid(false); }, 2000);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Georgia', serif", overflow: "hidden" }}>
      
      {/* LEFT: Menu */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: `1px solid ${COLORS.border}` }}>
        
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
          <div style={{ fontSize: 11, color: COLORS.gold, letterSpacing: 3, textTransform: "uppercase" }}>Restaurant</div>
          <div style={{ fontSize: 22, fontWeight: "bold" }}>Kassensystem</div>
        </div>

        <div style={{ display: "flex", gap: 6, padding: "12px 16px", background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}`, flexWrap: "wrap" }}>
          {CATS.map((c) => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
              padding: "6px 12px", borderRadius: 6,
              border: activeCat === c.id ? `1px solid ${c.color}` : `1px solid ${COLORS.border}`,
              background: activeCat === c.id ? c.color + "22" : "transparent",
              color: activeCat === c.id ? COLORS.text : COLORS.muted,
              cursor: "pointer", fontSize: 13,
            }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, alignContent: "start" }}>
          {MENU[activeCat]?.map((item) => {
            const inOrder = order.find((o) => o.id === item.id);
            return (
              <button key={item.id} onClick={() => addItem(item)} style={{
                background: inOrder ? cat.color + "22" : COLORS.card,
                border: inOrder ? `1px solid ${cat.color}66` : `1px solid ${COLORS.border}`,
                borderRadius: 10, padding: "14px 12px", cursor: "pointer",
                textAlign: "left", position: "relative",
              }}>
                {inOrder && (
                  <div style={{ position: "absolute", top: 8, right: 8, background: cat.color, color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "bold" }}>
                    {inOrder.qty}
                  </div>
                )}
                <div style={{ fontSize: 13, color: COLORS.text, marginBottom: 6, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 15, color: COLORS.gold, fontWeight: "bold" }}>€{item.price.toFixed(2)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Order */}
      <div style={{ width: 300, display: "flex", flexDirection: "column", background: COLORS.surface }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 14, color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase" }}>
          Bestellung {order.length > 0 && `(${order.reduce((s, o) => s + o.qty, 0)} Artikel)`}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
          {order.length === 0 ? (
            <div style={{ color: COLORS.muted, fontSize: 13, textAlign: "center", marginTop: 40 }}>Noch keine Artikel</div>
          ) : (
            order.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: COLORS.text }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted }}>€{item.price.toFixed(2)} × {item.qty}</div>
                </div>
                <div style={{ fontSize: 13, color: COLORS.gold, minWidth: 50, textAlign: "right" }}>€{(item.price * item.qty).toFixed(2)}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button onClick={() => removeItem(item.id)} style={{ width: 24, height: 24, borderRadius: 4, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.red, cursor: "pointer", fontSize: 14 }}>−</button>
                  <button onClick={() => addItem(item)} style={{ width: 24, height: 24, borderRadius: 4, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.green, cursor: "pointer", fontSize: 14 }}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: 16, borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 20, fontWeight: "bold" }}>
            <span style={{ color: COLORS.muted }}>Gesamt</span>
            <span style={{ color: COLORS.gold }}>€{total.toFixed(2)}</span>
          </div>
          <button onClick={handlePay} disabled={order.length === 0 || paid} style={{
            width: "100%", padding: "14px", borderRadius: 10, border: "none",
            background: paid ? COLORS.green : order.length === 0 ? COLORS.border : COLORS.gold,
            color: paid ? "#fff" : order.length === 0 ? COLORS.muted : "#000",
            fontSize: 15, fontWeight: "bold", cursor: order.length === 0 ? "not-allowed" : "pointer",
          }}>
            {paid ? "✓ Bezahlt!" : "Kassieren"}
          </button>
          {order.length > 0 && (
            <button onClick={() => setOrder([])} style={{ width: "100%", marginTop: 8, padding: "10px", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.muted, fontSize: 13, cursor: "pointer" }}>
              Bestellung löschen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}