import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiJavascript, SiReact, SiPhp, SiHtml5, SiGit,
  SiWordpress, SiFigma,
} from 'react-icons/si';
import { FaCss3Alt, FaAws } from 'react-icons/fa';
import { TbBrandAdobe } from 'react-icons/tb';
import styles from './TechStack.module.css';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend / Backend',
    sub: 'Desarrollo web',
    iconType: 'frontend',
    emoji: '⚡',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" />, level: 0.9 },
      { name: 'React',      icon: <SiReact color="#61DAFB" />,      level: 0.85 },
      { name: 'PHP',        icon: <SiPhp color="#777BB4" />,        level: 0.75 },
      { name: 'HTML5',      icon: <SiHtml5 color="#E34F26" />,      level: 0.95 },
      { name: 'CSS3',       icon: <FaCss3Alt color="#1572B6" />,       level: 0.9 },
      { name: 'Git',        icon: <SiGit color="#F05032" />,        level: 0.8 },
    ],
  },
  {
    id: 'design',
    label: 'Diseño / CMS',
    sub: 'Herramientas creativas',
    iconType: 'design',
    emoji: '🎨',
    skills: [
      { name: 'WordPress', icon: <SiWordpress color="#21759B" />,      level: 0.9 },
      { name: 'Figma',     icon: <SiFigma color="#F24E1E" />,          level: 0.85 },
      { name: 'Adobe CC',  icon: <TbBrandAdobe color="#FF0000" />,     level: 0.8 },
      { name: 'AWS',       icon: <FaAws color="#FF9900" />,            level: 0.6 },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const gridRef    = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-in
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards stagger
      gsap.fromTo(
        gridRef.current?.children,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            onEnter: () => setAnimated(true),
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" className={`section section--alt ${styles.tech}`} ref={sectionRef}>
      <div className="container">
        <div ref={headerRef} className={styles.tech__header}>
          <p className="section-label">Habilidades</p>
          <h2 className={styles.tech__title}>Mi stack tecnológico</h2>
          <p className={styles.tech__subtitle}>
            Herramientas y tecnologías que domino para crear productos digitales completos.
          </p>
        </div>

        <div ref={gridRef} className={styles.tech__grid}>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className={styles.tech__category}>
              <div className={styles.tech__category_header}>
                <div className={`${styles.tech__category_icon} ${styles[`tech__category_icon--${cat.iconType}`]}`}>
                  {cat.emoji}
                </div>
                <div>
                  <div className={styles.tech__category_name}>{cat.label}</div>
                  <div className={styles.tech__category_sub}>{cat.sub}</div>
                </div>
              </div>

              <div className={styles.tech__skills}>
                {cat.skills.map((skill) => (
                  <div key={skill.name} className={styles.tech__skill}>
                    <div className={styles.tech__skill_icon}>{skill.icon}</div>
                    <div className={styles.tech__skill_info}>
                      <div className={styles.tech__skill_name}>{skill.name}</div>
                      <div className={styles.tech__skill_bar}>
                        <div
                          className={`${styles.tech__skill_fill} ${animated ? styles['tech__skill_fill--animated'] : ''}`}
                          style={{
                            '--fill-width': skill.level,
                            transform: animated ? `scaleX(${skill.level})` : 'scaleX(0)',
                            transitionDelay: `${Math.random() * 0.4}s`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
