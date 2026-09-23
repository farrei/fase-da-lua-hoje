import React from 'react';

/**
 * Componente SVG da Lua que desenha dinamicamente a fase
 * progress: 0 (nova) → 0.5 (cheia) → 1 (nova novamente)
 * Hemisfério sul: sombra do lado esquerdo no crescente
 */
export default function MoonSVG({ progress = 0.25, size = 220, className = '' }) {
  // progress 0 = nova, 0.5 = cheia, 1 = nova
  // Para o desenho usamos a posição da sombra (0 a 1)
  const phase = progress % 1;
  
  // Determina o raio da elipse de sombra
  // 0 e 1 = sombra total (nova), 0.5 = sem sombra (cheia)
  let shadowOffset;
  let isWaxing = phase < 0.5;

  if (phase <= 0.5) {
    // Crescente: sombra vem da direita (hemisfério sul visual)
    shadowOffset = 1 - phase * 2; // 1 → 0
  } else {
    // Minguante: sombra vem da esquerda
    shadowOffset = (phase - 0.5) * 2; // 0 → 1
  }

  // Para SVG usamos uma máscara com círculo + elipse
  const r = 100; // raio base do círculo da lua
  const cx = 110;
  const cy = 110;

  // Calcula o deslocamento da elipse de sombra
  // shadowOffset: 1 = total sombra, 0 = sem sombra
  const ellipseRx = Math.abs(shadowOffset) * r;

  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      className={`drop-shadow-[0_0_25px_rgba(67,255,100,0.35)] ${className}`}
      aria-label="Fase da Lua"
    >
      <defs>
        {/* Gradiente sutil na superfície */}
        <radialGradient id="moonSurface" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#f5f5f0" />
          <stop offset="50%" stopColor="#e8e8e0" />
          <stop offset="100%" stopColor="#c8c8c0" />
        </radialGradient>

        {/* Brilho neon suave */}
        <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Máscara para a fase */}
        <mask id="phaseMask">
          <rect width="220" height="220" fill="black" />
          {/* Círculo da lua iluminada */}
          <circle cx={cx} cy={cy} r={r} fill="white" />
          
          {/* Sombra: usamos um círculo deslocado para criar o efeito de fase */}
          {phase > 0.02 && phase < 0.98 && (
            <>
              {isWaxing ? (
                // Hemisfério Sul: crescente ilumina o lado ESQUERDO
                // Sombra deslocada para a DIREITA (cobre o lado direito)
                <circle
                  cx={cx + (1 - shadowOffset) * r * 0.95}
                  cy={cy}
                  r={r}
                  fill="black"
                />
              ) : (
                // Minguante: sombra no lado ESQUERDO
                <circle
                  cx={cx - (1 - shadowOffset) * r * 0.95}
                  cy={cy}
                  r={r}
                  fill="black"
                />
              )}
            </>
          )}
          
          {/* Lua nova: quase tudo preto */}
          {(phase <= 0.02 || phase >= 0.98) && (
            <circle cx={cx} cy={cy} r={r} fill="black" />
          )}
        </mask>
      </defs>

      {/* Aura / glow externo */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 8}
        fill="none"
        stroke="#43ff64"
        strokeWidth="1.5"
        opacity="0.25"
        className="animate-pulse-slow"
      />

      {/* Disco da lua (fundo escuro) */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#1a1a1a"
        stroke="#2a2a2a"
        strokeWidth="1"
      />

      {/* Parte iluminada com máscara */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="url(#moonSurface)"
        mask="url(#phaseMask)"
        filter="url(#moonGlow)"
      />

      {/* Crateras sutis (sempre visíveis na parte iluminada) */}
      <g opacity="0.15" mask="url(#phaseMask)">
        <circle cx="80" cy="75" r="12" fill="#999" />
        <circle cx="130" cy="90" r="8" fill="#888" />
        <circle cx="95" cy="130" r="15" fill="#777" />
        <circle cx="145" cy="140" r="7" fill="#999" />
        <circle cx="70" cy="110" r="5" fill="#aaa" />
      </g>

      {/* Highlight brilhante */}
      <ellipse
        cx="85"
        cy="70"
        rx="25"
        ry="18"
        fill="white"
        opacity="0.12"
        mask="url(#phaseMask)"
      />
    </svg>
  );
}
