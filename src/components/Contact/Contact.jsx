import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiSend, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { icon: <FiMail />,     label: 'juyobema@gmail.com', href: 'mailto:juyobema@gmail.com' },
  { icon: <FiGithub />,   label: 'github.com/Yoel96', href: 'https://github.com/Yoel96' },
  { icon: <FiLinkedin />, label: 'linkedin.com/in/juan-betancor-martin', href: 'https://www.linkedin.com/in/juan-betancor-martin/' },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-animate]'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data) => {
    setSending(true);
    setErrorMessage(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        'EmailJS: Faltan variables de entorno en el archivo .env (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY).'
      );
    }

    try {
      const templateParams = {
        name: data.name,
        from_name: data.name,
        email: data.email,
        from_email: data.email,
        reply_to: data.email,
        subject: data.subject || 'Nuevo mensaje desde el portafolio',
        message: data.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error al enviar formulario con EmailJS:', error);
      setErrorMessage(
        'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo o escríbeme directamente a juyobema@gmail.com'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.contact__inner}>

          {/* ── Columna izquierda: info ── */}
          <div className={styles.contact__info}>
             
            <h2 className={styles.contact__title} data-animate>
              ¿Tienes un <em>proyecto</em> en mente?
            </h2>
            <p className={styles.contact__text} data-animate>
              Estoy disponible para a tiempo parcial y completo.
              No dudes en escribirme y te responderé en menos de 24 horas.
            </p>

            <div className={styles.contact__links} data-animate>
              {SOCIAL_LINKS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.contact__link}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <span className={styles.contact__link_icon}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Columna derecha: formulario ── */}
          <div className={styles.contact__form} data-animate>
            {submitted ? (
              <div className={styles.form__success}>
                <div className={styles.form__success_icon}>✅</div>
                <h3 className={styles.form__success_title}>¡Mensaje enviado!</h3>
                <p className={styles.form__success_text}>
                  Gracias por escribir. Te responderé lo antes posible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className={styles.form__reset_btn}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {errorMessage && (
                  <div className={styles.form__alert_error} role="alert">
                    {errorMessage}
                  </div>
                )}

                <div className={styles.form__group}>
                  <label className={styles.form__label} htmlFor="contact-name">Nombre</label>
                  <input
                    id="contact-name"
                    className={`${styles.form__input} ${errors.name ? styles.form__input_error : ''}`}
                    placeholder="Tu nombre completo"
                    {...register('name', { required: 'El nombre es obligatorio' })}
                  />
                  {errors.name && <span className={styles.form__error}>{errors.name.message}</span>}
                </div>

                <div className={styles.form__group}>
                  <label className={styles.form__label} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`${styles.form__input} ${errors.email ? styles.form__input_error : ''}`}
                    placeholder="tu@email.com"
                    {...register('email', {
                      required: 'El email es obligatorio',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email no válido' },
                    })}
                  />
                  {errors.email && <span className={styles.form__error}>{errors.email.message}</span>}
                </div>

                <div className={styles.form__group}>
                  <label className={styles.form__label} htmlFor="contact-subject">Asunto</label>
                  <input
                    id="contact-subject"
                    className={styles.form__input}
                    placeholder="¿En qué puedo ayudarte?"
                    {...register('subject')}
                  />
                </div>

                <div className={styles.form__group}>
                  <label className={styles.form__label} htmlFor="contact-message">Mensaje</label>
                  <textarea
                    id="contact-message"
                    className={`${styles.form__textarea} ${errors.message ? styles.form__textarea_error : ''}`}
                    placeholder="Cuéntame sobre tu proyecto..."
                    {...register('message', { required: 'El mensaje es obligatorio', minLength: { value: 20, message: 'Mínimo 20 caracteres' } })}
                  />
                  {errors.message && <span className={styles.form__error}>{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  className={styles.form__submit}
                  disabled={sending}
                  id="contact-submit-btn"
                >
                  {sending ? (
                    <>Enviando…</>
                  ) : (
                    <><FiSend /> Enviar mensaje</>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
