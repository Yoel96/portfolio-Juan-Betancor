import { FiGithub, FiLinkedin, FiBriefcase } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__inner}`}>
        <div className={styles.footer__brand}><img src="jb_logo_blanco.svg" /></div>

        <p className={styles.footer__copy}>
          © {year} Juan Betancor · Diseño &amp; Desarrollo Web
        </p>

        <nav className={styles.footer__links} aria-label="Redes sociales">
          <a
            href="https://github.com/Yoel96/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
            id="footer-github"
          >
            <FiGithub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/juan-betancor-martin/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
            id="footer-linkedin"
          >
            <FiLinkedin /> LinkedIn
          </a>
          <a
            href="#projects"
            className={styles.footer__link}
            id="footer-portfolio"
          >
            <FiBriefcase /> Portfolio
          </a>
        </nav>
      </div>
    </footer>
  );
}
