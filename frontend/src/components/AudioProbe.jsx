// src/components/AudioProbe.jsx
import { useRef, useState } from "react";

export default function AudioProbe() {
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [error, setError] = useState("");

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (el.paused) {
        await el.play();
        setPlaying(true);
        setError("");
      } else {
        el.pause();
        setPlaying(false);
      }
    } catch (e) {
      setError(e?.message || "Playback error");
    }
  };

  return (
    <div className="space-y-3">
      <audio
        ref={audioRef}
        src="/sample.mp3"  // <-- put your file at frontend/public/sample.mp3
        preload="auto"
      />
      <div className="text-sm text-gray-600">
        Drop a test file at <code>frontend/public/sample.mp3</code>
      </div>
      <button
        onClick={toggle}
        className="px-3 py-1.5 rounded-xl bg-black text-white text-sm hover:opacity-90"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      {error && <div className="text-sm text-red-600">⚠️ {error}</div>}
    </div>
  );
}
