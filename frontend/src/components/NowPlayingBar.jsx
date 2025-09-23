// src/components/NowPlayingBar.jsx
export default function NowPlayingBar({ track, isPlaying, onToggle }) {
  if (!track) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="rounded-2xl shadow-gold bg-softblack border border-softgold/30 px-4 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="truncate font-semibold text-softgold">{track.title}</div>
            <div className="text-sm text-gray-400 truncate">
              {track.artist} • {track.key} • {track.bpm} BPM
            </div>
          </div>
          <button
            onClick={onToggle}
            className="px-4 py-2 rounded-xl bg-softgold text-softblack font-semibold hover:shadow-gold transition"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
