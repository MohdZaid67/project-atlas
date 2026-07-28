export function ToolCard(title: string, description: string, link: string, icon: string, color: string) {
  return `
    <div class="tool-card">
      <div class="tool-icon" style="background: ${color}">${icon}</div>
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${link}" class="tool-btn">Open Tool ></a>
    </div>
  `;
}