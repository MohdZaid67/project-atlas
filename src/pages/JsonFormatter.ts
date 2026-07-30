export function JsonFormatter() {
  return `
    <section class="tool-page">
      <a href="#" class="back-link">← Back to Home</a>

      <h2>JSON Formatter</h2>

      <div class="tool-body">

        <!-- Input Section -->
        <div class="io-block">
          <label for="jsonInput">Paste JSON</label>

          <textarea
            id="jsonInput"
            placeholder='{"name":"Ali","age":22}'
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button id="formatBtn">Format</button>
          <button id="minifyBtn">Minify</button>
        </div>

        <!-- Output Section -->
        <div class="io-block">
          <label for="jsonOutput">Formatted Output</label>

          <textarea
            id="jsonOutput"
            readonly
          ></textarea>

          <button id="copyBtn" class="copy-btn" style="display:none;">Copy</button>

          <!-- Status Message (currently empty) -->
          <p id="jsonStatus" class="status-message"></p>

        </div>

      </div>
    </section>
  `;
}

export function setupJsonFormatter() {

  const input =
    document.getElementById("jsonInput") as HTMLTextAreaElement;

  const output =
    document.getElementById("jsonOutput") as HTMLTextAreaElement;

  const button =
    document.getElementById("formatBtn") as HTMLButtonElement;

  const minifyButton =
    document.getElementById("minifyBtn") as HTMLButtonElement;

  const copyButton =
    document.getElementById("copyBtn") as HTMLButtonElement;

  const status =
    document.getElementById("jsonStatus") as HTMLParagraphElement;

  // Extracts a line number from a JSON.parse error message, if present.
  // V8 (Chrome/Node) errors look like: "Unexpected token } in JSON at position 42"
  function getErrorDetail(error: unknown, rawInput: string): string {
    if (!(error instanceof Error)) return "Invalid JSON.";

    const positionMatch = error.message.match(/position (\d+)/);

    if (positionMatch) {
      const position = parseInt(positionMatch[1], 10);
      const upToError = rawInput.slice(0, position);
      const line = upToError.split("\n").length;
      const lastNewline = upToError.lastIndexOf("\n");
      const column = position - lastNewline;

      return `${error.message} (Line ${line}, Column ${column})`;
    }

    return error.message;
  }

  function setStatus(message: string, type: "success" | "warning" | "error") {
    status.textContent = message;
    status.className = `status-message ${type}`;
  }

  // Shared logic for both Format and Minify — avoids duplicating try/catch twice
  function processJson(mode: "format" | "minify") {

    if (!input.value.trim()) {
      output.value = "";
      copyButton.style.display = "none";
      setStatus("⚠️ Please enter JSON.", "warning");
      return;
    }

    try {
      const parsed = JSON.parse(input.value);
      const result = mode === "format"
        ? JSON.stringify(parsed, null, 2)
        : JSON.stringify(parsed);

      output.value = result;
      copyButton.style.display = "inline-block";

      setStatus(
        mode === "format"
          ? "✅ JSON formatted successfully."
          : "✅ JSON minified successfully.",
        "success"
      );

    } catch (error) {
      output.value = "";
      copyButton.style.display = "none";
      setStatus(`❌ ${getErrorDetail(error, input.value)}`, "error");
    }
  }

  button.addEventListener("click", () => processJson("format"));
  minifyButton.addEventListener("click", () => processJson("minify"));

  // Copy result to clipboard
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      const originalText = copyButton.textContent;
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 1500);
    } catch {
      setStatus("❌ Could not copy to clipboard.", "error");
    }
  });

  // Keyboard shortcut: Ctrl+Enter (or Cmd+Enter on Mac) triggers Format
  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      processJson("format");
    }
  });

}