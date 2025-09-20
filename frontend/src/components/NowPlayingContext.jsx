// src/components/NowPlayingContext.jsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

const NowPlayingContext = createContext(null);

export default function NowPlayingProvider({ children }) {
  const audioRef = useRef(null);
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = useCallback((t) => {
    setTrack(t);
    setTimeout(function () {
      var el = audioRef.current;
      if (!el) return;
      el.play()
        .then(function () {
          setIsPlaying(true);
        })
        .catch(function (err) {
          console.warn("[NP] play() failed:", err);
        });
    }, 0);
  }, []);

  const clearTrack = useCallback(() => {
    var el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setIsPlaying(false);
    setTrack(null);
  }, []);

  const pause = useCallback(() => {
    var el = audioRef.current;
    if (el) {
      el.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    var el = audioRef.current;
    if (el) {
      el.play().catch(function () { });
      setIsPlaying(true);
    }
  }, []);

  const value = useMemo(function () {
    return {
      track: track,
      isPlaying: isPlaying,
      audioRef: audioRef,
      playTrack: playTrack,
      clearTrack: clearTrack,
      pause: pause,
      resume: resume,
    };
  }, [track, isPlaying, playTrack, clearTrack, pause, resume]);

  useEffect(function () {
    window.np = { playTrack: playTrack, clearTrack: clearTrack, pause: pause, resume: resume };
    return function () {
      delete window.np;
    };
  }, [playTrack, clearTrack, pause, resume]);

  return React.createElement(
    NowPlayingContext.Provider,
    { value: value },
    children,
    track
      ? React.createElement(
        "div",
        {
          style: {
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "12px 16px",
            background: "#0f172a",
            color: "white",
            borderTop: "3px solid #334155",
            zIndex: 9999,
          },
        },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "space-between",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              },
            },
            React.createElement("strong", null, track.title),
            " ",
            track.artist ? "by " + track.artist : null
          ),
          React.createElement("audio", {
            ref: audioRef,
            src: track.url,
            controls: true,
            style: { verticalAlign: "middle", maxWidth: 420, background: "white" },
            onEnded: clearTrack,
            onError: function (e) {
              console.warn("[NP] audio error", e);
            },
          }),
          React.createElement(
            "button",
            { onClick: clearTrack, style: { marginLeft: 16 } },
            "Close"
          )
        )
      )
      : null
  );
}

export function useNowPlaying() {
  const ctx = useContext(NowPlayingContext);
  if (!ctx) throw new Error("useNowPlaying must be used within <NowPlayingProvider>");
  return ctx;
}
