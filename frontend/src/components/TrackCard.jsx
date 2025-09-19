export default function TrackCard({ title, genre, bpm, keySig, previewSrc }) {
  const box = {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: 16,
    display: "grid",
    gridTemplateColumns: "64px 1fr",
    gap: 16,
    alignItems: "center",
  };

  const thumb = {
    width: 64,
    height: 64,
    borderRadius: 12,
    background: "#f3f3f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    color: "#555",
  };

  const meta = { fontSize: 12, color: "#666" };

  return (
    <div style={box}>
      <div style={thumb}>{keySig || "–"}</div>
      <div>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={meta}>
          {genre} • {bpm} BPM • {keySig}
        </div>
        <audio
          style={{ width: "100%", marginTop: 8 }}
          controls
          preload="none"
          src={previewSrc} // e.g. "/audio/demo_preview.mp3"
        />
      </div>
    </div>
  );
}
