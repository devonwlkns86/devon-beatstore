import React from "react";

// audio imports
import neonStreet from "../assets/neon-street-Asharpm-bpm120.mp3";
import tropicanna from "../assets/tropicanna-Em-bpm140.mp3";
import whereYouAre from "../assets/whereyouare-Bm-bpm90.mp3";

// thumbnail imports
import NeonThumb from "../assets/thumbs/NeonStreet.jpg";
import TropicannaThumb from "../assets/thumbs/Tropicanna.jpg";
import WhereThumb from "../assets/thumbs/WhereYouAre.jpg";

// track data
const tracks = [
  {
    id: 1,
    title: "Neon Street",
    bpm: 120,
    key: "A# minor",
    src: neonStreet,
    image: NeonThumb,
  },
  {
    id: 2,
    title: "Tropicanna",
    bpm: 140,
    key: "E minor",
    src: tropicanna,
    image: TropicannaThumb,
  },
  {
    id: 3,
    title: "Where You Are",
    bpm: 90,
    key: "B minor",
    src: whereYouAre,
    image: WhereThumb,
  },
];

export default function Catalog() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="rounded-xl overflow-hidden bg-neutral-900 shadow-md"
          >
            <img
              src={track.image}
              alt={track.title}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h3 className="text-white font-semibold">{track.title}</h3>
              <p className="text-sm text-neutral-400">
                {track.bpm} BPM • {track.key}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
