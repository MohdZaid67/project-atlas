export function ToolCard(title: string, description: string, link: string) {
  return `
    <div class="tool-card">
      <div class="tool-icon"></div>
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${link}" class="tool-btn">Open Tool ></a>
    </div>
  `;
}