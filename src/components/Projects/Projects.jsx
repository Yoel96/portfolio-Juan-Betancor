import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiGithub, SiBehance } from 'react-icons/si';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

// Puedes cambiar 'image' por la ruta de tus imágenes locales (ej. '/proyectos/mi-foto.jpg' o importándola de assets)
const PROJECTS = [
  {
    title: 'E-commerce y E-learning con WordPress & WooCommerce',
    description:
      'Academia online completa para Link Soluciones. Desarrollo de la estructura, pasarela de pago completa y SEO técnico.',
    tags: ['WordPress', 'WooCommerce', 'Learndash',  'PHP'],
    type: 'Web · E-commerce',
    image:
      'link-Academy.png',
    link: 'https://www.behance.net/gallery/175387027/e-learning-Web-Link-Academy',
  },
  {
    title: 'Desarrollo de videojuegos',
    description:
      'Desarrollo, modelado 3D y animaciones para un videojuego 3D',
    tags: ['Unity', 'Blender', 'C#'],
    type: 'Videojuegos',
    image:
      'stain_run.png',
    link: 'https://youtu.be/j6lJZOrlRbs',
  },
  {
    title: 'Rediseño de marca',
    description:
      'Rediseño de marca para los Premios a la Excelencia en RRHH Canarias.',
    tags: [  'Adobe CC', 'Branding'],
    type: 'Diseño · Branding',
    image:
      'premios excelencia rrhh canarias.png',
    link: 'https://www.premiosrrhhcanarias.com/',
  },
  {
    title: 'Automatización de contenido',
    description:
      'Automatización para subir contenido multimedia a Instagram a partir de servicios de Google.',
    tags: ['Javascript', 'Appscript'],
    type: 'Automatizaciones',
    image:
      'https://images.unsplash.com/photo-1783115259399-3a5a3e0e4592?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    link: 'https://script.google.com/macros/s/AKfycbxRYjKto23xyLhWjVItc7qy4tiAppql5M0JvQq_sckj__WPU1W7xp99h2Jt1orh3dMAow/exec',
  },
  {
    title: 'Aplicación web de contactos',
    description:
      'Programación de backend y frontend para web de contactos.',
    tags: ['.NET', 'React.js'],
    type: 'Web · API',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    link: 'https://github.com/Yoel96/React-Contact-Book-Front-End',
  },
  {
    title: 'Maquetación web',
    description:
      'Maquetación del rediseño de la página web de Celia Rubio, a partir de un diseño entregado.',
    tags: ['Wordpress', 'Elementor'],
    type: 'Web',
    image:
      'landing_Celia_Rubio.png',
    link: 'https://celiarubio.com/',
  },
];

const BENTO_CLASSES = [
  'card--wide',
  'card--tall',
  'card--normal',
  'card--normal',
  'card--normal',
  'card--wide',
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        Array.from(gridRef.current?.children || []),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className={`section ${styles.projects}`} ref={sectionRef}>
      <div className="container">
        <div ref={headerRef} className={styles.projects__header}>
          <div>
            <h2 className={styles.projects__title}>Proyectos destacados</h2>
          </div>
          <a href="#contact" className="btn btn--outline" id="projects-cta-all">
            Trabajemos juntos
          </a>
        </div>

        <div ref={gridRef} className={styles.projects__grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              bentoClass={styles[BENTO_CLASSES[i]]}
            />
          ))}
        </div>

        {/* ── Enlaces a GitHub y Behance debajo del grid a la derecha ── */}
        <div ref={footerRef} className={styles.projects__footer}>
          <div className={styles.projects__socialLinks}>
            <span className={styles.projects__socialHint}>Ver más proyectos:</span>
            <a
              href="https://github.com/Yoel96"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projects__socialIcon}
              aria-label="Ver proyectos en GitHub"
              title="GitHub"
              id="projects-link-github"
            >
              <SiGithub />
            </a>
            <a
              href="https://www.behance.net/yoelbetancr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projects__socialIcon}
              aria-label="Ver proyectos en Behance"
              title="Behance"
              id="projects-link-behance"
            >
              <SiBehance />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
