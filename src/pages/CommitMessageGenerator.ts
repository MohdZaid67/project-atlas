import { generateCommitMessage } from "../services/groq";

export function CommitMessageGenerator() {
  return `
    <section class="tool-page">

      <a href="#" class="back-link">
        ← Back to Home
      </a>

      <h2>AI Commit Message Generator</h2>

      <p class="tool-subtitle">
        Describe your changes and let AI generate a professional Git commit message.
      </p>

      <div class="io-block">

        <label for="changeInput">
          What did you change?
        </label>

        <textarea
          id="changeInput"
          placeholder="Example:
Added dark mode
Fixed login bug
Improved navbar animation"
        ></textarea>

      </div>

      <button
        id="generateBtn"
        class="tool-primary-btn"
      >
        🤖 Generate with AI
      </button>

      <div class="io-block">

        <label for="messageOutput">
          AI Generated Commit Message
        </label>

        <textarea
          id="messageOutput"
          readonly
        ></textarea>

        <button
          id="copyBtn"
          class="copy-btn"
          style="display:none;"
        >
          Copy
        </button>

      </div>

      <p
        id="statusMsg"
        class="status-message"
      ></p>

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
    const userText = input.value.trim();

    if (userText === "") {
      status.textContent = "⚠️ Please describe your changes.";
      status.className = "status-message warning";
      return;
    }

    try {
      generateBtn.disabled = true;
      generateBtn.textContent = "Generating...";

      output.value = "";
      copyBtn.style.display = "none";

      status.textContent = "🤖 AI is generating your commit message...";
      status.className = "status-message";

     const aiMessage = await generateCommitMessage(userText);

output.value = aiMessage;

copyBtn.style.display = "inline-block";

status.textContent = "✅ AI commit message generated successfully!";
status.className = "status-message success";

    } catch (error) {
      console.error(error);

      status.textContent = "❌ Something went wrong.";
      status.className = "status-message warning";
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = "🤖 Generate with AI";
    }
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);

      copyBtn.textContent = "Copied!";

      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  });
}