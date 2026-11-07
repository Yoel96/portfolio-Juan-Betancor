import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import styles from './IntroLoader.module.css';
import IntroBackground from './IntroBackground';

/**
 * IntroLoader — Cortinilla de entrada animada con GSAP
 * Secuencia:
 * 1. "JUAN" entra desde -100vw
 * 2. "BETANCOR" entra desde 100vw (simultáneo)
 * 3. Fade-in suave de "Desarrollador" y "Diseñador Gráfico"
 * 4. Pausa de lectura
 * 5. Cortinilla sube (translateY -100%) con power4.inOut
 */
export default function IntroLoader({ onComplete }) {
  const containerRef   = useRef(null);
  const juanRef        = useRef(null);
  const betancorRef    = useRef(null);
  const devLabelRef    = useRef(null);
  const designLabelRef = useRef(null);

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

        // 3 — Fade-in sutil de las profesiones
        .fromTo(
          devLabelRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo(
          designLabelRef.current,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '<'
        )

        // 4 — Pausa para apreciar el logotipo y juego de colores
        .to({}, { duration: 1.2 })

        // 5 — Cortinilla sube para revelar la web
         .to(containerRef.current, {
          yPercent: -100,
          duration: 1.5,
          ease: 'power4.inOut',
        });   
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.intro} aria-hidden="true">
      {/* Fondo vectorial animado sutil (ondas y cuadrícula de puntos) */}
      <IntroBackground />

      <div className={styles.intro__inner}>
        {/* Etiqueta superior — Desarrollador */}
        <span
          ref={devLabelRef}
          className={`${styles.intro__label} ${styles['intro__label--dev']}`}
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

        {/* Etiqueta inferior — Diseñador Gráfico */}
        <span
          ref={designLabelRef}
          className={`${styles.intro__label} ${styles['intro__label--design']}`}
        >
          Diseñador Gráfico
        </span>
      </div>
    </div>
  );
}
