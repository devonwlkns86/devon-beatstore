import { useEffect, useRef } from "react";
import { useNowPlaying } from "./NowPlayingContext.jsx";

export default function NowPlayingBar() {
  const { track, clearTrack } = useNowPlaying();
  const audioRef = useRef(null);

  // auto-play when a new track is chosen
  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.play().catch(() => {
        /* autoplay may be blocked until user interacts; that's fine */
      });
    }
  }, [track]);

  if (!track) return null; // nothing selected yet

  const bar = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    background: "#fff",
    borderTop: "1px solid #eee",
    padding: "10px 16px",
    boxShadow: "0 -4px 16px rgba(0,0,0,0.06)",
  };

  return (
    <div style={bar}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <strong>{track.title}</strong> {track.artist && <>by {track.artist}</>}
        </div>
        <audio
          ref={audioRef}
          src={track.url}
          controls
          style={{ verticalAlign: "middle" }}
          onEnded={clearTrack}
        />
        <button onClick={clearTrack} style={{ marginLeft: 16 }}>Close</button>
      </div>
    </div>
  );