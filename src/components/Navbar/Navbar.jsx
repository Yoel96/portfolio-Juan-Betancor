import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Inicio',      href: '#hero' },
  { label: 'Proyectos',  href: '#projects' },
  { label: 'Habilidades', href: '#tech' },
  { label: 'Sobre mí',   href: '#about' },

];

export default function Navbar({ visible }) {
  const navRef   = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Animación de entrada controlada por prop `visible` ── */
  useEffect(() => {
    if (!visible) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
  }, [visible]);

  /* ── Detectar scroll para fondo ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        ref={navRef}
        className={`${styles.navbar} ${scrolled ? styles['navbar--scrolled'] : ''}`}
        style={{ opacity: 0 }}
      >
        {/* Logo */}
        <div
          className={styles.navbar__logo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="jb_logo.svg" alt="logo Juan Betancor"/> 
        </div>

        {/* Links desktop */}
        <nav aria-label="Navegación principal">
          <ul className={styles.navbar__nav}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  className={styles.navbar__link}
                  onClick={() => handleNav(href)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <button
          className={`btn btn--primary ${styles.navbar__cta} hide-mobile`}
          onClick={() => handleNav('#contact')}
        >
          Contacto
        </button>

        {/* Hamburger */}
        <button
          className={styles.navbar__hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </header>

      {/* Mobile menu */}
      <div className={`${styles.navbar__mobile} ${menuOpen ? styles['navbar__mobile--open'] : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <button
            key={href}
            className={styles.navbar__link}
            onClick={() => handleNav(href)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            {label}
          </button>
        ))}
        <button
          className="btn btn--primary"
          onClick={() => handleNav('#contact')}
        >
          Contacto
        </button>
      </div>
    </>
  );
}
