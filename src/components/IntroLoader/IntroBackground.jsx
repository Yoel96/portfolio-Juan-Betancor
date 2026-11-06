import styles from './IntroBackground.module.css';

/**
 * IntroBackground — Fondo vectorial orgánico de ondas ultra sutiles
 * Compuesto exclusivamente por líneas fluidas y tenues en #0F172A y tonos grises (#505A70, #94A3B8).
 * Diseñado con opacidad muy baja y trazos finos para que las ondas apenas se perciban en segundo plano.
 */
export default function IntroBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradientes lineales con opacidad ultra baja para máxima sutileza */}
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#505A70" stopOpacity="0.025" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.008" />
          </linearGradient>

          <linearGradient id="wave-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#505A70" stopOpacity="0.035" />
            <stop offset="55%" stopColor="#0F172A" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.008" />
          </linearGradient>

          <linearGradient id="wave-grad-3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.025" />
            <stop offset="60%" stopColor="#505A70" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.01" />
          </linearGradient>

          <linearGradient id="wave-fill-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#505A70" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.002" />
          </linearGradient>
        </defs>

        {/* 1. Relleno volumétrico casi imperceptible */}
        <g className={styles.waveFillGroup}>
          <path
            d="M-100,540 C280,360 620,680 1020,490 C1320,350 1560,560 1700,510 L1700,950 L-100,950 Z"
            fill="url(#wave-fill-grad)"
          />
        </g>

        {/* 2. Ondas Orgánicas Superiores (Líneas finas de trazo suave) */}
        <g className={styles.waveGroup1}>
          <path
            d="M-120,240 C240,110 580,390 980,210 C1280,80 1520,300 1720,260"
            stroke="url(#wave-grad-1)"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <path
            d="M-120,285 C260,155 560,435 960,255 C1260,125 1500,345 1720,305"
            stroke="#505A70"
            strokeWidth="0.65"
            strokeOpacity="0.025"
            strokeLinecap="round"
          />
          <path
            d="M-120,325 C280,195 540,475 940,295 C1240,165 1480,385 1720,345"
            stroke="#0F172A"
            strokeWidth="0.5"
            strokeOpacity="0.015"
            strokeLinecap="round"
          />
        </g>

        {/* 3. Ondas Orgánicas Centrales */}
        <g className={styles.waveGroup2}>
          <path
            d="M-120,440 C340,620 740,320 1140,510 C1380,620 1580,430 1720,460"
            stroke="url(#wave-grad-2)"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
          <path
            d="M-120,480 C320,660 760,360 1120,550 C1360,660 1600,470 1720,500"
            stroke="#0F172A"
            strokeWidth="0.65"
            strokeOpacity="0.02"
            strokeLinecap="round"
          />
          <path
            d="M-120,520 C300,700 780,400 1100,590 C1340,700 1620,510 1720,540"
            stroke="#505A70"
            strokeWidth="0.5"
            strokeOpacity="0.015"
            strokeLinecap="round"
          />
        </g>

        {/* 4. Ondas Orgánicas Inferiores */}
        <g className={styles.waveGroup3}>
          <path
            d="M-120,670 C260,820 660,530 1060,720 C1340,850 1560,630 1720,670"
            stroke="url(#wave-grad-3)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <path
            d="M-120,715 C280,865 640,575 1040,765 C1320,895 1540,675 1720,715"
            stroke="#94A3B8"
            strokeWidth="0.6"
            strokeOpacity="0.02"
            strokeLinecap="round"
          />
          <path
            d="M-120,755 C300,905 620,615 1020,805 C1300,935 1520,715 1720,755"
            stroke="#505A70"
            strokeWidth="0.5"
            strokeOpacity="0.015"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
