import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SiReact, SiJavascript, SiUnity, SiBlender, SiPhp } from 'react-icons/si';
import styles from './FloatingTech.module.css';

/* ── Logos de Adobe (Photoshop, Illustrator, Premiere Pro) ── */
const PsLogo = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#001E36" />
    <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
      fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="28" fill="#31A8FF">Ps</text>
  </svg>
);

const AiLogo = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#330000" />
    <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
      fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="28" fill="#FF9A00">Ai</text>
  </svg>
);

const PrLogo = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#00005B" />
    <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle"
      fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="28" fill="#EA77FF">Pr</text>
  </svg>
);

/* ── Logo de Python bicolor oficial ── */
const PythonLogo = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
    <path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z" />
    <path fill="#FFD43B" d="M21.04 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
  </svg>
);

/**
 * Columna vertical de tecnologías a la derecha del avatar:
 * Estática (sin flotación), con escalado suave en hover.
 */
const TECHS = [
  { id: 'react',   label: 'React',        node: <SiReact color="#61DAFB" /> },
  { id: 'js',      label: 'JavaScript',   node: <SiJavascript color="#F7DF1E" />, square: true },
  { id: 'python',  label: 'Python',       node: <PythonLogo /> },
  { id: 'php',     label: 'PHP',          node: <SiPhp color="#777BB4" /> },
  { id: 'ps',      label: 'Photoshop',    node: <PsLogo /> },
  { id: 'ai',      label: 'Illustrator',  node: <AiLogo /> },
  { id: 'pr',      label: 'Premiere Pro', node: <PrLogo /> },
  { id: 'blender', label: 'Blender',      node: <SiBlender color="#EA7600" /> },
  { id: 'unity',   label: 'Unity',        node: <SiUnity color="#0F172A" /> },

];

export default function FloatingTech({ visible }) {
  const wrapRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!visible) return;
    const items = itemRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // Entrada sutil escalonada (sin bucle de flotación posterior)
      gsap.fromTo(
        items,
        { opacity: 0, x: 12, scale: 0.85 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.04,
          delay: 0.4,
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [visible]);

  return (
    <aside
      ref={wrapRef}
      className={styles.techColumn}
      aria-label="Tecnologías destacadas"
    >
      {TECHS.map((t, i) => (
        <div
          key={t.id}
          ref={(el) => (itemRefs.current[i] = el)}
          className={styles.techColumn__item}
          title={t.label}
        >
          <div
            className={`${styles.techColumn__icon} ${t.square ? styles['techColumn__icon--square'] : ''}`}
          >
            {t.node}
          </div>
        </div>
      ))}
    </aside>
  );
}
