export function UuidGenerator() {
    return `
    <section class="tool-page">
      <a href="#" class="back-link">← Back to Home</a>
      <h2>UUID Generator</h2>
      <p class="tool-subtitle">Generate unique, random identifiers instantly.</p>

      <div class="uuid-box">
        <span id="uuidOutput">Click generate to create a UUID</span>
        <button id="copyBtn">Copy</button>
      </div>

      <button id="generateBtn" class="tool-primary-btn">Generate New UUID</button>
    </section>
`;
}

export function setupUuidGenerator() {
  const output = document.getElementById("uuidOutput") as HTMLElement;
  const generateBtn = document.getElementById("generateBtn") as HTMLButtonElement;
  const copyBtn = document.getElementById("copyBtn") as HTMLButtonElement;

  let currentUuid = "";

  generateBtn.addEventListener("click", () => {
    currentUuid = crypto.randomUUID();
    output.textContent = currentUuid;
  });

  copyBtn.addEventListener("click", () => {
    if (!currentUuid) {
      copyBtn.textContent = "Generate first!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1500);
      return;
    }

    navigator.clipboard.writeText(currentUuid);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  });
}