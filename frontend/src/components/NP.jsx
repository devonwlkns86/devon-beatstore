// src/components/NP.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePlayer } from "../state/playerContext";

export default function NP() {
  const { track, isPlaying, setIsPlaying } = usePlayer();
  const location = useLocation();
  const audioRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | playing | paused | error
  const [lastError, setLastError] = useState("");

  const barStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    padding: "10px 12px",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    zIndex: 9999,
    flexWrap: "wrap",
  };
  const titleStyle = { fontWeight: 600 };
  const pillStyle = {
    border: "1px solid #444",
    padding: "2px 8px",
    borderRadius: "999px",
    fontSize: "12px",
    lineHeight: "18px",
  };
  const spacerStyle = { flex: 1, minWidth: 12 };
  const btnStyle = {
    border: "1px solid #888",
    padding: "6px 10px",
    borderRadius: 6,
    fontSize: 14,
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  };
  const smallStyle = { fontSize: 12, opacity: 0.8 };

  const onCatalogPage = location.pathname.startsWith("/catalog");

  // Keep the <audio> src in sync with the current track URL and prep it
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!track?.audioUrl) {
      setStatus("idle");
      setLastError("");
      return;
    }

    try {
      setStatus("loading");
      setLastError("");
      audio.src = track.audioUrl;
      audio.preload = "auto";
      audio.muted = false;
      audio.volume = 1.0;
      // Force (re)load; wait for canplay or error
      const onCanPlay = () => {
        setStatus("ready");
      };
      const onError = () => {
        setStatus("error");
        const err = audio.error;
        const code = err ? err.code : "unknown";
        setLastError(`Audio element error (code ${code}) for ${audio.currentSrc || track.audioUrl}`);
      };
      audio.addEventListener("canplay", onCanPlay, { once: true });
      audio.addEventListener("error", onError, { once: true });
      audio.load();
      return () => {
        audio.removeEventListener("canplay", onCanPlay);
        audio.removeEventListener("error", onError);
      };
    } catch (e) {
      setStatus("error");
      setLastError(`Exception while setting src: ${String(e)}`);
    }
  }, [track?.audioUrl]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || !track?.audioUrl) return;

    try {
      if (!isPlaying) {
        // If not ready yet, try to load first
        if (status === "loading") {
          // Let it finish loading, then try play
          await new Promise((res) => setTimeout(res, 100));
        }
        setStatus("loading");
        await audio.play(); // user gesture
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
      // keep UI consistent
      setIsPlaying(false);
    }
  }

  // Keep UI state in sync with native events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setStatus("playing");
    const onPause = () => setStatus("paused");
    const onEnded = () => setStatus("paused");
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div style={barStyle} role="region" aria-label="Now Playing Bar">
      {/* Keep visible controls for verification */}
      <audio ref={audioRef} controls style={{ height: 24 }} />

      <span style={pillStyle}>{track?.provider || "Unknown Provider"}</span>

      <div>
        <div style={titleStyle}>{track?.title || "Nothing Playing"}</div>
        <div style={smallStyle}>{track?.artist ? `by ${track.artist}` : "—"}</div>
      </div>

      <div style={spacerStyle} />

      {track?.audioUrl ? (
        <>
          <button onClick={toggle} style={btnStyle}>{isPlaying ? "Pause" : "Play"}</button>
          <a
            href={track.audioUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#9cf", fontSize: 12, marginLeft: 8, textDecoration: "underline" }}
          >
            open file
          </a>
        </>
      ) : (
        <span style={smallStyle}>(No audioUrl)</span>
      )}

      <div style={{ width: "100%" }} />
      <div style={smallStyle}>
        status: <strong>{status}</strong>{lastError ? ` — ${lastError}` : ""}
      </div>

      {onCatalogPage ? (
        <span style={{ fontSize: 12, opacity: 0.7, marginLeft: 8 }}>(In Catalog)</span>
      ) : (
        <Link
          to="/catalog"
          style={{
            textDecoration: "none",
            border: "1px solid #888",
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 14,
            color: "#fff",
            marginLeft: 8,
          }}
        >
          Open Catalog
        </Link>
      )}
    </div>
  );
}
