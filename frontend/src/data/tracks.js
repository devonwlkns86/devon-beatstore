// src/data/tracks.js
export const tracks = [
  {
    id: "no-amnesty",
    title: "No Amnesty",
    artist: "Your Artist Name",
    bpm: 148,
    key: "F# min",
    genre: "hiphop",
    audioUrl: "/audio/previews/no-amnesty.mp3",
    cover: null,
    durationSec: 0,
    // Default (fallback) price shown if no license is chosen yet
    price: 29.0,
    // License tiers (you can tweak prices/labels anytime)
    licenses: [
      { id: "mp3",  label: "MP3 License",  price: 29.0 },
      { id: "wav",  label: "WAV License",  price: 49.0 },
      { id: "stems",label: "STEMS License",price: 99.0 },
    ],
  },
];
