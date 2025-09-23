// src/App.jsx
import { useRef, useState } from "react";
import Catalog from "./pages/Catalog.jsx";
import NowPlayingBar from "./components/NowPlayingBar.jsx";

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudioRef = useRef(null);

  const handleRequestPlay = async (track, audioEl) => {
    if (currentAudioRef.current && currentAudioRef.current !== audioEl) {
      try { currentAudioRef.current.pause(); } catch { }
    }
    currentAudioRef.current = audioEl;
    setCurrentTrack(track);
    setActiveId(track.id);
    setIsPlaying(true);
  };

  const handleToggleBar = async () => {
    const el = currentAudioRef.current;
    if (!el) return;
    if (el.paused) { await el.play(); setIsPlaying(true); }
    else { el.pause(); setIsPlaying(false); }
  };

  return (
    <main className="min-h-dvh bg-softblack text-white pb-24">
      {/* TEMP: neon banner to prove header renders */}
      <div className="bg-yellow-400 text-black font-extrabold text-center py-2">
        HEADER TEST — YOU SHOULD SEE THIS BAR
      </div>

      {/* top bar (also forced visible colors) */}
      <header className="border-b border-yellow-400 bg-black sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-yellow-400 shadow-[0_0_12px_2px_rgba(255,223,0,0.8)]" />
            <span className="text-xl font-bold">Beat Store</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            {["Home", "Catalog", "Licenses", "Contact"].map((item) => (
              <a key={item} href="#" className="px-2 py-1 rounded hover:bg-yellow-300/30">
                {item}
              </a>
            ))}
          </nav>
          <button className="px-3 py-1.5 rounded-xl bg-yellow-400 text-black font-medium hover:shadow-[0_0_12px_2px_rgba(255,223,0,0.8)] transition">
            Sign In
          </button>
        </div>
      </header>

      {/* main content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Catalog
          activeId={activeId}
          onRequestPlay={handleRequestPlay}
        />
      </section>

      {/* footer (forced visible) */}
      <footer className="border-t border-yellow-400 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-yellow-200">
          © {new Date().getFullYear()} Beat Store — All rights reserved.
        </div>
      </footer>

      {/* sticky bottom bar */}
      <NowPlayingBar
        track={currentTrack}
        isPlaying={isPlaying}
        onToggle={handleToggleBar}
      />
    </main>
  );
}
