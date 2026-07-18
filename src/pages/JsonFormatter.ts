export function JsonFormatter() {
  return `
    <section class="tool-page">
      <a href="#" class="back-link">← Back to Home</a>
      <h2>JSON Formatter</h2>

      <div class="tool-body">
        <div class="io-block">
          <label>Paste JSON</label>
          <textarea id="jsonInput" placeholder='{"naam":"Ali","age":22}'></textarea>
        </div>

        <button id="formatBtn">Format</button>

        <div class="io-block">
          <label>Formatted Output</label>
          <pre id="jsonOutput"></pre>
        </div>
      </div>
    </section>
  `;
}

export function setupJsonFormatter() {
  const input = document.getElementById("jsonInput") as HTMLTextAreaElement;
  const output = document.getElementById("jsonOutput") as HTMLElement;
  const button = document.getElementById("formatBtn") as HTMLButtonElement;

  button.addEventListener("click", () => {
    try {
      const parsed = JSON.parse(input.value);
      const formatted = JSON.stringify(parsed, null, 2);
      output.textContent = formatted;
    } catch (error) {
      output.textContent = "Invalid JSON!";
    }
  });
}