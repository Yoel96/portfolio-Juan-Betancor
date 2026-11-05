import { FiArrowUpRight } from 'react-icons/fi';
import styles from './Projects.module.css';

export default function ProjectCard({ project, index }) {
  const { title, description, tags, type, color, gradient, link } = project;

  return (
    <article className={styles.card} id={`project-card-${index}`}>
      {/* ── Thumbnail ── */}
      <div className={styles.card__thumb}>
        <div
          className={styles['card__thumb-bg']}
          style={{
            background: gradient,
          }}
        />
        <div className={styles['card__thumb-overlay']} />

        <span className={styles.card__number}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className={styles.card__tags}>
          {tags.map(t => (
            <span key={t} className={styles.card__tag}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__desc}>{description}</p>
        <div className={styles.card__footer}>
          <a
            href={link || '#'}
            className={styles.card__link}
            target={link ? '_blank' : undefined}
            rel="noopener noreferrer"
            id={`project-link-${index}`}
          >
            Ver proyecto <FiArrowUpRight />
          </a>
          <span className={styles.card__type}>{type}</span>
        </div>
      </div>
    </article>
  );
}
