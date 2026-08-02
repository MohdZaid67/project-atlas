export function Navbar() {
  return `
    <nav class="navbar">

      <div class="nav-left">
        <div class="logo">
          <svg width="40" height="40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#5EC8F5"/>
                <stop offset="55%" stop-color="#3B82F6"/>
                <stop offset="100%" stop-color="#1D4ED8"/>
              </linearGradient>
              <linearGradient id="peakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="100%" stop-color="#EAF4FF"/>
              </linearGradient>
              <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FDE68A"/>
                <stop offset="100%" stop-color="#F5B93D"/>
              </radialGradient>
            </defs>
            <rect x="3" y="3" width="194" height="194" rx="44" fill="url(#bgGrad)"/>
            <rect x="3" y="3" width="194" height="194" rx="44" fill="none" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="1.5"/>
            <g stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="3" fill="none" stroke-linecap="round">
              <path d="M40 148 Q100 168 160 148"/>
              <path d="M48 162 Q100 178 152 162"/>
              <path d="M32 134 Q100 156 168 134"/>
            </g>
            <path d="M100 46 L60 154" stroke="url(#peakGrad)" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M100 46 L140 154" stroke="url(#peakGrad)" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M74 118 L126 118" stroke="url(#peakGrad)" stroke-width="12" stroke-linecap="round" fill="none"/>
            <circle cx="100" cy="44" r="8" fill="url(#dotGlow)"/>
            <circle cx="100" cy="44" r="8" fill="none" stroke="#FFFFFF" stroke-opacity="0.6" stroke-width="1.5"/>
          </svg>
        </div>
        <h2>Project Atlas</h2>
      </div>

      <div class="nav-center">
        <a href="#">Home</a>
        <a href="#">Toolkits</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div class="nav-right">
      <a href="#" target="_blank">GitHub</a>
      </div>

    </nav>
  `;
}