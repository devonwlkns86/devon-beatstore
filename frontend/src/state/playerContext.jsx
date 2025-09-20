// src/state/playerContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * Minimal global player state (no CSS).
 * Keep this simple; we’ll wire real data later.
 */
const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [track, setTrack] = useState({
    id: "song-001",
    title: "Your Song Title",
    artist: "Your Artist Name",
    provider: "Local Library",
    durationSec: 0,
    // Known-good test URL. Replace with your local file later.
    audioUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const value = useMemo(
    () => ({ track, setTrack, isPlaying, setIsPlaying }),
    [track, isPlaying]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within <PlayerProvider>");
  return ctx;
}
