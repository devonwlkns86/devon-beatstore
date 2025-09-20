export default function Hello({ name = "Dev" }) {
  return (
    <div>
      <h2>Hello, {name}! 👋</h2>
      <p>Child component is rendering correctly.</p>
    </div>
  );
}
