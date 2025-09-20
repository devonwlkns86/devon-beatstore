// src/pages/AudioTest.jsx
import React from "react";

export default function AudioTest() {
  const box = {
    padding: "16px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  };
  const url = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
  return (
    <div style={box}>
      <h2>Audio Test (bare & native)</h2>
      <p>This is a plain &lt;audio&gt; tag with controls. No custom JS play().</p>
      <audio src={url} controls />
      <p>
        If this does not play, something outside our React code is blocking/unsupported.
        Try opening the file directly:&nbsp;
        <a href={url} target="_blank" rel="noreferrer">open audio in new tab</a>
      </p>
    </div>
  );
}
