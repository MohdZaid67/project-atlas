import "./style.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { ToolCard } from "./components/ToolCard";
import { JsonFormatter, setupJsonFormatter } from "./pages/JsonFormatter";
import { UuidGenerator ,setupUuidGenerator } from "./pages/UuidGenerator";
import { SecretScanner, setupSecretScanner } from "./pages/SecretScanner";

const app = document.querySelector("#app");

function renderHome() {
  app!.innerHTML = `
    ${Navbar()}
    ${Hero()}
    ${Features()}

    <main class="tools-container">
      ${ToolCard("Color Palette", "Generate and preview harmonious color schemes for your next design.", "#color-palette", "🎨", "linear-gradient(135deg,#ec4899,#f97316)", true)}
${ToolCard("QR Generator", "Turn any link or text into a scannable QR code in seconds.", "#qr-generator", "🔲", "linear-gradient(135deg,#22c55e,#16a34a)", true)}
${ToolCard("JWT Decoder", "Decode and inspect JSON Web Tokens without leaving your browser.", "#jwt-decoder", "🔐", "linear-gradient(135deg,#ef4444,#dc2626)", true)}
${ToolCard("UUID Generator", "Create unique, collision-free IDs for your apps and databases.", "#uuid-generator", "🆔", "linear-gradient(135deg,#8b5cf6,#6366f1)")}
${ToolCard("Markdown Preview", "Write markdown on one side, see the live rendered output on the other.", "#markdown-preview", "📝", "linear-gradient(135deg,#f59e0b,#eab308)", true)}
${ToolCard("Timestamp Converter", "Convert between Unix timestamps and human-readable dates instantly.", "#timestamp-converter", "⏰", "linear-gradient(135deg,#3b82f6,#06b6d4)", true)}
${ToolCard("JSON Formatter", "Format and validate messy JSON in one click.", "#json-formatter", "🧾", "linear-gradient(135deg,#14b8a6,#0d9488)")}
${ToolCard("Secret Scanner", "Detect accidentally exposed API keys, passwords, and credentials in your code.", "#secret-scanner", "🔒", "linear-gradient(135deg,#dc2626,#991b1b)")}
    </main>
  `;
}

function router() {
  window.scrollTo(0, 0);
  const hash = window.location.hash;

  if (hash === "#json-formatter") {
    app!.innerHTML = `${Navbar()}${JsonFormatter()}`;
    setupJsonFormatter();
  } else if (hash === "#uuid-generator") {
    app!.innerHTML = `${Navbar()}${UuidGenerator()}`;
    setupUuidGenerator();
  } else if (hash === "#secret-scanner") {
    app!.innerHTML = `${Navbar()}${SecretScanner()}`;
    setupSecretScanner();
  } else {
    renderHome();
  }
}

window.addEventListener("hashchange", router);
router();