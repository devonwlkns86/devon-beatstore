import { useMemo, useState, useRef, useEffect } from "react";
import TrackCard from "../components/TrackCard.jsx";
import Filters from "../components/Filters.jsx";

export default function Catalog() {
  // 1) your track list
  const tracks = [
    {
      title: "No Amnesty",
      genre: "RnB",
      bpm: 92,
      keySig: "Am",
      previewSrc: "/audio/previews/no-amnesty-preview.mp3",
      coverSrc: "/img/covers/no-amnesty.jpg",
    },
    {
      title: "Smoother Operator",
      genre: "Aggressive Rap",
      bpm: 140,
      keySig: "Fm",
      previewSrc: "/audio/no-amnesty.mp3", // placeholder if you want
      coverSrc: null,
    },
  ];

  // 2) filter state
  const [filters, setFilters] = useState({}); // { genre, bpmMin, bpmMax, query }

  // 3) filtering logic (simple & readable)
  const filtered = useMemo(() => {
    return tracks.filter((t) => {
      if (filters.genre && t.genre !== filters.genre) return false;

      if (filters.bpmMin && t.bpm < Number(filters.bpmMin)) return false;
      if (filters.bpmMax && t.bpm > Number(filters.bpmMax)) return false;

      if (filters.query) {
        const q = filters.query.toLowerCase();
        const hay = [
          t.title,
          t.genre,
          t.keySig,
          // add more searchable fields later (mood, tags, etc.)
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tracks, filters]);

  // 4) (nice UX) when one audio plays, pause all others
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

      {/* results count */}
      <div style={{ marginBottom: 12, color: "#666" }}>
        Showing {filtered.length} of {tracks.length}
      </div>

      {/* list */}
      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((t, i) => (
          <TrackCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
