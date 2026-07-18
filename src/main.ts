import "./style.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { ToolCard } from "./components/ToolCard";
import { JsonFormatter, setupJsonFormatter } from "./pages/JsonFormatter";
import { UuidGenerator ,setupUuidGenerator } from "./pages/UuidGenerator";

const app = document.querySelector("#app");

function renderHome() {
  app!.innerHTML = `
    ${Navbar()}
    ${Hero()}
    ${Features()}

    <main class="tools-container">
      ${ToolCard("Color Palette", "Generate and preview harmonious color schemes for your next design.", "#color-palette")}
      ${ToolCard("QR Generator", "Turn any link or text into a scannable QR code in seconds.", "#qr-generator")}
      ${ToolCard("JWT Decoder", "Decode and inspect JSON Web Tokens without leaving your browser.", "#jwt-decoder")}
      ${ToolCard("UUID Generator", "Create unique, collision-free IDs for your apps and databases.", "#uuid-generator")}
      ${ToolCard("Markdown Preview", "Write markdown on one side, see the live rendered output on the other.", "#markdown-preview")}
      ${ToolCard("Timestamp Converter", "Convert between Unix timestamps and human-readable dates instantly.", "#timestamp-converter")}
      ${ToolCard("JSON Formatter", "Format and validate messy JSON in one click.", "#json-formatter")}
    </main>
  `;
}

function router() {
  const hash = window.location.hash;

  if (hash === "#json-formatter") {
    app!.innerHTML = `${Navbar()}${JsonFormatter()}`;
    setupJsonFormatter();
  } else if (hash === "#uuid-generator") {
    app!.innerHTML = `${Navbar()}${UuidGenerator()}`;
    setupUuidGenerator();
  } else {
    renderHome();
  }
}

window.addEventListener("hashchange", router);
router();