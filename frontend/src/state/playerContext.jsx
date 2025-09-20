// src/state/playerContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [track, setTrack] = useState({
    id: "song-001",
    title: "No Amnesty",
    artist: "Your Artist Name",   // update to the real artist if you want
    provider: "Local Library",
    durationSec: 0,
    audioUrl: "/audio/previews/no-amnesty.mp3", // <-- your file path
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
