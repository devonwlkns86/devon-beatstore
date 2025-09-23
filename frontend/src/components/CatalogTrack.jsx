import React, { useMemo } from "react";
import { usePlayer } from "../context/PlayerContext";

/**
 * Props:
 * - track: { id, title, artist, src }
 */
export default function CatalogTrack({ track }) {
  const { track: current, isPlaying, playTrack, togglePlayPause } = usePlayer();

  const isCurrent = useMemo(() => current && current.id === track.id, [current, track]);
  const isGlowing = isCurrent && isPlaying;

  const onPress = () => {
    if (isCurrent) togglePlayPause();
    else playTrack(track);
  };

  return (
    <div className={`card p-3 flex items-center justify-between gap-3 ${isGlowing ? "glow-gold card--active" : ""}`}>
      <div className="min-w-0">
        <div className="truncate font-medium">{track.title}</div>
        <div className="truncate text-xs text-white/60">{track.artist}</div>
      </div>
      <button
        onClick={onPress}
        className="px-3 py-1 rounded-md border border-white/10 hover:border-white/20"
        aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
      >
        {isCurrent && isPlaying ? (
          <span className="inline-flex items-center gap-2">
            <span>Pause</span>
            <span className="eq" aria-hidden>
              <i></i><i></i><i></i><i></i>
            </span>
          </span>
        ) : (
          "Play"
        )}
      </button>
    </div>
  );
}
