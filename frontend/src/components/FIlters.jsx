export default function Filters({ value, onChange }) {
  // helper to update any field
  const set = (k, v) => onChange({ ...value, [k]: v || undefined });

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 120px 120px 1fr",
      gap: 8,
      marginBottom: 12
    }}>
      {/* GENRE */}
      <select
        value={value.genre || ""}
        onChange={(e) => set("genre", e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
      >
        <option value="">All Genres</option>
        <option value="Aggressive Rap">Aggressive Rap</option>
        <option value="RnB">RnB</option>
        {/* add more later */}
      </select>

      {/* BPM MIN */}
      <input
        type="number"
        placeholder="BPM min"
        value={value.bpmMin || ""}
        onChange={(e) => set("bpmMin", e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
      />

      {/* BPM MAX */}
      <input
        type="number"
        placeholder="BPM max"
        value={value.bpmMax || ""}
        onChange={(e) => set("bpmMax", e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
      />

      {/* TEXT SEARCH */}
      <input
        placeholder="Search title / key / notes"
        value={value.query || ""}
        onChange={(e) => set("query", e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
      />
    </div>
  );
}
