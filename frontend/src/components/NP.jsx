// src/components/NP.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePlayer } from "../state/playerContext";

export default function NP() {
  const { track, isPlaying, setIsPlaying } = usePlayer();
  const location = useLocation();
  const audioRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [lastError, setLastError] = useState("");

  const onCatalogPage = location.pathname.startsWith("/catalog");

  // keep src synced
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track?.audioUrl) return;
    setStatus("loading");
    setLastError("");
    audio.src = track.audioUrl;
    audio.preload = "auto";
    audio.muted = false;
    audio.volume = 1.0;
    const onCanPlay = () => setStatus(isPlaying ? "playing" : "ready");
    const onError = () => {
      setStatus("error");
      const code = audio.error ? audio.error.code : "unknown";
      setLastError(`Audio error (code ${code}) for ${audio.currentSrc || track.audioUrl}`);
    };
    audio.addEventListener("canplay", onCanPlay, { once: true });
    audio.addEventListener("error", onError, { once: true });
    audio.load();
    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
    };
  }, [track?.audioUrl]); // eslint-disable-line

  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const onPlay = () => setStatus("playing");
    const onPause = () => setStatus("paused");
    const onEnded = () => setStatus("paused");
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || !track?.audioUrl) return;
    try {
      if (!isPlaying) {
        if (audio.readyState < 2) { audio.load(); }
        await audio.play();
        setIsPlaying(true);
        setStatus("playing");
      } else {
        audio.pause();
        setIsPlaying(false);
        setStatus("paused");
      }
    } catch (err) {
      setStatus("error");
      setLastError(`play() failed: ${err?.name || ""} ${err?.message || String(err)}`);
      setIsPlaying(false);
    }
  }

  return (
    <div className="np" role="region" aria-label="Now Playing Bar">
      <audio ref={audioRef} preload="metadata" style={{ display: "none" }} />

      <span className="pill" aria-label="Provider">
        {track?.provider || "Unknown Provider"}
      </span>

      <div>
        <div className="title">{track?.title || "Nothing Playing"}</div>
        <div className="small">{track?.artist ? `by ${track.artist}` : "—"}</div>
      </div>

      <div className="spacer" />

      {track?.audioUrl ? (
        <>
          <button onClick={toggle} className="btn ghost" aria-label="Play/Pause">
            {isPlaying ? "Pause" : "Play"}
          </button>
          {!onCatalogPage && (
            <Link to="/catalog" className="btn ghost" aria-label="Open Catalog">Open Catalog</Link>
          )}
        </>
      ) : (
        <span className="small">(No audioUrl)</span>
      )}

      {/* subtle debug line while we style; remove later */}
      <div className="spacer" />
      <div className="small">status: <strong>{status}</strong>{lastError ? ` — ${lastError}` : ""}</div>
    </div>
  );
}
