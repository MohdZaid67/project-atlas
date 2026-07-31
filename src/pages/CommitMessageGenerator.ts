

export function CommitMessageGenerator() {
  return `
    <section class="tool-page">
      <a href="#" class="back-link">← Back to Home</a>

      <h2>Commit Message Generator</h2>

      <p class="tool-subtitle">
        Describe what you changed, and get a proper commit message suggestion.
      </p>

      <div class="io-block">
        <label for="changeInput">What did you change?</label>

        <textarea
          id="changeInput"
          placeholder="e.g. added a copy button to the JSON formatter"
        ></textarea>
      </div>

      <button id="generateBtn" class="tool-primary-btn">
        Generate Commit Message
      </button>

      <div class="io-block">
        <label for="messageOutput">Suggested Message</label>

        <textarea id="messageOutput" readonly></textarea>

        <button
          id="copyBtn"
          class="copy-btn"
          style="display:none;"
        >
          Copy
        </button>
      </div>

      <p id="statusMsg" class="status-message"></p>
    </section>
  `;
}

export function setupCommitMessageGenerator() {
  const input = document.getElementById("changeInput") as HTMLTextAreaElement;
  const output = document.getElementById("messageOutput") as HTMLTextAreaElement;
  const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
  const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement;
  const status = document.getElementById("statusMsg") as HTMLParagraphElement;

  generateBtn.addEventListener("click", async () => {
    const prompt = input.value.trim();

    if (!prompt) {
      status.textContent = "⚠️ Please describe your changes.";
      status.className = "status-message warning";
      return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    output.value = "";
    copyBtn.style.display = "none";
    status.textContent = "";

    try {
      const aiClient = (globalThis as any).ai;

      if (!aiClient?.models?.generateContent) {
        throw new Error("AI API is not available in this browser environment.");
      }

      const result = await aiClient.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Generate ONE professional Conventional Commit message.

Rules:
- Return ONLY the commit message.
- Use Conventional Commits.
- No explanation.
- No quotes.

Examples:
feat: add login page
fix: resolve JSON parsing bug
refactor: improve navbar structure

Change:
${prompt}`,
      });

      const message = result.text?.trim();

      if (!message) {
        throw new Error("Gemini returned an empty response.");
      }

      output.value = message;

      copyBtn.style.display = "inline-block";

      status.textContent = "✅ Commit message generated.";
      status.className = "status-message success";
    } catch (error) {
      console.error(error);

      status.textContent =
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Something went wrong.";

      status.className = "status-message error";
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = "Generate Commit Message";
    }
  });

  copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(output.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  });
}