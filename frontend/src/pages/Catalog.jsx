import { useMemo, useState, useEffect } from "react";
import TrackCard from "../components/TrackCard.jsx";
import Filters from "../components/Filters.jsx";

export default function Catalog() {
  // 1) your track list (add more objects here later)
  const tracks = [
    {
      title: "No Amnesty",
      genre: "RnB",
      bpm: 92,
      keySig: "Am",
      previewSrc: "/audio/previews/no-amnesty-preview.mp3", // change to your file if needed
      coverSrc: "/img/covers/no-amnesty.jpg",                // optional cover
    },
    {
      title: "Smoother Operator",
      genre: "Aggressive Rap",
      bpm: 140,
      keySig: "Fm",
      previewSrc: "/audio/no-amnesty.mp3", // placeholder; point to a real file later
      coverSrc: null,
    },
  ];

  // 2) FILTER STATE
  const [filters, setFilters] = useState({}); // { genre, bpmMin, bpmMax, query }

  // 3) SORT STATE (new)
  // options: "title-az" | "title-za" | "bpm-asc" | "bpm-desc"
  const [sortBy, setSortBy] = useState("title-az");

  // 4) FILTERING LOGIC
  const filtered = useMemo(() => {
    return tracks.filter((t) => {
      if (filters.genre && t.genre !== filters.genre) return false;

      if (filters.bpmMin && t.bpm < Number(filters.bpmMin)) return false;
      if (filters.bpmMax && t.bpm > Number(filters.bpmMax)) return false;

      if (filters.query) {
        const q = filters.query.toLowerCase();
        const hay = [t.title, t.genre, t.keySig].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tracks, filters]);

  // 5) SORTING LOGIC (new)
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "title-az":
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-za":
        arr.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "bpm-asc":
        arr.sort((a, b) => (a.bpm ?? 0) - (b.bpm ?? 0));
        break;
      case "bpm-desc":
        arr.sort((a, b) => (b.bpm ?? 0) - (a.bpm ?? 0));
        break;
      default:
        break; // leave as-is
    }
    return arr;
  }, [filtered, sortBy]);

  // 6) NICE UX: pause other players when one plays
  useEffect(() => {
    const onPlay = (e) => {
      document.querySelectorAll("audio").forEach((el) => {
        if (el !== e.target) el.pause();
      });
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
  }, []);

  return (
    <section style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 12 }}>Catalog</h2>

      {/* filter inputs */}
      <Filters value={filters} onChange={setFilters} />

      {/* toolbar: results count + sort dropdown */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 12
      }}>
        <div style={{ color: "#666" }}>
          Showing {sorted.length} of {tracks.length}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label htmlFor="sort" style={{ color: "#666" }}>Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
          >
            <option value="title-az">Title A–Z</option>
            <option value="title-za">Title Z–A</option>
            <option value="bpm-asc">BPM ↑</option>
            <option value="bpm-desc">BPM ↓</option>
          </select>
        </div>
      </div>

      {/* list */}
      <div style={{ display: "grid", gap: 12 }}>
        {sorted.map((t, i) => (
          <TrackCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
