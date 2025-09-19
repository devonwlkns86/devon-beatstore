export default function Contact() {
  return (
    <section style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 8 }}>Contact</h1>
      <p style={{ marginBottom: 12 }}>
        For inquiries, collabs, or licensing questions:
      </p>
      <ul style={{ lineHeight: 1.8 }}>
        <li>
          Email:{" "}
          <a href="mailto:youremail@example.com">
            youremail@example.com
          </a>
        </li>
        <li>
          Instagram:{" "}
          <a href="https://instagram.com/yourhandle" target="_blank" rel="noreferrer">
            @yourhandle
          </a>
        </li>
        <li>
          YouTube:{" "}
          <a href="https://youtube.com/@yourchannel" target="_blank" rel="noreferrer">
            @yourchannel
          </a>
        </li>
      </ul>
    </section>
  );
}
