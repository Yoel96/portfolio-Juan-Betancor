import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiJavascript,
  SiPhp,
  SiPython,
  SiReact,
  SiHtml5,
  SiJquery,
  SiBootstrap,
  SiGit,
  SiMongodb,
  SiInfluxdb,
  SiWordpress,
  SiFigma,
  SiBlender,
  SiUnity,
  SiMake,
} from 'react-icons/si';
import {
  FaJava,
  FaNodeJs,
  FaCss3Alt,
  FaAws,
} from 'react-icons/fa6';
import {
  TbBrandAdobe,
  TbBrandCSharp,
  TbSql,
} from 'react-icons/tb';
import styles from './TechStack.module.css';

gsap.registerPlugin(ScrollTrigger);

// SVG personalizado para ActiveCampaign
function ActiveCampaignIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
      <circle cx="12" cy="12" r="10.5" fill="#356AE6" />
      <path
        d="M12 6L16.2 13.5H13.2L12 11.2L10.8 13.5H7.8L12 6Z"
        fill="#FFFFFF"
      />
      <circle cx="12" cy="15.8" r="1.3" fill="#FFFFFF" />
    </svg>
  );
}

// SVG oficial multicolor para Suite Microsoft Office
function MicrosoftOfficeIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
      <rect x="2.5" y="2.5" width="8.8" height="8.8" rx="1.5" fill="#F25022" />
      <rect x="12.7" y="2.5" width="8.8" height="8.8" rx="1.5" fill="#7FBA00" />
      <rect x="2.5" y="12.7" width="8.8" height="8.8" rx="1.5" fill="#00A4EF" />
      <rect x="12.7" y="12.7" width="8.8" height="8.8" rx="1.5" fill="#FFB900" />
    </svg>
  );
}

// Tecnologías de Desarrollo
const DEV_TECH = [
  { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
  { name: 'PHP', icon: <SiPhp color="#777BB4" /> },
  { name: 'Python', icon: <SiPython color="#3776AB" /> },
  { name: 'Java', icon: <FaJava color="#ED8B00" /> },
  { name: 'C#', icon: <TbBrandCSharp color="#9B4993" /> },
  { name: 'Node', icon: <FaNodeJs color="#539E43" /> },
  { name: 'React', icon: <SiReact color="#61DAFB" /> },
  { name: 'CSS', icon: <FaCss3Alt color="#1572B6" /> },
  { name: 'HTML5', icon: <SiHtml5 color="#E34F26" /> },
  { name: 'JQuery', icon: <SiJquery color="#0769AD" /> },
  { name: 'Bootstrap', icon: <SiBootstrap color="#7952B3" /> },
  { name: 'Git', icon: <SiGit color="#F05032" /> },
  { name: 'AWS', icon: <FaAws color="#FF9900" /> },
  { name: 'SQL', icon: <TbSql color="#00758F" /> },
  { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
  { name: 'InfluxDB', icon: <SiInfluxdb color="#22ADF6" /> },
  { name: 'Active Campaign', icon: <ActiveCampaignIcon /> },
  { name: 'Make', icon: <SiMake color="#6D00F6" /> },
];

// Tecnologías de Diseño y Creatividad
const DESIGN_TECH = [
  { name: 'Figma', icon: <SiFigma color="#F24E1E" /> },
  { name: 'Paquete Adobe', icon: <TbBrandAdobe color="#FA0F00" /> },
  { name: 'Blender', icon: <SiBlender color="#EA7600" /> },
  { name: 'Unity', icon: <SiUnity color="#0F172A" /> },
  
  { name: 'Wordpress', icon: <SiWordpress color="#21759B" /> },
  { name: 'Suite Microsoft Office', icon: <MicrosoftOfficeIcon /> },
];

export default function TechStack() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const columnsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-in
      gsap.fromTo(
        headerRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Icon tiles stagger animation
      const tiles = sectionRef.current?.querySelectorAll(`.${styles.tech__tile}`);
      if (tiles && tiles.length > 0) {
        gsap.fromTo(
          tiles,
          { y: 30, opacity: 0, scale: 0.88 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.035,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: columnsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" className={`section ${styles.tech}`} ref={sectionRef}>
      {/* ── Fondo con Cuadrícula Vectorial ── */}
      <div className={styles.tech__gridBg} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={headerRef} className={styles.tech__header}>
          <h2 className={styles.tech__title}>Stack Tecnológico</h2>
          <p className={styles.tech__subtitle}>
            Herramientas y lenguajes con los que he desarrollado proyectos y diseñado experiencias interactivas.
          </p>
        </div>

        {/* ── Dos Columnas: Desarrollo y Diseño ── */}
        <div ref={columnsRef} className={styles.tech__columns}>
          {/* Columna 1: Desarrollo */}
          <div className={styles.tech__column}>
            <div className={styles.tech__columnHeader}>
               
              <h3 className={styles.tech__columnTitle}>Programación & Software</h3>
              <span className={styles.tech__columnCount}>{DEV_TECH.length} tecnologías</span>
            </div>

            <div className={styles.tech__tilesGrid}>
              {DEV_TECH.map((tech) => (
                <div key={tech.name} className={styles.tech__tile} title={tech.name}>
                  <div className={styles.tech__icon}>{tech.icon}</div>
                  <span className={styles.tech__name}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna 2: Diseño */}
          <div className={styles.tech__column}>
            <div className={styles.tech__columnHeader}>
              <h3 className={styles.tech__columnTitle}>Diseño & Creatividad 3D</h3>
              <span className={styles.tech__columnCount}>{DESIGN_TECH.length} herramientas</span>
            </div>
            <div className={styles.tech__tilesGrid}>
              {DESIGN_TECH.map((tech) => (
                <div key={tech.name} className={styles.tech__tile} title={tech.name}>
                  <div className={styles.tech__icon}>{tech.icon}</div>
                  <span className={styles.tech__name}>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
