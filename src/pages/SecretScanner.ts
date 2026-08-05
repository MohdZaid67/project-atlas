const secretPatterns = [
  {
    name: "AWS Access Key",
    regex: () => /AKIA[0-9A-Z]{16}/g,
  },
  {
    name: "GitHub Token",
    regex: () => /gh[pousr]_[A-Za-z0-9]{36,}/g,
  },
  {
    name: "Slack Token",
    regex: () => /xox[baprs]-[A-Za-z0-9-]{10,}/g,
  },
  {
    name: "Stripe Key",
    regex: () => /(sk|pk)_(live|test)_[A-Za-z0-9]{16,}/g,
  },
  {
    name: "Google API Key",
    regex: () => /AIza[0-9A-Za-z_\-]{35}/g,
  },
  {
    name: "JWT (JSON Web Token)",
    // header.payload.signature — always 3 base64 chunks separated by dots
    regex: () => /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
  },
  {
    name: "Generic API Key (quoted)",
    regex: () => /(api[_-]?key|apikey)['"]?\s*[:=]\s*['"][a-zA-Z0-9_\-]{16,}['"]/gi,
  },
  {
    name: "Generic API Key (.env style, no quotes)",
    regex: () => /(API[_-]?KEY|APIKEY)\s*=\s*[a-zA-Z0-9_\-]{16,}/g,
  },
  {
    name: "Generic Secret/Password (quoted)",
    regex: () => /(secret|password|pwd)['"]?\s*[:=]\s*['"][^'"]{6,}['"]/gi,
  },
  {
    name: "Generic Secret/Password (.env style, no quotes)",
    regex: () => /(SECRET|PASSWORD|PWD)\s*=\s*\S{6,}/g,
  },
];

// measures how "random" a string looks (Shannon entropy) —
// real secrets score high, normal words/names score low
export function calculateEntropy(text: string): number {
  const charCount: Record<string, number> = {};

  for (const char of text) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  let entropy = 0;
  for (const char in charCount) {
    const probability = charCount[char] / text.length;
    entropy -= probability * Math.log2(probability);
  }

  return entropy;
}

const ENTROPY_THRESHOLD = 3.2;

export function looksRandom(text: string): boolean {
  return calculateEntropy(text) > ENTROPY_THRESHOLD;
}

// only show first 4 + last 2 chars so we don't display real secrets on screen
export function mask(text: string): string {
  if (text.length <= 8) return "*".repeat(text.length);
  const start = text.slice(0, 4);
  const end = text.slice(-2);
  const stars = "*".repeat(text.length - 6);
  return `${start}${stars}${end}`;
}

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

        <label for="fileInput" class="file-upload-label">
          📁 Or upload a file instead
        </label>
        <input type="file" id="fileInput" accept=".env,.txt,.js,.ts,.json" />
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

  const fileInput =
    document.getElementById("fileInput") as HTMLInputElement;

  // browsers can only read a file if the user picks it manually —
  // dump the content into the same textarea so scanning logic stays the same
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      input.value = reader.result as string;
    };

    reader.readAsText(file);
  });

  button.addEventListener("click", () => {

    const code = input.value;

    if (!code.trim()) {
      resultsBox.innerHTML = `<p class="status-message warning">⚠️ Please paste some code first.</p>`;
      return;
    }

    const lines = code.split("\n");

    const findings: { line: number; type: string; text: string }[] = [];

    // tracks whether we're inside a -----BEGIN/END PRIVATE KEY----- block,
    // since the key body spans multiple lines, not just the header
    let insidePrivateKey = false;

    lines.forEach((lineText, index) => {

      if (/-----BEGIN (RSA|EC|DSA|OPENSSH)?\s?PRIVATE KEY-----/.test(lineText)) {
        insidePrivateKey = true;
        findings.push({ line: index + 1, type: "Private Key", text: mask(lineText.trim()) });
        return;
      }

      if (/-----END (RSA|EC|DSA|OPENSSH)?\s?PRIVATE KEY-----/.test(lineText)) {
        insidePrivateKey = false;
        findings.push({ line: index + 1, type: "Private Key", text: mask(lineText.trim()) });
        return;
      }

      if (insidePrivateKey && lineText.trim().length > 0) {
        findings.push({ line: index + 1, type: "Private Key (body)", text: mask(lineText.trim()) });
        return;
      }

      // once a specific pattern (AWS, GitHub, etc.) matches a line, skip the
      // generic patterns for that same line — avoids double-flagging
      let specificPatternAlreadyMatched = false;

      secretPatterns.forEach((pattern) => {

        const isGenericPattern = pattern.name.startsWith("Generic");

        if (isGenericPattern && specificPatternAlreadyMatched) {
          return;
        }

        // fresh regex each time — reusing a "g" flag regex across calls
        // makes it silently skip matches on later lines (lastIndex bug)
        const regex = pattern.regex();
        const match = lineText.match(regex);

        if (!match) return;

        if (isGenericPattern && !looksRandom(match[0])) {
          return;
        }

        if (!isGenericPattern) {
          specificPatternAlreadyMatched = true;
        }

        findings.push({
          line: index + 1,
          type: pattern.name,
          text: mask(lineText.trim()),
        });
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
        <p class="status-message" style="font-size: 0.85em; opacity: 0.8;">
          ℹ️ Secrets are masked above for your safety — this tool never stores or sends your code anywhere.
        </p>
      `;
    }

  });

}