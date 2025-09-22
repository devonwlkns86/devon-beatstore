// src/components/NowPlayingBar.jsx
export default function NowPlayingBar({ track, isPlaying, onToggle }) {
  // hidden if nothing has played yet
  if (!track) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="rounded-2xl shadow-lg bg-black text-white px-4 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="truncate font-semibold">{track.title}</div>
            <div className="text-sm text-white/70 truncate">
              {track.artist} • {track.key} • {track.bpm} BPM
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggle}
              className="px-4 py-2 rounded-xl bg-white text-black text-sm hover:opacity-90"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
