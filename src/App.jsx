import React, { useState, useEffect, useMemo } from 'react';
import MoonSVG from './components/MoonSVG';
import Timeline from './components/Timeline';
import NextPhases from './components/NextPhases';
import {
  getMoonData,
  formatDateBR,
} from './utils/moonCalculations';

function InfoCard({ label, value, sub }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-space-card/60 border border-space-border hover:border-neon-green/20 transition-colors">
      <span className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
      {sub && <span className="text-[10px] text-gray-500 mt-0.5">{sub}</span>}
    </div>
  );
}

export default function App() {
  const [offsetDays, setOffsetDays] = useState(0);
  const [loading, setLoading] = useState(true);

  // Data selecionada (hoje + offset)
  const selectedDate = useMemo(() => {
    const d = new Date();
    d.setHours(12, 0, 0, 0); // meio-dia para estabilidade
    d.setDate(d.getDate() + offsetDays);
    return d;
  }, [offsetDays]);

  const moon = useMemo(() => getMoonData(selectedDate), [selectedDate]);

  useEffect(() => {
    // Simula carregamento inicial suave
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-space-black flex flex-col items-center justify-center p-6">
        <div className="w-48 h-48 rounded-full skeleton mb-6" />
        <div className="w-40 h-6 skeleton mb-3" />
        <div className="w-56 h-4 skeleton" />
      </div>
    );
  }

  const isToday = offsetDays === 0;

  return (
    <div className="min-h-screen bg-space-black text-white pb-10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-space-black/90 backdrop-blur-md border-b border-space-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-neon-green/20 border border-neon-green/40 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#43ff64" strokeWidth="1.5" fill="#43ff6420" />
                <path d="M12 3a9 9 0 0 0 0 18" fill="#43ff64" opacity="0.7" />
              </svg>
            </div>
            <span className="font-display text-sm font-semibold tracking-wide text-neon-green">
              FASE DA LUA HOJE
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            Brasília · Hemisfério Sul
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* Título e data */}
        <div className="text-center animate-fade-in-up">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neon-green/70 mb-1">
            Observatório Lunar
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {moon.phaseName}
          </h1>
          <p className="text-sm text-gray-400 mt-1 capitalize">
            {isToday ? 'Hoje, ' : ''}{formatDateBR(selectedDate)}
          </p>
        </div>

        {/* Lua central */}
        <div className="flex justify-center py-4 animate-fade-in-up animate-delay-1">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-neon-green/5 blur-3xl scale-110" />
            <MoonSVG
              progress={moon.progress}
              size={220}
              className="relative z-10 animate-float w-[55vw] max-w-[240px] h-auto"
            />
          </div>
        </div>

        {/* Percentual de iluminação em destaque */}
        <div className="text-center animate-fade-in-up animate-delay-2">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-4xl font-bold text-neon-green drop-shadow-[0_0_12px_rgba(67,255,100,0.5)]">
              {moon.illumination}%
            </span>
            <span className="text-sm text-gray-400">iluminada</span>
          </div>
        </div>

        {/* Grid de informações */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 animate-fade-in-up animate-delay-2">
          <InfoCard label="Idade" value={`${moon.age} dias`} />
          <InfoCard label="Signo" value={moon.sign} />
          <InfoCard label="Distância" value={`${(moon.distance / 1000).toFixed(0)} mil km`} sub="aprox." />
          <InfoCard label="Ciclo" value={`${Math.round(moon.progress * 100)}%`} sub="do mês" />
        </div>

        {/* Nascer e Pôr */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in-up animate-delay-3">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-space-card/80 border border-space-border">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">Nascer</p>
              <p className="text-lg font-semibold text-white">{moon.rise}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-space-card/80 border border-space-border">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">Pôr</p>
              <p className="text-lg font-semibold text-white">{moon.set}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="animate-fade-in-up animate-delay-3">
          <Timeline offsetDays={offsetDays} onChange={setOffsetDays} maxDays={60} />
        </div>

        {/* Próximas fases */}
        <div className="animate-fade-in-up animate-delay-4 pb-4">
          <NextPhases phases={moon.nextPhases} />
        </div>

        {/* Footer */}
        <footer className="text-center pt-4 pb-8 border-t border-space-border">
          <p className="text-[11px] text-gray-600">
            Dados calculados localmente · Fuso de Brasília
          </p>
          <p className="text-[10px] text-gray-700 mt-1">
            Fase da Lua Hoje · PWA · Funciona offline
          </p>
        </footer>
      </main>
    </div>
  );
}
