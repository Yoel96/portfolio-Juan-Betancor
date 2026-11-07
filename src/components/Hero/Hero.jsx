import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import styles from './Hero.module.css';
import avatarCutout from '../../assets/avatar-cutout.png';
import FloatingTech from './FloatingTech';

export default function Hero({ visible }) {
  const eyebrowRef    = useRef(null);
  const titleRef      = useRef(null);
  const descRef       = useRef(null);
  const ctasRef       = useRef(null);
  const visualRef     = useRef(null);
  const scrollRef     = useRef(null);

  useEffect(() => {
    if (!visible) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .to(eyebrowRef.current,  { opacity: 1, y: 0, duration: 0.6 },      0.1)
      .fromTo(titleRef.current,  { y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.25)
      .to(descRef.current,     { opacity: 1, y: 0, duration: 0.6 },      0.5)
      .to(ctasRef.current,     { opacity: 1, y: 0, duration: 0.5 },      0.65)
      .to(visualRef.current,   { opacity: 1, x: 0, duration: 0.8, ease: 'power4.out' }, 0.3)
      .to(scrollRef.current,   { opacity: 1, duration: 0.5 },            1.0);
  }, [visible]);

  return (
    <section id="hero" className={styles.hero}>
      {/* ── Cuadrícula 3D en perspectiva aplanada (estática) ── */}
      <div className={styles.hero__grid_wrapper} aria-hidden="true">
        <div className={styles.hero__grid_glow} />
        <div className={styles.hero__grid_plane}>
          <svg className={styles.hero__grid_svg} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-3d-grid-pattern" width="110" height="110" patternUnits="userSpaceOnUse">
                {/* Líneas sutiles de la cuadrícula */}
                <path d="M 0 55 L 110 55 M 55 0 L 55 110" fill="none" stroke="rgba(80, 90, 112, 0.12)" strokeWidth="0.85" />
                {/* Cruces (+) sutiles en cada intersección */}
                <path d="M 47 55 L 63 55 M 55 47 L 55 63" stroke="#505A70" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="square" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-3d-grid-pattern)" />
          </svg>
        </div>
      </div>

      <div className={styles.hero__container}>
        {/* ── Columna izquierda: texto ── */}
        <div className={styles.hero__content}>
          <h1 ref={titleRef} className={styles.hero__title}>
            <span className={styles['hero__title-line']}>
              <span className={`${styles['hero__title-word']} ${styles['hero__title-name']}`}>
                Desarrollador
              </span>
              {' '}
              <span className={`${styles['hero__title-word']} ${styles['hero__title-accent']}`}>
                con alma de
              </span>
            </span>
 
            <span className={styles['hero__title-line']}>
              <span className={`${styles['hero__title-word']} ${styles['hero__title-role']}`}>
                diseñador.
              </span>
            </span>
          </h1>

          <p ref={descRef} className={styles.hero__description} style={{ opacity: 0 }}>
            Soy <strong>Juan Betancor</strong>, desarrollador y diseñador gráfico.
            Combino formación técnica en diferentes tecnologías de informática y conocimientos de diseño para crear
            experiencias digitales estéticas y funcionales.
          </p>

          <div ref={ctasRef} className={styles.hero__ctas} style={{ opacity: 0 }}>
            <a href="#projects" className="btn btn--primary" id="hero-cta-projects">
              Ver proyectos <FiArrowRight />
            </a>
            <a href="#contact" className="btn btn--outline" id="hero-cta-contact">
              <FiMail /> Contacto
            </a>
          </div>
        </div>

        {/* ── Columna derecha: silueta enmarcada con borde redondeado y forma sutil detrás ── */}
        <div ref={visualRef} className={styles.hero__visual} style={{ opacity: 0, transform: 'translateX(40px)' }}>
          <div className={styles.hero__avatar_container}>
            {/* Forma geométrica abstracta y sutil detrás (círculo difuminado con degradado suave en #505A70) */}
            <div className={styles.hero__avatar_backdrop} aria-hidden="true" />
            <div className={styles.hero__avatar_glow} aria-hidden="true" />


            <div className={styles.hero__avatar_card}>
              <img
                src={avatarCutout}
                alt="Juan Betancor"
                className={styles.hero__avatar_silhouette}
              />
            </div>

            {/* Logos de tecnologías flotando de forma orgánica alrededor del avatar */}
            <FloatingTech visible={visible} />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollRef} className={styles.hero__scroll} style={{ opacity: 0 }}>
        <span className={styles.hero__scroll_text}>Scroll</span>
        <div className={styles.hero__scroll_line} />
      </div>
    </section>
  );
}
