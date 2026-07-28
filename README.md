# 🗺️ Project Atlas

A collection of fast, privacy-first developer utility tools — built entirely with vanilla HTML, CSS, and TypeScript. No frameworks, no data leaving your browser.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

## 🔗 Live Demo

[Add your deployed link here once you deploy]

## 📖 Table of Contents

- [Tools](#-tools)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Why I Built This](#-why-i-built-this)
- [Roadmap](#-roadmap)

## 🛠️ Tools

| Tool | Description |
|---|---|
| 🧾 JSON Formatter | Format and validate messy JSON in one click |
| 🆔 UUID Generator | Create unique, collision-free IDs for your apps and databases |
| 🔒 Secret Scanner | Detect accidentally exposed API keys, passwords, and credentials in code using regex pattern matching |

## 💻 Tech Stack

- **TypeScript** — type-safe logic, no `any`-driven chaos
- **Vite** — fast dev server and build tool
- **Vanilla CSS** — no framework, full control over design

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
├── components/     # Reusable UI pieces (Navbar, ToolCard, Hero, Features)
├── pages/          # Individual tool pages + their logic
├── core/           # App configuration
└── main.ts         # Router + entry point
```

## 📌 Why I Built This

Before this, I had built a few smaller projects — a currency converter, tic-tac-toe, a portfolio site, and an Amazon frontend clone. Those helped me get comfortable with the basics, but I wanted to build something that felt like a real, usable product instead of just a practice exercise.

Project Atlas started as a set of small utilities I'd actually use myself — a JSON formatter, a UUID generator. As I kept building, I wanted to solve a real problem instead of just recreating common tools, which led to the **Secret Scanner** — a tool that scans code for accidentally exposed API keys, passwords, and credentials.

This project also pushed me to properly structure a TypeScript project without a framework — writing my own routing logic, organizing components into separate files, and thinking about how a real codebase should be laid out, not just how to make something work.

## 🗺️ Roadmap

- [ ] Markdown Preview tool
- [ ] Timestamp Converter tool
- [ ] Command palette (Ctrl+K quick tool search)
- [ ] PWA support (installable, works offline)
- [ ] Unit tests with Vitest

---

⭐ If you find this useful, consider giving it a star!