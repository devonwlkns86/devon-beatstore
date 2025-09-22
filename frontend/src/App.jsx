// src/App.jsx
import { useRef, useState } from "react";
import Catalog from "./pages/Catalog.jsx";
import NowPlayingBar from "./components/NowPlayingBar.jsx";

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudioRef = useRef(null);

  // called by a TrackCard when user hits Play on it
  const handleRequestPlay = async (track, audioEl) => {
    // pause previously playing audio (if any)
    if (currentAudioRef.current && currentAudioRef.current !== audioEl) {
      try { currentAudioRef.current.pause(); } catch { }
    }
    currentAudioRef.current = audioEl;
    setCurrentTrack(track);
    setActiveId(track.id);
    setIsPlaying(true);
  };

  // bottom bar play/pause
  const handleToggleBar = async () => {
    const el = currentAudioRef.current;
    if (!el) return;
    if (el.paused) {
      await el.play();
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-900 pb-24">
      {/* top bar */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-black" />
            <span className="text-xl font-bold">Beat Store</span>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <a className="hover:underline underline-offset-4" href="#">Home</a>
            <a className="hover:underline underline-offset-4" href="#">Catalog</a>
            <a className="hover:underline underline-offset-4" href="#">Licenses</a>
            <a className="hover:underline underline-offset-4" href="#">Contact</a>
          </nav>
          <button className="px-3 py-1.5 rounded-xl bg-black text-white text-sm hover:opacity-90">
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

      {/* footer */}
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
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
