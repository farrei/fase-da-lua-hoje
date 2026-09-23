import React from 'react';

export default function Timeline({ offsetDays, onChange, maxDays = 60 }) {
  const handleSlider = (e) => {
    onChange(Number(e.target.value));
  };

  const decrease = () => {
    onChange(Math.max(-maxDays, offsetDays - 1));
  };

  const increase = () => {
    onChange(Math.min(maxDays, offsetDays + 1));
  };

  const label = (days) => {
    if (days === 0) return 'HOJE';
    if (days > 0) return `+${days}D`;
    return `${days}D`;
  };

  return (
    <div className="w-full bg-space-card/80 backdrop-blur-sm rounded-2xl border border-space-border p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium tracking-widest text-neon-green/80 uppercase">
          Linha do Tempo
        </span>
        <span className="text-xs font-semibold text-neon-green bg-neon-soft px-2.5 py-1 rounded-full">
          {offsetDays === 0 ? 'HOJE' : label(offsetDays)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={decrease}
          disabled={offsetDays <= -maxDays}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-space-dark border border-space-border text-neon-green hover:bg-neon-soft hover:border-neon-green/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          aria-label="Dia anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex-1 relative">
          <input
            type="range"
            min={-maxDays}
            max={maxDays}
            value={offsetDays}
            onChange={handleSlider}
            className="w-full h-2 appearance-none bg-space-border rounded-full outline-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-neon-green
              [&::-webkit-slider-thumb]:shadow-neon-sm
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-neon-green
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:shadow-neon-sm"
          />
          {/* Marcadores */}
          <div className="flex justify-between mt-2 text-[10px] text-gray-500 px-1">
            <span>{label(-maxDays)}</span>
            <span className="text-neon-green/60">HOJE</span>
            <span>{label(maxDays)}</span>
          </div>
        </div>

        <button
          onClick={increase}
          disabled={offsetDays >= maxDays}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-space-dark border border-space-border text-neon-green hover:bg-neon-soft hover:border-neon-green/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          aria-label="Próximo dia"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
