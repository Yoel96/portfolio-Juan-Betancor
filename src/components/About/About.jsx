import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const TAGS = [
  '🎓 TSDS — Diseño Gráfico',
  '💻 DAW — Desarrollo Web',
  '🎨 UX / UI',
  '🖨️ Identidad de Marca',
  '📱 Diseño Responsive',
  '🌐 WordPress',
];

export default function About() {
  const sectionRef = useRef(null);
  const visualRef  = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        contentRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={`section ${styles.about}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.about__grid}>

          {/* ── Columna visual ── */}
          <div ref={visualRef} className={styles.about__visual}>
            <div className={styles.about__card}>
              <div className={styles.about__card_initials}>
                <span>J</span><strong>B</strong>
              </div>
              <div className={styles.about__card_role}>
                Desarrollador · Diseñador · Creativo
              </div>
              <div className={styles.about__stats}>
                <div className={styles.about__stat}>
                  <div className={styles.about__stat_num}>3<span>+</span></div>
                  <div className={styles.about__stat_label}>Años de experiencia</div>
                </div>
                <div className={styles.about__stat}>
                  <div className={styles.about__stat_num}>20<span>+</span></div>
                  <div className={styles.about__stat_label}>Proyectos completados</div>
                </div>
                <div className={styles.about__stat}>
                  <div className={styles.about__stat_num}>2</div>
                  <div className={styles.about__stat_label}>Titulaciones superiores</div>
                </div>
                <div className={styles.about__stat}>
                  <div className={styles.about__stat_num}>∞</div>
                  <div className={styles.about__stat_label}>Café consumido</div>
                </div>
              </div>
            </div>
            <div className={styles.about__deco} />
          </div>

          {/* ── Columna de texto ── */}
          <div ref={contentRef} className={styles.about__content}>
            <p className="section-label">Sobre mí</p>
            <h2 className={styles.about__title}>
              Donde el diseño <em>encuentra</em> la tecnología
            </h2>
            <p className={styles.about__text}>
              Soy <strong>Juan Betancor</strong>, un profesional polivalente con titulación superior en
              <strong> Diseño Gráfico</strong> y formación técnica en <strong>Desarrollo de Aplicaciones Web (DAW)</strong>.
              Esta combinación me permite abordar proyectos digitales desde dos perspectivas complementarias:
              la del diseñador que cuida cada detalle visual y la del desarrollador que da vida al código.
            </p>
            <p className={styles.about__text}>
              Me especializo en crear experiencias web que no solo funcionan, sino que
              <strong> impresionan</strong>. Desde identidades de marca hasta aplicaciones React interactivas,
              llevo proyectos desde la concepción hasta el despliegue con atención al detalle y
              pasión por la calidad.
            </p>
            <p className={styles.about__text}>
              Cuando no estoy programando o diseñando, exploro nuevas tendencias en diseño de
              interfaces, herramientas de IA aplicadas al diseño y estrategias de posicionamiento digital.
            </p>

            <div className={styles.about__tags}>
              {TAGS.map(tag => (
                <span key={tag} className={styles.about__tag}>{tag}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
