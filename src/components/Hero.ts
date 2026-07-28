export function Hero() {
  return `
    <section class="hero">
      <div class="hero-content">
        <h1>Build Faster With <span>Project Atlas</span></h1>
        <p>One workspace. Every developer tool you'll ever need.</p>
        <div class="hero-buttons">
          <a href="#" class="btn-primary">Launch Workspace</a>
          <a href="#" class="btn-secondary">Explore Toolkit</a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="visual-box">
          <div class="mock-window">
            <div class="mock-topbar">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="mock-url" id="mockUrl">atlas.dev/json-formatter</span>
            </div>
            <div class="mock-body" id="mockBody">
              <!-- JS isme content daalega -->
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

let heroInterval: number | undefined;

export function setupHeroDemo() {

  const slides = [
    {
      url: "atlas.dev/json-formatter",
      title: "🧾 JSON Formatter",
      code: `{"name":"Ali","age":22}`,
      resultClass: "success",
      resultText: "✅ JSON formatted successfully",
    },
    {
      url: "atlas.dev/uuid-generator",
      title: "🆔 UUID Generator",
      code: `a1b2c3d4-e5f6-7890-ab12-cd34ef567890`,
      resultClass: "success",
      resultText: "✅ New UUID generated",
    },
    {
      url: "atlas.dev/secret-scanner",
      title: "🔒 Secret Scanner",
      code: `const apiKey = "AKIA...MNOP"`,
      resultClass: "error",
      resultText: "🚨 AWS key detected on line 1",
    },
  ];

  const urlEl = document.getElementById("mockUrl");
  const bodyEl = document.getElementById("mockBody");

  if (!urlEl || !bodyEl) return;

  if (heroInterval) {
    clearInterval(heroInterval);
  }

  let index = 0;

  function render() {
    const slide = slides[index];

    urlEl!.textContent = slide.url;

    bodyEl!.innerHTML = `
      <div class="mock-title">${slide.title}</div>
      <div class="mock-code">${slide.code}</div>
      <div class="mock-result ${slide.resultClass}">${slide.resultText}</div>
    `;

    index = (index + 1) % slides.length;
  }

  render();
  heroInterval = setInterval(render, 3000);
}