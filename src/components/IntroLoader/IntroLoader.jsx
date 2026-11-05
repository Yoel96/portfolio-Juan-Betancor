import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import styles from './IntroLoader.module.css';

/**
 * IntroLoader — Cortinilla de entrada animada con GSAP
 * Secuencia:
 * 1. "JUAN" entra desde -100vw
 * 2. "BETANCOR" entra desde 100vw (simultáneo)
 * 3. Fade-up de etiqueta "Desarrollador"
 * 4. Fade-down de etiqueta "Diseñador Gráfico"
 * 5. Línea decorativa se expande
 * 6. Pausa 0.9s
 * 7. Cortinilla sube (translateY -100%) con power4.inOut
 */
export default function IntroLoader({ onComplete }) {
  const containerRef  = useRef(null);
  const juanRef       = useRef(null);
  const betancorRef   = useRef(null);
  const devLabelRef   = useRef(null);
  const designLabelRef = useRef(null);
  const lineRef       = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => {
          // Notificar al padre que la intro terminó
          onComplete?.();
        },
      });

      // Asegurar estado inicial
      gsap.set([juanRef.current, betancorRef.current], { opacity: 1 });
      gsap.set([devLabelRef.current, designLabelRef.current], { opacity: 0 });
      gsap.set(lineRef.current, { width: '0%' });

      tl
        // 1 & 2 — Nombres entran simultáneamente desde lados opuestos
        .fromTo(
          juanRef.current,
          { x: '-100vw' },
          { x: 0, duration: 1.1 }
        )
        .fromTo(
          betancorRef.current,
          { x: '100vw' },
          { x: 0, duration: 1.1 },
          '<' // simultáneo
        )

        // 3 — Fade-up etiqueta "Desarrollador"
        .fromTo(
          devLabelRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
          '-=0.5'
        )

        // 4 — Fade-down etiqueta "Diseñador Gráfico"
        .fromTo(
          designLabelRef.current,
          { y: -16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
          '<'
        )

        // 5 — Línea decorativa
        .to(
          lineRef.current,
          { width: '100%', duration: 0.6, ease: 'power2.inOut' },
          '-=0.3'
        )

        // 6 — Pausa para leer el nombre (delay, no addPause que bloquea onComplete)
        .to({}, { duration: 0.9 })

        // 7 — Cortinilla sube para revelar la web
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.intro} aria-hidden="true">
      <div className={styles.intro__inner}>
        {/* Etiqueta superior */}
        <span
          ref={devLabelRef}
          className={`${styles.intro__label} ${styles['intro__label--top']}`}
        >
          Desarrollador
        </span>

        {/* Bloque de nombres */}
        <div className={styles.intro__names}>
          <span ref={juanRef} className={`${styles.intro__name} ${styles['intro__name--juan']}`}>
            JUAN
          </span>
          <span ref={betancorRef} className={`${styles.intro__name} ${styles['intro__name--betancor']}`}>
            BETANCOR
          </span>
        </div>

        {/* Línea decorativa */}
        <div ref={lineRef} className={styles.intro__line} />

        {/* Etiqueta inferior */}
        <span
          ref={designLabelRef}
          className={`${styles.intro__label} ${styles['intro__label--bottom']}`}
        >
          Diseñador Gráfico
        </span>
      </div>
    </div>
  );
}
