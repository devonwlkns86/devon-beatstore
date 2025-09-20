# Vite + React Boilerplate (with Now Playing bar)

## Features (F1 + F2)
- ✅ Minimal app skeleton (Home + Catalog pages via React Router)
- ✅ Global Now Playing bar (persists across routes)
- ✅ Player Context (shared track state + play/pause)
- ✅ Audio test page (`/audio-test`) for debugging

## How to Use
1. Clone this repo
2. Install deps:
   ```bash
   npm install
   
src/
  App.jsx              # App shell + Router
  main.jsx             # Entry point
  state/playerContext.jsx # Global track state
  components/NP.jsx    # Now Playing bar
  pages/Home.jsx       # Home page
  pages/Catalog.jsx    # Catalog page
  pages/AudioTest.jsx  # Bare test page

