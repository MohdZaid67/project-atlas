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
        </div>

        <!-- Output Section -->
        <div class="io-block">
          <label for="jsonOutput">Formatted Output</label>

          <textarea
            id="jsonOutput"
            readonly
          ></textarea>

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

  const status =
    document.getElementById("jsonStatus") as HTMLParagraphElement;

  button.addEventListener("click", () => {
    // Check if the input is empty
    if (!input.value.trim()) {
      output.value = "";
      status.textContent = "⚠️ Please enter JSON.";
      status.className = "status-message warning";
      return;
    }

    try {
      const parsed = JSON.parse(input.value);

      const formatted = JSON.stringify(parsed, null, 2);

      output.value = formatted;

      status.textContent = "✅ JSON formatted successfully.";
      status.className = "status-message success";

    } catch (error) {

      output.value = "";

      if (error instanceof Error) {
        status.textContent = `❌ ${error.message}`;
        status.className = "status-message error";
      } else {
        status.textContent = "❌ Invalid JSON.";
        status.className = "status-message error";
      }

    }

  });
}

