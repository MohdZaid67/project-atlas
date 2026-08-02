import "./style.css";
import { Navbar } from "./components/Navbar";
import { Hero, setupHeroDemo } from "./components/Hero";
import { Features } from "./components/Features";
import { ToolCard } from "./components/ToolCard";
import { JsonFormatter, setupJsonFormatter } from "./pages/JsonFormatter";
import { UuidGenerator ,setupUuidGenerator } from "./pages/UuidGenerator";
import { SecretScanner, setupSecretScanner } from "./pages/SecretScanner"; 
import {
  CommitMessageGenerator,
  setupCommitMessageGenerator,
} from "./pages/CommitMessageGenerator";
const app = document.querySelector("#app");

function renderHome() {
  app!.innerHTML = `
    ${Navbar()}
    ${Hero()}
    ${Features()}

    <main class="tools-container">
      ${ToolCard("UUID Generator", "Create unique, collision-free IDs for your apps and databases.", "#uuid-generator", "🆔", "linear-gradient(135deg,#8b5cf6,#6366f1)")}
      ${ToolCard("JSON Formatter", "Format and validate messy JSON in one click.", "#json-formatter", "🧾", "linear-gradient(135deg,#14b8a6,#0d9488)")}
      ${ToolCard("Secret Scanner", "Detect accidentally exposed API keys, passwords, and credentials in your code.", "#secret-scanner", "🔒", "linear-gradient(135deg,#dc2626,#991b1b)")}
      ${ToolCard("Commit Message Generator", "Create polished Git commit messages from your changes in seconds.", "#commit-message-generator", "💬", "linear-gradient(135deg,#10b981,#059669)")}
    </main>
  `;
  setupHeroDemo();
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
  } else if (hash === "#commit-message-generator") {
    app!.innerHTML = `${Navbar()}${CommitMessageGenerator()}`;
    setupCommitMessageGenerator();
  } else {
    renderHome();
  }
}

window.addEventListener("hashchange", router);
router();