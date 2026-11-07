import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const TAGS = [
  '🎓 Diseño Gráfico',
  '💻 Desarrollo Web',
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
                <img src="jb_logo_blanco.svg"  />
              </div>
              <div className={styles.about__card_role}>
                Desarrollador · Diseñador · Creativo
              </div>
              <div className={styles.about__stats}>
                <div className={styles.about__stat}>
                  <div className={styles.about__stat_num}>4<span>+</span></div>
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
                  <div className={styles.about__stat_label}>Ambición</div>
                </div>
              </div>
            </div>
            <div className={styles.about__deco} />
          </div>

          {/* ── Columna de texto ── */}
          <div ref={contentRef} className={styles.about__content}>
             
            <h2 className={styles.about__title}>
              Donde el diseño <em>encuentra</em> la tecnología
            </h2>
            <p className={styles.about__text}>
 
              Cuento con formación en <strong>Desarrollo</strong> y estudios en <strong>Diseño Gráfico,</strong> una combinación
               que me permite entender un proyecto digital en su totalidad.


            </p>
            <p className={styles.about__text}>
              Apasionado por la tecnología, me muevo con soltura entre ambos mundos: disfruto estructurando <strong>código limpio y lógico,</strong> pero también cuidando al milímetro la identidad visual, las tipografías y las micro-interacciones. Para mí, un buen desarrollo no solo debe ser funcional; tiene que sentirse impecable en las manos de quien lo usa.
            </p>
            <p className={styles.about__text}>
              Cuando no estoy programando o diseñando, exploro nuevas herramientas, tendencias en diseño de
              interfaces y me adentro en nuevos retos.
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
