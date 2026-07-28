const secretPatterns = [
  {
    name: "AWS Access Key",
    regex: /AKIA[0-9A-Z]{16}/g,
  },
  {
    name: "Generic API Key",
    regex: /(api[_-]?key|apikey)['"]?\s*[:=]\s*['"][a-zA-Z0-9_\-]{16,}['"]/gi,
  },
  {
    name: "Private Key",
    regex: /-----BEGIN (RSA|EC|DSA|OPENSSH)?\s?PRIVATE KEY-----/g,
  },
  {
    name: "Generic Secret/Password",
    regex: /(secret|password|pwd)['"]?\s*[:=]\s*['"][^'"]{6,}['"]/gi,
  },
];

export function SecretScanner() {
  return `
    <section class="tool-page">
      <a href="#" class="back-link">← Back to Home</a>

      <h2>Secret Scanner</h2>
      <p class="tool-subtitle">Paste your code below to check for accidentally exposed API keys, passwords, or credentials.</p>

      <div class="io-block">
        <label for="secretInput">Paste your code</label>

        <textarea
          id="secretInput"
          placeholder="Paste your .env content or code here..."
        ></textarea>
      </div>

      <button id="scanBtn" class="tool-primary-btn">Scan for Secrets</button>

      <div id="scanResults" class="scan-results"></div>

    </section>
  `;
}

export function setupSecretScanner() {

  const input =
    document.getElementById("secretInput") as HTMLTextAreaElement;

  const button =
    document.getElementById("scanBtn") as HTMLButtonElement;

  const resultsBox =
    document.getElementById("scanResults") as HTMLDivElement;

  button.addEventListener("click", () => {

    const code = input.value;

    if (!code.trim()) {
      resultsBox.innerHTML = `<p class="status-message warning">⚠️ Please paste some code first.</p>`;
      return;
    }

    const lines = code.split("\n");

    const findings: { line: number; type: string; text: string }[] = [];

    lines.forEach((lineText, index) => {

      secretPatterns.forEach((pattern) => {

        if (pattern.regex.test(lineText)) {
          findings.push({
            line: index + 1,
            type: pattern.name,
            text: lineText.trim(),
          });
        }

      });

    });

    if (findings.length === 0) {
      resultsBox.innerHTML = `<p class="status-message success">✅ No secrets detected. Looks clean!</p>`;
    } else {

      const listItems = findings.map((f) => `
        <li class="finding-item">
          <strong>Line ${f.line}:</strong> ${f.type}
          <div class="finding-code">${f.text}</div>
        </li>
      `).join("");

      resultsBox.innerHTML = `
        <p class="status-message error">🚨 ${findings.length} potential secret(s) found!</p>
        <ul class="findings-list">${listItems}</ul>
      `;
    }

  });

}