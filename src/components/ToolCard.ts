export function ToolCard(title: string, description: string, link: string, icon: string, color: string, comingSoon: boolean = false) {
  return `
    <div class="tool-card ${comingSoon ? "coming-soon" : ""}">
      <div class="tool-icon" style="background: ${color}">${icon}</div>
      <h3>${title} ${comingSoon ? '<span class="badge">Coming Soon</span>' : ""}</h3>
      <p>${description}</p>
      ${comingSoon
        ? `<span class="tool-btn disabled">Coming Soon</span>`
        : `<a href="${link}" class="tool-btn">Open Tool ></a>`
      }
    </div>
  `;
}