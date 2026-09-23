import React from 'react';
import { formatDateShort, formatTime } from '../utils/moonCalculations';

const PHASE_ICONS = {
  'Lua Nova': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" fill="#1a1a1a" stroke="#43ff64" strokeWidth="1.5" opacity="0.6" />
    </svg>
  ),
  'Quarto Crescente': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <path d="M14 3 A11 11 0 0 0 14 25 A7 11 0 0 1 14 3" fill="#e8e8e0" />
    </svg>
  ),
  'Lua Cheia': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" fill="#e8e8e0" stroke="#43ff64" strokeWidth="1" opacity="0.9" />
    </svg>
  ),
  'Quarto Minguante': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
      <path d="M14 3 A11 11 0 0 1 14 25 A7 11 0 0 0 14 3" fill="#e8e8e0" />
    </svg>
  ),
};

export default function NextPhases({ phases }) {
  return (
    <div className="w-full">
      <h2 className="text-xs font-medium tracking-widest text-neon-green/80 uppercase mb-4">
        Próximas Fases
      </h2>

      <div className="space-y-3">
        {phases.map((phase, idx) => (
          <div
            key={phase.name}
            className="flex items-center gap-4 p-3.5 rounded-2xl bg-space-card/80 border border-space-border hover:border-neon-green/30 transition-all duration-300 group"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-space-dark border border-space-border group-hover:border-neon-green/40 transition-colors">
              {PHASE_ICONS[phase.name] || PHASE_ICONS['Lua Nova']}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm group-hover:text-neon-green transition-colors">
                {phase.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {formatDateShort(phase.date)} · {formatTime(phase.date)}
              </p>
            </div>

            <div className="flex-shrink-0">
              {phase.isNow ? (
                <span className="text-[11px] font-bold tracking-wide text-space-black bg-neon-green px-2.5 py-1 rounded-full shadow-neon-sm">
                  AGORA
                </span>
              ) : (
                <span className="text-[11px] font-semibold tracking-wide text-neon-green bg-neon-soft border border-neon-green/20 px-2.5 py-1 rounded-full">
                  +{Math.ceil(phase.daysRemaining)} {Math.ceil(phase.daysRemaining) === 1 ? 'DIA' : 'DIAS'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
