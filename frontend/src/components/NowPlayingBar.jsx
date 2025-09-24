import React, { useState, useEffect, useRef } from "react";

export default function NowPlayingBar() {
  // Example state hooks (adjust if your context provides these)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(200); // TEMP: fake duration so bar shows
  const audioRef = useRef(null);

  // Calculate progress percentage (fallback to 40% if no duration yet)
  const progressPercent =
    duration > 0 ? (currentTime / duration) * 100 : 40; // 40% TEMP so you see the glow

  return (
    <div
      id="NowPlayingBar"
      className="fixed bottom-0 inset-x-0 z-50 bg-black text-white border-t border-neutral-800 shadow-2xl"
    >
      {/* Content row */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Song info (stub for now) */}
        <div className="text-sm font-medium">Now Playing: Demo Track</div>

        {/* Debug time controls (stub values) */}
        <div className="text-xs text-neutral-400">
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full bg-neutral-800/90 rounded">
        <div
          className="absolute left-0 top-0 h-full bg-yellow-400 rounded
                     shadow-[0_0_16px_rgba(250,204,21,0.85)]
                     transition-[width] duration-300 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
