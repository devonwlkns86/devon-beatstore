import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const PlayerCtx = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [track, setTrack] = useState(null); // { id, title, artist, src }
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastError, setLastError] = useState(null);

  const playTrack = async (t) => {
    setTrack(t);
    setLastError(null);
    const el = audioRef.current;
    if (!el) return;
    el.src = t.src;
    el.load();
    try {
      await el.play();
      setIsPlaying(true);
      console.debug("[Player] Playing:", el.currentSrc);
    } catch (e) {
      setIsPlaying(false);
      setLastError(e?.message || String(e));
      console.error("[Player] play() failed for src:", el.currentSrc, e);
      alert(`Could not start audio.\nTried: ${el.currentSrc || t.src}\nTips:\n• Open that URL directly in your browser.\n• If 404: ensure the file is in the correct /public location.\n• If autoplay blocked: click Play once.`);
    }
  };

  const togglePlayPause = async () => {
    const el = audioRef.current;
    if (!el) return;
    setLastError(null);
    try {
      if (isPlaying) {
        el.pause();
        setIsPlaying(false);
      } else {
        await el.play();
        setIsPlaying(true);
      }
    } catch (e) {
      setIsPlaying(false);
      setLastError(e?.message || String(e));
      console.error("[Player] toggle play() failed for src:", el.currentSrc, e);
      alert(`Could not start audio.\nTried: ${el.currentSrc || "(no src)"}\nCheck the file URL and try again.`);
    }
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => setTime(el.currentTime || 0);
    const onMeta = () => setDuration(el.duration || 0);
    const onEnded = () => setIsPlaying(false);
    const onErr = () => {
      const mediaErr = el.error;
      const code = mediaErr?.code;
      const msg =
        code === 1 ? "ABORTED" :
          code === 2 ? "NETWORK" :
            code === 3 ? "DECODE" :
              code === 4 ? "SRC_NOT_SUPPORTED" : "UNKNOWN";
      const details = `[${msg}] src=${el.currentSrc || "(none)"}`;
      console.error("[Player] <audio> error:", details, mediaErr);
      setLastError(details);
      setIsPlaying(false);
      alert(`Audio error: ${details}`);
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnded);
    el.addEventListener("error", onErr);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("error", onErr);
    };
  }, []);

  const value = useMemo(() => ({
    audioRef, track, isPlaying, time, duration, lastError,
    playTrack, togglePlayPause,
    pause: () => { const el = audioRef.current; if (!el) return; el.pause(); setIsPlaying(false); },
    seek: (sec) => { const el = audioRef.current; if (!el) return; el.currentTime = Math.min(Math.max(sec, 0), duration || 0); setTime(el.currentTime); },
  }), [track, isPlaying, time, duration, lastError]);

  return (
    <PlayerCtx.Provider value={value}>
      <audio ref={audioRef} preload="auto" />
      {children}
    </PlayerCtx.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
