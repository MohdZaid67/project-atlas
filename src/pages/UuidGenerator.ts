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

  generateBtn.addEventListener("click", () => {
    output.textContent = crypto.randomUUID();
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.textContent || "");
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  });
}