import { FiArrowUpRight } from 'react-icons/fi';
import styles from './Projects.module.css';

export default function ProjectCard({ project, index, bentoClass }) {
  const { title, description, tags, type, image, link } = project;

  return (
    <article
      className={`${styles.card} ${bentoClass || ''}`}
      id={`project-card-${index}`}
      tabIndex={0}
    >
      {/* ── Imagen de fondo ── */}
      <div className={styles.card__media}>
        {image ? (
          <img
            src={image}
            alt={title}
            className={styles.card__img}
            loading="lazy"
          />
        ) : (
          <div className={styles.card__placeholder} />
        )}
      </div>

      {/* ── Scrim de degradado para asegurar máxima legibilidad ── */}
      <div className={styles.card__scrim} />

      {/* ── Cabecera: Categoría y Número ── */}
      <div className={styles.card__header}>
        <span className={styles.card__type}>{type}</span>
 
      </div>

      {/* ── Contenido inferior: Título siempre visible, detalles al hover ── */}
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{title}</h3>

        <div className={styles.card__details}>
          <p className={styles.card__desc}>{description}</p>

          <div className={styles.card__tags}>
            {tags.map((t) => (
              <span key={t} className={styles.card__tag}>
                {t}
              </span>
            ))}
          </div>

          <a
            href={link || '#'}
            className={styles.card__link}
            target={link && link !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            id={`project-link-${index}`}
          >
            <span>Ver proyecto</span>
            <FiArrowUpRight className={styles.card__linkIcon} />
          </a>
        </div>
      </div>
    </article>
  );
}
