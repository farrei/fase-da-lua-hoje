/**
 * Cálculos astronômicos da Lua
 * Baseado em algoritmos conhecidos de fase lunar (ciclo sinódico ~29.530588853 dias)
 * Ajustado para precisão razoável sem dependências externas.
 */

const SYNODIC_MONTH = 29.530588853; // dias
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0); // Nova Lua de referência (JD 2451550.1 approx)

// Signos zodiacais lunares (aproximação pela longitude eclíptica)
const ZODIAC_SIGNS = [
  'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
  'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
];

/**
 * Converte data para Julian Day
 */
function toJulianDate(date) {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

/**
 * Idade da Lua em dias desde a última Lua Nova
 */
export function getMoonAge(date = new Date()) {
  const jd = toJulianDate(date);
  const daysSinceKnown = jd - toJulianDate(new Date(KNOWN_NEW_MOON));
  let age = daysSinceKnown % SYNODIC_MONTH;
  if (age < 0) age += SYNODIC_MONTH;
  return age;
}

/**
 * Fase da Lua (0 a 1)
 */
export function getMoonPhase(date = new Date()) {
  const age = getMoonAge(date);
  return age / SYNODIC_MONTH;
}

/**
 * Percentual de iluminação (0 a 100)
 */
export function getIllumination(date = new Date()) {
  const phase = getMoonPhase(date);
  // Fórmula aproximada: iluminação = (1 - cos(2π * phase)) / 2
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;
  return Math.round(illumination * 1000) / 10; // uma casa decimal
}

/**
 * Nome da fase em português
 */
export function getPhaseName(date = new Date()) {
  const age = getMoonAge(date);
  const phase = age / SYNODIC_MONTH;

  if (phase < 0.03 || phase >= 0.97) return 'Lua Nova';
  if (phase < 0.22) return 'Lua Crescente';
  if (phase < 0.28) return 'Quarto Crescente';
  if (phase < 0.47) return 'Gibosa Crescente';
  if (phase < 0.53) return 'Lua Cheia';
  if (phase < 0.72) return 'Gibosa Minguante';
  if (phase < 0.78) return 'Quarto Minguante';
  return 'Lua Minguante';
}

/**
 * Tipo de fase para o SVG (mais granular)
 * 0: nova, 1: crescente, 2: quarto crescente, 3: gibosa crescente,
 * 4: cheia, 5: gibosa minguante, 6: quarto minguante, 7: minguante
 */
export function getPhaseType(date = new Date()) {
  const age = getMoonAge(date);
  const phase = age / SYNODIC_MONTH;

  if (phase < 0.03 || phase >= 0.97) return 0;
  if (phase < 0.22) return 1;
  if (phase < 0.28) return 2;
  if (phase < 0.47) return 3;
  if (phase < 0.53) return 4;
  if (phase < 0.72) return 5;
  if (phase < 0.78) return 6;
  return 7;
}

/**
 * Progresso visual da fase (0 a 1) para desenhar a sombra
 * 0 = nova, 0.5 = cheia, 1 = volta a nova
 */
export function getPhaseProgress(date = new Date()) {
  return getMoonPhase(date);
}

/**
 * Signo lunar aproximado (baseado na longitude média)
 */
export function getMoonSign(date = new Date()) {
  // Longitude média aproximada da Lua
  // Usa uma aproximação linear simples baseada no ciclo
  const jd = toJulianDate(date);
  // Taxa média de movimento da Lua ~13.176358 deg/dia
  const moonLong = (218.316 + 13.176358 * (jd - 2451545.0)) % 360;
  const normalized = ((moonLong % 360) + 360) % 360;
  const index = Math.floor(normalized / 30);
  return ZODIAC_SIGNS[index];
}

/**
 * Distância aproximada Terra-Lua em km
 * Usa variação elíptica simples (perigee ~363k, apogee ~405k)
 */
export function getMoonDistance(date = new Date()) {
  const age = getMoonAge(date);
  // Anomalia aproximada
  const anomaly = (2 * Math.PI * age) / SYNODIC_MONTH;
  // Distância média 384400 km, variação ~ ± 21000
  const distance = 384400 - 21000 * Math.cos(anomaly);
  return Math.round(distance);
}

/**
 * Próximas fases principais
 */
export function getNextPhases(fromDate = new Date()) {
  const phases = [
    { name: 'Lua Nova', target: 0 },
    { name: 'Quarto Crescente', target: 0.25 },
    { name: 'Lua Cheia', target: 0.5 },
    { name: 'Quarto Minguante', target: 0.75 },
  ];

  const currentAge = getMoonAge(fromDate);
  const currentPhase = currentAge / SYNODIC_MONTH;

  return phases.map(({ name, target }) => {
    let daysUntil = (target - currentPhase) * SYNODIC_MONTH;
    if (daysUntil <= 0.01) daysUntil += SYNODIC_MONTH; // próxima ocorrência
    if (daysUntil < 0) daysUntil += SYNODIC_MONTH;

    const nextDate = new Date(fromDate.getTime() + daysUntil * 86400000);
    
    // Ajuste fino para horário aproximado (baseado em ciclo)
    const hours = Math.floor((daysUntil % 1) * 24);
    const minutes = Math.floor(((daysUntil % 1) * 24 % 1) * 60);

    return {
      name,
      date: nextDate,
      daysRemaining: Math.round(daysUntil * 10) / 10,
      isNow: daysUntil < 0.5,
    };
  }).sort((a, b) => a.daysRemaining - b.daysRemaining);
}

/**
 * Nascer e pôr da Lua aproximados (fórmula simplificada)
 * Para Brasília (lat ≈ -15.78, lon ≈ -47.93)
 * NOTA: cálculo aproximado. Valores reais variam com localização exata.
 */
export function getMoonRiseSet(date = new Date()) {
  // Aproximação baseada na fase e dia do ano
  // Em latitudes tropicais, a Lua nasce ~50 min mais tarde a cada dia
  const age = getMoonAge(date);
  
  // Hora aproximada do nascer (varia com a fase)
  // Lua Nova: nasce ~ amanhecer, Lua Cheia: nasce ~ anoitecer
  const phase = age / SYNODIC_MONTH;
  
  // Base: nascer da Lua em relação ao nascer do Sol (~06:00 em Brasília médio)
  // Offset de fase: 24h * phase
  let riseHour = 6 + phase * 24;
  let setHour = riseHour + 12; // aproximadamente 12h visível (simplificado)

  // Normalizar
  riseHour = ((riseHour % 24) + 24) % 24;
  setHour = ((setHour % 24) + 24) % 24;

  const formatTime = (h) => {
    const hours = Math.floor(h);
    const mins = Math.floor((h % 1) * 60);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  return {
    rise: formatTime(riseHour),
    set: formatTime(setHour),
  };
}

/**
 * Formata data em português Brasil
 */
export function formatDateBR(date) {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formata data curta
 */
export function formatDateShort(date) {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });
}

/**
 * Formata hora
 */
export function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Retorna todos os dados da Lua para uma data
 */
export function getMoonData(date = new Date()) {
  const age = getMoonAge(date);
  const illumination = getIllumination(date);
  const phaseName = getPhaseName(date);
  const phaseType = getPhaseType(date);
  const progress = getPhaseProgress(date);
  const sign = getMoonSign(date);
  const distance = getMoonDistance(date);
  const { rise, set } = getMoonRiseSet(date);
  const nextPhases = getNextPhases(date);

  return {
    date,
    age: Math.round(age * 10) / 10,
    illumination,
    phaseName,
    phaseType,
    progress,
    sign,
    distance,
    rise,
    set,
    nextPhases,
  };
}
