# 🗺️ Project Atlas

A collection of fast, privacy-first developer utility tools — built entirely with vanilla HTML, CSS, and TypeScript. No frameworks, no data leaving your browser.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

## 🔗 Live Demo

**[project-atlas-one-rust.vercel.app](https://project-atlas-one-rust.vercel.app/)**

## 📖 Table of Contents

- [Tools](#-tools)
- [Tech Stack](#-tech-stack)
- [Testing](#-testing)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Why I Built This](#-why-i-built-this)
- [Roadmap](#-roadmap)

## 🛠️ Tools

| Tool | Status | Description |
|---|---|---|
| 🧾 JSON Formatter | ✅ Live | Format and validate messy JSON in one click |
| 🆔 UUID Generator | ✅ Live | Create unique, collision-free IDs for your apps and databases |
| 🔒 Secret Scanner | ✅ Live | Detects exposed secrets (AWS, GitHub, Slack, Stripe, Google, JWT) using pattern matching + entropy analysis to reduce false positives |
| 🎨 Color Palette | 🚧 Coming Soon | Generate harmonious color schemes for design work |
| 🔲 QR Generator | 🚧 Coming Soon | Turn any link or text into a scannable QR code |
| 🔐 JWT Decoder | 🚧 Coming Soon | Decode and inspect JSON Web Tokens |
| 📝 Markdown Preview | 🚧 Coming Soon | Live-rendered markdown editor |
| ⏰ Timestamp Converter | 🚧 Coming Soon | Convert between Unix timestamps and readable dates |

## 💻 Tech Stack

- **HTML5** — single-page app entry point (`index.html`), fully rendered via TypeScript
- **TypeScript** — type-safe logic, compiles down to plain JavaScript, no `any`-driven chaos
- **Vanilla CSS** — no framework, full control over design
- **Vite** — fast dev server and build tool

## ✅ Testing

Core logic (entropy calculation, secret masking) is covered with unit tests using Vitest.

```bash
npm test
```

## 🚀 Getting Started

```bash
git clone https://github.com/MohdZaid67/project-atlas.git
cd project-atlas
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── components/   # Reusable UI pieces (Navbar, ToolCard, Hero, Features)
├── core/         # App configuration
├── pages/        # Individual tool pages + their logic
├── style.css     # Global styles
└── main.ts       # Router + entry point
```

## 📸 Screenshots

### Landing Page
![Landing page of Project Atlas showing navigation, hero section, and tool cards in a clean browser-based developer dashboard](screenshots/landing%20page.png)

### Toolkit Dashboard
![Dashboard grid displaying utility tool cards, status badges, and a sidebar menu in a minimal interface](screenshots/toolkit%20grid%201.png)
![Second dashboard view showing additional project utility cards and a responsive layout in the app interface](screenshots/toolkit%20grid%202.png)
![Third toolkit preview with multiple tool cards, a top navigation bar, and a grid layout for developer utilities](screenshots/toolkit%20grid%203.png)

### Features Overview
![Features overview section showing benefits list and quick access cards within the Project Atlas interface](screenshots/features%20overview.png)

### UUID Generator
![UUID generator screen showing identifier creation controls and generated UUID output area](screenshots/uuid%20genrator.png)

### JSON Formatter
![JSON formatter tool interface displaying a code editor area, validation status, and formatting controls](screenshots/json%20formatter.png)

### Secret Scanner
![Secret scanner view showing code analysis results, detected pattern highlights, and scan controls](screenshots/secret%20scanner.png)

## 📌 Why I Built This

Before this, I had built a few smaller projects — a currency converter, tic-tac-toe, a portfolio site, and an Amazon frontend clone. Those helped me get comfortable with the basics, but I wanted to build something that felt like a real, usable product instead of just a practice exercise.

Project Atlas started as a set of small utilities I'd actually use myself — a JSON formatter, a UUID generator. As I kept building, I wanted to solve a real problem instead of just recreating common tools, which led to the **Secret Scanner** — a tool that scans code for accidentally exposed credentials across 6+ secret types (AWS keys, GitHub tokens, Slack tokens, Stripe keys, Google API keys, JWTs, and private keys). It goes beyond basic pattern matching by calculating Shannon entropy on generic matches to filter out false positives like `apiKey = "my-app-name"`, and handles multi-line private key blocks instead of just flagging the header line.

This project also pushed me to properly structure a TypeScript project without a framework — writing my own routing logic, organizing components into separate files, and cleaning up unused boilerplate code as the project grew, instead of just making something work and leaving it messy.

## 🗺️ Roadmap

- [ ] Color Palette Generator
- [ ] QR Code Generator
- [ ] JWT Decoder
- [ ] Markdown Preview
- [ ] Timestamp Converter
- [ ] Command palette (Ctrl+K quick tool search)
- [ ] PWA support (installable, works offline)

---

⭐ If you find this useful, consider giving it a star!