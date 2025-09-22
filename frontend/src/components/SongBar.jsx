// src/components/SongBar.jsx
import React, { useMemo, useState } from "react";
import { usePlayer } from "../state/PlayerContext";
import { useCart } from "../state/CartContext";

export default function SongBar({ track }) {
  const { track: current, setTrack, isPlaying, setIsPlaying } = usePlayer();
  const { addItem } = useCart();

  const isCurrent = current?.id === track.id;

  const [licenseId, setLicenseId] = useState(track.licenses?.[0]?.id || "mp3");
  const currentPrice = useMemo(() => {
    const hit = track.licenses?.find(l => l.id === licenseId);
    return hit ? hit.price : (track.price ?? 0);
  }, [track, licenseId]);

  const tags = useMemo(() => {
    const out = [];
    if (track.bpm) out.push(`${track.bpm} BPM`);
    if (track.key) out.push(track.key);
    if (track.genre) out.push(track.genre);
    return out;
  }, [track]);

  const play = () => { if (!isCurrent) setTrack(track); setIsPlaying(true); };
  const pause = () => setIsPlaying(false);

  return (
    <div className="songbar item" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", alignItems: "center", gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, border: "1px solid var(--line)", background: "var(--panel-2)", display: "grid", placeItems: "center", fontSize: 12, color: "var(--muted)" }}>
        {track.cover ? (
          <img src={track.cover} alt="" style={{ width: "100%", height: "100%", borderRadius: 8, objectFit: "cover" }} />
        ) : ("♪")}
      </div>

      <div className="song-meta" style={{ minWidth: 0 }}>
        <div className="title" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {track.title}
        </div>
        <div className="small" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          by {track.artist}
        </div>
        {!!tags.length && (
          <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tags.map(t => <span key={t} className="pill">{t}</span>)}
          </div>
        )}
      </div>

      {/* Play/Pause */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifySelf: "end" }}>
        {isCurrent && isPlaying
          ? <button className="btn primary" onClick={pause}>Pause</button>
          : <button className="btn" onClick={play}>Play</button>}
      </div>

      {/* License + Cart */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {track.licenses?.length > 0 && (
          <select
            value={licenseId}
            onChange={(e) => setLicenseId(e.target.value)}
            style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid var(--line)", background: "var(--panel)" }}
            aria-label="License"
          >
            {track.licenses.map(l => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        )}

        <div className="price">${currentPrice.toFixed(2)}</div>
        <button
          className="btn ghost"
          onClick={() => addItem(track, 1, licenseId, currentPrice)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
