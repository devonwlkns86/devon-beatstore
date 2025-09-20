// src/data/posts.js

export const posts = [
  {
    id: "post-hello",
    slug: "hello-world",
    title: "Hello, World (Beatstore Dev Log #1)",
    date: "2025-09-20",
    excerpt: "Kicking off the dev log — routing, a global Now Playing bar, and genres.",
    content: `
Tonight I landed F1-F3:
- F1: minimal app skeleton with Home/Catalog routes.
- F2: global Now Playing bar with PlayerContext and Play/Pause.
- F3: Genres (list + detail).

Next up: Blog pages (this!), header links, and re-attaching the spicy CSS.
    `.trim(),
  },
  {
    id: "post-audio",
    slug: "audio-wiring",
    title: "Audio Wiring Notes",
    date: "2025-09-21",
    excerpt: "How the Now Playing bar keeps state and plays local files cleanly.",
    content: `
Key points:
- Put files under public/audio/… so they serve at /audio/…
- PlayerContext holds the current track and isPlaying.
- NP.jsx renders one <audio> element and controls play/pause via a button.

Known-good test URL used during debug:
https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3
    `.trim(),
  },
];
