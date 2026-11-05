import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'E-commerce con WordPress & WooCommerce',
    description:
      'Tienda online completa para marca de moda local. Diseño de marca, identidad visual, integración de pasarela de pago y optimización SEO técnico.',
    tags: ['WordPress', 'WooCommerce', 'CSS'],
    type: 'Web · E-commerce',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1e3a5f 50%, #0ea5e9 100%)',
    link: '#',
  },
  {
    title: 'Dashboard SPA con React',
    description:
      'Aplicación de panel de administración con gráficas en tiempo real, gestión de usuarios, autenticación JWT y diseño dark mode.',
    tags: ['React', 'JavaScript', 'CSS3'],
    type: 'Web · App',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #818CF8 100%)',
    link: '#',
  },
  {
    title: 'Branding & Identidad Visual',
    description:
      'Proyecto de identidad completa para startup tecnológica: logotipo, sistema tipográfico, paleta cromática, papelería y guía de marca.',
    tags: ['Figma', 'Adobe CC', 'Branding'],
    type: 'Diseño · Branding',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 60%, #34d399 100%)',
    link: '#',
  },
  {
    title: 'Landing Page de Alta Conversión',
    description:
      'Landing page para campaña de marketing digital con animaciones GSAP, A/B testing y optimización de velocidad (100 en Lighthouse).',
    tags: ['HTML5', 'GSAP', 'PHP'],
    type: 'Web · Marketing',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #fb923c 100%)',
    link: '#',
  },
  {
    title: 'Plugin WordPress Personalizado',
    description:
      'Plugin custom para gestión de reservas online con calendario interactivo, panel de administración y notificaciones por email automatizadas.',
    tags: ['PHP', 'WordPress', 'JavaScript'],
    type: 'Web · Plugin',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #505A70 100%)',
    link: '#',
  },
  {
    title: 'App de Portafolio 3D',
    description:
      'Exploración creativa de un portafolio con Three.js y WebGL. Escenario 3D interactivo con partículas, shaders personalizados y scroll experience inmersiva.',
    tags: ['React', 'Three.js', 'GSAP'],
    type: 'Web · Creativo',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #505A70 50%, #38BDF8 100%)',
    link: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        Array.from(gridRef.current?.children || []),
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
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
            <p className="section-label">Proyectos</p>
            <h2 className={styles.projects__title}>Trabajo seleccionado</h2>
          </div>
          <a href="#contact" className="btn btn--outline" id="projects-cta-all">
            Trabajemos juntos
          </a>
        </div>

        <div ref={gridRef} className={styles.projects__grid}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
