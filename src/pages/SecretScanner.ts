// ---------------------------------------------
// FIX 1: Patterns split into "quoted" and "unquoted" versions
// Reason: .env files usually DON'T have quotes
//   e.g.  API_KEY=abcd1234efgh5678
// But JS/TS code usually DOES have quotes
//   e.g.  const apiKey = "abcd1234efgh5678"
// One regex can't catch both formats well, so we check both.
// ---------------------------------------------

const secretPatterns = [
  {
    name: "AWS Access Key",
    regex: () => /AKIA[0-9A-Z]{16}/g,
  },
  {
    name: "GitHub Token",
    // GitHub tokens have very specific, fixed prefixes — no entropy
    // check needed, the prefix alone is a strong enough signal.
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
    // JWTs always look like three base64 chunks separated by dots:
    // header.payload.signature
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

// Random secrets usually score above ~3.0-3.5 on this scale.
// Normal words/sentences usually score lower.
const ENTROPY_THRESHOLD = 3.2;

export function looksRandom(text: string): boolean {
  return calculateEntropy(text) > ENTROPY_THRESHOLD;
}

// ---------------------------------------------
// FIX 2: mask() function
// Reason: If we show the FULL secret on screen, and someone
// takes a screenshot or it ends up in browser history/console,
// we just leaked the secret through our own "security tool".
// So we only show the first 4 and last 2 characters.
//   AKIAABCDEFGH1234  ->  AKIA***********34
// ---------------------------------------------

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

  // ---------------------------------------------
  // FILE UPLOAD
  // ---------------------------------------------
  // Browsers can't just "read a file path" like Node.js can —
  // for security reasons, JS in the browser can only read a file
  // if the USER picks it through a file input. FileReader is the
  // built-in browser API for reading that file's content as text.
  //
  // Once we read the file, we just dump its content into the same
  // textarea. This way we don't need any separate scanning logic
  // for "uploaded file" vs "pasted text" — it's the same code path.
  // ---------------------------------------------
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

    // ---------------------------------------------
    // PRIVATE KEY: BEGIN...END is a BLOCK, not one line
    // ---------------------------------------------
    // A private key looks like this across MANY lines:
    //   -----BEGIN RSA PRIVATE KEY-----
    //   MIIEpAIBAAKCAQEA1234567890abcdefgh   <- the actual key body
    //   -----END RSA PRIVATE KEY-----
    //
    // The old code only checked the BEGIN line. This flag
    // ("are we currently inside a key block?") lets us also
    // catch the lines in between, not just the header.
    // ---------------------------------------------
    let insidePrivateKey = false;

    lines.forEach((lineText, index) => {

      if (/-----BEGIN (RSA|EC|DSA|OPENSSH)?\s?PRIVATE KEY-----/.test(lineText)) {
        insidePrivateKey = true;
        findings.push({ line: index + 1, type: "Private Key", text: mask(lineText.trim()) });
        return; // this line is done, move to next line
      }

      if (/-----END (RSA|EC|DSA|OPENSSH)?\s?PRIVATE KEY-----/.test(lineText)) {
        insidePrivateKey = false;
        findings.push({ line: index + 1, type: "Private Key", text: mask(lineText.trim()) });
        return;
      }

      if (insidePrivateKey && lineText.trim().length > 0) {
        findings.push({ line: index + 1, type: "Private Key (body)", text: mask(lineText.trim()) });
        return; // no need to check other patterns, we already know this is a key
      }

      // For every other line, check against our normal pattern list.
      // We track if a SPECIFIC pattern (AWS, GitHub, Slack, etc.)
      // already matched this line — if so, we skip the "Generic"
      // patterns for the same line. Otherwise a line like
      // "GOOGLE_API_KEY=AIza..." gets flagged TWICE: once by the
      // specific "Google API Key" pattern, and again by the generic
      // ".env style API key" pattern, since both technically match.
      let specificPatternAlreadyMatched = false;

      secretPatterns.forEach((pattern) => {

        const isGenericPattern = pattern.name.startsWith("Generic");

        if (isGenericPattern && specificPatternAlreadyMatched) {
          return; // a more specific pattern already caught this line
        }

        // FIX (lastIndex bug): create a FRESH regex every time
        // instead of reusing one shared object. Reusing a "g" flag
        // regex across calls makes it silently skip later matches.
        const regex = pattern.regex();
        const match = lineText.match(regex);

        if (!match) return;

        // For the "Generic" patterns (API key / password / secret),
        // also check if the matched value actually LOOKS random.
        // This filters out false matches like: apiKey = "my-app-name"
        // AWS keys have a fixed format already, so we trust them
        // without needing an entropy check.
        if (isGenericPattern && !looksRandom(match[0])) {
          return; // doesn't look random enough to be a real secret
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