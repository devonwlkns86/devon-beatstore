// src/pages/Catalog.jsx
import { useRef, useState, useEffect } from "react";

// === real audio assets (exact filenames you showed) ===
import neonStreet from "../assets/neon-street-Asharpm-bpm120.mp3";
import tropicanna from "../assets/tropicanna-Em-bpm140.mp3";
import whereYouAre from "../assets/whereyouare-Bm-bpm90.mp3";

// simple seed list for the grid
const TRACKS = [
  { id: "neon", title: "Neon Street", artist: "Devon", key: "A♯m", bpm: 120, src: neonStreet },
  { id: "tropicanna", title: "Tropicanna", artist: "Devon", key: "E m", bpm: 140, src: tropicanna },
  { id: "wya", title: "Where You Are", artist: "Devon", key: "B m", bpm: 90, src: whereYouAre },
];

function TrackCard({ track, isActive, onRequestPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);

  // if some other track became active, reflect paused UI on this card
  useEffect(() => {
    if (!isActive && isPlaying) {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }, [isActive, isPlaying]);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      // tell parent which track + element wants to play
      await onRequestPlay(track, el);
      await el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <article className="rounded-2xl shadow bg-white p-4 space-y-3">
      <div className="aspect-video rounded-xl bg-slate-100 grid place-items-center text-slate-400">
        <span className="text-sm">Cover Art</span>
      </div>

      <div>
        <h3 className="font-semibold">{track.title}</h3>
        <p className="text-sm text-gray-600">{track.artist} • {track.key} • {track.bpm} BPM</p>
      </div>

      <audio ref={audioRef} src={track.src} preload="auto" />

      <button
        onClick={toggle}
        className="px-3 py-1.5 rounded-xl bg-black text-white text-sm hover:opacity-90"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </article>
  );
}

export default function Catalog({ activeId, onRequestPlay }) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Catalog</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((t) => (
          <TrackCard
            key={t.id}
            track={t}
            isActive={activeId === t.id}
            onRequestPlay={onRequestPlay}
          />
        ))}
      </div>
    </main>
  );
}
